import fs from 'fs/promises';
import path from 'path';
import { JSDOM } from 'jsdom';

// जिन फाइलों को स्कैन नहीं करना है
const EXCLUDED_FILES = ['index.html'];

// dist folder
const outputDir = path.join('.', 'dist');

function extractMetadata(htmlContent, filePath) {
  try {
    const dom = new JSDOM(htmlContent);
    const doc = dom.window.document;

    const title = doc.querySelector('title')?.textContent.trim() || '';
    const paragraph = doc.querySelector('meta[name="description"]')?.getAttribute('content')?.trim() || '';
    if (!title || !paragraph) return null;

    const author = doc.querySelector('meta[name="author"]')?.getAttribute('content')?.trim() || 'Mr. Himanshu Tyagi';
    const category = doc.querySelector('meta[name="category"]')?.getAttribute('content')?.trim() || 'General';
    const readingTime = doc.querySelector('meta[name="reading-time"]')?.getAttribute('content')?.trim() || '5 min read';
    const page = doc.querySelector('meta[name="page-tags"]')?.getAttribute('content')?.trim() || 'general';
    let date = doc.querySelector('meta[name="publish-date"]')?.getAttribute('content')?.trim();
    if (!date) date = new Date().toLocaleDateString('en-CA');

    const url = path.basename(filePath);

    return { title, url, paragraph, date, author, category, readingTime, page };
  } catch (error) {
    console.error(`Error parsing metadata from ${filePath}:`, error);
    return null;
  }
}

// Helper: recursively get all html files
async function getHtmlFiles(dir) {
  let files = [];
  const items = await fs.readdir(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      const subFiles = await getHtmlFiles(fullPath);
      files = files.concat(subFiles);
    } else if (item.isFile() && item.name.endsWith('.html') && !EXCLUDED_FILES.includes(item.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

async function buildSearchData() {
  try {
    if (!(await fs.stat(outputDir).catch(()=>false))) {
      await fs.mkdir(outputDir, { recursive: true });
    }

    const htmlFiles = await getHtmlFiles('.');
    const searchData = [];

    for (const file of htmlFiles) {
      try {
        const htmlContent = await fs.readFile(file, 'utf-8');
        const metadata = extractMetadata(htmlContent, file);
        if (metadata) searchData.push(metadata);
      } catch (readError) {
        console.error(`Could not read file: ${file}`, readError);
      }
    }

    searchData.sort((a, b) => new Date(b.date) - new Date(a.date));

    // dist folder में write करो
    await fs.writeFile(path.join(outputDir, 'search-data.json'), JSON.stringify(searchData, null, 2));

    console.log(`✅ search-data.json generated in ${outputDir} with ${searchData.length} entries!`);
  } catch (error) {
    console.error('❌ Error generating search data:', error);
    process.exit(1);
  }
}

buildSearchData();
