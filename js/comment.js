
// Firebase SDKs
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { onCall } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const { getMessaging } = require("firebase-admin/messaging");
const logger = require("firebase-functions/logger");

// Initialize the Firebase Admin SDK.
initializeApp();

// --- CONFIGURATION ---
// The UID of the website owner to ensure they receive all notifications.
const OWNER_UID = "Pq5f4jTfiEOJCtXBLG0mZyyikIC2";

/**
 * Secure callable function for clients to manage their notification subscription for a page.
 */
exports.manageSubscription = onCall(async (request) => {
  // 1. Authentication Check: Ensure the user is authenticated.
  if (!request.auth) {
    logger.warn("Unauthenticated user tried to call manageSubscription.");
    throw new onCall.HttpsError(
      "unauthenticated",
      "The function must be called while authenticated."
    );
  }

  // 2. Data Validation: Ensure required data is present.
  const { pageId, token, action } = request.data;
  if (!pageId || !token || !["subscribe", "unsubscribe"].includes(action)) {
    logger.error("Invalid arguments received.", request.data);
    throw new onCall.HttpsError(
      "invalid-argument",
      "Required fields: 'pageId', 'token', 'action' ('subscribe' or 'unsubscribe')."
    );
  }

  logger.log(
    `Subscription request for page [${pageId}] with action [${action}] by user ${
      request.auth.uid
    }`
  );

  // 3. Firestore Logic: Update the subscription document.
  const db = getFirestore();
  const pageSubRef = db.collection("pageSubscriptions").doc(pageId);

  try {
    const operation =
      action === "subscribe"
        ? FieldValue.arrayUnion(token)
        : FieldValue.arrayRemove(token);

    // Using set with merge creates the document if it doesn't exist.
    await pageSubRef.set({ tokens: operation }, { merge: true });

    logger.log(
      `Successfully processed [${action}] for token on page [${pageId}]`
    );
    return { success: true, message: `Successfully ${action}d.` };
  } catch (error) {
    logger.error("Error updating subscription in Firestore:", error);
    throw new onCall.HttpsError(
      "internal",
      "Failed to update subscription in the database."
    );
  }
});

/**
 * Cloud Function to send a notification when a new comment is created.
 * Notifies:
 * 1. All users subscribed to the page.
 * 2. The author of the parent comment (if it's a reply).
 * 3. The site owner (for all comments).
 */
exports.sendCommentNotification = onDocumentCreated(
  "pages/{pageId}/comments/{commentId}",
  async (event) => {
    const { pageId, commentId } = event.params;
    const snapshot = event.data;
    if (!snapshot) {
      logger.log("No data associated with the event");
      return;
    }

    const commentData = snapshot.data();
    const commentAuthor = commentData.name || "Someone";
    const commentAuthorUid = commentData.uid;
    const commentText = commentData.comment || "New comment posted";
    const parentId = commentData.parentId;

    logger.log(`New comment [${commentId}] on page [${pageId}]`);

    const db = getFirestore();
    const tokensToNotify = new Set(); // Use a Set to avoid duplicate tokens.

    // --- 1. Get tokens for users subscribed to the page ---
    const pageSubRef = db.collection("pageSubscriptions").doc(pageId);
    const pageSubDoc = await pageSubRef.get();
    if (pageSubDoc.exists) {
      const pageTokens = pageSubDoc.data().tokens;
      if (Array.isArray(pageTokens)) {
        pageTokens.forEach((token) => tokensToNotify.add(token));
        logger.log(`Found ${pageTokens.length} tokens subscribed to the page.`);
      }
    }

    // Helper to fetch tokens for a given UID from the 'userTokens' collection.
    const getTokensForUid = async (uid) => {
      if (!uid) return [];
      const userTokenRef = db.collection("userTokens").doc(uid);
      const userTokenDoc = await userTokenRef.get();
      if (userTokenDoc.exists) {
        const userData = userTokenDoc.data();
        return Array.isArray(userData.tokens) ? userData.tokens : [];
      }
      return [];
    };

    // --- 2. If it's a reply, get tokens for the parent comment's author ---
    let parentAuthorUid = null;
    if (parentId) {
      const parentCommentRef = db
        .collection("pages")
        .doc(pageId)
        .collection("comments")
        .doc(parentId);
      const parentCommentDoc = await parentCommentRef.get();
      if (parentCommentDoc.exists) {
        parentAuthorUid = parentCommentDoc.data().uid;
        // Ensure not notifying someone for their own reply.
        if (parentAuthorUid && parentAuthorUid !== commentAuthorUid) {
          logger.log(`This is a reply to a comment by user ${parentAuthorUid}`);
          const parentTokens = await getTokensForUid(parentAuthorUid);
          parentTokens.forEach((token) => tokensToNotify.add(token));
        }
      }
    }

    // --- 3. Get tokens for the site owner, unless they wrote the comment or are the one being replied to ---
    if (
      commentAuthorUid !== OWNER_UID &&
      parentAuthorUid !== OWNER_UID // Also avoids duplicate notification on reply to owner
    ) {
      logger.log("Comment is not from owner, fetching owner tokens.");
      const ownerTokens = await getTokensForUid(OWNER_UID);
      ownerTokens.forEach((token) => tokensToNotify.add(token));
    }

    const finalTokens = Array.from(tokensToNotify);
    if (finalTokens.length === 0) {
      logger.log("No tokens to notify. Exiting.");
      return;
    }

    // --- 4. Construct and send the notification ---
    const pageTitle = pageId
      .replace(/_/g, " ")
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    const urlPath = pageId === "main_page" ? "" : pageId.replace(/_/g, "/");
    const link = `https://gklearnstudy.in/${urlPath}`;

    const payload = {
      notification: {
        title: `New comment on: ${pageTitle}`,
        body: `${commentAuthor}: ${
          commentText.length > 100
            ? `${commentText.substring(0, 97)}...`
            : commentText
        }`,
        icon: "https://gklearnstudy.in/favicon.ico",
      },
      webpush: { fcmOptions: { link } },
    };

    logger.log(`Sending notification to ${finalTokens.length} unique tokens.`);

    try {
      const response = await getMessaging().sendEachForMulticast({
        tokens: finalTokens,
        ...payload,
      });
      logger.log(
        `Successfully sent ${response.successCount} messages for page ${pageId}`
      );
    } catch (error) {
      logger.error("Error sending message:", error);
    }
  }
);
