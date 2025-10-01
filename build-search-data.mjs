import fs from 'fs/promises';
import path from 'path';
import { JSDOM } from 'jsdom';

// जिन फाइलों को स्कैन नहीं करना है, उनकी लिस्ट
const EXCLUDED_FILES = [
  'index.html', 
  // अगर और भी कोई फाइल न जोड़नी हो तो यहाँ उसका नाम लिखें
];

/**
 * एक HTML फ़ाइल से मेटाडेटा निकालता है।
 * @param {string} htmlContent - HTML फ़ाइल का कंटेंट।
 * @param {string} filePath - HTML फ़ाइल का पाथ।
 * @returns {object|null} - निकाला गया मेटाडेटा या null।
 */
function extractMetadata(htmlContent, filePath) {
  try {
    const dom = new JSDOM(htmlContent);
    const doc = dom.window.document;

    const title = doc.querySelector('title')?.textContent.trim() || '';
    const paragraph = doc.querySelector('meta[name="description"]')?.getAttribute('content').trim() || '';
    
    // अगर title या description नहीं है, तो इस फ़ाइल को छोड़ दें
    if (!title || !paragraph) {
      // console.warn(`Skipping ${filePath}: Missing title or description.`);
      return null;
    }
    
    // कस्टम मेटा टैग से बाकी जानकारी निकालना
    const author = doc.querySelector('meta[name="author"]')?.getAttribute('content').trim() || 'Mr. Himanshu Tyagi';
    const category = doc.querySelector('meta[name="category"]')?.getAttribute('content').trim() || 'General';
    const readingTime = doc.querySelector('meta[name="reading-time"]')?.getAttribute('content').trim() || '5 min read';
    const page = doc.querySelector('meta[name="page-tags"]')?.getAttribute('content').trim() || 'general';
    
    // Date को meta tag से लेना, या फाइल की जानकारी से लेना
    let date = doc.querySelector('meta[name="publish-date"]')?.getAttribute('content').trim();
    if (!date) {
        // फॉलबैक के तौर पर आज की तारीख
        date = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD format
    }

    // URL को फाइल के नाम से बनाना
    const url = path.basename(filePath);

    return { title, url, paragraph, date, author, category, readingTime, page };
  } catch (error) {
    console.error(`Error parsing metadata from ${filePath}:`, error);
    return null;
  }
}

/**
 * सभी HTML फाइलों को स्कैन करके search-data.json बनाता है।
 */
async function buildSearchData() {
  try {
    const allFiles = await fs.readdir('.', { recursive: true });
    const htmlFiles = allFiles.filter(file => 
        file.endsWith('.html') && !EXCLUDED_FILES.includes(path.basename(file))
    );

    const searchData = [];
    for (const file of htmlFiles) {
      try {
        const htmlContent = await fs.readFile(file, 'utf-8');
        const metadata = extractMetadata(htmlContent, file);
        if (metadata) {
          searchData.push(metadata);
        }
      } catch (readError) {
        console.error(`Could not read file: ${file}`, readError);
      }
    }
    
    // तारीख के हिसाब से पोस्ट को सॉर्ट करना (नया पोस्ट सबसे ऊपर)
    searchData.sort((a, b) => new Date(b.date) - new Date(a.date));

    // search-data.json फाइल में डेटा लिखना
    await fs.writeFile('search-data.json', JSON.stringify(searchData, null, 2));
    console.log(`✅ search-data.json has been generated successfully with ${searchData.length} entries!`);

  } catch (error) {
    console.error('❌ Error generating search data:', error);
    process.exit(1); // एरर आने पर स्क्रिप्ट को रोकें
  }
}

buildSearchData();