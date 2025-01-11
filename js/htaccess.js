// एक सुरक्षित Content Security Policy सेट करें
(function() {
    const csp = "default-src 'self'; " +
                "script-src 'self' 'nonce-" + generateNonce() + "'; " +
                "style-src 'self' 'nonce-" + generateNonce() + "'; " +
                "img-src 'self' data:; " +
                "connect-src 'self'; " +
                "font-src 'self'; " +
                "frame-ancestors 'none'; " +
                "object-src 'none'; " +
                "base-uri 'self';";

    // एक meta टैग बनाएं
    const meta = document.createElement('meta');
    meta.httpEquiv = "Content-Security-Policy";
    meta.content = csp;

    // meta टैग को document के head में जोड़ें
    document.head.appendChild(meta);

    // नॉनस जनरेट करने के लिए एक फ़ंक्शन
    function generateNonce() {
        // 16 बाइट्स का एक रैंडम नॉनस जनरेट करें
        return btoa(String.fromCharCode.apply(null, window.crypto.getRandomValues(new Uint8Array(16))));
    }
})();
