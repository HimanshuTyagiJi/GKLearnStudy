document.addEventListener("DOMContentLoaded", () => {
  const elementsData = [
    {
      name: "Hydrogen",
      name: "Hydrogen",
      symbol: "H",
      atomicNumber: 1,
      atomicMass: "1.008",
      group: 1,
      period: 1,
      block: "s-block",
      electronic: "1s¹",
      type: "nonmetal",
      specific: "nonmetal",
      physical: "Gas",
      description: `
    <section id="intro" class="note">
      <h2>1. Introduction</h2>
      <p><strong>Symbol:</strong> H &nbsp; | &nbsp; <strong>Atomic number:</strong> 1 &nbsp; | &nbsp; <strong>Electronic configuration:</strong> 1s¹</p>
      <p>Hydrogen is the lightest and simplest chemical element consisting of one proton and one electron. It is the most abundant element in the universe by number of atoms and by mass (approximately 75% of baryonic mass in the universe). On Earth hydrogen is usually found combined with other elements (for example in water, hydrocarbons, and organic matter). At standard temperature and pressure hydrogen exists as a diatomic gas (H₂), which is colorless, odorless and highly flammable.</p>
      <p>Although hydrogen is placed at the top of Group 1 in the periodic table, its chemical behavior is distinct from alkali metals: it forms covalent bonds with nonmetals (e.g., H₂O, NH₃), forms ionic hydrides with very electropositive metals (e.g., NaH), and shows properties that are intermediate between metals and nonmetals under extreme conditions. This versatility makes hydrogen a foundational element in chemistry and a key industrial material.</p>
    </section>

    <section id="history" class="note">
      <h2>2. Discovery & Historical Notes</h2>
      <p>Hydrogen was recognized as a distinct substance in the 16th–18th centuries. In 1766 Henry Cavendish described "inflammable air" produced when metals react with acids and showed that the gas produced water when burned — experiments that established hydrogen as a component of water. Antoine Lavoisier later named the element "hydrogen" (Greek: 'hydro' = water, 'genes' = forming), meaning "water-former".</p>
    </section>

    <section id="occurrence" class="note">
      <h2>3. Occurrence in Universe & Earth</h2>
      <p>Hydrogen is the dominant element in stars and gas giant planets. On Earth its free form (H₂) is rare in the atmosphere (<1 ppm). Most terrestrial hydrogen is chemically bound — e.g., in water (H₂O), hydrocarbons (natural gas, petroleum), and organic matter. Because hydrogen is so light, it escapes the Earth's atmosphere over geological timescales, so maintaining hydrogen on Earth requires continuous cycling (photosynthesis, water splitting, industrial processes).</p>
    </section>

    <section id="isotopes" class="note">
      <h2>4. Isotopes</h2>
      <p>Hydrogen has three naturally recognized isotopes:</p>
      <ul>
        <li><strong>Protium (¹H)</strong> — 1 proton, 0 neutrons. The most common isotope (~99.98%).</li>
        <li><strong>Deuterium (²H or D)</strong> — 1 proton, 1 neutron. Stable, heavier by one neutron (~0.015% natural abundance). Used in heavy water moderators in nuclear reactors, isotopic tracing, and NMR studies.</li>
        <li><strong>Tritium (³H or T)</strong> — 1 proton, 2 neutrons. Radioactive (beta emitter), produced naturally in the upper atmosphere and artificially in reactors. Used in fusion research and self-luminous devices.</li>
      </ul>
      <p>Isotopic substitution (H → D) affects reaction rates (kinetic isotope effect) and physical properties (boiling points, vibrational frequencies), which is useful in mechanistic studies and labeling experiments.</p>
    </section>

    <section id="physical-chemical-properties" class="note">
      <h2>5. Physical & Chemical Properties</h2>
      <h3>Physical</h3>
      <ul>
        <li>Colorless, odorless, tasteless gas at STP.</li>
        <li>Very low density (approx. 0.0899 g L⁻¹ at 0 °C, 1 atm) — ~14 times lighter than air.</li>
        <li>Melting point (H₂): −259.14 °C; boiling point: −252.87 °C.</li>
        <li>Forms liquid hydrogen at cryogenic temperatures and is used as a cryogen.</li>
      </ul>
      <h3>Chemical</h3>
      <ul>
        <li>Dihydrogen (H₂) has a single covalent bond and is relatively inert at room temperature but reacts under appropriate activation (heat, catalysts, plasma).</li>
        <li>Combustion: <code>2 H₂ + O₂ → 2 H₂O</code> — highly exothermic; used for propulsion and energy release.</li>
        <li>Acts as a reducing agent in metallurgy: <code>CuO + H₂ → Cu + H₂O</code>.</li>
        <li>Forms hydrides: ionic hydrides (with Group 1 and 2 metals), covalent hydrides (with p-block elements), and complex/metallic hydrides (in transition metals).</li>
        <li>Ortho and Para forms: H₂ exists as spin isomers — ortho-H₂ (parallel nuclear spins) and para-H₂ (antiparallel spins). The ortho/para ratio affects physical properties at low temperatures.</li>
      </ul>
    </section>

    <section id="production" class="note">
      <h2>6. Production — Laboratory & Industrial (detailed)</h2>
      <p>Hydrogen is produced by a variety of methods. Each method has trade-offs in cost, carbon intensity, purity, and scale.</p>

      <h3>6.1 Laboratory Methods (small scale)</h3>
      <ol>
        <li><strong>Metal + Acid</strong> — e.g. Zinc with dilute hydrochloric acid:
          <div class="eq"><code>Zn + 2 HCl → ZnCl₂ + H₂↑</code></div>
          <p>Simple, inexpensive method for classroom gas generation. Gas should be collected over water or by displacement; impurities may include acid vapors and dissolved gases.</p>
        </li>
        <li><strong>Metal + Alkali</strong> — e.g. Aluminium with NaOH:
          <div class="eq"><code>2 Al + 2 NaOH + 6 H₂O → 2 Na[Al(OH)₄] + 3 H₂↑</code></div>
          <p>Useful where acids are undesirable. Reaction produces aluminate and hydrogen; heat is generated.</p>
        </li>
      </ol>

      <h3>6.2 Industrial Methods (large scale)</h3>
      <ol>
        <li><strong>Steam Methane Reforming (SMR)</strong>
          <p>The dominant global method today. Methane and steam react over a nickel catalyst at high temperature (~700–1,100 °C):</p>
          <div class="eq">
            <code>CH₄ + H₂O → CO + 3 H₂  (steam reforming)</code><br>
            <code>CO + H₂O → CO₂ + H₂  (water–gas shift)</code>
          </div>
          <p>SMR is energy intensive and emits CO₂ unless CO₂ is captured (with CCS) or biogas is used. Resulting hydrogen is often referred to as "grey" hydrogen if CO₂ is released, "blue" if CO₂ is captured.</p>
        </li>

        <li><strong>Electrolysis of Water</strong>
          <p>Electricity splits water into hydrogen and oxygen. Main reactions (acidic or alkaline electrolytes):</p>
          <div class="eq">
            <code>2 H₂O (l) → 2 H₂ (g) + O₂ (g)</code>
          </div>
          <p>If electricity comes from renewable sources (solar, wind, hydro), the hydrogen produced is called "green hydrogen". Electrolysis types: alkaline electrolysis, proton-exchange membrane (PEM) electrolysis, and solid oxide electrolysis (high temperature).</p>
        </li>

        <li><strong>Coal Gasification</strong>
          <p>Coal reacts with oxygen and steam at high temperature to form synthesis gas (CO + H₂), which can be shifted to increase H₂. This route is carbon-intensive unless carbon capture is implemented.</p>
        </li>

        <li><strong>Other methods</strong>: Biomass gasification, thermochemical cycles (e.g., sulfur–iodine), high-temperature solar thermochemical processes, and emerging electrochemical/photocatalytic water splitting.</li>
      </ol>

      <h3>6.3 Purification & Storage</h3>
      <ul>
        <li>After generation, hydrogen may contain impurities (CO, CO₂, CH₄, H₂O) and is purified using pressure-swing adsorption (PSA), membranes, cryogenic distillation, or chemical scrubbers to meet required purity (e.g., fuel cell grade >99.99%).</li>
        <li>Storage options: compressed gas (200–700 bar), liquid hydrogen (cryogenic, −253 °C), and chemical carriers (metal hydrides, ammonia, liquid organic hydrogen carriers — LOHCs). Each method trades energy density, cost, and complexity.</li>
      </ul>
    </section>

    <section id="uses" class="note">
      <h2>7. Uses — Full detail, point-wise (how & why)</h2>

      <ol>
        <li><strong>Ammonia synthesis (Haber–Bosch process)</strong>
          <p><em>How:</em> Hydrogen reacts with nitrogen under high pressure (~100–300 bar), high temperature (~400–550 °C) and in the presence of an iron catalyst:</p>
          <div class="eq"><code>N₂ + 3 H₂ ⇌ 2 NH₃</code></div>
          <p><em>Why:</em> Ammonia is a feedstock for fertilizers (urea, ammonium nitrate) and is central to global agriculture. Hydrogen quality and pressure control are critical for catalyst lifetime and yield.</p>
        </li>

        <li><strong>Fuel cells (electricity from hydrogen)</strong>
          <p><em>How:</em> In a proton-exchange membrane (PEM) fuel cell, hydrogen at the anode is split into protons and electrons. Protons pass through the membrane, electrons travel through an external circuit producing electrical work, and at the cathode oxygen reduces to form water:</p>
          <div class="eq">
            <code>Anode: H₂ → 2 H⁺ + 2 e⁻</code><br>
            <code>Cathode: ½ O₂ + 2 H⁺ + 2 e⁻ → H₂O</code><br>
            <code>Overall: H₂ + ½ O₂ → H₂O + electrical energy + heat</code>
          </div>
          <p><em>Why:</em> Fuel cells are efficient, produce zero tailpipe emissions (only water) and are used in transport (cars, buses), stationary power, and backup systems. Challenges include hydrogen supply, cost of catalysts (Pt), and system durability.</p>
        </li>

        <li><strong>Hydrogenation of fats & oils</strong>
          <p><em>How:</em> Unsaturated C=C bonds in vegetable oils are hydrogenated over nickel catalysts at elevated temperature and hydrogen pressure to increase saturation (solidify oils):</p>
          <div class="eq"><code>C=C + H₂ → C–C</code></div>
          <p><em>Why:</em> Produces margarine/vanaspati and improves stability of oils. Process control affects trans-fats formation; modern processes minimize trans isomers.</p>
        </li>

        <li><strong>Petroleum refining</strong>
          <p><em>How:</em> Hydrogen is used for hydrocracking and hydrotreating to remove sulfur and break heavy molecules into lighter fractions. Reactions occur over catalysts under high pressure.</p>
          <p><em>Why:</em> Produces cleaner fuels (low sulfur diesel/petrol), valuable light products, and reduces harmful emissions when fuels are combusted.</p>
        </li>

        <li><strong>Rocket propulsion</strong>
          <p><em>How:</em> Liquid hydrogen (LH₂) combined with liquid oxygen (LOX) gives very high specific impulse. Combustion yields only water vapor:</p>
          <div class="eq"><code>2 H₂ (l) + O₂ (l) → 2 H₂O (g)</code></div>
          <p><em>Why:</em> High energy-to-mass ratio makes LH₂/LOX ideal for upper-stage rocket engines.</p>
        </li>

        <li><strong>Metallurgy & materials processing</strong>
          <p><em>How:</em> Hydrogen reduces metal oxides (e.g., tungsten oxide to tungsten) and acts as a protective atmosphere during annealing to prevent oxidation.</p>
          <p><em>Why:</em> Produces high-purity metals and controls surface chemistries in manufacturing.</p>
        </li>

        <li><strong>Chemicals & synthesis</strong>
          <p><em>How:</em> Production of methanol (CO + 2 H₂ → CH₃OH), hydrogen peroxide via specialized routes, and many hydrogenation steps in pharmaceutical synthesis.</p>
          <p><em>Why:</em> Fundamental feedstock for chemical industry; hydrogen enables large-scale manufacture of fuels, plastics and pharmaceuticals.</p>
        </li>

        <li><strong>Cryogenics & cooling</strong>
          <p>Liquid hydrogen is an excellent cryogen for achieving very low temperatures required in superconducting magnets and cryogenic research.</p>
        </li>

        <li><strong>Emerging & niche uses</strong>
          <p>Hydrogen as energy storage (power-to-gas), hydrogen carriers (ammonia, LOHCs), feedstock for steelmaking to decarbonize iron production, and as a fuel for zero-emission shipping and aviation where direct battery electrification is impractical.</p>
        </li>
      </ol>
    </section>

    <section id="safety" class="note">
      <h2>8. Safety, Handling & Environmental Aspects</h2>
      <ul>
        <li><strong>Flammability:</strong> H₂ forms explosive mixtures with air in the range ~4–75% by volume. It ignites easily; energy required for ignition is low. Proper ventilation and leak detection are essential.</li>
        <li><strong>Leak detection:</strong> Hydrogen is colorless and odorless — use sensors (electrochemical, catalytic bead, or thermal conductivity) to detect leaks; avoid enclosed spaces.</li>
        <li><strong>Embrittlement:</strong> Hydrogen can diffuse into metals and cause embrittlement over time, affecting pressure vessels and pipes. Materials selection and coatings are important.</li>
        <li><strong>Storage risks:</strong> Compressed gas hazards (pressure), cryogenic hazards (cold burns and material brittleness for LH₂), and risks associated with chemical carriers (toxicity for some carriers).</li>
        <li><strong>Environmental:</strong> When produced from fossil fuels without capture, hydrogen production emits CO₂. Green hydrogen (from renewables) minimizes emissions. Life-cycle assessment is necessary to compare pathways.</li>
      </ul>
    </section>

    <section id="hydrogen-economy" class="note">
      <h2>9. Hydrogen Economy & Future</h2>
      <p>The "hydrogen economy" envisions hydrogen as an energy carrier that stores renewable electricity, decarbonizes hard-to-abate sectors (steel, chemicals, heavy transport), and provides seasonal energy storage. Key enablers: low-cost renewable electricity, efficient electrolyzers, hydrogen infrastructure (pipelines, refuelling stations), and policies to internalize carbon costs. Color codes used in industry:</p>
      <ul>
        <li><strong>Grey hydrogen:</strong> produced from fossil fuels without CO₂ capture (conventional SMR).</li>
        <li><strong>Blue hydrogen:</strong> fossil-based production with CO₂ capture and storage (CCS).</li>
        <li><strong>Green hydrogen:</strong> produced by electrolysis using renewable electricity (zero direct CO₂ emissions).</li>
        <li><strong>Turquoise hydrogen:</strong> produced via methane pyrolysis producing solid carbon + H₂ (emerging tech).</li>
      </ul>
      <p>Challenges include reducing production cost, building transport & storage infrastructure, ensuring safety at scale, and integrating hydrogen into energy systems efficiently.</p>
    </section>

    <section id="closing" class="note">
      <h2>10. Closing Summary</h2>
      <p>Hydrogen is a cornerstone chemical and energy carrier. For Class 9–12 students, understanding hydrogen includes its fundamental atomic properties, isotopes, typical reactions (combustion, reduction, hydride formation), common laboratory generation methods, and the major industrial processes (SMR, electrolysis, gasification). At a higher level, hydrogen's role in the energy transition, hydrogen fuel cells, and storage technologies are important modern topics. Remember to focus on reaction equations, safety practices, and the environmental trade-offs of different production routes.</p>
    </section>
  `,
      svg: `<svg viewBox="0 0 420 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title-advanced-fuelcell">
    <title id="title-advanced-fuelcell">Animated Hydrogen Fuel Cell and Process Diagram</title>
    <defs>
     
      <linearGradient id="gradH" x1="0" x2="1">
        <stop offset="0" stop-color="#60a5fa"/>
        <stop offset="1" stop-color="#3b82f6"/>
      </linearGradient>
      <linearGradient id="gradO" x1="0" x2="1">
        <stop offset="0" stop-color="#86efac"/>
        <stop offset="1" stop-color="#34d399"/>
      </linearGradient>
    </defs>

    <!-- background -->
    <rect width="420" height="220" rx="10" fill="url(#bg)"/>

    <!-- left: hydrogen inlet -->
    <g transform="translate(10,30)" aria-label="Hydrogen inlet">
      <rect x="0" y="0" width="110" height="80" rx="8" fill="#eaf4ff" stroke="#cfe8ff"/>
      <text x="12" y="18" font-size="12" fill="#0b4a8b">H₂ Supply</text>
      <!-- animated H2 molecules moving right -->
      <g id="h-molecules" fill="url(#gradH)">
        <circle cx="20" cy="55" r="6">
          <animate attributeName="cx" values="20;100" dur="2.4s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;1;1;0" dur="2.4s" repeatCount="indefinite"/>
        </circle>
        <circle cx="10" cy="30" r="4">
          <animate attributeName="cx" values="10;100" dur="3.0s" repeatCount="indefinite" begin="0.5s"/>
          <animate attributeName="opacity" values="0;1;1;0" dur="3.0s" repeatCount="indefinite" begin="0.5s"/>
        </circle>
      </g>
      <text x="12" y="74" font-size="10" fill="#4b5563">Compressed or reformer gas</text>
    </g>

    <!-- right: oxygen inlet -->
    <g transform="translate(300,30)" aria-label="Oxygen inlet">
      <rect x="0" y="0" width="110" height="80" rx="8" fill="#f2fff4" stroke="#d0f6df"/>
      <text x="12" y="18" font-size="12" fill="#0b5a2b">O₂ Supply</text>
      <!-- animated O2 molecules moving left -->
      <g id="o-molecules" fill="url(#gradO)">
        <circle cx="90" cy="25" r="6">
          <animate attributeName="cx" values="90;10" dur="2.4s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;1;1;0" dur="2.4s" repeatCount="indefinite"/>
        </circle>
        <circle cx="100" cy="55" r="4">
          <animate attributeName="cx" values="100;10" dur="3.0s" repeatCount="indefinite" begin="0.5s"/>
          <animate attributeName="opacity" values="0;1;1;0" dur="3.0s" repeatCount="indefinite" begin="0.5s"/>
        </circle>
      </g>
      <text x="12" y="74" font-size="10" fill="#4b5563">Air or pure oxygen</text>
    </g>

    <!-- center: fuel cell stack -->
    <g transform="translate(120,20)" aria-label="Fuel cell stack">
      <!-- stack casing -->
      <rect x="0" y="0" width="180" height="140" rx="12" fill="#ffffff" stroke="#dceefe"/>
      <text x="18" y="16" font-size="13" fill="#0b4a8b">PEM Fuel Cell</text>

      <!-- anode side (left) -->
      <g transform="translate(12,30)">
        <rect x="0" y="0" width="60" height="80" rx="6" fill="#f0f8ff" stroke="#c9e6ff"/>
        <text x="6" y="16" font-size="10" fill="#0b4a8b">Anode</text>
        <text x="6" y="30" font-size="9" fill="#2563eb">H₂ → 2H⁺ + 2e⁻</text>
        <!-- animated electrons moving out as current -->
        <circle cx="22" cy="62" r="4" fill="#0b69d6">
          <animate attributeName="cx" values="22;90" dur="1.5s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;1;0" dur="1.5s" repeatCount="indefinite"/>
        </circle>
      </g>

      <!-- cathode side (right) -->
      <g transform="translate(108,30)">
        <rect x="0" y="0" width="60" height="80" rx="6" fill="#f6fff7" stroke="#d0f6df"/>
        <text x="6" y="16" font-size="10" fill="#0b5a2b">Cathode</text>
        <text x="6" y="30" font-size="9" fill="#059669">½ O₂ + 2H⁺ + 2e⁻ → H₂O</text>
        <!-- water droplet animation -->
        <ellipse cx="28" cy="62" rx="6" ry="4" fill="#60a5fa" opacity="0.9">
          <animate attributeName="cy" values="62;72;62" dur="2.0s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2.0s" repeatCount="indefinite"/>
        </ellipse>
      </g>

      <!-- membrane and proton path -->
      <g transform="translate(80,40)">
        <rect x="0" y="0" width="22" height="70" rx="4" fill="#fff1f0" stroke="#ffedd5"/>
        <text x="-28" y="36" font-size="9" fill="#ff6b6b" transform="rotate(-90)">Proton exchange membrane</text>

        <!-- animated proton dots moving right through membrane -->
        <g>
          <circle cx="6" cy="18" r="3" fill="#fb7185">
            <animate attributeName="cx" values="6;16" dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="cy" values="18;50;18" dur="1.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="6" cy="36" r="2.5" fill="#fb7185">
            <animate attributeName="cx" values="6;16" dur="1.4s" repeatCount="indefinite" begin="0.4s"/>
            <animate attributeName="cy" values="36;58;36" dur="1.9s" repeatCount="indefinite" begin="0.4s"/>
          </circle>
        </g>
      </g>

      <!-- electrical output -->
      <g transform="translate(60,110)">
        <rect x="0" y="0" width="60" height="24" rx="6" fill="#fff" stroke="#cfe8ff"/>
        <text x="8" y="16" font-size="11" fill="#0b4a8b">Electricity →</text>
        <path  d="M58 12 L90 12" stroke="#0b4a8b" stroke-width="2" stroke-linecap="round">
          <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1s" repeatCount="indefinite"/>
        </path>
      </g>

      <!-- labels for flows -->
      <text x="-20" y="125" font-size="10" fill="#475569">H₂ flows from left →</text>
      <text x="150" y="125" font-size="10" fill="#475569">→ O₂ flows from right</text>

    </g>

    <!-- footer: water exit -->
    <g transform="translate(150,170)">
      <text x="0" y="12" font-size="11" fill="#0b4a8b">Water (H₂O) produced & heat released</text>
      <circle cx="20" cy="36" r="5" fill="#60a5fa">
        <animate attributeName="cy" values="36;46;36" dur="1.6s" repeatCount="indefinite"/>
      </circle>
      <circle cx="40" cy="42" r="4" fill="#60a5fa">
        <animate attributeName="cy" values="42;52;42" dur="1.8s" repeatCount="indefinite" begin="0.4s"/>
      </circle>
    </g>
  </svg>`,
      row: 1,
      col: 1,
    },

    {
      name: "Helium",
      symbol: "He",
      atomicNumber: 2,
      atomicMass: "4.0026",
      group: 18,
      period: 1,
      block: "s-block",
      electronic: "1s²",
      type: "noble-gas",
      specific: "noble-gas",
      physical: "Gas",
      description: `
      <section>
        <h2>1. Introduction</h2>
        <p><strong>Symbol:</strong> He | <strong>Atomic number:</strong> 2 | <strong>Electronic configuration:</strong> 1s²</p>
        <p>Helium is the second simplest and second lightest element after hydrogen. Discovered spectroscopically in the solar spectrum in 1868 and isolated on Earth later, helium is a colorless, odorless, non-toxic, and chemically inert noble gas. Its closed-shell electronic configuration (1s²) makes it exceptionally stable and nearly non-reactive under ordinary conditions.</p>
      </section>

      <section>
        <h2>2. Occurrence & Isotopes</h2>
        <p>Helium is very abundant in the universe (primarily produced by stellar nucleosynthesis) but relatively rare in Earth's atmosphere (~5 ppm). Commercial helium is mainly recovered from natural gas deposits where it accumulates as a result of radioactive decay of heavy elements. Two stable isotopes exist: ⁴He (by far the most abundant) and trace ³He; ³He is valuable for low-temperature physics and some fusion research applications.</p>
      </section>

      <section>
        <h2>3. Physical & Chemical Properties</h2>
        <ul>
          <li>Monoatomic gas under standard conditions (unlike diatomic H₂, N₂, O₂).</li>
          <li>Lowest boiling point of any element (4.2 K for ⁴He at 1 atm), enabling superfluidity of liquid helium below 2.17 K (lambda point).</li>
          <li>Extremely low solubility in liquids and chemically inert—does not form stable compounds under normal conditions.</li>
        </ul>
      </section>

      <section>
        <h2>4. Production & Purification</h2>
        <p>Commercial helium is extracted from natural gas by cryogenic separation and pressure-swing adsorption. Because helium is inert, separation relies on differences in boiling points and adsorption properties. Purity requirements vary by application: party-balloon helium needs lower purity while cryogenic and scientific uses demand ultra-high purity.</p>
      </section>

      <section>
        <h2>5. Uses — How & Why</h2>
        <ol>
          <li><strong>Cryogenics:</strong> Liquid helium is the principal coolant for superconducting magnets (MRI machines, NMR spectrometers) because of its extremely low boiling point and ability to reach temperatures near absolute zero.</li>
          <li><strong>Breathing mixtures:</strong> Helium is used in deep-sea diving mixtures (heliox, trimix) to reduce nitrogen narcosis and breathing resistance; it lowers breathing gas density at depth.</li>
          <li><strong>Leak detection & inert atmosphere:</strong> Helium's small atomic size makes it excellent for leak detection and as an inert shield in sensitive manufacturing (fiber optics, semiconductor fabrication).</li>
          <li><strong>Party balloons & airships:</strong> Because it is lighter than air and non-flammable (unlike hydrogen), helium is used for lifting gases in balloons and blimps where safety matters.</li>
        </ol>
      </section>

      <section>
        <h2>6. Safety & Environmental Aspects</h2>
        <p>Helium is non-toxic and non-flammable, but as an asphyxiant it can displace oxygen in confined spaces. Because it is produced from finite natural gas reservoirs, helium conservation and recycling are important; large-scale leaks of helium represent a permanent loss to the atmosphere.</p>
      </section>

      <section>
        <h2>7. Interesting Facts</h2>
        <p>At very low temperatures, ⁴He becomes a superfluid with zero viscosity and unusual flow properties. ³He is rare and valuable in low-temperature physics and some proposed fusion schemes. Helium's lightness and inertness make it a uniquely useful element in science and industry.</p>
      </section>
    `,
      svg: `<svg viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg' role='img' aria-labelledby='title-he'>
      <title id='title-he'>Helium balloon and cold droplet</title>
      <defs>
        <linearGradient id='g1' x1='0' x2='1'><stop offset='0' stop-color='#a5f3fc'/><stop offset='1' stop-color='#7dd3fc'/></linearGradient>
      </defs>
      <rect width='120' height='120' rx='8' fill='#f8fafc'/>
      <g transform='translate(30,10)'>
        <ellipse cx='30' cy='24' rx='22' ry='28' fill='url(#g1)' opacity='0.95'>
          <animate attributeName='ry' values='26;30;26' dur='3s' repeatCount='indefinite'/>
        </ellipse>
        <line x1='30' y1='52' x2='30' y2='78' stroke='#64748b' stroke-width='1.6'/>
        <circle cx='24' cy='18' r='3' fill='#ffffff' opacity='0.7'/>
      </g>
    </svg>`,
      row: 1,
      col: 18,
    },

    {
      name: "Lithium",
      symbol: "Li",
      atomicNumber: 3,
      atomicMass: "6.94",
      group: 1,
      period: 2,
      block: "s-block",
      electronic: "[He] 2s¹",
      type: "alkali-metal",
      specific: "alkali-metal",
      physical: "Solid",
      description: `
      <section>
        <h2>1. Introduction</h2>
        <p><strong>Symbol:</strong> Li | <strong>Atomic number:</strong> 3 | <strong>Electronic configuration:</strong> [He] 2s¹</p>
        <p>Lithium is the lightest metal and the least dense solid element. Soft and silvery-white, it reacts readily with water and air, so metallic lithium is stored under mineral oil or in sealed environments. Its single valence electron (2s¹) gives it typical alkali-metal chemistry: strong reducing behavior and formation of ionic compounds.</p>
      </section>

      <section>
        <h2>2. Occurrence & Isotopes</h2>
        <p>Lithium is relatively rare in Earth's crust but concentrates in brines and pegmatite minerals (e.g., spodumene). Major isotopes are ⁷Li and ⁶Li; ⁷Li is more abundant. ⁶Li has special nuclear applications (tritium production) while ⁷Li is important in medical and industrial uses.</p>
      </section>

      <section>
        <h2>3. Physical & Chemical Properties</h2>
        <ul>
          <li>Soft metal; can be cut with a knife; low melting point relative to other metals (≈180.5 °C).</li>
          <li>Highly reactive: reacts with oxygen to form Li₂O, with water to form LiOH and H₂.</li>
          <li>Forms organolithium compounds (very useful in organic synthesis) and ionic salts (LiCl, Li₂CO₃).</li>
        </ul>
      </section>

      <section>
        <h2>4. Production & Extraction</h2>
        <p>Commercial lithium is produced from brine pools (evaporation concentrates) and mined minerals. Processing involves conversion to lithium carbonate or lithium hydroxide for battery production. Recycling of lithium from spent batteries is increasingly important to secure supply and reduce environmental impact.</p>
      </section>

      <section>
        <h2>5. Uses — How & Why</h2>
        <ol>
          <li><strong>Rechargeable batteries (Li-ion):</strong> Lithium compounds (LiCoO₂, NMC, LFP chemistries) enable high energy-density rechargeable batteries used in phones, laptops, and electric vehicles. Lithium's light mass and high electrochemical potential make it ideal for energy storage.</li>
          <li><strong>Alloys & high-performance materials:</strong> Lithium alloys reduce weight in aerospace applications and improve material properties when combined with aluminum or magnesium.</li>
          <li><strong>Organic synthesis:</strong> Organolithium reagents (e.g., n-BuLi) are strong bases/nucleophiles used to make carbon–carbon bonds in pharmaceuticals and fine chemicals.</li>
          <li><strong>Medical:</strong> Lithium salts (lithium carbonate) are used as mood stabilizers in the treatment of bipolar disorder; dosing and monitoring require medical oversight.</li>
        </ol>
      </section>

      <section>
        <h2>6. Safety & Environmental Impact</h2>
        <p>Metallic lithium is highly reactive and flammable; safe handling protocols are required. Mining and brine extraction can have environmental and water-use impacts; improving recycling and responsible sourcing is a key industry priority.</p>
      </section>

      <section>
        <h2>7. Interesting Facts</h2>
        <p>Because of its lightweight and electrochemical properties, lithium is central to electrification and portable electronics. Research on solid-state Li batteries and improved recycling aims to make lithium use more sustainable.</p>
      </section>
    `,
      svg: `<svg viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg' role='img' aria-labelledby='title-li'>
      <title id='title-li'>Lithium battery icon</title>
      <rect width='120' height='120' rx='8' fill='#fff7ed'/>
      <g transform='translate(28,14)'>
        <rect x='0' y='0' width='64' height='92' rx='6' fill='#f3e8ff' stroke='#b794f4'/>
        <rect x='22' y='-6' width='20' height='6' rx='2' fill='#4caf50'/>
        <rect x='8' y='10' width='48' height='72' fill='#fde68a' style='transform-origin:bottom;animation:charge 3s linear infinite'/>
      </g>
      <style>@keyframes charge{0%{transform:scaleY(0.05)}100%{transform:scaleY(1)}}</style>
    </svg>`,
      row: 2,
      col: 1,
    },

    {
      name: "Beryllium",
      symbol: "Be",
      atomicNumber: 4,
      atomicMass: "9.0122",
      group: 2,
      period: 2,
      block: "s-block",
      electronic: "[He] 2s²",
      type: "alkaline-earth-metal",
      specific: "alkaline-earth-metal",
      physical: "Solid",
      description: `
      <section>
        <h2>1. Introduction</h2>
        <p><strong>Symbol:</strong> Be | <strong>Atomic number:</strong> 4 | <strong>Electronic configuration:</strong> [He] 2s²</p>
        <p>Beryllium is a hard, steel-gray, lightweight metal with a high stiffness-to-weight ratio. It is rarer than many metals and has important niche applications in aerospace, defense, and high-technology fields. Its small atomic size and strong metallic bonding give it unique mechanical and thermal properties.</p>
      </section>

      <section>
        <h2>2. Occurrence & Production</h2>
        <p>Beryllium occurs primarily in minerals such as beryl (Be₃Al₂Si₆O₁₈) and bertrandite. Commercial production involves mining and chemical processing to produce beryllium metal and alloys. Due to its rarity and toxicity (see safety), production volumes are modest compared to common industrial metals.</p>
      </section>

      <section>
        <h2>3. Properties & Uses</h2>
        <ul>
          <li>High melting point and rigidity; excellent dimensional stability at high temperatures.</li>
          <li>Used in aerospace for lightweight structural components and in missiles, satellites, and precision instruments.</li>
          <li>Transparent to X-rays — used for X-ray windows and radiation detectors.</li>
          <li>Used in specialized alloys (beryllium-copper) which are non-sparking and have good electrical conductivity; useful for tools in explosive atmospheres.</li>
        </ul>
      </section>

      <section>
        <h2>4. Safety</h2>
        <p>Beryllium and many of its compounds are toxic when inhaled (can cause chronic beryllium disease). Industrial hygiene, strict exposure limits, and protective measures are essential when working with beryllium powders or machining parts.</p>
      </section>

      <section>
        <h2>5. Interesting Notes</h2>
        <p>Because of its excellent thermal and mechanical characteristics, beryllium remains critical in specialized engineering applications despite toxicity and cost. Replacement is often difficult due to its unique combination of properties.</p>
      </section>
    `,
      svg: `<svg viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg' role='img' aria-labelledby='title-be'>
      <title id='title-be'>Beryllium rocket icon</title>
      <rect width='120' height='120' rx='8' fill='#f8fafc'/>
      <g transform='translate(30,18)'>
        <path d='M30 0 L46 40 L42 78 L18 78 L14 40 Z' fill='#c5d2d7' stroke='#78909c'/>
        <path d='M18 78 C22 96 38 96 42 78' fill='#ffcc80'>
          <animate attributeName='d' dur='0.4s' values='M18 78 C22 96 38 96 42 78;M18 78 C22 102 38 102 42 78;M18 78 C22 96 38 96 42 78' repeatCount='indefinite'/>
        </path>
      </g>
    </svg>`,
      row: 2,
      col: 2,
    },

    {
      name: "Boron",
      symbol: "B",
      atomicNumber: 5,
      atomicMass: "10.81",
      group: 13,
      period: 2,
      block: "p-block",
      electronic: "[He] 2s² 2p¹",
      type: "metalloid",
      specific: "metalloid",
      physical: "Solid",
      description: `
      <section>
        <h2>1. Introduction</h2>
        <p><strong>Symbol:</strong> B | <strong>Atomic number:</strong> 5 | <strong>Electronic configuration:</strong> [He] 2s² 2p¹</p>
        <p>Boron is a metalloid with properties intermediate between metals and nonmetals. It exists in multiple allotropic forms—from amorphous powders to very hard, crystalline structures. Boron's chemistry is dominated by electron-deficient bonding (boranes) and strong covalent networks in the solid state.</p>
      </section>

      <section>
        <h2>2. Occurrence & Production</h2>
        <p>Boron is found in minerals such as borax (sodium borate) and kernite. It is produced commercially from evaporite deposits and processed to form boric acid, borates, and elemental boron used in industry.</p>
      </section>

      <section>
        <h2>3. Properties & Uses</h2>
        <ul>
          <li>Boron compounds impart heat resistance and strength—used in borosilicate glass (e.g., laboratory glassware).</li>
          <li>Essential micronutrient for plants; boron deficiency affects crop yields.</li>
          <li>Used in high-strength, lightweight materials for aerospace, abrasives, and neutron-absorbing materials (boron carbide) in nuclear applications.</li>
          <li>Boron chemistry includes important reagents for organic synthesis (e.g., hydroboration) and advanced materials like boron nitride and boron-doped semiconductors.</li>
        </ul>
      </section>

      <section>
        <h2>4. Safety & Handling</h2>
        <p>Many boron compounds are of low to moderate toxicity, but inhalation of dusts and concentrated exposures should be avoided. In agriculture, correct dosing as a micronutrient is important—both deficiency and excess can harm plants.</p>
      </section>
    `,
      svg: `<svg viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg' role='img' aria-labelledby='title-b'>
      <title id='title-b'>Boron flask icon</title>
      <rect width='120' height='120' rx='8' fill='#ffffff'/>
      <g transform='translate(20,18)'>
        <path d='M20 72 L20 36 Q20 12 40 12 Q60 12 60 36 L60 72 Z' fill='none' stroke='#607d8b' stroke-width='3'/>
        <path d='M24 72 H56 V52 Q46 46 40 46 Q34 46 24 52 Z' fill='#80cbc4' opacity='0.9'/>
        <circle cx='40' cy='50' r='2' fill='#ffffff'>
          <animate attributeName='r' values='2;6;2' dur='2s' repeatCount='indefinite' />
        </circle>
      </g>
    </svg>`,
      row: 2,
      col: 13,
    },

    {
      name: "Carbon",
      symbol: "C",
      atomicNumber: 6,
      atomicMass: "12.011",
      group: 14,
      period: 2,
      block: "p-block",
      electronic: "[He] 2s² 2p²",
      type: "nonmetal",
      specific: "nonmetal",
      physical: "Solid",
      description: `
      <section>
        <h2>1. Introduction</h2>
        <p><strong>Symbol:</strong> C | <strong>Atomic number:</strong> 6 | <strong>Electronic configuration:</strong> [He] 2s² 2p²</p>
        <p>Carbon is the chemical foundation of organic chemistry and life on Earth. Unique among elements for its ability to form strong covalent bonds with itself and many others, carbon forms an immense variety of compounds (millions known) and allotropes including graphite, diamond, graphene and fullerene structures.</p>
      </section>

      <section>
        <h2>2. Occurrence & Isotopes</h2>
        <p>Carbon cycles through the biosphere, lithosphere, atmosphere and hydrosphere. Stable isotopes ¹²C and ¹³C, and radioactive ¹⁴C (used for radiocarbon dating), have important scientific applications.</p>
      </section>

      <section>
        <h2>3. Properties & Uses</h2>
        <ul>
          <li>Allotropes range from soft, conductive graphite to extremely hard diamond; graphene is a single-atom-thick layer with exceptional strength and electronic properties.</li>
          <li>Carbon is central to fuels (coal, oil, natural gas), materials (polymers, composites), and biological macromolecules (proteins, carbohydrates, nucleic acids).</li>
          <li>Industrial uses: electrodes, lubricants, abrasives, catalysts support materials (activated carbon), and high-performance composites using carbon fibers.</li>
        </ul>
      </section>

      <section>
        <h2>4. Environmental & Energy Considerations</h2>
        <p>Carbon-based fuels release CO₂ when combusted, contributing to climate change. Understanding carbon cycles, reducing emissions, and developing low-carbon technologies (carbon capture, alternative fuels) are major scientific and policy priorities.</p>
      </section>
    `,
      svg: `<svg viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg' role='img' aria-labelledby='title-c'>
      <title id='title-c'>Carbon diamond icon</title>
      <rect width='120' height='120' rx='8' fill='#ffffff'/>
      <g transform='translate(30,16)'>
        <polygon points='30,0 60,30 30,92 0,30' fill='#b2ebf2' stroke='#00acc1'/>
        <line x1='30' y1='0' x2='30' y2='92' stroke='#00acc1' stroke-width='1'/>
        <line x1='30' y1='0' x2='60' y2='30' stroke='#00acc1' stroke-width='1'/>
      </g>
    </svg>`,
      row: 2,
      col: 14,
    },

    {
      name: "Nitrogen",
      symbol: "N",
      atomicNumber: 7,
      atomicMass: "14.007",
      group: 15,
      period: 2,
      block: "p-block",
      electronic: "[He] 2s² 2p³",
      type: "nonmetal",
      specific: "nonmetal",
      physical: "Gas",
      description: `
      <section>
        <h2>1. Introduction</h2>
        <p><strong>Symbol:</strong> N | <strong>Atomic number:</strong> 7 | <strong>Electronic configuration:</strong> [He] 2s² 2p³</p>
        <p>Nitrogen is a major component of Earth's atmosphere and a fundamental element for life. The N≡N triple bond in diatomic nitrogen (N₂) makes it relatively inert, but fixed nitrogen (ammonia, nitrates) is essential for biology.</p>
      </section>

      <section>
        <h2>2. Occurrence & Production</h2>
        <p>Nitrogen makes up about 78% of the atmosphere. Industrially it is produced by fractional distillation of air or by pressure-swing adsorption. The Haber–Bosch process converts N₂ and H₂ into ammonia, enabling large-scale fertilizer production and global agriculture.</p>
      </section>

      <section>
        <h2>3. Uses & Importance</h2>
        <ul>
          <li>Fertilizer production (ammonia) which supports global food production.</li>
          <li>Inert atmosphere for food packaging, semiconductor manufacturing, and metal processing.</li>
          <li>Liquid nitrogen used for cryopreservation, rapid freezing in food industries, and laboratory applications.</li>
        </ul>
      </section>

      <section>
        <h2>4. Safety</h2>
        <p>Although inert, nitrogen can cause asphyxiation in confined spaces by displacing oxygen. Proper ventilation and monitoring are required in industrial settings.</p>
      </section>
    `,
      svg: `<svg viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg' role='img' aria-labelledby='title-n'>
      <title id='title-n'>Nitrogen molecule icon</title>
      <rect width='120' height='120' rx='8' fill='#ffffff'/>
      <g transform='translate(10,20)'>
        <circle cx='30' cy='40' r='18' fill='#90caf9'/>
        <circle cx='78' cy='40' r='18' fill='#90caf9' opacity='0.95'/>
        <line x1='42' y1='40' x2='66' y2='40' stroke='#42a5f5' stroke-width='6'/>
        <line x1='42' y1='34' x2='66' y2='34' stroke='#42a5f5' stroke-width='4'/>
        <line x1='42' y1='46' x2='66' y2='46' stroke='#42a5f5' stroke-width='4'/>
      </g>
    </svg>`,
      row: 2,
      col: 15,
    },

    {
      name: "Oxygen",
      symbol: "O",
      atomicNumber: 8,
      atomicMass: "15.999",
      group: 16,
      period: 2,
      block: "p-block",
      electronic: "[He] 2s² 2p⁴",
      type: "nonmetal",
      specific: "nonmetal",
      physical: "Gas",
      description: `
      <section>
        <h2>1. Introduction</h2>
        <p><strong>Symbol:</strong> O | <strong>Atomic number:</strong> 8 | <strong>Electronic configuration:</strong> [He] 2s² 2p⁴</p>
        <p>Oxygen is essential for aerobic life and a strong oxidizing agent. It supports combustion and participates in many chemical and biological processes. On Earth it is produced by photosynthesis and forms oxides with most elements.</p>
      </section>

      <section>
        <h2>2. Occurrence & Isotopes</h2>
        <p>Oxygen is the third most abundant element in the universe and the most abundant element by mass in Earth's crust. Stable isotopes include ¹⁶O, ¹⁷O and ¹⁸O; these isotopes are used in paleoclimate studies and tracer experiments.</p>
      </section>

      <section>
        <h2>3. Properties & Uses</h2>
        <ul>
          <li>Supports combustion—used in industry for steelmaking, welding and as an oxidizer in rocket propellants.</li>
          <li>Medical oxygen supports life in hospitals and emergency medicine.</li>
          <li>Oxygen-enriched air improves combustion efficiency and is used in waste-water treatment and chemical production.</li>
        </ul>
      </section>

      <section>
        <h2>4. Safety & Handling</h2>
        <p>While non-toxic, enriched oxygen increases flammability of materials and requires strict control of spark sources and oils near oxygen handling equipment. Cryogenic oxygen (liquid O₂) requires special materials and insulation.</p>
      </section>
    `,
      svg: `<svg viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg' role='img' aria-labelledby='title-o'>
      <title id='title-o'>Oxygen molecule icon</title>
      <rect width='120' height='120' rx='8' fill='#ffffff'/>
      <g transform='translate(10,20)'>
        <circle cx='30' cy='40' r='18' fill='#ef9a9a'/>
        <circle cx='78' cy='40' r='18' fill='#ef9a9a'/>
        <line x1='48' y1='40' x2='60' y2='40' stroke='#d32f2f' stroke-width='4'/>
      </g>
    </svg>`,
      row: 2,
      col: 16,
    },

    {
      name: "Fluorine",
      symbol: "F",
      atomicNumber: 9,
      atomicMass: "18.998",
      group: 17,
      period: 2,
      block: "p-block",
      electronic: "[He] 2s² 2p⁵",
      type: "nonmetal",
      specific: "nonmetal",
      physical: "Gas",
      description: `
      <section>
        <h2>1. Introduction</h2>
        <p><strong>Symbol:</strong> F | <strong>Atomic number:</strong> 9 | <strong>Electronic configuration:</strong> [He] 2s² 2p⁵</p>
        <p>Fluorine is the most electronegative element and the most reactive of the halogens. As a pale yellow gas at room temperature, it reacts violently with many elements and organic compounds. Because of this reactivity, elemental fluorine is produced and handled only under strict industrial conditions.</p>
      </section>

      <section>
        <h2>2. Occurrence & Isotopes</h2>
        <p>Fluorine is not found free in nature because of its reactivity; it is commonly found as fluoride in minerals such as fluorite (CaF₂). The stable isotope ¹⁹F is the only naturally occurring isotope of fluorine.</p>
      </section>

      <section>
        <h2>3. Uses & Importance</h2>
        <ul>
          <li>Production of organofluorine compounds such as Teflon (PTFE) and refrigerants.</li>
          <li>Fluoride is used for dental health (toothpaste, controlled water fluoridation) to reduce tooth decay.</li>
          <li>Fluorine chemistry is crucial in pharmaceuticals, agrochemicals, and specialized industrial processes (e.g., uranium hexafluoride for nuclear fuel processing).</li>
        </ul>
      </section>

      <section>
        <h2>4. Safety</h2>
        <p>Elemental fluorine and many fluorine compounds are highly toxic and corrosive. Handling requires special materials, dry conditions, and rigorous safety protocols. Environmental and health impacts of some fluorinated compounds (e.g., certain PFAS) are under active study and regulation.</p>
      </section>
    `,
      svg: `<svg viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg' role='img' aria-labelledby='title-f'>
      <title id='title-f'>Fluorine toothpaste / tooth icon</title>
      <rect width='120' height='120' rx='8' fill='#ffffff'/>
      <g transform='translate(18,18)'>
        <path d='M12 70 C12 40 88 40 88 70 L74 70 C74 50 26 50 26 70 Z' fill='#ffffff' stroke='#bdbdbd' stroke-width='2'/>
        <path d='M30 30 Q50 18 70 30' stroke='#ffeb3b' stroke-width='3' fill='none'>
          <animate attributeName='stroke-dashoffset' values='0;12;0' dur='2s' repeatCount='indefinite'/>
        </path>
      </g>
    </svg>`,
      row: 2,
      col: 17,
    },
    {
      name: "Neon",
      symbol: "Ne",
      atomicNumber: 10,
      atomicMass: "20.180",
      group: 18,
      period: 2,
      block: "p-block",
      electronic: "[He] 2s² 2p⁶",
      type: "noble-gas",
      specific: "noble-gas",
      physical: "Gas",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Ne | <strong>Atomic number:</strong> 10 | <strong>Electronic configuration:</strong> [He] 2s² 2p⁶</p><p>Discovered in 1898, Neon is a noble gas known for being colorless, odorless, and largely inert. It is famous for its brilliant reddish-orange glow in vacuum tubes.</p></section><section><h2>2. Uses & Importance</h2><p>Its primary use is in iconic 'neon' signs. It is also used in some lasers (Helium-Neon lasers), television tubes, and as a cryogenic refrigerant in certain specialized applications.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.sign-text{font-family:cursive;font-size:30px;fill:#FF5722;stroke:#E64A19;stroke-width:1;animation:glow 1.5s infinite alternate}@keyframes glow{from{text-shadow:0 0 5px #fff,0 0 10px #fff,0 0 15px #FF5722}to{text-shadow:0 0 10px #fff,0 0 20px #FF5722,0 0 30px #FF5722}}</style><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' class='sign-text'>Neon</text></svg>",
      row: 2,
      col: 18,
    },
    {
      name: "Sodium",
      symbol: "Na",
      atomicNumber: 11,
      atomicMass: "22.990",
      group: 1,
      period: 3,
      block: "s-block",
      electronic: "[Ne] 3s¹",
      type: "alkali-metal",
      specific: "alkali-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Na | <strong>Atomic number:</strong> 11 | <strong>Electronic configuration:</strong> [Ne] 3s¹</p><p>First isolated in 1807, Sodium is a soft, silvery-white, highly reactive alkali metal. Its symbol, Na, comes from the Latin 'natrium'. It is essential for animal life, playing a key role in nerve function.</p></section><section><h2>2. Uses & Importance</h2><p>Its most common compound is sodium chloride (<code>NaCl</code>), or table salt. Sodium is also used in streetlights (sodium-vapor lamps), as a heat transfer agent in some nuclear reactors, and in the manufacturing of soaps and detergents.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.salt-shaker{fill:#ECEFF1;stroke:#78909C;stroke-width:2}.cap{fill:#90A4AE}.hole{fill:#546E7A}.salt{fill:#455A64;opacity:0;animation:shake 1s infinite}@keyframes shake{0%{transform:translate(0,0);opacity:0}20%{transform:translate(2px,-10px);opacity:1}40%{transform:translate(-2px,-20px);opacity:1}60%{transform:translate(2px,-30px);opacity:1}100%{transform:translate(0,-50px);opacity:0}}</style><path class='salt-shaker' d='M30,90 L30,40 Q30,20 50,20 Q70,20 70,40 L70,90 Z'/><rect class='cap' x='30' y='20' width='40' height='10'/><circle class='hole' cx='40' cy='25' r='2'/><circle class='hole' cx='50' cy='25' r='2'/><circle class='hole' cx='60' cy='25' r='2'/><circle class='salt' cx='45' cy='20' r='1.5' style='animation-delay:-.2s'/><circle class='salt' cx='50' cy='20' r='1.5'/><circle class='salt' cx='55' cy='20' r='1.5' style='animation-delay:-.4s'/></svg>",
      row: 3,
      col: 1,
    },
    {
      name: "Magnesium",
      symbol: "Mg",
      atomicNumber: 12,
      atomicMass: "24.305",
      group: 2,
      period: 3,
      block: "s-block",
      electronic: "[Ne] 3s²",
      type: "alkaline-earth-metal",
      specific: "alkaline-earth-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Mg | <strong>Atomic number:</strong> 12 | <strong>Electronic configuration:</strong> [Ne] 3s²</p><p>Recognized as an element in 1755, Magnesium is a shiny gray solid and the eighth-most-abundant element in the Earth's crust. The metal is strong but lightweight.</p></section><section><h2>2. Uses & Importance</h2><p>Its low density makes it highly valuable for creating strong, light alloys used in cars, planes, and electronics. It burns with a famously bright white light, making it useful in fireworks, flares, and sparklers. In biology, magnesium is an essential mineral for all living cells.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.spark{fill:#fff;position:absolute;animation:explode 0.7s ease-out infinite;transform-origin:center}@keyframes explode{from{transform:scale(0);opacity:1}to{transform:scale(1.5);opacity:0}}</style><circle class='spark' cx='50' cy='50' r='5' style='animation-delay:-.1s'/><circle class='spark' cx='50' cy='50' r='5' style='animation-delay:-.2s'/><circle class='spark' cx='50' cy='50' r='5' style='animation-delay:-.3s'/><circle class='spark' cx='50' cy='50' r='5' style='animation-delay:-.4s'/><circle class='spark' cx='50' cy='50' r='5' style='animation-delay:-.5s'/></svg>",
      row: 3,
      col: 2,
    },
    {
      name: "Aluminium",
      symbol: "Al",
      atomicNumber: 13,
      atomicMass: "26.982",
      group: 13,
      period: 3,
      block: "p-block",
      electronic: "[Ne] 3s² 3p¹",
      type: "post-transition-metal",
      specific: "post-transition-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Al | <strong>Atomic number:</strong> 13 | <strong>Electronic configuration:</strong> [Ne] 3s² 3p¹</p><p>First produced in 1825, Aluminium is a silvery-white, lightweight post-transition metal. It is the most abundant metal in the Earth's crust and resists corrosion due to a passive oxide layer.</p></section><section><h2>2. Uses & Importance</h2><p>Its properties make it essential in transportation (aircraft, cars), packaging (cans, foil), and construction (window frames). It is an excellent conductor of electricity and is often used in power lines.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.can-body{fill:#B0BEC5;stroke:#607D8B;stroke-width:1.5}.can-top{fill:#78909C}.tab{fill:#546E7A;animation:pull-tab 2s ease-in-out infinite alternate}@keyframes pull-tab{from{transform:rotate(0deg)}to{transform:rotate(-45deg)}}</style><rect class='can-body' x='30' y='20' width='40' height='70' rx='5'/><ellipse class='can-top' cx='50' cy='20' rx='20' ry='5'/><g class='tab' style='transform-origin:50px 20px;'><rect x='45' y='12' width='10' height='16' rx='3'/><circle cx='50' cy='20' r='3'/></g></svg>",
      row: 3,
      col: 13,
    },
    {
      name: "Silicon",
      symbol: "Si",
      atomicNumber: 14,
      atomicMass: "28.085",
      group: 14,
      period: 3,
      block: "p-block",
      electronic: "[Ne] 3s² 3p²",
      type: "metalloid",
      specific: "metalloid",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Si | <strong>Atomic number:</strong> 14 | <strong>Electronic configuration:</strong> [Ne] 3s² 3p²</p><p>Isolated in 1824, Silicon is a hard, brittle crystalline metalloid with a blue-grey metallic lustre. It is the second most abundant element in the Earth's crust.</p></section><section><h2>2. Uses & Importance</h2><p>The modern world is built on silicon. As a semiconductor, it is the fundamental component of computer chips, transistors, and solar cells. It is also the basis of silicones, and its oxide (silica) is the primary constituent of glass, cement, and ceramics.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.chip{fill:#424242;stroke:#757575;stroke-width:1}.path{stroke:#FFC107;stroke-width:2;stroke-dasharray:100;animation:pulse-path 2s linear infinite}@keyframes pulse-path{from{stroke-dashoffset:100}to{stroke-dashoffset:0}}</style><rect class='chip' x='10' y='10' width='80' height='80' rx='5'/><path class='path' d='M20 20 L 20 80 L 80 80 L 80 50 L 50 50 L 50 20 Z'/><path class='path' d='M30 30 L 70 30 L 70 70 L 30 70 Z' style='animation-direction:reverse;animation-delay:-1s'/></svg>",
      row: 3,
      col: 14,
    },
    {
      name: "Phosphorus",
      symbol: "P",
      atomicNumber: 15,
      atomicMass: "30.974",
      group: 15,
      period: 3,
      block: "p-block",
      electronic: "[Ne] 3s² 3p³",
      type: "nonmetal",
      specific: "nonmetal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> P | <strong>Atomic number:</strong> 15 | <strong>Electronic configuration:</strong> [Ne] 3s² 3p³</p><p>Discovered in 1669, Phosphorus is a highly reactive nonmetal. It exists in several forms, including white phosphorus (waxy, poisonous, glows in the dark) and red phosphorus (less reactive, used on matchboxes).</p></section><section><h2>2. Uses & Importance</h2><p>Phosphorus is essential for life, forming the backbone of DNA and RNA. Its primary commercial use is in phosphate fertilizers. It is also used in safety matches, pyrotechnics, and certain steel alloys.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.match-stick{fill:#A1887F}.match-head{fill:#C62828;animation:strike 2s ease-out infinite}@keyframes strike{0%{opacity:1}50%{opacity:1;transform:translate(0,-5px) scale(1.5)}100%{opacity:0}}</style><rect class='match-stick' x='48' y='20' width='4' height='70'/><circle class='match-head' cx='50' cy='20' r='10'/></svg>",
      row: 3,
      col: 15,
    },
    {
      name: "Sulfur",
      symbol: "S",
      atomicNumber: 16,
      atomicMass: "32.06",
      group: 16,
      period: 3,
      block: "p-block",
      electronic: "[Ne] 3s² 3p⁴",
      type: "nonmetal",
      specific: "nonmetal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> S | <strong>Atomic number:</strong> 16 | <strong>Electronic configuration:</strong> [Ne] 3s² 3p⁴</p><p>Sulfur, known in ancient times, is a bright yellow, brittle nonmetal. It is infamous for the smell of its compounds, like hydrogen sulfide (rotten eggs).</p></section><section><h2>2. Uses & Importance</h2><p>The vast majority of sulfur is used to make sulfuric acid (<code>H₂SO₄</code>), a key industrial chemical used in fertilizers and pigments. Sulfur is also used in the vulcanization of rubber and as a fungicide in agriculture.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.volcano{fill:#795548}.lava{fill:#FFEB3B;animation:erupt 4s ease-out infinite}.smoke{fill:#BDBDBD;opacity:0.7;animation:rise 4s infinite}@keyframes erupt{0%{transform:translateY(0)}50%{transform:translateY(-20px)}100%{transform:translateY(0)}}@keyframes rise{from{transform:translateY(0) scale(1);opacity:0.7}to{transform:translateY(-40px) scale(1.5);opacity:0}}</style><path class='volcano' d='M10,90 L40,30 H60 L90,90 Z'/><path class='lava' d='M40,30 H60 V40 H40 Z'/><circle class='smoke' cx='50' cy='25' r='10' style='animation-delay:0s'/><circle class='smoke' cx='45' cy='20' r='8' style='animation-delay:-1s'/><circle class='smoke' cx='55' cy='18' r='9' style='animation-delay:-2s'/></svg>",
      row: 3,
      col: 16,
    },
    {
      name: "Chlorine",
      symbol: "Cl",
      atomicNumber: 17,
      atomicMass: "35.45",
      group: 17,
      period: 3,
      block: "p-block",
      electronic: "[Ne] 3s² 3p⁵",
      type: "nonmetal",
      specific: "nonmetal",
      physical: "Gas",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Cl | <strong>Atomic number:</strong> 17 | <strong>Electronic configuration:</strong> [Ne] 3s² 3p⁵</p><p>Discovered in 1774, Chlorine is a yellow-green gas at room temperature. It is a halogen and a powerful oxidizing agent with a sharp, choking smell.</p></section><section><h2>2. Uses & Importance</h2><p>Its most widespread use is for disinfecting drinking water and swimming pools. It is a key ingredient in bleach (sodium hypochlorite) and is used to manufacture PVC plastic, solvents, and pharmaceuticals.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.drop{fill:#81D4FA;animation:drip 2s ease-in infinite;transform-origin:50px 10px}.germ{fill:#8BC34A;stroke:#33691E;stroke-width:2;animation:fade-out 2s infinite}@keyframes drip{0%{transform:scale(0)}50%{transform:scale(1)}100%{opacity:0}}@keyframes fade-out{50%{opacity:1}100%{opacity:0;transform:scale(0.5)}}</style><path class='drop' d='M50,10 C40,30 40,50 50,50 C60,50 60,30 50,10 Z'/><path class='germ' d='M50,70 m -10,0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0'/></svg>",
      row: 3,
      col: 17,
    },
    {
      name: "Argon",
      symbol: "Ar",
      atomicNumber: 18,
      atomicMass: "39.948",
      group: 18,
      period: 3,
      block: "p-block",
      electronic: "[Ne] 3s² 3p⁶",
      type: "noble-gas",
      specific: "noble-gas",
      physical: "Gas",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Ar | <strong>Atomic number:</strong> 18 | <strong>Electronic configuration:</strong> [Ne] 3s² 3p⁶</p><p>Discovered in 1894, Argon is the third most abundant gas in Earth's atmosphere (~0.94%). As a noble gas, it is colorless, odorless, and extremely unreactive.</p></section><section><h2>2. Uses & Importance</h2><p>Its inertness is valuable. Argon is used in welding to provide an unreactive atmosphere, to fill incandescent light bulbs to protect the filament, and as the gas in certain types of lasers.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.bulb-glass{fill:rgba(224,242,241,0.3);stroke:#4DB6AC;stroke-width:2}.filament{stroke:#FFB74D;stroke-width:3;animation:light-up 2s infinite alternate}@keyframes light-up{from{opacity:0.3}to{opacity:1;filter:drop-shadow(0 0 5px #FFE082)}}</style><path class='bulb-glass' d='M50,10 C30,10 30,40 50,60 C70,40 70,10 50,10 Z M40,60 H60 V90 H40 Z'/><path class='filament' d='M45,50 C48,45 52,45 55,50'/></svg>",
      row: 3,
      col: 18,
    },
    {
      name: "Potassium",
      symbol: "K",
      atomicNumber: 19,
      atomicMass: "39.098",
      group: 1,
      period: 4,
      block: "s-block",
      electronic: "[Ar] 4s¹",
      type: "alkali-metal",
      specific: "alkali-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> K | <strong>Atomic number:</strong> 19 | <strong>Electronic configuration:</strong> [Ar] 4s¹</p><p>First isolated in 1807, Potassium is a silvery-white alkali metal, soft enough to be cut with a knife. Its symbol, K, comes from the neo-Latin 'kalium'. It reacts violently with water.</p></section><section><h2>2. Uses & Importance</h2><p>Potassium is an essential nutrient for plants and animals. Most commercial potassium is used in fertilizers. Other uses include manufacturing soaps, glass, and certain explosives like gunpowder.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.banana{fill:#FFEB3B;animation:peel 3s ease-in-out infinite alternate}.peel1{transform-origin:35px 80px}.peel2{transform-origin:65px 80px}@keyframes peel{to{transform:rotate(-45deg)}}</style><path class='banana' d='M30,80 C10,70 20,20 50,20 C80,20 90,70 70,80 Z'/><path class='banana peel1' d='M30,80 C10,70 20,20 50,20 V80 Z'/><path class='banana peel2' d='M70,80 C90,70 80,20 50,20 V80 Z' style='animation-direction:alternate-reverse'/></svg>",
      row: 4,
      col: 1,
    },
    {
      name: "Calcium",
      symbol: "Ca",
      atomicNumber: 20,
      atomicMass: "40.078",
      group: 2,
      period: 4,
      block: "s-block",
      electronic: "[Ar] 4s²",
      type: "alkaline-earth-metal",
      specific: "alkaline-earth-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Ca | <strong>Atomic number:</strong> 20 | <strong>Electronic configuration:</strong> [Ar] 4s²</p><p>Isolated in 1808, Calcium is a soft, gray alkaline earth metal. It is the fifth most abundant element in the Earth's crust and is essential for living organisms.</p></section><section><h2>2. Uses & Importance</h2><p>Its most well-known role is in building strong bones and teeth. Calcium compounds are widely used. Gypsum (calcium sulfate) is used to make drywall, while limestone (calcium carbonate) is a key ingredient in cement.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.bone{fill:#FFFDE7;stroke:#D7CCC8;stroke-width:2;animation:wiggle 2s ease-in-out infinite}@keyframes wiggle{0%,100%{transform:rotate(0deg)}25%{transform:rotate(-5deg)}75%{transform:rotate(5deg)}}</style><path class='bone' d='M20,30 C10,30 10,50 20,50 L80,50 C90,50 90,30 80,30 Z'/><path class='bone' d='M20,70 C10,70 10,50 20,50 L80,50 C90,50 90,70 80,70 Z'/></svg>",
      row: 4,
      col: 2,
    },
    {
      name: "Scandium",
      symbol: "Sc",
      atomicNumber: 21,
      atomicMass: "44.956",
      group: 3,
      period: 4,
      block: "d-block",
      electronic: "[Ar] 3d¹ 4s²",
      type: "transition-metal",
      specific: "transition-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Sc | <strong>Atomic number:</strong> 21 | <strong>Electronic configuration:</strong> [Ar] 3d¹ 4s²</p><p>Discovered in 1879, Scandium is a silvery-white metallic d-block element. It is relatively soft and has a low density.</p></section><section><h2>2. Uses & Importance</h2><p>Scandium's main application is in strong, lightweight aluminum alloys for the aerospace industry and high-performance sports equipment like bicycle frames and baseball bats. It is also used in high-intensity metal-halide lamps.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.bike-frame{fill:none;stroke:#78909C;stroke-width:4}.wheel{fill:none;stroke:#546E7A;stroke-width:3;animation:spin-wheel 2s linear infinite;transform-origin:center}@keyframes spin-wheel{to{transform:rotate(360deg)}}</style><path class='bike-frame' d='M30,70 L50,40 L70,70 L40,70'/><circle class='wheel' cx='30' cy='70' r='10'/><circle class='wheel' cx='70' cy='70' r='10'/></svg>",
      row: 4,
      col: 3,
    },
    {
      name: "Titanium",
      symbol: "Ti",
      atomicNumber: 22,
      atomicMass: "47.867",
      group: 4,
      period: 4,
      block: "d-block",
      electronic: "[Ar] 3d² 4s²",
      type: "transition-metal",
      specific: "transition-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Ti | <strong>Atomic number:</strong> 22 | <strong>Electronic configuration:</strong> [Ar] 3d² 4s²</p><p>Discovered in 1791, Titanium is a transition metal with a silvery color, low density, and high strength. It is highly resistant to corrosion.</p></section><section><h2>2. Uses & Importance</h2><p>Its strength-to-weight ratio makes it ideal for aerospace applications (jet engines, spacecraft), medical implants (hip joints), and sports cars. Titanium dioxide (<code>TiO₂</code>) is a bright white pigment used in paints and sunscreen.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.bone-screw{fill:#B0BEC5;stroke:#546E7A;stroke-width:2;animation:rotate-screw 4s linear infinite}@keyframes rotate-screw{to{transform:rotate(360deg)}}</style><path class='bone-screw' d='M50,10 L60,20 L55,20 L55,80 L45,80 L45,20 L40,20 Z'/><path class='bone-screw' d='M40,80 C40,90 60,90 60,80'/></svg>",
      row: 4,
      col: 4,
    },
    {
      name: "Vanadium",
      symbol: "V",
      atomicNumber: 23,
      atomicMass: "50.942",
      group: 5,
      period: 4,
      block: "d-block",
      electronic: "[Ar] 3d³ 4s²",
      type: "transition-metal",
      specific: "transition-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> V | <strong>Atomic number:</strong> 23 | <strong>Electronic configuration:</strong> [Ar] 3d³ 4s²</p><p>Discovered in 1801, Vanadium is a hard, silvery-grey, malleable transition metal. It has good resistance to corrosion and is stable against alkalis and many acids.</p></section><section><h2>2. Uses & Importance</h2><p>About 85% of produced vanadium is used to make ferrovanadium, an alloy used to create high-strength steel for tools, axles, and vehicle armor. Vanadium pentoxide (<code>V₂O₅</code>) is a crucial catalyst in producing sulfuric acid.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.girder{fill:#9E9E9E;stroke:#616161;stroke-width:2}.rivet{fill:#424242}</style><rect class='girder' x='10' y='40' width='80' height='20'/><path class='girder' d='M20,40 L30,20 L70,20 L80,40 Z'/><path class='girder' d='M20,60 L30,80 L70,80 L80,60 Z'/><circle class='rivet' cx='15' cy='50' r='3'/><circle class='rivet' cx='85' cy='50' r='3'/></svg>",
      row: 4,
      col: 5,
    },
    {
      name: "Chromium",
      symbol: "Cr",
      atomicNumber: 24,
      atomicMass: "51.996",
      group: 6,
      period: 4,
      block: "d-block",
      electronic: "[Ar] 3d⁵ 4s¹",
      type: "transition-metal",
      specific: "transition-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Cr | <strong>Atomic number:</strong> 24 | <strong>Electronic configuration:</strong> [Ar] 3d⁵ 4s¹</p><p>Discovered in 1797, Chromium is a steel-gray, lustrous, hard, and brittle transition metal, highly valued for its corrosion resistance and hardness.</p></section><section><h2>2. Uses & Importance</h2><p>Its most famous application is chrome plating for a shiny, protective finish on car parts and fixtures. Chromium is the key ingredient that makes stainless steel 'stainless'. It is also used to make hard steel alloys and as a pigment in paints.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.faucet{fill:#CFD8DC;stroke:#78909C;stroke-width:2}.shine{fill:#fff;opacity:0;animation:shine-on 2.5s infinite}@keyframes shine-on{0%,100%{opacity:0}50%{opacity:0.7}}</style><path class='faucet' d='M20,50 H80 V60 H20 Z'/><path class='faucet' d='M70,50 C85,50 85,30 70,30 H50'/><path class='shine' d='M75,35 C80,35 80,45 75,45' style='animation-delay:-0.5s'/></svg>",
      row: 4,
      col: 6,
    },
    {
      name: "Manganese",
      symbol: "Mn",
      atomicNumber: 25,
      atomicMass: "54.938",
      group: 7,
      period: 4,
      block: "d-block",
      electronic: "[Ar] 3d⁵ 4s²",
      type: "transition-metal",
      specific: "transition-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Mn | <strong>Atomic number:</strong> 25 | <strong>Electronic configuration:</strong> [Ar] 3d⁵ 4s²</p><p>Recognized in 1774, Manganese is a hard, brittle, silvery metal. It is a transition metal that is too brittle to be used in its pure form, but is essential in alloys.</p></section><section><h2>2. Uses & Importance</h2><p>Manganese is vital for iron and steel production, improving strength and resistance to wear. It is also used to decolorize glass and, in higher concentrations, to make violet-colored glass. Manganese dioxide is a key component of alkaline batteries.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.rail-track{fill:#A1887F}.rail{fill:#757575;stroke:#424242;stroke-width:1;animation:move-track 5s linear infinite}@keyframes move-track{to{transform:translateX(-20px)}}</style><g class='rail'><rect class='rail-track' x='0' y='60' width='120' height='5'/><rect class='rail-track' x='0' y='40' width='120' height='5'/><rect x='10' y='35' width='5' height='35'/><rect x='30' y='35' width='5' height='35'/><rect x='50' y='35' width='5' height='35'/><rect x='70' y='35' width='5' height='35'/><rect x='90' y='35' width='5' height='35'/><rect x='110' y='35' width='5' height='35'/></g></svg>",
      row: 4,
      col: 7,
    },
    {
      name: "Iron",
      symbol: "Fe",
      atomicNumber: 26,
      atomicMass: "55.845",
      group: 8,
      period: 4,
      block: "d-block",
      electronic: "[Ar] 3d⁶ 4s²",
      type: "transition-metal",
      specific: "transition-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Fe | <strong>Atomic number:</strong> 26 | <strong>Electronic configuration:</strong> [Ar] 3d⁶ 4s²</p><p>Known since antiquity, Iron is a transition metal that is the most common element on Earth by mass. Its symbol, Fe, comes from the Latin 'ferrum'.</p></section><section><h2>2. Uses & Importance</h2><p>Iron is the most widely used of all metals, accounting for 95% of worldwide metal production. Its low cost and high strength make it indispensable in machinery, cars, and buildings. Steel is its best known alloy. Iron is also essential for life, forming the core of hemoglobin in blood.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.gear{fill:#78909C;animation:spin 4s linear infinite;transform-origin:center}.gear2{animation-direction:reverse;animation-duration:3s}@keyframes spin{to{transform:rotate(360deg)}}</style><path class='gear' d='M50,20 L55,25 L55,35 L60,40 L60,50 L55,55 L55,65 L50,70 L45,65 L45,55 L40,50 L40,40 L45,35 L45,25 Z'/><path class='gear gear2' transform='translate(30,30) scale(0.6)' d='M50,20 L55,25 L55,35 L60,40 L60,50 L55,55 L55,65 L50,70 L45,65 L45,55 L40,50 L40,40 L45,35 L45,25 Z'/><circle cx='50' cy='50' r='10' fill='#fff'/></svg>",
      row: 4,
      col: 8,
    },
    {
      name: "Cobalt",
      symbol: "Co",
      atomicNumber: 27,
      atomicMass: "58.933",
      group: 9,
      period: 4,
      block: "d-block",
      electronic: "[Ar] 3d⁷ 4s²",
      type: "transition-metal",
      specific: "transition-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Co | <strong>Atomic number:</strong> 27 | <strong>Electronic configuration:</strong> [Ar] 3d⁷ 4s²</p><p>Discovered in 1735, Cobalt is a hard, lustrous, silver-gray transition metal. It is ferromagnetic, meaning it can be magnetized.</p></section><section><h2>2. Uses & Importance</h2><p>Cobalt is used to make high-performance alloys for jet engines. It is a key component of powerful magnets and rechargeable batteries. For centuries, its compounds have been used to impart a rich blue color (cobalt blue) to glass and ceramics.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.magnet{fill:#F44336;stroke:#c62828;stroke-width:2}.n-pole{fill:#E0E0E0}.s-pole{fill:#E0E0E0}.field-line{fill:none;stroke:#9E9E9E;stroke-width:1;stroke-dasharray:3,3;animation:flow 2s linear infinite}@keyframes flow{to{stroke-dashoffset:12}}</style><path class='magnet' d='M30,80 C10,80 10,40 30,40 L30,20 L70,20 L70,40 C90,40 90,80 70,80 Z'/><rect x='30' y='20' width='40' height='20'/><text class='n-pole' x='30' y='35' font-size='12'>N</text><text class='s-pole' x='60' y='35' font-size='12'>S</text><path class='field-line' d='M50,20 C20,20 20,50 50,50 C80,50 80,20 50,20'/></svg>",
      row: 4,
      col: 9,
    },
    {
      name: "Nickel",
      symbol: "Ni",
      atomicNumber: 28,
      atomicMass: "58.693",
      group: 10,
      period: 4,
      block: "d-block",
      electronic: "[Ar] 3d⁸ 4s²",
      type: "transition-metal",
      specific: "transition-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Ni | <strong>Atomic number:</strong> 28 | <strong>Electronic configuration:</strong> [Ar] 3d⁸ 4s²</p><p>Discovered in 1751, Nickel is a silvery-white lustrous metal with a slight golden tinge. It is a hard, ductile, and corrosion-resistant transition metal.</p></section><section><h2>2. Uses & Importance</h2><p>Its main use is in creating alloys, especially stainless steel. It is widely used in coins (like the U.S. 'nickel'), for protective plating, and in rechargeable batteries (Nickel-cadmium and Nickel-metal hydride).</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.coin{fill:#FFD700;stroke:#FFA000;stroke-width:2;animation:spin-coin 3s linear infinite;transform-style:preserve-3d;}.text{font-size:12px;fill:#BF360C}@keyframes spin-coin{from{transform:rotateY(0deg)}to{transform:rotateY(360deg)}}</style><circle class='coin' cx='50' cy='50' r='40'/><text class='text' x='50' y='55' text-anchor='middle'>Ni</text></svg>",
      row: 4,
      col: 10,
    },
    {
      name: "Copper",
      symbol: "Cu",
      atomicNumber: 29,
      atomicMass: "63.546",
      group: 11,
      period: 4,
      block: "d-block",
      electronic: "[Ar] 3d¹⁰ 4s¹",
      type: "transition-metal",
      specific: "transition-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Cu | <strong>Atomic number:</strong> 29 | <strong>Electronic configuration:</strong> [Ar] 3d¹⁰ 4s¹</p><p>Used for over 10,000 years, Copper is a soft, malleable metal with very high thermal and electrical conductivity. It has a distinctive reddish-brown color. Its symbol, Cu, comes from 'cuprum'.</p></section><section><h2>2. Uses & Importance</h2><p>Because of its excellent electrical conductivity, its primary use is in electrical wiring. It is also extensively used in plumbing, roofing, and machinery. Alloys like brass and bronze are used in musical instruments and ship propellers.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.wire{fill:none;stroke:#E65100;stroke-width:4;stroke-linecap:round}.spark{fill:#FFFF00;opacity:0;animation:zap 1.5s linear infinite;transform-origin:center}@keyframes zap{0%{opacity:1;transform:scale(1)}50%{opacity:0}100%{opacity:1;transform:scale(1)}}</style><path class='wire' d='M10,50 C 30,20 70,80 90,50'/><circle class='spark' cx='50' cy='50' r='5'/></svg>",
      row: 4,
      col: 11,
    },
    {
      name: "Zinc",
      symbol: "Zn",
      atomicNumber: 30,
      atomicMass: "65.38",
      group: 12,
      period: 4,
      block: "d-block",
      electronic: "[Ar] 3d¹⁰ 4s²",
      type: "transition-metal",
      specific: "transition-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Zn | <strong>Atomic number:</strong> 30 | <strong>Electronic configuration:</strong> [Ar] 3d¹⁰ 4s²</p><p>Recognized as an element in the 18th century, Zinc is a bluish-white, brittle metal at room temperature. It is chemically active.</p></section><section><h2>2. Uses & Importance</h2><p>Its most important use is for galvanizing steel—coating it to protect from rust. It is a key component of alloys like brass. Zinc oxide is used in paints and sunscreens. As an essential mineral, it is vital for the human immune system.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.shield{fill:url(#grad);stroke:#B0BEC5;stroke-width:2;animation:pulse-shield 2s infinite alternate}.text{font-family:sans-serif;font-size:30px;font-weight:bold;fill:#fff;text-anchor:middle}@keyframes pulse-shield{from{transform:scale(0.95)}to{transform:scale(1.05)}}</style><defs><radialGradient id='grad'><stop offset='0%' stop-color='#78909C'/><stop offset='100%' stop-color='#37474F'/></radialGradient></defs><path class='shield' d='M50,10 L90,30 V70 L50,90 L10,70 V30 Z'/><text class='text' x='50' y='60'>Zn</text></svg>",
      row: 4,
      col: 12,
    },
    {
      name: "Gallium",
      symbol: "Ga",
      atomicNumber: 31,
      atomicMass: "69.723",
      group: 13,
      period: 4,
      block: "p-block",
      electronic: "[Ar] 3d¹⁰ 4s² 4p¹",
      type: "post-transition-metal",
      specific: "post-transition-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Ga | <strong>Atomic number:</strong> 31 | <strong>Electronic configuration:</strong> [Ar] 3d¹⁰ 4s² 4p¹</p><p>Discovered in 1875, Gallium is a soft, silvery post-transition metal. It is famous for melting at just 29.76 °C (85.58 °F), allowing it to melt in a person's hand.</p></section><section><h2>2. Uses & Importance</h2><p>Gallium's primary application is in electronics. Gallium arsenide (<code>GaAs</code>) is a key semiconductor used in microwave circuits and LEDs. It is also used to create brilliant blue and violet LEDs and lasers (as gallium nitride).</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.hand{fill:#FFCCBC}.gallium{fill:#CFD8DC;animation:melt 4s ease-in-out infinite}@keyframes melt{0%,20%{transform:scale(1);opacity:1}80%,100%{transform:scale(1.2);opacity:0.5;cy:70}}</style><path class='hand' d='M20,80 C10,70 10,40 40,40 L60,40 C90,40 90,70 80,80 Z'/><circle class='gallium' cx='50' cy='30' r='10'/></svg>",
      row: 4,
      col: 13,
    },
    {
      name: "Germanium",
      symbol: "Ge",
      atomicNumber: 32,
      atomicMass: "72.63",
      group: 14,
      period: 4,
      block: "p-block",
      electronic: "[Ar] 3d¹⁰ 4s² 4p²",
      type: "metalloid",
      specific: "metalloid",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Ge | <strong>Atomic number:</strong> 32 | <strong>Electronic configuration:</strong> [Ar] 3d¹⁰ 4s² 4p²</p><p>Discovered in 1886, Germanium is a lustrous, hard, grayish-white metalloid, chemically similar to silicon.</p></section><section><h2>2. Uses & Importance</h2><p>Historically a crucial semiconductor for early transistors, its main uses today are in fiber-optic systems, infrared optics (as it is transparent to infrared), and solar cell applications. It is also used as a polymerization catalyst.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.optic-fiber{fill:none;stroke-width:4;stroke-linecap:round}.c1{stroke:#03A9F4}.c2{stroke:#4FC3F7}.light-pulse{fill:#FFF;r:3;animation:travel 2s linear infinite}@keyframes travel{from{motion-offset:0%}to{motion-offset:100%}}</style><path id='p1' class='optic-fiber c1' d='M10,30 C 40,10 60,50 90,30'/><path id='p2' class='optic-fiber c2' d='M10,70 C 40,90 60,50 90,70'/><circle class='light-pulse'><animateMotion dur='2s' repeatCount='indefinite' path='M10,30 C 40,10 60,50 90,30'/></circle><circle class='light-pulse' style='animation-delay:-1s'><animateMotion dur='2s' repeatCount='indefinite' path='M10,70 C 40,90 60,50 90,70'/></circle></svg>",
      row: 4,
      col: 14,
    },
    {
      name: "Arsenic",
      symbol: "As",
      atomicNumber: 33,
      atomicMass: "74.922",
      group: 15,
      period: 4,
      block: "p-block",
      electronic: "[Ar] 3d¹⁰ 4s² 4p³",
      type: "metalloid",
      specific: "metalloid",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> As | <strong>Atomic number:</strong> 33 | <strong>Electronic configuration:</strong> [Ar] 3d¹⁰ 4s² 4p³</p><p>Known since ancient times and infamous for its toxicity, Arsenic is a metalloid that comes in several forms, most commonly a gray, brittle solid.</p></section><section><h2>2. Uses & Importance</h2><p>Arsenic is primarily used as an alloying agent for lead in car batteries. Its compounds were historically used as pesticides. High-purity arsenic is used to make semiconductors like gallium arsenide.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.skull{fill:#FAFAFA;stroke:#757575;stroke-width:2}.crossbones{fill:none;stroke:#757575;stroke-width:4;animation:fade-in 2s infinite alternate}@keyframes fade-in{from{opacity:0.2}to{opacity:0.8}}</style><path class='skull' d='M30,70 C20,70 20,40 30,30 H70 C80,30 80,70 70,70 Z M40,60 H60 V75 H40 Z'/><circle cx='40' cy='50' r='5' fill='#424242'/><circle cx='60' cy='50' r='5' fill='#424242'/><g transform='translate(0 15)'><line class='crossbones' x1='20' y1='70' x2='80' y2='20'/><line class='crossbones' x1='20' y1='20' x2='80' y2='70'/></g></svg>",
      row: 4,
      col: 15,
    },
    {
      name: "Selenium",
      symbol: "Se",
      atomicNumber: 34,
      atomicMass: "78.971",
      group: 16,
      period: 4,
      block: "p-block",
      electronic: "[Ar] 3d¹⁰ 4s² 4p⁴",
      type: "nonmetal",
      specific: "nonmetal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Se | <strong>Atomic number:</strong> 34 | <strong>Electronic configuration:</strong> [Ar] 3d¹⁰ 4s² 4p⁴</p><p>Discovered in 1817, Selenium is a nonmetal with properties intermediate between sulfur and tellurium. It exists in several allotropes.</p></section><section><h2>2. Uses & Importance</h2><p>Selenium is a photoconductor, making it useful in photocopiers, photometers, and solar cells. It is also used to decolorize glass and to make red-colored glasses and enamels. As a nutrient, it is an important antioxidant.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.glass{fill:#E1F5FE;stroke:#4FC3F7;stroke-width:2}.decolorize{fill:#fff;opacity:1;animation:clear-up 3s ease-in-out infinite}@keyframes clear-up{from{opacity:0.2}to{opacity:1}}</style><rect class='glass' x='20' y='20' width='60' height='60' rx='5'/><rect class='decolorize' x='20' y='20' width='60' height='60' rx='5'/></svg>",
      row: 4,
      col: 16,
    },
    {
      name: "Bromine",
      symbol: "Br",
      atomicNumber: 35,
      atomicMass: "79.904",
      group: 17,
      period: 4,
      block: "p-block",
      electronic: "[Ar] 3d¹⁰ 4s² 4p⁵",
      type: "nonmetal",
      specific: "nonmetal",
      physical: "Liquid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Br | <strong>Atomic number:</strong> 35 | <strong>Electronic configuration:</strong> [Ar] 3d¹⁰ 4s² 4p⁵</p><p>Discovered in 1825, Bromine is the only nonmetallic element that is liquid at room temperature. It is a dense, reddish-brown, volatile, corrosive and toxic liquid.</p></section><section><h2>2. Uses & Importance</h2><p>Bromine compounds are widely used as flame retardants in plastics and textiles. They are also used in some water purification systems, as agricultural chemicals, and in the manufacture of some pharmaceuticals.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.flask{fill:none;stroke:#78909C;stroke-width:3}.liquid{fill:#BF360C;animation:swirl 3s ease-in-out infinite alternate}@keyframes swirl{from{transform:skewX(0deg)}to{transform:skewX(15deg)}}</style><path class='flask' d='M30,90 L30,50 Q30,20 50,20 Q70,20 70,50 L70,90 Z M20,90 H80'/><path class='liquid' d='M33,90 H67 V60 Q60,55 50,55 Q40,55 33,60 Z'/></svg>",
      row: 4,
      col: 17,
    },
    {
      name: "Krypton",
      symbol: "Kr",
      atomicNumber: 36,
      atomicMass: "83.798",
      group: 18,
      period: 4,
      block: "p-block",
      electronic: "[Ar] 3d¹⁰ 4s² 4p⁶",
      type: "noble-gas",
      specific: "noble-gas",
      physical: "Gas",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Kr | <strong>Atomic number:</strong> 36 | <strong>Electronic configuration:</strong> [Ar] 3d¹⁰ 4s² 4p⁶</p><p>Discovered in 1898, Krypton is a colorless, odorless, tasteless noble gas that is chemically very inert.</p></section><section><h2>2. Uses & Importance</h2><p>Krypton is used in high-performance lighting, such as in airport runway lights, because its light is bright and whitish. It's also used in energy-efficient fluorescent lamps and in flash lamps for high-speed photography.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.laser-body{fill:#757575}.beam{fill:#00E676;opacity:0;animation:fire-laser 2s steps(1,end) infinite}@keyframes fire-laser{0%,50%{opacity:1}51%,100%{opacity:0}}</style><rect class='laser-body' x='10' y='40' width='60' height='20' rx='5'/><path class='beam' d='M70,50 L100,50 L100,49 L70,49 Z'/></svg>",
      row: 4,
      col: 18,
    },
    {
      name: "Rubidium",
      symbol: "Rb",
      atomicNumber: 37,
      atomicMass: "85.468",
      group: 1,
      period: 5,
      block: "s-block",
      electronic: "[Kr] 5s¹",
      type: "alkali-metal",
      specific: "alkali-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Rb | <strong>Atomic number:</strong> 37 | <strong>Electronic configuration:</strong> [Kr] 5s¹</p><p>Discovered in 1861, Rubidium is a very soft, silvery-white alkali metal. It is highly reactive, with properties similar to other alkali metals.</p></section><section><h2>2. Uses & Importance</h2><p>Rubidium has important applications in research and electronics. It is used in atomic clocks for its precise timing properties, as a component in photocells, and to create the purple color in fireworks.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.clock-face{fill:none;stroke:#78909C;stroke-width:3}.hand{stroke:#F44336;stroke-width:2;transform-origin:center;animation:tick 2s linear infinite}@keyframes tick{to{transform:rotate(360deg)}}</style><circle class='clock-face' cx='50' cy='50' r='40'/><line class='hand' x1='50' y1='50' x2='50' y2='20'/></svg>",
      row: 5,
      col: 1,
    },
    {
      name: "Strontium",
      symbol: "Sr",
      atomicNumber: 38,
      atomicMass: "87.62",
      group: 2,
      period: 5,
      block: "s-block",
      electronic: "[Kr] 5s²",
      type: "alkaline-earth-metal",
      specific: "alkaline-earth-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Sr | <strong>Atomic number:</strong> 38 | <strong>Electronic configuration:</strong> [Kr] 5s²</p><p>Discovered in 1790, Strontium is an alkaline earth metal that is soft and silver-yellow. It is highly reactive and turns yellow when exposed to air.</p></section><section><h2>2. Uses & Importance</h2><p>Strontium is famous for the brilliant crimson-red color it imparts to flames, making it a key ingredient in red fireworks and flares. Previously, it was used in old color television tubes. Strontium is also used in glow-in-the-dark paints.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.particle{fill:#E53935;animation:firework-burst 1.5s ease-out infinite;transform-origin:center}@keyframes firework-burst{from{transform:scale(0);opacity:1}to{transform:scale(1.5);opacity:0}}</style><circle class='particle' cx='50' cy='50' r='5' style='transform:rotate(0deg) translateX(30px);animation-delay:-.1s'/><circle class='particle' cx='50' cy='50' r='5' style='transform:rotate(45deg) translateX(30px);animation-delay:-.2s'/><circle class='particle' cx='50' cy='50' r='5' style='transform:rotate(90deg) translateX(30px);animation-delay:-.3s'/><circle class='particle' cx='50' cy='50' r='5' style='transform:rotate(135deg) translateX(30px);animation-delay:-.4s'/><circle class='particle' cx='50' cy='50' r='5' style='transform:rotate(180deg) translateX(30px);animation-delay:-.5s'/><circle class='particle' cx='50' cy='50' r='5' style='transform:rotate(225deg) translateX(30px);animation-delay:-.6s'/><circle class='particle' cx='50' cy='50' r='5' style='transform:rotate(270deg) translateX(30px);animation-delay:-.7s'/><circle class='particle' cx='50' cy='50' r='5' style='transform:rotate(315deg) translateX(30px);animation-delay:-.8s'/></svg>",
      row: 5,
      col: 2,
    },
    {
      name: "Yttrium",
      symbol: "Y",
      atomicNumber: 39,
      atomicMass: "88.906",
      group: 3,
      period: 5,
      block: "d-block",
      electronic: "[Kr] 4d¹ 5s²",
      type: "transition-metal",
      specific: "transition-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Y | <strong>Atomic number:</strong> 39 | <strong>Electronic configuration:</strong> [Kr] 4d¹ 5s²</p><p>Discovered in 1794, Yttrium is a silvery-metallic transition metal chemically similar to the lanthanides. It is relatively stable in air.</p></section><section><h2>2. Uses & Importance</h2><p>One of its most important uses was as the red phosphor in old CRT televisions. Today, it is used in LEDs and energy-saving lamps. It is also used to make high-performance alloys, as a catalyst, and in certain types of lasers (YAG lasers).</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.screen{fill:#212121}.pixel{animation:tv-static 0.1s infinite}@keyframes tv-static{0%{fill:#fff}50%{fill:#E53935}100%{fill:#1E88E5}}</style><rect class='screen' x='10' y='20' width='80' height='60' rx='5'/><circle class='pixel' cx='30' cy='40' r='3' style='animation-delay:0.01s'/><circle class='pixel' cx='50' cy='50' r='3' style='animation-delay:0.02s'/><circle class='pixel' cx='70' cy='60' r='3' style='animation-delay:0.03s'/><circle class='pixel' cx='40' cy='60' r='3' style='animation-delay:0.04s'/><circle class='pixel' cx='60' cy='40' r='3' style='animation-delay:0.05s'/></svg>",
      row: 5,
      col: 3,
    },
    {
      name: "Zirconium",
      symbol: "Zr",
      atomicNumber: 40,
      atomicMass: "91.224",
      group: 4,
      period: 5,
      block: "d-block",
      electronic: "[Kr] 4d² 5s²",
      type: "transition-metal",
      specific: "transition-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Zr | <strong>Atomic number:</strong> 40 | <strong>Electronic configuration:</strong> [Kr] 4d² 5s²</p><p>Discovered in 1789, Zirconium is a lustrous, grayish-white transition metal. It is exceptionally resistant to corrosion by many common acids and alkalis.</p></section><section><h2>2. Uses & Importance</h2><p>Its main use is in nuclear reactors. Zirconium alloys are used to clad fuel rods because they are corrosion-resistant and don't absorb neutrons. Its heat resistance also make it useful in chemical plants. The gemstone cubic zirconia is a compound of zirconium.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.rod{fill:#9E9E9E;stroke:#616161;stroke-width:1}.glow{fill:#4CAF50;opacity:0.7;animation:pulse-glow 2s infinite ease-in-out}@keyframes pulse-glow{from{filter:brightness(1)}to{filter:brightness(1.5)}}</style><rect class='rod' x='45' y='10' width='10' height='80' rx='5'/><circle class='glow' cx='50' cy='50' r='15'/></svg>",
      row: 5,
      col: 4,
    },
    {
      name: "Niobium",
      symbol: "Nb",
      atomicNumber: 41,
      atomicMass: "92.906",
      group: 5,
      period: 5,
      block: "d-block",
      electronic: "[Kr] 4d⁴ 5s¹",
      type: "transition-metal",
      specific: "transition-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Nb | <strong>Atomic number:</strong> 41 | <strong>Electronic configuration:</strong> [Kr] 4d⁴ 5s¹</p><p>Discovered in 1801, Niobium is a light gray, crystalline, and ductile transition metal. It is quite resistant to corrosion.</p></section><section><h2>2. Uses & Importance</h2><p>Niobium's main use is in high-strength, low-alloy steels for pipelines and car bodies. It is also a superconductor at low temperatures and is used to make powerful superconducting magnets for MRI scanners and particle accelerators.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.mri-tunnel{fill:#ECEFF1;stroke:#B0BEC5;stroke-width:2}.mag-field{fill:none;stroke:#03A9F4;stroke-width:2;stroke-dasharray:5;animation:flow-field 1s linear infinite}@keyframes flow-field{to{stroke-dashoffset:10}}</style><path class='mri-tunnel' d='M20,80 C10,80 10,20 20,20 H80 C90,20 90,80 80,80 Z'/><circle cx='50' cy='50' r='15' fill='#fff'/><path class='mag-field' d='M50,30 C30,30 30,70 50,70'/><path class='mag-field' d='M50,30 C70,30 70,70 50,70' style='animation-delay:-0.5s'/></svg>",
      row: 5,
      col: 5,
    },
    {
      name: "Molybdenum",
      symbol: "Mo",
      atomicNumber: 42,
      atomicMass: "95.95",
      group: 6,
      period: 5,
      block: "d-block",
      electronic: "[Kr] 4d⁵ 5s¹",
      type: "transition-metal",
      specific: "transition-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Mo | <strong>Atomic number:</strong> 42 | <strong>Electronic configuration:</strong> [Kr] 4d⁵ 5s¹</p><p>Identified in 1778, Molybdenum is a silvery-white transition metal with a very high melting point. It is an essential trace mineral for life.</p></section><section><h2>2. Uses & Importance</h2><p>Its primary application is in alloys. Molybdenum strengthens steel and allows it to withstand high temperatures. These alloys are used in engine parts, heating elements, and drills. It is also used as a catalyst in petroleum refining.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.drill-bit{fill:#9E9E9E;stroke:#616161;stroke-width:1;transform-origin:center;animation:spin-drill 1s linear infinite}@keyframes spin-drill{to{transform:rotate(360deg)}}</style><path class='drill-bit' d='M50,10 L60,30 L40,30 Z M45,30 L55,30 L55,90 L45,90 Z'/></svg>",
      row: 5,
      col: 6,
    },
    {
      name: "Technetium",
      symbol: "Tc",
      atomicNumber: 43,
      atomicMass: "(98)",
      group: 7,
      period: 5,
      block: "d-block",
      electronic: "[Kr] 4d⁵ 5s²",
      type: "transition-metal",
      specific: "transition-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Tc | <strong>Atomic number:</strong> 43 | <strong>Atomic mass:</strong> (98)</p><p>The first element to be produced artificially (1937), Technetium is a silvery-gray radioactive metal. All of its isotopes are radioactive.</p></section><section><h2>2. Uses & Importance</h2><p>Its isotope technetium-99m is a gamma-ray emitter used in millions of medical diagnostic procedures each year. As a radiopharmaceutical tracer, it can be injected into the body to image organs like the heart, brain, and kidneys.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.tracer{fill:#80DEEA;r:4;animation:scan-path 4s linear infinite}.path{fill:none;stroke:#ccc;stroke-width:1}@keyframes scan-path{from{motion-offset:0%}to{motion-offset:100%}}</style><path id='scanpath' class='path' d='M20,50 C40,20 60,80 80,50'/><circle class='tracer'><animateMotion dur='4s' repeatCount='indefinite' path='M20,50 C40,20 60,80 80,50'/></circle></svg>",
      row: 5,
      col: 7,
    },
    {
      name: "Ruthenium",
      symbol: "Ru",
      atomicNumber: 44,
      atomicMass: "101.07",
      group: 8,
      period: 5,
      block: "d-block",
      electronic: "[Kr] 4d⁷ 5s¹",
      type: "transition-metal",
      specific: "transition-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Ru | <strong>Atomic number:</strong> 44 | <strong>Electronic configuration:</strong> [Kr] 4d⁷ 5s¹</p><p>Discovered in 1844, Ruthenium is a rare transition metal belonging to the platinum group. It is a hard, white metal that is inert to most chemicals.</p></section><section><h2>2. Uses & Importance</h2><p>Ruthenium is used as an alloying agent to harden platinum and palladium for wear-resistant electrical contacts. A major application is in the electronics industry for chip resistors. It is also a versatile catalyst.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.resistor-body{fill:#BBDEFB;stroke:#64B5F6;stroke-width:2}.band{stroke-width:8;animation:pulse-color 2s infinite alternate}.b1{stroke:#F44336}.b2{stroke:#4CAF50}.b3{stroke:#FFC107}@keyframes pulse-color{from{opacity:0.5}to{opacity:1}}</style><rect class='resistor-body' x='10' y='40' width='80' height='20' rx='10'/><line class='band b1' x1='30' y1='40' x2='30' y2='60'/><line class='band b2' x1='50' y1='40' x2='50' y2='60' style='animation-delay:-0.5s'/><line class='band b3' x1='70' y1='40' x2='70' y2='60' style='animation-delay:-1s'/></svg>",
      row: 5,
      col: 8,
    },
    {
      name: "Rhodium",
      symbol: "Rh",
      atomicNumber: 45,
      atomicMass: "102.91",
      group: 9,
      period: 5,
      block: "d-block",
      electronic: "[Kr] 4d⁸ 5s¹",
      type: "transition-metal",
      specific: "transition-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Rh | <strong>Atomic number:</strong> 45 | <strong>Electronic configuration:</strong> [Kr] 4d⁸ 5s¹</p><p>Discovered in 1803, Rhodium is a rare, silvery-white, hard, and corrosion-resistant transition metal. It is one of the most valuable precious metals.</p></section><section><h2>2. Uses & Importance</h2><p>Its primary use is in automotive catalytic converters, where it helps reduce harmful nitrogen oxide emissions (e.g., <code>2NO → N₂ + O₂</code>). Its hardness and high reflectivity make it excellent for plating jewelry and optical instruments.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.exhaust-pipe{fill:none;stroke:#9E9E9E;stroke-width:5}.gas{r:3;animation:flow-gas 2s linear infinite}.clean{fill:#81D4FA}.dirty{fill:#A1887F}@keyframes flow-gas{from{transform:translateX(0);opacity:1}to{transform:translateX(80px);opacity:0}}</style><path class='exhaust-pipe' d='M10,50 H90'/><circle class='dirty gas' cx='15' cy='50'/><circle class='clean gas' cx='15' cy='50' style='animation-delay:-1.5s'/></svg>",
      row: 5,
      col: 9,
    },
    {
      name: "Palladium",
      symbol: "Pd",
      atomicNumber: 46,
      atomicMass: "106.42",
      group: 10,
      period: 5,
      block: "d-block",
      electronic: "[Kr] 4d¹⁰",
      type: "transition-metal",
      specific: "transition-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Pd | <strong>Atomic number:</strong> 46 | <strong>Electronic configuration:</strong> [Kr] 4d¹⁰</p><p>Discovered in 1803, Palladium is a rare, lustrous silvery-white metal. It has the lowest melting point and density of the platinum group metals.</p></section><section><h2>2. Uses & Importance</h2><p>Palladium is a key component in catalytic converters. It is also widely used in electronics (in ceramic capacitors), dentistry, and jewelry. It has the unusual ability to absorb large volumes of hydrogen, making it useful for hydrogen purification.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.capacitor{fill:#FFECB3}.plate{fill:#FFA000}.p1{animation:charge 2s infinite alternate}.p2{animation:charge 2s infinite alternate-reverse}@keyframes charge{from{transform:translateX(0)}to{transform:translateX(-5px)}}</style><rect class='capacitor' x='20' y='20' width='60' height='60'/><rect class='plate p1' x='30' y='30' width='10' height='40'/><rect class='plate p2' x='60' y='30' width='10' height='40'/></svg>",
      row: 5,
      col: 10,
    },
    {
      name: "Silver",
      symbol: "Ag",
      atomicNumber: 47,
      atomicMass: "107.87",
      group: 11,
      period: 5,
      block: "d-block",
      electronic: "[Kr] 4d¹⁰ 5s¹",
      type: "transition-metal",
      specific: "transition-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Ag | <strong>Atomic number:</strong> 47 | <strong>Electronic configuration:</strong> [Kr] 4d¹⁰ 5s¹</p><p>Known since antiquity, Silver is a soft, white, lustrous transition metal. Its symbol, Ag, comes from 'argentum'. It has the highest electrical and thermal conductivity of any metal.</p></section><section><h2>2. Uses & Importance</h2><p>Silver has long been used in currency, jewelry, and tableware. It is also crucial in photography (as silver halides), for making mirrors, and in electrical contacts. Silver compounds have antimicrobial properties and are used in medicine.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.mirror-frame{fill:#A1887F}.mirror-glass{fill:#E0F7FA;animation:reflect 3s infinite}@keyframes reflect{0%,100%{opacity:0.7}50%{opacity:1}}</style><rect class='mirror-frame' x='15' y='15' width='70' height='70' rx='5'/><rect class='mirror-glass' x='20' y='20' width='60' height='60' rx='3'/><text x='50' y='60' font-size='20' text-anchor='middle' fill='#B0BEC5' transform='scale(-1, 1) translate(-100, 0)'>Ag</text></svg>",
      row: 5,
      col: 11,
    },
    {
      name: "Cadmium",
      symbol: "Cd",
      atomicNumber: 48,
      atomicMass: "112.41",
      group: 12,
      period: 5,
      block: "d-block",
      electronic: "[Kr] 4d¹⁰ 5s²",
      type: "transition-metal",
      specific: "transition-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Cd | <strong>Atomic number:</strong> 48 | <strong>Electronic configuration:</strong> [Kr] 4d¹⁰ 5s²</p><p>Discovered in 1817, Cadmium is a soft, bluish-white transition metal that is chemically similar to zinc. It is highly resistant to corrosion.</p></section><section><h2>2. Uses & Importance</h2><p>Its most significant use is in nickel-cadmium (NiCd) rechargeable batteries. Historically, it was used for corrosion-resistant plating and in pigments. Due to its high toxicity, its use is being phased out in many applications.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.battery-case{fill:#757575;stroke:#424242;stroke-width:2}.charge-indicator{fill:#FFEB3B;animation:drain 5s linear infinite}@keyframes drain{from{height:70px;y:15}to{height:0px;y:85}}</style><rect class='battery-case' x='25' y='10' width='50' height='80' rx='5'/><rect x='40' y='5' width='20' height='5' fill='#F44336'/><rect class='charge-indicator' x='30' y='15' width='40' height='70'/></svg>",
      row: 5,
      col: 12,
    },
    {
      name: "Indium",
      symbol: "In",
      atomicNumber: 49,
      atomicMass: "114.82",
      group: 13,
      period: 5,
      block: "p-block",
      electronic: "[Kr] 4d¹⁰ 5s² 5p¹",
      type: "post-transition-metal",
      specific: "post-transition-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> In | <strong>Atomic number:</strong> 49 | <strong>Electronic configuration:</strong> [Kr] 4d¹⁰ 5s² 5p¹</p><p>Discovered in 1863, Indium is a very soft, silvery-white post-transition metal. It is so soft that it can be cut with a knife.</p></section><section><h2>2. Uses & Importance</h2><p>Its main application is in electronics. Indium tin oxide (ITO) is a transparent conductor used for coating touchscreens, LCDs, and solar panels. It is also used to make low-melting-point alloys and coatings for bearings.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.screen{fill:#263238}.finger{fill:#FFAB91;animation:touch 2s ease-in-out infinite}@keyframes touch{0%,100%{transform:translate(0,0)}50%{transform:translate(20px,-20px)}}</style><rect class='screen' x='10' y='10' width='80' height='80' rx='5'/><path class='finger' d='M40,90 C35,80 50,70 55,75 Z'/></svg>",
      row: 5,
      col: 13,
    },
    {
      name: "Tin",
      symbol: "Sn",
      atomicNumber: 50,
      atomicMass: "118.71",
      group: 14,
      period: 5,
      block: "p-block",
      electronic: "[Kr] 4d¹⁰ 5s² 5p²",
      type: "post-transition-metal",
      specific: "post-transition-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Sn | <strong>Atomic number:</strong> 50 | <strong>Electronic configuration:</strong> [Kr] 4d¹⁰ 5s² 5p²</p><p>Known since antiquity, Tin is a soft, malleable, silvery-white metal that is highly resistant to corrosion. Its symbol, Sn, comes from the Latin 'stannum'.</p></section><section><h2>2. Uses & Importance</h2><p>This corrosion resistance makes tin ideal for plating steel cans for food packaging. It is a key component of many alloys like bronze (tin and copper), pewter, and solder, which is essential for joining electronic components.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.soldering-iron{fill:#757575}.tip{fill:#FF7043;animation:heat-up 2s infinite alternate}.solder{fill:#B0BEC5;stroke-width:2;stroke:#78909C}@keyframes heat-up{to{filter:brightness(1.5)}}</style><path class='soldering-iron' d='M10,45 L70,45 L80,50 L70,55 L10,55 Z'/><polygon class='tip' points='80,50 90,50 80,45 80,55'/><circle class='solder' cx='85' cy='60' r='5'/></svg>",
      row: 5,
      col: 14,
    },
    {
      name: "Antimony",
      symbol: "Sb",
      atomicNumber: 51,
      atomicMass: "121.76",
      group: 15,
      period: 5,
      block: "p-block",
      electronic: "[Kr] 4d¹⁰ 5s² 5p³",
      type: "metalloid",
      specific: "metalloid",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Sb | <strong>Atomic number:</strong> 51 | <strong>Electronic configuration:</strong> [Kr] 4d¹⁰ 5s² 5p³</p><p>Known since ancient times, Antimony is a lustrous gray metalloid that is hard and brittle. Its symbol, Sb, comes from the Latin 'stibium'.</p></section><section><h2>2. Uses & Importance</h2><p>The greatest use for antimony is as a flame retardant in plastics and textiles. It is also used as an alloying agent for lead, increasing its hardness for use in lead-acid batteries. It is also used in some semiconductor devices.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.flame{fill:#FF9800;transform-origin:bottom;animation:burn 1s infinite}.flame-outer{fill:#FFC107;animation-delay:-0.2s}@keyframes burn{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.2)}}</style><path class='flame flame-outer' d='M50,90 C20,90 40,20 50,20 C60,20 80,90 50,90 Z'/><path class='flame' d='M50,90 C30,90 45,30 50,30 C55,30 70,90 50,90 Z'/></svg>",
      row: 5,
      col: 15,
    },
    {
      name: "Tellurium",
      symbol: "Te",
      atomicNumber: 52,
      atomicMass: "127.6",
      group: 16,
      period: 5,
      block: "p-block",
      electronic: "[Kr] 4d¹⁰ 5s² 5p⁴",
      type: "metalloid",
      specific: "metalloid",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Te | <strong>Atomic number:</strong> 52 | <strong>Electronic configuration:</strong> [Kr] 4d¹⁰ 5s² 5p⁴</p><p>Discovered in 1782, Tellurium is a brittle, silvery-white metalloid. It is a rare element chemically related to selenium and sulfur.</p></section><section><h2>2. Uses & Importance</h2><p>Tellurium's main use is in alloys with steel and copper to improve their machinability. A major modern application is in advanced solar panels as part of cadmium telluride (<code>CdTe</code>) thin-film technology.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.panel-bg{fill:#263238}.grid-line{stroke:#4FC3F7;stroke-width:1}.sun{fill:#FFEB3B;animation:shine-bright 3s infinite}@keyframes shine-bright{0%,100%{transform:scale(1)}50%{transform:scale(1.2)}}</style><rect class='panel-bg' x='10' y='30' width='80' height='60'/><path class='grid-line' d='M10,50 H90 M10,70 H90 M30,30 V90 M50,30 V90 M70,30 V90'/><circle class='sun' cx='50' cy='15' r='10'/></svg>",
      row: 5,
      col: 16,
    },
    {
      name: "Iodine",
      symbol: "I",
      atomicNumber: 53,
      atomicMass: "126.9",
      group: 17,
      period: 5,
      block: "p-block",
      electronic: "[Kr] 4d¹⁰ 5s² 5p⁵",
      type: "nonmetal",
      specific: "nonmetal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> I | <strong>Atomic number:</strong> 53 | <strong>Electronic configuration:</strong> [Kr] 4d¹⁰ 5s² 5p⁵</p><p>Discovered in 1811, Iodine is a nonmetal halogen. It is a lustrous, purple-black solid that easily sublimes into a violet-colored gas.</p></section><section><h2>2. Uses & Importance</h2><p>Iodine is essential for human health for thyroid hormone production, which is why it's added to table salt. It is also a powerful disinfectant used in antiseptics (tincture of iodine) for cleaning wounds.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.drop{fill:#8E24AA}.ripple{fill:none;stroke:#8E24AA;stroke-width:2;opacity:0;animation:spread 2s infinite}@keyframes spread{from{r:0;opacity:1}to{r:20;opacity:0}}</style><path class='drop' d='M50,10 C40,30 40,50 50,50 C60,50 60,30 50,10 Z'/><line x1='30' y1='70' x2='70' y2='70' stroke='#B0BEC5' stroke-width='2'/><circle class='ripple' cx='50' cy='70' r='0' style='animation-delay:0s'/><circle class='ripple' cx='50' cy='70' r='0' style='animation-delay:1s'/></svg>",
      row: 5,
      col: 17,
    },
    {
      name: "Xenon",
      symbol: "Xe",
      atomicNumber: 54,
      atomicMass: "131.29",
      group: 18,
      period: 5,
      block: "p-block",
      electronic: "[Kr] 4d¹⁰ 5s² 5p⁶",
      type: "noble-gas",
      specific: "noble-gas",
      physical: "Gas",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Xe | <strong>Atomic number:</strong> 54 | <strong>Electronic configuration:</strong> [Kr] 4d¹⁰ 5s² 5p⁶</p><p>Discovered in 1898, Xenon is a rare, colorless, odorless, heavy noble gas. It was the first noble gas found to form true chemical compounds.</p></section><section><h2>2. Uses & Importance</h2><p>Its most common application is in high-intensity discharge (HID) lamps for car headlights and cinema projectors. It is also used in flash lamps, some lasers, and as a propellant in ion thrusters for spacecraft.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.headlight{fill:#212121}.beam{fill:#FFFDE7;opacity:0.8;clip-path:polygon(0 0,100% 30%,100% 70%,0 100%);animation:flicker-beam 3s infinite ease-in-out}@keyframes flicker-beam{0%,100%{opacity:0.8}50%{opacity:1}}</style><circle class='headlight' cx='20' cy='50' r='15'/><rect class='beam' x='35' y='0' width='65' height='100'/></svg>",
      row: 5,
      col: 18,
    },
    {
      name: "Cesium",
      symbol: "Cs",
      atomicNumber: 55,
      atomicMass: "132.91",
      group: 1,
      period: 6,
      block: "s-block",
      electronic: "[Xe] 6s¹",
      type: "alkali-metal",
      specific: "alkali-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Cs | <strong>Atomic number:</strong> 55 | <strong>Electronic configuration:</strong> [Xe] 6s¹</p><p>Discovered in 1860, Cesium is a soft, silvery-gold alkali metal, liquid near room temperature. It is the most reactive of all elements.</p></section><section><h2>2. Uses & Importance</h2><p>The high precision of cesium's atomic vibrations is the basis for atomic clocks, which are the primary standard for timekeeping and are crucial for GPS systems and the internet. It is also used in drilling fluids in the petroleum industry.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.atom-core{fill:#FFC107}.electron{fill:#4FC3F7;r:4;animation:orbit 2s linear infinite}@keyframes orbit{from{transform:rotate(0deg) translateX(40px) rotate(0deg)}to{transform:rotate(360deg) translateX(40px) rotate(360deg)}}</style><circle class='atom-core' cx='50' cy='50' r='10'/><circle class='electron' cx='50' cy='50'/></svg>",
      row: 6,
      col: 1,
    },
    {
      name: "Barium",
      symbol: "Ba",
      atomicNumber: 56,
      atomicMass: "137.33",
      group: 2,
      period: 6,
      block: "s-block",
      electronic: "[Xe] 6s²",
      type: "alkaline-earth-metal",
      specific: "alkaline-earth-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Ba | <strong>Atomic number:</strong> 56 | <strong>Electronic configuration:</strong> [Xe] 6s²</p><p>Identified in 1774, Barium is a soft, silvery alkaline earth metal. Because of its high chemical reactivity, it is never found in nature as a free element.</p></section><section><h2>2. Uses & Importance</h2><p>Barium sulfate is used in medicine as a radiocontrast agent (barium meal) to make the GI tract visible on X-rays. Barium compounds are also used to produce a pale green color in fireworks and as a filler in plastics.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.xray-film{fill:#212121}.bone-image{fill:#FFF;opacity:0.8;animation:scan 3s ease-in-out infinite}@keyframes scan{0%{clip-path:inset(0 0 100% 0)}100%{clip-path:inset(0 0 0 0)}}</style><rect class='xray-film' x='10' y='10' width='80' height='80' rx='5'/><path class='bone-image' d='M30,30 C20,30 20,50 30,50 L70,50 C80,50 80,30 70,30 Z M30,70 C20,70 20,50 30,50 L70,50 C80,50 80,70 70,70 Z'/></svg>",
      row: 6,
      col: 2,
    },
    {
      name: "Lanthanum",
      symbol: "La",
      atomicNumber: 57,
      atomicMass: "138.91",
      group: 3,
      period: 6,
      block: "f-block",
      electronic: "[Xe] 5d¹ 6s²",
      type: "lanthanide",
      specific: "lanthanide",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> La | <strong>Atomic number:</strong> 57 | <strong>Electronic configuration:</strong> [Xe] 5d¹ 6s²</p><p>Discovered in 1839, Lanthanum is a soft, ductile, silvery-white metal that is the first element of the lanthanide series. It oxidizes rapidly in air.</p></section><section><h2>2. Uses & Importance</h2><p>Lanthanum is a key component of high-refractive-index glass for high-quality camera and telescope lenses. It is also used in flint for lighters and in nickel-metal hydride (NiMH) batteries, commonly used in hybrid cars.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.lens-body{fill:#BDBDBD}.lens-glass{fill:#E1F5FE;stroke:#81D4FA;stroke-width:2;animation:focus-light 3s infinite}@keyframes focus-light{0%,100%{transform:scale(0.9)}50%{transform:scale(1)}}</style><path class='lens-body' d='M20,50 C20,20 80,20 80,50 C80,80 20,80 20,50 Z'/><circle class='lens-glass' cx='50' cy='50' r='25'/></svg>",
      row: 9,
      col: 3,
    },
    {
      name: "Cerium",
      symbol: "Ce",
      atomicNumber: 58,
      atomicMass: "140.12",
      group: null,
      period: 6,
      block: "f-block",
      electronic: "[Xe] 4f¹ 5d¹ 6s²",
      type: "lanthanide",
      specific: "lanthanide",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Ce | <strong>Atomic number:</strong> 58 | <strong>Electronic configuration:</strong> [Xe] 4f¹ 5d¹ 6s²</p><p>Discovered in 1803, Cerium is a soft, ductile, silvery-white metal. It is the most abundant of the rare-earth elements.</p></section><section><h2>2. Uses & Importance</h2><p>Cerium oxide is a highly effective polishing agent for glass. It is a key component of mischmetal, an alloy used to make the flints for lighters. Cerium is also used as a catalyst in catalytic converters and in self-cleaning ovens.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.flint-wheel{fill:#757575;transform-origin:center;animation:spin-flint 0.5s linear infinite}.spark{fill:#FFC107;r:3;animation:fly-off 0.5s ease-out infinite;opacity:0}@keyframes spin-flint{to{transform:rotate(360deg)}}@keyframes fly-off{0%{opacity:1;transform:translate(0,0)}100%{opacity:0;transform:translate(20px,-20px)}}</style><circle class='flint-wheel' cx='50' cy='50' r='15'/><circle class='spark'/></svg>",
      row: 9,
      col: 4,
    },
    {
      name: "Praseodymium",
      symbol: "Pr",
      atomicNumber: 59,
      atomicMass: "140.91",
      group: null,
      period: 6,
      block: "f-block",
      electronic: "[Xe] 4f³ 6s²",
      type: "lanthanide",
      specific: "lanthanide",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Pr | <strong>Atomic number:</strong> 59 | <strong>Electronic configuration:</strong> [Xe] 4f³ 6s²</p><p>Discovered in 1885, Praseodymium is a soft, silvery, malleable and ductile metal, a member of the lanthanide group.</p></section><section><h2>2. Uses & Importance</h2><p>Praseodymium is used with magnesium to create high-strength alloys for aircraft engines. It is a component of powerful neodymium magnets. Its compounds are used to create a yellow color in glass and ceramics, and in safety goggles for welders.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.goggles{fill:#212121}.lens{fill:#8BC34A;opacity:0.7}.highlight{fill:#fff;opacity:0;animation:gleam 3s infinite}@keyframes gleam{50%{opacity:0.3}}</style><path class='goggles' d='M10,30 H90 V70 H10 Z'/><circle class='lens' cx='35' cy='50' r='15'/><circle class='lens' cx='65' cy='50' r='15'/><path class='highlight' d='M30,40 C35,35 40,35 45,40' fill='none' stroke='#fff' stroke-width='3'/></svg>",
      row: 9,
      col: 5,
    },
    {
      name: "Neodymium",
      symbol: "Nd",
      atomicNumber: 60,
      atomicMass: "144.24",
      group: null,
      period: 6,
      block: "f-block",
      electronic: "[Xe] 4f⁴ 6s²",
      type: "lanthanide",
      specific: "lanthanide",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Nd | <strong>Atomic number:</strong> 60 | <strong>Electronic configuration:</strong> [Xe] 4f⁴ 6s²</p><p>Discovered in 1885, Neodymium is a soft, silvery metal that quickly tarnishes in air. It is a lanthanide.</p></section><section><h2>2. Uses & Importance</h2><p>Neodymium is most famous for its use in alloys to make extremely powerful permanent magnets. These are critical in computer hard drives, mobile phones, headphones, electric vehicle motors, and wind turbine generators. It is also used to color glass purple.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.turbine-pole{fill:#BDBDBD}.blade{fill:#ECEFF1;stroke:#90A4AE;stroke-width:1;transform-origin:center;animation:spin-blade 3s linear infinite}@keyframes spin-blade{to{transform:rotate(360deg)}}</style><rect class='turbine-pole' x='47' y='40' width='6' height='60'/><g class='blade'><path d='M50,40 C70,40 70,20 50,20'/><path d='M50,40 C30,40 30,20 50,20' transform='rotate(120 50 50)'/><path d='M50,40 C70,40 70,20 50,20' transform='rotate(240 50 50)'/></g></svg>",
      row: 9,
      col: 6,
    },
    {
      name: "Promethium",
      symbol: "Pm",
      atomicNumber: 61,
      atomicMass: "(145)",
      group: null,
      period: 6,
      block: "f-block",
      electronic: "[Xe] 4f⁵ 6s²",
      type: "lanthanide",
      specific: "lanthanide",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Pm | <strong>Atomic number:</strong> 61 | <strong>Atomic mass:</strong> (145)</p><p>First produced in 1945, Promethium is a radioactive lanthanide. All of its isotopes are radioactive.</p></section><section><h2>2. Uses & Importance</h2><p>Promethium can be used as a source of beta radiation in atomic batteries for spacecraft and missiles. It is also used to make luminous paint for watch dials and signs that glow in the dark without external energy.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.watch-face{fill:#212121}.hand{stroke-width:2;transform-origin:center}.hour-hand{stroke:#BDBDBD}.minute-hand{stroke:#BDBDBD;animation:tick-tock 5s linear infinite}.marker{fill:#4CAF50;filter:drop-shadow(0 0 3px #81C784);animation:glow-marker 3s infinite alternate}@keyframes tick-tock{to{transform:rotate(360deg)}}@keyframes glow-marker{from{opacity:0.7}to{opacity:1}}</style><circle class='watch-face' cx='50' cy='50' r='40'/><circle class='marker' cx='50' cy='20' r='3'/><circle class='marker' cx='80' cy='50' r='3'/><circle class='marker' cx='50' cy='80' r='3'/><circle class='marker' cx='20' cy='50' r='3'/><line class='hour-hand' x1='50' y1='50' x2='50' y2='30'/><line class='minute-hand' x1='50' y1='50' x2='70' y2='50'/></svg>",
      row: 9,
      col: 7,
    },
    {
      name: "Samarium",
      symbol: "Sm",
      atomicNumber: 62,
      atomicMass: "150.36",
      group: null,
      period: 6,
      block: "f-block",
      electronic: "[Xe] 4f⁶ 6s²",
      type: "lanthanide",
      specific: "lanthanide",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Sm | <strong>Atomic number:</strong> 62 | <strong>Electronic configuration:</strong> [Xe] 4f⁶ 6s²</p><p>Discovered in 1879, Samarium is a moderately hard, silvery metal that tarnishes in air. It is a member of the lanthanide series.</p></section><section><h2>2. Uses & Importance</h2><p>Samarium is used in samarium-cobalt magnets, which are powerful permanent magnets resistant to high temperatures. These are used in electric guitar pickups and high-end headphones. It is also used as a catalyst and as a neutron absorber in nuclear reactors.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.guitar-body{fill:#A1887F}.pickup{fill:#424242;stroke:#212121;stroke-width:1}.string{stroke:#E0E0E0;stroke-width:1;animation:vibrate-string 0.2s infinite}@keyframes vibrate-string{from{transform:translateY(0)}to{transform:translateY(1px)}}</style><path class='guitar-body' d='M20,90 C10,50 40,10 70,20 C100,30 90,80 80,90 Z'/><rect class='pickup' x='50' y='60' width='20' height='5'/><line class='string' x1='60' y1='20' x2='60' y2='90'/></svg>",
      row: 9,
      col: 8,
    },
    {
      name: "Europium",
      symbol: "Eu",
      atomicNumber: 63,
      atomicMass: "151.96",
      group: null,
      period: 6,
      block: "f-block",
      electronic: "[Xe] 4f⁷ 6s²",
      type: "lanthanide",
      specific: "lanthanide",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Eu | <strong>Atomic number:</strong> 63 | <strong>Electronic configuration:</strong> [Xe] 4f⁷ 6s²</p><p>First isolated in 1901, Europium is the most reactive of the rare-earth elements. It is a moderately hard, silvery metal that readily oxidizes in air.</p></section><section><h2>2. Uses & Importance</h2><p>Europium is primarily used as the red phosphor in television screens and fluorescent lamps. This luminescent property makes it valuable for producing colors on screens. It is also used in the anti-counterfeiting phosphors found in Euro banknotes.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.note{fill:#BBDEFB}.red-mark{fill:#F44336;animation:glow-red 2s infinite alternate}.blue-mark{fill:#2196F3;animation:glow-blue 2s infinite alternate;animation-delay:-1s}@keyframes glow-red{to{filter:brightness(1.5)}}@keyframes glow-blue{to{filter:brightness(1.5)}}</style><rect class='note' x='10' y='30' width='80' height='40' rx='3'/><circle class='red-mark' cx='30' cy='50' r='5'/><path class='blue-mark' d='M70,45 L75,55 L65,55 Z'/></svg>",
      row: 9,
      col: 9,
    },
    {
      name: "Gadolinium",
      symbol: "Gd",
      atomicNumber: 64,
      atomicMass: "157.25",
      group: null,
      period: 6,
      block: "f-block",
      electronic: "[Xe] 4f⁷ 5d¹ 6s²",
      type: "lanthanide",
      specific: "lanthanide",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Gd | <strong>Atomic number:</strong> 64 | <strong>Electronic configuration:</strong> [Xe] 4f⁷ 5d¹ 6s²</p><p>Discovered in 1880, Gadolinium is a silvery-white, malleable, and ductile rare-earth element. It is unusual in that it is ferromagnetic at temperatures below 20 °C (68 °F).</p></section><section><h2>2. Uses & Importance</h2><p>Gadolinium compounds are used as intravenous contrast agents for magnetic resonance imaging (MRI) scans, enhancing the images to help doctors diagnose medical conditions. It is also used in neutron therapy and in phosphors for X-ray imaging.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.brain{fill:none;stroke:#F48FB1;stroke-width:2;animation:think 3s infinite ease-in-out}@keyframes think{0%,100%{stroke-dasharray:10,5}50%{stroke-dasharray:5,10}}</style><path class='brain' d='M50,20 C20,20 20,50 40,50 C20,50 20,80 50,80 C80,80 80,50 60,50 C80,50 80,20 50,20 Z'/></svg>",
      row: 9,
      col: 10,
    },
    {
      name: "Terbium",
      symbol: "Tb",
      atomicNumber: 65,
      atomicMass: "158.93",
      group: null,
      period: 6,
      block: "f-block",
      electronic: "[Xe] 4f⁹ 6s²",
      type: "lanthanide",
      specific: "lanthanide",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Tb | <strong>Atomic number:</strong> 65 | <strong>Electronic configuration:</strong> [Xe] 4f⁹ 6s²</p><p>Discovered in 1843, Terbium is a silvery-white, rare-earth metal that is malleable, ductile, and soft enough to be cut with a knife.</p></section><section><h2>2. Uses & Importance</h2><p>Terbium is primarily used in phosphors. When combined with other elements, it fluoresces with a brilliant green color. This property is used in compact fluorescent lamps (CFLs), television screens, and as a security marker in banknotes.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.cfl-tube{fill:none;stroke:#CFD8DC;stroke-width:4}.glow-effect{fill:#A5D6A7;animation:light-on 2s infinite alternate}@keyframes light-on{to{filter:drop-shadow(0 0 5px #C8E6C9)}}</style><path class='cfl-tube' d='M30,80 C30,40 70,40 70,80'/><path class='cfl-tube' d='M30,60 C30,20 70,20 70,60'/><path class='glow-effect' d='M30,80 C30,40 70,40 70,80'/><path class='glow-effect' d='M30,60 C30,20 70,20 70,60'/></svg>",
      row: 9,
      col: 11,
    },
    {
      name: "Dysprosium",
      symbol: "Dy",
      atomicNumber: 66,
      atomicMass: "162.50",
      group: null,
      period: 6,
      block: "f-block",
      electronic: "[Xe] 4f¹⁰ 6s²",
      type: "lanthanide",
      specific: "lanthanide",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Dy | <strong>Atomic number:</strong> 66 | <strong>Electronic configuration:</strong> [Xe] 4f¹⁰ 6s²</p><p>Discovered in 1886, Dysprosium is a rare-earth element with a metallic, bright silver luster. It is relatively stable in air at room temperature.</p></section><section><h2>2. Uses & Importance</h2><p>Dysprosium's main application is in alloys for neodymium magnets. Adding dysprosium makes the magnets more resistant to demagnetization at high temperatures, which is crucial for electric vehicle motors. It is also used in control rods in nuclear reactors.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.car-body{fill:#4FC3F7}.wheel{fill:#424242;transform-origin:center;animation:roll 1s linear infinite}@keyframes roll{to{transform:rotate(360deg)}}</style><path class='car-body' d='M10,70 L20,50 H80 L90,70 Z'/><circle class='wheel' cx='30' cy='70' r='10'/><circle class='wheel' cx='70' cy='70' r='10'/></svg>",
      row: 9,
      col: 12,
    },
    {
      name: "Holmium",
      symbol: "Ho",
      atomicNumber: 67,
      atomicMass: "164.93",
      group: null,
      period: 6,
      block: "f-block",
      electronic: "[Xe] 4f¹¹ 6s²",
      type: "lanthanide",
      specific: "lanthanide",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Ho | <strong>Atomic number:</strong> 67 | <strong>Electronic configuration:</strong> [Xe] 4f¹¹ 6s²</p><p>Discovered in 1878, Holmium is a bright, soft, silvery-white, rare-earth metal. It has the highest magnetic strength of any element.</p></section><section><h2>2. Uses & Importance</h2><p>Holmium is used to create the pole pieces for the strongest static magnets. It is also used in nuclear reactor control rods. Holmium-doped lasers are used in medical procedures, particularly for surgery, because their light is strongly absorbed by water.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.scalpel{fill:#B0BEC5}.blade{fill:#ECEFF1;animation:gleam-blade 2s infinite}@keyframes gleam-blade{50%{filter:brightness(1.5)}}</style><path class='scalpel' d='M10,55 L70,55 L90,50 L70,45 L10,45 Z'/><path class='blade' d='M70,55 L90,50 L70,45 Z'/></svg>",
      row: 9,
      col: 13,
    },
    {
      name: "Erbium",
      symbol: "Er",
      atomicNumber: 68,
      atomicMass: "167.26",
      group: null,
      period: 6,
      block: "f-block",
      electronic: "[Xe] 4f¹² 6s²",
      type: "lanthanide",
      specific: "lanthanide",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Er | <strong>Atomic number:</strong> 68 | <strong>Electronic configuration:</strong> [Xe] 4f¹² 6s²</p><p>Discovered in 1843, Erbium is a bright, silvery rare-earth metal. This lanthanide is solid at room temperature and relatively stable in air.</p></section><section><h2>2. Uses & Importance</h2><p>Erbium's primary use is in fiber optics. When added to glass fibers, it can amplify light signals, forming the backbone of the modern internet. It is also used to give a pink color to glass and in some medical lasers.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.cable{stroke:#78909C;stroke-width:3}.light-signal{fill:#F06292;animation:signal-travel 1s linear infinite}@keyframes signal-travel{from{opacity:0;transform:translateX(0)}50%{opacity:1}to{opacity:0;transform:translateX(80px)}}</style><path class='cable' d='M10,50 H90'/><circle class='light-signal' cx='10' cy='50' r='5'/></svg>",
      row: 9,
      col: 14,
    },
    {
      name: "Thulium",
      symbol: "Tm",
      atomicNumber: 69,
      atomicMass: "168.93",
      group: null,
      period: 6,
      block: "f-block",
      electronic: "[Xe] 4f¹³ 6s²",
      type: "lanthanide",
      specific: "lanthanide",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Tm | <strong>Atomic number:</strong> 69 | <strong>Electronic configuration:</strong> [Xe] 4f¹³ 6s²</p><p>Discovered in 1879, Thulium is the least abundant of the rare-earth elements. It is an easy-to-work, bright, silvery-gray metal.</p></section><section><h2>2. Uses & Importance</h2><p>Thulium has some specialized uses. When bombarded with neutrons, it produces an isotope that emits X-rays, making it useful in portable X-ray devices for medical diagnostics in the field without needing electricity. It is also used in some solid-state lasers.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.xray-source{fill:#757575}.xray-beam{fill:#E1F5FE;opacity:0.6;animation:emit-xray 1.5s infinite}@keyframes emit-xray{from{transform:scaleY(0)}to{transform:scaleY(1)}}</style><circle class='xray-source' cx='50' cy='20' r='10'/><path class='xray-beam' d='M40,20 L20,90 H80 L60,20 Z' style='transform-origin:top'/></svg>",
      row: 9,
      col: 15,
    },
    {
      name: "Ytterbium",
      symbol: "Yb",
      atomicNumber: 70,
      atomicMass: "173.05",
      group: null,
      period: 6,
      block: "f-block",
      electronic: "[Xe] 4f¹⁴ 6s²",
      type: "lanthanide",
      specific: "lanthanide",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Yb | <strong>Atomic number:</strong> 70 | <strong>Electronic configuration:</strong> [Xe] 4f¹⁴ 6s²</p><p>Discovered in 1878, Ytterbium is a soft, malleable, and ductile rare-earth element with a bright silvery luster.</p></section><section><h2>2. Uses & Importance</h2><p>Certain isotopes of ytterbium are used as radiation sources in portable X-ray machines. It is also used to improve the strength of stainless steel. Ytterbium is increasingly used in high-power fiber lasers and has been used in highly accurate atomic clocks.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.steel-bar{fill:url(#grad-steel);stroke:#78909C;stroke-width:1}.glow-bar{fill:#fff;opacity:0;animation:harden 3s infinite}@keyframes harden{50%{opacity:0.3}}</style><defs><linearGradient id='grad-steel' x1='0' y1='0' x2='1' y2='0'><stop offset='0%' stop-color='#B0BEC5'/><stop offset='50%' stop-color='#ECEFF1'/><stop offset='100%' stop-color='#B0BEC5'/></linearGradient></defs><rect class='steel-bar' x='10' y='40' width='80' height='20' rx='3'/><rect class='glow-bar' x='10' y='40' width='80' height='20' rx='3'/></svg>",
      row: 9,
      col: 16,
    },
    {
      name: "Lutetium",
      symbol: "Lu",
      atomicNumber: 71,
      atomicMass: "174.97",
      group: 3,
      period: 6,
      block: "d-block",
      electronic: "[Xe] 4f¹⁴ 5d¹ 6s²",
      type: "lanthanide",
      specific: "lanthanide",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Lu | <strong>Atomic number:</strong> 71 | <strong>Electronic configuration:</strong> [Xe] 4f¹⁴ 5d¹ 6s²</p><p>Discovered in 1907, Lutetium is the last element in the lanthanide series. It is a silvery-white, corrosion-resistant, and relatively hard metal.</p></section><section><h2>2. Uses & Importance</h2><p>Lutetium is one of the rarest and most expensive rare-earth metals, so it has few commercial uses. It is used as a catalyst in cracking petroleum in refineries. Its isotopes can be used to date meteorites and in detectors for PET scans.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.catalyst{fill:#FFD54F;r:5;animation:react 2s infinite}.p1{animation-delay:-0.2s}.p2{animation-delay:-0.4s}.p3{animation-delay:-0.6s}@keyframes react{0%,100%{transform:scale(1)}50%{transform:scale(1.5) rotate(180deg)}}</style><circle class='catalyst p1' cx='30' cy='30'/><circle class='catalyst p2' cx='70' cy='30'/><circle class='catalyst p3' cx='50' cy='70'/></svg>",
      row: 9,
      col: 17,
    },
    {
      name: "Hafnium",
      symbol: "Hf",
      atomicNumber: 72,
      atomicMass: "178.49",
      group: 4,
      period: 6,
      block: "d-block",
      electronic: "[Xe] 4f¹⁴ 5d² 6s²",
      type: "transition-metal",
      specific: "transition-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Hf | <strong>Atomic number:</strong> 72 | <strong>Electronic configuration:</strong> [Xe] 4f¹⁴ 5d² 6s²</p><p>Discovered in 1923, Hafnium is a lustrous, silvery, ductile transition metal. It is chemically very similar to zirconium.</p></section><section><h2>2. Uses & Importance</h2><p>Because of its excellent ability to absorb neutrons, hafnium is used to make control rods for nuclear reactors, particularly in nuclear submarines. It is also used in alloys and in vacuum tubes as a 'getter' to scavenge oxygen and nitrogen.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.submarine{fill:#546E7A;animation:dive 10s infinite ease-in-out}.water{fill:#4FC3F7;opacity:0.5}@keyframes dive{0%,100%{transform:translate(110px,10px)}50%{transform:translate(-10px,0px)}}</style><rect class='water' width='100' height='100'/><path class='submarine' d='M0,50 C20,40 70,40 90,50 L80,60 L10,60 Z'/></svg>",
      row: 6,
      col: 4,
    },
    {
      name: "Tantalum",
      symbol: "Ta",
      atomicNumber: 73,
      atomicMass: "180.95",
      group: 5,
      period: 6,
      block: "d-block",
      electronic: "[Xe] 4f¹⁴ 5d³ 6s²",
      type: "transition-metal",
      specific: "transition-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Ta | <strong>Atomic number:</strong> 73 | <strong>Electronic configuration:</strong> [Xe] 4f¹⁴ 5d³ 6s²</p><p>Discovered in 1802, Tantalum is a rare, hard, blue-gray, lustrous transition metal that is highly corrosion-resistant.</p></section><section><h2>2. Uses & Importance</h2><p>Its main use is in the electronics industry for producing small, reliable tantalum capacitors for mobile phones and laptops. It is also used to make alloys for jet engines and, because it is non-reactive with body fluids, for surgical implants.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.phone-case{fill:#424242}.screen{fill:#81D4FA;animation:notify 3s infinite}@keyframes notify{50%{filter:brightness(1.2)}}</style><rect class='phone-case' x='25' y='10' width='50' height='80' rx='5'/><rect class='screen' x='30' y='15' width='40' height='60'/></svg>",
      row: 6,
      col: 5,
    },
    {
      name: "Tungsten",
      symbol: "W",
      atomicNumber: 74,
      atomicMass: "183.84",
      group: 6,
      period: 6,
      block: "d-block",
      electronic: "[Xe] 4f¹⁴ 5d⁴ 6s²",
      type: "transition-metal",
      specific: "transition-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> W | <strong>Atomic number:</strong> 74 | <strong>Electronic configuration:</strong> [Xe] 4f¹⁴ 5d⁴ 6s²</p><p>Identified in 1781, Tungsten is a hard, rare transition metal. Its symbol, W, comes from 'Wolfram'. It has the highest melting point of all elements.</p></section><section><h2>2. Uses & Importance</h2><p>This high melting point makes it ideal for the filament in incandescent light bulbs. Its hardness and density make it perfect for creating high-strength alloys used in cutting tools, armor-piercing ammunition, and counterweights. Tungsten carbide is an extremely hard compound used for industrial drills.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.bulb-filament{stroke:#FFD54F;stroke-width:2;filter:url(#glow);animation:heat 2s infinite alternate}.bulb-glass{fill:none;stroke:#B0BEC5;stroke-width:1}@keyframes heat{to{stroke:#FFFDE7}}</style><defs><filter id='glow'><feGaussianBlur stdDeviation='1.5' result='coloredBlur'/><feMerge><feMergeNode in='coloredBlur'/><feMergeNode in='SourceGraphic'/></feMerge></filter></defs><path class='bulb-filament' d='M40,50 C42,45 48,45 50,50 S 58,55 60,50'/><path class='bulb-glass' d='M30,80 C10,80 10,40 50,20 C90,40 90,80 70,80 Z'/></svg>",
      row: 6,
      col: 6,
    },
    {
      name: "Rhenium",
      symbol: "Re",
      atomicNumber: 75,
      atomicMass: "186.21",
      group: 7,
      period: 6,
      block: "d-block",
      electronic: "[Xe] 4f¹⁴ 5d⁵ 6s²",
      type: "transition-metal",
      specific: "transition-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Re | <strong>Atomic number:</strong> 75 | <strong>Electronic configuration:</strong> [Xe] 4f¹⁴ 5d⁵ 6s²</p><p>Discovered in 1925, Rhenium is a silvery-white, heavy, rare transition metal. It has one of the highest melting points of all elements.</p></section><section><h2>2. Uses & Importance</h2><p>This extreme heat resistance makes rhenium a critical component of high-temperature superalloys used in jet engine parts like turbine blades. It is also used as a catalyst in the petroleum industry for making high-octane, lead-free gasoline.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.jet-engine{fill:#78909C}.turbine{fill:#B0BEC5;transform-origin:center;animation:spin-turbine 0.5s linear infinite}@keyframes spin-turbine{to{transform:rotate(360deg)}}</style><path class='jet-engine' d='M10,30 H70 L90,20 V80 L70,70 H10 Z'/><g class='turbine' transform='translate(25 50) scale(0.4)'><path d='M50,20 L55,25 L55,35 L60,40 L60,50 L55,55 L55,65 L50,70 L45,65 L45,55 L40,50 L40,40 L45,35 L45,25 Z'/></g></svg>",
      row: 6,
      col: 7,
    },
    {
      name: "Osmium",
      symbol: "Os",
      atomicNumber: 76,
      atomicMass: "190.23",
      group: 8,
      period: 6,
      block: "d-block",
      electronic: "[Xe] 4f¹⁴ 5d⁶ 6s²",
      type: "transition-metal",
      specific: "transition-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Os | <strong>Atomic number:</strong> 76 | <strong>Electronic configuration:</strong> [Xe] 4f¹⁴ 5d⁶ 6s²</p><p>Discovered in 1803, Osmium is a hard, brittle, bluish-white transition metal in the platinum group. It is the densest naturally occurring element.</p></section><section><h2>2. Uses & Importance</h2><p>Because of its extreme hardness, osmium is used in alloys to make durable, wear-resistant machine parts. It is used in the tips of fountain pens, instrument pivots, and electrical contacts, where resistance to wear is critical.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.pen-body{fill:#424242}.pen-nib{fill:#FFD700}.ink-line{fill:none;stroke:#0D47A1;stroke-width:2;stroke-dasharray:100;animation:write 3s ease-out infinite}@keyframes write{from{stroke-dashoffset:100}to{stroke-dashoffset:0}}</style><path class='pen-body' d='M70,10 L30,50 L50,70 L90,30 Z'/><path class='pen-nib' d='M30,50 L25,55 L35,65 L40,60 Z'/><path class='ink-line' d='M20,80 C 40,70 60,90 80,80'/></svg>",
      row: 6,
      col: 8,
    },
    {
      name: "Iridium",
      symbol: "Ir",
      atomicNumber: 77,
      atomicMass: "192.22",
      group: 9,
      period: 6,
      block: "d-block",
      electronic: "[Xe] 4f¹⁴ 5d⁷ 6s²",
      type: "transition-metal",
      specific: "transition-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Ir | <strong>Atomic number:</strong> 77 | <strong>Electronic configuration:</strong> [Xe] 4f¹⁴ 5d⁷ 6s²</p><p>Discovered in 1803, Iridium is a very hard, brittle, silvery-white transition metal. It is the most corrosion-resistant metal known.</p></section><section><h2>2. Uses & Importance</h2><p>Iridium is used in high-performance alloys, crucibles for growing crystals, and spark plugs for aircraft. The layer of iridium found in the Earth's crust is cited as evidence for a massive asteroid impact that may have caused the extinction of the dinosaurs.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.meteor{fill:#795548;animation:fly-by 4s linear infinite}.tail{fill:url(#grad-tail);animation:fly-by 4s linear infinite;animation-delay:-0.05s}@keyframes fly-by{from{transform:translate(-20px,20px)}to{transform:translate(120px,-120px)}}</style><defs><linearGradient id='grad-tail' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='#FFEB3B'/><stop offset='100%' stop-color='rgba(255,235,59,0)'/></linearGradient></defs><circle class='meteor' cx='50' cy='50' r='10'/><path class='tail' d='M50,50 L20,80 L30,70 Z'/></svg>",
      row: 6,
      col: 9,
    },
    {
      name: "Platinum",
      symbol: "Pt",
      atomicNumber: 78,
      atomicMass: "195.08",
      group: 10,
      period: 6,
      block: "d-block",
      electronic: "[Xe] 4f¹⁴ 5d⁹ 6s¹",
      type: "transition-metal",
      specific: "transition-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Pt | <strong>Atomic number:</strong> 78 | <strong>Electronic configuration:</strong> [Xe] 4f¹⁴ 5d⁹ 6s¹</p><p>Platinum is a dense, malleable, ductile, highly unreactive, precious, silvery-white transition metal. It is one of the rarest elements in the Earth's crust.</p></section><section><h2>2. Uses & Importance</h2><p>Platinum is highly valued in jewelry. Its primary use, however, is as a catalyst in catalytic converters for vehicles. It is also used in laboratory equipment, electrical contacts, and medical/dental applications.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.ring-band{fill:#E0E0E0;stroke:#BDBDBD;stroke-width:1}.gem{fill:#03A9F4;stroke:#01579B;stroke-width:1.5;animation:sparkle-gem 2s infinite}@keyframes sparkle-gem{50%{filter:brightness(1.5)}}</style><circle class='ring-band' cx='50' cy='60' r='30' fill='none' stroke-width='8'/><path class='gem' d='M50,10 L70,30 L50,50 L30,30 Z'/></svg>",
      row: 6,
      col: 10,
    },
    {
      name: "Gold",
      symbol: "Au",
      atomicNumber: 79,
      atomicMass: "196.97",
      group: 11,
      period: 6,
      block: "d-block",
      electronic: "[Xe] 4f¹⁴ 5d¹⁰ 6s¹",
      type: "transition-metal",
      specific: "transition-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Au | <strong>Atomic number:</strong> 79 | <strong>Electronic configuration:</strong> [Xe] 4f¹⁴ 5d¹⁰ 6s¹</p><p>Gold is a bright, reddish-yellow, dense, soft, malleable, and ductile metal. Its symbol, Au, comes from 'aurum'. It has been a highly sought-after precious metal throughout history.</p></section><section><h2>2. Uses & Importance</h2><p>Besides jewelry and finance, gold is an excellent conductor and does not tarnish, making it essential for high-end electronics connectors. It is also used in dentistry and for coating spacecraft components.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.gold-bar{fill:#FFD700;stroke:#FFA000;stroke-width:1.5}.shine-line{fill:none;stroke:#FFFDE7;stroke-width:3;stroke-linecap:round;opacity:0;animation:sweep-shine 3s infinite}@keyframes sweep-shine{0%{opacity:0;transform:translateX(0)}50%{opacity:0.8;transform:translateX(40px)}100%{opacity:0;transform:translateX(80px)}}</style><path class='gold-bar' d='M10,70 l20,-20 h60 l-20,20 z'/><path class='gold-bar' d='M10,70 v-20 l20,-20 v20 z'/><path class='gold-bar' d='M90,70 v-20 l-20,-20 v20 z'/><line class='shine-line' x1='20' y1='35' x2='20' y2='65'/></svg>",
      row: 6,
      col: 11,
    },
    {
      name: "Mercury",
      symbol: "Hg",
      atomicNumber: 80,
      atomicMass: "200.59",
      group: 12,
      period: 6,
      block: "d-block",
      electronic: "[Xe] 4f¹⁴ 5d¹⁰ 6s²",
      type: "transition-metal",
      specific: "transition-metal",
      physical: "Liquid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Hg | <strong>Atomic number:</strong> 80 | <strong>Electronic configuration:</strong> [Xe] 4f¹⁴ 5d¹⁰ 6s²</p><p>Also known as quicksilver, Mercury is the only metallic element that is liquid at standard conditions. Its symbol, Hg, comes from 'hydrargyrum' (water-silver).</p></section><section><h2>2. Uses & Importance</h2><p>Mercury's uniform expansion with temperature made it ideal for thermometers and barometers. It is used in fluorescent lamps. However, mercury is highly toxic, and many of its former uses are being phased out.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.thermo-tube{fill:none;stroke:#B0BEC5;stroke-width:3}.liquid-hg{fill:#F44336;animation:rise-hg 3s infinite alternate}@keyframes rise-hg{to{transform:translateY(-40px)}}</style><circle cx='50' cy='85' r='15' fill='#F44336'/><path class='thermo-tube' d='M50,85 V10'/><rect class='liquid-hg' x='47' y='45' width='6' height='40'/></svg>",
      row: 6,
      col: 12,
    },
    {
      name: "Thallium",
      symbol: "Tl",
      atomicNumber: 81,
      atomicMass: "204.38",
      group: 13,
      period: 6,
      block: "p-block",
      electronic: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹",
      type: "post-transition-metal",
      specific: "post-transition-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Tl | <strong>Atomic number:</strong> 81 | <strong>Electronic configuration:</strong> [Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹</p><p>Discovered in 1861, Thallium is a soft, gray post-transition metal. When exposed to air, it develops a bluish-gray tinge.</p></section><section><h2>2. Uses & Importance</h2><p>Thallium compounds were once used as rat poison but are now banned in many countries due to toxicity. Its main applications are in the electronics industry for specialized semiconductor materials used in infrared detectors and in low-temperature thermometers.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.camera-body{fill:#616161}.lens{fill:#212121}.ir-glow{fill:#E53935;opacity:0;animation:ir-detect 2s infinite}@keyframes ir-detect{50%{opacity:0.7}}</style><rect class='camera-body' x='20' y='30' width='60' height='40' rx='5'/><circle class='lens' cx='50' cy='50' r='15'/><circle class='ir-glow' cx='50' cy='50' r='5'/></svg>",
      row: 6,
      col: 13,
    },
    {
      name: "Lead",
      symbol: "Pb",
      atomicNumber: 82,
      atomicMass: "207.2",
      group: 14,
      period: 6,
      block: "p-block",
      electronic: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²",
      type: "post-transition-metal",
      specific: "post-transition-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Pb | <strong>Atomic number:</strong> 82 | <strong>Electronic configuration:</strong> [Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²</p><p>Known since antiquity, Lead is a heavy, soft, and malleable post-transition metal. Its symbol, Pb, comes from the Latin 'plumbum'.</p></section><section><h2>2. Uses & Importance</h2><p>The single largest use of lead today is in lead-acid batteries. Because of its density, it is used as a shield against X-rays and gamma rays. Its use in paints and gasoline has been phased out due to its toxicity.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.battery-case{fill:#455A64}.terminal{fill:#F44336}.terminal2{fill:#2196F3}.lightning{stroke:#FFEB3B;stroke-width:3;opacity:0;animation:spark-it 2s infinite ease-out;animation-delay:-1s}@keyframes spark-it{0%{opacity:1;transform:scale(0.5)}100%{opacity:0;transform:scale(1.5)}}</style><rect class='battery-case' x='20' y='30' width='60' height='50' rx='3'/><rect class='terminal' x='30' y='20' width='10' height='10'/><rect class='terminal2' x='60' y='20' width='10' height='10'/><path class='lightning' d='M45,30 L55,50 L45,50 L55,70'/></svg>",
      row: 6,
      col: 14,
    },
    {
      name: "Bismuth",
      symbol: "Bi",
      atomicNumber: 83,
      atomicMass: "208.98",
      group: 15,
      period: 6,
      block: "p-block",
      electronic: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³",
      type: "post-transition-metal",
      specific: "post-transition-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Bi | <strong>Atomic number:</strong> 83 | <strong>Electronic configuration:</strong> [Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³</p><p>Bismuth is a brittle post-transition metal with a silvery-white color and a reddish tinge. It has a uniquely low thermal conductivity.</p></section><section><h2>2. Uses & Importance</h2><p>Bismuth is used in low-melting-point alloys for solder and fire sprinklers. Its compounds are used in cosmetics for a pearly effect. Bismuth subsalicylate (Pepto-Bismol) is used as an antacid and anti-diarrheal medicine.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.crystal{stroke-width:2;fill-opacity:0.7;animation:color-shift 5s infinite alternate;transform-origin:center}.c1{fill:#F48FB1;stroke:#D81B60}.c2{fill:#80DEEA;stroke:#0097A7}.c3{fill:#FFE082;stroke:#F9A825}@keyframes color-shift{to{transform:rotate(360deg)}}</style><path class='crystal c1' d='M50,50 L20,30 L50,10 Z'/><path class='crystal c2' d='M50,50 L80,30 L50,10 Z'/><path class='crystal c3' d='M50,50 L20,30 L50,90 L80,30 Z'/></svg>",
      row: 6,
      col: 15,
    },
    {
      name: "Polonium",
      symbol: "Po",
      atomicNumber: 84,
      atomicMass: "(209)",
      group: 16,
      period: 6,
      block: "p-block",
      electronic: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴",
      type: "post-transition-metal",
      specific: "post-transition-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Po | <strong>Atomic number:</strong> 84 | <strong>Atomic mass:</strong> (209)</p><p>Discovered by Marie and Pierre Curie in 1898, Polonium is a rare and highly radioactive metalloid.</p></section><section><h2>2. Uses & Importance</h2><p>Polonium is intensely radioactive. It has been used as a source of alpha particles and as a lightweight heat source for thermoelectric generators in space probes. It is also used in anti-static brushes to eliminate static cling.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.atom-core{fill:#673AB7}.alpha-particle{fill:#FFC107;animation:emit 2s ease-out infinite;opacity:0}@keyframes emit{0%{opacity:1;transform:translate(0,0)}100%{opacity:0;transform:translate(40px,-40px)}}</style><circle class='atom-core' cx='50' cy='50' r='10'/><circle class='alpha-particle' cx='50' cy='50' r='5'/></svg>",
      row: 6,
      col: 16,
    },
    {
      name: "Astatine",
      symbol: "At",
      atomicNumber: 85,
      atomicMass: "(210)",
      group: 17,
      period: 6,
      block: "p-block",
      electronic: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵",
      type: "metalloid",
      specific: "metalloid",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> At | <strong>Atomic number:</strong> 85 | <strong>Atomic mass:</strong> (210)</p><p>First synthesized in 1940, Astatine is the rarest naturally occurring element. It is a highly radioactive halogen. Any visible-sized sample would be immediately vaporized by its own heat.</p></section><section><h2>2. Uses & Importance</h2><p>Due to its extreme rarity and intense radioactivity, astatine has no commercial applications. It is of academic interest only. Its isotopes are being studied for potential use in targeted alpha-particle therapy for treating cancer.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.target-cell{fill:#EF9A9A;stroke:#C62828;stroke-width:2}.alpha-beam{fill:#9575CD;opacity:0;animation:hit-target 1.5s infinite}@keyframes hit-target{0%{transform:translate(-30px,30px);opacity:0}50%{opacity:1}100%{transform:translate(0,0);opacity:0}}</style><circle class='target-cell' cx='70' cy='30' r='10'/><circle class='alpha-beam' cx='70' cy='30' r='5'/></svg>",
      row: 6,
      col: 17,
    },
    {
      name: "Radon",
      symbol: "Rn",
      atomicNumber: 86,
      atomicMass: "(222)",
      group: 18,
      period: 6,
      block: "p-block",
      electronic: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶",
      type: "noble-gas",
      specific: "noble-gas",
      physical: "Gas",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Rn | <strong>Atomic number:</strong> 86 | <strong>Atomic mass:</strong> (222)</p><p>Discovered in 1900, Radon is a radioactive, colorless, odorless, tasteless noble gas. It is one of the densest substances that remains a gas under normal conditions.</p></section><section><h2>2. Uses & Importance</h2><p>Radon is a significant environmental hazard as it can accumulate in buildings, and it is a leading cause of lung cancer. Historically, it was used in radiotherapy, but this has been replaced by safer alternatives. Today, its use is confined to scientific research.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.house{fill:#A1887F}.window{fill:#E1F5FE}.radon-gas{fill:#9C27B0;opacity:0.6;r:3;animation:seep-in 5s linear infinite}@keyframes seep-in{from{transform:translate(0,20px);opacity:0}to{transform:translate(0,-80px);opacity:1}}</style><path class='house' d='M10,90 V40 L50,10 L90,40 V90 H10 Z'/><rect class='window' x='35' y='50' width='30' height='20'/><circle class='radon-gas' cx='50' cy='90'/><circle class='radon-gas' cx='40' cy='90' style='animation-delay:-1s'/><circle class='radon-gas' cx='60' cy='90' style='animation-delay:-2s'/></svg>",
      row: 6,
      col: 18,
    },
    {
      name: "Francium",
      symbol: "Fr",
      atomicNumber: 87,
      atomicMass: "(223)",
      group: 1,
      period: 7,
      block: "s-block",
      electronic: "[Rn] 7s¹",
      type: "alkali-metal",
      specific: "alkali-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Fr | <strong>Atomic number:</strong> 87 | <strong>Atomic mass:</strong> (223)</p><p>Discovered in 1939, Francium is the second-rarest naturally occurring element. It is an extremely radioactive alkali metal. Any visible amount would immediately vaporize from its own decay heat.</p></section><section><h2>2. Uses & Importance</h2><p>Because it is so rare and unstable (half-life of only 22 minutes), francium has no commercial applications. It is used only for research purposes in the fields of chemistry and atomic structure.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.flask-q{fill:none;stroke:#78909C;stroke-width:3}.q-mark{font-family:serif;font-size:60px;fill:#F44336;animation:fade-q 2s infinite alternate}@keyframes fade-q{from{opacity:0.2}to{opacity:1}}</style><circle class='flask-q' cx='50' cy='50' r='40'/><text class='q-mark' x='50' y='65' text-anchor='middle'>?</text></svg>",
      row: 7,
      col: 1,
    },
    {
      name: "Radium",
      symbol: "Ra",
      atomicNumber: 88,
      atomicMass: "(226)",
      group: 2,
      period: 7,
      block: "s-block",
      electronic: "[Rn] 7s²",
      type: "alkaline-earth-metal",
      specific: "alkaline-earth-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Ra | <strong>Atomic number:</strong> 88 | <strong>Atomic mass:</strong> (226)</p><p>Discovered by Marie and Pierre Curie in 1898, Radium is a nearly pure-white alkaline earth metal, but it readily oxidizes on exposure to air, turning black. It is intensely radioactive.</p></section><section><h2>2. Uses & Importance</h2><p>Historically, radium was famous for its use in self-luminous paints for watch dials. This was stopped after the health risks became known. Today, it has been almost entirely replaced by safer and more effective radioisotopes for medical and industrial use.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.hand{stroke:#BDBDBD;stroke-width:4;transform-origin:center;animation:move-hand 5s linear infinite}.watch-face{fill:none;stroke:#757575;stroke-width:2}.marker-glow{fill:#AED581;filter:drop-shadow(0 0 2px #C5E1A5);animation:glow-old 3s infinite alternate}@keyframes move-hand{to{transform:rotate(360deg)}}@keyframes glow-old{from{opacity:0.5}to{opacity:0.8}}</style><circle class='watch-face' cx='50' cy='50' r='30'/><circle class='marker-glow' cx='50' cy='25' r='2'/><line class='hand' x1='50' y1='50' x2='50' y2='30'/></svg>",
      row: 7,
      col: 2,
    },
    {
      name: "Actinium",
      symbol: "Ac",
      atomicNumber: 89,
      atomicMass: "(227)",
      group: 3,
      period: 7,
      block: "f-block",
      electronic: "[Rn] 6d¹ 7s²",
      type: "actinide",
      specific: "actinide",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Ac | <strong>Atomic number:</strong> 89 | <strong>Atomic mass:</strong> (227)</p><p>Discovered in 1899, Actinium is a soft, silvery-white radioactive metal that glows faintly blue in the dark. It is the first element of the actinide series.</p></section><section><h2>2. Uses & Importance</h2><p>Actinium is about 150 times as radioactive as radium, making it valuable as a source of neutrons. It has very few industrial applications due to its scarcity, but has been studied for use in targeted alpha therapy for cancer treatment.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.neutron{fill:#81D4FA;animation:emit-neutron 1s ease-out infinite}.source{fill:#673AB7;filter:drop-shadow(0 0 5px #B39DDB)}@keyframes emit-neutron{0%{transform:translate(0,0) scale(1);opacity:1}100%{transform:translate(40px,-40px) scale(0.5);opacity:0}}</style><circle class='source' cx='50' cy='50' r='10'/><circle class='neutron' cx='50' cy='50' r='4' style='animation-delay:-0.2s;transform:rotate(45deg)'/><circle class='neutron' cx='50' cy='50' r='4' style='animation-delay:-0.4s;transform:rotate(135deg)'/><circle class='neutron' cx='50' cy='50' r='4' style='animation-delay:-0.6s;transform:rotate(225deg)'/><circle class='neutron' cx='50' cy='50' r='4' style='animation-delay:-0.8s;transform:rotate(315deg)'/></svg>",
      row: 10,
      col: 3,
    },
    {
      name: "Thorium",
      symbol: "Th",
      atomicNumber: 90,
      atomicMass: "232.04",
      group: null,
      period: 7,
      block: "f-block",
      electronic: "[Rn] 6d² 7s²",
      type: "actinide",
      specific: "actinide",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Th | <strong>Atomic number:</strong> 90 | <strong>Electronic configuration:</strong> [Rn] 6d² 7s²</p><p>Discovered in 1829, Thorium is a weakly radioactive metallic chemical element. It is silvery and tarnishes black when exposed to air. It is about 3-4 times more abundant than uranium.</p></section><section><h2>2. Uses & Importance</h2><p>Thorium has been explored as a potentially safer nuclear fuel than uranium. It has also been used in gas mantles for lanterns, as an alloying agent to strengthen magnesium, and in high-quality camera lenses.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.lantern-body{fill:#A1887F}.mantle{fill:#FFFDE7;filter:drop-shadow(0 0 5px #FFF);animation:lantern-glow 3s infinite alternate}@keyframes lantern-glow{from{opacity:0.7}to{opacity:1}}</style><path class='lantern-body' d='M20,90 H80 V80 Q80,70 70,70 H30 Q20,70 20,80 Z'/><rect class='lantern-body' x='45' y='10' width='10' height='20'/><path class='lantern-body' d='M30,30 H70 L80,70 H20 Z'/><circle class='mantle' cx='50' cy='50' r='15'/></svg>",
      row: 10,
      col: 4,
    },
    {
      name: "Protactinium",
      symbol: "Pa",
      atomicNumber: 91,
      atomicMass: "231.04",
      group: null,
      period: 7,
      block: "f-block",
      electronic: "[Rn] 5f² 6d¹ 7s²",
      type: "actinide",
      specific: "actinide",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Pa | <strong>Atomic number:</strong> 91 | <strong>Electronic configuration:</strong> [Rn] 5f² 6d¹ 7s²</p><p>First identified in 1913, Protactinium is a dense, silvery-gray radioactive actinide metal. It is one of the rarest and most expensive naturally occurring elements.</p></section><section><h2>2. Uses & Importance</h2><p>Due to its scarcity and high radioactivity, there are currently no uses for protactinium outside of basic scientific research, particularly in geochemistry to study ocean sediments.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.sediment-layer{stroke-width:10;animation:deposit 8s linear infinite}.l1{stroke:#C5E1A5}.l2{stroke:#FFCC80}.l3{stroke:#A1887F}@keyframes deposit{from{transform:translateY(30px)}to{transform:translateY(0px)}}</style><line class='sediment-layer l1' x1='0' y1='85' x2='100' y2='85'/><line class='sediment-layer l2' x1='0' y1='75' x2='100' y2='75' style='animation-delay:-2s'/><line class='sediment-layer l3' x1='0' y1='65' x2='100' y2='65' style='animation-delay:-4s'/></svg>",
      row: 10,
      col: 5,
    },
    {
      name: "Uranium",
      symbol: "U",
      atomicNumber: 92,
      atomicMass: "238.03",
      group: null,
      period: 7,
      block: "f-block",
      electronic: "[Rn] 5f³ 6d¹ 7s²",
      type: "actinide",
      specific: "actinide",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> U | <strong>Atomic number:</strong> 92 | <strong>Electronic configuration:</strong> [Rn] 5f³ 6d¹ 7s²</p><p>Discovered in 1789, Uranium is a silvery-gray metallic, weakly radioactive element. It is best known for its role in nuclear energy and weapons.</p></section><section><h2>2. Uses & Importance</h2><p>The isotope uranium-235 is the only naturally occurring fissile isotope, meaning it can sustain a nuclear chain reaction. This property is harnessed to generate electricity in nuclear power plants. Highly enriched uranium is used in nuclear weapons. Depleted uranium is very dense and used in armor plating.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.symbol-bg{fill:#FFEB3B}.symbol-shape{fill:#212121;animation:rotate-symbol 5s linear infinite}@keyframes rotate-symbol{to{transform:rotate(360deg)}}</style><circle class='symbol-bg' cx='50' cy='50' r='40'/><g class='symbol-shape' style='transform-origin:center'><path d='M50,20 a 30,30 0 1,1 -26,15'/><path d='M50,20 a 30,30 0 1,1 -26,15' transform='rotate(120 50 50)'/><path d='M50,20 a 30,30 0 1,1 -26,15' transform='rotate(240 50 50)'/></g><circle cx='50' cy='50' r='8' fill='#212121'/></svg>",
      row: 10,
      col: 6,
    },
    {
      name: "Neptunium",
      symbol: "Np",
      atomicNumber: 93,
      atomicMass: "(237)",
      group: null,
      period: 7,
      block: "f-block",
      electronic: "[Rn] 5f⁴ 6d¹ 7s²",
      type: "actinide",
      specific: "actinide",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Np | <strong>Atomic number:</strong> 93 | <strong>Atomic mass:</strong> (237)</p><p>First synthesized in 1940, Neptunium is a hard, silvery, ductile, radioactive actinide metal. It is the first transuranic element.</p></section><section><h2>2. Uses & Importance</h2><p>Neptunium is primarily a byproduct of nuclear reactors. Its main use is as a precursor in the production of plutonium-238, which is used as a heat source in radioisotope thermoelectric generators (RTGs) for deep space probes like Voyager.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.probe-body{fill:#B0BEC5}.dish{fill:#78909C}.signal{stroke:#FFC107;stroke-width:2;stroke-dasharray:2,3;opacity:0;animation:send-signal 3s infinite}@keyframes send-signal{0%{opacity:1;transform:scaleX(0)}100%{opacity:0;transform:scaleX(1)}}</style><rect class='probe-body' x='20' y='45' width='30' height='10'/><path class='dish' d='M50,40 C70,40 70,60 50,60 Z'/><g transform='translate(50,50)'><path class='signal' d='M0,0 H40'/></g></svg>",
      row: 10,
      col: 7,
    },
    {
      name: "Plutonium",
      symbol: "Pu",
      atomicNumber: 94,
      atomicMass: "(244)",
      group: null,
      period: 7,
      block: "f-block",
      electronic: "[Rn] 5f⁶ 7s²",
      type: "actinide",
      specific: "actinide",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Pu | <strong>Atomic number:</strong> 94 | <strong>Atomic mass:</strong> (244)</p><p>First synthesized in 1940, Plutonium is a silvery-gray, radioactive actinide metal that tarnishes when exposed to air.</p></section><section><h2>2. Uses & Importance</h2><p>Plutonium-239 is a key fissile component in modern nuclear weapons. Plutonium-238 is used as a long-lived heat source in RTGs, which power spacecraft like the Mars rovers (Curiosity, Perseverance) and deep-space probes (New Horizons).</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.rover-body{fill:#A1887F}.rover-wheel{fill:#5D4037;animation:roll-rover 4s linear infinite}@keyframes roll-rover{to{transform:rotate(360deg)}}</style><rect class='rover-body' x='20' y='50' width='60' height='20' rx='3'/><g class='rover-wheel' style='transform-origin:30px 70px'><circle cx='30' cy='70' r='8'/></g><g class='rover-wheel' style='transform-origin:70px 70px'><circle cx='70' cy='70' r='8'/></g></svg>",
      row: 10,
      col: 8,
    },
    {
      name: "Americium",
      symbol: "Am",
      atomicNumber: 95,
      atomicMass: "(243)",
      group: null,
      period: 7,
      block: "f-block",
      electronic: "[Rn] 5f⁷ 7s²",
      type: "actinide",
      specific: "actinide",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Am | <strong>Atomic number:</strong> 95 | <strong>Atomic mass:</strong> (243)</p><p>First synthesized in 1944, Americium is a silvery-white, radioactive actinide metal.</p></section><section><h2>2. Uses & Importance</h2><p>Its most widespread application is in commercial ionization-type smoke detectors. A small amount of americium-241 is used as a source of alpha particles. When smoke enters, it disrupts the flow of ions and triggers the alarm. It is also used in industrial gauges.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.detector-case{fill:#FAFAFA;stroke:#E0E0E0;stroke-width:2}.smoke-particle{fill:#757575;r:4;animation:float-up 3s linear infinite;opacity:0}@keyframes float-up{0%{transform:translateY(0);opacity:1}100%{transform:translateY(-40px);opacity:0}}</style><circle class='detector-case' cx='50' cy='50' r='30'/><circle class='smoke-particle' cx='50' cy='80'/><circle class='smoke-particle' cx='45' cy='85' style='animation-delay:-1s'/><circle class='smoke-particle' cx='55' cy='82' style='animation-delay:-2s'/></svg>",
      row: 10,
      col: 9,
    },
    {
      name: "Curium",
      symbol: "Cm",
      atomicNumber: 96,
      atomicMass: "(247)",
      group: null,
      period: 7,
      block: "f-block",
      electronic: "[Rn] 5f⁷ 6d¹ 7s²",
      type: "actinide",
      specific: "actinide",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Cm | <strong>Atomic number:</strong> 96 | <strong>Atomic mass:</strong> (247)</p><p>First synthesized in 1944, Curium is a hard, dense, silvery, radioactive actinide metal named after Marie and Pierre Curie.</p></section><section><h2>2. Uses & Importance</h2><p>Curium is a potent source of alpha particles, making it useful as a power source for RTGs on spacecraft. It has also been used in the Alpha Proton X-ray Spectrometer (APXS) instrument on several Mars rovers to analyze rocks.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.rock{fill:#8D6E63}.laser-dot{fill:#F44336;r:3;animation:analyze 2s infinite}@keyframes analyze{0%,100%{transform:scale(1)}50%{transform:scale(2)}}</style><path class='rock' d='M20,80 C10,70 30,40 50,50 C70,40 90,70 80,80 Z'/><circle class='laser-dot' cx='50' cy='65'/></svg>",
      row: 10,
      col: 10,
    },
    {
      name: "Berkelium",
      symbol: "Bk",
      atomicNumber: 97,
      atomicMass: "(247)",
      group: null,
      period: 7,
      block: "f-block",
      electronic: "[Rn] 5f⁹ 7s²",
      type: "actinide",
      specific: "actinide",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Bk | <strong>Atomic number:</strong> 97 | <strong>Atomic mass:</strong> (247)</p><p>First synthesized in 1949 in Berkeley, California, Berkelium is a soft, silvery-white, radioactive actinide metal.</p></section><section><h2>2. Uses & Importance</h2><p>Due to the small amounts ever produced and its high radioactivity, berkelium currently has no uses outside of basic scientific research. Its primary significance is as a target material for synthesizing even heavier, undiscovered elements.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.target-atom{fill:#4DD0E1;stroke:#00ACC1;stroke-width:2}.particle-beam{fill:#FF7043;animation:collide 1s ease-in infinite}@keyframes collide{to{transform:translateX(25px);opacity:0}}</style><circle class='target-atom' cx='60' cy='50' r='15'/><circle class='particle-beam' cx='20' cy='50' r='5'/></svg>",
      row: 10,
      col: 11,
    },
    {
      name: "Californium",
      symbol: "Cf",
      atomicNumber: 98,
      atomicMass: "(251)",
      group: null,
      period: 7,
      block: "f-block",
      electronic: "[Rn] 5f¹⁰ 7s²",
      type: "actinide",
      specific: "actinide",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Cf | <strong>Atomic number:</strong> 98 | <strong>Atomic mass:</strong> (251)</p><p>First synthesized in 1950 in California, Californium is a radioactive actinide metal.</p></section><section><h2>2. Uses & Importance</h2><p>Californium is a very strong neutron emitter. This makes it useful for starting up nuclear reactors, as a neutron source for identifying gold and silver ores, and in devices that scan airline luggage for explosives.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.suitcase{fill:#6D4C41;stroke:#3E2723;stroke-width:2}.scan-line{stroke:#4CAF50;stroke-width:3;animation:scan-item 2s linear infinite}@keyframes scan-item{from{transform:translateX(-20px)}to{transform:translateX(100px)}}</style><rect class='suitcase' x='20' y='30' width='60' height='40' rx='5'/><line class='scan-line' x1='0' y1='50' x2='20' y2='50'/></svg>",
      row: 10,
      col: 12,
    },
    {
      name: "Einsteinium",
      symbol: "Es",
      atomicNumber: 99,
      atomicMass: "(252)",
      group: null,
      period: 7,
      block: "f-block",
      electronic: "[Rn] 5f¹¹ 7s²",
      type: "actinide",
      specific: "actinide",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Es | <strong>Atomic number:</strong> 99 | <strong>Atomic mass:</strong> (252)</p><p>Discovered in the debris of the first hydrogen bomb explosion in 1952, Einsteinium is a synthetic, highly radioactive actinide metal named after Albert Einstein.</p></section><section><h2>2. Uses & Importance</h2><p>Einsteinium has no uses outside of basic scientific research. It has been used as a target to produce even heavier elements, such as the synthesis of Mendelevium in 1955.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.mushroom-cloud-stalk{fill:#FFB74D}.mushroom-cloud-top{fill:#FF9800;animation:expand 2s ease-out infinite}@keyframes expand{from{transform:scale(0.5);opacity:0}to{transform:scale(1);opacity:1}}</style><rect class='mushroom-cloud-stalk' x='45' y='50' width='10' height='40'/><circle class='mushroom-cloud-top' cx='50' cy='50' r='30'/></svg>",
      row: 10,
      col: 13,
    },
    {
      name: "Fermium",
      symbol: "Fm",
      atomicNumber: 100,
      atomicMass: "(257)",
      group: null,
      period: 7,
      block: "f-block",
      electronic: "[Rn] 5f¹² 7s²",
      type: "actinide",
      specific: "actinide",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Fm | <strong>Atomic number:</strong> 100 | <strong>Atomic mass:</strong> (257)</p><p>Discovered in the debris of the first hydrogen bomb test in 1952, Fermium is a synthetic, radioactive actinide metal named after Enrico Fermi.</p></section><section><h2>2. Uses & Importance</h2><p>Fermium is only produced in minuscule amounts and has a very short half-life. It has not been prepared in bulk. Because of this, it has no applications outside of fundamental scientific research.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.particle-track{fill:none;stroke:#FFEB3B;stroke-width:2;stroke-dasharray:3,5;animation:fade-track 2s linear infinite}@keyframes fade-track{from{opacity:1}to{opacity:0}}</style><path class='particle-track' d='M20,80 C 40,20 80,60 90,20'/></svg>",
      row: 10,
      col: 14,
    },
    {
      name: "Mendelevium",
      symbol: "Md",
      atomicNumber: 101,
      atomicMass: "(258)",
      group: null,
      period: 7,
      block: "f-block",
      electronic: "[Rn] 5f¹³ 7s²",
      type: "actinide",
      specific: "actinide",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Md | <strong>Atomic number:</strong> 101 | <strong>Atomic mass:</strong> (258)</p><p>First synthesized in 1955, Mendelevium is a synthetic, radioactive actinide metal named after Dmitri Mendeleev, father of the periodic table.</p></section><section><h2>2. Uses & Importance</h2><p>Only trace amounts of mendelevium have ever been produced, and it is used exclusively for scientific research. Studying its properties helps scientists understand the chemical behavior of the final elements in the actinide series.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.table-grid{stroke:#BDBDBD;stroke-width:1}.element-box{fill:#CFD8DC;animation:place-element 2s ease-in-out infinite}@keyframes place-element{50%{fill:#4CAF50}}</style><path class='table-grid' d='M20,20 H80 V80 H20 Z M20,40 H80 M20,60 H80 M40,20 V80 M60,20 V80'/><rect class='element-box' x='65' y='65' width='10' height='10'/></svg>",
      row: 10,
      col: 15,
    },
    {
      name: "Nobelium",
      symbol: "No",
      atomicNumber: 102,
      atomicMass: "(259)",
      group: null,
      period: 7,
      block: "f-block",
      electronic: "[Rn] 5f¹⁴ 7s²",
      type: "actinide",
      specific: "actinide",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> No | <strong>Atomic number:</strong> 102 | <strong>Atomic mass:</strong> (259)</p><p>First synthesized in 1966, Nobelium is a synthetic radioactive metal named after Alfred Nobel. It is an actinide element.</p></section><section><h2>2. Uses & Importance</h2><p>Like other transuranic elements, Nobelium is produced in tiny quantities and is only used for scientific research to study its properties and to create heavier elements.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.target-atom{fill:#4DD0E1;stroke:#00ACC1;stroke-width:2}.particle-beam{fill:#FF7043;animation:collide 1s ease-in infinite}@keyframes collide{to{transform:translateX(25px);opacity:0}}</style><circle class='target-atom' cx='60' cy='50' r='15'/><circle class='particle-beam' cx='20' cy='50' r='5'/></svg>",
      row: 10,
      col: 16,
    },
    {
      name: "Lawrencium",
      symbol: "Lr",
      atomicNumber: 103,
      atomicMass: "(262)",
      group: 3,
      period: 7,
      block: "d-block",
      electronic: "[Rn] 5f¹⁴ 7s² 7p¹",
      type: "actinide",
      specific: "actinide",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Lr | <strong>Atomic number:</strong> 103 | <strong>Atomic mass:</strong> (262)</p><p>First synthesized in 1961, Lawrencium is a synthetic radioactive element and the final member of the actinide series. It is named after Ernest Lawrence.</p></section><section><h2>2. Uses & Importance</h2><p>Too unstable and rare to have any practical applications, Lawrencium is used solely for research into the chemical and physical properties of super-heavy elements.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.target-atom{fill:#4DD0E1;stroke:#00ACC1;stroke-width:2}.particle-beam{fill:#FF7043;animation:collide 1s ease-in infinite}@keyframes collide{to{transform:translateX(25px);opacity:0}}</style><circle class='target-atom' cx='60' cy='50' r='15'/><circle class='particle-beam' cx='20' cy='50' r='5'/></svg>",
      row: 10,
      col: 17,
    },
    {
      name: "Rutherfordium",
      symbol: "Rf",
      atomicNumber: 104,
      atomicMass: "(267)",
      group: 4,
      period: 7,
      block: "d-block",
      electronic: "[Rn] 5f¹⁴ 6d² 7s²",
      type: "transition-metal",
      specific: "transition-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Rf | <strong>Atomic number:</strong> 104 | <strong>Atomic mass:</strong> (267)</p><p>First synthesized in 1964, Rutherfordium is a highly radioactive synthetic element named after Ernest Rutherford. Its chemical properties are not well-known but are predicted to be similar to hafnium.</p></section><section><h2>2. Uses & Importance</h2><p>Rutherfordium has no applications beyond scientific research due to its extreme instability and the difficulty of producing it.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.target-atom{fill:#4DD0E1;stroke:#00ACC1;stroke-width:2}.particle-beam{fill:#FF7043;animation:collide 1s ease-in infinite}@keyframes collide{to{transform:translateX(25px);opacity:0}}</style><circle class='target-atom' cx='60' cy='50' r='15'/><circle class='particle-beam' cx='20' cy='50' r='5'/></svg>",
      row: 7,
      col: 4,
    },
    {
      name: "Dubnium",
      symbol: "Db",
      atomicNumber: 105,
      atomicMass: "(268)",
      group: 5,
      period: 7,
      block: "d-block",
      electronic: "[Rn] 5f¹⁴ 6d³ 7s²",
      type: "transition-metal",
      specific: "transition-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Db | <strong>Atomic number:</strong> 105 | <strong>Atomic mass:</strong> (268)</p><p>First synthesized in 1968, Dubnium is a synthetic, highly radioactive element. It is named after Dubna, Russia, where it was first produced.</p></section><section><h2>2. Uses & Importance</h2><p>Dubnium is a purely research-based element with no practical uses, as only a few atoms have ever been made.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.target-atom{fill:#4DD0E1;stroke:#00ACC1;stroke-width:2}.particle-beam{fill:#FF7043;animation:collide 1s ease-in infinite}@keyframes collide{to{transform:translateX(25px);opacity:0}}</style><circle class='target-atom' cx='60' cy='50' r='15'/><circle class='particle-beam' cx='20' cy='50' r='5'/></svg>",
      row: 7,
      col: 5,
    },
    {
      name: "Seaborgium",
      symbol: "Sg",
      atomicNumber: 106,
      atomicMass: "(271)",
      group: 6,
      period: 7,
      block: "d-block",
      electronic: "[Rn] 5f¹⁴ 6d⁴ 7s²",
      type: "transition-metal",
      specific: "transition-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Sg | <strong>Atomic number:</strong> 106 | <strong>Atomic mass:</strong> (271)</p><p>First synthesized in 1974, Seaborgium is a radioactive synthetic element named in honor of Glenn T. Seaborg.</p></section><section><h2>2. Uses & Importance</h2><p>Seaborgium has never been produced in bulk and has no uses other than academic research into its properties.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.target-atom{fill:#4DD0E1;stroke:#00ACC1;stroke-width:2}.particle-beam{fill:#FF7043;animation:collide 1s ease-in infinite}@keyframes collide{to{transform:translateX(25px);opacity:0}}</style><circle class='target-atom' cx='60' cy='50' r='15'/><circle class='particle-beam' cx='20' cy='50' r='5'/></svg>",
      row: 7,
      col: 6,
    },
    {
      name: "Bohrium",
      symbol: "Bh",
      atomicNumber: 107,
      atomicMass: "(272)",
      group: 7,
      period: 7,
      block: "d-block",
      electronic: "[Rn] 5f¹⁴ 6d⁵ 7s²",
      type: "transition-metal",
      specific: "transition-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Bh | <strong>Atomic number:</strong> 107 | <strong>Atomic mass:</strong> (272)</p><p>First synthesized in 1976, Bohrium is a synthetic element named after Niels Bohr. It is highly radioactive.</p></section><section><h2>2. Uses & Importance</h2><p>Only a few atoms of bohrium have ever been created, and its use is limited to basic scientific research.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.target-atom{fill:#4DD0E1;stroke:#00ACC1;stroke-width:2}.particle-beam{fill:#FF7043;animation:collide 1s ease-in infinite}@keyframes collide{to{transform:translateX(25px);opacity:0}}</style><circle class='target-atom' cx='60' cy='50' r='15'/><circle class='particle-beam' cx='20' cy='50' r='5'/></svg>",
      row: 7,
      col: 7,
    },
    {
      name: "Hassium",
      symbol: "Hs",
      atomicNumber: 108,
      atomicMass: "(277)",
      group: 8,
      period: 7,
      block: "d-block",
      electronic: "[Rn] 5f¹⁴ 6d⁶ 7s²",
      type: "transition-metal",
      specific: "transition-metal",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Hs | <strong>Atomic number:</strong> 108 | <strong>Atomic mass:</strong> (277)</p><p>First synthesized in 1984, Hassium is a synthetic element named after the German state of Hesse. It is expected to be the heaviest member of group 8.</p></section><section><h2>2. Uses & Importance</h2><p>Hassium is a super-heavy element with no applications; it is only of interest to research scientists studying the properties of heavy elements.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.target-atom{fill:#4DD0E1;stroke:#00ACC1;stroke-width:2}.particle-beam{fill:#FF7043;animation:collide 1s ease-in infinite}@keyframes collide{to{transform:translateX(25px);opacity:0}}</style><circle class='target-atom' cx='60' cy='50' r='15'/><circle class='particle-beam' cx='20' cy='50' r='5'/></svg>",
      row: 7,
      col: 8,
    },
    {
      name: "Meitnerium",
      symbol: "Mt",
      atomicNumber: 109,
      atomicMass: "(276)",
      group: 9,
      period: 7,
      block: "d-block",
      electronic: "[Rn] 5f¹⁴ 6d⁷ 7s²",
      type: "unknown",
      specific: "unknown",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Mt | <strong>Atomic number:</strong> 109 | <strong>Atomic mass:</strong> (276)</p><p>First synthesized in 1982, Meitnerium is a highly radioactive synthetic element named after Lise Meitner.</p></section><section><h2>2. Uses & Importance</h2><p>Meitnerium is too unstable to have any practical applications and is used only for fundamental research.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.target-atom{fill:#4DD0E1;stroke:#00ACC1;stroke-width:2}.particle-beam{fill:#FF7043;animation:collide 1s ease-in infinite}@keyframes collide{to{transform:translateX(25px);opacity:0}}</style><circle class='target-atom' cx='60' cy='50' r='15'/><circle class='particle-beam' cx='20' cy='50' r='5'/></svg>",
      row: 7,
      col: 9,
    },
    {
      name: "Darmstadtium",
      symbol: "Ds",
      atomicNumber: 110,
      atomicMass: "(281)",
      group: 10,
      period: 7,
      block: "d-block",
      electronic: "[Rn] 5f¹⁴ 6d⁸ 7s²",
      type: "unknown",
      specific: "unknown",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Ds | <strong>Atomic number:</strong> 110 | <strong>Atomic mass:</strong> (281)</p><p>First synthesized in 1994, Darmstadtium is a radioactive synthetic element named after Darmstadt, Germany, where it was discovered.</p></section><section><h2>2. Uses & Importance</h2><p>Darmstadtium has no applications outside of scientific research.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.target-atom{fill:#4DD0E1;stroke:#00ACC1;stroke-width:2}.particle-beam{fill:#FF7043;animation:collide 1s ease-in infinite}@keyframes collide{to{transform:translateX(25px);opacity:0}}</style><circle class='target-atom' cx='60' cy='50' r='15'/><circle class='particle-beam' cx='20' cy='50' r='5'/></svg>",
      row: 7,
      col: 10,
    },
    {
      name: "Roentgenium",
      symbol: "Rg",
      atomicNumber: 111,
      atomicMass: "(280)",
      group: 11,
      period: 7,
      block: "d-block",
      electronic: "[Rn] 5f¹⁴ 6d⁹ 7s²",
      type: "unknown",
      specific: "unknown",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Rg | <strong>Atomic number:</strong> 111 | <strong>Atomic mass:</strong> (280)</p><p>First synthesized in 1994, Roentgenium is a synthetic element named after Wilhelm Röntgen, the discoverer of X-rays.</p></section><section><h2>2. Uses & Importance</h2><p>This element is purely for research and has no other uses.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.target-atom{fill:#4DD0E1;stroke:#00ACC1;stroke-width:2}.particle-beam{fill:#FF7043;animation:collide 1s ease-in infinite}@keyframes collide{to{transform:translateX(25px);opacity:0}}</style><circle class='target-atom' cx='60' cy='50' r='15'/><circle class='particle-beam' cx='20' cy='50' r='5'/></svg>",
      row: 7,
      col: 11,
    },
    {
      name: "Copernicium",
      symbol: "Cn",
      atomicNumber: 112,
      atomicMass: "(285)",
      group: 12,
      period: 7,
      block: "d-block",
      electronic: "[Rn] 5f¹⁴ 6d¹⁰ 7s²",
      type: "unknown",
      specific: "unknown",
      physical: "Gas",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Cn | <strong>Atomic number:</strong> 112 | <strong>Atomic mass:</strong> (285)</p><p>First synthesized in 1996, Copernicium is a radioactive synthetic element named after Nicolaus Copernicus.</p></section><section><h2>2. Uses & Importance</h2><p>Copernicium is used for scientific research only.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.target-atom{fill:#4DD0E1;stroke:#00ACC1;stroke-width:2}.particle-beam{fill:#FF7043;animation:collide 1s ease-in infinite}@keyframes collide{to{transform:translateX(25px);opacity:0}}</style><circle class='target-atom' cx='60' cy='50' r='15'/><circle class='particle-beam' cx='20' cy='50' r='5'/></svg>",
      row: 7,
      col: 12,
    },
    {
      name: "Nihonium",
      symbol: "Nh",
      atomicNumber: 113,
      atomicMass: "(286)",
      group: 13,
      period: 7,
      block: "p-block",
      electronic: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹",
      type: "unknown",
      specific: "unknown",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Nh | <strong>Atomic number:</strong> 113 | <strong>Atomic mass:</strong> (286)</p><p>First synthesized in 2003, Nihonium is a synthetic element named after Japan (Nihon).</p></section><section><h2>2. Uses & Importance</h2><p>Nihonium's extreme instability means it is used for research purposes only.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.target-atom{fill:#4DD0E1;stroke:#00ACC1;stroke-width:2}.particle-beam{fill:#FF7043;animation:collide 1s ease-in infinite}@keyframes collide{to{transform:translateX(25px);opacity:0}}</style><circle class='target-atom' cx='60' cy='50' r='15'/><circle class='particle-beam' cx='20' cy='50' r='5'/></svg>",
      row: 7,
      col: 13,
    },
    {
      name: "Flerovium",
      symbol: "Fl",
      atomicNumber: 114,
      atomicMass: "(289)",
      group: 14,
      period: 7,
      block: "p-block",
      electronic: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²",
      type: "unknown",
      specific: "unknown",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Fl | <strong>Atomic number:</strong> 114 | <strong>Atomic mass:</strong> (289)</p><p>First synthesized in 1998, Flerovium is a super-heavy synthetic element named after the Flerov Laboratory of Nuclear Reactions.</p></section><section><h2>2. Uses & Importance</h2><p>Flerovium has no applications and is of interest only to the research community.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.target-atom{fill:#4DD0E1;stroke:#00ACC1;stroke-width:2}.particle-beam{fill:#FF7043;animation:collide 1s ease-in infinite}@keyframes collide{to{transform:translateX(25px);opacity:0}}</style><circle class='target-atom' cx='60' cy='50' r='15'/><circle class='particle-beam' cx='20' cy='50' r='5'/></svg>",
      row: 7,
      col: 14,
    },
    {
      name: "Moscovium",
      symbol: "Mc",
      atomicNumber: 115,
      atomicMass: "(288)",
      group: 15,
      period: 7,
      block: "p-block",
      electronic: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³",
      type: "unknown",
      specific: "unknown",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Mc | <strong>Atomic number:</strong> 115 | <strong>Atomic mass:</strong> (288)</p><p>First synthesized in 2003, Moscovium is a synthetic radioactive element named after Moscow Oblast, Russia.</p></section><section><h2>2. Uses & Importance</h2><p>Moscovium's only use is in scientific research.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.target-atom{fill:#4DD0E1;stroke:#00ACC1;stroke-width:2}.particle-beam{fill:#FF7043;animation:collide 1s ease-in infinite}@keyframes collide{to{transform:translateX(25px);opacity:0}}</style><circle class='target-atom' cx='60' cy='50' r='15'/><circle class='particle-beam' cx='20' cy='50' r='5'/></svg>",
      row: 7,
      col: 15,
    },
    {
      name: "Livermorium",
      symbol: "Lv",
      atomicNumber: 116,
      atomicMass: "(293)",
      group: 16,
      period: 7,
      block: "p-block",
      electronic: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴",
      type: "unknown",
      specific: "unknown",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Lv | <strong>Atomic number:</strong> 116 | <strong>Atomic mass:</strong> (293)</p><p>First synthesized in 2000, Livermorium is a synthetic radioactive element named after the Lawrence Livermore National Laboratory.</p></section><section><h2>2. Uses & Importance</h2><p>Livermorium has no applications and is for research only.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.target-atom{fill:#4DD0E1;stroke:#00ACC1;stroke-width:2}.particle-beam{fill:#FF7043;animation:collide 1s ease-in infinite}@keyframes collide{to{transform:translateX(25px);opacity:0}}</style><circle class='target-atom' cx='60' cy='50' r='15'/><circle class='particle-beam' cx='20' cy='50' r='5'/></svg>",
      row: 7,
      col: 16,
    },
    {
      name: "Tennessine",
      symbol: "Ts",
      atomicNumber: 117,
      atomicMass: "(294)",
      group: 17,
      period: 7,
      block: "p-block",
      electronic: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵",
      type: "unknown",
      specific: "unknown",
      physical: "Solid",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Ts | <strong>Atomic number:</strong> 117 | <strong>Atomic mass:</strong> (294)</p><p>First synthesized in 2010, Tennessine is a synthetic element named after the state of Tennessee.</p></section><section><h2>2. Uses & Importance</h2><p>Tennessine exists only for a fraction of a second and is used purely for scientific research.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.target-atom{fill:#4DD0E1;stroke:#00ACC1;stroke-width:2}.particle-beam{fill:#FF7043;animation:collide 1s ease-in infinite}@keyframes collide{to{transform:translateX(25px);opacity:0}}</style><circle class='target-atom' cx='60' cy='50' r='15'/><circle class='particle-beam' cx='20' cy='50' r='5'/></svg>",
      row: 7,
      col: 17,
    },
    {
      name: "Oganesson",
      symbol: "Og",
      atomicNumber: 118,
      atomicMass: "(294)",
      group: 18,
      period: 7,
      block: "p-block",
      electronic: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶",
      type: "unknown",
      specific: "unknown",
      physical: "Gas",
      description:
        "<section><h2>1. Introduction</h2><p><strong>Symbol:</strong> Og | <strong>Atomic number:</strong> 118 | <strong>Atomic mass:</strong> (294)</p><p>First synthesized in 2005, Oganesson is a synthetic element named after Yuri Oganessian. It has the highest atomic number and mass of all known elements.</p></section><section><h2>2. Uses & Importance</h2><p>Due to its extreme instability, Oganesson has no uses beyond research into the properties of super-heavy elements.</p></section>",
      svg: "<svg viewBox='0 0 100 100'><style>.target-atom{fill:#4DD0E1;stroke:#00ACC1;stroke-width:2}.particle-beam{fill:#FF7043;animation:collide 1s ease-in infinite}@keyframes collide{to{transform:translateX(25px);opacity:0}}</style><circle class='target-atom' cx='60' cy='50' r='15'/><circle class='particle-beam' cx='20' cy='50' r='5'/></svg>",
      row: 7,
      col: 18,
    },
  ];

  const tableGrid = document.getElementById("periodic-table-grid");
  const searchInput = document.getElementById("element-search");
  const detailsSection = document.getElementById("element-details");
  const filterButtons = document.querySelectorAll(".btn-wrap");
  const allButton = document.querySelector(".all-button");
  const fullscreenBtn = document.getElementById("fullscreen-btn");
  const tableWrapper = document.getElementById("periodic-table-wrapper");
  const sidebar = document.getElementById("topic-sidebar");
  const sidebarToggle = document.getElementById("topic-sidebar-toggle");
  const sidebarOverlay = document.getElementById("sidebar-overlay");
  const sidebarNav = document.getElementById("topic-nav");

  let activeFilters = { category: [], block: [], state: [] };

  function populateTable() {
    if (!tableGrid) return;
    tableGrid.innerHTML =
      '<div class="spinner-container"><div class="spinner"></div><p>Loading Elements...</p></div>';

    // Add Group Labels (1-18)
    for (let i = 1; i <= 18; i++) {
      const label = document.createElement("div");
      label.className = "grid-label";
      label.textContent = i;
      label.style.gridColumn = i + 1;
      label.style.gridRow = 1;
      tableGrid.appendChild(label);
    }

    // Add Period Labels (1-7)
    for (let i = 1; i <= 7; i++) {
      const label = document.createElement("div");
      label.className = "grid-label";
      label.textContent = i;
      label.style.gridColumn = 1;
      label.style.gridRow = i + 1;
      tableGrid.appendChild(label);
    }

    // Add Lanthanide/Actinide placeholders
    const lanthanidePlaceholder = document.createElement("div");
    lanthanidePlaceholder.className = "series-label-placeholder";
    lanthanidePlaceholder.textContent = "57-71";
    lanthanidePlaceholder.style.gridRow = "7"; // Row for period 6
    lanthanidePlaceholder.style.gridColumn = "4";
    tableGrid.appendChild(lanthanidePlaceholder);

    const actinidePlaceholder = document.createElement("div");
    actinidePlaceholder.className = "series-label-placeholder";
    actinidePlaceholder.textContent = "89-103";
    actinidePlaceholder.style.gridRow = "8"; // Row for period 7
    actinidePlaceholder.style.gridColumn = "4";
    tableGrid.appendChild(actinidePlaceholder);

    // Add series labels for Lanthanides and Actinides
    const lanthanideLabel = document.createElement("div");
    lanthanideLabel.className = "series-label";
    lanthanideLabel.textContent = "Lanthanides";
    lanthanideLabel.style.gridRow = "10";
    lanthanideLabel.style.gridColumn = "3";
    tableGrid.appendChild(lanthanideLabel);

    const actinideLabel = document.createElement("div");
    actinideLabel.className = "series-label";
    actinideLabel.textContent = "Actinides";
    actinideLabel.style.gridRow = "11";
    actinideLabel.style.gridColumn = "3";
    tableGrid.appendChild(actinideLabel);

    elementsData.forEach((el) => {
      const cell = document.createElement("div");
      cell.className = `element-cell ${el.type}`;
      cell.style.gridRow = el.row + 1;
      cell.style.gridColumn = el.col + 1;
      cell.dataset.name = el.name.toLowerCase();
      cell.dataset.symbol = el.symbol.toLowerCase();
      cell.dataset.category = el.type;
      cell.dataset.block = el.block;
      cell.dataset.state = el.physical.toLowerCase();

      cell.innerHTML = `
                <div class="cell-number">${el.atomicNumber}</div>
                <div class="cell-symbol">${el.symbol}</div>
                <div class="cell-name">${el.name}</div>
                <div class="cell-mass">${el.atomicMass}</div>
            `;
      cell.addEventListener("click", () => {
        displayElementDetails(el);
        document
          .querySelectorAll(".element-cell")
          .forEach((c) => c.classList.remove("selected"));
        cell.classList.add("selected");
      });
      tableGrid.appendChild(cell);
    });

    tableGrid.querySelector(".spinner-container")?.remove();
  }

  function displayElementDetails(element, shouldScroll = true) {
    if (!detailsSection) return;

    const sidebarHTML = `
            <aside class="details-sidebar-adv">
                <div class="sidebar-card">
                    <h3>${element.name} (${element.symbol})</h3>
                    <div class="details-svg-container ${element.type}">
                        ${element.svg || "<p>No image available</p>"}
                    </div>
                </div>
                <div class="sidebar-card">
                    <h3>Key Properties</h3>
                    <ul class="details-key-properties">
                        <li><strong>Atomic Number:</strong> <span>${
                          element.atomicNumber
                        }</span></li>
                        <li><strong>Atomic Mass:</strong> <span>${
                          element.atomicMass
                        }</span></li>
                        <li><strong>Group:</strong> <span>${
                          element.group || "N/A"
                        }</span></li>
                        <li><strong>Period:</strong> <span>${
                          element.period
                        }</span></li>
                        <li><strong>Block:</strong> <span>${
                          element.block
                        }</span></li>
                        <li><strong>State at STP:</strong> <span>${
                          element.physical
                        }</span></li>
                        <li><strong>Config:</strong> <span>${
                          element.electronic
                        }</span></li>
                    </ul>
                </div>
            </aside>
        `;

    const proseHTML = `
            <article class="details-prose-adv">
                ${
                  element.description ||
                  "<p>Detailed information is not available.</p>"
                }
            </article>
        `;

    detailsSection.innerHTML = `
            <div class="details-layout-adv">
                ${sidebarHTML}
                ${proseHTML}
            </div>
        `;
    detailsSection.hidden = false;

    if (shouldScroll) {
      detailsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function applyAllFilters() {
    const query = searchInput.value.toLowerCase().trim();
    const allCells = document.querySelectorAll(".element-cell");

    allCells.forEach((cell) => {
      const nameMatch = cell.dataset.name.includes(query);
      const symbolMatch = cell.dataset.symbol.includes(query);
      const searchMatch = !query || nameMatch || symbolMatch;

      const categoryMatch =
        activeFilters.category.length === 0 ||
        activeFilters.category.includes(cell.dataset.category);
      const blockMatch =
        activeFilters.block.length === 0 ||
        activeFilters.block.includes(cell.dataset.block);
      const stateMatch =
        activeFilters.state.length === 0 ||
        activeFilters.state.includes(cell.dataset.state);

      if (searchMatch && categoryMatch && blockMatch && stateMatch) {
        cell.classList.remove("filtered-out");
      } else {
        cell.classList.add("filtered-out");
      }
    });
  }

  function handleFilterClick(button) {
    const group = button.dataset.filterGroup;
    const value = button.dataset.filterValue;

    // Special handling for broad metal/nonmetal categories
    const metalSubcats = [
      "alkali-metal",
      "alkaline-earth-metal",
      "lanthanide",
      "actinide",
      "transition-metal",
      "post-transition-metal",
    ];
    const nonmetalSubcats = ["nonmetal", "noble-gas"];

    if (value === "metal") {
      activeFilters.category = [
        ...new Set([...activeFilters.category, ...metalSubcats]),
      ];
    } else if (value === "nonmetal-group") {
      activeFilters.category = [
        ...new Set([...activeFilters.category, ...nonmetalSubcats]),
      ];
    } else {
      const index = activeFilters[group].indexOf(value);
      if (index > -1) {
        activeFilters[group].splice(index, 1);
      } else {
        activeFilters[group].push(value);
      }
    }

    // Update button states
    updateFilterButtons();
    applyAllFilters();
  }

  function updateFilterButtons() {
    filterButtons.forEach((button) => {
      const group = button.dataset.filterGroup;
      const value = button.dataset.filterValue;
      if (activeFilters[group].includes(value)) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  }

  function closeMobileSidebar() {
    if (sidebar) sidebar.classList.remove("is-open");
    if (sidebarOverlay) sidebarOverlay.classList.remove("is-open");
  }

  searchInput.addEventListener("input", applyAllFilters);

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      handleFilterClick(button);
      tableWrapper.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  });

  if (allButton) {
    allButton.addEventListener("click", () => {
      activeFilters = { category: [], block: [], state: [] };
      updateFilterButtons();
      applyAllFilters();
      tableWrapper.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }

  if (fullscreenBtn) {
    fullscreenBtn.addEventListener("click", () => {
      if (!document.fullscreenElement) {
        tableWrapper.requestFullscreen().catch((err) => {
          alert(
            `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
          );
        });
        fullscreenBtn.textContent = "Exit Full View";
      } else {
        document.exitFullscreen();
        fullscreenBtn.textContent = "Full View";
      }
    });
  }

  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) {
      fullscreenBtn.textContent = "Full View";
    }
  });

  // --- Sidebar Logic ---
  if (sidebarToggle && sidebar && sidebarOverlay) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("is-open");
      sidebarOverlay.classList.toggle("is-open");
    });

    sidebarOverlay.addEventListener("click", closeMobileSidebar);
  }

  if (sidebarNav) {
    sidebarNav.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        const currentActive = sidebarNav.querySelector("a.active");
        if (currentActive) {
          currentActive.classList.remove("active");
        }
        e.target.classList.add("active");

        // Close sidebar on mobile after selection
        if (window.innerWidth <= 991) {
          closeMobileSidebar();
        }
      }
    });
  }

  populateTable();

  // Default Element Display on Load
  const defaultElement = elementsData.find((el) => el.atomicNumber === 1);
  const defaultCell = tableGrid.querySelector('.element-cell[data-symbol="h"]');

  if (defaultElement && defaultCell) {
    displayElementDetails(defaultElement, false); // Do not scroll on initial load
    defaultCell.classList.add("selected");
  }
});
