const channelIds = [
    'UCFo8q8WIrDifqtFHAvmr0NQ',
    'UC5fXdqPu6-ewYPVV7JlHjkQ'
];

const githubToken = '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'; // आपका GitHub टोकन
const apiUrl = 'https://api.github.com/repos/HimanshuTyagiJi/GKLearnStudy/contents/youtube.json'; // टार्गेट रिपॉजिटरी का URL

let allVideos = []; // सभी वीडियो का भंडार

function loadVideos() {
    const xmlPromises = channelIds.map(channelId => {
        const xmlFeedUrl = `https://video.gklearnstudy.in/https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
        return fetch(xmlFeedUrl)
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const xml = parser.parseFromString(data, "text/xml");
                const entries = xml.getElementsByTagName("entry");

                const videos = Array.from(entries).map(entry => {
                    const title = entry.getElementsByTagName("title")[0].textContent;
                    const videoId = entry.getElementsByTagName("yt:videoId")[0].textContent;
                    const published = new Date(entry.getElementsByTagName("published")[0].textContent);
                    return { title, videoId, published };
                });
                
                return videos;
            });
    });

    Promise.all(xmlPromises).then(videos => {
        allVideos = videos.flat(); // सभी चैनलों के वीडियो को मिलाएं
        allVideos.sort((a, b) => b.published - a.published); // प्रकाशित तिथि के अनुसार क्रमबद्ध करें
        commitJsonToGithub(allVideos); // वीडियो लोड करने के बाद JSON को कमिट करें
    }).catch(error => {
        console.error('XML फीड को लोड करने में त्रुटि:', error);
    });
}

function commitJsonToGithub(videos) {
    const jsonData = JSON.stringify(videos, null, 2);
    
    // GitHub रिपॉजिटरी से मौजूदा सामग्री प्राप्त करें
    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `token ${githubToken}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const sha = data.sha; // मौजूदा फ़ाइल का SHA प्राप्त करें
        return fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${githubToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'youtube.json को नवीनतम वीडियो के साथ अपडेट करें',
                content: btoa(jsonData), // JSON को Base64 में एन्कोड करें
                sha: sha // मौजूदा फ़ाइल के लिए SHA प्रदान करें
            })
        });
    })
    .then(() => console.log('JSON सफलतापूर्वक GitHub में कमिट किया गया!'))
    .catch(error => console.error('GitHub में कमिट करने में त्रुटि:', error));
}

// वीडियो लोड करें
loadVideos();
