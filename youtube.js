const express = require('express');
const fs = require('fs');
const fetch = require('node-fetch');
const { parseString } = require('xml2js');

const app = express();
const PORT = 3000;

const channelIds = [
    'UCFo8q8WIrDifqtFHAvmr0NQ',
    'UC5fXdqPu6-ewYPVV7JlHjkQ'
];

// Function to fetch XML and save new data
async function fetchAndSaveVideos() {
    const allVideos = [];

    for (const channelId of channelIds) {
        const xmlFeedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
        const response = await fetch(xmlFeedUrl);
        const xmlData = await response.text();

        parseString(xmlData, (err, result) => {
            if (err) throw err;
            const entries = result.feed.entry; // Extract video entries from XML
            entries.forEach(entry => {
                const video = {
                    title: entry.title[0],
                    videoId: entry['yt:videoId'][0],
                    published: entry.published[0]
                };
                allVideos.push(video);
            });
        });
    }

    // Load existing videos from JSON file
    let existingVideos = [];
    try {
        existingVideos = JSON.parse(fs.readFileSync('videos.json', 'utf-8') || '[]');
    } catch (error) {
        console.error("Error reading JSON file:", error);
    }

    // Check for new videos and save to the file
    allVideos.forEach(video => {
        const isNew = !existingVideos.find(existingVideo => existingVideo.videoId === video.videoId);
        if (isNew) {
            existingVideos.push(video); // Add new video if not present
        }
    });

    // Write updated video list back to JSON file
    fs.writeFileSync('videos.json', JSON.stringify(existingVideos, null, 2));
}

// API endpoint to fetch videos
app.get('/videos', (req, res) => {
    const videos = JSON.parse(fs.readFileSync('videos.json', 'utf-8') || '[]');
    res.json(videos); // Send videos as JSON response
});

// Start server and fetch videos
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    fetchAndSaveVideos(); // Fetch videos on server start
});
