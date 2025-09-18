


   
    document.addEventListener('DOMContentLoaded', () => {

    const allFormulasChapters = [
        {
            title: 'Mathematics Formulas',
            url: 'mathematics-all-formulas.html',
            description: 'Key formulas for algebra, geometry, trigonometry, and calculus. Your essential math reference.',
            svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .grid-line { stroke: #dbeafe; stroke-width: 0.5; }
                        .graph-path {
                            stroke: #60a5fa; stroke-width: 2.5; fill: none;
                            stroke-dasharray: 200; stroke-dashoffset: 200;
                            animation: draw-graph 4s ease-in-out infinite;
                        }
                        .axis { stroke: #6b7280; stroke-width: 1; }
                        @keyframes draw-graph {
                            0% { stroke-dashoffset: 200; }
                            50% { stroke-dashoffset: 0; }
                            100% { stroke-dashoffset: -200; }
                        }
                    </style>
                    <path d="M0 90 H100 M10 0 V90" class="axis" />
                    <path d="M10 20 H90 M10 40 H90 M10 60 H90 M30 0 V90 M50 0 V90 M70 0 V90" class="grid-line"/>
                    <path class="graph-path" d="M10,80 C 30,10 60,100 90,20"/>
                </svg>`
        },
        {
            title: 'Physics Formulas',
            url: '/physics-all-formulas.html',
            description: 'Essential equations for mechanics, electromagnetism, and thermodynamics. Unlock the laws of the universe.',
            svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .orbit { stroke: #a5b4fc; stroke-width: 1; fill: none; }
                        .nucleus { fill: #6366f1; animation: nucleus-pulse 2s ease-in-out infinite; }
                        .electron { fill: #4f46e5; filter: url(#glow); }
                        @keyframes nucleus-pulse { 0%, 100% { r: 8; } 50% { r: 7; } }
                        @keyframes orbit1 { from { motion-offset: 0%; } to { motion-offset: 100%; } }
                    </style>
                    <defs>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>
                    <ellipse id="p1" class="orbit" cx="50" cy="50" rx="40" ry="15" transform="rotate(20 50 50)"/>
                    <ellipse id="p2" class="orbit" cx="50" cy="50" rx="20" ry="45" transform="rotate(-30 50 50)"/>
                    <circle class="nucleus" cx="50" cy="50" r="8"/>
                    <circle class="electron" r="5">
                        <animateMotion dur="4s" repeatCount="indefinite"><mpath href="#p1"/></animateMotion>
                    </circle>
                    <circle class="electron" r="5">
                         <animateMotion dur="6s" repeatCount="indefinite" direction="reverse"><mpath href="#p2"/></animateMotion>
                    </circle>
                </svg>`
        },
        {
            title: 'Chemistry Formulas',
            url: '/all-formulas/all-chemical-formulas.html',
            description: 'From molecular structures to reaction equations, find the formulas that explain the world of chemistry.',
            svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .flask-outline { stroke: #38bdf8; stroke-width: 2.5; fill: rgba(14, 165, 233, 0.1); }
                        .liquid { fill: #0ea5e9; animation: liquid-level 4s ease-in-out infinite alternate; }
                        .bubble { fill: #e0f2fe; animation: rise 3s linear infinite; opacity: 0; }
                        .glint { fill: white; opacity: 0.6; animation: glint-anim 4s ease-in-out infinite; }
                        @keyframes liquid-level { to { transform: translateY(-25px) scaleY(1.1); } }
                        @keyframes rise {
                           0% { opacity: 1; transform: translateY(0); }
                           100% { opacity: 0; transform: translateY(-45px); }
                        }
                        @keyframes glint-anim { 50% { transform: translate(5px, -5px); } }
                    </style>
                    <path class="flask-outline" d="M30 90 H70 L 60 40 H 40 Z M45 40 V 20 H 55 V 40"/>
                    <rect class="liquid" x="32" y="70" width="36" height="25" />
                    <circle class="bubble" cx="45" cy="80" r="2" style="animation-delay: 0s;"/>
                    <circle class="bubble" cx="55" cy="85" r="3" style="animation-delay: 0.8s;"/>
                    <circle class="bubble" cx="50" cy="75" r="2.5" style="animation-delay: 1.5s;"/>
                    <path class="glint" d="M45 30 Q 50 35, 48 40 L 45 30"/>
                </svg>`
        }
    ];

    const conversionChapters = [
        {
                title: "Unit Conversion",
                url: "/conversion",
                description: "A comprehensive tool for converting various types of measurement units, including length, mass, volume, and more.",
                svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <style>
                            .arrow { fill: #4f46e5; }
                            .text-node { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600; fill: #1f2937; text-anchor: middle; }
                            .left-group, .right-group { animation: slide 3s ease-in-out infinite alternate; }
                            .right-group { animation-direction: alternate-reverse; }
                            @keyframes slide { from { transform: translateX(-5px); } to { transform: translateX(5px); } }
                        </style>
                        <g class="left-group">
                            <text x="25" y="40" class="text-node">kg</text>
                            <text x="25" y="70" class="text-node">cm</text>
                        </g>
                        <g>
                            <path class="arrow" d="M 40 45 L 60 45 L 60 40 L 68 47.5 L 60 55 L 60 50 L 40 50 Z" />
                            <path class="arrow" d="M 60 65 L 40 65 L 40 70 L 32 62.5 L 40 55 L 40 60 L 60 60 Z" />
                        </g>
                        <g class="right-group">
                            <text x="75" y="40" class="text-node">lbs</text>
                            <text x="75" y="70" class="text-node">in</text>
                        </g>
                    </svg>`
            },
            {
                title: "Angle Conversion",
                url: "/conversion/angle-unit-conversion",
                description: "Convert between degrees, radians, and other angular units for mathematics, physics, and engineering.",
                svg: `<svg viewBox="0 0 100 100">
                        <style>
                            .line { stroke: #4f46e5; stroke-width: 4; stroke-linecap: round; }
                            .moving-line { transform-origin: 30px 70px; animation: sweep-angle 3s ease-in-out infinite alternate; }
                            .arc { fill: #c7d2fe; animation: fill-arc 3s ease-in-out infinite alternate; transform-origin: 30px 70px; }
                            @keyframes sweep-angle { from { transform: rotate(0deg); } to { transform: rotate(-75deg); } }
                            @keyframes fill-arc { from { opacity: 0.5; } to { opacity: 1; } }
                        </style>
                        <path class="arc" d="M30,70 L 80,70 A 50 50, 0, 0, 0, 44.3, 22.1 Z" />
                        <line class="line" x1="30" y1="70" x2="80" y2="70" />
                        <line class="line moving-line" x1="30" y1="70" x2="80" y2="70" />
                    </svg>`
            },
            {
                title: "Area Conversion",
                url: "/conversion/area-unit-conversion",
                description: "Convert area units such as square meters, square feet, acres, and hectares. Vital for real estate and construction.",
                svg: `<svg viewBox="0 0 100 100">
                        <style>
                            .grid { stroke: #a5b4fc; stroke-width: 1; }
                            .area-fill { fill: #4f46e5; animation: fill-area 3s ease-in-out infinite alternate; }
                            @keyframes fill-area { 0% { width: 0; height: 0; } 100% { width: 60; height: 60; } }
                        </style>
                        <path class="grid" d="M20 20 H 80 V 80 H 20 Z M 40 20 V 80 M 60 20 V 80 M 20 40 H 80 M 20 60 H 80" />
                        <rect class="area-fill" x="20" y="20" width="60" height="60" />
                    </svg>`
            },
            {
                title: "Length Conversion",
                url: "/conversion/length-unit-conversion",
                description: "Convert between units of length, including meters (m), kilometers (km), miles, and inches.",
                svg: `<svg viewBox="0 0 100 100">
                        <style>
                            .ruler { fill: #eef2ff; stroke: #4f46e5; stroke-width: 1; }
                            .mark { stroke: #312e81; stroke-width: 2; }
                            .measure-line { stroke: #c7d2fe; stroke-width: 4; stroke-dasharray: 80; stroke-dashoffset: 80; animation: draw-measure 3s ease-in-out infinite alternate; }
                            @keyframes draw-measure { to { stroke-dashoffset: 0; } }
                        </style>
                        <rect class="ruler" x="10" y="60" width="80" height="15" rx="2" />
                        <line class="mark" x1="20" y1="60" x2="20" y2="75" /><line class="mark" x1="30" y1="60" x2="30" y2="70" />
                        <line class="mark" x1="40" y1="60" x2="40" y2="75" /><line class="mark" x1="50" y1="60" x2="50" y2="70" />
                        <line class="mark" x1="60" y1="60" x2="60" y2="75" /><line class="mark" x1="70" y1="60" x2="70" y2="70" />
                        <line class="mark" x1="80" y1="60" x2="80" y2="75" />
                        <path class="measure-line" d="M10 45 H 90" />
                    </svg>`
            },
            {
                title: "Power Conversion",
                url: "/conversion/power-unit-conversion",
                description: "Convert units of power like watts (W), horsepower (hp), and kilowatts (kW). Essential for physics and engineering.",
                svg: `<svg viewBox="0 0 100 100">
                        <style>
                            .bolt { fill: #7c3aed; stroke: #4f46e5; stroke-width: 2; animation: bolt-flash 1.5s ease-in-out infinite; transform-origin: center; }
                            @keyframes bolt-flash { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.1) rotate(5deg); opacity: 0.8; } }
                        </style>
                        <path class="bolt" d="M55,15 L40,50 L60,50 L45,85 L70,45 L50,45 Z"/>
                    </svg>`
            },
            {
                title: "Pressure Conversion",
                url: "/conversion/pressure-unit-conversion",
                description: "Convert between pressure units like Pascal (Pa), atmospheres (atm), and pounds per square inch (psi).",
                svg: `<svg viewBox="0 0 100 100">
                        <style>
                            .piston{ fill:#a5b4fc; animation:compress 2s ease-in-out infinite alternate }
                            .arrow{ fill:#4f46e5 }
                            @keyframes compress{ from{y:35;height:20} to{y:20;height:35} }
                        </style>
                        <rect fill="#eef2ff" stroke="#4f46e5" stroke-width="2" x="25" y="20" width="50" height="60" rx="3"></rect>
                        <rect class="piston" x="28" y="35" width="44" height="20" rx="2"></rect>
                        <path class="arrow" d="M 50 65 L 45 75 L 55 75 Z"></path>
                        <path class="arrow" d="M 50 35 L 45 25 L 55 25 Z"></path>
                    </svg>`
            },
            {
                title: "Speed Conversion",
                url: "/conversion/speed-unit-conversion",
                description: "Convert speed units such as meters per second (m/s), kilometers per hour (km/h), and miles per hour (mph).",
                svg: `<svg viewBox="0 0 100 100">
                        <style>
                            .dial { fill: #f9fafb; stroke: #6b7280; stroke-width: 2; }
                            .needle { fill: #4f46e5; transform-origin: 50px 75px; animation: sweep-needle 2.5s ease-in-out infinite alternate; }
                            @keyframes sweep-needle { from { transform: rotate(-120deg); } to { transform: rotate(120deg); } }
                        </style>
                        <circle class="dial" cx="50" cy="55" r="40" />
                        <path class="needle" d="M50 75 L 53 30 Q 50 25 47 30 Z" />
                        <circle fill="#1f2937" cx="50" cy="75" r="5" />
                    </svg>`
            },
            {
                title: "Temperature Conversion",
                url: "/conversion/temperature-unit-conversion",
                description: "Switch between Celsius, Fahrenheit, and Kelvin. Crucial for weather forecasting and scientific experiments.",
                svg: `<svg viewBox="0 0 100 100">
                        <style>
                            .thermo-bg { fill: #eef2ff; }
                            .thermo-stroke { stroke: #4f46e5; stroke-width: 2; }
                            .mercury { fill: #7c3aed; animation: temp-rise 3s ease-in-out infinite alternate; }
                            @keyframes temp-rise { from { y: 75; height: 10; } to { y: 30; height: 55; } }
                        </style>
                        <rect x="45" y="20" width="10" height="65" rx="5" class="thermo-bg" stroke="#a5b4fc" stroke-width="1"/>
                        <rect id="mercury-rect" x="46" y="75" width="8" height="10" rx="4" class="mercury"/>
                        <circle cx="50" cy="85" r="10" class="mercury"/>
                        <circle cx="50" cy="85" r="12" fill="none" class="thermo-stroke"/>
                    </svg>`
            },
            {
                title: "Time Conversion",
                url: "/conversion/time-unit-conversion",
                description: "Convert time between seconds, minutes, hours, and days. A fundamental skill for scheduling and planning.",
                svg: `<svg viewBox="0 0 100 100">
                        <style>
                            .clock-face { fill: #eef2ff; stroke: #4f46e5; stroke-width: 4; }
                            .hand { stroke: #312e81; stroke-width: 3; stroke-linecap: round; transform-origin: 50px 50px; }
                            .hour-hand { animation: tick-tock 12s linear infinite; }
                            .minute-hand { animation: tick-tock 2s linear infinite; }
                            @keyframes tick-tock { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                        </style>
                        <circle class="clock-face" cx="50" cy="50" r="40" />
                        <line class="hand hour-hand" x1="50" y1="50" x2="50" y2="30" />
                        <line class="hand minute-hand" x1="50" y1="50" x2="70" y2="50" />
                        <circle fill="#312e81" cx="50" cy="50" r="3"/>
                    </svg>`
            },
            {
                title: "Volume Conversion",
                url: "/conversion/volume-unit-conversion",
                description: "Easily convert between volume units like liters (L), milliliters (mL), gallons, and cubic meters.",
                svg: `<svg viewBox="0 0 100 100">
                        <style>
                            .beaker { stroke: #4f46e5; stroke-width: 3; fill: #eef2ff; }
                            .liquid { fill: #a5b4fc; animation: fill-beaker 2.5s ease-in-out infinite alternate; }
                            .bubble { fill: #eef2ff; animation: rise-bubble 2s linear infinite; }
                            @keyframes fill-beaker { from { y: 80; height: 0; } to { y: 40; height: 40; } }
                            @keyframes rise-bubble { from { cy: 80; opacity: 1; } to { cy: 35; opacity: 0; } }
                        </style>
                        <path class="beaker" d="M25 20 H 75 V 80 Q 75 90, 65 90 H 35 Q 25 90, 25 80 Z" />
                        <rect class="liquid" x="27" y="80" width="46" height="0" />
                        <circle class="bubble" cx="40" cy="80" r="2" />
                        <circle class="bubble" cx="60" cy="80" r="3" style="animation-delay: 0.5s;" />
                        <circle class="bubble" cx="50" cy="80" r="2.5" style="animation-delay: 1s;" />
                    </svg>`
            },
            {
                title: "Weight & Mass Conversion",
                url: "/conversion/weight-mass-unit-conversion",
                description: "Convert between various units of weight and mass, such as kilograms (kg), grams (g), pounds (lb), and ounces (oz).",
                svg: `<svg viewBox="0 0 100 100">
                        <style>
                            .balance-beam { stroke: #4f46e5; stroke-width:3; }
                            .balance-base { fill: #6b7280; }
                            .pan { fill: #c7d2fe; stroke: #4f46e5; stroke-width:1.5; }
                            .balance-group { animation: balance-swing 3s ease-in-out infinite alternate; transform-origin: 50px 40px; }
                            @keyframes balance-swing { from { transform: rotate(-5deg); } to { transform: rotate(5deg); } }
                        </style>
                        <rect class="balance-base" x="47" y="40" width="6" height="45" />
                        <rect class="balance-base" x="35" y="85" width="30" height="5" rx="2"/>
                        <g class="balance-group">
                            <line class="balance-beam" x1="10" y1="40" x2="90" y2="40" />
                            <line class="balance-beam" x1="20" y1="40" x2="20" y2="50" />
                            <line class="balance-beam" x1="80" y1="40" x2="80" y2="50" />
                            <path class="pan" d="M 5 50 A 15 15 0 0 1 35 50 Z" />
                            <path class="pan" d="M 65 50 A 15 15 0 0 1 95 50 Z" />
                        </g>
                    </svg>`
            }
    ];
    
    const vyakaranChapters = [
        {
            title: "भाषा और व्याकरण: परिभाषा, भेद, उदाहरण",
            url: "vyakaran-language.html",
            description: "भाषा विचारों के आदान-प्रदान का माध्यम है, और व्याकरण भाषा को शुद्ध रूप से लिखने और बोलने के नियम सिखाता है।",
            svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .book { fill: #34495e; }
                        .page { fill: #ecf0f1; transform-origin: 17px 50%; animation: turn-page 3s ease-in-out infinite; }
                        .text-line { fill: #bdc3c7; opacity: 0; animation: write-text 3s ease-in-out infinite; }
                        @keyframes turn-page { 0%, 100% { transform: perspective(300px) rotateY(0deg); } 50% { transform: perspective(300px) rotateY(-160deg); } }
                        @keyframes write-text { 50%, 100% { opacity: 1; } }
                    </style>
                    <rect class="book" x="15" y="30" width="50" height="60" rx="3"/>
                    <rect class="page" x="17" y="32" width="23" height="56"/>
                    <rect class="text-line" x="45" y="40" width="15" height="4" style="animation-delay: -1.4s;"/>
                    <rect class="text-line" x="45" y="50" width="15" height="4" style="animation-delay: -1.3s;"/>
                    <rect class="text-line" x="45" y="60" width="15" height="4" style="animation-delay: -1.2s;"/>
                </svg>`
        },
        {
            title: "वर्ण-विचार: परिभाषा, भेद, उदाहरण",
            url: "vyakaran/phonology-in-hindi.html",
            description: "भाषा की सबसे छोटी इकाई वर्ण कहलाती है। इस खंड में स्वर और व्यंजन वर्णों के भेद, उच्चारण स्थान और वर्गीकरण की जानकारी है।",
            svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .char { font-family: 'Hind', sans-serif; font-size: 60px; fill: #e74c3c; animation: change-char 4s steps(1, end) infinite; text-anchor: middle;}
                        .c1 { animation-delay: 0s; }
                        .c2 { animation-delay: -2s; }
                        @keyframes change-char { 0% { opacity: 0; transform: translateY(-10px); } 50% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; } }
                    </style>
                    <text x="50" y="75" class="char c1">अ</text>
                    <text x="50" y="75" class="char c2">क</text>
                </svg>`
        },
        {
            title: "शब्द-विचार: परिभाषा, भेद, उदाहरण",
            url: "vyakaran/morphology-in-hindi.html",
            description: "वर्णों के सार्थक समूह को शब्द कहते हैं। यहाँ उत्पत्ति, रचना, प्रयोग और अर्थ के आधार पर शब्दों के वर्गीकरण का वर्णन है।",
            svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .letter { font: bold 28px 'Hind', sans-serif; fill: #e67e22; }
                        .l1 { animation: assemble 2s ease-in-out infinite alternate; }
                        .l2 { animation: assemble 2s ease-in-out infinite alternate-reverse; }
                        .plus { animation: fade-out 2s ease-in-out infinite alternate; }
                        @keyframes assemble { to { transform: translateX(15px); } }
                        @keyframes fade-out { to { opacity: 0; transform: scale(0); } }
                    </style>
                    <text class="letter l1" x="20" y="60">श</text>
                    <text class="letter plus" x="45" y="60">+</text>
                    <text class="letter l2" x="65" y="60">ब्द</text>
                </svg>`
        },
        {
            title: "वाक्य-विचार: परिभाषा, भेद, उदाहरण",
            url: "vyakaran/syntax-in-hindi.html",
            description: "शब्दों का व्यवस्थित समूह जिससे कोई अर्थ प्रकट हो, वाक्य कहलाता है। यहाँ रचना और अर्थ के आधार पर वाक्य के भेद बताए गए हैं।",
            svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .word-box { fill: #d6dbdf; stroke: #bdc3c7; stroke-width: 1.5; }
                        .w1 { animation: arrange-words 3s ease-in-out infinite; }
                        .w2 { animation: arrange-words 3s ease-in-out infinite 0.2s; }
                        .w3 { animation: arrange-words 3s ease-in-out infinite 0.4s; }
                        @keyframes arrange-words { 0% { y:20; } 50% { y: 60; } 100% { y:20; }}
                    </style>
                    <rect class="word-box w1" x="15" y="60" width="20" height="20" rx="3" />
                    <rect class="word-box w2" x="40" y="60" width="20" height="20" rx="3" />
                    <rect class="word-box w3" x="65" y="60" width="20" height="20" rx="3" />
                </svg>`
        },
        {
            title: "संज्ञा: परिभाषा, भेद, उदाहरण",
            url: "vyakaran/noun-in-hindi.html",
            description: "किसी व्यक्ति, वस्तु, स्थान, या भाव के नाम को संज्ञा कहते हैं। इसके मुख्य भेद व्यक्तिवाचक, जातिवाचक, और भाववाचक हैं।",
            svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .icon { opacity: 0; animation: fadeInScale 1s ease-out forwards; }
                        .icon-person { animation-delay: 0.2s; fill: #3498db; }
                        .icon-place { animation-delay: 0.6s; fill: #2ecc71; }
                        .icon-thing { animation-delay: 1.0s; fill: #9b59b6; }
                        @keyframes fadeInScale { from { opacity: 0; transform: scale(0.5); } to { opacity: 1; transform: scale(1); } }
                    </style>
                    <g transform="translate(0 10)">
                        <circle class="icon icon-person" cx="25" cy="55" r="12"/>
                        <rect class="icon icon-person" x="15" y="67" width="20" height="20" rx="5"/>
                        <polygon class="icon icon-place" points="50,35 40,45 60,45" />
                        <rect class="icon icon-place" x="42" y="45" width="16" height="25"/>
                        <path class="icon icon-thing" d="M80,45 C70,45 70,55 75,60 S85,65 85,55 C90,45 85,45 80,45 Z" />
                        <path class="icon icon-thing" d="M80,45 Q 85 40, 83 35" stroke="#16a085" stroke-width="2" fill="none"/>
                    </g>
                </svg>`
        },
        {
            title: "वचन: परिभाषा, भेद, उदाहरण",
            url: "vyakaran/number-in-hindi.html",
            description: "शब्द के जिस रूप से उसके एक या अनेक होने का बोध हो, उसे वचन कहते हैं। हिंदी में दो वचन हैं - एकवचन और बहुवचन।",
            svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .star { fill: #a569bd; transform-origin: center; }
                        .s1 { animation: move-star 4s ease-in-out infinite; }
                        .s2, .s3 { opacity: 0; animation: appear 4s ease-in-out infinite; transform-origin: center;}
                        .s2 { animation-delay: 0.2s; } .s3 { animation-delay: 0.4s; }
                        @keyframes move-star {
                            0%, 30% { transform: translate(0,0) rotate(0deg); }
                            60% { transform: translate(-25px, -15px) rotate(-90deg); }
                            100% { transform: translate(0,0) rotate(0deg); }
                        }
                        @keyframes appear {
                            30%, 50% { opacity: 0; transform: scale(0); }
                            70% { opacity: 1; transform: scale(1.2); }
                            90% { opacity: 1; transform: scale(1); }
                            100% { opacity: 0; transform: scale(0); }
                        }
                    </style>
                    <path class="star s1" d="M50 35 L58 55 L80 55 L62 68 L70 88 L50 75 L30 88 L38 68 L20 55 L42 55 Z" transform="scale(0.5) translate(50 20)"/>
                    <path class="star s2" d="M50 35 L58 55 L80 55 L62 68 L70 88 L50 75 L30 88 L38 68 L20 55 L42 55 Z" transform="scale(0.4) translate(100 80)"/>
                    <path class="star s3" d="M50 35 L58 55 L80 55 L62 68 L70 88 L50 75 L30 88 L38 68 L20 55 L42 55 Z" transform="scale(0.4) translate(15 90)"/>
                </svg>`
        },
        {
            title: "लिंग: परिभाषा, भेद, उदाहरण",
            url: "vyakaran/gender-in-hindi.html",
            description: "जिस चिह्न से यह पता चले कि कोई संज्ञा पुरुष जाति की है या स्त्री जाति की, उसे लिंग कहते हैं। इसके दो भेद हैं - पुल्लिंग और स्त्रीलिंग।",
            svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .male { fill: #5dade2; animation: slide-right 2s ease-in-out infinite alternate; } 
                        .female { fill: #f1948a; animation: slide-left 2s ease-in-out infinite alternate;}
                        @keyframes slide-right { to { transform: translateX(10px); } }
                        @keyframes slide-left { to { transform: translateX(-10px); } }
                    </style>
                    <g class="male">
                        <circle cx="35" cy="50" r="15"/>
                        <path d="M35 35 V 20 M 25 20 H 45" stroke="#5dade2" stroke-width="4" fill="none" stroke-linecap="round"/>
                    </g>
                    <g class="female">
                        <circle cx="65" cy="50" r="15"/>
                        <path d="M65 65 V 80 M 55 80 H 75" stroke="#f1948a" stroke-width="4" fill="none" stroke-linecap="round"/>
                    </g>
                </svg>`
        },
        {
            title: "कारक: परिभाषा, भेद, उदाहरण",
            url: "vyakaran/case-in-hindi.html",
            description: "कारक संज्ञा या सर्वनाम का क्रिया के साथ संबंध बताते हैं। हिंदी में आठ कारक होते हैं, जिनके अपने विभक्ति चिन्ह होते हैं।",
            svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .node { fill: #a2d9ce; stroke: #1abc9c; stroke-width: 2; }
                        .link { stroke: #16a085; stroke-width: 3; stroke-dasharray: 40; stroke-dashoffset: 40; animation: draw-link 2s ease-in-out infinite alternate; }
                        @keyframes draw-link { to { stroke-dashoffset: 0; } }
                    </style>
                    <circle class="node" cx="30" cy="65" r="15"/>
                    <circle class="node" cx="70" cy="35" r="15"/>
                    <line class="link" x1="42" y1="58" x2="58" y2="42" />
                </svg>`
        },
        {
            title: "सर्वनाम: परिभाषा, भेद, उदाहरण",
            url: "vyakaran/pronoun-in-hindi.html",
            description: "संज्ञा के स्थान पर प्रयोग होने वाले शब्दों को सर्वनाम कहते हैं। जैसे - मैं, तुम, वह, यह आदि।",
            svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .person { fill: #d6dbdf; }
                        .pronoun-text { font: bold 20px 'Hind', sans-serif; fill: #c0392b; animation: swap-text 6s linear infinite; opacity: 0; text-anchor: middle;}
                        .p1 { animation-delay: 0s; } .p2 { animation-delay: -2s; } .p3 { animation-delay: -4s; }
                        @keyframes swap-text {
                            0% { opacity: 0; } 30% { opacity: 1; } 
                            70% { opacity: 1; } 100% { opacity: 0; }
                        }
                    </style>
                    <circle class="person" cx="50" cy="50" r="15"/>
                    <rect class="person" x="38" y="65" width="24" height="25" rx="5"/>
                    <text x="50" y="40" class="pronoun-text p1">मैं</text>
                    <text x="50" y="40" class="pronoun-text p2">तुम</text>
                    <text x="50" y="40" class="pronoun-text p3">वह</text>
                </svg>`
        },
        {
            title: "विशेषण: परिभाषा, भेद, उदाहरण",
            url: "vyakaran/adjective-in-hindi.html",
            description: "जो शब्द संज्ञा या सर्वनाम की विशेषता बताते हैं, उन्हें विशेषण कहते हैं। यह गुण, संख्या, परिमाण आदि से संबंधित हो सकते हैं।",
            svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .apple-gray { fill: #bdc3c7; }
                        .apple-color { fill: #e74c3c; clip-path: url(#clip); }
                        .leaf { fill: #2ecc71; }
                        .shine { fill: white; opacity: 0.7; }
                        .wipe { animation: wipe-reveal 3s ease-in-out infinite; }
                        @keyframes wipe-reveal { from { transform: scaleY(0); } to { transform: scaleY(1); } }
                    </style>
                    <defs>
                        <clipPath id="clip">
                            <rect class="wipe" x="25" y="30" width="50" height="55" transform-origin="bottom"/>
                        </clipPath>
                    </defs>
                    <path class="apple-gray" d="M50 85 C 30 85, 25 60, 40 45 S 60 30, 70 45 S 70 85, 50 85 Z"/>
                    <path class="apple-color" d="M50 85 C 30 85, 25 60, 40 45 S 60 30, 70 45 S 70 85, 50 85 Z"/>
                    <path class="leaf" d="M60 40 C 65 30, 75 35, 70 42 Z"/>
                    <path class="shine" d="M60 50 C 65 50, 68 55, 65 60 Q 60 58, 60 50 Z"/>
                </svg>`
        },
        {
            title: "क्रिया: परिभाषा, भेद, उदाहरण",
            url: "vyakaran/verb-in-hindi.html",
            description: "जिस शब्द से किसी कार्य के करने या होने का बोध हो, उसे क्रिया कहते हैं। यह सकर्मक और अकर्मक दो प्रकार की होती है।",
            svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .stick-figure { stroke: #27ae60; stroke-width: 4; fill: none; stroke-linecap: round; }
                        .leg1 { transform-origin: 50px 70px; animation: run-leg1 0.5s infinite alternate; }
                        .leg2 { transform-origin: 50px 70px; animation: run-leg2 0.5s infinite alternate; }
                        @keyframes run-leg1 { from { transform: rotate(-30deg); } to { transform: rotate(30deg); } }
                        @keyframes run-leg2 { from { transform: rotate(30deg); } to { transform: rotate(-30deg); } }
                    </style>
                    <g transform="translate(0 5)">
                        <circle class="stick-figure" cx="50" cy="40" r="10" />
                        <line class="stick-figure" x1="50" y1="50" x2="50" y2="70" />
                        <line class="stick-figure leg1" x1="50" y1="70" x2="40" y2="90" />
                        <line class="stick-figure leg2" x1="50" y1="70" x2="60" y2="90" />
                        <line class="stick-figure leg2" x1="50" y1="55" x2="65" y2="65" />
                        <line class="stick-figure leg1" x1="50" y1="55" x2="35" y2="65" />
                    </g>
                </svg>`
        },
        {
            title: "काल: परिभाषा, भेद, उदाहरण",
            url: "vyakaran/tense-in-hindi.html",
            description: "काल क्रिया के उस रूप को कहते हैं जिससे उसके करने या होने के समय का बोध होता है। इसके तीन मुख्य भेद हैं - भूत, वर्तमान, भविष्य।",
            svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .glass { stroke: #a569bd; stroke-width: 3; fill: none; }
                        .sand { fill: #d7bde2; animation: sand-flow 4s linear infinite; }
                        @keyframes sand-flow { 0% { transform: translateY(0); } 100% { transform: translateY(30px); } }
                    </style>
                    <path class="glass" d="M30 30 H 70 V 45 L 50 60 L 70 75 V 90 H 30 V 75 L 50 60 L 30 45 Z" />
                    <path class="sand" d="M33 33 H 67 V 45 L 50 58 L 33 45 Z" />
                </svg>`
        },
        {
            title: "अव्यय: परिभाषा, भेद, उदाहरण",
            url: "vyakaran/indeclinable-words-in-hindi.html",
            description: "अव्यय या अविकारी शब्द वे होते हैं जिनमें लिंग, वचन, पुरुष, कारक आदि के कारण कोई विकार या परिवर्तन नहीं होता।",
            svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .rock { fill: #bdc3c7; stroke: #95a5a6; stroke-width: 2; animation: slight-shake 5s ease-in-out infinite; transform-origin: bottom center; }
                        @keyframes slight-shake { 2% { transform: rotate(-1deg); } 4% { transform: rotate(1deg); } 6%, 100% { transform: rotate(0); } }
                    </style>
                    <path class="rock" d="M20 80 Q 30 50, 50 55 T 80 80 Z" />
                </svg>`
        },
        {
            title: "निपात: परिभाषा, भेद, उदाहरण",
            url: "vyakaran/particle-in-hindi.html",
            description: "निपात वे अव्यय शब्द हैं जो किसी शब्द या पद के बाद लगकर उसके अर्थ में विशेष प्रकार का बल या भाव उत्पन्न करते हैं।",
            svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .word { font: 20px 'Hind', sans-serif; fill: #34495e; }
                        .emphasis { animation: pop 1s ease-in-out infinite alternate; transform-origin: center; }
                        @keyframes pop { to { transform: scale(1.2); } }
                    </style>
                    <text class="word" x="25" y="65">मैं</text>
                    <g class="emphasis" transform="translate(45 53)">
                        <text class="word" x="0" y="0" style="fill: #d35400; font-weight: bold;">भी</text>
                    </g>
                    <text class="word" x="65" y="65">चलूँगा</text>
                </svg>`
        },
        {
            title: "वाच्य: परिभाषा, भेद, उदाहरण",
            url: "vyakaran/voice-in-hindi.html",
            description: "वाच्य क्रिया का वह रूप है जिससे यह पता चलता है कि वाक्य में कर्ता, कर्म या भाव में से किसकी प्रधानता है।",
            svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .speaker { fill: #5dade2; }
                        .wave { stroke: #aed6f1; stroke-width: 2.5; fill:none; animation: speak-wave 1.5s linear infinite; }
                        @keyframes speak-wave { 
                            from { d: path('M55 55 c 5 0, 10 -10, 15 0'); opacity: 1; } 
                            to { d: path('M55 55 c 10 0, 20 -20, 30 0'); opacity: 0; } 
                        }
                    </style>
                    <path d="M25 45 a 15 15 0 0 1 30 0 v10 a 15 15 0 0 1 -30 0 z" class="speaker"/>
                    <path class="wave" />
                    <path class="wave" style="animation-delay: -0.5s;" />
                </svg>`
        },
        {
            title: "पुरुष: परिभाषा, भेद, उदाहरण",
            url: "vyakaran/person-in-hindi.html",
            description: "व्याकरण में पुरुष से तात्पर्य वक्ता, श्रोता और अन्य व्यक्ति से है। इसके तीन भेद हैं - उत्तम, मध्यम और अन्य पुरुष।",
            svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .person { fill: #a2d9ce; stroke: #1abc9c; stroke-width:2; }
                        .p1, .p2, .p3 { animation: highlight 3s linear infinite; }
                        .p2 { animation-delay: -1s; } .p3 { animation-delay: -2s; }
                        @keyframes highlight{ 0%, 100% { fill: #a2d9ce; } 33% { fill: #16a085; } 66% { fill: #a2d9ce; } }
                    </style>
                    <circle class="person p1" cx="30" cy="65" r="15"/>
                    <circle class="person p2" cx="50" cy="65" r="15"/>
                    <circle class="person p3" cx="70" cy="65" r="15"/>
                </svg>`
        },
        {
            title: "विराम-चिन्ह: परिभाषा, भेद, उदाहरण",
            url: "vyakaran/punctuation-in-hindi.html",
            description: "विराम-चिन्हों का प्रयोग भाषा में स्पष्टता और भावों की सही अभिव्यक्ति के लिए किया जाता है। यहाँ सभी चिन्हों का वर्णन है।",
            svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .mark { font: 50px sans-serif; fill: #34495e; animation: blink-mark 2s linear infinite; }
                        @keyframes blink-mark { 0%, 40% { opacity: 1; transform: scale(1); } 50%, 90% { opacity: 0; transform: scale(0.5); } 100% { opacity: 1; transform: scale(1); } }
                    </style>
                    <text x="30" y="75" class="mark">?</text>
                    <text x="65" y="75" class="mark" style="animation-delay: -1s;">!</text>
                </svg>`
        },
        {
            title: "उपसर्ग: परिभाषा, भेद, उदाहरण",
            url: "vyakaran/prefix-in-hindi.html",
            description: "उपसर्ग वे शब्दांश हैं जो किसी शब्द के आरंभ में जुड़कर उसके अर्थ को बदल देते हैं या नया अर्थ देते हैं।",
            svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .word, .prefix { font: 25px 'Hind', sans-serif; text-anchor: middle; }
                        .word { fill: #2c3e50; }
                        .prefix { fill: #c0392b; animation: attach-prefix 2.5s ease-out infinite; }
                        @keyframes attach-prefix { from { transform: translateX(-30px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
                    </style>
                    <text class="prefix" x="35" y="65">अप</text>
                    <text class="word" x="65" y="65">मान</text>
                </svg>`
        },
        {
            title: "प्रत्यय: परिभाषा, भेद, उदाहरण",
            url: "vyakaran/suffix-in-hindi.html",
            description: "प्रत्यय वे शब्दांश हैं जो किसी शब्द के अंत में जुड़कर उसके अर्थ में विशेषता या परिवर्तन लाते हैं।",
            svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .word, .suffix { font: 25px 'Hind', sans-serif; text-anchor: middle; }
                        .word { fill: #2c3e50; }
                        .suffix { fill: #27ae60; animation: attach-suffix 2.5s ease-out infinite; }
                        @keyframes attach-suffix { from { transform: translateX(30px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
                    </style>
                    <text class="word" x="35" y="65">समाज</text>
                    <text class="suffix" x="70" y="65">इक</text>
                </svg>`
        },
        {
            title: "संधि: परिभाषा, भेद, उदाहरण",
            url: "vyakaran/joining.html",
            description: "संधि का अर्थ है 'मेल'। दो निकटवर्ती वर्णों के मेल से जो विकार (परिवर्तन) होता है, उसे संधि कहते हैं।",
            svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .p1, .p2 { fill: #d7bde2; stroke: #a569bd; stroke-width: 2; transition: transform 0.5s ease-in-out; }
                        .container:hover .p1 { transform: translateX(10px); }
                        .container:hover .p2 { transform: translateX(-10px); }
                        .flash { fill: #f0e6f7; r: 0; animation: flash-anim 2s infinite 1s; }
                        @keyframes flash-anim {
                            0% { r: 0; opacity: 1; }
                            50% { r: 20; opacity: 0; }
                            100% { r: 20; opacity: 0; }
                        }
                    </style>
                    <g class="container">
                        <path class="p2" d="M80 40 H 60 C 55 45, 55 55, 60 60 L 60 80 H 80 Z" />
                        <path class="p1" d="M20 40 H 40 C 45 45, 45 55, 40 60 L 40 80 H 20 Z" />
                        <circle class="flash" cx="50" cy="60" />
                    </g>
                </svg>`
        },
        {
            title: "समास: परिभाषा, भेद, उदाहरण",
            url: "vyakaran/compound-in-hindi.html",
            description: "समास दो या दो से अधिक शब्दों को मिलाकर एक नया और संक्षिप्त शब्द बनाने की प्रक्रिया है। इसके प्रमुख भेदों का वर्णन यहाँ है।",
            svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .box { fill: #aed6f1; stroke: #5dade2; stroke-width: 2; }
                        .plus { fill: #2980b9; font-weight: bold; font-size: 20px; animation: shrink 2.5s ease-in-out infinite alternate; transform-origin: center; }
                        .b1 { animation: combine-1 2.5s ease-in-out infinite alternate; }
                        .b2 { animation: combine-2 2.5s ease-in-out infinite alternate; }
                        @keyframes combine-1 { to { transform: translateX(12px); } }
                        @keyframes combine-2 { to { transform: translateX(-12px); } }
                        @keyframes shrink { to { transform: scale(0); opacity: 0; } }
                    </style>
                    <g class="b1">
                         <rect class="box" x="10" y="50" width="30" height="30" rx="3" />
                         <text x="25" y="70" text-anchor="middle" font-size="12">राज</text>
                    </g>
                    <g class="b2">
                        <rect class="box" x="60" y="50" width="30" height="30" rx="3" />
                        <text x="75" y="70" text-anchor="middle" font-size="12">पुत्र</text>
                    </g>
                    <text class="plus" x="45" y="68">+</text>
                </svg>`
        },
        {
            title: "तत्सम-तद्भव: परिभाषा, भेद, उदाहरण",
            url: "vyakaran/tatsam-tadbhav-in-hindi.html",
            description: "तत्सम शब्द संस्कृत से ज्यों के त्यों लिए गए हैं, जबकि तद्भव शब्द संस्कृत से परिवर्तित होकर बने हैं।",
            svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .word { font: 22px 'Hind', sans-serif; fill: #d35400; text-anchor: middle; }
                        .w1 { animation: fade-out 4s linear infinite; }
                        .w2 { opacity: 0; animation: fade-in 4s linear infinite; }
                        .arrow { fill: #d35400; animation: arrow-flow 2s ease-in-out infinite; transform-origin: center; }
                        @keyframes arrow-flow { 0%, 100% { transform: scaleX(1); } 50% { transform: scaleX(1.3); } }
                        @keyframes fade-out { 0%, 40% { opacity: 1; } 60%, 100% { opacity: 0; } }
                        @keyframes fade-in { 0%, 60% { opacity: 0; } 80%, 100% { opacity: 1; } }
                    </style>
                    <text x="25" y="65" class="word w1">अग्नि</text>
                    <text x="75" y="65" class="word w2">आग</text>
                    <path class="arrow" transform="translate(50, 60)" d="M-15,0 L0,-5 L15,0 L0,5 Z" />
                </svg>`
        },
        {
            title: "देशज-विदेशज: परिभाषा, भेद, उदाहरण",
            url: "vyakaran/deshaj-videshaj-in-hindi.html",
            description: "देशज शब्द स्थानीय बोलियों से आते हैं, जबकि विदेशज शब्द अन्य भाषाओं से लिए गए हैं। यह हिंदी भाषा की विविधता को दर्शाता है।",
            svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .globe { fill: #a2d9ce; stroke: #48c9b0; stroke-width: 2; }
                        .plane { fill: #c0392b; animation: fly-around 5s linear infinite; }
                        @keyframes fly-around { from { motion-offset: 0%; } to { motion-offset: 100%; } }
                    </style>
                    <circle id="orbit" cx="50" cy="60" r="35" fill="none"/>
                    <circle class="globe" cx="50" cy="60" r="30"/>
                    <path class="plane" d="M0,0 l-10,5 l10,-2 l-10,-2 z">
                       <animateMotion dur="5s" repeatCount="indefinite" rotate="auto">
                            <mpath href="#orbit" />
                        </animateMotion>
                    </path>
                </svg>`
        },
        {
            title: "विलोम-शब्द: परिभाषा, भेद, उदाहरण",
            url: "vyakaran/antonyms-in-hindi.html",
            description: "विलोम शब्द (विपरीतार्थक शब्द) वे शब्द होते हैं जो किसी दूसरे शब्द का उल्टा अर्थ बताते हैं। यह भाषा में संतुलन लाते हैं।",
            svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .sun { fill: #f1c40f; transform-origin: center; animation: spin 8s linear infinite; }
                        .moon { fill: #ecf0f1; animation: slide 4s ease-in-out infinite alternate; }
                        @keyframes spin { to { transform: rotate(360deg); } }
                        @keyframes slide { from { transform: translateX(-25px); } to { transform: translateX(25px); } }
                    </style>
                    <circle class="sun" cx="50" cy="60" r="25"/>
                    <circle class="moon" cx="50" cy="60" r="25"/>
                </svg>`
        },
        {
            title: "पर्यायवाची-शब्द: परिभाषा, भेद, उदाहरण",
            url: "vyakaran/synonyms-in-hindi.html",
            description: "पर्यायवाची शब्द (समानार्थक शब्द) उन शब्दों को कहते हैं जिनके अर्थ समान होते हैं। यह शब्द-भंडार को समृद्ध करते हैं।",
            svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .word { font: 22px 'Hind', sans-serif; fill: #27ae60; text-anchor: middle; }
                        .main-word { font-size: 28px; font-weight: bold; }
                        .synonym { animation: cycle-words 6s linear infinite; opacity: 0; }
                        .s1 { animation-delay: 0s; } .s2 { animation-delay: -3s; }
                        @keyframes cycle-words { 0%, 100% { opacity: 0; } 25%, 75% { opacity: 1; } }
                    </style>
                    <text class="word main-word" x="50" y="50">जल</text>
                    <text class="word synonym s1" x="50" y="80">नीर</text>
                    <text class="word synonym s2" x="50" y="80">पानी</text>
                </svg>`
        },
        {
            title: "मुहावरे: परिभाषा, भेद, उदाहरण",
            url: "vyakaran/idioms-in-hindi.html",
            description: "मुहावरे ऐसे वाक्यांश होते हैं जो अपने सामान्य अर्थ को छोड़कर किसी विशेष अर्थ को व्यक्त करते हैं, जिससे भाषा रोचक बनती है।",
            svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .bulb-glass { fill: #fef9e7; }
                        .bulb-base { fill: #d0d3d4; }
                        .glow { fill: #fdebd0; r: 30; animation: bulb-glow 2s ease-in-out infinite alternate; }
                        @keyframes bulb-glow { from { opacity: 0; } to { opacity: 0.8; } }
                    </style>
                    <circle class="glow" cx="50" cy="55" />
                    <path class="bulb-glass" d="M50,35 C65,35 75,45 75,55 A25 25 0 0 1 25 55 C25,45 35,35 50,35 Z" />
                    <rect class="bulb-base" x="40" y="80" width="20" height="10" rx="2" />
                </svg>`
        },
        {
            title: "लोकोक्तियाँ: परिभाषा, भेद, उदाहरण",
            url: "vyakaran/proverbs-in-hindi.html",
            description: "लोकोक्तियाँ या कहावतें ऐसे वाक्यांश हैं जो अपने अनुभव और परंपरा के आधार पर बने हैं और किसी सत्य को प्रकट करते हैं।",
            svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .seed { fill: #8c5a2b; animation: drop-seed 5s infinite; transform-origin: center; }
                        .sprout { stroke: #27ae60; stroke-width: 3; stroke-linecap: round; fill: none; stroke-dasharray: 50; stroke-dashoffset: 50; animation: grow-sprout 5s infinite; }
                        .tree { opacity: 0; animation: show-tree 5s infinite; }
                        @keyframes drop-seed { 0%, 10% { opacity: 1; transform: translateY(-20px); } 20% { opacity: 1; transform: translateY(70px); } 25%, 100% { opacity: 0; transform: translateY(70px); } }
                        @keyframes grow-sprout { 25% { stroke-dashoffset: 50; } 50% { stroke-dashoffset: 0; } 60%, 100% { stroke-dashoffset: 0; opacity: 0; } }
                        @keyframes show-tree { 60% { opacity: 0; } 80%, 100% { opacity: 1; } }
                    </style>
                    <circle class="seed" cx="50" cy="15" r="5" />
                    <path class="sprout" d="M50 80 C 50 60, 40 60, 45 50" />
                    <g class="tree">
                        <path d="M50 80 V 40" stroke="#8c5a2b" stroke-width="5"/>
                        <circle cx="50" cy="30" r="20" fill="#2ecc71" />
                        <circle cx="40" cy="40" r="15" fill="#27ae60" />
                        <circle cx="60" cy="40" r="15" fill="#27ae60" />
                    </g>
                </svg>`
        },
        {
            title: "अनेक शब्दों के लिए एक शब्द: परिभाषा, भेद, उदाहरण",
            url: "vyakaran/one-word-substitution-in-hindi.html",
            description: "भाषा को संक्षिप्त और प्रभावशाली बनाने के लिए वाक्यांश या अनेक शब्दों के स्थान पर एक शब्द का प्रयोग किया जाता है।",
            svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .funnel { fill: #95a5a6; stroke: #7f8c8d; stroke-width: 1.5; }
                        .word { fill: #34495e; opacity: 0; animation: pass-through 4s linear infinite; }
                        .one-word { animation-delay: -2s; }
                        @keyframes pass-through { 
                            0% { opacity: 0; transform: translateY(-10px); } 
                            25% { opacity: 1; transform: translateY(0px); } 
                            50% { opacity: 0; transform: translateY(10px); } 
                            100% { opacity: 0; } 
                        }
                    </style>
                    <text x="50" y="35" text-anchor="middle" class="word many-words" font-size="10">जो कभी न मरे</text>
                    <path class="funnel" d="M25 40 L 75 40 L 55 70 L 45 70 Z" />
                    <text x="50" y="85" text-anchor="middle" class="word one-word" font-size="12">अमर</text>
                </svg>`
        },
        {
            title: "अनेकार्थी-शब्द: परिभाषा, भेद, उदाहरण",
            url: "vyakaran/words-of-many-meanings-in-hindi.html",
            description: "अनेकार्थी शब्द वे होते हैं जिनके एक से अधिक अर्थ निकलते हैं। प्रसंग के अनुसार उनका सही अर्थ समझा जाता है।",
            svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .center { fill: #f39c12; }
                        .branch { fill: #f1c40f; transition: transform 0.3s ease-out; animation: spread 4s ease-in-out infinite alternate; transform-origin: center;}
                        .b1 { animation-delay: 0s; } .b2 { animation-delay: -1s; } .b3 { animation-delay: -2s; }
                        .text { font-size: 14px; fill: #7e5109; text-anchor: middle; }
                        @keyframes spread { to { transform: translate(15px, -15px); } }
                    </style>
                    <circle cx="50" cy="60" r="15" class="center"/>
                    <text class="text" x="50" y="64">कर</text>
                    <g class="branch b1"><text class="text" x="20" y="35">हाथ</text></g>
                    <g class="branch b2" style="animation-direction: alternate-reverse;"><text class="text" x="80" y="35">टैक्स</text></g>
                    <g class="branch b3"><text class="text" x="20" y="85">सूंड</text></g>
                </svg>`
        },
        {
            title: "एकार्थक प्रतीत होने वाले शब्द: परिभाषा, भेद, उदाहरण",
            url: "vyakaran/words-apparently-similar-in-meanings-in-hindi.html",
            description: "कुछ शब्द देखने में समान अर्थ वाले लगते हैं, लेकिन उनके प्रयोग और अर्थ में सूक्ष्म भिन्नता होती है। यहाँ ऐसे ही शब्दों का संकलन है।",
            svg: `<svg viewBox="0 0 100 100">
                     <style>
                        .face { fill: #bdc3c7; stroke: #7f8c8d; stroke-width: 2; }
                        .eye { fill: #2c3e50; }
                        .mask-reveal { animation: reveal 4s ease-in-out infinite; }
                        @keyframes reveal { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-30px); } }
                    </style>
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
                </svg>`
        },
        {
            title: "त्रुटिसम भिन्नार्थक शब्द: परिभाषा, भेद, उदाहरण",
            url: "vyakaran/pairs-of-similar-words.html",
            description: "ये वे शब्द हैं जो सुनने में लगभग समान लगते हैं, पर उनकी वर्तनी और अर्थ में सूक्ष्म अंतर होता है। यह भाषा को समृद्ध बनाता है।",
            svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .ear { fill: #d7bde2; stroke: #8e44ad; stroke-width:2; }
                        .sound-wave { stroke: #9b59b6; stroke-width:2; fill:none; animation: radiate 2s linear infinite; }
                        @keyframes radiate { from { r:0; opacity: 1; } to { r:15; opacity: 0; } }
                    </style>
                    <path class="ear" d="M40 30 C 20 30, 20 80, 40 80 S 60 70, 50 55 C 50 55, 60 40, 40 30" />
                    <circle class="sound-wave" cx="60" cy="55" r="0" />
                    <circle class="sound-wave" cx="60" cy="55" r="0" style="animation-delay: -1s;" />
                </svg>`
        },
        {
            title: "युग्म शब्द: परिभाषा, भेद, उदाहरण",
            url: "vyakaran/yugm-shabd.html",
            description: "युग्म-शब्द वे शब्द होते हैं जो उच्चारण में समान लगते हैं, परन्तु उनके अर्थ भिन्न होते हैं। यहाँ ऐसे शब्दों के उदाहरण दिए गए हैं।",
            svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .word { font: 25px 'Hind', sans-serif; fill: #2c3e50; }
                        .w1 { animation: swap-1 4s ease-in-out infinite; }
                        .w2 { animation: swap-2 4s ease-in-out infinite; }
                        @keyframes swap-1 { 50% { transform: translate(45px, 0); } }
                        @keyframes swap-2 { 50% { transform: translate(-45px, 0); } }
                    </style>
                    <text x="15" y="65" class="word w1">कुल</text>
                    <text x="60" y="65" class="word w2">कूल</text>
                </svg>`
        },
        {
            title: "रस: परिभाषा, भेद, उदाहरण",
            url: "vyakaran/ras-in-hindi.html",
            description: "रस का शाब्दिक अर्थ है 'आनंद'। काव्य को पढ़ने या सुनने से जिस आनंद की अनुभूति होती है, उसे रस कहते हैं। यहाँ सभी रसों का वर्णन है।",
            svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .drop { fill: #c0392b; animation: drip-anim 3s ease-out infinite; transform-origin: 50px 30px; }
                        .splash { fill: none; stroke: #c0392b; stroke-width: 2; animation: splash-anim 3s ease-out infinite; }
                        @keyframes drip-anim { 0% { transform: translateY(0); opacity: 1; } 60% { transform: translateY(40px); opacity: 1; } 61% { opacity: 0; } 100% { transform: translateY(0); opacity: 0; } }
                        @keyframes splash-anim { 0%, 60% { stroke-dasharray: 0 100; opacity: 0; } 80% { stroke-dasharray: 100 0; opacity: 1; } 100% { opacity: 0; } }
                    </style>
                    <path class="drop" d="M50,30 C50,30 65,45 50,60 C35,45 50,30 50,30 Z"/>
                    <circle class="splash" cx="50" cy="75" r="15" />
                </svg>`
        },
        {
            title: "छन्द: परिभाषा, भेद, उदाहरण",
            url: "vyakaran/chhand-in-hindi.html",
            description: "छन्द काव्य में वर्णों या मात्राओं की नियमित संख्या के विन्यास को कहते हैं। यहाँ मात्रिक और वर्णिक छंदों के लक्षण और उदाहरण दिए गए हैं।",
            svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .path-line { stroke: #e6f7f4; stroke-width: 10; fill: none; }
                        .beat { fill: #16a085; animation: follow-path 4s linear infinite; }
                        @keyframes follow-path { from { motion-offset: 0%; } to { motion-offset: 100%; } }
                    </style>
                    <path id="wave" class="path-line" d="M10 60 Q 30 40, 50 60 T 90 60" />
                    <circle class="beat" r="5">
                        <animateMotion dur="4s" repeatCount="indefinite">
                            <mpath href="#wave" />
                        </animateMotion>
                    </circle>
                </svg>`
        },
        {
            title: "अलंकार: परिभाषा, भेद, उदाहरण",
            url: "vyakaran/alankar-in-hindi.html",
            description: "अलंकार काव्य की शोभा बढ़ाने वाले तत्व हैं। इस खंड में शब्दालंकार और अर्थालंकार के प्रमुख भेदों को उदाहरण सहित समझाया गया है।",
            svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .gem { fill: #3498db; stroke: #2c3e50; stroke-width: 1.5; transform-origin: center; animation: gem-rotate 5s linear infinite; }
                        .sparkle { fill: #ecf0f1; animation: sparkle-shine 1.5s ease-in-out infinite alternate; }
                        @keyframes gem-rotate { from { transform: rotateY(0deg); } to { transform: rotateY(360deg); } }
                        @keyframes sparkle-shine { from { opacity: 0; transform: scale(0.5); } to { opacity: 1; transform: scale(1); } }
                    </style>
                    <path class="gem" d="M50 35 L75 55 L50 90 L25 55 Z" />
                    <path fill="#2980b9" d="M50 35 L75 55 L50 65 Z" />
                    <path fill="#2980b9" d="M50 35 L25 55 L50 65 Z" />
                    <circle class="sparkle" cx="35" cy="50" r="3" style="animation-delay: 0s;"/>
                    <circle class="sparkle" cx="65" cy="50" r="2" style="animation-delay: 0.5s;"/>
                    <circle class="sparkle" cx="50" cy="80" r="3" style="animation-delay: 1s;"/>
                </svg>`
        },
        {
            title: "अनुच्छेद-लेखन: परिभाषा, भेद, उदाहरण",
            url: "vyakaran/paragraph-writing-in-hindi.html",
            description: "अनुच्छेद-लेखन किसी एक विषय पर संक्षिप्त और सारगर्भित जानकारी प्रस्तुत करने की कला है। यहाँ प्रभावी अनुच्छेद लिखने के नियम और उदाहरण दिए गए हैं।",
            svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .pen { animation: write 3s ease-in-out infinite; transform-origin: 70px 80px; }
                        .nib { fill: #34495e; }
                        .body { fill: #d35400; }
                        .line { stroke: #34495e; stroke-width: 2; stroke-dasharray: 100; stroke-dashoffset: 100; animation: draw 3s ease-in-out infinite; }
                        @keyframes write { 0%, 100% { transform: rotate(10deg); } 50% { transform: rotate(-5deg); } }
                        @keyframes draw { 40% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: 0; } }
                    </style>
                    <path class="line" d="M20 50 H 80"/>
                    <g class="pen" transform="translate(-10 -25)">
                        <polygon class="nib" points="70,80 75,75 72,78"/>
                        <rect class="body" x="60" y="20" width="10" height="60" rx="5" transform="rotate(20 65 50)"/>
                    </g>
                </svg>`
        },
        {
            title: "अपठित-गद्यांश: परिभाषा, भेद, उदाहरण",
            url: "vyakaran/unseen-passage-in-hindi.html",
            description: "अपठित गद्यांश का उद्देश्य छात्रों की समझ और विश्लेषण क्षमता का मूल्यांकन करना है। यहाँ गद्यांश को हल करने की सही विधि और रणनीतियाँ बताई गई हैं।",
            svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .paper { fill: #f5f3f7; }
                        .text-line { fill: #d8cde0; }
                        .magnifier { fill: rgba(231, 221, 240, 0.7); stroke: #8e44ad; stroke-width:3; animation: scan-text 4s linear infinite; }
                        @keyframes scan-text { 0% { transform: translate(0, 0); } 25% { transform: translate(25px, 5px); } 50% { transform: translate(0px, 10px); } 75% { transform: translate(-25px, 5px); } 100% { transform: translate(0, 0); } }
                    </style>
                    <rect class="paper" x="10" y="30" width="80" height="60" rx="3"/>
                    <rect class="text-line" x="15" y="40" width="70" height="4" rx="2"/>
                    <rect class="text-line" x="15" y="50" width="70" height="4" rx="2"/>
                    <rect class="text-line" x="15" y="60" width="50" height="4" rx="2"/>
                    <g class="magnifier">
                        <circle cx="50" cy="55" r="20" />
                        <line x1="64" y1="69" x2="75" y2="80" stroke-linecap="round"/>
                    </g>
                </svg>`
        },
        {
            title: "पत्र-लेखन: परिभाषा, भेद, उदाहरण",
            url: "vyakaran/letter-writing-in-hindi.html",
            description: "पत्र-लेखन संचार का एक महत्वपूर्ण माध्यम है। यहाँ औपचारिक और अनौपचारिक पत्रों के प्रारूप, भाषा-शैली और उदाहरणों का विस्तृत वर्णन है।",
            svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .envelope-back { fill: #ecf0f1; }
                        .envelope-front { fill: #bdc3c7; }
                        .flap { fill: #ecf0f1; stroke: #bdc3c7; stroke-width:1; transform-origin: 50px 50px; animation: open-flap 3s ease-in-out infinite alternate; }
                        @keyframes open-flap { to { transform: rotateX(-160deg); } }
                    </style>
                    <rect class="envelope-back" x="15" y="50" width="70" height="40" rx="3"/>
                    <path class="envelope-front" d="M15 50 L 50 75 L 85 50 L 85 90 L 15 90 Z" />
                    <path class="flap" d="M15 50 L 50 75 L 85 50 Z" />
                </svg>`
        },
        {
            title: "निबंध: परिभाषा, भेद, उदाहरण",
            url: "vyakaran/essay-in-hindi.html",
            description: "निबंध लेखन विचारों को व्यवस्थित रूप से प्रस्तुत करने की एक कला है। इस खंड में निबंध के प्रकार, संरचना और प्रभावी लेखन की तकनीकों को जानें।",
            svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .paper { fill: #ecf0f1; stroke: #bdc3c7; stroke-width: 1; }
                        .line { fill: #7f8c8d; animation: write-line 3s linear infinite; transform-origin: left; }
                        @keyframes write-line { from { transform: scaleX(0); } to { transform: scaleX(1); } }
                    </style>
                    <rect x="15" y="40" width="70" height="50" rx="3" class="paper" />
                    <rect x="20" y="50" width="60" height="4" rx="2" class="line" />
                    <rect x="20" y="60" width="60" height="4" rx="2" class="line" style="animation-delay: -1s;"/>
                    <rect x="20" y="70" width="60" height="4" rx="2" class="line" style="animation-delay: -2s;"/>
                    <rect x="20" y="80" width="40" height="4" rx="2" class="line" style="animation-delay: -2.5s;"/>
                </svg>`
        }
    ];
    
    const mathsChapters = [
        {
            title: 'Algebra',
            url: '/maths/algebra.html',
            description: 'Learn the fundamentals of variables, expressions, and equations. The building block of higher mathematics.',
            svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .beam { fill: #64748b; }
                        .base { fill: #475569; }
                        .pan { fill: #94a3b8; stroke: #475569; stroke-width: 1.5; }
                        .balance { animation: balance-it 4s ease-in-out infinite; transform-origin: 50px 30px;}
                        .text { font: bold 12px sans-serif; fill: #1e293b; text-anchor: middle; }
                        @keyframes balance-it {
                            0%, 20% { transform: rotate(10deg); }
                            60%, 100% { transform: rotate(0deg); }
                        }
                    </style>
                    <g class="balance">
                        <rect class="beam" x="10" y="25" width="80" height="10" rx="3"/>
                        <circle class="pan" cx="20" cy="55" r="15"/>
                        <circle class="pan" cx="80" cy="55" r="15"/>
                        <line stroke="#475569" stroke-width="2" x1="20" y1="35" x2="20" y2="40"/>
                        <line stroke="#475569" stroke-width="2" x1="80" y1="35" x2="80" y2="40"/>
                        <text class="text" x="20" y="60">x+2</text>
                        <text class="text" x="80" y="60">5</text>
                    </g>
                    <path class="base" d="M48 35 L 52 35 L 50 30 Z" />
                    <rect class="base" x="47" y="35" width="6" height="45" />
                    <rect class="base" x="35" y="80" width="30" height="5" rx="2"/>
                </svg>`
        },
        {
            title: 'Geometry',
            url: '/maths/geometry.html',
            description: 'Explore shapes, sizes, positions of figures, and the properties of space in a visual way.',
            svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .shape {
                            stroke-width: 4; fill: none; transform-origin: center;
                            animation: morph-shape 9s linear infinite;
                        }
                        @keyframes morph-shape {
                            0%, 100% { d: path("M50,15 A35,35 0 1,1 49.9,15 Z"); stroke: #2ecc71; }
                            33% { d: path("M15 15 H 85 V 85 H 15 Z"); stroke: #e74c3c; }
                            66% { d: path("M50,15 85,85 15,85 Z"); stroke: #f1c40f; }
                        }
                    </style>
                    <path class="shape" />
                </svg>`
        },
        {
            title: 'Trigonometry',
            url: '/maths/trigonometry.html',
            description: 'Study the relationships between side lengths and angles of triangles, crucial for many fields.',
            svg: `<svg viewBox="0 0 100 100">
                    <style>
                        .tri-shape { stroke-width: 4; stroke: #9b59b6; fill: rgba(155, 89, 182, 0.1); }
                        .sine-wave { stroke: #8e44ad; stroke-width: 2.5; fill: none; stroke-dasharray: 100; animation: draw-wave 3s linear infinite; }
                        @keyframes draw-wave { to { stroke-dashoffset: -200; } }
                    </style>
                    <polygon class="tri-shape" points="10,90 90,90 10,10" />
                    <path class="sine-wave" d="M10 50 C 25 20, 45 80, 60 50 S 90 20, 90 20" />
                </svg>`
        }
    ];

    const physicsChapters = [
         {
                title: 'Mechanics',
                url: '/physics/mechanics.html',
                description: 'Understand motion, forces, and energy. The foundation of classical physics.',
                svg: `<svg viewBox="0 0 100 100">
                        <style>
                            .ball { fill: #4f46e5; animation: fall 2s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite; }
                            .ground { stroke: #6b7280; stroke-width: 3; stroke-linecap: round; }
                            @keyframes fall {
                                0% { transform: translateY(-10px); }
                                40% { transform: translateY(60px); }
                                60% { transform: translateY(40px); }
                                80% { transform: translateY(60px); }
                                90% { transform: translateY(55px); }
                                100% { transform: translateY(60px); }
                            }
                        </style>
                        <circle cx="50" cy="20" r="10" class="ball" />
                        <line x1="20" y1="90" x2="80" y2="90" class="ground" />
                    </svg>`
            },
            {
                title: 'Thermodynamics',
                url: '/physics/thermodynamics.html',
                description: 'Explore heat, work, and temperature, and their relation to energy and physical properties.',
                svg: `<svg viewBox="0 0 100 100">
                        <style>
                            .fire { fill: #7c3aed; animation: flicker 0.5s infinite alternate; }
                            .steam { stroke: #a5b4fc; stroke-width: 2; fill: none; animation: rise 1.5s linear infinite; opacity: 0; }
                            @keyframes flicker { to { transform: scale(1.1, 0.9) skewX(5deg); } }
                            @keyframes rise {
                                0% { transform: translateY(0); opacity: 1; }
                                100% { transform: translateY(-25px); opacity: 0; }
                            }
                        </style>
                        <path class="fire" d="M40,90 C40,80 45,80 50,70 C55,80 60,80 60,90 Z" />
                        <path class="fire" d="M35,90 C35,85 40,85 45,75 C50,85 55,85 55,90 Z" style="transform: scale(0.8) translate(15px, 0); fill: #4f46e5;" />
                        <path class="steam" d="M45,65 Q 50,60 55,65" style="animation-delay: 0s;"/>
                        <path class="steam" d="M48,60 Q 53,55 58,60" style="animation-delay: 0.5s;"/>
                        <path class="steam" d="M42,55 Q 47,50 52,55" style="animation-delay: 1s;"/>
                    </svg>`
            },
            {
                title: 'Electromagnetism',
                url: '/physics/electromagnetism.html',
                description: 'Delve into electricity, magnetism, and their interplay, from circuits to light waves.',
                svg: `<svg viewBox="0 0 100 100">
                        <style>
                            .magnet-n { fill: #c7d2fe; } .magnet-s { fill: #a5b4fc; }
                            .magnet-body { stroke: #4f46e5; stroke-width: 2; }
                            .field-line { stroke: #6b7280; stroke-width: 1.5; fill: none; stroke-dasharray: 100; animation: draw-field 2.5s linear infinite; }
                            @keyframes draw-field { to { stroke-dashoffset: -100; } }
                        </style>
                        <path class="magnet-body magnet-n" d="M 30 30 H 70 A 20 20 0 0 1 70 70 H 30 V 30 Z" />
                        <path class="magnet-body magnet-s" d="M 30 70 H 70 A 20 20 0 0 0 70 30" fill="none" />
                        <path class="field-line" d="M 30 40 C 0 40, 0 60, 30 60" />
                        <path class="field-line" d="M 30 30 C -20 30, -20 70, 30 70" style="animation-delay: -0.5s;"/>
                    </svg>`
            }
    ];

    const createChapterCard = (chapter) => {
        const url = chapter.url || '#';
        const description = chapter.description || 'Description coming soon.';
        const svg = chapter.svg || '<svg></svg>';
        return `
            <a href="${url}" class="chapter-card-link" title="${chapter.title}">
                <article class="chapter-card">
                    <div class="chapter-svg-container">
                        ${svg}
                    </div>
                    <div class="chapter-content">
                        <h3 class="chapter-title">${chapter.title}</h3>
                        <p class="chapter-description">${description}</p>
                    </div>
                </article>
            </a>
        `;
    };

    const populateChapters = (containerId, chapters) => {
        const container = document.getElementById(containerId);
        if (container) {
            if (chapters && chapters.length > 0) {
                 container.innerHTML = chapters.map(createChapterCard).join('');
            } else {
                 container.innerHTML = "<p>Chapters coming soon!</p>";
            }
        }
    };
    
    populateChapters('formulas-chapters-container', allFormulasChapters);
    populateChapters('conversion-chapters-container', conversionChapters);
    populateChapters('vyakaran-chapters-container', vyakaranChapters);
    populateChapters('maths-chapters-container', mathsChapters);
    populateChapters('physics-chapters-container', physicsChapters);

});
