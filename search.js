// To avoid polluting the global scope, we'll attach our data and functions to a single object.
window.GKApp = window.GKApp || {};

// The search data for the entire website.
window.GKApp.searchData = [
   {
    title: "Angle Conversion: Definition, Types, and Practical Applications",
    url: "https://himanshutyagiji.github.io/gklearnstudys/public/conversion/angle-unit-conversion",
    paragraph:
      "Angle conversion is the process of converting angles between different units like degrees, radians, and gradians. Types: 1. Degree to Radian 2. Radian to Degree.",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" width="440" height="440" role="img" aria-labelledby="title desc">
  <title id="title">Degrees Conversion - Animated Icon</title>
  <desc id="desc">Animated degrees icon with rotating pointer</desc>
  <style>
    .circle-bg {
      fill: #3b82f6;
      filter: drop-shadow(0 6px 8px rgba(59, 130, 246, 0.4));
    }
    .outer-ring {
      fill: none;
      stroke: #93c5fd;
      stroke-width: 8;
      stroke-dasharray: 100;
      stroke-dashoffset: 100;
      animation: dash 3s forwards ease-out;
    }
    .pointer {
      fill: #f97316;
      transform-origin: 110px 110px;
      animation: swing 4s ease-in-out infinite;
    }
    .center-circle {
      fill: #f97316;
    }
    .label {
      fill: #fff;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-weight: 600;
      font-size: 18px;
      text-anchor: middle;
      user-select: none;
    }
    @keyframes swing {
      0%, 100% { transform: rotate(-15deg); }
      50% { transform: rotate(15deg); }
    }
    @keyframes dash {
      to { stroke-dashoffset: 0; }
    }
  </style>

  <!-- Background circle -->
  <circle cx="110" cy="110" r="100" class="circle-bg" />
  
  <!-- Outer ring with dash animation -->
  <circle cx="110" cy="110" r="90" class="outer-ring" />
  
  <!-- Pointer (like a protractor needle) -->
  <rect x="108" y="30" width="4" height="80" rx="2" ry="2" class="pointer" />
  
  <!-- Center circle -->
  <circle cx="110" cy="110" r="12" class="center-circle" />

  <!-- Label -->
  <text x="110" y="190" class="label">Degrees (°)</text>
</svg>
`,
    date: "October 27, 2025",
    author: "Himanshu Tyagi",
    category: "Angle Conversion",
  },
  {
    title:
      "Unit Conversion: Definition and Importance in Daily Life and Science",
    url: "https://himanshutyagiji.github.io/gklearnstudys/public/conversion.html",
    paragraph:
      "Unit conversion is the process of converting a quantity expressed in one unit to another. It helps in standardizing measurements and makes calculations simpler.",
    svg: `<svg  viewBox="0 0 320 320" width="640" height="640" role="img" aria-labelledby="title desc">
  <title id="title">Unit Conversion - Solar System Style Animated Logo</title>
  <desc id="desc">Central UC with orbiting icons representing length, mass, temperature, time, volume, speed each with distinct animations</desc>
  <style>
    
    .bg { fill: none; }
    .badge-circle { fill: #2563eb; filter: drop-shadow(0 6px 10px rgba(37,99,235,0.25)); }
    .uc-text {
      font: bold 48px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      fill: #fff;
      user-select:none;
      text-anchor: middle;
      dominant-baseline: middle;
      letter-spacing: 4px;
      animation: pulseScale 3s ease-in-out infinite;
      transform-origin: 160px 160px;
    }
    .uc-subtext {
      font: 12px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      fill: yellow;
      text-anchor: middle;
      dominant-baseline: middle;
      letter-spacing: 1.5px;
      user-select:none;
      opacity: 0.8;
      animation: fadeInOut 6s ease-in-out infinite;
      transform-origin: 160px 190px;
    }
    .orbit {
      transform-origin: 160px 160px;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      animation-name: rotateCW;
    }
    .orbit-reverse {
      animation-name: rotateCCW;
    }
    .icon-group {
      cursor: default;
      user-select: none;
      transition: transform 0.3s ease;
      transform-origin: center;
    }
    .icon-group:hover {
      transform: scale(1.2);
      filter: brightness(1.2);
    }
    .icon-label {
      font: 12px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      fill: black;
      text-anchor: middle;
      user-select:none;
      pointer-events:none;
     
    }

    /* Animations */
    @keyframes rotateCW {
      from { transform: rotate(0deg);}
      to { transform: rotate(360deg);}
    }
    @keyframes rotateCCW {
      from { transform: rotate(0deg);}
      to { transform: rotate(-360deg);}
    }
    @keyframes pulseScale {
      0%, 100% { transform: scale(1);}
      50% { transform: scale(1.12);}
    }
    @keyframes fadeInOut {
      0%, 100% { opacity: 0.8; }
      50% { opacity: 0.3; }
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0);}
      50% { transform: translateY(-8px);}
    }
    @keyframes swing {
      0%, 100% { transform: rotate(0deg);}
      50% { transform: rotate(10deg);}
    }
    @keyframes blink {
      0%, 50%, 100% { opacity: 1;}
      25%, 75% { opacity: 0.3;}
    }
    @keyframes fillLevel {
      0%, 100% { height: 0; y: 80;}
      50% { height: 24; y: 56;}
    }
    @keyframes dialRotate {
      0%, 100% { transform: rotate(0deg);}
      50% { transform: rotate(45deg);}
    }

  </style>

  <!-- Central Badge -->
  <circle cx="160" cy="160" r="62" class="badge-circle" />
  <text class="uc-text" x="160" y="155" aria-label="UC">UC</text>
  <text class="uc-subtext" x="160" y="190" aria-label="Unit Conversion">Unit Conversion</text>

  <!-- Orbits and icons -->

  <!-- Orbit 1 - Length (rotate clockwise slow) -->
  <g class="orbit" style="animation-duration: 20s;">
    <g class="icon-group" transform="translate(160,50)" aria-label="Length">
      <!-- Ruler icon -->
      <rect x="-48" y="-8" width="96" height="16" rx="3" ry="3" fill="#f97316" />
      <g fill="#fff">
        <rect x="-44" y="-6" width="4" height="12" rx="1" ry="1"/>
        <rect x="-30" y="-6" width="4" height="12" rx="1" ry="1"/>
        <rect x="-16" y="-6" width="4" height="12" rx="1" ry="1"/>
        <rect x="-2"  y="-6" width="4" height="12" rx="1" ry="1"/>
        <rect x="12"  y="-6" width="4" height="12" rx="1" ry="1"/>
        <rect x="26"  y="-6" width="4" height="12" rx="1" ry="1"/>
      </g>
      <text class="icon-label" y="28" x="0">Length (m)</text>
    </g>
  </g>

  <!-- Orbit 2 - Mass (rotate counter-clockwise medium speed) with bounce -->
  <g class="orbit orbit-reverse" style="animation-duration: 14s;">
    <g class="icon-group" style="animation: bounce 3s ease-in-out infinite;" transform="translate(160,270)" aria-label="Mass">
      <!-- Scale icon -->
      <rect x="-20" y="-28" width="40" height="52" rx="6" ry="6" fill="black" />
      <circle cx="0" cy="-20" r="6" fill="#fff" />
      <rect x="-12" y="0" width="24" height="6" rx="3" ry="3" fill="#fff" />
      <polygon points="-20,24 -30,40 30,40 20,24" fill="#10b981" opacity="0.9"/>
      <text class="icon-label" y="42" x="0">Mass (kg)</text>
    </g>
  </g>

  <!-- Orbit 3 - Temperature (rotate clockwise faster) with swing -->
  <g class="orbit" style="animation-duration: 10s;">
    <g class="icon-group" style="animation: swing 4s ease-in-out infinite;" transform="translate(270,160)" aria-label="Temperature">
      <!-- Thermometer icon -->
      <rect x="-10" y="-40" width="20" height="60" rx="10" ry="10" fill="#ef4444" opacity="0.25"/>
      <circle cx="0" cy="20" r="16" fill="#ef4444" opacity="0.45"/>
      <circle cx="0" cy="20" r="8" fill="#fff"/>
      <rect x="-6" y="16" width="12" height="0" rx="6" ry="6" fill="#ef4444" opacity="0.9" style="animation: fillLevel 4s ease-in-out infinite; transform-origin: center bottom;"/>
      <text class="icon-label" y="48" x="0">Temp (°C)</text>
    </g>
  </g>

  <!-- Orbit 4 - Time (rotate counter-clockwise slower) with blinking hands -->
  <g class="orbit orbit-reverse" style="animation-duration: 18s;">
    <g class="icon-group" transform="translate(50,160)" aria-label="Time">
      <!-- Clock base -->
      <circle cx="0" cy="0" r="20" fill="#8b5cf6" opacity="0.15"/>
      <circle cx="0" cy="0" r="18" fill="none" stroke="#8b5cf6" stroke-width="2"/>
      <!-- Hands -->
      <line x1="0" y1="0" x2="0" y2="-10" stroke="#8b5cf6" stroke-width="3" stroke-linecap="round" style="animation: blink 3s linear infinite;"/>
      <line x1="0" y1="0" x2="8" y2="0" stroke="#8b5cf6" stroke-width="3" stroke-linecap="round" style="animation: blink 3s linear infinite 1.5s;"/>
      <text class="icon-label" y="38" x="0">Time (s)</text>
    </g>
  </g>

  <!-- Orbit 5 - Volume (rotate clockwise medium speed) with liquid fill animation -->
  <g class="orbit" style="animation-duration: 12s;">
    <g class="icon-group" transform="translate(230,230)" aria-label="Volume">
      <!-- Beaker base -->
      <path d="M-20 15 L20 15 L14 55 L-14 55 Z" fill="#06b6d4" opacity="0.3"/>
      <!-- Liquid fill -->
      <rect x="-14" y="55" width="28" height="0" fill="#06b6d4" rx="3" ry="3" style="animation: fillLevel 4s ease-in-out infinite; transform-origin: center bottom;"/>
      <!-- Beaker neck -->
      <rect x="-7" y="7" width="14" height="10" rx="3" ry="3" fill="#06b6d4" opacity="0.8"/>
      <text class="icon-label" y="70" x="0">Volume (L)</text>
    </g>
  </g>

  <!-- Orbit 6 - Speed (rotate counter-clockwise fastest) with dial rotation -->
  <g class="orbit orbit-reverse" style="animation-duration: 8s;">
    <g class="icon-group" transform="translate(90,230)" aria-label="Speed">
      <!-- Speedometer base -->
      <circle cx="0" cy="0" r="18" fill="#f59e0b" opacity="0.2"/>
      <circle cx="0" cy="0" r="16" fill="none" stroke="#f59e0b" stroke-width="2"/>
      <!-- Dial needle -->
      <rect x="-1" y="-14" width="2" height="14" rx="1" ry="1" fill="#f59e0b" style="animation: dialRotate 4s linear infinite; transform-origin: center bottom;"/>
      <text class="icon-label" y="38" x="0">Speed (m/s)</text>
    </g>
  </g>

</svg>
`,
    date: "October 26, 2023",
    author: "GK Learn Study",
    category: "Unit Conversion",
  },
 

 
];

/**
 * Performs a fuzzy search on an array of items based on a query.
 * It scores matches based on where they are found (title, paragraph, author)
 * and sorts the results by the highest score.
 *
 * @param {string} query - The search query from the user.
 * @param {Array<Object>} items - The array of post objects to search through.
 * @returns {Array<Object>} - The filtered and sorted array of post objects.
 */
window.GKApp.fuzzySearch = function (query, items) {
  const lowerCaseQuery = query.toLowerCase().trim();
  if (!lowerCaseQuery) {
    return [];
  }

  const queryWords = lowerCaseQuery.split(" ").filter((w) => w.length > 1);

  const results = items
    .map((item) => {
      let score = 0;
      const title = item.title.toLowerCase();
      const paragraph = item.paragraph.toLowerCase();
      const author = item.author.toLowerCase();

      // Direct full-phrase matches get high scores
      if (title.includes(lowerCaseQuery)) score += 20;
      if (paragraph.includes(lowerCaseQuery)) score += 5;

      // Word-based scoring for fuzzy matching
      queryWords.forEach((qWord) => {
        // High score for words in title
        if (title.includes(qWord)) score += 10;
        // Medium score for words in paragraph
        if (paragraph.includes(qWord)) score += 2;
        // Low score for words in author
        if (author.includes(qWord)) score += 1;
      });

      return { item: item, score: score };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((result) => result.item);

  // Remove potential duplicates if an item matches multiple criteria
  // This ensures each post appears only once in the results.
  return [...new Map(results.map((item) => [item.url, item])).values()];
};
