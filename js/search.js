// ===============================
// LOAD SEARCH DATA FROM EXTERNAL FILE
// ===============================

let SEARCH_DATA = [];

async function loadSearchData() {
    try {
        const response = await fetch("/js/search-data.js");
        const fileText = await response.text();

        // Convert JS file into real object/array
        SEARCH_DATA = eval(fileText);

        console.log("Search Data Loaded Successfully:");
        console.log(SEARCH_DATA);

    } catch (err) {
        console.error("Failed to load search-data.js:", err);
    }
}

// Call automatically
loadSearchData();
