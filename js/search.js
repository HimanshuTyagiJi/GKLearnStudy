// Levenshtein Distance function to calculate similarity between two strings
function levenshteinDistance(a, b) {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

const data = [
 
  {
    "title": "Unit Conversion: Definition and Importance",
    "url": "https://gklearnstudy.in/conversion.html",
    "paragraph": "Unit conversion is the process of converting a quantity expressed in one unit to another unit. It helps in standardizing measurements across different systems and makes calculations simpler. Usage: 1. Scientific research 2. Engineering projects 3. Daily life measurements Importance: Unit conversion ensures accuracy and consistency in various fields like construction, medicine, and global trade.",
    "image": "https://gklearnstudy.in/images/conversion.webp"
  },
  {
    "title": "Angle Conversion: Definition and Types",
    "url": "https://gklearnstudy.in/conversion/angle-unit-conversion",
    "paragraph": "Angle conversion is the process of converting angles between different units like degrees, radians, and gradians. Types: 1. Degree to Radian 2. Radian to Degree 3. Degree to Gradian",
    "image": "https://gklearnstudy.in/images/angle-unit-conversion.webp"
  },
  {
    "title": "Area Conversion: Definition and Types",
    "url": "https://gklearnstudy.in/conversion/area-unit-conversion",
    "paragraph": "Area conversion refers to converting measurements of area between units like square meters, acres, and hectares. Types: 1. Square Meter to Acre 2. Hectare to Square Kilometer 3. Square Foot to Square Yard",
    "image": "https://gklearnstudy.in/images/area-unit-conversion.webp"
  },
  {
    "title": "Length Conversion: Definition and Types",
    "url": "https://gklearnstudy.in/conversion/length-unit-conversion",
    "paragraph": "Length conversion involves converting units of length like meters, kilometers, miles, and feet. Types: 1. Meter to Kilometer 2. Mile to Kilometer 3. Feet to Inches",
    "image": "https://gklearnstudy.in/images/length-unit-conversion.webp"
  },
  {
    "title": "Power Conversion: Definition and Types",
    "url": "https://gklearnstudy.in/conversion/power-unit-conversion",
    "paragraph": "Power conversion is the process of converting power units like watts, horsepower, and kilowatts. Types: 1. Watt to Kilowatt 2. Horsepower to Watt 3. Kilowatt to Megawatt",
    "image": "https://gklearnstudy.in/images/power-unit-conversion.webp"
  },
  {
    "title": "Pressure Conversion: Definition and Types",
    "url": "https://gklearnstudy.in/conversion/pressure-unit-conversion",
    "paragraph": "Pressure conversion involves changing units of pressure like pascals, bars, and psi (pounds per square inch). Types: 1. Pascal to Bar 2. Bar to Psi 3. Psi to Pascal",
    "image": "https://gklearnstudy.in/images/pressure-unit-conversion.webp"
  },
  {
    "title": "Speed Conversion: Definition and Types",
    "url": "https://gklearnstudy.in/conversion/speed-unit-conversion",
    "paragraph": "Speed conversion refers to converting speed measurements between units like kilometers per hour, miles per hour, and meters per second. Types: 1. Kilometer per Hour to Mile per Hour 2. Mile per Hour to Meter per Second 3. Kilometer per Hour to Meter per Second",
    "image": "https://gklearnstudy.in/images/speed-unit-conversion.webp"
  },
  {
    "title": "Temperature Conversion: Definition and Types",
    "url": "https://gklearnstudy.in/conversion/temperature-unit-conversion",
    "paragraph": "Temperature conversion involves converting temperature units like Celsius, Fahrenheit, and Kelvin. Types: 1. Celsius to Fahrenheit 2. Fahrenheit to Kelvin 3. Kelvin to Celsius",
    "image": "https://gklearnstudy.in/images/temperature-unit-conversion.webp"
  },
  {
    "title": "Time Conversion: Definition and Types",
    "url": "https://gklearnstudy.in/conversion/time-unit-conversion",
    "paragraph": "Time conversion refers to converting time units like seconds, minutes, hours, and days. Types: 1. Seconds to Minutes 2. Minutes to Hours 3. Hours to Days",
    "image": "https://gklearnstudy.in/images/time-unit-conversion.webp"
  },
  {
    "title": "Volume Conversion: Definition and Types",
    "url": "https://gklearnstudy.in/conversion/volume-unit-conversion",
    "paragraph": "Volume conversion is the process of converting units of volume like liters, milliliters, and cubic meters. Types: 1. Liter to Milliliter 2. Cubic Meter to Liter 3. Gallon to Liter",
    "image": "https://gklearnstudy.in/images/volume-unit-conversion.webp"
  },
  {
    "title": "Weight , Mass Conversion: Definition and Types",
    "url": "https://gklearnstudy.in/conversion/weight&amp;mass-unit-conversion",
    "paragraph": "Weight and mass conversion involves converting units like kilograms, grams, and pounds. Types: 1. Kilogram to Gram 2. Pound to Kilogram 3. Gram to Milligram",
    "image": "https://gklearnstudy.in/images/weight-mass-unit-conversion.webp"
  },
  {
    "title": "भाषा और व्याकरण: परिभाषा, भेद और उपयोग",
    "url": "https://gklearnstudy.in/vyakaran-language.html",
    "paragraph": "भाषा वह माध्यम है जिससे हम अपने विचार और भावनाओं को व्यक्त करते हैं। व्याकरण भाषा के शुद्ध प्रयोग और सही नियमों का समूह है। भेद: 1. बोली भाषा 2. लिखित भाषा उपयोग: भाषा का सही और प्रभावशाली उपयोग व्याकरण के ज्ञान पर निर्भर करता है।",
    "image": "https://gklearnstudy.in/images/language.webp"
  },
  {
    "title": "वर्ण-विचार: परिभाषा, भेद और उदाहरण",
    "url": "https://gklearnstudy.in/vyakaran/phonology-in-hindi.html",
    "paragraph": "वर्ण-विचार में भाषा के ध्वनियों या वर्णों का अध्ययन होता है। भेद: 1. स्वर (अ, आ, इ, ई आदि) 2. व्यंजन (क, ख, ग, घ आदि) 3. संयुक्त वर्ण (क्ष, त्र, ज्ञ आदि) उदाहरण: हिंदी वर्णमाला में 52 वर्ण होते हैं।",
    "image": "https://gklearnstudy.in/images/phonology.webp"
  },
  {
    "title": "शब्द-विचार: परिभाषा, प्रकार और विशेषताएँ",
    "url": "https://gklearnstudy.in/vyakaran/morphology-in-hindi.html",
    "paragraph": "शब्द-विचार शब्दों की रचना और उनके अर्थ का अध्ययन करता है। प्रकार: 1. संज्ञा 2. सर्वनाम 3. विशेषण 4. क्रिया विशेषता: शब्द-विचार से हमें शब्दों के सही उपयोग का ज्ञान होता है।",
    "image": "https://gklearnstudy.in/images/morphology.webp"
  },
  {
    "title": "वाक्य-विचार: परिभाषा, भेद और उपयोग",
    "url": "https://gklearnstudy.in/vyakaran/syntax-in-hindi.html",
    "paragraph": "वाक्य-विचार में वाक्य की संरचना और उसके प्रकारों का अध्ययन होता है। भेद: 1. सरल वाक्य 2. मिश्र वाक्य 3. संयुक्त वाक्य उपयोग: वाक्य-विचार सही और प्रभावी संवाद स्थापित करने में सहायक होता है।",
    "image": "https://gklearnstudy.in/images/syntax.webp"
  }
,
  {
    "title": "वाच्य: परिभाषा, भेद और उदाहरण",
    "url": "https://gklearnstudy.in/vyakaran/voice-in-hindi.html",
    "paragraph": "वाच्य उस रूप को कहते हैं जिससे यह ज्ञात होता है कि कर्ता, क्रिया पर स्वयं प्रभाव डाल रहा है या किसी अन्य से प्रभावित हो रहा है। भेद: 1. कर्तृवाच्य 2. कर्मवाच्य 3. भाववाच्य उदाहरण: राम ने पत्र लिखा (कर्तृवाच्य), पत्र लिखा गया (कर्मवाच्य), यहाँ नहाया जाता है (भाववाच्य)।",
    "image": "https://gklearnstudy.in/images/voice.webp"
  },
  {
    "title": "पुरुष: परिभाषा, भेद और उदाहरण",
    "url": "https://gklearnstudy.in/vyakaran/person-in-hindi.html",
    "paragraph": "पुरुष वह व्याकरणिक श्रेणी है जिससे वाचक और श्रोता के बीच संबंध का बोध होता है। भेद: 1. उत्तम पुरुष 2. मध्यम पुरुष 3. अन्य पुरुष उदाहरण: मैं स्कूल जाता हूँ।",
    "image": "https://gklearnstudy.in/images/person.webp"
  },
  {
    "title": "विराम-चिह्न: परिभाषा, भेद और उदाहरण",
    "url": "https://gklearnstudy.in/vyakaran/punctuation-in-hindi.html",
    "paragraph": "विराम-चिह्न वाक्य के पढ़ने में सही स्थान पर ठहराव और भाव समझाने के लिए उपयोग होते हैं। भेद: 1. पूर्ण विराम 2. अल्पविराम 3. प्रश्नवाचक चिह्न 4. उद्धरण चिह्न उदाहरण: वह कहाँ गया? \"मैंने कहा, रुको।\"",
    "image": "https://gklearnstudy.in/images/punctuation.webp"
  },
  {
    "title": "उपसर्ग: परिभाषा, प्रकार और उदाहरण",
    "url": "https://gklearnstudy.in/vyakaran/prefix-in-hindi.html",
    "paragraph": "उपसर्ग वे अक्षर होते हैं जो शब्द के पहले जोड़कर उसके अर्थ में बदलाव लाते हैं। प्रकार: 1. संस्कृत मूल के उपसर्ग 2. हिंदी के उपसर्ग उदाहरण: प्रतिदिन, अनपढ़।",
    "image": "https://gklearnstudy.in/images/prefix.webp"
  },
  {
    "title": "प्रत्यय: परिभाषा, प्रकार और उदाहरण",
    "url": "https://gklearnstudy.in/vyakaran/suffix-in-hindi.html",
    "paragraph": "प्रत्यय वे अक्षर हैं जो शब्द के अंत में जोड़कर नए शब्द का निर्माण करते हैं। प्रकार: 1. कृत प्रत्यय 2. तद्धित प्रत्यय उदाहरण: नायक + ता = नायकता।",
    "image": "https://gklearnstudy.in/images/suffix.webp"
  },
  {
    "title": "संधि: परिभाषा, प्रकार और उदाहरण",
    "url": "https://gklearnstudy.in/vyakaran/joining.html",
    "paragraph": "संधि दो शब्दों या अक्षरों के मेल से नए शब्द का निर्माण है। भेद: 1. स्वर संधि 2. व्यंजन संधि 3. विसर्ग संधि उदाहरण: विद्य + आलय = विद्यालय।",
    "image": "https://gklearnstudy.in/images/joining.webp"
  },
  {
    "title": "समास: परिभाषा, भेद और उदाहरण",
    "url": "https://gklearnstudy.in/vyakaran/compound-in-hindi.html",
    "paragraph": "समास दो या अधिक शब्दों के मेल से बनी संक्षिप्त रूप को कहते हैं। भेद: 1. तत्पुरुष समास 2. कर्मधारय समास 3. द्वंद्व समास 4. बहुव्रीहि समास उदाहरण: गंगाजल।",
    "image": "https://gklearnstudy.in/images/compound.webp"
  },
  {
    "title": "तत्सम-तद्भव: परिभाषा और उदाहरण",
    "url": "https://gklearnstudy.in/vyakaran/tatsam-tadbhav-in-hindi.html",
    "paragraph": "तत्सम वे शब्द हैं जो संस्कृत से बिना किसी परिवर्तन के लिए गए हैं। तद्भव वे शब्द हैं जो संस्कृत के शब्दों से उत्पन्न होकर बदल गए हैं। उदाहरण: तत्सम - सूर्य, पुत्र; तद्भव - सूरज, बेटा।",
    "image": "https://gklearnstudy.in/images/tatsam-tadbhav.webp"
  },
  {
    "title": "देशज-विदेशज: परिभाषा और उदाहरण",
    "url": "https://gklearnstudy.in/vyakaran/deshaj-videshaj-in-hindi.html",
    "paragraph": "देशज वे शब्द हैं जो भारतीय भाषाओं में बने हैं और किसी अन्य भाषा से लिए नहीं गए हैं। विदेशज वे शब्द हैं जो विदेशी भाषाओं से लिए गए हैं। उदाहरण: देशज - कुत्ता, पगड़ी; विदेशज - टेबल, पेन।",
    "image": "https://gklearnstudy.in/images/deshaj-videshaj.webp"
  },
  {
    "title": "विलोम-शब्द: परिभाषा और उदाहरण",
    "url": "https://gklearnstudy.in/vyakaran/antonyms-in-hindi.html",
    "paragraph": "विलोम-शब्द का अर्थ होता है विपरीत अर्थ वाले शब्द। उदाहरण: अच्छा - बुरा, दिन - रात, उजाला - अंधेरा।",
    "image": "https://gklearnstudy.in/images/antonyms.webp"
  },
  {
    "title": "पर्यायवाची-शब्द: परिभाषा और उदाहरण",
    "url": "https://gklearnstudy.in/vyakaran/synonyms-in-hindi.html",
    "paragraph": "पर्यायवाची शब्द वे होते हैं जिनका अर्थ समान होता है। उदाहरण: सूर्य - रवि, दिनकर; जल - पानी, नीर।",
    "image": "https://gklearnstudy.in/images/synonyms.webp"
  },
  {
    "title": "मुहावरे: परिभाषा, प्रकार और उदाहरण",
    "url": "https://gklearnstudy.in/vyakaran/idioms-in-hindi.html",
    "paragraph": "मुहावरे वाक्यांश होते हैं, जिनका अर्थ उनके शब्दार्थ से भिन्न होता है। उदाहरण: 1. नाक कटना - अपमान होना 2. कान भरना - चुगली करना 3. आटे-दाल का भाव पता चलना - कठिनाई का अनुभव होना।",
    "image": "https://gklearnstudy.in/images/idioms.webp"
  },
  {
    "title": "लोकोक्तियां: परिभाषा और उदाहरण",
    "url": "https://gklearnstudy.in/vyakaran/proverbs-in-hindi.html",
    "paragraph": "लोकोक्तियां जनसामान्य में प्रचलित कहावतें हैं, जिनमें जीवन के अनुभवों का सार होता है। उदाहरण: 1. जैसा बोओगे, वैसा काटोगे। 2. अधजल गगरी छलकत जाए। 3. अकेला चना भाड़ नहीं फोड़ सकता।",
    "image": "https://gklearnstudy.in/images/proverbs.webp"
  },
  {
    "title": "अनेक शब्दों के लिए एक शब्द: परिभाषा और उदाहरण",
    "url": "https://gklearnstudy.in/vyakaran/one-word-substitution-in-hindi.html",
    "paragraph": "अनेक शब्दों के लिए एक शब्द वे होते हैं जो एक वाक्य या वाक्यांश का संक्षिप्त रूप में अर्थ देते हैं। उदाहरण: 1. जो कभी मरता नहीं - अमर 2. जो सब कुछ जानता हो - सर्वज्ञ 3. जो सब जगह विद्यमान हो - सर्वव्यापी।",
    "image": "https://gklearnstudy.in/images/one-word.webp"
  },
  {
    "title": "एकार्थक शब्द: परिभाषा और उदाहरण",
    "url": "https://gklearnstudy.in/vyakaran/words-of-many-meanings-in-hindi.html",
    "paragraph": "एकार्थक शब्द वे शब्द होते हैं जिनका अर्थ एक ही होता है। उदाहरण: 1. वसंत, ऋतुराज, मधुमास - सभी का अर्थ बसंत ऋतु। 2. जल, नीर, पानी - सभी का अर्थ जल। 3. सूर्य, दिनकर, भानु - सभी का अर्थ सूर्य।",
    "image": "https://gklearnstudy.in/images/many-meanings.webp"
  },
  {
    "title": "एकार्थक प्रतीत होने वाले शब्द: परिभाषा और उदाहरण",
    "url": "https://gklearnstudy.in/vyakaran/words-apparently-similar-in-meanings-in-hindi.html",
    "paragraph": "एकार्थक प्रतीत होने वाले शब्द वे होते हैं जिनका अर्थ सतही रूप से समान लगता है, परंतु वास्तविक अर्थ भिन्न होता है। उदाहरण: 1. ज्ञान (बुद्धिमत्ता) और विद्या (शिक्षा) 2. प्रेम (स्नेह) और मोह (आसक्ति) 3. सुख (आनंद) और आराम (विश्राम)।",
    "image": "https://gklearnstudy.in/images/similar-words.webp"
  },
  {
    "title": "त्रुटिसम भिन्नार्थक शब्द: परिभाषा और उदाहरण",
    "url": "https://gklearnstudy.in/vyakaran/pairs-of-similar-words.html",
    "paragraph": "त्रुटिसम भिन्नार्थक शब्द वे शब्द होते हैं जो उच्चारण में समान होते हैं, परंतु उनके अर्थ भिन्न होते हैं। उदाहरण: 1. करण (कारण) और करण (इंद्रिय) 2. वृत (गोल) और वृत्त (घटना) 3. पथ (मार्ग) और पत (गिरना)।",
    "image": "https://gklearnstudy.in/images/similar-words.webp"
  },
  {
    "title": "युग्म शब्द: परिभाषा और उदाहरण",
    "url": "https://gklearnstudy.in/vyakaran/yugm-shabd.html",
    "paragraph": "युग्म शब्द वे शब्द होते हैं जिनका उच्चारण समान होता है, लेकिन उनके अर्थ और उपयोग भिन्न होते हैं। उदाहरण: 1. दूध (पेय पदार्थ) और दूध (दूध देना) 2. कल (भविष्य) और कल (यंत्र) 3. फल (उपज) और फल (परिणाम)।",
    "image": "https://gklearnstudy.in/images/yugm-shabd.webp"
  },
  {
    "title": "रस: परिभाषा, प्रकार और उदाहरण",
    "url": "https://gklearnstudy.in/vyakaran/ras-in-hindi.html",
    "paragraph": "रस एक भावनात्मक अनुभव है जो कविता, नाटक, और अन्य साहित्यिक कृतियों में व्यक्त होता है। रस के प्रमुख प्रकार हैं: 1. शान्त रस 2. वीर रस 3. करुण रस 4. हास्य रस 5. अद्भुत रस 6. भयानक रस 7. ऊष्मा रस।",
    "image": "https://gklearnstudy.in/images/ras.webp"
  },
  {
    "title": "छन्द: परिभाषा, प्रकार और उदाहरण",
    "url": "https://gklearnstudy.in/vyakaran/chhand-in-hindi.html",
    "paragraph": "छन्द कविता की वह विशेषता है जो उसकी मीटर, लय, और स्वर से जुड़ी होती है। प्रमुख छन्द प्रकार हैं: 1. श्लोक 2. त्रुटिका 3. चौपाई 4. रजत छन्द 5. सवैया।",
    "image": "https://gklearnstudy.in/images/chhand.webp"
  },
  {
    "title": "अलंकार: परिभाषा, प्रकार और उदाहरण",
    "url": "https://gklearnstudy.in/vyakaran/alankar-in-hindi.html",
    "paragraph": "अलंकार शब्दों की सुंदरता बढ़ाने वाले तत्व होते हैं। प्रमुख अलंकार प्रकार हैं: 1. उपमा अलंकार 2. रूपक अलंकार 3. उत्प्रेक्षा अलंकार 4. अनुप्रास अलंकार 5. यमक अलंकार।",
    "image": "https://gklearnstudy.in/images/alankar.webp"
  },
  {
    "title": "अनुच्छेद-लेखन: परिभाषा, विशेषताएँ और उदाहरण",
    "url": "https://gklearnstudy.in/vyakaran/paragraph-writing-in-hindi.html",
    "paragraph": "अनुच्छेद-लेखन एक लिखित कार्य है जिसमें किसी विषय पर संक्षिप्त और संगठित तरीके से विचार प्रस्तुत किए जाते हैं। अनुच्छेद के मुख्य तत्व हैं: 1. प्रारंभिक वाक्य 2. मुख्य विचार 3. उपविचार 4. निष्कर्ष।",
    "image": "https://gklearnstudy.in/images/paragraph-writing.webp"
  },
  {
    "title": "अपठित-गद्यांश: परिभाषा, विशेषताएँ और उदाहरण",
    "url": "https://gklearnstudy.in/vyakaran/unseen-passage-in-hindi.html",
    "paragraph": "अपठित-गद्यांश एक लिखित अंश होता है जिसे छात्रों को बिना पूर्व जानकारी के समझने के लिए दिया जाता है। इसके मुख्य तत्व हैं: 1. संदर्भ 2. सारांश 3. प्रश्न-उत्तर।",
    "image": "https://gklearnstudy.in/images/unseen-passage.webp"
  },
  {
    "title": "पत्र-लेखन: परिभाषा, विशेषताएँ और उदाहरण",
    "url": "https://gklearnstudy.in/vyakaran/letter-writing-in-hindi.html",
    "paragraph": "पत्र-लेखन एक संवाद का साधन है जिसमें व्यक्ति अपनी भावनाएँ, विचार, या सूचनाएँ व्यक्त करता है। पत्र के प्रकार हैं: 1. व्यक्तिगत पत्र 2. व्यावसायिक पत्र 3. आधिकारिक पत्र।",
    "image": "https://gklearnstudy.in/images/letter-writing.webp"
  },
  {
    "title": "निबंध: परिभाषा, विशेषताएँ और उदाहरण",
    "url": "https://gklearnstudy.in/vyakaran/essay-in-hindi.html",
    "paragraph": "निबंध एक विस्तृत लेखन होता है जिसमें किसी विषय पर गहराई से चर्चा की जाती है। निबंध के मुख्य तत्व हैं: 1. प्रस्तावना 2. विषय पर चर्चा 3. निष्कर्ष।",
    "image": "https://gklearnstudy.in/images/essay.webp"
  },
  {
    "title": "Quiz For Exam: परिभाषा और विशेषताएँ",
    "url": "https://gklearnstudy.in/vyakaran/quiz-for-exam.html",
    "paragraph": "Quiz For Exam एक संक्षिप्त प्रश्नोत्तरी होती है जिसका उद्देश्य छात्रों के ज्ञान की जांच करना है। क्विज़ के लाभ हैं: 1. ज्ञान की समीक्षा 2. आत्म-मूल्यांकन 3. प्रतियोगिता का अनुभव।",
    "image": "https://gklearnstudy.in/images/quiz.webp"
  }


];

document.addEventListener("DOMContentLoaded", function() {
  const searchContainer = document.querySelector('.search-container');
  const searchIcon = document.querySelector('.search-icon');
  const backIcon = document.querySelector('.back-icon');
  const searchInput = document.querySelector('.search-input');
  const results = document.getElementById('results');
  const suggestions = document.getElementById('suggestions');

  function showResults() {
    const input = searchInput.value.trim().toLowerCase();
    results.innerHTML = '';

    if (input === '') {
      results.style.display = 'none';
      suggestions.style.display = 'none';
      return;
    }

    const inputWords = input.split(/\s+/);

    // Score calculation: more matches (and better ones) = higher priority
    function getMatchInfo(item) {
      const titleLower = item.title.toLowerCase();
      const paraLower = item.paragraph.toLowerCase();

      let exactCount = 0, partialCount = 0, fuzzyCount = 0, totalScore = 0;

      inputWords.forEach(word => {
        if (titleLower === word || paraLower === word) {
          exactCount++;
          totalScore += 0;
        } else if (titleLower.includes(word) || paraLower.includes(word)) {
          partialCount++;
          totalScore += 1;
        } else {
          // Fuzzy match (Levenshtein)
          const titleWords = titleLower.split(/\s+/);
          const paraWords = paraLower.split(/\s+/);
          const allWords = [...titleWords, ...paraWords];
          const maxDist = Math.max(2, Math.floor(word.length * 0.4));
          if (allWords.some(dataWord => levenshteinDistance(word, dataWord) <= maxDist)) {
            fuzzyCount++;
            totalScore += 2;
          } else {
            totalScore += 3; // no match for this word
          }
        }
      });

      return {
        item,
        exactCount,
        partialCount,
        fuzzyCount,
        totalScore
      };
    }

    // Get all matching results with score info
    let scoredData = data
      .map(getMatchInfo)
      // Only show results that matched at least one word
      .filter(obj => (obj.exactCount + obj.partialCount + obj.fuzzyCount) > 0);

    if (scoredData.length === 0) {
      results.style.display = 'block';
      results.innerHTML = '<p>No results found.</p>';
      suggestions.style.display = 'none';
      return;
    }

    // Sort:
    // 1. By lowest totalScore (more/better matches = less score)
    // 2. By most exactCount
    // 3. By most partialCount
    // 4. By most fuzzyCount
    // 5. Finally by title alphabetically
    scoredData.sort((a, b) => 
      a.totalScore - b.totalScore ||
      b.exactCount - a.exactCount ||
      b.partialCount - a.partialCount ||
      b.fuzzyCount - a.fuzzyCount ||
      a.item.title.localeCompare(b.item.title)
    );

    // Show result cards
    scoredData.forEach(({ item }) => {
      const card = document.createElement('div');
      card.classList.add('result-card');
      const img = document.createElement('img');
      img.src = item.image;
      img.alt = item.title;
      img.classList.add('result-image');
      const textDiv = document.createElement('div');
      textDiv.classList.add('result-text');
      const titleLink = document.createElement('a');
      titleLink.href = item.url;
      titleLink.textContent = item.title;
      titleLink.target = '_blank';
      titleLink.classList.add('result-title');
      const para = document.createElement('p');
      para.textContent = item.paragraph;
      para.classList.add('result-paragraph');
      textDiv.appendChild(titleLink);
      textDiv.appendChild(para);
      card.appendChild(img);
      card.appendChild(textDiv);
      results.appendChild(card);
    });

    results.style.display = 'block';
    suggestions.style.display = 'none';
  }

  if (searchIcon) {
    searchIcon.addEventListener('click', () => {
      searchContainer.classList.add('active');
      searchInput.focus();
      if (searchInput.value.trim() !== '') {
        showResults();
      }
    });
  }

  if (backIcon) {
    backIcon.addEventListener('click', () => {
      searchContainer.classList.remove('active');
      searchInput.value = '';
      results.innerHTML = '';
      results.style.display = 'none';
      suggestions.style.display = 'none';
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim();
      if (query.length > 0) {
        showResults();
      } else {
        suggestions.style.display = 'none';
        results.style.display = 'none';
        results.innerHTML = '';
      }
    });
  }

  if (suggestions) {
    suggestions.addEventListener('click', (e) => {
      if (e.target.tagName.toLowerCase() === 'li') {
        searchInput.value = e.target.textContent;
        suggestions.style.display = 'none';
        showResults();
      }
    });
  }

  document.addEventListener('click', (e) => {
    if (
      !searchContainer.contains(e.target) &&
      !results.contains(e.target) &&
      !suggestions.contains(e.target)
    ) {
      searchContainer.classList.remove('active');
      searchInput.value = '';
      results.innerHTML = '';
      results.style.display = 'none';
      suggestions.style.display = 'none';
    }
  });
});
 document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('searchContainer');
    const searchBtn = document.getElementById('searchBtn');
    const backBtn = document.getElementById('backBtn');
    const searchInput = document.getElementById('searchInput');

    if (searchBtn && backBtn && searchInput && container) {
      searchBtn.addEventListener('click', () => {
        container.classList.add('active');
        setTimeout(() => searchInput.focus(), 100);
      });

      backBtn.addEventListener('click', () => {
        container.classList.remove('active');
        searchInput.value = '';
      });
    }
  });
