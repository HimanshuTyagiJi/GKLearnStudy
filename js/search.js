window.GKApp = window.GKApp || {};

// The search data for the entire website.
window.GKApp.searchData = [
  // --- Conversion Topics (English) ---
  {
    title: "Weight & Mass Unit Conversion",
    url: "/conversion/weight-mass-unit-conversion",
    paragraph: "Convert between various units of weight and mass, such as kilograms (kg), grams (g), pounds (lb), and ounces (oz). An essential tool for science, cooking, and daily life.",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .balance-beam { fill: #60a5fa; transform-origin: 50px 40px; animation: balance-swing 3s ease-in-out infinite; }
                        .balance-base { fill: #3b82f6; }
                        .pan { fill: #93c5fd; }
                        @keyframes balance-swing { 0%, 100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } }
                        .title { font: bold 10px sans-serif; fill: #1e3a8a; text-anchor: middle; }
                    </style>
                    <text x="50" y="15" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">Weight & Mass</text>
                    <rect class="balance-base" x="47" y="40" width="6" height="45" />
                    <rect class="balance-base" x="35" y="85" width="30" height="5" rx="2"/>
                    <g class="balance-beam">
                        <rect x="10" y="35" width="80" height="10" rx="3"/>
                        <circle class="pan" cx="20" cy="60" r="15"/>
                        <circle class="pan" cx="80" cy="60" r="15"/>
                        <line stroke="#60a5fa" stroke-width="2" x1="20" y1="45" x2="20" y2="50"/>
                        <line stroke="#60a5fa" stroke-width="2" x1="80" y1="45" x2="80" y2="50"/>
                    </g>
                </svg>`,
    date: "February 24, 2025",
    author: "Himanshu Tyagi",
    category: "Conversion",
    readingTime: "8 min read",
  },
  {
    title: "Volume Unit Conversion",
    url: "/conversion/volume-unit-conversion",
    paragraph: "Easily convert between volume units like liters (L), milliliters (mL), gallons, and cubic meters. Essential for chemistry, cooking, and engineering.",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .beaker { stroke: #3b82f6; stroke-width: 3; fill: #dbeafe; }
                        .liquid { fill: #60a5fa; animation: fill-beaker 2.5s ease-in-out infinite alternate; }
                        .bubble { fill: #dbeafe; animation: rise-bubble 2s linear infinite; }
                        @keyframes fill-beaker { from { y: 80; height: 0; } to { y: 40; height: 40; } }
                        @keyframes rise-bubble { from { cy: 80; opacity: 1; } to { cy: 35; opacity: 0; } }
                        .title { font: bold 12px sans-serif; fill: #1e3a8a; text-anchor: middle; }
                    </style>
                    <text x="50" y="20" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">Volume</text>
                    <path class="beaker" d="M25 25 H 75 V 80 Q 75 90, 65 90 H 35 Q 25 90, 25 80 Z" />
                    <rect class="liquid" x="27" y="80" width="46" height="0" />
                    <circle class="bubble" cx="40" cy="80" r="2" />
                    <circle class="bubble" cx="60" cy="80" r="3" style="animation-delay: 0.5s;" />
                    <circle class="bubble" cx="50" cy="80" r="2.5" style="animation-delay: 1s;" />
                </svg>`,
    date: "February 23, 2025",
    author: "Owner",
    category: "Conversion",
    readingTime: "8 min read",
  },
  {
    title: "Time Unit Conversion",
    url: "/conversion/time-unit-conversion",
    paragraph: "Convert time between seconds, minutes, hours, days, and more. A fundamental skill for scheduling, physics calculations, and everyday planning.",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .clock-face { fill: #e0f2fe; stroke: #0ea5e9; stroke-width: 4; }
                        .hand { stroke: #0284c7; stroke-width: 3; stroke-linecap: round; transform-origin: 50px 50px; }
                        .hour-hand { animation: tick-tock 12s linear infinite; }
                        .minute-hand { animation: tick-tock 3s linear infinite; }
                        @keyframes tick-tock { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                        .title { font: bold 12px sans-serif; fill: #0369a1; text-anchor: middle; }
                    </style>
                    <text x="50" y="15" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">Time</text>
                    <circle class="clock-face" cx="50" cy="50" r="40" />
                    <line class="hand hour-hand" x1="50" y1="50" x2="50" y2="30" />
                    <line class="hand minute-hand" x1="50" y1="50" x2="70" y2="50" />
                    <circle fill="#0284c7" cx="50" cy="50" r="3"/>
                </svg>`,
    date: "February 22, 2025",
    author: "Golu Tyagi",
    category: "Conversion",
    readingTime: "7 min read",
  },
  {
    title: "Temperature Unit Conversion - defination,use",
    url: "/conversion/temperature-unit-conversion",
    paragraph: "Switch between temperature scales including Celsius, Fahrenheit, and Kelvin. Crucial for weather forecasting, scientific experiments, and cooking.",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .thermo-bg { fill: #fee2e2; }
                        .thermo-stroke { stroke: #ef4444; stroke-width: 2; }
                        .mercury { fill: #dc2626; animation: temp-rise 3s ease-in-out infinite alternate; }
                        @keyframes temp-rise { from { y: 75; height: 10; } to { y: 30; height: 55; } }
                        .title { font: bold 12px sans-serif; fill: #991b1b; text-anchor: middle; }
                    </style>
                    <text x="50" y="15" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">Temperature</text>
                    <rect x="45" y="25" width="10" height="60" rx="5" class="thermo-bg" stroke="#fca5a5" stroke-width="1"/>
                    <rect id="mercury-rect" x="46" y="75" width="8" height="10" rx="4" class="mercury"/>
                    <circle cx="50" cy="85" r="10" class="mercury"/>
                    <circle cx="50" cy="85" r="12" fill="none" class="thermo-stroke"/>
                </svg>`,
    date: "February 21, 2025",
    author: "Himanshu Tyagi",
    category: "Conversion",
    readingTime: "7 min read",
  },
  {
    title: "Speed Unit Conversion",
    url: "/conversion/speed-unit-conversion",
    paragraph: "Convert speed units such as meters per second (m/s), kilometers per hour (km/h), and miles per hour (mph). Useful in physics, travel, and sports.",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .dial { fill: #f1f5f9; stroke: #475569; stroke-width: 2; }
                        .needle { fill: #ef4444; transform-origin: 50px 80px; animation: sweep-needle 2s ease-in-out infinite alternate; }
                        @keyframes sweep-needle { from { transform: rotate(-120deg); } to { transform: rotate(120deg); } }
                        .title { font: bold 12px sans-serif; fill: #1e293b; text-anchor: middle; }
                    </style>
                    <text x="50" y="20" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">Speed</text>
                    <circle class="dial" cx="50" cy="55" r="40" />
                    <path class="needle" d="M50 80 L 53 40 Q 50 35 47 40 Z" />
                    <circle fill="#1e293b" cx="50" cy="80" r="5" />
                </svg>`,
    date: "February 20, 2025",
    author: "Owner",
    category: "Conversion",
    readingTime: "8 min read",
  },
  {
    title: "Pressure Unit Conversion",
    url: "/conversion/pressure-unit-conversion",
    paragraph: "Convert between pressure units like Pascal (Pa), atmospheres (atm), and pounds per square inch (psi). Important for engineering, meteorology, and physics.",
    svg: `<svg viewBox="0 0 100 100">
                                            <style>.piston{fill:#a5b4fc;animation:compress 2s ease-in-out infinite alternate}.arrow{fill:#4338ca}@keyframes compress{from{y:35;height:20}to{y:25;height:30}}</style>
                                            <rect fill="#e0e7ff" stroke="#4338ca" stroke-width="2" x="25" y="20" width="50" height="60" rx="3"></rect>
                                            <rect class="piston" x="28" y="35" width="44" height="20"></rect>
                                            <path class="arrow" d="M45 65 L 55 65 L 55 75 L 65 70 L 55 65 Z" transform="rotate(90 55 70)"></path>
                                            <path class="arrow" d="M45 35 L 55 35 L 55 25 L 65 30 L 55 35 Z" transform="rotate(-90 55 30)"></path>
                                        </svg>`,
    date: "February 19, 2025",
    author: "Golu Tyagi",
    category: "Conversion",
    readingTime: "7 min read",
  },
  {
    title: "Power Unit Conversion",
    url: "/conversion/power-unit-conversion",
    paragraph: "Convert units of power like watts (W), horsepower (hp), and kilowatts (kW). Essential for physics, engineering, and understanding energy consumption.",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .bolt { fill: #facc15; stroke: #eab308; stroke-width: 2; animation: bolt-flash 1.5s ease-in-out infinite; transform-origin: center; }
                        @keyframes bolt-flash { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.1); opacity: 0.7; } }
                        .title { font: bold 12px sans-serif; fill: #854d0e; text-anchor: middle; }
                    </style>
                    <text x="50" y="15" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">Power</text>
                    <path class="bolt" d="M55,20 L40,55 L60,55 L45,90 L70,50 L50,50 Z"/>
                </svg>`,
    date: "February 18, 2025",
    author: "Himanshu Tyagi",
    category: "Conversion",
    readingTime: "7 min read",
  },
  {
    title: "Length Unit Conversion",
    url: "/conversion/length-unit-conversion",
    paragraph: "Convert between units of length, including meters (m), kilometers (km), miles, and inches. A basic necessity for measurement and construction.",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .ruler { fill: #bfdbfe; stroke: #3b82f6; stroke-width: 1; }
                        .mark { stroke: #2563eb; stroke-width: 2; }
                        .measure-line { stroke: #ef4444; stroke-width: 2.5; stroke-dasharray: 80; stroke-dashoffset: 80; animation: draw-measure 3s ease-in-out infinite alternate; }
                        @keyframes draw-measure { to { stroke-dashoffset: 0; } }
                        .title { font: bold 12px sans-serif; fill: #1e3a8a; text-anchor: middle; }
                    </style>
                    <text x="50" y="20" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">Length</text>
                    <rect class="ruler" x="10" y="60" width="80" height="15" rx="2" />
                    <line class="mark" x1="20" y1="60" x2="20" y2="75" />
                    <line class="mark" x1="40" y1="60" x2="40" y2="70" />
                    <line class="mark" x1="60" y1="60" x2="60" y2="70" />
                    <line class="mark" x1="80" y1="60" x2="80" y2="75" />
                    <path class="measure-line" d="M10 50 H 90" />
                </svg>`,
    date: "February 17, 2025",
    author: "Owner",
    category: "Conversion",
    readingTime: "8 min read",
  },
  {
    title: "Area Unit Conversion",
    url: "/conversion/area-unit-conversion",
    paragraph: "Convert area units such as square meters, square feet, acres, and hectares. Vital for real estate, agriculture, and construction planning.",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .grid { stroke: #a7f3d0; stroke-width: 1; }
                        .area-fill { fill: #10b981; animation: fill-area 3s ease-in-out infinite; }
                        @keyframes fill-area { 0% { width: 0; height: 0; } 50% { width: 60; height: 60; } 100% { width: 0; height: 0; } }
                        .title { font: bold 12px sans-serif; fill: #047857; text-anchor: middle; }
                    </style>
                    <text x="50" y="15" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">Area</text>
                    <path class="grid" d="M20 20 H 80 V 80 H 20 Z M 40 20 V 80 M 60 20 V 80 M 20 40 H 80 M 20 60 H 80" />
                    <rect class="area-fill" x="20" y="20" width="60" height="60" />
                </svg>`,
    date: "February 16, 2025",
    author: "Golu Tyagi",
    category: "Conversion",
    readingTime: "7 min read",
  },
  {
    title: "Angle Unit Conversion",
    url: "/conversion/angle-unit-conversion",
    paragraph: "Convert between degrees, radians, and other angular units. A core concept in mathematics, physics, and engineering for measuring rotation.",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .line { stroke: #3b82f6; stroke-width: 4; stroke-linecap: round; }
                        .moving-line { transform-origin: 30px 70px; animation: sweep-angle 3s ease-in-out infinite alternate; }
                        .arc { fill: #dbeafe; animation: fill-arc 3s ease-in-out infinite alternate; transform-origin: 30px 70px; }
                        @keyframes sweep-angle { from { transform: rotate(0deg); } to { transform: rotate(-75deg); } }
                        @keyframes fill-arc { from { transform: scaleX(0) scaleY(0); } to { transform: scaleX(1) scaleY(1); } }
                        .title { font: bold 12px sans-serif; fill: #1e40af; text-anchor: middle; }
                    </style>
                    <text x="50" y="15" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">Angle</text>
                    <path class="arc" d="M30,70 L 80,70 A 50 50, 0, 0, 0, 44.3, 22.1 L30,70 Z" />
                    <line class="line" x1="30" y1="70" x2="80" y2="70" />
                    <line class="line moving-line" x1="30" y1="70" x2="80" y2="70" />
                </svg>`,
    date: "February 15, 2025",
    author: "Himanshu Tyagi",
    category: "Conversion",
    readingTime: "8 min read",
  },
  {
    title: "Unit Conversion",
    url: "/conversion",
    paragraph: "A comprehensive tool for converting various types of measurement units, including length, mass, volume, and more, for academic and practical applications.",
    svg: `<svg viewBox="0 0 360 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Unit Converter – Swap Cards">
  <title>Unit Converter</title>
  <defs>
    <linearGradient id="uGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#06b6d4"/>
      <stop offset="100%" stop-color="#8b5cf6"/>
    </linearGradient>
    <filter id="s" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-opacity=".25"/>
    </filter>
  </defs>

  <style>
    :root { --t: 4.5s; --font: 600 16px/1.2 Inter, system-ui, sans-serif; }
    .stage { isolation:isolate }
    .card { filter:url(#s); }
    .a, .b { animation: swap var(--t) ease-in-out infinite; transform-origin: 180px 90px; }
    .b { animation-delay: calc(var(--t)/2); }

    .arrowRing { animation: spin var(--t) linear infinite; transform-origin: 180px 90px; }
    .chev { animation: nudge 1.6s ease-in-out infinite; }

    .label { font: var(--font); fill:#0f172a }
    .muted { opacity:.7 }

    @keyframes swap {
      0%   { transform: translateY(0) scale(1); opacity:1 }
      20%  { transform: translateY(-14px) scale(1.02) }
      50%  { transform: translateY(0) scale(1); opacity:1 }
      70%  { transform: translateY(14px)  }
      100% { transform: translateY(0); opacity:1 }
    }
    @keyframes spin { to { transform: rotate(360deg) } }
    @keyframes nudge {
      0%,100% { transform: translateX(0) }
      50%     { transform: translateX(4px) }
    }
  </style>

  <!-- background soft ring -->
  <circle cx="180" cy="90" r="74" fill="none" stroke="url(#uGrad)" stroke-opacity=".25" stroke-width="10"/>

  <g class="stage">

    <!-- left card -->
    <g class="card a">
      <rect x="48" y="50" width="112" height="80" rx="16" fill="white" />
      <rect x="48" y="50" width="112" height="80" rx="16" fill="url(#uGrad)" opacity=".12"/>
      <text x="104" y="88" text-anchor="middle" class="label">cm</text>
      <text x="104" y="110" text-anchor="middle" class="label muted">↔ in</text>
    </g>

    <!-- right card -->
    <g class="card b">
      <rect x="200" y="50" width="112" height="80" rx="16" fill="white" />
      <rect x="200" y="50" width="112" height="80" rx="16" fill="url(#uGrad)" opacity=".12"/>
      <text x="256" y="88" text-anchor="middle" class="label">kg</text>
      <text x="256" y="110" text-anchor="middle" class="label muted">↔ lb</text>
    </g>

    <!-- spinning arrows ring in middle -->
    <g class="arrowRing" stroke="url(#uGrad)" stroke-width="8" fill="none">
      <path d="M180,42 a48,48 0 0 1 45,32" stroke-linecap="round"/>
      <path d="M225,130 a48,48 0 0 1 -90,0" stroke-linecap="round"/>
      <path d="M135,74 a48,48 0 0 1 45,-32" stroke-linecap="round"/>
    </g>

    <!-- chevrons over the ring -->
    <g class="chev">
      <polygon points="180,86 172,90 180,94" fill="url(#uGrad)"/>
      <polygon points="190,86 182,90 190,94" fill="url(#uGrad)"/>
    </g>

    <!-- center badge -->
    <g>
      <circle cx="180" cy="90" r="22" fill="url(#uGrad)"/>
      <circle cx="180" cy="90" r="22" fill="#fff" opacity=".2"/>
      <text x="180" y="95" text-anchor="middle" class="label" style="font-weight:700">1↔1</text>
    </g>
  </g>

  <!-- bottom tagline -->
  <text x="180" y="170" text-anchor="middle" class="label muted">Unit Converter</text>
</svg>
`,
    date: "February 14, 2025",
    author: "Owner",
    category: "Conversion",
    readingTime: "15 min read",
  },

  // --- Vyakaran Topics (Hindi) ---
  {
    title: "निबंध: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/essay-in-hindi.html",
    paragraph: "निबंध लेखन विचारों को व्यवस्थित रूप से प्रस्तुत करने की एक कला है। इस खंड में निबंध के प्रकार, संरचना और प्रभावी लेखन की तकनीकों को जानें।",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .title { font: bold 24px 'Hind', sans-serif; fill: #16a085; text-anchor: middle; }
                        .paper { fill: #ecf0f1; stroke: #bdc3c7; stroke-width: 1; }
                        .line { fill: #7f8c8d; animation: write-line 3s linear infinite; transform-origin: left; }
                        @keyframes write-line { from { transform: scaleX(0); } to { transform: scaleX(1); } }
                    </style>
                    <text x="50" y="30" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">निबंध</text>
                    <rect x="15" y="40" width="70" height="50" rx="3" class="paper" />
                    <rect x="20" y="50" width="60" height="4" rx="2" class="line" />
                    <rect x="20" y="60" width="60" height="4" rx="2" class="line" style="animation-delay: -1s;"/>
                    <rect x="20" y="70" width="60" height="4" rx="2" class="line" style="animation-delay: -2s;"/>
                    <rect x="20" y="80" width="40" height="4" rx="2" class="line" style="animation-delay: -2.5s;"/>
                </svg>`,
    date: "February 13, 2025",
    author: "Golu Tyagi",
    category: "Vyakaran",
    readingTime: "10 min read",
  },
  {
    title: "पत्र-लेखन: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/letter-writing-in-hindi.html",
    paragraph: "पत्र-लेखन संचार का एक महत्वपूर्ण माध्यम है। यहाँ औपचारिक और अनौपचारिक पत्रों के प्रारूप, भाषा-शैली और उदाहरणों का विस्तृत वर्णन है।",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .title { font: bold 24px 'Hind', sans-serif; fill: #2980b9; text-anchor: middle; }
                        .envelope-back { fill: #ecf0f1; }
                        .envelope-front { fill: #bdc3c7; }
                        .flap { fill: #ecf0f1; stroke: #bdc3c7; stroke-width:1; transform-origin: 50px 50px; animation: open-flap 3s ease-in-out infinite alternate; }
                        @keyframes open-flap { to { transform: rotateX(-160deg); } }
                    </style>
                    <text x="50" y="25" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">पत्र-लेखन</text>
                    <rect class="envelope-back" x="15" y="50" width="70" height="40" rx="3"/>
                    <path class="envelope-front" d="M15 50 L 50 75 L 85 50 L 85 90 L 15 90 Z" />
                    <path class="flap" d="M15 50 L 50 75 L 85 50 Z" />
                </svg>`,
    date: "February 12, 2025",
    author: "Himanshu Tyagi",
    category: "Vyakaran",
    readingTime: "9 min read",
  },
  {
    title: "अपठित-गद्यांश: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/unseen-passage-in-hindi.html",
    paragraph: "अपठित गद्यांश का उद्देश्य छात्रों की समझ और विश्लेषण क्षमता का मूल्यांकन करना है। यहाँ गद्यांश को हल करने की सही विधि और रणनीतियाँ बताई गई हैं।",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .title { font: bold 20px 'Hind', sans-serif; fill: #8e44ad; text-anchor: middle; }
                        .paper { fill: #f5f3f7; }
                        .text-line { fill: #d8cde0; }
                        .magnifier { fill: rgba(231, 221, 240, 0.7); stroke: #8e44ad; stroke-width:3; animation: scan-text 4s linear infinite; }
                        @keyframes scan-text { 0% { transform: translate(0, 0); } 25% { transform: translate(25px, 5px); } 50% { transform: translate(0px, 10px); } 75% { transform: translate(-25px, 5px); } 100% { transform: translate(0, 0); } }
                    </style>
                    <text x="50" y="20" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">अपठित-गद्यांश</text>
                    <rect class="paper" x="10" y="30" width="80" height="60" rx="3"/>
                    <rect class="text-line" x="15" y="40" width="70" height="4" rx="2"/>
                    <rect class="text-line" x="15" y="50" width="70" height="4" rx="2"/>
                    <rect class="text-line" x="15" y="60" width="50" height="4" rx="2"/>
                    <g class="magnifier">
                        <circle cx="50" cy="55" r="20" />
                        <line x1="64" y1="69" x2="75" y2="80" stroke-linecap="round"/>
                    </g>
                </svg>`,
    date: "February 11, 2025",
    author: "Owner",
    category: "Vyakaran",
    readingTime: "9 min read",
  },
  {
    title: "अनुच्छेद-लेखन: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/paragraph-writing-in-hindi.html",
    paragraph: "अनुच्छेद-लेखन किसी एक विषय पर संक्षिप्त और सारगर्भित जानकारी प्रस्तुत करने की कला है। यहाँ प्रभावी अनुच्छेद लिखने के नियम और उदाहरण दिए गए हैं।",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .title { font: bold 22px 'Hind', sans-serif; fill: #d35400; text-anchor: middle; }
                        .block { fill: #f5efe6; stroke: #d35400; stroke-width: 1.5; }
                        .line { fill: #e5b486; animation: appear 3s ease-in-out infinite; transform-origin: left;}
                        @keyframes appear { from { transform: scaleX(0); } to { transform: scaleX(1); } }
                    </style>
                    <text x="50" y="30" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">अनुच्छेद-लेखन</text>
                    <rect class="block" x="15" y="40" width="70" height="50" rx="3"/>
                    <rect class="line" x="20" y="50" width="60" height="5" rx="2" style="animation-delay: 0s;"/>
                    <rect class="line" x="20" y="60" width="60" height="5" rx="2" style="animation-delay: 0.5s;"/>
                    <rect class="line" x="20" y="70" width="40" height="5" rx="2" style="animation-delay: 1s;"/>
                </svg>`,
    date: "February 10, 2025",
    author: "Golu Tyagi",
    category: "Vyakaran",
    readingTime: "8 min read",
  },
  {
    title: "अलंकार: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/alankar-in-hindi.html",
    paragraph: "अलंकार काव्य की शोभा बढ़ाने वाले तत्व हैं। इस खंड में शब्दालंकार और अर्थालंकार के प्रमुख भेदों को उदाहरण सहित समझाया गया है।",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .title { font: bold 24px 'Hind', sans-serif; fill: #2980b9; text-anchor: middle; }
                        .gem { fill: #3498db; stroke: #2c3e50; stroke-width: 1.5; transform-origin: center; animation: gem-rotate 5s linear infinite; }
                        .sparkle { fill: #ecf0f1; animation: sparkle-shine 1.5s ease-in-out infinite alternate; }
                        @keyframes gem-rotate { from { transform: rotateY(0deg); } to { transform: rotateY(360deg); } }
                        @keyframes sparkle-shine { from { opacity: 0; transform: scale(0.5); } to { opacity: 1; transform: scale(1); } }
                    </style>
                    <text x="50" y="30" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">अलंकार</text>
                    <path class="gem" d="M50 35 L75 55 L50 90 L25 55 Z" />
                    <path fill="#2980b9" d="M50 35 L75 55 L50 65 Z" />
                    <path fill="#2980b9" d="M50 35 L25 55 L50 65 Z" />
                    <circle class="sparkle" cx="35" cy="50" r="3" style="animation-delay: 0s;"/>
                    <circle class="sparkle" cx="65" cy="50" r="2" style="animation-delay: 0.5s;"/>
                    <circle class="sparkle" cx="50" cy="80" r="3" style="animation-delay: 1s;"/>
                </svg>`,
    date: "February 9, 2025",
    author: "Himanshu Tyagi",
    category: "Vyakaran",
    readingTime: "10 min read",
  },
  {
    title: "छन्द: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/chhand-in-hindi.html",
    paragraph: "छन्द काव्य में वर्णों या मात्राओं की नियमित संख्या के विन्यास को कहते हैं। यहाँ मात्रिक और वर्णिक छंदों के लक्षण और उदाहरण दिए गए हैं।",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .title { font: bold 24px 'Hind', sans-serif; fill: #1abc9c; text-anchor: middle; }
                        .path-line { stroke: #e6f7f4; stroke-width: 10; fill: none; }
                        .beat { fill: #16a085; animation: follow-path 4s linear infinite; }
                        @keyframes follow-path { from { motion-offset: 0%; } to { motion-offset: 100%; } }
                    </style>
                    <text x="50" y="30" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">छन्द</text>
                    <path id="wave" class="path-line" d="M10 60 Q 30 40, 50 60 T 90 60" />
                    <circle class="beat" r="5">
                        <animateMotion dur="4s" repeatCount="indefinite">
                            <mpath href="#wave" />
                        </animateMotion>
                    </circle>
                </svg>`,
    date: "February 8, 2025",
    author: "Owner",
    category: "Vyakaran",
    readingTime: "9 min read",
  },
  {
    title: "रस: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/ras-in-hindi.html",
    paragraph: "रस का शाब्दिक अर्थ है 'आनंद'। काव्य को पढ़ने या सुनने से जिस आनंद की अनुभूति होती है, उसे रस कहते हैं। यहाँ सभी रसों का वर्णन है।",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .title { font: bold 24px 'Hind', sans-serif; fill: #e74c3c; text-anchor: middle; }
                        .drop { fill: #c0392b; animation: drip-anim 3s ease-out infinite; transform-origin: 50px 30px; }
                        .splash { fill: none; stroke: #c0392b; stroke-width: 2; animation: splash-anim 3s ease-out infinite; }
                        @keyframes drip-anim { 0% { transform: translateY(0); opacity: 1; } 60% { transform: translateY(40px); opacity: 1; } 61% { opacity: 0; } 100% { transform: translateY(0); opacity: 0; } }
                        @keyframes splash-anim { 0%, 60% { stroke-dasharray: 0 100; opacity: 0; } 80% { stroke-dasharray: 100 0; opacity: 1; } 100% { opacity: 0; } }
                    </style>
                    <text x="50" y="25" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">रस</text>
                    <path class="drop" d="M50,30 C50,30 65,45 50,60 C35,45 50,30 50,30 Z"/>
                    <circle class="splash" cx="50" cy="75" r="15" />
                </svg>`,
    date: "February 7, 2025",
    author: "Golu Tyagi",
    category: "Vyakaran",
    readingTime: "9 min read",
  },
  {
    title: "युग्म शब्द: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/yugm-shabd.html",
    paragraph: "युग्म-शब्द वे शब्द होते हैं जो उच्चारण में समान लगते हैं, परन्तु उनके अर्थ भिन्न होते हैं। यहाँ ऐसे शब्दों के उदाहरण दिए गए हैं।",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .title { font: bold 22px 'Hind', sans-serif; fill: #34495e; text-anchor: middle; }
                        .word { font: 20px 'Hind', sans-serif; fill: #2c3e50; }
                        .swap-container { animation: do-swap 4s ease-in-out infinite; }
                        @keyframes do-swap { 0%, 45% { transform: translateX(0); } 55%, 100% { transform: translateX(45px); } }
                    </style>
                    <text x="50" y="30" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">युग्म शब्द</text>
                    <g class="swap-container">
                        <text x="15" y="65" class="word">कुल</text>
                    </g>
                    <g class="swap-container" style="animation-direction: reverse;">
                        <text x="15" y="65" class="word">कूल</text>
                    </g>
                </svg>`,
    date: "February 6, 2025",
    author: "Himanshu Tyagi",
    category: "Vyakaran",
    readingTime: "6 min read",
  },
  {
    title: "त्रुटिसम भिन्नार्थक शब्द: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/pairs-of-similar-words.html",
    paragraph: "ये वे शब्द हैं जो सुनने में लगभग समान लगते हैं, पर उनकी वर्तनी और अर्थ में सूक्ष्म अंतर होता है। यह भाषा को समृद्ध बनाता है।",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .title { font: bold 14px 'Hind', sans-serif; fill: #9b59b6; text-anchor: middle; }
                        .ear { fill: #d7bde2; stroke: #8e44ad; stroke-width:2; }
                        .sound-wave { stroke: #9b59b6; stroke-width:2; fill:none; animation: radiate 2s linear infinite; }
                        @keyframes radiate { from { r:0; opacity: 1; } to { r:15; opacity: 0; } }
                    </style>
                    <text x="50" y="20" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">त्रुटिसम भिन्नार्थक शब्द</text>
                    <path class="ear" d="M40 30 C 20 30, 20 80, 40 80 S 60 70, 50 55 C 50 55, 60 40, 40 30" />
                    <circle class="sound-wave" cx="60" cy="55" r="0" />
                    <circle class="sound-wave" cx="60" cy="55" r="0" style="animation-delay: -1s;" />
                </svg>`,
    date: "February 5, 2025",
    author: "Owner",
    category: "Vyakaran",
    readingTime: "7 min read",
  },
  {
    title: "एकार्थक प्रतीत होने वाले शब्द: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/words-apparently-similar-in-meanings-in-hindi.html",
    paragraph: "कुछ शब्द देखने में समान अर्थ वाले लगते हैं, लेकिन उनके प्रयोग और अर्थ में सूक्ष्म भिन्नता होती है। यहाँ ऐसे ही शब्दों का संकलन है।",
    svg: `<svg viewBox="0 0 100 100">
                     <style>
                        .title { font: bold 14px 'Hind', sans-serif; fill: #34495e; text-anchor: middle; }
                        .face { fill: #bdc3c7; stroke: #7f8c8d; stroke-width: 2; }
                        .eye { fill: #2c3e50; }
                        .mask-reveal { animation: reveal 4s ease-in-out infinite; }
                        @keyframes reveal { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-30px); } }
                    </style>
                    <text x="50" y="20" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">एकार्थक प्रतीत होने वाले शब्द</text>
                    <circle class="face" cx="50" cy="65" r="25"/>
                    <circle class="eye" cx="42" cy="60" r="3" />
                    <circle class="eye" cx="58" cy="60" r="3" />
                    <path d="M45,75 Q50,85 55,75" stroke="#2c3e50" stroke-width="2" fill="none"/>
                    <g class="mask-reveal">
                         <circle class="face" cx="50" cy="65" r="25" style="fill:#ecf0f1;"/>
                         <circle class="eye" cx="42" cy="60" r="3" />
                         <circle class="eye" cx="58" cy="60" r="3" />
                         <path d="M45,75 Q50,80 55,75" stroke="#2c3e50" stroke-width="2" fill="none"/>
                    </g>
                </svg>`,
    date: "February 4, 2025",
    author: "Golu Tyagi",
    category: "Vyakaran",
    readingTime: "6 min read",
  },
  {
    title: "अनेकार्थी-शब्द: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/words-of-many-meanings-in-hindi.html",
    paragraph: "अनेकार्थी शब्द वे होते हैं जिनके एक से अधिक अर्थ निकलते हैं। प्रसंग के अनुसार उनका सही अर्थ समझा जाता है।",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .title { font: bold 22px 'Hind', sans-serif; fill: #f1c40f; text-anchor: middle; }
                        .center { fill: #f39c12; }
                        .branch { fill: #f1c40f; transition: transform 0.3s ease-out; }
                        .container:hover .branch { transform: scale(1.1); }
                        .text { font-size: 10px; fill: #7e5109; }
                    </style>
                    <text x="50" y="25" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">अनेकार्थी-शब्द</text>
                    <g class="container">
                        <circle cx="50" cy="60" r="15" class="center"/>
                        <path class="branch" d="M50 60 L 20 35 H 30 L 50 55 Z" />
                        <path class="branch" d="M50 60 L 80 35 H 70 L 50 55 Z" />
                        <path class="branch" d="M50 60 L 20 85 H 30 L 50 65 Z" />
                        <path class="branch" d="M50 60 L 80 85 H 70 L 50 65 Z" />
                        <text class="text" x="50" y="64" text-anchor="middle">कर</text>
                        <text class="text" x="15" y="32">हाथ</text>
                        <text class="text" x="75" y="32">टैक्स</text>
                    </g>
                </svg>`,
    date: "February 3, 2025",
    author: "Himanshu Tyagi",
    category: "Vyakaran",
    readingTime: "7 min read",
  },
  {
    title: "अनेक शब्दों के लिए एक शब्द: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/one-word-substitution-in-hindi.html",
    paragraph: "भाषा को संक्षिप्त और प्रभावशाली बनाने के लिए वाक्यांश या अनेक शब्दों के स्थान पर एक शब्द का प्रयोग किया जाता है।",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .title { font: bold 14px 'Hind', sans-serif; fill: #2c3e50; text-anchor: middle; }
                        .funnel { fill: #95a5a6; stroke: #7f8c8d; stroke-width: 1.5; }
                        .many-words, .one-word { fill: #34495e; opacity: 0; animation: pass-through 4s linear infinite; }
                        .one-word { animation-delay: -2s; }
                        @keyframes pass-through { 0% { opacity: 0; transform: translateY(-10px); } 25% { opacity: 1; transform: translateY(0px); } 50% { opacity: 0; transform: translateY(10px); } 100% { opacity: 0; } }
                    </style>
                    <text x="50" y="20" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">अनेक शब्दों के लिए एक शब्द</text>
                    <text x="50" y="35" text-anchor="middle" class="many-words" font-size="10">जो कभी न मरे</text>
                    <path class="funnel" d="M25 40 L 75 40 L 55 70 L 45 70 Z" />
                    <text x="50" y="85" text-anchor="middle" class="one-word" font-size="12">अमर</text>
                </svg>`,
    date: "February 2, 2025",
    author: "Owner",
    category: "Vyakaran",
    readingTime: "8 min read",
  },
  {
    title: "लोकोक्तियाँ: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/proverbs-in-hindi.html",
    paragraph: "लोकोक्तियाँ या कहावतें ऐसे वाक्यांश हैं जो अपने अनुभव और परंपरा के आधार पर बने हैं और किसी सत्य को प्रकट करते हैं।",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .title { font: bold 24px 'Hind', sans-serif; fill: #27ae60; text-anchor: middle; }
                        .bubble { fill: #d5f5e3; stroke: #58d68d; stroke-width: 2; animation: float-up 5s ease-in-out infinite; }
                        @keyframes float-up { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
                    </style>
                    <text x="50" y="30" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">लोकोक्तियाँ</text>
                    <path class="bubble" d="M20 80 Q 20 40, 50 40 T 80 80 H 20 Z" />
                    <path class="bubble" d="M30 90 C 20 100, 40 105, 40 95" fill="#d5f5e3" style="animation-delay: -0.2s"/>
                </svg>`,
    date: "February 1, 2025",
    author: "Golu Tyagi",
    category: "Vyakaran",
    readingTime: "9 min read",
  },
  {
    title: "मुहावरे: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/idioms-in-hindi.html",
    paragraph: "मुहावरे ऐसे वाक्यांश होते हैं जो अपने सामान्य अर्थ को छोड़कर किसी विशेष अर्थ को व्यक्त करते हैं, जिससे भाषा रोचक बनती है।",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .title { font: bold 24px 'Hind', sans-serif; fill: #f39c12; text-anchor: middle; }
                        .bulb-glass { fill: #fef9e7; }
                        .bulb-base { fill: #d0d3d4; }
                        .glow { fill: #fdebd0; r: 30; animation: bulb-glow 2s ease-in-out infinite alternate; }
                        @keyframes bulb-glow { from { opacity: 0; } to { opacity: 0.8; } }
                    </style>
                    <text x="50" y="30" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">मुहावरे</text>
                    <circle class="glow" cx="50" cy="55" />
                    <path class="bulb-glass" d="M50,35 C65,35 75,45 75,55 A25 25 0 0 1 25 55 C25,45 35,35 50,35 Z" />
                    <rect class="bulb-base" x="40" y="80" width="20" height="10" rx="2" />
                </svg>`,
    date: "January 31, 2025",
    author: "Himanshu Tyagi",
    category: "Vyakaran",
    readingTime: "9 min read",
  },
  {
    title: "पर्यायवाची-शब्द: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/synonyms-in-hindi.html",
    paragraph: "पर्यायवाची शब्द (समानार्थक शब्द) उन शब्दों को कहते हैं जिनके अर्थ समान होते हैं। यह शब्द-भंडार को समृद्ध करते हैं।",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .title { font: bold 22px 'Hind', sans-serif; fill: #2ecc71; text-anchor: middle; }
                        .word { font: 20px 'Hind', sans-serif; fill: #27ae60; }
                        .arrows { stroke: #1abc9c; stroke-width: 3; fill: none; animation: cycle 3s linear infinite; }
                        @keyframes cycle { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                    </style>
                    <text x="50" y="25" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">पर्यायवाची-शब्द</text>
                    <text x="50" y="50" class="word" text-anchor="middle">जल</text>
                    <text x="50" y="80" class="word" text-anchor="middle">नीर</text>
                    <g transform="translate(50,65) scale(1.5)" class="arrows">
                        <path d="M0 -5 l 5 5 l -5 5" />
                        <path d="M0 5 l -5 -5 l 5 -5" transform="rotate(180 0 0)"/>
                    </g>
                </svg>`,
    date: "January 30, 2025",
    author: "Owner",
    category: "Vyakaran",
    readingTime: "8 min read",
  },
  {
    title: "विलोम-शब्द: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/antonyms-in-hindi.html",
    paragraph: "विलोम शब्द (विपरीतार्थक शब्द) वे शब्द होते हैं जो किसी दूसरे शब्द का उल्टा अर्थ बताते हैं। यह भाषा में संतुलन लाते हैं।",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .title { font: bold 24px 'Hind', sans-serif; fill: #34495e; text-anchor: middle; }
                        .sun { fill: #f1c40f; transform-origin: center; animation: spin 8s linear infinite; }
                        .moon { fill: #ecf0f1; animation: slide 4s ease-in-out infinite alternate; }
                        @keyframes spin { to { transform: rotate(360deg); } }
                        @keyframes slide { from { transform: translateX(-25px); } to { transform: translateX(25px); } }
                    </style>
                    <text x="50" y="30" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">विलोम-शब्द</text>
                    <circle class="sun" cx="50" cy="60" r="25"/>
                    <circle class="moon" cx="50" cy="60" r="25"/>
                </svg>`,
    date: "January 29, 2025",
    author: "Golu Tyagi",
    category: "Vyakaran",
    readingTime: "8 min read",
  },
  {
    title: "देशज-विदेशज: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/deshaj-videshaj-in-hindi.html",
    paragraph: "देशज शब्द स्थानीय बोलियों से आते हैं, जबकि विदेशज शब्द अन्य भाषाओं से लिए गए हैं। यह हिंदी भाषा की विविधता को दर्शाता है।",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .title { font: bold 22px 'Hind', sans-serif; fill: #16a085; text-anchor: middle; }
                        .globe { fill: #a2d9ce; stroke: #48c9b0; stroke-width: 2; }
                        .plane { fill: #c0392b; animation: fly-around 5s linear infinite; }
                        @keyframes fly-around { from { motion-offset: 0%; } to { motion-offset: 100%; } }
                    </style>
                    <text x="50" y="25" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">देशज-विदेशज</text>
                    <circle id="orbit" cx="50" cy="60" r="35" fill="none"/>
                    <circle class="globe" cx="50" cy="60" r="30"/>
                    <path class="plane" d="M0,0 l-10,5 l10,-2 l-10,-2 z">
                       <animateMotion dur="5s" repeatCount="indefinite" rotate="auto">
                            <mpath href="#orbit" />
                        </animateMotion>
                    </path>
                </svg>`,
    date: "January 28, 2025",
    author: "Himanshu Tyagi",
    category: "Vyakaran",
    readingTime: "8 min read",
  },
  {
    title: "तत्सम-तद्भव: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/tatsam-tadbhav-in-hindi.html",
    paragraph: "तत्सम शब्द संस्कृत से ज्यों के त्यों लिए गए हैं, जबकि तद्भव शब्द संस्कृत से परिवर्तित होकर बने हैं।",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .title { font: bold 22px 'Hind', sans-serif; fill: #d35400; text-anchor: middle; }
                        .word { font: 18px 'Hind', sans-serif; fill: #e67e22; }
                        .arrow { fill: #d35400; animation: arrow-flow 2s ease-in-out infinite; }
                        @keyframes arrow-flow { 0%, 100% { transform: scaleX(1); } 50% { transform: scaleX(1.2); } }
                    </style>
                    <text x="50" y="30" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">तत्सम-तद्भव</text>
                    <text x="25" y="65" class="word" text-anchor="middle">अग्नि</text>
                    <text x="75" y="65" class="word" text-anchor="middle">आग</text>
                    <path class="arrow" transform="translate(50, 60)" d="M-10,0 L0,-5 L10,0 L0,5 Z" />
                </svg>`,
    date: "January 27, 2025",
    author: "Owner",
    category: "Vyakaran",
    readingTime: "8 min read",
  },
  {
    title: "समास: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/compound-in-hindi.html",
    paragraph: "समास दो या दो से अधिक शब्दों को मिलाकर एक नया और संक्षिप्त शब्द बनाने की प्रक्रिया है। इसके प्रमुख भेदों का वर्णन यहाँ है।",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .title { font: bold 24px 'Hind', sans-serif; fill: #2980b9; text-anchor: middle; }
                        .box { fill: #aed6f1; stroke: #5dade2; stroke-width: 2; }
                        .plus { fill: #2980b9; font-weight: bold; font-size: 20px; }
                        .anim-group { animation: combine 2.5s ease-in-out infinite alternate; }
                        @keyframes combine { to { transform: translateX(15px); } }
                    </style>
                    <text x="50" y="30" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">समास</text>
                    <g class="anim-group" style="animation-direction: alternate-reverse;">
                         <rect class="box" x="10" y="50" width="30" height="30" rx="3" />
                         <text x="25" y="70" text-anchor="middle" font-size="12">राज</text>
                    </g>
                    <g class="anim-group">
                        <rect class="box" x="60" y="50" width="30" height="30" rx="3" />
                        <text x="75" y="70" text-anchor="middle" font-size="12">पुत्र</text>
                    </g>
                    <text class="plus" x="45" y="68">+</text>
                </svg>`,
    date: "January 26, 2025",
    author: "Golu Tyagi",
    category: "Vyakaran",
    readingTime: "10 min read",
  },
  {
    title: "संधि: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/joining.html",
    paragraph: "संधि का अर्थ है 'मेल'। दो निकटवर्ती वर्णों के मेल से जो विकार (परिवर्तन) होता है, उसे संधि कहते हैं।",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .title { font: bold 24px 'Hind', sans-serif; fill: #8e44ad; text-anchor: middle; }
                        .p1, .p2 { fill: #d7bde2; stroke: #a569bd; stroke-width: 2; animation: join-puzzle 2s ease-in-out infinite alternate; }
                        .p2 { animation-direction: alternate-reverse; }
                        @keyframes join-puzzle { to { transform: translateX(10px); } }
                    </style>
                    <text x="50" y="30" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">संधि</text>
                    <path class="p1" d="M20 40 H 50 V 50 C 50 55, 45 55, 45 60 S 50 65, 50 70 V 80 H 20 Z" />
                    <path class="p2" d="M80 40 H 50 V 50 C 50 55, 55 55, 55 60 S 50 65, 50 70 V 80 H 80 Z" />
                </svg>`,
    date: "January 25, 2025",
    author: "Himanshu Tyagi",
    category: "Vyakaran",
    readingTime: "10 min read",
  },
  {
    title: "प्रत्यय: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/suffix-in-hindi.html",
    paragraph: "प्रत्यय वे शब्दांश हैं जो किसी शब्द के अंत में जुड़कर उसके अर्थ में विशेषता या परिवर्तन लाते हैं।",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .title { font: bold 24px 'Hind', sans-serif; fill: #27ae60; text-anchor: middle; }
                        .word, .suffix { font: 20px 'Hind', sans-serif; }
                        .word { fill: #2c3e50; }
                        .suffix { fill: #27ae60; animation: attach-suffix 2s ease-out infinite; }
                        @keyframes attach-suffix { from { transform: translateX(30px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
                    </style>
                    <text x="50" y="30" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">प्रत्यय</text>
                    <text class="word" x="30" y="65">समाज</text>
                    <text class="suffix" x="65" y="65">इक</text>
                </svg>`,
    date: "January 24, 2025",
    author: "Owner",
    category: "Vyakaran",
    readingTime: "8 min read",
  },
  {
    title: "उपसर्ग: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/prefix-in-hindi.html",
    paragraph: "उपसर्ग वे शब्दांश हैं जो किसी शब्द के आरंभ में जुड़कर उसके अर्थ को बदल देते हैं या नया अर्थ देते हैं।",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .title { font: bold 24px 'Hind', sans-serif; fill: #c0392b; text-anchor: middle; }
                        .word, .prefix { font: 20px 'Hind', sans-serif; }
                        .word { fill: #2c3e50; }
                        .prefix { fill: #c0392b; animation: attach-prefix 2s ease-out infinite; }
                        @keyframes attach-prefix { from { transform: translateX(-30px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
                    </style>
                    <text x="50" y="30" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">उपसर्ग</text>
                    <text class="prefix" x="30" y="65">अप</text>
                    <text class="word" x="55" y="65">मान</text>
                </svg>`,
    date: "January 23, 2025",
    author: "Golu Tyagi",
    category: "Vyakaran",
    readingTime: "8 min read",
  },
  {
    title: "विराम-चिन्ह: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/punctuation-in-hindi.html",
    paragraph: "विराम-चिन्हों का प्रयोग भाषा में स्पष्टता और भावों की सही अभिव्यक्ति के लिए किया जाता है। यहाँ सभी चिन्हों का वर्णन है।",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .title { font: bold 22px 'Hind', sans-serif; fill: #7f8c8d; text-anchor: middle; }
                        .mark { font: 50px sans-serif; fill: #34495e; animation: blink-mark 2s linear infinite; }
                        @keyframes blink-mark { 0%, 40% { opacity: 1; } 50%, 90% { opacity: 0; } 100% { opacity: 1; } }
                    </style>
                    <text x="50" y="30" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">विराम-चिन्ह</text>
                    <text x="30" y="75" class="mark">?</text>
                    <text x="65" y="75" class="mark" style="animation-delay: -1s;">!</text>
                </svg>`,
    date: "January 22, 2025",
    author: "Himanshu Tyagi",
    category: "Vyakaran",
    readingTime: "8 min read",
  },
  {
    title: "पुरुष: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/person-in-hindi.html",
    paragraph: "व्याकरण में पुरुष से तात्पर्य वक्ता, श्रोता और अन्य व्यक्ति से है। इसके तीन भेद हैं - उत्तम, मध्यम और अन्य पुरुष।",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .title { font: bold 24px 'Hind', sans-serif; fill: #16a085; text-anchor: middle; }
                        .person { fill: #a2d9ce; stroke: #1abc9c; stroke-width:2; }
                        .p1, .p2, .p3 { animation: highlight 3s linear infinite; }
                        .p2 { animation-delay: -1s; } .p3 { animation-delay: -2s; }
                        @keyframes highlight{ 0%, 100% { fill: #a2d9ce; } 50% { fill: #16a085; } }
                    </style>
                    <text x="50" y="30" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">पुरुष</text>
                    <circle class="person p1" cx="30" cy="65" r="15"/>
                    <circle class="person p2" cx="50" cy="65" r="15"/>
                    <circle class="person p3" cx="70" cy="65" r="15"/>
                </svg>`,
    date: "January 21, 2025",
    author: "Owner",
    category: "Vyakaran",
    readingTime: "6 min read",
  },
  {
    title: "वाच्य: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/voice-in-hindi.html",
    paragraph: "वाच्य क्रिया का वह रूप है जिससे यह पता चलता है कि वाक्य में कर्ता, कर्म या भाव में से किसकी प्रधानता है।",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .title { font: bold 24px 'Hind', sans-serif; fill: #2980b9; text-anchor: middle; }
                        .speaker { fill: #5dade2; }
                        .wave { stroke: #aed6f1; stroke-width: 2; fill:none; animation: speak-wave 1.5s linear infinite; }
                        @keyframes speak-wave { from { d: path('M55 55 c 5 0, 10 -10, 15 0'); opacity: 1; } to { d: path('M55 55 c 10 0, 20 -20, 30 0'); opacity: 0; } }
                    </style>
                    <text x="50" y="30" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">वाच्य</text>
                    <circle class="speaker" cx="40" cy="55" r="15" />
                    <path class="wave" />
                    <path class="wave" style="animation-delay: -0.5s;" />
                </svg>`,
    date: "January 20, 2025",
    author: "Golu Tyagi",
    category: "Vyakaran",
    readingTime: "7 min read",
  },
  {
    title: "निपात: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/particle-in-hindi.html",
    paragraph: "निपात वे अव्यय शब्द हैं जो किसी शब्द या पद के बाद लगकर उसके अर्थ में विशेष प्रकार का बल या भाव उत्पन्न करते हैं।",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .title { font: bold 24px 'Hind', sans-serif; fill: #f39c12; text-anchor: middle; }
                        .word { font: 20px 'Hind', sans-serif; fill: #34495e; }
                        .emphasis { fill: #f5b041; animation: pop 1s ease-in-out infinite alternate; transform-origin: center; }
                    </style>
                    <text x="50" y="30" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">निपात</text>
                    <text class="word" x="25" y="65">मैं</text>
                    <g class="emphasis">
                        <text class="word" x="45" y="65" style="fill: #d35400; font-weight: bold;">भी</text>
                    </g>
                    <text class="word" x="65" y="65">चलूँगा</text>
                    @keyframes pop { to { transform: scale(1.2); } }
                </svg>`,
    date: "January 19, 2025",
    author: "Himanshu Tyagi",
    category: "Vyakaran",
    readingTime: "6 min read",
  },
  {
    title: "अव्यय: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/indeclinable-words-in-hindi.html",
    paragraph: "अव्यय या अविकारी शब्द वे होते हैं जिनमें लिंग, वचन, पुरुष, कारक आदि के कारण कोई विकार या परिवर्तन नहीं होता।",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .title { font: bold 24px 'Hind', sans-serif; fill: #7f8c8d; text-anchor: middle; }
                        .rock { fill: #bdc3c7; stroke: #95a5a6; stroke-width: 2; animation: slight-shake 5s linear infinite; }
                        @keyframes slight-shake { 2% { transform: translate(1px, -1px); } 4% { transform: translate(-1px, 1px); } 6%, 100% { transform: translate(0,0); } }
                    </style>
                    <text x="50" y="30" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">अव्यय</text>
                    <path class="rock" d="M20 80 Q 30 50, 50 55 T 80 80 Z" />
                </svg>`,
    date: "January 18, 2025",
    author: "Owner",
    category: "Vyakaran",
    readingTime: "7 min read",
  },
  {
    title: "काल: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/tense-in-hindi.html",
    paragraph: "काल क्रिया के उस रूप को कहते हैं जिससे उसके करने या होने के समय का बोध होता है। इसके तीन मुख्य भेद हैं - भूत, वर्तमान, भविष्य।",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .title { font: bold 24px 'Hind', sans-serif; fill: #8e44ad; text-anchor: middle; }
                        .glass { stroke: #a569bd; stroke-width: 3; fill: none; }
                        .sand { fill: #d7bde2; animation: sand-flow 4s linear infinite; }
                        @keyframes sand-flow { 0% { transform: translateY(0); } 100% { transform: translateY(30px); } }
                    </style>
                    <text x="50" y="25" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">काल</text>
                    <path class="glass" d="M30 30 H 70 V 45 L 50 60 L 70 75 V 90 H 30 V 75 L 50 60 L 30 45 Z" />
                    <path class="sand" d="M33 33 H 67 V 45 L 50 58 L 33 45 Z" />
                </svg>`,
    date: "January 17, 2025",
    author: "Golu Tyagi",
    category: "Vyakaran",
    readingTime: "8 min read",
  },
  {
    title: "क्रिया: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/verb-in-hindi.html",
    paragraph: "जिस शब्द से किसी कार्य के करने या होने का बोध हो, उसे क्रिया कहते हैं। यह सकर्मक और अकर्मक दो प्रकार की होती है।",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .vyakaran-title { font: bold 24px 'Hind', sans-serif; fill: #27ae60; text-anchor: middle; }
                        .stick-figure { stroke: #34495e; stroke-width: 4; fill: none; }
                        .leg1 { transform-origin: 50px 80px; animation: run-leg1 0.5s infinite alternate; }
                        .leg2 { transform-origin: 50px 80px; animation: run-leg2 0.5s infinite alternate; }
                        @keyframes run-leg1 { from { transform: rotate(-30deg); } to { transform: rotate(30deg); } }
                        @keyframes run-leg2 { from { transform: rotate(30deg); } to { transform: rotate(-30deg); } }
                    </style>
                    <text x="50" y="30" class="vyakaran-title" textLength="95" lengthAdjust="spacingAndGlyphs">क्रिया</text>
                    <!-- Body -->
                    <circle class="stick-figure" cx="50" cy="50" r="10" />
                    <line class="stick-figure" x1="50" y1="60" x2="50" y2="80" />
                    <!-- Legs -->
                    <line class="stick-figure leg1" x1="50" y1="80" x2="40" y2="100" />
                    <line class="stick-figure leg2" x1="50" y1="80" x2="60" y2="100" />
                    <!-- Arms -->
                    <line class="stick-figure leg2" x1="50" y1="65" x2="65" y2="75" />
                    <line class="stick-figure leg1" x1="50" y1="65" x2="35" y2="75" />
                </svg>`,
    date: "January 16, 2025",
    author: "Himanshu Tyagi",
    category: "Vyakaran",
    readingTime: "9 min read",
  },
  {
    title: "विशेषण: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/adjective-in-hindi.html",
    paragraph: "जो शब्द संज्ञा या सर्वनाम की विशेषता बताते हैं, उन्हें विशेषण कहते हैं। यह गुण, संख्या, परिमाण आदि से संबंधित हो सकते हैं।",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .title { font: bold 24px 'Hind', sans-serif; fill: #2980b9; text-anchor: middle; }
                        .object { fill: #aed6f1; }
                        .highlight { stroke: #5dade2; stroke-width: 3; fill: none; animation: glow 2s ease-in-out infinite; }
                        @keyframes glow { 0%, 100% { stroke-dasharray: 1 10; stroke-width: 2; opacity: 0.5; } 50% { stroke-dasharray: 5 5; stroke-width: 4; opacity: 1; } }
                    </style>
                    <text x="50" y="30" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">विशेषण</text>
                    <circle class="object" cx="50" cy="65" r="25"/>
                    <circle class="highlight" cx="50" cy="65" r="28"/>
                </svg>`,
    date: "January 15, 2025",
    author: "Owner",
    category: "Vyakaran",
    readingTime: "8 min read",
  },
  {
    title: "सर्वनाम: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/pronoun-in-hindi.html",
    paragraph: "संज्ञा के स्थान पर प्रयोग होने वाले शब्दों को सर्वनाम कहते हैं। जैसे - मैं, तुम, वह, यह आदि।",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .vyakaran-title { font: bold 24px 'Hind', sans-serif; fill: #c0392b; text-anchor: middle; }
                        .pronoun-text { font: 20px 'Hind', sans-serif; fill: #2c3e50; opacity: 0; animation: popIn 0.8s forwards; }
                        .p1 { animation-delay: 0.5s; } .p2 { animation-delay: 1s; } .p3 { animation-delay: 1.5s; }
                        .arrow-path { stroke: #3498db; stroke-width: 3; fill: none; stroke-dasharray: 50; stroke-dashoffset: 50; animation: drawPath 1.5s forwards 1.8s; }
                        @keyframes popIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                        @keyframes drawPath { to { stroke-dashoffset: 0; } }
                    </style>
                    <text x="50" y="30" class="vyakaran-title" textLength="95" lengthAdjust="spacingAndGlyphs">सर्वनाम</text>
                    <text x="15" y="60" class="pronoun-text p1">मैं</text>
                    <text x="45" y="80" class="pronoun-text p2">तुम</text>
                    <text x="75" y="60" class="pronoun-text p3">वह</text>
                    <path class="arrow-path" d="M25,65 Q 50,50 75,65" />
                </svg>`,
    date: "January 14, 2025",
    author: "Golu Tyagi",
    category: "Vyakaran",
    readingTime: "8 min read",
  },
  {
    title: "कारक: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/case-in-hindi.html",
    paragraph: "कारक संज्ञा या सर्वनाम का क्रिया के साथ संबंध बताते हैं। हिंदी में आठ कारक होते हैं, जिनके अपने विभक्ति चिन्ह होते हैं।",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .title { font: bold 24px 'Hind', sans-serif; fill: #16a085; text-anchor: middle; }
                        .node { fill: #a2d9ce; stroke: #1abc9c; stroke-width: 2; }
                        .link { stroke: #16a085; stroke-width: 3; stroke-dasharray: 40; stroke-dashoffset: 40; animation: draw-link 2s ease-in-out infinite alternate; }
                        @keyframes draw-link { to { stroke-dashoffset: 0; } }
                    </style>
                    <text x="50" y="30" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">कारक</text>
                    <circle class="node" cx="30" cy="65" r="15"/>
                    <circle class="node" cx="70" cy="65" r="15"/>
                    <line class="link" x1="45" y1="65" x2="55" y2="65" />
                </svg>`,
    date: "January 13, 2025",
    author: "Himanshu Tyagi",
    category: "Vyakaran",
    readingTime: "8 min read",
  },
  {
    title: "लिंग: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/gender-in-hindi.html",
    paragraph: "जिस चिह्न से यह पता चले कि कोई संज्ञा पुरुष जाति की है या स्त्री जाति की, उसे लिंग कहते हैं। इसके दो भेद हैं - पुल्लिंग और स्त्रीलिंग।",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .title { font: bold 24px 'Hind', sans-serif; fill: #2c3e50; text-anchor: middle; }
                        .male { fill: #5dade2; } .female { fill: #f1948a; }
                        .symbol { transition: transform 0.4s ease-in-out; }
                        .container:hover .male { transform: translateX(-5px); }
                        .container:hover .female { transform: translateX(5px); }
                    </style>
                    <text x="50" y="30" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">लिंग</text>
                    <g class="container">
                        <g class="symbol male">
                            <circle cx="40" cy="60" r="15"/>
                            <path d="M40 45 V 30 M 30 30 H 50" stroke="#5dade2" stroke-width="3" fill="none" stroke-linecap="round"/>
                        </g>
                        <g class="symbol female">
                            <circle cx="60" cy="60" r="15"/>
                             <path d="M60 75 V 90 M 50 90 H 70" stroke="#f1948a" stroke-width="3" fill="none" stroke-linecap="round"/>
                        </g>
                    </g>
                </svg>`,
    date: "January 12, 2025",
    author: "Owner",
    category: "Vyakaran",
    readingTime: "8 min read",
  },
  {
    title: "वचन: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/number-in-hindi.html",
    paragraph: "शब्द के जिस रूप से उसके एक या अनेक होने का बोध हो, उसे वचन कहते हैं। हिंदी में दो वचन हैं - एकवचन और बहुवचन।",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .title { font: bold 24px 'Hind', sans-serif; fill: #9b59b6; text-anchor: middle; }
                        .one { fill: #d7bde2; animation: fade-out 4s linear infinite; }
                        .many { fill: #a569bd; opacity: 0; animation: fade-in 4s linear infinite; }
                        @keyframes fade-out { 0%, 80% { opacity: 1; } 100% { opacity: 0; } }
                        @keyframes fade-in { 0%, 20% { opacity: 0; } 100% { opacity: 1; } }
                    </style>
                    <text x="50" y="30" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">वचन</text>
                    <circle class="one" cx="50" cy="65" r="20"/>
                    <g class="many">
                        <circle cx="35" cy="65" r="10" />
                        <circle cx="65" cy="65" r="10" />
                        <circle cx="50" cy="50" r="10" />
                    </g>
                </svg>`,
    date: "January 11, 2025",
    author: "Golu Tyagi",
    category: "Vyakaran",
    readingTime: "7 min read",
  },
  {
    title: "संज्ञा: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/noun-in-hindi.html",
    paragraph: "किसी व्यक्ति, वस्तु, स्थान, या भाव के नाम को संज्ञा कहते हैं। इसके मुख्य भेद व्यक्तिवाचक, जातिवाचक, और भाववाचक हैं।",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .vyakaran-title { font: bold 24px 'Hind', sans-serif; fill: #e67e22; text-anchor: middle; }
                        .vyakaran-icon { opacity: 0; animation: fadeInScale 1s ease-out forwards; }
                        .icon-person { animation-delay: 0.5s; fill: #3498db; }
                        .icon-place { animation-delay: 1s; fill: #2ecc71; }
                        .icon-thing { animation-delay: 1.5s; fill: #9b59b6; }
                        @keyframes fadeInScale { from { opacity: 0; transform: scale(0.5); } to { opacity: 1; transform: scale(1); } }
                    </style>
                    <text x="50" y="30" class="vyakaran-title" textLength="95" lengthAdjust="spacingAndGlyphs">संज्ञा</text>
                    <!-- Person Icon -->
                    <circle class="vyakaran-icon icon-person" cx="25" cy="65" r="10"/>
                    <rect class="vyakaran-icon icon-person" x="18" y="75" width="14" height="15" rx="5"/>
                    <!-- Place Icon (House) -->
                    <polygon class="vyakaran-icon icon-place" points="40,55 60,55 50,45" />
                    <rect class="vyakaran-icon icon-place" x="42" y="55" width="16" height="20"/>
                    <!-- Thing Icon (Apple) -->
                    <path class="vyakaran-icon icon-thing" d="M75,55 C65,55 65,65 70,70 S80,75 80,65 C85,55 80,55 75,55 Z" />
                    <path class="vyakaran-icon icon-thing" d="M75,55 Q 80 50, 78 45" stroke="#16a085" stroke-width="2" fill="none"/>
                </svg>`,
    date: "January 10, 2025",
    author: "Himanshu Tyagi",
    category: "Vyakaran",
    readingTime: "9 min read",
  },
  {
    title: "वाक्य-विचार: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/syntax-in-hindi.html",
    paragraph: "शब्दों का व्यवस्थित समूह जिससे कोई अर्थ प्रकट हो, वाक्य कहलाता है। यहाँ रचना और अर्थ के आधार पर वाक्य के भेद बताए गए हैं।",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .title { font: bold 22px 'Hind', sans-serif; fill: #34495e; text-anchor: middle; }
                        .word-box { fill: #d6dbdf; stroke: #bdc3c7; stroke-width: 1.5; }
                        .w1, .w2, .w3 { animation: arrange-words 3s ease-in-out infinite; }
                        .w2 { animation-delay: -0.2s; } .w3 { animation-delay: -0.4s; }
                        @keyframes arrange-words { 0%, 100% { y: 70; } 50% { y: 50; } }
                    </style>
                    <text x="50" y="30" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">वाक्य-विचार</text>
                    <rect class="word-box w1" x="15" y="50" width="20" height="20" rx="3" />
                    <rect class="word-box w2" x="40" y="50" width="20" height="20" rx="3" />
                    <rect class="word-box w3" x="65" y="50" width="20" height="20" rx="3" />
                </svg>`,
    date: "January 9, 2025",
    author: "Owner",
    category: "Vyakaran",
    readingTime: "9 min read",
  },
  {
    title: "शब्द-विचार: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/morphology-in-hindi.html",
    paragraph: "वर्णों के सार्थक समूह को शब्द कहते हैं। यहाँ उत्पत्ति, रचना, प्रयोग और अर्थ के आधार पर शब्दों के वर्गीकरण का वर्णन है।",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .title { font: bold 22px 'Hind', sans-serif; fill: #d35400; text-anchor: middle; }
                        .letter { font: 25px 'Hind', sans-serif; fill: #e67e22; animation: form-word 3s ease-in-out infinite; }
                        .l1 { transform: translateX(30px); animation-delay: 0s; }
                        .l2 { transform: translateX(-30px); animation-delay: -0.2s; }
                        @keyframes form-word { 50% { transform: translateX(0); } }
                    </style>
                    <text x="50" y="30" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">शब्द-विचार</text>
                    <text class="letter l1" x="20" y="65">व</text>
                    <text class="letter" x="45" y="65">र्ण</text>
                    <text class="letter l2" x="70" y="65">=</text>
                </svg>`,
    date: "January 8, 2025",
    author: "Golu Tyagi",
    category: "Vyakaran",
    readingTime: "9 min read",
  },
  {
    title: "वर्ण-विचार: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/phonology-in-hindi.html",
    paragraph: "भाषा की सबसे छोटी इकाई वर्ण कहलाती है। इस खंड में स्वर और व्यंजन वर्णों के भेद, उच्चारण स्थान और वर्गीकरण की जानकारी है।",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .title { font: bold 22px 'Hind', sans-serif; fill: #c0392b; text-anchor: middle; }
                        .char { font-family: 'Hind', sans-serif; font-size: 50px; fill: #e74c3c; animation: change-char 4s steps(1, end) infinite; }
                        @keyframes change-char { 0% { opacity: 0; } 25% { opacity: 1; } 50% { opacity: 0; } }
                    </style>
                    <text x="50" y="30" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">वर्ण-विचार</text>
                    <text x="40" y="75" class="char">अ</text>
                    <text x="40" y="75" class="char" style="animation-delay: -2s;">क</text>
                </svg>`,
    date: "January 7, 2025",
    author: "Himanshu Tyagi",
    category: "Vyakaran",
    readingTime: "9 min read",
  },
  {
    title: "भाषा और व्याकरण: परिभाषा, भेद, उदाहरण",
    url: "vyakaran-language.html",
    paragraph: "भाषा विचारों के आदान-प्रदान का माध्यम है, और व्याकरण भाषा को शुद्ध रूप से लिखने और बोलने के नियम सिखाता है।",
    svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .title { font: bold 18px 'Hind', sans-serif; fill: #2c3e50; text-anchor: middle; }
                        .book-cover { fill: #34495e; }
                        .book-page { fill: #ecf0f1; transform-origin: left; animation: turn-page 3s ease-in-out infinite; }
                        @keyframes turn-page { 0% { transform: perspective(300px) rotateY(0deg); } 50% { transform: perspective(300px) rotateY(-180deg); } 100% { transform: perspective(300px) rotateY(-180deg); } }
                    </style>
                    <text x="50" y="25" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">भाषा और व्याकरण</text>
                    <rect class="book-cover" x="25" y="35" width="50" height="60" rx="3" />
                    <rect class="book-page" x="27" y="37" width="23" height="56" />
                </svg>`,
    date: "January 6, 2025",
    author: "Owner",
    category: "Vyakaran",
    readingTime: "11 min read",
  },
];


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
