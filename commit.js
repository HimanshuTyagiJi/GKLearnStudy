import { getSHA } from './get_sha.js'; // Import the getSHA function

// Function to commit content to GitHub
async function commitToGitHub(postId, content, action) {
    const fileName = `public/${postId}.html`;  // File path in the repo
    const sha = await getSHA(fileName);  // Get SHA if the file already exists

    const response = await fetch(`https://api.github.com/repos/HimanshuTyagiJi/GKLearnStudy/contents/${fileName}`, {
        method: "PUT", // GitHub API PUT request
        headers: {
            "Authorization": `token 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`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: `Post ${action}: ${postId}`, // Commit message
            content: btoa(content), // Encode content in base64
            sha: sha || null // SHA if file exists, null if creating new file
        })
    });

    if (response.ok) {
        console.log(`Successfully committed to GitHub: ${action} for post ${postId}`);
    } else {
        console.error("Error committing to GitHub:", await response.text());
    }
}

// Export the commitToGitHub function for use in the HTML page
export { commitToGitHub };
