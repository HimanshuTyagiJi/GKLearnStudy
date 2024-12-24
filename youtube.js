const corsAnywhere = require('cors-anywhere');

// होस्ट और पोर्ट सेट करें
const host = '0.0.0.0';
const port = process.env.PORT || 8080;

corsAnywhere.createServer({
    originWhitelist: [], // सभी ओरिजिन को अनुमति
    requireHeader: ['origin', 'x-requested-with'], // आवश्यक हेडर्स
    removeHeaders: ['cookie', 'cookie2'], // कुकीज हटाएँ
}).listen(port, host, () => {
    console.log(`CORS प्रॉक्सी सर्वर चल रहा है: http://${host}:${port}`);
});
