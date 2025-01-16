function showPopup(element) {
  var popup = document.getElementById("popup");
  var overlay = document.getElementById("overlay");
  var closeBtn = document.getElementById("closeBtn");
  var popupContent = document.getElementById("popupContent");

  // Fetch real data or use predefined data
  var elementData = getElementData(element);

  // Set content based on the element data
  popupContent.innerHTML = `
      <h2>${elementData.name} (${elementData.symbol})</h2>
      <p><strong>Atomic Number:</strong> ${elementData.atomicNumber}</p>
      <p><strong>Atomic Mass:</strong> ${elementData.atomicMass}</p>
      <p><strong>Group:</strong> ${elementData.group}</p>
      <p><strong>Period:</strong> ${elementData.period}</p>
      <p><strong>Block:</strong> ${elementData.block}</p>
      <p><strong>Electronic Configuration:</strong> ${elementData.electronic}</p>
      <p><strong>Type:</strong> ${elementData.type}</p>
      <p><strong>Specific Name:</strong> ${elementData.specific}</p>
      <p><strong>Physical State:</strong> ${elementData.physical}</p>
      <p><strong>Description:</strong> ${elementData.description}</p>
  `;

  // Apply different background colors based on element type
  popup.className = elementData.type === 'metal' ? 'popup metal' : 'popup non-metal';

  // Show the popup and overlay
  popup.style.display = "block";
  overlay.style.display = "block";

  // Close the popup when clicking on overlay or close button
  overlay.onclick = closePopup;
  closeBtn.onclick = closePopup;
}

function closePopup() {
  var popup = document.getElementById("popup");
  var overlay = document.getElementById("overlay");

  // Remove background color class
  popup.classList.remove('metal', 'non-metal');

  // Hide the popup and overlay
  popup.style.display = "none";
  overlay.style.display = "none";
}

// Replace this with a real data fetching mechanism
function getElementData(element) {
  // Example data, replace with real data
  var data;
  switch (element) {
      case 'H':
          data = {
              name: "Hydrogen",
              symbol: "H",
              atomicNumber: 1,
              atomicMass: "1.0079 u",
              group:"1",
              period:"1",
              block:"s-block",
              electronic:"1s<sup>1</sup>",
              type: "non-metal",
              specific:"Reactive nonmetal",
              physical:"Gas",
              description: "Hydrogen is a chemical element with the symbol H and atomic number 1. It is the lightest and most abundant element in the universe.<br>हाइड्रोजन एक रासायनिक तत्व है जिसका प्रतीक H और परमाणु क्रमांक 1 है। यह ब्रह्मांड में सबसे हल्का और सबसे प्रचुर तत्व है।",
              
          };
          break;
          case 'He':
            data = {
                name: "Helium",
                symbol: "He",
                atomicNumber: 2,
                atomicMass: "4.0026 u",
                group: "18",
                period: "1",
                block: "s-block",
                electronic: "1s<sup>2</sup>",
                type: "Non-metal",
                specific: "Noble gas",
                physical: "Gas",
                description: "Helium is a chemical element with the symbol He and atomic number 2. It is a colorless, odorless, tasteless, non-toxic, inert, monatomic gas that heads the noble gas group in the periodic table.<br>हीलियम एक रासायनिक तत्व है जिसका प्रतीक He और परमाणु क्रमांक 2 है। यह एक रंगहीन, गंधहीन, स्वादहीन, गैर-विषाक्त, निष्क्रिय, मोनोएटोमिक गैस है जो आवर्त सारणी में उत्कृष्ट गैस समूह का प्रमुख है।"
            };
            break;
        case 'Li':
            data = {
                name: "Lithium",
                symbol: "Li",
                atomicNumber: 3,
                atomicMass: "6.94 u",
                group: "1",
                period: "2",
                block: "s-block",
                electronic: "1s<sup>2</sup>, 2s<sup>1</sup>",
                type: "Metal",
                specific: "Alkali metal",
                physical: "Solid",
                description: "Lithium is a chemical element with the symbol Li and atomic number 3. It is a soft, silvery-white alkali metal. Under standard conditions, it is the lightest metal and the lightest solid element.<br>लिथियम एक रासायनिक तत्व है जिसका प्रतीक ली और परमाणु संख्या 3 है। यह एक नरम, चांदी-सफेद क्षार धातु है। मानक परिस्थितियों में, यह सबसे हल्की धातु और सबसे हल्का ठोस तत्व है।"
            };
            break;
        // You can continue adding cases for other elements up to sulfur (S)
        // Example:
        case 'Be':
            data = {
                name: "Beryllium",
                symbol: "Be",
                atomicNumber: 4,
                atomicMass: "9.0122 u",
                group: "2",
                period: "2",
                block: "s-block",
                electronic: "1s<sup>2</sup>,  2s<sup>2</sup>",
                type: "Metal",
                specific: "Alkaline earth metal",
                physical: "Solid",
                description: "Beryllium is a chemical element with the symbol Be and atomic number 4. It is a relatively rare element in the universe, usually occurring as a product of the spallation of larger atomic nuclei.<br>बेरिलियम एक रासायनिक तत्व है जिसका प्रतीक Be और परमाणु संख्या 4 है। यह ब्रह्मांड में एक अपेक्षाकृत दुर्लभ तत्व है, जो आमतौर पर बड़े परमाणु नाभिक के फैलाव के उत्पाद के रूप में होता है।"
            };
            break;
        // Add more cases for other elements...
        // Example:
        case 'B':
            data = {
                name: "Boron",
                symbol: "B",
                atomicNumber: 5,
                atomicMass: "10.81 u",
                group: "13",
                period: "2",
                block: "p-block",
                electronic: "1s<sup>2</sup>,  2s<sup>2</sup>, 2p<sup>1</sup>",
                type: "Metalloid",
                specific: "Metalloid",
                physical: "Solid",
                description: "Boron is a chemical element with the symbol B and atomic number 5. It is a low-abundance element in the Solar System and in the Earth's crust.<br>बोरॉन एक रासायनिक तत्व है जिसका प्रतीक बी और परमाणु संख्या 5 है। यह सौर मंडल और पृथ्वी की पपड़ी में एक कम बहुतायत वाला तत्व है।"
            };
            break;
            case 'C':
              data = {
                  name: "Carbon",
                  symbol: "C",
                  atomicNumber: 6,
                  atomicMass: "12.011 u",
                  group: "14",
                  period: "2",
                  block: "p-block",
                  electronic: "1s<sup>2</sup>,  2s<sup>2</sup> ,2p<sup>2</sup>",
                  type: "non-metal",
                  specific: "Reactive nonmetal",
                  physical: "Solid",
                  description: "Carbon is a chemical element with the symbol C and atomic number 6. It is nonmetallic and tetravalent—making four electrons available to form covalent chemical bonds.<br>कार्बन एक रासायनिक तत्व है जिसका प्रतीक C और परमाणु संख्या 6 है। यह अधात्विक और चतुष्संयोजक है - जो सहसंयोजक रासायनिक बंधन बनाने के लिए चार इलेक्ट्रॉन उपलब्ध कराता है।"
              };
              break;
          case 'N':
              data = {
                  name: "Nitrogen",
                  symbol: "N",
                  atomicNumber: 7,
                  atomicMass: "14.007 u",
                  group: "15",
                  period: "2",
                  block: "p-block",
                  electronic: "1s<sup>2</sup>,  2s<sup>2</sup>, 2p<sup>3</sup>",
                  type: "non-metal",
                  specific: "Reactive nonmetal",
                  physical: "Gas",
                  description: "Nitrogen is a chemical element with the symbol N and atomic number 7. It is a nonmetal and has an electronegativity of 3.04, making it a strong oxidizing agent."
              };
              break;
          case 'O':
              data = {
                  name: "Oxygen",
                  symbol: "O",
                  atomicNumber: 8,
                  atomicMass: "15.999 u",
                  group: "16",
                  period: "2",
                  block: "p-block",
                  electronic: "1s<sup>2</sup>, 2s<sup>2</sup>, 2p<sup>4</sup>",
                  type: "non-metal",
                  specific: "Reactive nonmetal",
                  physical: "Gas",
                  description: "Oxygen is a chemical element with the symbol O and atomic number 8. It is a member of the chalcogen group in the periodic table, a highly reactive nonmetal, and an oxidizing agent that readily forms oxides with most elements as well as with other compounds.<br>ऑक्सीजन एक रासायनिक तत्व है जिसका प्रतीक O और परमाणु क्रमांक 8 है। यह आवर्त सारणी में चाकोजेन समूह का सदस्य है, एक अत्यधिक प्रतिक्रियाशील अधातु है, और एक ऑक्सीकरण एजेंट है जो अधिकांश तत्वों के साथ-साथ अन्य यौगिकों के साथ आसानी से ऑक्साइड बनाता है।"
              };
              break;
          // Continue adding cases for elements up to sulfur (S)...
          // Example:
          case 'F':
              data = {
                  name: "Fluorine",
                  symbol: "F",
                  atomicNumber: 9,
                  atomicMass: "18.998 u",
                  group: "17",
                  period: "2",
                  block: "p-block",
                  electronic: "1s<sup>2</sup>,  2s<sup>2</sup>, 2p<sup>5</sup>",
                  type: "Non-metal",
                  specific: "Reactive nonmetal",
                  physical: "Gas",
                  description: "Fluorine is a chemical element with the symbol F and atomic number 9. It is the lightest Non-metal and exists as a highly toxic pale yellow diatomic gas at standard conditions.<br>फ्लोरीन एक रासायनिक तत्व है जिसका प्रतीक F और परमाणु संख्या 9 है। यह सबसे हल्की गैर-धातु है और मानक स्थितियों में अत्यधिक जहरीली हल्के पीले रंग की द्विपरमाणुक गैस के रूप में मौजूद होती है।"
              };
              break;
          // Add more cases for elements...
          // Till you reach sulfur (S)
          case 'Ne':
              data = {
                  name: "Neon",
                  symbol: "Ne",
                  atomicNumber: 10,
                  atomicMass: "20.180 u",
                  group: "18",
                  period: "2",
                  block: "p-block",
                  electronic: "1s<sup>2</sup>,  2s<sup>2</sup>, 2p<sup>6</sup>",
                  type: "Non-metal",
                  specific: "Noble gas",
                  physical: "Gas",
                  description: "Neon is a chemical element with the symbol Ne and atomic number 10. It is a noble gas. Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about two-thirds the density of air.<br>नियॉन एक रासायनिक तत्व है जिसका प्रतीक Ne और परमाणु संख्या 10 है। यह एक उत्कृष्ट गैस है। नियॉन मानक परिस्थितियों में एक रंगहीन, गंधहीन, अक्रिय मोनोएटोमिक गैस है, जिसका घनत्व हवा का लगभग दो-तिहाई है।"
              };
              break;
          // Add more cases for elements...
          // Till you reach sulfur (S)
          case 'Na':
              data = {
                  name: "Sodium",
                  symbol: "Na",
                  atomicNumber: 11,
                  atomicMass: "22.990 u",
                  group: "1",
                  period: "3",
                  block: "s-block",
                  electronic: "1s<sup>2</sup>,  2s<sup>2</sup>,2p<sup>6</sup>, 3s<sup>1</sup>",
                  type: "Metal",
                  specific: "Alkali metal",
                  physical: "Solid",
                  description: "Sodium is a chemical element with the symbol Na and atomic number 11. It is a soft, silvery-white, highly reactive metal. Sodium is an alkali metal, being in group 1 of the periodic table."
              };
              break;
          // Add more cases for elements...
          // Till you reach sulfur (S)
          case 'Mg':
              data = {
                  name: "Magnesium",
                  symbol: "Mg",
                  atomicNumber: 12,
                  atomicMass: "24.305 u",
                  group: "2",
                  period: "3",
                  block: "s-block",
                  electronic: "1s<sup>2</sup>,  2s<sup>2</sup>,2p<sup>6</sup>, 3s<sup>2</sup>",
                  type: "Metal",
                  specific: "Alkaline earth metal",
                  physical: "Solid",
                  description: "Magnesium is a chemical element with the symbol Mg and atomic number 12. It is a shiny gray solid which bears a close physical resemblance to the other five elements in the second column (group 2, or alkaline earth metals) of the periodic table: all group 2 elements have the same electron configuration in the outer electron shell and a similar crystal structure."
              };
              break;
          // Add more cases for elements...
          // Till you reach sulfur (S)
          case 'Al':
              data = {
                  name: "Aluminium",
                  symbol: "Al",
                  atomicNumber: 13,
                  atomicMass: "26.982 u",
                  group: "13",
                  period: "3",
                  block: "P-block",
                  electronic: "1s<sup>2</sup>,  2s<sup>2</sup>, 2p<sup>6</sup>, 3s<sup>2</sup>, 3p<sup>1</sup>",
                  type: "Metal",
                  specific: "Post-transition metal",
                  physical: "Solid",
                  description: "Aluminium is a chemical element with the symbol Al and atomic number 13. It is a silvery-white, soft, non-magnetic and ductile metal in the boron group."
              };
              break;
          // Add more cases for elements...
          // Till you reach sulfur (S)
          case 'Si':
              data = {
                  name: "Silicon",
                  symbol: "Si",
                  atomicNumber: 14,
                  atomicMass: "28.085 u",
                  group: "14",
                  period: "3",
                  block: "P-block",
                  electronic: "1s<sup>2</sup>,  2s<sup>2</sup>, 2p<sup>6</sup>, 3s<sup>2</sup>, 3p<sup>2</sup>",
                  type: "Metalloid",
                  specific: "Metalloid",
                  physical: "Solid",
                  description: "Silicon is a chemical element with the symbol Si and atomic number 14. It is a hard, brittle crystalline solid with a blue-grey metallic lustre, and is a tetravalent metalloid and semiconductor."
              };
              break;
          // Add more cases for elements...
          // Till you reach sulfur (S)
          case 'P':
              data = {
                  name: "Phosphorus",
                  symbol: "P",
                  atomicNumber: 15,
                  atomicMass: "30.974 u",
                  group: "15",
                  period: "3",
                  block: "p-block",
                  electronic: "1s<sup>2</sup>,  2s<sup>2</sup>, 2p<sup>6</sup>, 3s<sup>2</sup>, 3p<sup>3</sup>",
                  type: "non-metal",
                  specific: "Reactive nonmetal",
                  physical: "Solid",
                  description: "Phosphorus is a chemical element with the symbol P and atomic number 15. Elemental phosphorus exists in two major forms, white phosphorus and red phosphorus, but because it is highly reactive, phosphorus is never found as a free element on Earth."
              };
              break;
          case 'S':
              data = {
                  name: "Sulfur",
                  symbol: "S",
                  atomicNumber: 16,
                  atomicMass: "32.06 u",
                  group: "16",
                  period: "3",
                  block: "p-block",
                  electronic: "1s<sup>2</sup>,  2s<sup>2</sup>, 2p<sup>6</sup>, 3s<sup>2</sup>, 3p<sup>4</sup>",
                  type: "non-metal",
                  specific: "Reactive nonmetal",
                  physical: "Solid",
                  description: "Sulfur is a chemical element with the symbol S and atomic number 16. It is abundant, multivalent, and nonmetallic."
              };
              break;
              case 'Cl':
        data = {
            name: "Chlorine",
            symbol: "Cl",
            atomicNumber: 17,
            atomicMass: "35.45 u",
            group: "17",
            period: "3",
            block: "p-block",
            electronic: "1s<sup>2</sup>,  2s<sup>2</sup>, 2p<sup>6</sup>, 3s<sup>2</sup>, 3p<sup>5</sup>",
            type: "Non-metal",
            specific: "Reactive nonmetal",
            physical: "Gas",
            description: "Chlorine is a chemical element with the symbol Cl and atomic number 17. It is in the Non-metal group (17) and is the second lightest Non-metal following fluorine. The element is a yellow-green gas under standard conditions, where it forms diatomic molecules."
        };
        break;
    case 'Ar':
        data = {
            name: "Argon",
            symbol: "Ar",
            atomicNumber: 18,
            atomicMass: "39.948 u",
            group: "18",
            period: "3",
            block: "p-block",
            electronic: "1s<sup>2</sup>,  2s<sup>2</sup>, 2p<sup>6</sup>, 3s<sup>2</sup>, 3p<sup>6</sup>",
            type: "Non-metal",
            specific: "Noble Gases",
            physical: "Gas",
            description: "Argon is a chemical element with the symbol Ar and atomic number 18. It is in group 18 of the periodic table and is a noble gas. Argon is the third-most abundant gas in the Earth's atmosphere, at 0.934% (9340 ppmv)."
        };
        break;
    case 'K':
        data = {
            name: "Potassium",
            symbol: "K",
            atomicNumber: 19,
            atomicMass: "39.098 u",
            group: "1",
            period: "4",
            block: "s-block",
            electronic: "1s<sup>2</sup>,  2s<sup>2</sup>, 2p<sup>6</sup>, 3s<sup>2</sup>,3p<sup>6</sup>, 4s<sup>1</sup>",
            type: "Metal",
            specific: "Alkali metal",
            physical: "Solid",
            description: "Potassium is a chemical element with the symbol K and atomic number 19. It was first isolated from potash, the ashes of plants, from which its name derives."
        };
        break;
    // Continue adding cases for elements...
    // Till you reach 27
    case 'Ca':
        data = {
            name: "Calcium",
            symbol: "Ca",
            atomicNumber: 20,
            atomicMass: "40.078 u",
            group: "2",
            period: "4",
            block: "s-block",
            electronic: "1s<sup>2</sup>,  2s<sup>2</sup>, 2p<sup>6</sup>, 3s<sup>2</sup>,3p<sup>6</sup>, 4s<sup>2</sup>",
            type: "Metal",
            specific: "Alkaline earth metal",
            physical: "Solid",
            description: "Calcium is a chemical element with the symbol Ca and atomic number 20. As an alkaline earth metal, calcium is a reactive metal that forms a dark oxide-nitride layer when exposed to air. Its physical and chemical properties are most similar to its heavier homologues strontium and barium."
        };
        break;
    // Add more cases for elements...
    // Till you reach 27
    case 'Sc':
        data = {
            name: "Scandium",
            symbol: "Sc",
            atomicNumber: 21,
            atomicMass: "44.956 u",
            group: "3",
            period: "4",
            block: "d-block",
            electronic: "1s<sup>2</sup>,  2s<sup>2</sup>, 2p<sup>6</sup>, 3s<sup>2</sup>,3p<sup>6</sup>, 3d<sup>1</sup> 4s<sup>2</sup>",
            type: "Metal",
            specific: "Transition metal",
            physical: "Solid",
            description: "Scandium is a chemical element with the symbol Sc and atomic number 21. A silvery-white metallic d-block element, it has historically been sometimes classified as a rare-earth element, together with yttrium and the lanthanides."
        };
        break;
    // Add more cases for elements...
    // Till you reach 27
    case 'Ti':
        data = {
            name: "Titanium",
            symbol: "Ti",
            atomicNumber: 22,
            atomicMass: "47.867 u",
            group: "4",
            period: "4",
            block: "d-block",
            electronic: "1s<sup>2</sup>,  2s<sup>2</sup>, 2p<sup>6</sup>, 3s<sup>2</sup>,3p<sup>6</sup>, 3d<sup>2</sup> 4s<sup>2</sup>",
            type: "Metal",
            specific: "Transition metal",
            physical: "Solid",
            description: "Titanium is a chemical element with the symbol Ti and atomic number 22. It is a lustrous transition metal with a silver color, low density, and high strength. Titanium is resistant to corrosion in sea water, aqua regia, and chlorine."
        };
        break;
    // Add more cases for elements...
    // Till you reach 27
    case 'V':
        data = {
            name: "Vanadium",
            symbol: "V",
            atomicNumber: 23,
            atomicMass: "50.942 u",
            group: "5",
            period: "4",
            block: "d-block",
            electronic: "1s<sup>2</sup> 2s<sup>2</sup> 2p<sup>6</sup> 3s<sup>2</sup> 3p<sup>6</sup> 4s<sup>2 </sup>3d<sup>3</sup>",
            type: "Metal",
            specific: "Transition metal",
            physical: "Solid",
            description: "Vanadium is a chemical element with the symbol V and atomic number 23. It is a hard, silvery-grey, malleable transition metal. The elemental metal is rarely found in nature, but once isolated artificially, the formation of an oxide layer stabilizes the free metal somewhat against further oxidation."
        };
        break;
    // Add more cases for elements...
    // Till you reach 27
    case 'Cr':
        data = {
            name: "Chromium",
            symbol: "Cr",
            atomicNumber: 24,
            atomicMass: "51.996 u",
            group: "6",
            period: "4",
            block: "d-block",
            electronic: "1s<sup>2</sup> 2s<sup>2</sup> 2p<sup>6</sup> 3s<sup>2</sup> 3p<sup>6</sup> 4s<sup>1</sup> 3d<sup>5</sup>",
            type: "Metal",
            specific: "Transition metal",
            physical: "Solid",
            description: "Chromium is a chemical element with the symbol Cr and atomic number 24. It is the first element in group 6. It is a steely-grey, lustrous, hard and brittle transition metal."
        };
        break;
    // Add more cases for elements...
    // Till you reach 27
    case 'Mn':
        data = {
            name: "Manganese",
            symbol: "Mn",
            atomicNumber: 25,
            atomicMass: "54.938 u",
            group: "7",
            period: "4",
            block: "d-block",
            electronic: "1s<sup>2</sup> 2s<sup>2</sup> 2p<sup>6</sup> 3s<sup>2</sup> 3p<sup>6</sup> 4s<sup>2 </sup>3d<sup>5</sup>",
            type: "Metal",
            specific: "Transition metal",
            physical: "Solid",
            description: "Manganese is a chemical element with the symbol Mn and atomic number 25. It is not found as a free element in nature; it is often found in minerals in combination with iron. Manganese is a transition metal with important industrial alloy uses, particularly in stainless steels."
        };
        break;
    // Add more cases for elements...
    // Till you reach 27
    case 'Fe':
        data = {
            name: "Iron",
            symbol: "Fe",
            atomicNumber: 26,
            atomicMass: "55.845 u",
            group: "8",
            period: "4",
            block: "d-block",
            electronic: "1s<sup>2</sup> 2s<sup>2</sup> 2p<sup>6</sup> 3s<sup>2</sup> 3p<sup>6</sup> 4s<sup>2 </sup>3d<sup>6</sup>",
            type: "Metal",
            specific: "Transition metal",
            physical: "Solid",
            description: "Iron is a chemical element with the symbol Fe and atomic number 26. It is a metal that belongs to the first transition series and group 8 of the periodic table. It is, by mass, the most common element on Earth, forming much of Earth's outer and inner core."
        };
        break;
    // Add more cases for elements...
    // Till you reach 27
    case 'Co':
        data = {
            name: "Cobalt",
            symbol: "Co",
            atomicNumber: 27,
            atomicMass: "58.933 u",
            group: "9",
            period: "4",
            block: "d-block",
            electronic: "1s<sup>2</sup> 2s<sup>2</sup> 2p<sup>6</sup> 3s<sup>2</sup> 3p<sup>6</sup> 4s<sup>2</sup> 3d<sup>7</sup>",
            type: "Metal",
            specific: "Transition metal",
            physical: "Solid",
            description: "Cobalt is a chemical element with the symbol Co and atomic number 27. Like nickel, cobalt is found in the Earth's crust only in chemically combined form, save for small deposits found in alloys of natural meteoric iron."
        };
        break;case 'Ni':
        data = {
            name: "Nickel",
            symbol: "Ni",
            atomicNumber: 28,
            atomicMass: "58.693 u",
            group: "10",
            period: "4",
            block: "d-block",
            electronic: "1s<sup>2</sup> 2s<sup>2</sup> 2p<sup>6</sup> 3s<sup>2</sup> 3p<sup>6</sup> 4s<sup>2</sup> 3d<sup>8</sup>",
            type: "Metal",
            specific: "Transition metal",
            physical: "Solid",
            description: "Nickel is a chemical element with the symbol Ni and atomic number 28. It is a silvery-white lustrous metal with a slight golden tinge. Nickel belongs to the transition metals and is hard and ductile."
        };
        break;
    case 'Cu':
        data = {
            name: "Copper",
            symbol: "Cu",
            atomicNumber: 29,
            atomicMass: "63.546 u",
            group: "11",
            period: "4",
            block: "d-block",
            electronic: "1s<sup>2</sup> 2s<sup>2</sup> 2p<sup>6</sup> 3s<sup>2</sup> 3p<sup>6</sup> 4s<sup>1 </sup>3d<sup>10</sup>",
            type: "Metal",
            specific: "Transition metal",
            physical: "Solid",
            description: "Copper is a chemical element with the symbol Cu and atomic number 29. It is a soft, malleable, and ductile metal with very high thermal and electrical conductivity. A freshly exposed surface of pure copper has a pinkish-orange color."
        };
        break;
    case 'Zn':
        data = {
            name: "Zinc",
            symbol: "Zn",
            atomicNumber: 30,
            atomicMass: "65.38 u",
            group: "12",
            period: "4",
            block: "d-block",
            electronic: "1s<sup>2</sup> 2s<sup>2</sup> 2p<sup>6</sup> 3s<sup>2</sup> 3p<sup>6</sup> 4s<sup>2</sup> 3d<sup>10</sup>",
            type: "Metal",
            specific: "Transition metal",
            physical: "Solid",
            description: "Zinc is a chemical element with the symbol Zn and atomic number 30. It is the first element in group 12 of the periodic table. In some respects, zinc is chemically similar to magnesium: both elements exhibit only one normal oxidation state (+2), and the Zn<sup>2+</sup> and Mg<sup>2+</sup> ions are of similar size."
        };
        break;
    // Continue adding cases for elements...
    // Till you reach 38
    case 'Ga':
        data = {
            name: "Gallium",
            symbol: "Ga",
            atomicNumber: 31,
            atomicMass: "69.723 u",
            group: "13",
            period: "4",
            block: "p-block",
            electronic: "1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup>4s<sup>2</sup>3d<sup>10</sup>4p<sup>1</sup>",
            type: "Metal",
            specific: "Post-transition metal",
            physical: "Solid",
            description: "Gallium is a chemical element with the symbol Ga and atomic number 31. Elemental gallium is a soft, silvery metal at standard temperature and pressure; however in its liquid state it becomes silvery white."
        };
        break;
    // Add more cases for elements...
    // Till you reach 38
    case 'Ge':
        data = {
            name: "Germanium",
            symbol: "Ge",
            atomicNumber: 32,
            atomicMass: "72.63 u",
            group: "14",
            period: "4",
            block: "p-block",
            electronic: "1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup>4s<sup>2</sup>3d<sup>10</sup>4p<sup>2</sup>",
            type: "Metalloid",
            specific: "Metalloid",
            physical: "Solid",
            description: "Germanium is a chemical element with the symbol Ge and atomic number 32. It is a lustrous, hard-brittle, grayish-white metalloid in the carbon group, chemically similar to its group neighbors silicon and tin."
        };
        break;
    // Add more cases for elements...
    // Till you reach 38
    case 'As':
        data = {
            name: "Arsenic",
            symbol: "As",
            atomicNumber: 33,
            atomicMass: "74.922 u",
            group: "15",
            period: "4",
            block: "p-block",
            electronic: "1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup>4s<sup>2</sup>3d<sup>10</sup>4p<sup>3</sup>",
            type: "Metalloid",
            specific: "Metalloid",
            physical: "Solid",
            description: "Arsenic is a chemical element with the symbol As and atomic number 33. Arsenic occurs in many minerals, usually in combination with sulfur and metals, but also as a pure elemental crystal. Arsenic is a metalloid."
        };
        break;
    // Add more cases for elements...
    // Till you reach 38
    case 'Se':
        data = {
            name: "Selenium",
            symbol: "Se",
            atomicNumber: 34,
            atomicMass: "78.971 u",
            group: "16",
            period: "4",
            block: "p-block",
            electronic: "1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup>4s<sup>2</sup>3d<sup>10</sup>4p<sup>4</sup>",
            type: "Non-metal",
            specific: "Reactive nonmetal",
            physical: "Solid",
            description: "Selenium is a chemical element with the symbol Se and atomic number 34. It is a nonmetal with properties that are intermediate between the elements above and below in the periodic table, sulfur and tellurium, and also has similarities to arsenic. It rarely occurs in its elemental state or as pure ore compounds in the Earth's crust."
        };
        break;
    // Add more cases for elements...
    // Till you reach 38
    case 'Br':
        data = {
            name: "Bromine",
            symbol: "Br",
            atomicNumber: 35,
            atomicMass: "79.904 u",
            group: "17",
            period: "4",
            block: "p-block",
            electronic: "1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup>4s<sup>2</sup>3d<sup>10</sup>4p<sup>5</sup>",
            type: "Non-metal",
            specific: "Reactive nonmetal",
            physical: "Liquid",
            description: "Bromine is a chemical element with the symbol Br and atomic number 35. It is the third-lightest Non-metal, and is a fuming red-brown liquid at room temperature that evaporates readily to form a similarly coloured gas. Its properties are thus intermediate between those of chlorine and iodine."
        };
        break;
        case 'Kr':
        data = {
            name: "Krypton",
            symbol: "Kr",
            atomicNumber: 36,
            atomicMass: "83.798 u",
            group: "18",
            period: "4",
            block: "p-block",
            electronic: "1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup>4s<sup>2</sup>3d<sup>10</sup>4p<sup>6</sup>",
            type: "Non-metal",
            specific: "Noble Gases",
            physical: "Gas",
            description: "Krypton is a chemical element with the symbol Kr and atomic number 36. It is a member of group 18 (noble gases) elements. A colorless, odorless, tasteless noble gas, krypton occurs in trace amounts in the atmosphere and is often used with other rare gases in fluorescent lamps."
        };
        break;
    case 'Rb':
        data = {
            name: "Rubidium",
            symbol: "Rb",
            atomicNumber: 37,
            atomicMass: "85.468 u",
            group: "1",
            period: "5",
            block: "s-block",
            electronic: "1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup>4s<sup>2</sup>3d<sup>10</sup>4p<sup>6</sup>5s<sup>1</sup>",
            type: "Metal",
            specific: "Alkali metal",
            physical: "Solid",
            description: "Rubidium is a chemical element with the symbol Rb and atomic number 37. Rubidium is a soft, silvery-white metallic element of the alkali metal group, with a standard atomic weight of 85.4678. Elemental rubidium is highly reactive, with properties similar to those of other alkali metals, such as very rapid oxidation in air."
        };
        break;
    case 'Sr':
        data = {
            name: "Strontium",
            symbol: "Sr",
            atomicNumber: 38,
            atomicMass: "87.62 u",
            group: "2",
            period: "5",
            block: "s-block",
            electronic: "1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup>4s<sup>2</sup>3d<sup>10</sup>4p<sup>6</sup>5s<sup>2</sup>",
            type: "Metal",
            specific: "Alkaline earth metal",
            physical: "Solid",
            description: "Strontium is a chemical element with the symbol Sr and atomic number 38. An alkaline earth metal, strontium is a soft silver-white yellowish metallic element that is highly chemically reactive. The metal forms a dark oxide layer when it is exposed to air."
        };
        break;
    // Continue adding cases for elements...
    // Till you reach 47
    case 'Y':
        data = {
            name: "Yttrium",
            symbol: "Y",
            atomicNumber: 39,
            atomicMass: "88.906 u",
            group: "3",
            period: "5",
            block: "d-block",
            electronic: "1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup>4s<sup>2</sup>3d<sup>10</sup>4p<sup>6</sup>5s<sup>2</sup>4d<sup>1</sup>",
            type: "Metal",
            specific: "Transition metal",
            physical: "Solid",
            description: "Yttrium is a chemical element with the symbol Y and atomic number 39. It is a silvery-metallic transition metal chemically similar to the lanthanides and has often been classified as a &quot;rare-earth element&quot;. Yttrium is almost always found in combination with lanthanide elements in rare-earth minerals, and is never found in nature as a free element."
        };
        break;
    
    case 'Zr':
        data = {
            name: "Zirconium",
            symbol: "Zr",
            atomicNumber: 40,
            atomicMass: "91.224 u",
            group: "4",
            period: "5",
            block: "d-block",
            electronic: "1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup>4s<sup>2</sup>3d<sup>10</sup>4p<sup>6</sup>5s<sup>2</sup>4d<sup>2</sup>",
            type: "Metal",
            specific: "Transition metal",
            physical: "Solid",
            description: "Zirconium is a chemical element with the symbol Zr and atomic number 40. It is a lustrous, grey-white, strong transition metal that closely resembles hafnium and, to a lesser extent, titanium."
        };
        break;
    // Add more cases for elements...
    // Till you reach 47
    case 'Nb':
        data = {
            name: "Niobium",
            symbol: "Nb",
            atomicNumber: 41,
            atomicMass: "92.906 u",
            group: "5",
            period: "5",
            block: "d-block",
            electronic: "1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup>4s<sup>2</sup>3d<sup>10</sup>4p<sup>6</sup>5s<sup>2</sup>4d<sup>3</sup>",
            type: "Metal",
            specific: "Transition metal",
            physical: "Solid",
            description: "Niobium, formerly known as columbium, is a chemical element with the symbol Nb and atomic number 41. Niobium is a light grey, crystalline, and ductile transition metal. Pure niobium has a hardness similar to that of pure titanium, and it has similar ductility to iron."
        };
        break;
    // Add more cases for elements...
    // Till you reach 47
    case 'Mo':
        data = {
            name: "Molybdenum",
            symbol: "Mo",
            atomicNumber: 42,
            atomicMass: "95.95 u",
            group: "6",
            period: "5",
            block: "d-block",
            electronic: "1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup>4s<sup>2</sup>3d<sup>10</sup>4p<sup>6</sup>5s<sup>1</sup>4d<sup>5</sup>",
            type: "Metal",
            specific: "Transition metal",
            physical: "Solid",
            description: "Molybdenum is a chemical element with the symbol Mo and atomic number 42. It has the sixth-highest melting point of any element, and for this reason, it is often used in high-strength steel alloys."
        };
        break;
    // Add more cases for elements...
    // Till you reach 47
    case 'Tc':
        data = {
            name: "Technetium",
            symbol: "Tc",
            atomicNumber: 43,
            atomicMass: "(98) u",
            group: "7",
            period: "5",
            block: "d-block",
            electronic: "1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup>4s<sup>2</sup>3d<sup>10</sup>4p<sup>6</sup>5s<sup>2</sup>4d<sup>5</sup>",
            type: "Metal",
            specific: "Transition metal",
            physical: "Solid",
            description: "Technetium is a chemical element with the symbol Tc and atomic number 43. It is the lightest element whose isotopes are all radioactive. Nearly all technetium is produced synthetically, and only minute amounts are found in the Earth's crust."
        };
        break;
    // Add more cases for elements...
    // Till you reach 47
    case 'Ru':
        data = {
            name: "Ruthenium",
            symbol: "Ru",
            atomicNumber: 44,
            atomicMass: "101.07 u",
            group: "8",
            period: "5",
            block: "d-block",
            electronic: "1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup>4s<sup>2</sup>3d<sup>10</sup>4p<sup>6</sup>5s<sup>2</sup>4d<sup>6</sup>",
            type: "Metal",
            specific: "Transition metal",
            physical: "Solid",
            description: "Ruthenium is a chemical element with the symbol Ru and atomic number 44. It is a rare transition metal belonging to the platinum group of the periodic table. Like the other metals of the platinum group, ruthenium is inert to most other chemicals."
        };
        break;
    // Add more cases for elements...
    // Till you reach 47
    case 'Rh':
        data = {
            name: "Rhodium",
            symbol: "Rh",
            atomicNumber: 45,
            atomicMass: "102.91 u",
            group: "9",
            period: "5",
            block: "d-block",
            electronic: "1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup>4s<sup>2</sup>3d<sup>10</sup>4p<sup>6</sup>5s<sup>2</sup>4d<sup>7</sup>",
            type: "Metal",
            specific: "Transition metal",
            physical: "Solid",
            description: "Rhodium is a chemical element with the symbol Rh and atomic number 45. It is a rare, silvery-white, hard, corrosion-resistant, and chemically inert transition metal. It is a noble metal and a member of the platinum group."
        };
        break;
    // Add more cases for elements...
    // Till you reach 47
    case 'Pd':
        data = {
            name: "Palladium",
            symbol: "Pd",
            atomicNumber: 46,
            atomicMass: "106.42 u",
            group: "10",
            period: "5",
            block: "d-block",
            electronic: "1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup>4s<sup>2</sup>3d<sup>10</sup>4p<sup>6</sup>5s<sup>2</sup>4d<sup>8</sup>",
            type: "Metal",
            specific: "Transition metal",
            physical: "Solid",
            description: "Palladium is a chemical element with the symbol Pd and atomic number 46. It is a rare and lustrous silvery-white metal discovered in 1803 by the English chemist William Hyde Wollaston. He named it after the asteroid Pallas, which was itself named after the epithet of the Greek goddess Athena, acquired by her when she slew Pallas."
        };
        break;
    // Add more cases for elements...
    // Till you reach 47
    case 'Ag':
        data = {
            name: "Silver",
            symbol: "Ag",
            atomicNumber: 47,
            atomicMass: "107.87 u",
            group: "11",
            period: "5",
            block: "d-block",
            electronic: "1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup>4s<sup>2</sup>3d<sup>10</sup>4p<sup>6</sup>5s<sup>1</sup>4d<sup>10</sup>",
            type: "Metal",
            specific: "Transition metal",
            physical: "Solid",
            description: "Silver is a chemical element with the symbol Ag and atomic number 47. A soft, white, lustrous transition metal, it exhibits the highest electrical conductivity, thermal conductivity, and reflectivity of any metal."
        };
        break;
        
        case 'Cd':
          data = {
              name: "Cadmium",
              symbol: "Cd",
              atomicNumber: 48,
              atomicMass: "112.41 u",
              group: "12",
              period: "5",
              block: "d-block",
              electronic: "1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup>4s<sup>2</sup>3d<sup>10</sup>4p<sup>6</sup>5s<sup>2</sup>4d<sup>10</sup>",
              type: "Metal",
              specific: "Transition metal",
              physical: "Solid",
              description: "Cadmium is a chemical element with the symbol Cd and atomic number 48. This soft, silvery-white metal is chemically similar to the two other stable metals in group 12, zinc and mercury. Like zinc, it demonstrates oxidation state +2 in most of its compounds, and like mercury, it has a lower melting point than the transition metals in groups 3 through 11."
          };
          break;


          
      case 'In':
          data = {
              name: "Indium",
              symbol: "In",
              atomicNumber: 49,
              atomicMass: "114.82 u",
              group: "13",
              period: "5",
              block: "p-block",
              electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p¹",
              type: "Metal",
              specific: "Post-transition metal",
              physical: "Solid",
              description: "Indium is a chemical element with the symbol In and atomic number 49. Indium is the softest metal that is not an alkali metal. It is a silvery-white metal that resembles tin in appearance. It is a post-transition metal that makes up 0.21 parts per million of the Earth's crust."
          };
          break;
      case 'Sn':
          data = {
              name: "Tin",
              symbol: "Sn",
              atomicNumber: 50,
              atomicMass: "118.71 u",
              group: "14",
              period: "5",
              block: "p-block",
              electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p²",
              type: "Metal",
              specific: "Post-transition metal",
              physical: "Solid",
              description: "Tin is a chemical element with the symbol Sn and atomic number 50. Tin is a silvery-white metal that is malleable, ductile, and highly crystalline. The largest applications of tin are in tinplate, solder alloys, and lead-free solders."
          };
          break;
      // Continue adding cases for elements...
      // Till you reach 70
      case 'Sb':
          data = {
              name: "Antimony",
              symbol: "Sb",
              atomicNumber: 51,
              atomicMass: "121.76 u",
              group: "15",
              period: "5",
              block: "p-block",
              electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p³",
              type: "Metalloid",
              specific: "Metalloid",
              physical: "Solid",
              description: "Antimony is a chemical element with the symbol Sb and atomic number 51. It is a lustrous gray metalloid, found in nature mainly as the sulfide mineral stibnite. Antimony compounds have been known since ancient times and were powdered for use as medicine and cosmetics, often known by the Arabic name, kohl."
          };
          break;
      // Add more cases for elements...
      // Till you reach 70
      case 'Te':
          data = {
              name: "Tellurium",
              symbol: "Te",
              atomicNumber: 52,
              atomicMass: "127.6 u",
              group: "16",
              period: "5",
              block: "p-block",
              electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁴",
              type: "Metalloid",
              specific: "Metalloid",
              physical: "Solid",
              description: "Tellurium is a chemical element with the symbol Te and atomic number 52. It is a brittle, mildly toxic, rare, silver-white metalloid. Tellurium is chemically related to selenium and sulfur, all three of which are chalcogens."
          };
          break;
      // Add more cases for elements...
      // Till you reach 70
      case 'I':
          data = {
              name: "Iodine",
              symbol: "I",
              atomicNumber: 53,
              atomicMass: "126.9 u",
              group: "17",
              period: "5",
              block: "p-block",
              electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁵",
              type: "Non-metal",
              specific: "Reactive nonmetal",
              physical: "Solid",
              description: "Iodine is a chemical element with the symbol I and atomic number 53. It is the heaviest of the stable Non-metals, and the 47th heaviest of 118 known elements. The element is the seventh most abundant Non-metal, being the sixty-first most abundant element overall."
          };
          break;
      // Add more cases for elements...
      // Till you reach 70
      case 'Xe':
          data = {
              name: "Xenon",
              symbol: "Xe",
              atomicNumber: 54,
              atomicMass: "131.29 u",
              group: "18",
              period: "5",
              block: "p-block",
              electronic: " 1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶",
              type: "Non-metal",
              specific: "Noble Gases",
              physical: "Gas",
              description: "Xenon is a chemical element with the symbol Xe and atomic number 54. It is a colorless, dense, odorless noble gas found in Earth's atmosphere in trace amounts. Although generally unreactive, xenon can undergo a few chemical reactions such as the formation of xenon hexafluoroplatinate, the first noble gas compound to be synthesized."
          };
          break;
      // Add more cases for elements...
      // Till you reach 70
      case 'Cs':
          data = {
              name: "Cesium",
              symbol: "Cs",
              atomicNumber: 55,
              atomicMass: "132.91 u",
              group: "1",
              period: "6",
              block: "s-block",
              electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 6s¹",
              type: "Metal",
              specific: "Alkali metal",
              physical: "Solid",
              description: "Cesium is a chemical element with the symbol Cs and atomic number 55. It is a soft, silvery-golden alkali metal with a melting point of 28.5 °C, which makes it one of only five elemental metals that are liquid at or near room temperature."
          };
          break;
      // Add more cases for elements...
      // Till you reach 70
      case 'Ba':
          data = {
              name: "Barium",
              symbol: "Ba",
              atomicNumber: 56,
              atomicMass: "137.33 u",
              group: "2",
              period: "6",
              block: "s-block",
              electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 6s²",
              type: "Metal",
              specific: "Alkaline earth metal",
              physical: "Solid",
              description: "Barium is a chemical element with the symbol Ba and atomic number 56. It is the fifth element in group 2 and is a soft, silvery alkaline earth metal. Because of its high chemical reactivity, barium is never found in nature as a free element."
          };
          break;
      // Add more cases for elements...
      // Till you reach 70
      case 'La':
          data = {
              name: "Lanthanum",
              symbol: "La",
              atomicNumber: 57,
              atomicMass: "138.91 u",
              group: "Lanthanoids",
              period: "6",
              block: "f-block",
              electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f⁰ 5d¹ 6s²",
               type: "Metal",
              specific: "Lanthanide",
              physical: "Solid",
              description: "Lanthanum is a chemical element with the symbol La and atomic number 57. It is a soft, ductile, silvery-white metal that tarnishes slowly when exposed to air and is soft enough to be cut with a knife. It is the eponym of the lanthanide series, a group of 15 similar elements between lanthanum and lutetium in the periodic table, of which lanthanum is the first and the prototype."
          };
          break;
      // Add more cases for elements...
      // Till you reach 70
      case 'Ce':
    data = {
        name: "Cerium",
        symbol: "Ce",
        atomicNumber: 58,
        atomicMass: "140.12 u",
        group: "Lanthanoids",
        period: "6",
        block: "f-block",
        electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹ 5d¹ 6s²",
         type: "Metal",
        specific: "Lanthanide",
        physical: "Solid",
        description: "Cerium is a chemical element with the symbol Ce and atomic number 58. It is a soft, ductile, silvery-white metal that tarnishes when exposed to air, and it is soft enough to be cut with a knife. Cerium is the second element in the lanthanide series."
    };
    break;
case 'Pr':
    data = {
        name: "Praseodymium",
        symbol: "Pr",
        atomicNumber: 59,
        atomicMass: "140.91 u",
        group: "Lanthanoids",
        period: "6",
        block: "f-block",
        electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f³ 5d¹ 6s²",
         type: "Metal",
        specific: "Lanthanide",
        physical: "Solid",
        description: "Praseodymium is a chemical element with the symbol Pr and atomic number 59. It is a soft, silvery, malleable and ductile metal in the lanthanide group. Praseodymium is a member of the lanthanide series and is usually found in the oxidation state +3."
    };
    break;
case 'Nd':
    data = {
        name: "Neodymium",
        symbol: "Nd",
        atomicNumber: 60,
        atomicMass: "144.24 u",
        group: "Lanthanoids",
        period: "6",
        block: "f-block",
        electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f⁴ 5d¹ 6s²",
         type: "Metal",
        specific: "Lanthanide",
        physical: "Solid",
        description: "Neodymium is a chemical element with the symbol Nd and atomic number 60. It is a soft silvery metal that tarnishes in air. Neodymium was discovered in 1885 by the Austrian chemist Carl Auer von Welsbach."
    };
    break;

      // Add more cases for elements...
      // Till you reach 70
      case 'Pm':
          data = {
              name: "Promethium",
              symbol: "Pm",
              atomicNumber: 61,
              atomicMass: "(145) u",
              group: "Lanthanoids",
              period: "6",
              block: "f-block",
              electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f⁵ 6s²",
               type: "Metal",
              specific: "Lanthanide",
              physical: "Solid",
              description: "Promethium is a chemical element with the symbol Pm and atomic number 61. All of its isotopes are radioactive; it is one of only two such elements that are followed in the periodic table by elements with stable forms, a distinction shared with technetium. Chemically, promethium is a lanthanide."
          };
          break;
      // Add more cases for elements...
      // Till you reach 70
      case 'Sm':
          data ={
            name: "Samarium",
            symbol: "Sm",
            atomicNumber: 62,
            atomicMass: "150.36 u",
            group: "Lanthanoids",
            period: "6",
            block: "f-block",
            electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f⁶ 6s²",
             type: "Metal",
            specific: "Lanthanide",
            physical: "Solid",
            description: "Samarium is a chemical element with the symbol Sm and atomic number 62. It is a moderately hard silvery metal that readily oxidizes in air. Being a typical member of the lanthanide series, samarium usually assumes the oxidation state +3."
        };
          break;
      // Add more cases for elements...
      // Till you reach 70
      case 'Eu':
        data = {
            name: "Europium",
            symbol: "Eu",
            atomicNumber: 63,
            atomicMass: "151.96 u",
            group: "Lanthanoids",
            period: "6",
            block: "f-block",
            electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f⁷ 6s²",
             type: "Metal",
            specific: "Lanthanide",
            physical: "Solid",
            description: "Europium is a chemical element with the symbol Eu and atomic number 63. It is a moderately hard, silvery metal which readily oxidizes in air and water. Europium is a member of the lanthanide series, and is used in the manufacture of fluorescent glass."
        };
        break;
    case 'Gd':
        data = {
            name: "Gadolinium",
            symbol: "Gd",
            atomicNumber: 64,
            atomicMass: "157.25 u",
            group: "Lanthanoids",
            period: "6",
            block: "f-block",
            electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f⁷ 5d¹ 6s²",
             type: "Metal",
            specific: "Lanthanide",
            physical: "Solid",
            description: "Gadolinium is a chemical element with the symbol Gd and atomic number 64. It is a silvery-white, malleable, and ductile rare-earth metal. It is found in nature only in oxidized form, and even when separated, it usually has impurities of the other rare earths."
        };
        break;
      // Add more cases for elements...
      // Till you reach 70
      case 'Tb':
        data = {
            name: "Terbium",
            symbol: "Tb",
            atomicNumber: 65,
            atomicMass: "158.93 u",
            group: "Lanthanoids",
            period: "6",
            block: "f-block",
            electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f⁹ 6s²",
             type: "Metal",
            specific: "Lanthanide",
            physical: "Solid",
            description: "Terbium is a chemical element with the symbol Tb and atomic number 65. It is a silvery-white, rare earth metal that is malleable, ductile, and soft enough to be cut with a knife. Terbium is used to dope calcium fluoride, calcium tungstate, and strontium molybdate, materials that are used in solid-state devices."
        };
        break;
    case 'Dy':
        data = {
            name: "Dysprosium",
            symbol: "Dy",
            atomicNumber: 66,
            atomicMass: "162.50 u",
            group: "Lanthanoids",
            period: "6",
            block: "f-block",
            electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁰ 6s²",
             type: "Metal",
            specific: "Lanthanide",
            physical: "Solid",
            description: "Dysprosium is a chemical element with the symbol Dy and atomic number 66. It is a rare-earth element with a metallic silver luster. Dysprosium is never found in nature as a free element, though it is found in various minerals, such as xenotime."
        };
        break;
    case 'Ho':
        data = {
            name: "Holmium",
            symbol: "Ho",
            atomicNumber: 67,
            atomicMass: "164.93 u",
            group: "Lanthanoids",
            period: "6",
            block: "f-block",
            electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹¹ 6s²",
             type: "Metal",
            specific: "Lanthanide",
            physical: "Solid",
            description: "Holmium is a chemical element with the symbol Ho and atomic number 67. It is a relatively soft and malleable silvery-white metal. Holmium is a part of the lanthanide series and is traditionally considered one of the rare-earth metals."
        };
        break;
    case 'Er':
        data = {
            name: "Erbium",
            symbol: "Er",
            atomicNumber: 68,
            atomicMass: "167.26 u",
            group: "Lanthanoids",
            period: "6",
            block: "f-block",
            electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹² 6s²",
             type: "Metal",
            specific: "Lanthanide",
            physical: "Solid",
            description: "Erbium is a chemical element with the symbol Er and atomic number 68. It is a silvery-white, soft, malleable, and ductile metal in the lanthanide series. Erbium is used in nuclear reactors as a neutron absorber and in optical amplifiers in fiber-optic communication networks."
        };
        break;
    case 'Tm':
        data = {
            name: "Thulium",
            symbol: "Tm",
            atomicNumber: 69,
            atomicMass: "168.93 u",
            group: "Lanthanoids",
            period: "6",
            block: "f-block",
            electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹³ 6s²",
             type: "Metal",
            specific: "Lanthanide",
            physical: "Solid",
            description: "Thulium is a chemical element with the symbol Tm and atomic number 69. It is a silvery-gray, lustrous, malleable, and ductile metal in the lanthanide series. Thulium is the second-least abundant of the lanthanides after promethium, which is only found in trace quantities on Earth."
        };
        break;
    case 'Yb':
        data = {
            name: "Ytterbium",
            symbol: "Yb",
            atomicNumber: 70,
            atomicMass: "173.05 u",
            group: "Lanthanoids",
            period: "6",
            block: "f-block",
            electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 6s²",
             type: "Metal",
            specific: "Lanthanide",
            physical: "Solid",
            description: "Ytterbium is a chemical element with the symbol Yb and atomic number 70. It is the fourteenth and penultimate element in the lanthanide series, which is the basis of the relative stability of its +2 oxidation state. However, like the other lanthanides, its most common oxidation state is +3, seen in its oxide, halides, and other compounds."
        };
        break;


        case 'Lu':
        data = {
            name: "Lutetium",
            symbol: "Lu",
            atomicNumber: 71,
            atomicMass: "174.97 u",
            group: "Lanthanoids",
            period: "6",
            block: "d-block",
            electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹ 6s²",
            type: "Metal",
            specific: "Transition Metal",
            physical: "Solid",
            description: "Lutetium is a chemical element with the symbol Lu and atomic number 71. It is a silvery-white metal that is relatively stable in air. Lutetium is the last element in the lanthanide series, and it is traditionally counted among the rare earths. It is sometimes considered the first element of the 6th-period transition metals."
        };
        break;
    case 'Hf':
        data = {
            name: "Hafnium",
            symbol: "Hf",
            atomicNumber: 72,
            atomicMass: "178.49 u",
            group: "4",
            period: "6",
            block: "d-block",
            electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d² 6s²",
            type: "Metal",
            specific: "Transition Metal",
            physical: "Solid",
            description: "Hafnium is a chemical element with the symbol Hf and atomic number 72. A lustrous, silvery gray, tetravalent transition metal, hafnium chemically resembles zirconium and is found in many zirconium minerals. Hafnium is used in filaments and electrodes, as a getter for oxygen and nitrogen, and as a component of high-temperature alloys."
        };
        break;
    case 'Ta':
        data = {
            name: "Tantalum",
            symbol: "Ta",
            atomicNumber: 73,
            atomicMass: "180.95 u",
            group: "5",
            period: "6",
            block: "d-block",
            electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d³ 6s²",
            type: "Metal",
            specific: "Transition Metal",
            physical: "Solid",
            description: "Tantalum is a chemical element with the symbol Ta and atomic number 73. Previously known as tantalium, it is named after Tantalus, a villain from Greek mythology. Tantalum is a rare, hard, blue-gray, lustrous transition metal that is highly corrosion-resistant. It is part of the refractory metals group, which are widely used as minor components in alloys. The chemical inertness of tantalum makes it a valuable substance for laboratory equipment and a substitute for platinum."
        };
        break;
    case 'W':
        data = {
            name: "Tungsten",
            symbol: "W",
            atomicNumber: 74,
            atomicMass: "183.84 u",
            group: "6",
            period: "6",
            block: "d-block",
            electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d⁴ 6s²",
            type: "Metal",
            specific: "Transition Metal",
            physical: "Solid",
            description: "Tungsten, or wolfram, is a chemical element with the symbol W and atomic number 74. The name tungsten comes from the former Swedish name for the tungstate mineral scheelite, tung sten or &quot;heavy stone&quot;. Tungsten is a rare metal found naturally on Earth almost exclusively combined with other elements in chemical compounds rather than alone. It was identified as a new element in 1781 and first isolated as a metal in 1783."
        };
        break;
    case 'Re':
        data = {
            name: "Rhenium",
            symbol: "Re",
            atomicNumber: 75,
            atomicMass: "186.21 u",
            group: "7",
            period: "6",
            block: "d-block",
            electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d⁵ 6s²",
            type: "Metal",
            specific: "Transition Metal",
            physical: "Solid",
            description: "Rhenium is a chemical element with the symbol Re and atomic number 75. It is a silvery-gray, heavy, third-row transition metal in group 7 of the periodic table. With an estimated average concentration of 1 part per billion (ppb), rhenium is one of the rarest elements in the Earth's crust. Rhenium has the third-highest melting point and highest boiling point of any stable element at 5903 K."
        };
        break;
    case 'Os':
        data = {
            name: "Osmium",
            symbol: "Os",
            atomicNumber: 76,
            atomicMass: "190.23 u",
            group: "8",
            period: "6",
            block: "d-block",
            electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d⁶ 6s²",
            type: "Metal",
            specific: "Transition Metal",
            physical: "Solid",
            description: "Osmium is a chemical element with the symbol Os and atomic number 76. It is a hard, brittle, bluish-white transition metal in the platinum group that is found as a trace element in alloys, mostly in platinum ores. Osmium is the densest naturally occurring element, with an experimentally measured (using x-ray crystallography) density of 22.59 g/cm³. It is also the heaviest naturally occurring element."
        };
        break;
    case 'Ir':
        data = {
            name: "Iridium",
            symbol: "Ir",
            atomicNumber: 77,
            atomicMass: "192.22 u",
            group: "9",
            period: "6",
            block: "d-block",
            electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d⁷ 6s²",
            type: "Metal",
            specific: "Transition Metal",
            physical: "Solid",
            description: "Iridium is a chemical element with the symbol Ir and atomic number 77. A very hard, brittle, silvery-white transition metal of the platinum group, iridium is considered to be the second-densest metal (after osmium) with a density of 22.56 g/cm³ as defined by experimental X-ray crystallography."
        };
        break;
    case 'Pt':
        data = {
            name: "Platinum",
            symbol: "Pt",
            atomicNumber: 78,
            atomicMass: "195.08 u",
            group: "10",
            period: "6",
            block: "d-block",
            electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d⁹ 6s¹",
            type: "Metal",
            specific: "Transition Metal",
            physical: "Solid",
            description: "Platinum is a chemical element with the symbol Pt and atomic number 78. It is a dense, malleable, ductile, highly unreactive, precious, silverish-white transition metal. Its name is derived from the Spanish term platino, meaning 'little silver'."
        };
        break;
    case 'Au':
        data = {
            name: "Gold",
            symbol: "Au",
            atomicNumber: 79,
            atomicMass: "196.97 u",
            group: "11",
            period: "6",
            block: "d-block",
            electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s¹",
            type: "Metal",
            specific: "Transition Metal",
            physical: "Solid",
            description: "Gold is a chemical element with the symbol Au and atomic number 79. It is a bright, slightly reddish yellow, dense, soft, malleable, and ductile metal in group 11 of the periodic table. Economically, gold is valuable due to its rarity in nature and its use in jewelry and electronics."
        };
        break;
    case 'Hg':
        data = {
            name: "Mercury",
            symbol: "Hg",
            atomicNumber: 80,
            atomicMass: "200.59 u",
            group: "12",
            period: "6",
            block: "d-block",
            electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s²",
            type: "Metal",
            specific: "Transition Metal",
            physical: "Liquid",
            description: "Mercury is a chemical element with the symbol Hg and atomic number 80. It is commonly known as quicksilver and was formerly named hydrargyrum. Mercury is a heavy, silvery-white liquid metal. It is the only metallic element that is liquid at standard conditions for temperature and pressure. Mercury occurs in deposits throughout the world mostly as cinnabar (mercuric sulfide)."
        };
        break;
        
            case 'Tl':
                data = {
                    name: "Thallium",
                    symbol: "Tl",
                    atomicNumber: 81,
                    atomicMass: "204.38 u",
                    group: "13",
                    period: "6",
                    block: "p-block",
                    electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p¹",
                    type: "Metal",
                    specific: "Post-Transition Metal",
                    physical: "Solid",
                    description: "Thallium is a chemical element with the symbol Tl and atomic number 81. It is a gray post-transition metal that is not found free in nature. When isolated, thallium resembles tin, but discolors when exposed to air."
                };
                break;

            case 'Pb':
                data = {
                    name: "Lead",
                    symbol: "Pb",
                    atomicNumber: 82,
                    atomicMass: "207.2 u",
                    group: "14",
                    period: "6",
                    block: "p-block",
                    electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p²",
                    type: "Metal",
                    specific: "Post-Transition Metal",
                    physical: "Solid",
                    description: "Lead is a chemical element with the symbol Pb and atomic number 82. It is a heavy metal that is denser than most common materials. Lead is soft and malleable, and also has a relatively low melting point. When freshly cut, lead is silvery with a hint of blue; it tarnishes to a dull gray color when exposed to air."
                };
                break;
            case 'Bi':
                data = {
                    name: "Bismuth",
                    symbol: "Bi",
                    atomicNumber: 83,
                    atomicMass: "208.98 u",
                    group: "15",
                    period: "6",
                    block: "p-block",
                    electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p³",
                    type: "Metal",
                    specific: "Post-Transition Metal",
                    physical: "Solid",
                    description: "Bismuth is a chemical element with the symbol Bi and atomic number 83. It is a pentavalent post-transition metal and one of the pnictogens with chemical properties resembling its lighter homologs arsenic and antimony."
                };
                break;
            case 'Po':
                data = {
                    name: "Polonium",
                    symbol: "Po",
                    atomicNumber: 84,
                    atomicMass: "209 u",
                    group: "16",
                    period: "6",
                    block: "p-block",
                    electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁴",
                    type: "Metal",
                    specific: "Post-Transition Metal",
                    physical: "Solid",
                    description: "Polonium is a chemical element with the symbol Po and atomic number 84. A rare and highly radioactive metal with no stable isotopes, polonium is chemically similar to selenium and tellurium, though its metallic character resembles that of its horizontal neighbors in the periodic table: thallium, lead, and bismuth."
                };
                break;
            case 'At':
                data = {
                    name: "Astatine",
                    symbol: "At",
                    atomicNumber: 85,
                    atomicMass: "210 u",
                    group: "17",
                    period: "6",
                    block: "p-block",
                    electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁵",
                    type: "Non-metal",
                    specific: "Metalloid",
                    physical: "Solid",
                    description: "Astatine is a chemical element with the symbol At and atomic number 85. It is the rarest naturally occurring element in the Earth's crust, occurring only as the decay product of various heavier elements. All of its isotopes are short-lived; the most stable isotope, astatine-210, has a half-life of only 8.1 hours."
                };
                break;
            case 'Rn':
                data = {
                    name: "Radon",
                    symbol: "Rn",
                    atomicNumber: 86,
                    atomicMass: "222 u",
                    group: "18",
                    period: "6",
                    block: "p-block",
                    electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶",
                    type: "Non-metal",
                    specific: "Noble Gas",
                    physical: "Gas",
                    description: "Radon is a chemical element with the symbol Rn and atomic number 86. It is a radioactive, colorless, odorless, tasteless noble gas. It occurs naturally in minute quantities as an intermediate step in the normal radioactive decay chains through which thorium and uranium slowly decay into lead and various other short-lived radioactive elements."
                };
                break;
            case 'Fr':
                data = {
                    name: "Francium",
                    symbol: "Fr",
                    atomicNumber: 87,
                    atomicMass: "223 u",
                    group: "1",
                    period: "7",
                    block: "s-block",
                    electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 7s¹",
                    type: "Metal",
                    specific: "Alkali Metal",
                    physical: "Solid",
                    description: "Francium is a chemical element with the symbol Fr and atomic number 87. It is extremely radioactive; its most stable isotope, francium-223, has a half-life of only 22 minutes. It is the second-least electronegative element, behind only caesium, and is the second rarest naturally occurring element (after astatine)."
                };
                break;
            case 'Ra':
                data = {
                    name: "Radium",
                    symbol: "Ra",
                    atomicNumber: 88,
                    atomicMass: "226 u",
                    group: "2",
                    period: "7",
                    block: "s-block",
                    electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 7s²",
                    type: "Metal",
                    specific: "Alkaline Earth Metal",
                    physical: "Solid",
                    description: "Radium is a chemical element with the symbol Ra and atomic number 88. It is the sixth element in group 2 of the periodic table, also known as the alkaline earth metals. Radium is an almost pure-white alkaline earth metal, but it readily oxidizes on exposure to air, becoming black in color."
                };
                break;
            case 'Ac':
                data = {
                    name: "Actinium",
                    symbol: "Ac",
                    atomicNumber: 89,
                    atomicMass: "227 u",
                    group: "Actinide",
                    period: "7",
                    block: "f-block",
                    electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f⁷ 6d¹ 7s²",
                    type: "Metal",
                    specific: "Actinide",
                    physical: "Solid",
                    description: "Actinium is a chemical element with the symbol Ac and atomic number 89. It was discovered in 1899 by Friedrich Oskar Giesel. It is a very rare radioactive metal and is chemically similar to the rare earth metals. Its principal isotope, 227Ac, has a half-life of about 21.772 years."
                };
                break;
            case 'Th':
                data = {
                    name: "Thorium",
                    symbol: "Th",
                    atomicNumber: 90,
                    atomicMass: "232.04 u",
                    group: "Actinide",
                    period: "7",
                    block: "f-block",
                    electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f⁰ 6d² 7s²",
                    type: "Metal",
                    specific: "Actinide",
                    physical: "Solid",
                    description: "Thorium is a weakly radioactive metallic chemical element with the symbol Th and atomic number 90. Thorium is silvery and tarnishes black when it is exposed to air, forming thorium dioxide; it is moderately hard, malleable, and has a high melting point."
                };
                break;
            case 'Pa':
                data = {
                    name: "Protactinium",
                    symbol: "Pa",
                    atomicNumber: 91,
                    atomicMass: "231.04 u",
                    group: "Actinide",
                    period: "7",
                    block: "f-block",
                    electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f² 6d¹ 7s²",
                    type: "Metal",
                    specific: "Actinide",
                    physical: "Solid",
                    description: "Protactinium is a chemical element with the symbol Pa and atomic number 91. It is a dense, silvery-gray actinide metal which readily reacts with oxygen, water vapor, and inorganic acids. It forms various chemical compounds in which protactinium is usually present in the oxidation state +5, but it can also assume +4 and even +3 or +2 states."
                };
                break;
            case 'U':
                data = {
                    name: "Uranium",
                    symbol: "U",
                    atomicNumber: 92,
                    atomicMass: "238.03 u",
                    group: "Actinide",
                    period: "7",
                    block: "f-block",
                    electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f³ 6d¹ 7s²",
                    type: "Metal",
                    specific: "Actinide",
                    physical: "Solid",
                    description: "Uranium is a chemical element with the symbol U and atomic number 92. It is a silvery-grey metal in the actinide series of the periodic table. A uranium atom has 92 protons and 92 electrons, of which 6 are valence electrons. Uranium is weakly radioactive because all isotopes of uranium are unstable; the half-lives of its naturally occurring isotopes range between 159,200 years and 4.5 billion years."
                };
                break;
            case 'Np':
                data = {
                    name: "Neptunium",
                    symbol: "Np",
                    atomicNumber: 93,
                    atomicMass: "(237) u",
                    group: "Actinide",
                    period: "7",
                    block: "f-block",
                    electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f⁴ 6d¹ 7s²",
                    type: "Metal",
                    specific: "Actinide",
                    physical: "Solid",
                    description: "Neptunium is a chemical element with the symbol Np and atomic number 93. A radioactive actinide metal, neptunium is the first transuranic element. Its position in the periodic table just after uranium, named after the planet Uranus, led to it being named after Neptune, the next planet beyond Uranus."
                };
                break;
            case 'Pu':
                data = {
                    name: "Plutonium",
                    symbol: "Pu",
                    atomicNumber: 94,
                    atomicMass: "(244) u",
                    group: "Actinide",
                    period: "7",
                    block: "f-block",
                    electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f⁶ 7s²",
                    type: "Metal",
                    specific: "Actinide",
                    physical: "Solid",
                    description: "Plutonium is a radioactive chemical element with the symbol Pu and atomic number 94. It is an actinide metal of silvery-gray appearance that tarnishes when exposed to air, and forms a dull coating when oxidized. The element normally exhibits six allotropes and four oxidation states. It reacts with carbon, Non-metals, nitrogen, silicon, and hydrogen."
                };
                break;
            case 'Am':
                data = {
                    name: "Americium",
                    symbol: "Am",
                    atomicNumber: 95,
                    atomicMass: "(243) u",
                    group: "Actinide",
                    period: "7",
                    block: "f-block",
                    electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f⁷ 7s²",
                    type: "Metal",
                    specific: "Actinide",
                    physical: "Solid",
                    description: "Americium is a synthetic chemical element with the symbol Am and atomic number 95. It is a transuranic member of the actinide series, in the periodic table located under the lanthanide element europium, and thus by analogy was named after the Americas. Americium was first produced in 1944 by the group of Glenn T. Seaborg from Berkeley, California, at the Metallurgical Laboratory of the University of Chicago, a part of the Manhattan Project."
                };
                break;
            case 'Cm':
                data = {
                    name: "Curium",
                    symbol: "Cm",
                    atomicNumber: 96,
                    atomicMass: "(247) u",
                    group: "Actinide",
                    period: "7",
                    block: "f-block",
                    electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f⁷ 6d¹ 7s²",
                    type: "Metal",
                    specific: "Actinide",
                    physical: "Solid",
                    description: "Curium is a transuranic radioactive chemical element with the symbol Cm and atomic number 96. This element of the actinide series was named after Marie and Pierre Curie – both were known for their research on radioactivity. Curium was first intentionally produced and identified in July 1944 by the group of Glenn T. Seaborg at the University of California, Berkeley."
                };
                break;
            case 'Bk':
                data = {
                    name: "Berkelium",
                    symbol: "Bk",
                    atomicNumber: 97,
                    atomicMass: "(247) u",
                    group: "Actinide",
                    period: "7",
                    block: "f-block",
                    electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f⁹ 7s²",
                    type: "Metal",
                    specific: "Actinide",
                    physical: "Solid",
                    description: "Berkelium is a transuranic radioactive chemical element with the symbol Bk and atomic number 97. It is a member of the actinide and transuranium element series. It is named after the city of Berkeley, California, the location of the University of California Radiation Laboratory where it was discovered in December 1949."
                };
                break;
            case 'Cf':
                data = {
                    name: "Californium",
                    symbol: "Cf",
                    atomicNumber: 98,
                    atomicMass: "(251) u",
                    group: "Actinide",
                    period: "7",
                    block: "f-block",
                    electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f¹⁰ 7s²",
                    type: "Metal",
                    specific: "Actinide",
                    physical: "Solid",
                    description: "Californium is a radioactive chemical element with the symbol Cf and atomic number 98. The element was first made in 1950 at the University of California Radiation Laboratory in Berkeley, by bombarding curium with alpha particles (helium-4 ions). It is an actinide element, the sixth transuranium element to be synthesized, and has the second-highest atomic mass of all the elements that have been produced in amounts large enough to see with the unaided eye (after einsteinium)."
                };
                break;
            case 'Es':
                data = {
                    name: "Einsteinium",
                    symbol: "Es",
                    atomicNumber: 99,
                    atomicMass: "(252) u",
                    group: "Actinide",
                    period: "7",
                    block: "f-block",
                    electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f¹¹ 7s²",
                    type: "Metal",
                    specific: "Actinide",
                    physical: "Solid",
                    description: "Einsteinium is a synthetic element with the symbol Es and atomic number 99. It is the seventh transuranic element, and an actinide. Einsteinium was discovered as a component of the debris of the first hydrogen bomb explosion in 1952, and named after Albert Einstein."
                };
                break;
            case 'Fm':
                data = {
                    name: "Fermium",
                    symbol: "Fm",
                    atomicNumber: 100,
                    atomicMass: "(257) u",
                    group: "Actinide",
                    period: "7",
                    block: "f-block",
                    electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f¹² 7s²",
                    type: "Metal",
                    specific: "Actinide",
                    physical: "Solid",
                    description: "Fermium is a synthetic element with the symbol Fm and atomic number 100. It is a member of the actinide series. It is a radioactive metal that is synthesized by bombarding plutonium with neutrons. It was discovered in the debris of the first hydrogen bomb explosion in 1952, and named after physicist Enrico Fermi."
                };
                break;
            
                case 'Md':
                  data = {
                      name: "Mendelevium",
                      symbol: "Md",
                      atomicNumber: 101,
                      atomicMass: "(258) u",
                      group: "Actinide",
                      period: "7",
                      block: "f-block",
                      electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f¹³ 7s²",
                      type: "Metal",
                      specific: "Actinide",
                      physical: "Solid",
                      description: "Mendelevium is a synthetic element with the symbol Md (formerly Mv) and atomic number 101. A metallic radioactive transuranic element in the actinide series, it is the first element that currently cannot be produced in macroscopic quantities through neutron bombardment of lighter elements. It is named after Dmitri Mendeleev, father of the periodic table of the chemical elements."
                  };
                  break;
              case 'No':
                  data = {
                      name: "Nobelium",
                      symbol: "No",
                      atomicNumber: 102,
                      atomicMass: "(259) u",
                      group: "Actinide",
                      period: "7",
                      block: "f-block",
                      electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f¹⁴ 7s²",
                      type: "Metal",
                      specific: "Actinide",
                      physical: "Solid",
                      description: "Nobelium is a synthetic chemical element with the symbol No and atomic number 102. It is named in honor of Alfred Nobel, the inventor of dynamite and benefactor of science. A radioactive metal, it is the tenth transuranic element and is the penultimate member of the actinide series."
                  };
                  break;
              case 'Lr':
                  data = {
                      name: "Lawrencium",
                      symbol: "Lr",
                      atomicNumber: 103,
                      atomicMass: "(266) u",
                      group: "3",
                      period: "7",
                      block: "d-block",
                      electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f¹⁴ 6d¹ 7s²",
                      type: "Metal",
                      specific: "Transition Metal",
                      physical: "Solid",
                      description: "Lawrencium is a synthetic chemical element with the symbol Lr and atomic number 103. It is named in honor of Ernest Lawrence, inventor of the cyclotron, a device that was used to discover many artificial radioactive elements. A radioactive metal, lawrencium is the eleventh transuranic element and is also the final member of the actinide series."
                  };
                  break;
              case 'Rf':
                  data = {
                      name: "Rutherfordium",
                      symbol: "Rf",
                      atomicNumber: 104,
                      atomicMass: "(267) u",
                      group: "4",
                      period: "7",
                      block: "d-block",
                      electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f¹⁴ 6d² 7s²",
                      type: "Metal",
                      specific: "Transition Metal",
                      physical: "Unknown",
                      description: "Rutherfordium is a synthetic chemical element with the symbol Rf and atomic number 104, named after physicist Ernest Rutherford. It is a synthetic element (an element that can be created in a laboratory but is not found in nature) and is radioactive; the most stable known isotope, 267Rf, has a half-life of approximately 1.3 hours."
                  };
                  break;
              case 'Db':
                  data = {
                      name: "Dubnium",
                      symbol: "Db",
                      atomicNumber: 105,
                      atomicMass: "(268) u",
                      group: "5",
                      period: "7",
                      block: "d-block",
                      electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f¹⁴ 6d³ 7s²",
                      type: "Metal",
                      specific: "Transition Metal",
                      physical: "Unknown",
                      description: "Dubnium is a synthetic chemical element with the symbol Db and atomic number 105. Dubnium is highly radioactive: the most stable known isotope, dubnium-268, has a half-life of about 28 hours. This greatly limits the extent of research on dubnium."
                  };
                  break;
              case 'Sg':
                  data = {
                      name: "Seaborgium",
                      symbol: "Sg",
                      atomicNumber: 106,
                      atomicMass: "(269) u",
                      group: "6",
                      period: "7",
                      block: "d-block",
                      electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f¹⁴ 6d⁴ 7s²",
                      type: "Metal",
                      specific: "Transition Metal",
                      physical: "Unknown",
                      description: "Seaborgium is a synthetic element with the symbol Sg and atomic number 106. It is named after the American nuclear chemist Glenn T. Seaborg. As a synthetic element, it can be created in a laboratory but is not found in nature. It is also radioactive; the most stable known isotope, seaborgium-269, has a half-life of about 1.3 minutes."
                  };
                  break;
              case 'Bh':
                  data = {
                      name: "Bohrium",
                      symbol: "Bh",
                      atomicNumber: 107,
                      atomicMass: "(270) u",
                      group: "7",
                      period: "7",
                      block: "d-block",
                      electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f¹⁴ 6d⁵ 7s²",
                      type: "Metal",
                      specific: "Transition Metal",
                      physical: "Unknown",
                      description: "Bohrium is a synthetic chemical element with the symbol Bh and atomic number 107. It is named after Danish physicist Niels Bohr. It is a synthetic element and radioactive; the most stable known isotope, bohrium-270, has a half-life of approximately 61 seconds."
                  };
                  break;
              case 'Hs':
                  data = {
                      name: "Hassium",
                      symbol: "Hs",
                      atomicNumber: 108,
                      atomicMass: "(269) u",
                      group: "8",
                      period: "7",
                      block: "d-block",
                      electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f¹⁴ 6d⁶ 7s²",
                      type: "Metal",
                      specific: "Transition Metal",
                      physical: "Unknown",
                      description: "Hassium is a synthetic chemical element with the symbol Hs and atomic number 108. It was first synthesized in 1984 by a German research team led by Peter Armbruster and Gottfried Münzenberg at the Institute for Heavy Ion Research (Gesellschaft für Schwerionenforschung) in Darmstadt. It is named after the German state of Hesse."
                  };
                  break;
              case 'Mt':
                  data = {
                      name: "Meitnerium",
                      symbol: "Mt",
                      atomicNumber: 109,
                      atomicMass: "(278) u",
                      group: "9",
                      period: "7",
                      block: "d-block",
                      electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f¹⁴ 6d⁷ 7s²",
                      type: "Unknown",
                      specific: "Unknown",
                      physical: "Unknown",
                      description: "Meitnerium is a synthetic chemical element with the symbol Mt and atomic number 109. It is an extremely radioactive synthetic element (an element not found naturally). The most stable known isotope, meitnerium-278, has a half-life of 7.6 seconds, although the unconfirmed meitnerium-282 may have a longer half-life of about 67 seconds."
                  };
                  break;
              case 'Ds':
                  data = {
                      name: "Darmstadtium",
                      symbol: "Ds",
                      atomicNumber: 110,
                      atomicMass: "(281) u",
                      group: "10",
                      period: "7",
                      block: "d-block",
                      electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f¹⁴ 6d⁸ 7s²",
                      type: "Unknown",
                      specific: "Unknown",
                      physical: "Unknown",
                      description: "Darmstadtium is a synthetic chemical element with the symbol Ds and atomic number 110. It is an extremely radioactive synthetic element. The most stable known isotope, darmstadtium-281, has a half-life of approximately 12.7 seconds."
                  };
                  break;
              case 'Rg':
                  data = {
                      name: "Roentgenium",
                      symbol: "Rg",
                      atomicNumber: 111,
                      atomicMass: "(282) u",
                      group: "11",
                      period: "7",
                      block: "d-block",
                      electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f¹⁴ 6d⁹ 7s²",
                      type: "Unknown",
                      specific: "Unknown",
                      physical: "Unknown",
                      description: "Roentgenium is a synthetic chemical element with the symbol Rg and atomic number 111. It is an extremely radioactive synthetic element. The most stable known isotope, roentgenium-282, has a half-life of approximately 2.1 minutes, although an unconfirmed isotope, roentgenium-286, may have a longer half-life of about 10.7 minutes."
                  };
                  break;
              case 'Cn':
                  data = {
                      name: "Copernicium",
                      symbol: "Cn",
                      atomicNumber: 112,
                      atomicMass: "(285) u",
                      group: "12",
                      period: "7",
                      block: "d-block",
                      electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f¹⁴ 6d¹⁰ 7s²",
                      type: "Unknown",
                      specific: "Unknown",
                      physical: "Unknown",
                      description: "Copernicium is a synthetic chemical element with the symbol Cn and atomic number 112. It is an extremely radioactive element and can only be created in a laboratory. The most stable known isotope, copernicium-285, has a half-life of approximately 29 seconds."
                  };
                  break;
              case 'Nh':
                  data = {
                      name: "Nihonium",
                      symbol: "Nh",
                      atomicNumber: 113,
                      atomicMass: "(286) u",
                      group: "13",
                      period: "7",
                      block: "p-block",
                      electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f¹⁴ 6d¹⁰ 7s² 7p¹",
                      type: "Unknown",
                      specific: "Unknown",
                      physical: "Unknown",
                      description: "Nihonium is a synthetic chemical element with the symbol Nh and atomic number 113. It is extremely radioactive; its most stable known isotope, nihonium-286, has a half-life of about 10 seconds. In the periodic table, nihonium is a transactinide element in the p-block."
                  };
                  break;
              case 'Fl':
                  data = {
                      name: "Flerovium",
                      symbol: "Fl",
                      atomicNumber: 114,
                      atomicMass: "(289) u",
                      group: "14",
                      period: "7",
                      block: "p-block",
                      electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f¹⁴ 6d¹⁰ 7s² 7p²",
                      type: "Unknown",
                      specific: "Unknown",
                      physical: "Unknown",
                      description: "Flerovium is a synthetic element with the symbol Fl and atomic number 114. It is an extremely radioactive synthetic element. The element is named after the Flerov Laboratory of Nuclear Reactions of the Joint Institute for Nuclear Research in Dubna, Russia, where the element was discovered in 1998."
                  };
                  break;
              case 'Mc':
                  data = {
                      name: "Moscovium",
                      symbol: "Mc",
                      atomicNumber: 115,
                      atomicMass: "(290) u",
                      group: "15",
                      period: "7",
                      block: "p-block",
                      electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f¹⁴ 6d¹⁰ 7s² 7p³",
                      type: "Unknown",
                      specific: "Unknown",
                      physical: "Unknown",
                      description: "Moscovium is a synthetic chemical element with the symbol Mc and atomic number 115. It was first synthesized in 2003 by a joint team of Russian and American scientists at the Joint Institute for Nuclear Research (JINR) in Dubna, Russia. In December 2015, it was recognized as one of four new elements by the Joint Working Party of international scientific bodies IUPAC and IUPAP. On 28 November 2016, it was officially named."
                  };
                  break;
              case 'Lv':
                  data = {
                      name: "Livermorium",
                      symbol: "Lv",
                      atomicNumber: 116,
                      atomicMass: "(293) u",
                      group: "16",
                      period: "7",
                      block: "p-block",
                      electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f¹⁴ 6d¹⁰ 7s² 7p⁴",
                      type: "Unknown",
                      specific: "Unknown",
                      physical: "Unknown",
                      description: "Livermorium is a synthetic chemical element with the symbol Lv and atomic number 116. It is an extremely radioactive element that has only been created in the laboratory and has not been observed in nature. The element is named after the Lawrence Livermore National Laboratory in the United States."
                  };
                  break;
                  case 'Ts':
                    data = {
                        name: "Tennessine",
                        symbol: "Ts",
                        atomicNumber: 117,
                        atomicMass: "(294) u",
                        group: "17",
                        period: "7",
                        block: "p-block",
                        electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f¹⁴ 6d¹⁰ 7s² 7p⁵",
                        type: "Unknown",
                        specific: "Unknown",
                        physical: "Unknown",
                        description: "Tennessine is a synthetic chemical element with the symbol Ts and atomic number 117. It is the second-heaviest known element and the penultimate element of the 7th period of the periodic table. The discovery of tennessine was officially announced in Dubna, Russia, by a Russian–American collaboration in 2010, which makes it the most recently discovered element as of 2020."
                    };
                    break;
                case 'Og':
                    data = {
                        name: "Oganesson",
                        symbol: "Og",
                        atomicNumber: 118,
                        atomicMass: "(294) u",
                        group: "18",
                        period: "7",
                        block: "p-block",
                        electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f¹⁴ 6d¹⁰ 7s² 7p⁶",
                        type: "Non-metal",
                        specific: "Noble Gas",
                        physical: "Gas",
                        description: "Oganesson is a synthetic chemical element with the symbol Og and atomic number 118. It was first synthesized in 2002 by a joint team of Russian and American scientists at the Joint Institute for Nuclear Research (JINR) in Dubna, Russia. In December 2015, it was recognized as one of four new elements by the Joint Working Party of international scientific bodies IUPAC and IUPAP. On 28 November 2016, it was officially named after Russian physicist Yuri Oganessian, who helped discover several superheavy elements."
                      };

                    }
                  
                    return data;
                  }
