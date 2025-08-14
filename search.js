
// To avoid polluting the global scope, we'll attach our data and functions to a single object.
window.GKApp = window.GKApp || {};

// The search data for the entire website.
window.GKApp.searchData = [

  {
    title: "Weight & Mass Unit Conversion",
    url: "https://gklearnstudy.in/conversion/weight&mass-unit-conversion",
    paragraph: "Convert between various units of weight and mass, such as kilograms (kg), grams (g), pounds (lb), and ounces (oz). An essential tool for science, cooking, and daily life.",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="wmc-title"><title id="wmc-title">Weight & Mass Conversion</title><style>.base{fill:#a5b4fc;}.beam{fill:#4f46e5;transform-origin:100px 80px;animation:swing 3s ease-in-out infinite;}@keyframes swing{0%,100%{transform:rotate(-5deg)}50%{transform:rotate(5deg)}}</style><path class="base" d="M40 170h120l-20-20H60z"/><rect x="95" y="80" width="10" height="90" fill="#6366f1"/><path class="beam" d="M20 70h160v10H20z"/><circle cx="40" cy="120" r="25" fill="#c7d2fe"/><circle cx="160" cy="120" r="25" fill="#c7d2fe"/></svg>`,
    date: "February 24, 2025",
    author: "Himanshu Tyagi",
    category: "Conversion",
  },
  {
    title: "Volume Unit Conversion",
    url: "https://gklearnstudy.in/conversion/volume-unit-conversion",
    paragraph: "Easily convert between volume units like liters (L), milliliters (mL), gallons, and cubic meters. Essential for chemistry, cooking, and engineering.",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="vc-title"><title id="vc-title">Volume Conversion</title><style>.beaker{fill:none;stroke:#4f46e5;stroke-width:8;}.liquid{fill:#818cf8;animation:fill 3s ease-in-out infinite alternate;}@keyframes fill{from{y:160;height:0;}to{y:90;height:70;}}</style><path class="beaker" d="M40 50h120v110q0 10-10 10H50q-10 0-10-10z"/><rect class="liquid" x="45" y="160" width="110" height="0"/></svg>`,
    date: "February 23, 2025",
    author: "Owner",
    category: "Conversion",
  },
  {
    title: "Time Unit Conversion",
    url: "https://gklearnstudy.in/conversion/time-unit-conversion",
    paragraph: "Convert time between seconds, minutes, hours, days, and more. A fundamental skill for scheduling, physics calculations, and everyday planning.",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="tc-title"><title id="tc-title">Time Conversion</title><style>.hand{stroke:#4f46e5;stroke-width:8;stroke-linecap:round;transform-origin:100px 100px;}.minute{animation:tick 60s linear infinite;}@keyframes tick{to{transform:rotate(360deg)}}</style><circle cx="100" cy="100" r="80" fill="#a5b4fc" stroke="#6366f1" stroke-width="8"/><line class="hand" x1="100" y1="100" x2="100" y2="40"/><line class="hand minute" x1="100" y1="100" x2="150" y2="100"/></svg>`,
    date: "February 22, 2025",
    author: "Golu Tyagi",
    category: "Conversion",
  },
  {
    title: "Temperature Unit Conversion",
    url: "https://gklearnstudy.in/conversion/temperature-unit-conversion",
    paragraph: "Switch between temperature scales including Celsius, Fahrenheit, and Kelvin. Crucial for weather forecasting, scientific experiments, and cooking.",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="tempc-title"><title id="tempc-title">Temperature Conversion</title><style>.thermometer{fill:#a5b4fc;}.mercury{fill:#ef4444;animation:rise 3s ease-in-out infinite alternate;}@keyframes rise{from{height:20;}to{height:80;}}</style><rect x="85" y="40" width="30" height="120" rx="15" class="thermometer"/><circle cx="100" cy="150" r="30" class="thermometer"/><rect x="90" y="80" width="20" class="mercury" height="60" rx="10"/></svg>`,
    date: "February 21, 2025",
    author: "Himanshu Tyagi",
    category: "Conversion",
  },
  {
    title: "Speed Unit Conversion",
    url: "https://gklearnstudy.in/conversion/speed-unit-conversion",
    paragraph: "Convert speed units such as meters per second (m/s), kilometers per hour (km/h), and miles per hour (mph). Useful in physics, travel, and sports.",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="sc-title"><title id="sc-title">Speed Conversion</title><style>.dial{fill:#a5b4fc;stroke:#6366f1;stroke-width:8;}.needle{fill:#ef4444;transform-origin:100px 130px;animation:sweep 2s ease-in-out infinite alternate;}@keyframes sweep{from{transform:rotate(-60deg)}to{transform:rotate(60deg)}}</style><path class="dial" d="M40 130 A 60 60 0 0 1 160 130"/><path class="needle" d="M100 130 L 110 50 L 90 50 z"/></svg>`,
    date: "February 20, 2025",
    author: "Owner",
    category: "Conversion",
  },
  {
    title: "Pressure Unit Conversion",
    url: "https://gklearnstudy.in/conversion/pressure-unit-conversion",
    paragraph: "Convert between pressure units like Pascal (Pa), atmospheres (atm), and pounds per square inch (psi). Important for engineering, meteorology, and physics.",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="pc-title"><title id="pc-title">Pressure Conversion</title><style>.gauge{fill:#a5b4fc;}.arrow{fill:none;stroke:#ef4444;stroke-width:12;stroke-linecap:round;animation:press 3s ease-in-out infinite alternate;}@keyframes press{from{transform:translateX(-20px)}to{transform:translateX(20px)}}</style><rect x="50" y="80" width="100" height="40" rx="10" fill="#e0e7ff"/><path d="M100 80 v -20 l 20 20 h -20 z" fill="#e0e7ff"/><path class="arrow" d="M70 100 h 60"/><path class="arrow" d="M70 100 l -15 -15 m 0 30 l 15 -15"/><path class="arrow" d="M130 100 l 15 -15 m 0 30 l -15 -15"/></svg>`,
    date: "February 19, 2025",
    author: "Golu Tyagi",
    category: "Conversion",
  },
  {
    title: "Power Unit Conversion",
    url: "https://gklearnstudy.in/conversion/power-unit-conversion",
    paragraph: "Convert units of power like watts (W), horsepower (hp), and kilowatts (kW). Essential for physics, engineering, and understanding energy consumption.",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="pwr-title"><title id="pwr-title">Power Conversion</title><style>.bolt{fill:#facc15;stroke:#fbbf24;stroke-width:5;animation:flash 1s linear infinite;}@keyframes flash{0%,100%{opacity:1}50%{opacity:0.2}}</style><path class="bolt" d="M110 30 L 80 100 L 120 100 L 90 170 L 130 90 L 90 90 z"/></svg>`,
    date: "February 18, 2025",
    author: "Himanshu Tyagi",
    category: "Conversion",
  },
  {
    title: "Length Unit Conversion",
    url: "https://gklearnstudy.in/conversion/length-unit-conversion",
    paragraph: "Convert between units of length, including meters (m), kilometers (km), miles, and inches. A basic necessity for measurement and construction.",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="lc-title"><title id="lc-title">Length Conversion</title><style>.ruler{fill:#a5b4fc;stroke:#4f46e5;stroke-width:4;}.mark{stroke:#4f46e5;stroke-width:4;animation:measure 2s ease-in-out infinite;}@keyframes measure{0%{x2:40}50%{x2:160}100%{x2:40}}</style><rect class="ruler" x="20" y="90" width="160" height="20" rx="5"/><line class="mark" x1="40" y1="90" x2="40" y2="110"/></svg>`,
    date: "February 17, 2025",
    author: "Owner",
    category: "Conversion",
  },
  {
    title: "Area Unit Conversion",
    url: "https://gklearnstudy.in/conversion/area-unit-conversion",
    paragraph: "Convert area units such as square meters, square feet, acres, and hectares. Vital for real estate, agriculture, and construction planning.",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="ac-title"><title id="ac-title">Area Conversion</title><style>.grid{fill:none;stroke:#6366f1;stroke-width:2;}.box{fill:#a5b4fc;animation:fill-grid 3s ease-in-out infinite;}@keyframes fill-grid{0%{width:0;height:0;}50%{width:80;height:80;}100%{width:0;height:0;}}</style><path class="grid" d="M60 60h80v80H60z M100 60v80 M60 100h80"/><rect class="box" x="60" y="60" width="0" height="0"/></svg>`,
    date: "February 16, 2025",
    author: "Golu Tyagi",
    category: "Conversion",
  },
  {
    title: "Angle Unit Conversion",
    url: "https://gklearnstudy.in/conversion/angle-unit-conversion",
    paragraph: "Convert between degrees, radians, and other angular units. A core concept in mathematics, physics, and engineering for measuring rotation.",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="angle-title"><title id="angle-title">Angle Conversion</title><style>.arc{fill:none;stroke:#818cf8;stroke-width:8;}.line{stroke:#4f46e5;stroke-width:8;stroke-linecap:round;transform-origin:60px 140px;animation:rotate-angle 4s ease-in-out infinite;}@keyframes rotate-angle{0%{transform:rotate(0deg)}50%{transform:rotate(70deg)}100%{transform:rotate(0deg)}}</style><path class="arc" d="M80 140 A 80 80 0 0 1 131.2 74.3"/><path d="M60 140h100" stroke="#a5b4fc" stroke-width="8"/><path class="line" d="M60 140 l 80 -10"/></svg>`,
    date: "February 15, 2025",
    author: "Himanshu Tyagi",
    category: "Conversion",
  },
  {
    title: "Unit Conversion",
    url: "https://gklearnstudy.in/conversion",
    paragraph: "A comprehensive tool for converting various types of measurement units, including length, mass, volume, and more, for academic and practical applications.",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="uc-title"><title id="uc-title">Unit Conversion</title><style>.arrow{fill:#4f46e5;animation:swap 2s ease-in-out infinite;}.box{fill:#a5b4fc;}</style><rect class="box" x="30" y="80" width="50" height="40" rx="5"/><rect class="box" x="120" y="80" width="50" height="40" rx="5"/><path class="arrow" d="M85 90h20v-10l10 15-10 15v-10H85z"/><g style="animation-delay:-1s;" class="arrow"><path d="M115 110H95v10l-10-15 10-15v10h20z"/></g></svg>`,
    date: "February 14, 2025",
    author: "Owner",
    category: "Conversion",
  },

  // --- Vyakaran Topics (Hindi) ---
  {
    title: "निबंध: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/essay-in-hindi.html",
    paragraph: "निबंध लेखन विचारों को व्यवस्थित रूप से प्रस्तुत करने की एक कला है। इस खंड में निबंध के प्रकार, संरचना और प्रभावी लेखन की तकनीकों को जानें।",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="n-title"><title id="n-title">निबंध</title><style>.paper{fill:#e0e7ff;stroke:#a5b4fc;stroke-width:2;}.text{fill:#6366f1;animation:write 4s steps(10,end) infinite;}@keyframes write{from{width:0;}to{width:80;}}</style><rect x="50" y="50" width="100" height="100" rx="5" class="paper"/><rect x="60" y="70" width="80" height="8" rx="2" class="text" style="animation-delay:-1s;"/><rect x="60" y="90" width="80" height="8" rx="2" class="text" style="animation-delay:-2s;"/><rect x="60" y="110" width="80" height="8" rx="2" class="text" style="animation-delay:-3s;"/></svg>`,
    date: "February 13, 2025",
    author: "Golu Tyagi",
    category: "Vyakaran",
  },
  {
    title: "पत्र-लेखन: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/letter-writing-in-hindi.html",
    paragraph: "पत्र-लेखन संचार का एक महत्वपूर्ण माध्यम है। यहाँ औपचारिक और अनौपचारिक पत्रों के प्रारूप, भाषा-शैली और उदाहरणों का विस्तृत वर्णन है।",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="pl-title"><title id="pl-title">पत्र-लेखन</title><style>.env{fill:#c7d2fe;stroke:#a5b4fc;stroke-width:4;}.flap{fill:#c7d2fe;stroke:#a5b4fc;stroke-width:4;transform-origin:100px 70px;animation:open-flap 3s ease-in-out infinite alternate;}@keyframes open-flap{to{transform:rotateX(-60deg)}}</style><path class="env" d="M40 70h120v60H40z"/><path class="flap" d="M40 70 l60 40 l60-40z"/></svg>`,
    date: "February 12, 2025",
    author: "Himanshu Tyagi",
    category: "Vyakaran",
  },
  {
    title: "अपठित-गद्यांश: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/unseen-passage-in-hindi.html",
    paragraph: "अपठित गद्यांश का उद्देश्य छात्रों की समझ और विश्लेषण क्षमता का मूल्यांकन करना है। यहाँ गद्यांश को हल करने की सही विधि और रणनीतियाँ बताई गई हैं।",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="ag-title"><title id="ag-title">अपठित-गद्यांश</title><style>.glass{stroke:#4f46e5;stroke-width:8;fill:none;}.handle{fill:#4f46e5;}.lens{fill:#a5b4fc;opacity:0.5;animation:scan 4s linear infinite;}@keyframes scan{0%{x:50;y:80;}25%{x:100;y:80;}50%{x:100;y:100;}75%{x:50;y:100;}100%{x:50;y:80;}}</style><rect x="50" y="80" width="100" height="40" fill="#e0e7ff" rx="5"/><circle class="glass" cx="80" cy="80" r="30"/><rect class="handle" x="40" y="40" width="15" height="40" rx="5" transform="rotate(-45 55 40)"/><circle class="lens" cx="0" cy="0" r="15"/></svg>`,
    date: "February 11, 2025",
    author: "Owner",
    category: "Vyakaran",
  },
  {
    title: "अनुच्छेद-लेखन: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/paragraph-writing-in-hindi.html",
    paragraph: "अनुच्छेद-लेखन किसी एक विषय पर संक्षिप्त और सारगर्भित जानकारी प्रस्तुत करने की कला है। यहाँ प्रभावी अनुच्छेद लिखने के नियम और उदाहरण दिए गए हैं।",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="al-title"><title id="al-title">अनुच्छेद-लेखन</title><style>.block{fill:#a5b4fc;animation:pulse 2s ease-in-out infinite alternate;transform-origin:center;}@keyframes pulse{to{transform:scale(1.05)}}</style><rect class="block" x="40" y="70" width="120" height="60" rx="5"/></svg>`,
    date: "February 10, 2025",
    author: "Golu Tyagi",
    category: "Vyakaran",
  },
  {
    title: "अलंकार: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/alankar-in-hindi.html",
    paragraph: "अलंकार काव्य की शोभा बढ़ाने वाले तत्व हैं। इस खंड में शब्दालंकार और अर्थालंकार के प्रमुख भेदों को उदाहरण सहित समझाया गया है।",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="a-title"><title id="a-title">अलंकार</title><style>.gem{fill:#818cf8;stroke:#4f46e5;stroke-width:3;animation:sparkle 2s ease-in-out infinite;}@keyframes sparkle{0%,100%{transform:scale(1);opacity:1;}50%{transform:scale(1.1);opacity:0.8;}}</style><path class="gem" d="M100 40 L 140 80 L 100 160 L 60 80 Z"/><path class="gem" d="M60 80 L 140 80 L 100 120 Z" style="fill:#a5b4fc;"/></svg>`,
    date: "February 9, 2025",
    author: "Himanshu Tyagi",
    category: "Vyakaran",
  },
  {
    title: "छन्द: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/chhand-in-hindi.html",
    paragraph: "छन्द काव्य में वर्णों या मात्राओं की नियमित संख्या के विन्यास को कहते हैं। यहाँ मात्रिक और वर्णिक छंदों के लक्षण और उदाहरण दिए गए हैं।",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="c-title"><title id="c-title">छन्द</title><style>.line{fill:none;stroke:#6366f1;stroke-width:4;}.beat{fill:#a5b4fc;r:8;animation:rhythm 2s ease-in-out infinite;}@keyframes rhythm{0%,100%{cy:90}50%{cy:110}}</style><path class="line" d="M40 100 C 80 80, 120 120, 160 100"/><circle class="beat" cx="60"/><circle class="beat" cx="100" style="animation-delay:-1s;"/><circle class="beat" cx="140"/></svg>`,
    date: "February 8, 2025",
    author: "Owner",
    category: "Vyakaran",
  },
  {
    title: "रस: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/ras-in-hindi.html",
    paragraph: "रस का शाब्दिक अर्थ है 'आनंद'। काव्य को पढ़ने या सुनने से जिस आनंद की अनुभूति होती है, उसे रस कहते हैं। यहाँ सभी रसों का वर्णन है।",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="r-title"><title id="r-title">रस</title><style>.drop{fill:#818cf8;animation:drip 3s ease-out infinite;transform-origin:100px 50px;}@keyframes drip{0%{transform:scale(1);opacity:1;}80%{transform:scale(1);opacity:1;}100%{transform:translateY(100px) scale(0.5);opacity:0;}}</style><path class="drop" d="M100 50 C 100 50, 120 70, 100 100 C 80 70, 100 50, 100 50 Z"/></svg>`,
    date: "February 7, 2025",
    author: "Golu Tyagi",
    category: "Vyakaran",
  },
  {
    title: "युग्म शब्द: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/yugm-shabd.html",
    paragraph: "युग्म-शब्द वे शब्द होते हैं जो उच्चारण में समान लगते हैं, परन्तु उनके अर्थ भिन्न होते हैं। यहाँ ऐसे शब्दों के उदाहरण दिए गए हैं।",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="ys-title"><title id="ys-title">युग्म शब्द</title><style>.word{font-size:30px;font-family:sans-serif;fill:#4f46e5;}.swap{animation:swap-words 4s ease-in-out infinite;}@keyframes swap-words{0%,40%{transform:translateX(0)}60%,100%{transform:translateX(60px)}}</style><text x="40" y="100" class="word swap">दिन</text><text x="100" y="100" class="word" style="animation:swap-words 4s ease-in-out infinite;animation-direction:reverse;">दीन</text></svg>`,
    date: "February 6, 2025",
    author: "Himanshu Tyagi",
    category: "Vyakaran",
  },
  {
    title: "त्रुटिसम भिन्नार्थक शब्द: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/pairs-of-similar-words.html",
    paragraph: "ये वे शब्द हैं जो सुनने में लगभग समान लगते हैं, पर उनकी वर्तनी और अर्थ में सूक्ष्म अंतर होता है। यह भाषा को समृद्ध बनाता है।",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="tb-title"><title id="tb-title">त्रुटिसम भिन्नार्थक शब्द</title><style>.ear{fill:#a5b4fc;}.sound{stroke:#6366f1;stroke-width:4;fill:none;animation:sound-wave 2s linear infinite;}@keyframes sound-wave{from{r:0;opacity:1;}to{r:30;opacity:0;}}</style><path class="ear" d="M80 60 C 40 60, 40 140, 80 140 S 120 120, 100 100 C 100 100, 120 80, 80 60"/><circle class="sound" cx="110" cy="100" r="0"/></svg>`,
    date: "February 5, 2025",
    author: "Owner",
    category: "Vyakaran",
  },
  {
    title: "एकार्थक प्रतीत होने वाले शब्द: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/words-apparently-similar-in-meanings-in-hindi.html",
    paragraph: "कुछ शब्द देखने में समान अर्थ वाले लगते हैं, लेकिन उनके प्रयोग और अर्थ में सूक्ष्म भिन्नता होती है। यहाँ ऐसे ही शब्दों का संकलन है।",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="eps-title"><title id="eps-title">एकार्थक प्रतीत होने वाले शब्द</title><style>.face{fill:#c7d2fe;stroke:#4f46e5;stroke-width:4;}.eye{fill:#4f46e5;}.twin{animation:morph 4s ease-in-out infinite alternate;}@keyframes morph{to{transform:translateX(60px) scaleX(-1);}}</style><g class="twin"><circle cx="70" cy="100" r="30" class="face"/><circle cx="65" cy="95" r="3" class="eye"/><circle cx="75" cy="95" r="3" class="eye"/></g><g class="twin" style="transform:translateX(60px) scaleX(-1);"><circle cx="70" cy="100" r="30" class="face"/><circle cx="65" cy="95" r="3" class="eye"/><circle cx="75" cy="95" r="3" class="eye"/></g></svg>`,
    date: "February 4, 2025",
    author: "Golu Tyagi",
    category: "Vyakaran",
  },
  {
    title: "अनेकार्थी-शब्द: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/words-of-many-meanings-in-hindi.html",
    paragraph: "अनेकार्थी शब्द वे होते हैं जिनके एक से अधिक अर्थ निकलते हैं। प्रसंग के अनुसार उनका सही अर्थ समझा जाता है।",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="as-title"><title id="as-title">अनेकार्थी-शब्द</title><style>.center{fill:#4f46e5;}.branch{fill:#a5b4fc;transform-origin:100px 100px;transition:0.5s;}.container:hover .branch{transform:scale(1.1);}</style><g class="container"><circle cx="100" cy="100" r="20" class="center"/><path class="branch" d="M100 100 l -50 -50 l 10 0 l 40 40 z"/><path class="branch" d="M100 100 l 50 -50 l -10 0 l -40 40 z"/><path class="branch" d="M100 100 l -50 50 l 10 0 l 40 -40 z"/><path class="branch" d="M100 100 l 50 50 l -10 0 l -40 -40 z"/></g></svg>`,
    date: "February 3, 2025",
    author: "Himanshu Tyagi",
    category: "Vyakaran",
  },
  {
    title: "अनेक शब्दों के लिए एक शब्द: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/one-word-substitution-in-hindi.html",
    paragraph: "भाषा को संक्षिप्त और प्रभावशाली बनाने के लिए वाक्यांश या अनेक शब्दों के स्थान पर एक शब्द का प्रयोग किया जाता है।",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="ow-title"><title id="ow-title">अनेक शब्दों के लिए एक शब्द</title><style>.in{fill:#a5b4fc;}.out{fill:#4f46e5;}.funnel{fill:none;stroke:#6366f1;stroke-width:4;}.in,.out{animation:substitute 4s ease-in-out infinite;}@keyframes substitute{0%,100%{opacity:1;}20%{opacity:0;}80%{opacity:0;}}</style><path class="funnel" d="M60 60 L 90 120 L 110 120 L 140 60 Z"/><rect x="50" y="40" width="100" height="20" rx="5" class="in"/><rect x="85" y="140" width="30" height="20" rx="5" class="out" style="animation-delay:-3s;"/></svg>`,
    date: "February 2, 2025",
    author: "Owner",
    category: "Vyakaran",
  },
  {
    title: "लोकोक्तियाँ: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/proverbs-in-hindi.html",
    paragraph: "लोकोक्तियाँ या कहावतें ऐसे वाक्यांश हैं जो अपने अनुभव और परंपरा के आधार पर बने हैं और किसी सत्य को प्रकट करते हैं।",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="l-title"><title id="l-title">लोकोक्तियाँ</title><style>.bubble{fill:#c7d2fe;stroke:#a5b4fc;stroke-width:2;animation:float 5s ease-in-out infinite;}@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}</style><path d="M50 140 Q 50 80, 100 80 T 150 140 H 50 Z" class="bubble"/><path d="M60 150 C 50 160, 70 165, 70 155" fill="#c7d2fe"/></svg>`,
    date: "February 1, 2025",
    author: "Golu Tyagi",
    category: "Vyakaran",
  },
  {
    title: "मुहावरे: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/idioms-in-hindi.html",
    paragraph: "मुहावरे ऐसे वाक्यांश होते हैं जो अपने सामान्य अर्थ को छोड़कर किसी विशेष अर्थ को व्यक्त करते हैं, जिससे भाषा रोचक बनती है।",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="m-title"><title id="m-title">मुहावरे</title><style>.lightbulb{fill:#fefce8;}.filament{fill:none;stroke:#facc15;stroke-width:4;}.glow{fill:#fef08a;opacity:0;animation:light-up 2s linear infinite;}@keyframes light-up{0%,100%{opacity:0}50%{opacity:0.7}}</style><circle cx="100" cy="100" r="30" class="glow"/><path class="lightbulb" d="M100 50 C 125 50, 140 75, 140 100 A 40 40 0 0 1 60 100 C 60 75, 75 50, 100 50"/><rect x="80" y="130" width="40" height="20" rx="5" fill="#e0e7ff"/><path class="filament" d="M90 100 C 90 115, 110 115, 110 100"/></svg>`,
    date: "January 31, 2025",
    author: "Himanshu Tyagi",
    category: "Vyakaran",
  },
  {
    title: "पर्यायवाची-शब्द: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/synonyms-in-hindi.html",
    paragraph: "पर्यायवाची शब्द (समानार्थक शब्द) उन शब्दों को कहते हैं जिनके अर्थ समान होते हैं। यह शब्द-भंडार को समृद्ध करते हैं।",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="ps-title"><title id="ps-title">पर्यायवाची-शब्द</title><style>.box{stroke:#6366f1;stroke-width:4;fill:#e0e7ff;}.arr{fill:#4f46e5;animation:cycle 3s linear infinite;}@keyframes cycle{from{transform:translateX(-40px)}to{transform:translateX(40px)}}</style><rect x="40" y="80" width="120" height="40" rx="5" class="box"/><path class="arr" d="M80 100 l 10 -10 v 5 h 20 v-5 l 10 10 l -10 10 v -5 h -20 v 5 z"/></svg>`,
    date: "January 30, 2025",
    author: "Owner",
    category: "Vyakaran",
  },
  {
    title: "विलोम-शब्द: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/antonyms-in-hindi.html",
    paragraph: "विलोम शब्द (विपरीतार्थक शब्द) वे शब्द होते हैं जो किसी दूसरे शब्द का उल्टा अर्थ बताते हैं। यह भाषा में संतुलन लाते हैं।",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="vs-title"><title id="vs-title">विलोम-शब्द</title><style>.sun,.moon{transition:0.5s;}.container:hover .sun{transform:translateY(-20px);}.container:hover .moon{transform:translateY(20px);}</style><g class="container"><path class="sun" fill="#facc15" d="M100 70 a 20 20 0 1 0 0.1 0z"/><path class="moon" fill="#a5b4fc" d="M100 130 a 20 20 0 1 0 0.1 0z"/></g></svg>`,
    date: "January 29, 2025",
    author: "Golu Tyagi",
    category: "Vyakaran",
  },
  {
    title: "देशज-विदेशज: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/deshaj-videshaj-in-hindi.html",
    paragraph: "देशज शब्द स्थानीय बोलियों से आते हैं, जबकि विदेशज शब्द अन्य भाषाओं से लिए गए हैं। यह हिंदी भाषा की विविधता को दर्शाता है।",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="dv-title"><title id="dv-title">देशज-विदेशज</title><style>.globe{fill:#a5b4fc;stroke:#4f46e5;stroke-width:4;}.plane{fill:#4f46e5;animation:fly 4s linear infinite;}@keyframes fly{from{transform:translateX(-40px) translateY(10px)}to{transform:translateX(40px) translateY(-10px)}}</style><circle cx="100" cy="100" r="50" class="globe"/><path class="plane" d="M100 100 l 20 -10 l -5 10 l 5 10 z"/></svg>`,
    date: "January 28, 2025",
    author: "Himanshu Tyagi",
    category: "Vyakaran",
  },
  {
    title: "तत्सम-तद्भव: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/tatsam-tadbhav-in-hindi.html",
    paragraph: "तत्सम शब्द संस्कृत से ज्यों के त्यों लिए गए हैं, जबकि तद्भव शब्द संस्कृत से परिवर्तित होकर बने हैं।",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="tt-title"><title id="tt-title">तत्सम-तद्भव</title><style>.arrow{fill:#4f46e5;animation:flow 3s ease-in-out infinite;}@keyframes flow{0%,100%{transform:scaleX(1)}50%{transform:scaleX(1.2)}}</style><text x="40" y="105" style="font-size:24px;fill:#6366f1">संस्कृत</text><path class="arrow" d="M110 100 l 20 0 l 0 -10 l 15 15 l -15 15 l 0 -10 l -20 0 z"/><text x="150" y="105" style="font-size:24px;fill:#6366f1">हिंदी</text></svg>`,
    date: "January 27, 2025",
    author: "Owner",
    category: "Vyakaran",
  },
  {
    title: "समास: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/compound-in-hindi.html",
    paragraph: "समास दो या दो से अधिक शब्दों को मिलाकर एक नया और संक्षिप्त शब्द बनाने की प्रक्रिया है। इसके प्रमुख भेदों का वर्णन यहाँ है।",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="s-title"><title id="s-title">समास</title><style>.box{fill:#c7d2fe;stroke:#6366f1;stroke-width:2;}.plus{fill:#4f46e5;}.combo{animation:combine 3s ease-in-out infinite;}@keyframes combine{0%,100%{transform:translateX(0)}50%{transform:translateX(-30px)}}</style><rect x="50" y="90" width="40" height="20" rx="3" class="box combo"/><rect x="110" y="90" width="40" height="20" rx="3" class="box combo" style="animation-delay:-1.5s;animation-direction:reverse;"/><rect x="95" y="95" width="10" height="10" class="plus"/></svg>`,
    date: "January 26, 2025",
    author: "Golu Tyagi",
    category: "Vyakaran",
  },
  {
    title: "संधि: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/joining.html",
    paragraph: "संधि का अर्थ है 'मेल'। दो निकटवर्ती वर्णों के मेल से जो विकार (परिवर्तन) होता है, उसे संधि कहते हैं।",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="j-title"><title id="j-title">संधि</title><style>.p1,.p2{fill:#a5b4fc;animation:join 3s ease-in-out infinite alternate;}@keyframes join{to{transform:translateX(20px)}}.p2{animation-direction:alternate-reverse;}</style><path class="p1" d="M60 80 h 40 v 40 h -40 l 10 -20 z"/><path class="p2" d="M140 80 h -40 v 40 h 40 l -10 -20 z"/></svg>`,
    date: "January 25, 2025",
    author: "Himanshu Tyagi",
    category: "Vyakaran",
  },
  {
    title: "प्रत्यय: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/suffix-in-hindi.html",
    paragraph: "प्रत्यय वे शब्दांश हैं जो किसी शब्द के अंत में जुड़कर उसके अर्थ में विशेषता या परिवर्तन लाते हैं।",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="suf-title"><title id="suf-title">प्रत्यय</title><style>.word{fill:#a5b4fc;}.suffix{fill:#4f46e5;animation:attach 3s ease-in-out infinite;}@keyframes attach{0%{transform:translateX(30px);opacity:0;}100%{transform:translateX(0);opacity:1;}}</style><rect x="60" y="90" width="60" height="20" rx="5" class="word"/><rect x="120" y="90" width="20" height="20" rx="5" class="suffix"/></svg>`,
    date: "January 24, 2025",
    author: "Owner",
    category: "Vyakaran",
  },
  {
    title: "उपसर्ग: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/prefix-in-hindi.html",
    paragraph: "उपसर्ग वे शब्दांश हैं जो किसी शब्द के आरंभ में जुड़कर उसके अर्थ को बदल देते हैं या नया अर्थ देते हैं।",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="pre-title"><title id="pre-title">उपसर्ग</title><style>.word{fill:#a5b4fc;}.prefix{fill:#4f46e5;animation:attach-pre 3s ease-in-out infinite;}@keyframes attach-pre{0%{transform:translateX(-30px);opacity:0;}100%{transform:translateX(0);opacity:1;}}</style><rect x="80" y="90" width="60" height="20" rx="5" class="word"/><rect x="60" y="90" width="20" height="20" rx="5" class="prefix"/></svg>`,
    date: "January 23, 2025",
    author: "Golu Tyagi",
    category: "Vyakaran",
  },
  {
    title: "विराम-चिन्ह: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/punctuation-in-hindi.html",
    paragraph: "विराम-चिन्हों का प्रयोग भाषा में स्पष्टता और भावों की सही अभिव्यक्ति के लिए किया जाता है। यहाँ सभी चिन्हों का वर्णन है।",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="punc-title"><title id="punc-title">विराम-चिन्ह</title><style>.mark{font-size:60px;fill:#4f46e5;animation:blink-mark 2s linear infinite;}@keyframes blink-mark{0%,40%{opacity:1;}50%,90%{opacity:0;}100%{opacity:1;}}</style><text x="60" y="120" class="mark">?</text><text x="110" y="120" class="mark" style="animation-delay:-1s;">!</text></svg>`,
    date: "January 22, 2025",
    author: "Himanshu Tyagi",
    category: "Vyakaran",
  },
  {
    title: "पुरुष: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/person-in-hindi.html",
    paragraph: "व्याकरण में पुरुष से तात्पर्य वक्ता, श्रोता और अन्य व्यक्ति से है। इसके तीन भेद हैं - उत्तम, मध्यम और अन्य पुरुष।",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="prsn-title"><title id="prsn-title">पुरुष</title><style>.p{fill:#a5b4fc;stroke:#4f46e5;stroke-width:3;}.p1{animation:highlight 3s linear infinite;}@keyframes highlight{0%,100%{fill:#a5b4fc}33%{fill:#818cf8}66%{fill:#a5b4fc}}</style><circle cx="60" cy="100" r="20" class="p p1"/><circle cx="100" cy="100" r="20" class="p p1" style="animation-delay:-1s;"/><circle cx="140" cy="100" r="20" class="p p1" style="animation-delay:-2s;"/></svg>`,
    date: "January 21, 2025",
    author: "Owner",
    category: "Vyakaran",
  },
  {
    title: "वाच्य: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/voice-in-hindi.html",
    paragraph: "वाच्य क्रिया का वह रूप है जिससे यह पता चलता है कि वाक्य में कर्ता, कर्म या भाव में से किसकी प्रधानता है।",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="voice-title"><title id="voice-title">वाच्य</title><style>.speaker{fill:#6366f1;}.wave{stroke:#a5b4fc;stroke-width:4;fill:none;animation:speak 2s linear infinite;}@keyframes speak{from{d:path('M100 100 c 10 0, 20 -20, 30 0');opacity:0;}to{d:path('M100 100 c 20 0, 40 -40, 60 0');opacity:1;}}</style><circle cx="80" cy="100" r="20" class="speaker"/><path class="wave"/></svg>`,
    date: "January 20, 2025",
    author: "Golu Tyagi",
    category: "Vyakaran",
  },
  {
    title: "निपात: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/particle-in-hindi.html",
    paragraph: "निपात वे अव्यय शब्द हैं जो किसी शब्द या पद के बाद लगकर उसके अर्थ में विशेष प्रकार का बल या भाव उत्पन्न करते हैं।",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="part-title"><title id="part-title">निपात</title><style>.txt{font-size:24px;fill:#6366f1;}.emphasis{fill:none;stroke:#4f46e5;stroke-width:3;animation:underline 2s ease-in-out infinite;}@keyframes underline{0%,100%{stroke-dashoffset:100;}50%{stroke-dashoffset:0;}}</style><text x="70" y="100" class="txt">ही</text><path class="emphasis" d="M70 110 h 20" stroke-dasharray="100"/></svg>`,
    date: "January 19, 2025",
    author: "Himanshu Tyagi",
    category: "Vyakaran",
  },
  {
    title: "अव्यय: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/indeclinable-words-in-hindi.html",
    paragraph: "अव्यय या अविकारी शब्द वे होते हैं जिनमें लिंग, वचन, पुरुष, कारक आदि के कारण कोई विकार या परिवर्तन नहीं होता।",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="ind-title"><title id="ind-title">अव्यय</title><style>.rock{fill:#a5b4fc;stroke:#6366f1;stroke-width:4;animation:shake 5s linear infinite;}@keyframes shake{0%,100%{transform:translateX(0)}10%,30%,50%,70%,90%{transform:translateX(-2px)}20%,40%,60%,80%{transform:translateX(2px)}}</style><path class="rock" d="M60 140 C 40 140, 40 100, 80 100 S 120 100, 160 100 S 180 140, 140 140 Z"/></svg>`,
    date: "January 18, 2025",
    author: "Owner",
    category: "Vyakaran",
  },
  {
    title: "काल: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/tense-in-hindi.html",
    paragraph: "काल क्रिया के उस रूप को कहते हैं जिससे उसके करने या होने के समय का बोध होता है। इसके तीन मुख्य भेद हैं - भूत, वर्तमान, भविष्य।",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="tense-title"><title id="tense-title">काल</title><style>.sand{fill:#fde68a;animation:flow-sand 4s linear infinite;}.glass{fill:none;stroke:#a5b4fc;stroke-width:4;}</style><path class="glass" d="M70 70 h60 v10 l-20 20 20 20 v10 h-60 v-10 l20-20 -20-20z"/><path class="sand" d="M72 72 h56 v25 l-28 20 l-28-20z"/></svg>`,
    date: "January 17, 2025",
    author: "Golu Tyagi",
    category: "Vyakaran",
  },
  {
    title: "क्रिया: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/verb-in-hindi.html",
    paragraph: "जिस शब्द से किसी कार्य के करने या होने का बोध हो, उसे क्रिया कहते हैं। यह सकर्मक और अकर्मक दो प्रकार की होती है।",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="verb-title"><title id="verb-title">क्रिया</title><style>.stickman{stroke:#4f46e5;stroke-width:8;fill:none;stroke-linecap:round;}.run{animation:run-anim 1s linear infinite;}@keyframes run-anim{0%{transform:translateX(-20px) rotate(15deg)}25%{transform:rotate(0deg)}50%{transform:translateX(20px) rotate(-15deg)}75%{transform:rotate(0deg)}100%{transform:translateX(-20px) rotate(15deg)}}</style><g class="run"><circle cx="100" cy="70" r="15"/><path d="M100 85 v 30 l -20 30 m 20 -30 l 20 30"/></g></svg>`,
    date: "January 16, 2025",
    author: "Himanshu Tyagi",
    category: "Vyakaran",
  },
  {
    title: "विशेषण: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/adjective-in-hindi.html",
    paragraph: "जो शब्द संज्ञा या सर्वनाम की विशेषता बताते हैं, उन्हें विशेषण कहते हैं। यह गुण, संख्या, परिमाण आदि से संबंधित हो सकते हैं।",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="adj-title"><title id="adj-title">विशेषण</title><style>.obj{fill:#c7d2fe;}.highlight{fill:none;stroke:#facc15;stroke-width:5;animation:glow-hl 2s ease-in-out infinite;}@keyframes glow-hl{0%,100%{opacity:1;stroke-width:5}50%{opacity:0.5;stroke-width:10}}</style><circle cx="100" cy="100" r="40" class="obj"/><circle cx="100" cy="100" r="45" class="highlight"/></svg>`,
    date: "January 15, 2025",
    author: "Owner",
    category: "Vyakaran",
  },
  {
    title: "सर्वनाम: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/pronoun-in-hindi.html",
    paragraph: "संज्ञा के स्थान पर प्रयोग होने वाले शब्दों को सर्वनाम कहते हैं। जैसे - मैं, तुम, वह, यह आदि।",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="pro-title"><title id="pro-title">सर्वनाम</title><style>.mask{fill:#a5b4fc;}.arrow-swap{fill:#4f46e5;animation:swap-arrow 3s ease-in-out infinite;}@keyframes swap-arrow{0%,100%{transform:translateX(0)}50%{transform:translateX(10px)}}</style><text x="40" y="105" style="font-size:24px;fill:#6366f1">संज्ञा</text><path class="arrow-swap" d="M95 90 h 10 v -10 l 15 15 l-15 15 v-10 h-10z"/><circle cx="150" cy="100" r="20" class="mask"/></svg>`,
    date: "January 14, 2025",
    author: "Golu Tyagi",
    category: "Vyakaran",
  },
  {
    title: "कारक: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/case-in-hindi.html",
    paragraph: "कारक संज्ञा या सर्वनाम का क्रिया के साथ संबंध बताते हैं। हिंदी में आठ कारक होते हैं, जिनके अपने विभक्ति चिन्ह होते हैं।",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="case-title"><title id="case-title">कारक</title><style>.link{stroke:#4f46e5;stroke-width:4;animation:connect 3s ease-in-out infinite alternate;}@keyframes connect{to{stroke-dashoffset:0;}}</style><circle cx="60" cy="100" r="20" fill="#a5b4fc"/><circle cx="140" cy="100" r="20" fill="#c7d2fe"/><path class="link" d="M80 100 h 40" stroke-dasharray="40"/></svg>`,
    date: "January 13, 2025",
    author: "Himanshu Tyagi",
    category: "Vyakaran",
  },
  {
    title: "लिंग: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/gender-in-hindi.html",
    paragraph: "जिस चिह्न से यह पता चले कि कोई संज्ञा पुरुष जाति की है या स्त्री जाति की, उसे लिंग कहते हैं। इसके दो भेद हैं - पुल्लिंग और स्त्रीलिंग।",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="gen-title"><title id="gen-title">लिंग</title><style>.male{fill:#a5b4fc;}.female{fill:#f9a8d4;}.symbol{transition:0.5s ease-in-out;}.container:hover .male{transform:translateX(-10px);}.container:hover .female{transform:translateX(10px);}</style><g class="container"><g class="male symbol"><circle cx="80" cy="100" r="20"/><path d="M80 80 v-20 h20 m-10 0 v10"/></g><g class="female symbol"><circle cx="120" cy="100" r="20"/><path d="M120 120 v 20 m-10 0 h20"/></g></g></svg>`,
    date: "January 12, 2025",
    author: "Owner",
    category: "Vyakaran",
  },
  {
    title: "वचन: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/number-in-hindi.html",
    paragraph: "शब्द के जिस रूप से उसके एक या अनेक होने का बोध हो, उसे वचन कहते हैं। हिंदी में दो वचन हैं - एकवचन और बहुवचन।",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="num-title"><title id="num-title">वचन</title><style>.one{fill:#a5b4fc;}.many{animation:multiply 3s ease-in-out infinite;}@keyframes multiply{0%{opacity:0;transform:translate(10px,10px)}100%{opacity:1;transform:translate(0,0)}}</style><circle cx="80" cy="100" r="15" class="one"/><g class="many"><circle cx="120" cy="90" r="10" fill="#c7d2fe"/><circle cx="140" cy="110" r="10" fill="#c7d2fe" style="animation-delay:0.2s;"/></g></svg>`,
    date: "January 11, 2025",
    author: "Golu Tyagi",
    category: "Vyakaran",
  },
  {
    title: "संज्ञा: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/noun-in-hindi.html",
    paragraph: "किसी व्यक्ति, वस्तु, स्थान, या भाव के नाम को संज्ञा कहते हैं। इसके मुख्य भेद व्यक्तिवाचक, जातिवाचक, और भाववाचक हैं।",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="noun-title"><title id="noun-title">संज्ञा</title><style>.tag{fill:#a5b4fc;stroke:#4f46e5;stroke-width:3;animation:swing-tag 2s ease-in-out infinite alternate;transform-origin:100px 70px;}@keyframes swing-tag{to{transform:rotate(10deg)}}</style><path class="tag" d="M70 70 h60 l20 30 l-20 30 h-60 z"/></svg>`,
    date: "January 10, 2025",
    author: "Himanshu Tyagi",
    category: "Vyakaran",
  },
  {
    title: "वाक्य-विचार: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/syntax-in-hindi.html",
    paragraph: "शब्दों का व्यवस्थित समूह जिससे कोई अर्थ प्रकट हो, वाक्य कहलाता है। यहाँ रचना और अर्थ के आधार पर वाक्य के भेद बताए गए हैं।",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="syn-title"><title id="syn-title">वाक्य-विचार</title><style>.w{fill:#a5b4fc;animation:arrange 4s ease-in-out infinite;}.w2{animation-delay:-1s;}.w3{animation-delay:-2s;}@keyframes arrange{0%{y:80}25%{y:100}50%{y:100}75%{y:80}100%{y:80}}</style><rect class="w" x="40" y="100" width="30" height="20" rx="4"/><rect class="w w2" x="85" y="100" width="30" height="20" rx="4"/><rect class="w w3" x="130" y="100" width="30" height="20" rx="4"/></svg>`,
    date: "January 9, 2025",
    author: "Owner",
    category: "Vyakaran",
  },
  {
    title: "शब्द-विचार: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/morphology-in-hindi.html",
    paragraph: "वर्णों के सार्थक समूह को शब्द कहते हैं। यहाँ उत्पत्ति, रचना, प्रयोग और अर्थ के आधार पर शब्दों के वर्गीकरण का वर्णन है।",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="morph-title"><title id="morph-title">शब्द-विचार</title><style>.letter{font-size:30px;font-family:sans-serif;fill:#4f46e5;animation:form-word 3s ease-in-out infinite;}@keyframes form-word{0%{x:40}50%{x:60}100%{x:40}}</style><text class="letter" y="100">क</text><text class="letter" y="100" style="animation-delay:-0.5s;">म</text><text class="letter" y="100" style="animation-delay:-1s;">ल</text></svg>`,
    date: "January 8, 2025",
    author: "Golu Tyagi",
    category: "Vyakaran",
  },
  {
    title: "वर्ण-विचार: परिभाषा, भेद, उदाहरण",
    url: "vyakaran/phonology-in-hindi.html",
    paragraph: "भाषा की सबसे छोटी इकाई वर्ण कहलाती है। इस खंड में स्वर और व्यंजन वर्णों के भेद, उच्चारण स्थान और वर्गीकरण की जानकारी है।",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="phono-title"><title id="phono-title">वर्ण-विचार</title><style>.char{font-family:sans-serif;font-size:60px;fill:#4f46e5;animation:change-char 4s linear infinite;}@keyframes change-char{0%,20%{content:'अ'}25%,45%{content:'आ'}50%,70%{content:'इ'}75%,100%{content:'ई'}}</style><text x="80" y="120" class="char">अ</text></svg>`,
    date: "January 7, 2025",
    author: "Himanshu Tyagi",
    category: "Vyakaran",
  },
  {
    title: "भाषा और व्याकरण: परिभाषा, भेद, उदाहरण",
    url: "vyakaran-language.html",
    paragraph: "भाषा विचारों के आदान-प्रदान का माध्यम है, और व्याकरण भाषा को शुद्ध रूप से लिखने और बोलने के नियम सिखाता है।",
    svg: `<svg viewBox="0 0 200 200" role="img" aria-labelledby="lang-title"><title id="lang-title">भाषा और व्याकरण</title><style>.book{fill:#a5b4fc;stroke:#4f46e5;stroke-width:4;}.page{fill:#e0e7ff;transform-origin:left;animation:turn-page 3s ease-in-out infinite;}@keyframes turn-page{0%{transform:perspective(300px) rotateY(0deg)}100%{transform:perspective(300px) rotateY(-180deg)}}</style><rect x="50" y="50" width="100" height="100" rx="5" class="book"/><rect x="52" y="52" width="48" height="96" class="page"/></svg>`,
    date: "January 6, 2025",
    author: "Owner",
    category: "Vyakaran",
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
