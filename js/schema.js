// Default image URL set karna
const defaultImageURL = "https://gklearnstudy.in/gklearnstudy.webp"; // Yahan apna default image link set karein

// Current image URL fetch karna
const imageElement = document.querySelector('img'); // Yahan 'img' selector ko aapki required image element ke liye update karein
const currentImage = imageElement ? imageElement.src.replace(/\.(jpg|jpeg|png)$/, '.webp') : defaultImageURL;

// Current page ki title, description, aur social media links fetch karna
const currentTitle = document.title; // Current page ka title
const currentURL = window.location.href; // Current page ka URL
const currentDescription = document.querySelector('meta[name="description"]') ? document.querySelector('meta[name="description"]').content : "Default description"; // Description ko fetch karna
const socialMediaLinks = {
    facebook: "https://facebook.com/YourPage", // Facebook link
    instagram: "https://instagram.com/YourPage", // Instagram link
    youtube: "https://youtube.com/YourChannel" // YouTube link
};

// Schema.org JSON-LD format me data prepare karna
const schemaData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": currentTitle,
    "url": currentURL,
    "logo": currentImage,
    "description": currentDescription,
    "sameAs": [
        socialMediaLinks.facebook,
        socialMediaLinks.instagram,
        socialMediaLinks.youtube
    ]
};

// JSON-LD script ko create karna
const script = document.createElement('script');
script.type = "application/ld+json";
script.text = JSON.stringify(schemaData);

// Document me script ko append karna
document.head.appendChild(script);
