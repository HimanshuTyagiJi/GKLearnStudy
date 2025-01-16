function AngleConverter(source,valNum){valNum = parseFloat(valNum);
  var inputDegrees = document.getElementById("inputDegrees");
  var inputRadians = document.getElementById("inputRadians");
  var inputGradians = document.getElementById("inputGradians");
  if (source=="inputDegrees") {
    inputGradians.value=(valNum*1.111111).toFixed(6);
    inputRadians.value=(valNum*0.017453).toFixed(6);}
  
    if (source=="inputRadians") {
    inputDegrees.value=(valNum*57.29578).toFixed(5);
    inputGradians.value=(valNum*63.66198).toFixed(5);}
      
    if 
    (source=="inputGradians"){
    inputDegrees.value=(valNum*0.9).toFixed(1);
    inputRadians.value=(valNum*0.015708).toFixed(6);}}

function AreaConverter(source,valNum) 
{
  valNum = parseFloat(valNum);
  var inputSquaremillimetre = document.getElementById("inputSquaremillimetre");
  var inputSquarecentimetre = document.getElementById("inputSquarecentimetre");
  var inputSquaremetres = document.getElementById("inputSquaremetres");
  var inputHectares = document.getElementById("inputHectares");
  var inputSquarekilometres = document.getElementById("inputSquarekilometres");
  var inputSquareinches = document.getElementById("inputSquareinches");
  var inputSquareFeet = document.getElementById("inputSquareFeet");
  var inputSquareYards = document.getElementById("inputSquareYards");
  var inputAcres = document.getElementById("inputAcres");
  var inputSquareMiles = document.getElementById("inputSquareMiles");
  if (source=="inputSquaremillimetre") {
    
    inputSquaremetres.value=(valNum*0.000001).toFixed(6);
    inputHectares.value=(valNum*0.0000000001).toFixed(10);
    inputSquarekilometres.value=(valNum*0.000000000001).toFixed(12);
    inputSquareinches.value=(valNum*0.00155).toFixed(5);
    inputSquareFeet.value=(valNum*0.000011).toFixed(6);
    inputSquareYards.value=(valNum*0.000001).toFixed(6);
    inputAcres.value=(valNum*0.000000000247105).toFixed(15);
    inputSquareMiles.value=(valNum*0.000000000000386).toFixed(15);
    inputSquarecentimetre.value=(valNum*0.01).toFixed(2);
  }
  if (source=="inputSquarecentimetre") {
    inputSquaremillimetre.value=(valNum*100).toFixed();
    inputSquaremetres.value=(valNum*0.0001).toFixed(4);
    inputHectares.value=(valNum*0.00000001).toFixed(8);
    inputSquarekilometres.value=(valNum*0.0000000001).toFixed(10);
    inputSquareinches.value=(valNum*0.155).toFixed(3);
    inputSquareFeet.value=(valNum*0.001076).toFixed(6);
    inputSquareYards.value=(valNum*0.00012).toFixed(5);
    inputAcres.value=(valNum*0.000000024710538).toFixed(15);
    inputSquareMiles.value=(valNum*0.000000000003861).toFixed(15);
  }
  if (source=="inputSquaremetres") {
    inputSquaremillimetre.value=(valNum*1000000).toFixed();
    inputSquarecentimetre.value=(valNum*10000).toFixed();
    inputHectares.value=(valNum*0.0001).toFixed(4);
    inputSquarekilometres.value=(valNum*0.000001).toFixed(6);
    inputSquareinches.value=(valNum*1550.003).toFixed(3);
    inputSquareFeet.value=(valNum*10.76391).toFixed(5);
    inputSquareYards.value=(valNum*1.19599).toFixed(5);
    inputAcres.value=(valNum*0.000247).toFixed(6);
    inputSquareMiles.value=(valNum*0.000000386102159).toFixed(15);
  }
  if (source=="inputHectares") {
    inputSquaremillimetre.value=(valNum*10000000000).toFixed();
    inputSquarecentimetre.value=(valNum*100000000).toFixed();
    inputSquaremetres.value=(valNum*10000).toFixed();
    inputSquarekilometres.value=(valNum*0.01).toFixed(2);
    inputSquareinches.value=(valNum*15500031).toFixed();
    inputSquareFeet.value=(valNum*107639.1).toFixed(1);
    inputSquareYards.value=(valNum*11959.9).toFixed(1);
    inputAcres.value=(valNum*2.471054).toFixed(6);
    inputSquareMiles.value=(valNum*0.003861).toFixed(6);
  }
  if (source=="inputSquarekilometres") {
    inputSquaremillimetre.value=(valNum*1000000000000).toFixed();
    inputSquarecentimetre.value=(valNum*10000000000).toFixed();
    inputHectares.value=(valNum*100).toFixed();
    inputSquareinches.value=(valNum*1550003100).toFixed();
    inputSquareFeet.value=(valNum*10763910).toFixed();
    inputSquareYards.value=(valNum*1195990).toFixed();
    inputSquaremetres.value=(valNum*1000000).toFixed();
    inputAcres.value=(valNum*247.1054).toFixed(4);
    inputSquareMiles.value=(valNum*0.386102).toFixed(6);
  }
  if (source=="inputSquareinches") {
    inputSquaremillimetre.value=(valNum*645.16).toFixed(2);
    inputSquarecentimetre.value=(valNum*6.4516).toFixed(4);
    inputSquaremetres.value=(valNum*0.000645).toFixed(6);
    inputHectares.value=(valNum*0.000000064516).toFixed(12);
    inputSquarekilometres.value=(valNum*0.00000000064516).toFixed(14);
    inputSquareFeet.value=(valNum*0.006944).toFixed(6);
    inputSquareYards.value=(valNum*0.000772).toFixed(6);
    inputAcres.value=(valNum*0.000000159422508).toFixed(15);
    inputSquareMiles.value=(valNum*0.000000000249098).toFixed(15);
  }
  if (source=="inputSquareFeet") {
    inputSquaremillimetre.value=(valNum*92903.04).toFixed(2);
    inputSquarecentimetre.value=(valNum*929.0304).toFixed(4);
    inputSquaremetres.value=(valNum*0.092903).toFixed(6);
    inputHectares.value=(valNum*0.000009).toFixed(6);
    inputSquarekilometres.value=(valNum*0.00000009290304).toFixed(14);
    inputSquareinches.value=(valNum*144).toFixed();
    inputSquareYards.value=(valNum*0.111111).toFixed(6);
    inputAcres.value=(valNum*0.000023).toFixed(6);
    inputSquareMiles.value=(valNum*0.000000035870064).toFixed(15);
  }
  if (source=="inputSquareYards") {
    inputSquaremillimetre.value=(valNum*836127.4).toFixed(1);
    inputSquarecentimetre.value=(valNum*8361.274).toFixed(3);
    inputSquaremetres.value=(valNum*0.836127).toFixed(6);
    inputHectares.value=(valNum*0.000084).toFixed(6);
    inputSquarekilometres.value=(valNum*0.00000083612736).toFixed(14);
    inputSquareinches.value=(valNum*1296).toFixed();
    inputSquareFeet.value=(valNum*9).toFixed();
    inputAcres.value=(valNum*0.000207).toFixed(6);
    inputSquareMiles.value=(valNum*0.000000322830579).toFixed(15);
  }
  if (source=="inputAcres") {
    inputSquaremillimetre.value=(valNum*4046856422).toFixed();
    inputSquarecentimetre.value=(valNum*40468564).toFixed();
    inputSquaremetres.value=(valNum*4046.856).toFixed(3);
    inputHectares.value=(valNum*0.404686).toFixed(6);
    inputSquarekilometres.value=(valNum*0.004047).toFixed(6);
    inputSquareinches.value=(valNum*6272640).toFixed();
    inputSquareFeet.value=(valNum*43560).toFixed();
    inputSquareYards.value=(valNum*4840).toFixed();
    inputSquareMiles.value=(valNum*0.001563).toFixed(6);
  }
  if (source=="inputSquareMiles") {
    inputSquaremillimetre.value=(valNum*2589988110336).toFixed();
    inputSquarecentimetre.value=(valNum*25899881103).toFixed();
    inputSquaremetres.value=(valNum*2589988).toFixed();
    inputHectares.value=(valNum*258.9988).toFixed(4);
    inputSquarekilometres.value=(valNum*2.589988).toFixed(6);
    inputSquareinches.value=(valNum*4014489600).toFixed();
    inputSquareFeet.value=(valNum*27878400).toFixed();
    inputSquareYards.value=(valNum*3097600).toFixed();
    inputAcres.value=(valNum*640).toFixed();
  }
}


function lengthConverter(source,valNum) {
  valNum = parseFloat(valNum);
  var inputFeet = document.getElementById("inputFeet");
  var inputMetres = document.getElementById("inputMetres");
  var inputInches = document.getElementById("inputInches");
  var inputcm = document.getElementById("inputcm");
  var inputYards = document.getElementById("inputYards");
  var inputKilometres = document.getElementById("inputKilometres");
  var inputMiles = document.getElementById("inputMiles");
  var inputnm = document.getElementById("inputnm");
  var inputmicrons = document.getElementById("inputmicrons");
  var inputMillimetres = document.getElementById("inputMillimetres");
  var inputNauticalMiles = document.getElementById("inputNauticalMiles");
  
   if (source=="inputFeet") 
  {
    inputMetres.value=(valNum*0.3048).toFixed(4);
    inputInches.value=(valNum*12).toFixed();
    inputcm.value=(valNum*30.48).toFixed(2);
    inputYards.value=(valNum*0.33333).toFixed(5);
    inputKilometres.value=(valNum*0.000305).toFixed(6);    
    inputMiles.value=(valNum*0.00018939).toFixed(8);
    inputnm.value=(valNum*304800000).toFixed();
    inputmicrons.value=(valNum*304800).toFixed();
    inputMillimetres.value=(valNum*304.8).toFixed(1);    
    inputNauticalMiles.value=(valNum*0.000165).toFixed(6);
  }
  if (source=="inputMetres") 
  {
    inputFeet.value=(valNum*3.280).toFixed(3);
    inputInches.value=(valNum*39.370).toFixed(3);
    inputcm.value=(valNum*100).toFixed();
    inputYards.value=(valNum*1.093613).toFixed(5);
    inputKilometres.value=(valNum*0.001).toFixed(3);    
    inputMiles.value=(valNum*0.000621).toFixed(6);
    inputnm.value=(valNum*1000000000).toFixed();
    inputmicrons.value=(valNum*1000000).toFixed();
    inputMillimetres.value=(valNum*1000).toFixed();    
    inputNauticalMiles.value=(valNum*0.00054).toFixed(5);
  }
  if (source=="inputInches") 
  {
    inputMetres.value=(valNum*0.0254).toFixed(4);
    inputFeet.value=(valNum*0.0833).toFixed(3);
    inputcm.value=(valNum*2.54).toFixed(2);
    inputYards.value=(valNum*0.027778).toFixed(6);
    inputKilometres.value=(valNum*0.000025).toFixed(6);    
    inputMiles.value=(valNum*0.000016).toFixed(6);
    inputnm.value=(valNum*25400000).toFixed();
    inputmicrons.value=(valNum*25400).toFixed();
    inputMillimetres.value=(valNum*25.4).toFixed(1);    
    inputNauticalMiles.value=(valNum*0.000014).toFixed(6);
  }
  if (source=="inputcm") 
  {
    inputMetres.value=(valNum*0.01).toFixed(2);
    inputInches.value=(valNum*0.393701).toFixed(6);
    inputFeet.value=(valNum*0.032808).toFixed(6);
    inputYards.value=(valNum*0.010936).toFixed(6);
    inputKilometres.value=(valNum*0.00001).toFixed(5);    
    inputMiles.value=(valNum*0.000006).toFixed(6);
    inputnm.value=(valNum*10000000).toFixed();
    inputmicrons.value=(valNum*10000).toFixed();
    inputMillimetres.value=(valNum*10).toFixed();    
    inputNauticalMiles.value=(valNum*0.000005).toFixed(6);
  }
  if (source=="inputYards") 
  {
    inputMetres.value=(valNum*9144).toFixed(4);
    inputInches.value=(valNum*36).toFixed();
    inputcm.value=(valNum*91.44).toFixed(2);
    inputFeet.value=(valNum*3).toFixed();
    inputKilometres.value=(valNum*0.000914).toFixed(6);    
    inputMiles.value=(valNum*0.000568).toFixed(6);
    inputnm.value=(valNum*914400000).toFixed();
    inputmicrons.value=(valNum*914400).toFixed();
    inputMillimetres.value=(valNum*914.4).toFixed(1);    
    inputNauticalMiles.value=(valNum*0.000494).toFixed(6);
  }
  if (source=="inputKilometres") 
  {
    inputMetres.value=(valNum*1000).toFixed();
    inputInches.value=(valNum*39370.08).toFixed(2);
    inputcm.value=(valNum*100000).toFixed();
    inputYards.value=(valNum*1093.613).toFixed(3);
    inputFeet.value=(valNum*3280.84).toFixed(2);    
    inputMiles.value=(valNum*0.621371).toFixed(6);
    inputnm.value=(valNum*1000000000000).toFixed();
    inputmicrons.value=(valNum*1000000000).toFixed();
    inputNauticalMiles.value=(valNum*0.539957).toFixed(6);
    inputMillimetres.value=(valNum*1000000).toFixed();    
    
  }
  if (source=="inputMiles") 
  {
    inputMetres.value=(valNum*1609).toFixed(3);
    inputInches.value=(valNum*63360).toFixed();
    inputcm.value=(valNum*160934).toFixed(1);
    inputYards.value=(valNum*1760).toFixed();
    inputKilometres.value=(valNum*1.609344).toFixed(5);    
    inputFeet.value=(valNum*5280).toFixed(3);
    inputnm.value=(valNum*1609344000000).toFixed();
    inputmicrons.value=(valNum*1609344000).toFixed();
    inputMillimetres.value=(valNum*1609344).toFixed();    
    inputNauticalMiles.value=(valNum*0.868976).toFixed(6);
  }
  if (source=="inputnm") 
  {
    inputMetres.value=(valNum*0.000000001).toFixed(9);
    inputInches.value=(valNum*0.000000039370079).toFixed(15);
    inputcm.value=(valNum*0.0000001).toFixed(7);
    inputYards.value=(valNum*0.000000001093613).toFixed(15);
    inputKilometres.value=(valNum*0.000000000001).toFixed(12);    
    inputMiles.value=(valNum*0.000000000000621).toFixed(15);
    inputFeet.value=(valNum*0.00000000328084).toFixed(14);
    inputmicrons.value=(valNum*0.001).toFixed(3);
    inputMillimetres.value=(valNum*0.000001).toFixed(6);    
    inputNauticalMiles.value=(valNum*0.00000000000054).toFixed(14);
  }
  if (source=="inputmicrons") 
  {
    inputMetres.value=(valNum*0.000001).toFixed(6);
    inputInches.value=(valNum*0.000039).toFixed(6);
    inputcm.value=(valNum*0.0001).toFixed(4);
    inputYards.value=(valNum*0.000001).toFixed(6);
    inputKilometres.value=(valNum*0.000000001).toFixed(9);    
    inputMiles.value=(valNum*0.000000000621371).toFixed(15);
    inputnm.value=(valNum*1000).toFixed();
    inputFeet.value=(valNum*0.000003).toFixed(6);
    inputMillimetres.value=(valNum*0.001).toFixed(3);    
    inputNauticalMiles.value=(valNum*0.000000000539957).toFixed(15);
  }if (source=="inputNauticalMiles") 
  {
    inputMetres.value=(valNum*1852).toFixed();
    inputInches.value=(valNum*72913.39).toFixed(2);
    inputcm.value=(valNum*185200).toFixed();
    inputYards.value=(valNum*2025.372).toFixed(3);
    inputmicrons.value=(valNum*1852000000).toFixed();
    inputMillimetres.value=(valNum*1852000).toFixed(); 
    inputMiles.value=(valNum*1.150779).toFixed(6);
    inputnm.value=(valNum*1852000000000).toFixed(); 
    inputFeet.value=(valNum*6076.115).toFixed(3);
    inputKilometres.value=(valNum*1.852).toFixed(3); 
    
  }
  if (source=="inputMillimetres") 
  {
    inputMetres.value=(valNum*0.001).toFixed(3);
    inputInches.value=(valNum*0.03937).toFixed(5);
    inputcm.value=(valNum*0.1).toFixed(2);
    inputYards.value=(valNum*0.001094).toFixed(6);
    inputKilometres.value=(valNum*0.000001).toFixed(6);    
    inputMiles.value=(valNum*0.000000621371192).toFixed(15);
    inputnm.value=(valNum*1000000).toFixed();
    inputmicrons.value=(valNum*1000).toFixed();
    inputFeet.value=(valNum*0.003281).toFixed(6);    
    inputNauticalMiles.value=(valNum*0.000000539956803).toFixed(15);
  }
  
}

function powerConverter(source,valNum) 
{
  valNum =parseFloat(valNum);
  var inputWatts = document.getElementById("inputWatts");
  var inputKilowatts = document.getElementById("inputKilowatts");
  var inputHorsepower = document.getElementById("inputHorsepower");
  
  if (source=="inputWatts") {
    inputKilowatts.value=(valNum*0.001).toFixed(3);
    inputHorsepower.value=(valNum*0.00134).toFixed(5);
   
  }
  if (source=="inputKilowatts") {
    inputWatts.value=(valNum*1000).toFixed();
    inputHorsepower.value=(valNum*1.341).toFixed(3);
   
  }
  if (source=="inputHorsepower") {
    inputWatts.value=(valNum*745.699).toFixed(3);
    inputKilowatts.value=(valNum*0.745699).toFixed(6);
  
  }
}

function weightConverter(source,valNum) {
  valNum = parseFloat(valNum);
  var inputCarats = document.getElementById("inputCarats");
  var inputMilligrams = document.getElementById("inputMilligrams");
  var inputCentigrams = document.getElementById("inputCentigrams");
  var inputDecigrams = document.getElementById("inputDecigrams");
  var inputGrams = document.getElementById("inputGrams");
  var inputDecagrams = document.getElementById("inputDecagrams");
  var inputHectograms = document.getElementById("inputHectograms");
  var inputKilograms = document.getElementById("inputKilograms");
  var inputMetrictonnes = document.getElementById("inputMetrictonnes");
  var inputOunces = document.getElementById("inputOunces");
  var inputPounds = document.getElementById("inputPounds");
  var inputStones = document.getElementById("inputStones");

  if (source=="inputCarats") {
    inputMilligrams.value=(valNum*200).toFixed();
    inputCentigrams.value=(valNum*20).toFixed();
    inputDecigrams.value=(valNum*2).toFixed();
    inputGrams.value=(valNum*0.2).toFixed(1);
    inputDecagrams.value=(valNum*0.02).toFixed(2);
    inputHectograms.value=(valNum*0.002).toFixed(3);
    inputKilograms.value=(valNum*0.0002).toFixed(4);
    inputMetrictonnes.value=(valNum*0.0000002).toFixed(7);
    inputOunces.value=(valNum*0.007055).toFixed(6);
    inputPounds.value=(valNum*0.000441).toFixed(6);
    inputStones.value=(valNum*0.000031).toFixed(6);
  }
  if (source=="inputMilligrams") {
    inputCarats.value=(valNum*0.005).toFixed(3);
    inputCentigrams.value=(valNum*0.1).toFixed(1);
    inputDecigrams.value=(valNum*0.01).toFixed(2);
    inputGrams.value=(valNum*0.001).toFixed(3);
    inputDecagrams.value=(valNum*0.0001).toFixed(4);
    inputHectograms.value=(valNum*0.00001).toFixed(5);
    inputKilograms.value=(valNum*0.000001).toFixed(6);
    inputMetrictonnes.value=(valNum*0.000000001).toFixed(9);
    inputOunces.value=(valNum*0.000035).toFixed(6);
    inputPounds.value=(valNum*0.000002).toFixed(6);
    inputStones.value=(valNum*0.000000157473044).toFixed(15);
  }
  if (source=="inputCentigrams") {
    inputMilligrams.value=(valNum*10).toFixed();
    inputCarats.value=(valNum*0.05).toFixed(2);
    inputDecigrams.value=(valNum*0.1).toFixed(1);
    inputGrams.value=(valNum*0.01).toFixed(2);
    inputDecagrams.value=(valNum*0.001).toFixed(3);
    inputHectograms.value=(valNum*0.0001).toFixed(4);
    inputKilograms.value=(valNum*0.00001).toFixed(5);
    inputMetrictonnes.value=(valNum*0.00000001).toFixed(8);
    inputOunces.value=(valNum*0.000353).toFixed(6);
    inputPounds.value=(valNum*0.000022).toFixed(6);
    inputStones.value=(valNum*0.000002).toFixed(6);
  }
  if (source=="inputDecigrams") {
    inputMilligrams.value=(valNum*100).toFixed();
    inputCentigrams.value=(valNum*10).toFixed();
    inputCarats.value=(valNum*0.5).toFixed(1);
    inputGrams.value=(valNum*0.1).toFixed(1);
    inputDecagrams.value=(valNum*0.01).toFixed(2);
    inputHectograms.value=(valNum*0.001).toFixed(3);
    inputKilograms.value=(valNum*0.0001).toFixed(4);
    inputMetrictonnes.value=(valNum*0.0000001).toFixed(7);
    inputOunces.value=(valNum*0.003527).toFixed(6);
    inputPounds.value=(valNum*0.00022).toFixed(5);
    inputStones.value=(valNum*0.000016).toFixed(6);
  }
  if (source=="inputGrams") {
    inputMilligrams.value=(valNum*1000).toFixed();
    inputCentigrams.value=(valNum*100).toFixed();
    inputDecigrams.value=(valNum*10).toFixed();
    inputCarats.value=(valNum*5).toFixed();
    inputDecagrams.value=(valNum*0.1).toFixed(1);
    inputHectograms.value=(valNum*0.01).toFixed(2);
    inputKilograms.value=(valNum*0.001).toFixed(3);
    inputMetrictonnes.value=(valNum*0.000001).toFixed(6);
    inputOunces.value=(valNum*0.035274).toFixed(6);
    inputPounds.value=(valNum*0.002205).toFixed(6);
    inputStones.value=(valNum*0.000157).toFixed(6);
  }
  if (source=="inputDecagrams") {
    inputMilligrams.value=(valNum*10000).toFixed();
    inputCentigrams.value=(valNum*1000).toFixed();
    inputDecigrams.value=(valNum*100).toFixed();
    inputGrams.value=(valNum*10).toFixed();
    inputCarats.value=(valNum*50).toFixed();
    inputHectograms.value=(valNum*0.1).toFixed(1);
    inputKilograms.value=(valNum*0.01).toFixed(2);
    inputMetrictonnes.value=(valNum*0.00001).toFixed(5);
    inputOunces.value=(valNum*0.35274).toFixed(5);
    inputPounds.value=(valNum*0.022046).toFixed(6);
    inputStones.value=(valNum*0.001575).toFixed(6);
  }
  if (source=="inputHectograms") {
    inputMilligrams.value=(valNum*100000).toFixed();
    inputCentigrams.value=(valNum*10000).toFixed();
    inputDecigrams.value=(valNum*1000).toFixed();
    inputGrams.value=(valNum*100).toFixed();
    inputDecagrams.value=(valNum*10).toFixed();
    inputCarats.value=(valNum*500).toFixed();
    inputKilograms.value=(valNum*0.1).toFixed(1);
    inputMetrictonnes.value=(valNum*0.0001).toFixed(4);
    inputOunces.value=(valNum*3.527396).toFixed(6);
    inputPounds.value=(valNum*0.220462).toFixed(6);
    inputStones.value=(valNum*0.015747).toFixed(6);
  }
  if (source=="inputKilograms") {
    inputMilligrams.value=(valNum*1000000).toFixed();
    inputCentigrams.value=(valNum*100000).toFixed();
    inputDecigrams.value=(valNum*10000).toFixed();
    inputGrams.value=(valNum*1000).toFixed();
    inputDecagrams.value=(valNum*100).toFixed();
    inputHectograms.value=(valNum*10).toFixed();
    inputCarats.value=(valNum*5000).toFixed();
    inputMetrictonnes.value=(valNum*0.001).toFixed(3);
    inputOunces.value=(valNum*35.27396).toFixed(5);
    inputPounds.value=(valNum*2.204623).toFixed(6);
    inputStones.value=(valNum*0.157473).toFixed(6);
  }
  if (source=="inputMetrictonnes") {
    inputMilligrams.value=(valNum*1000000000).toFixed();
    inputCentigrams.value=(valNum*100000000).toFixed();
    inputDecigrams.value=(valNum*10000000).toFixed();
    inputGrams.value=(valNum*1000000).toFixed();
    inputDecagrams.value=(valNum*100000).toFixed();
    inputHectograms.value=(valNum*10000).toFixed();
    inputKilograms.value=(valNum*1000).toFixed();
    inputCarats.value=(valNum*5000000).toFixed();
    inputOunces.value=(valNum*35273.96).toFixed(2);
    inputPounds.value=(valNum*2204.623).toFixed(3);
    inputStones.value=(valNum*157.473).toFixed(3);
  }
  if (source=="inputOunces") {
    inputMilligrams.value=(valNum*28349.52).toFixed(2);
    inputCentigrams.value=(valNum*2834.952).toFixed(3);
    inputDecigrams.value=(valNum*283.4952).toFixed(4);
    inputGrams.value=(valNum*28.34952).toFixed(5);
    inputDecagrams.value=(valNum*2.834952).toFixed(6);
    inputHectograms.value=(valNum*0.2834952).toFixed(7);
    inputKilograms.value=(valNum*0.02835).toFixed(5);
    inputMetrictonnes.value=(valNum*0.000028).toFixed(6);
    inputCarats.value=(valNum*141.7476).toFixed(4);
    inputPounds.value=(valNum*0.0625).toFixed(4);
    inputStones.value=(valNum*0.004464).toFixed(6);
  }
  if (source=="inputPounds") {
    inputMilligrams.value=(valNum*2453592.4).toFixed(1);
    inputCentigrams.value=(valNum*45359.24).toFixed(2);
    inputDecigrams.value=(valNum*4535.924).toFixed(3);
    inputGrams.value=(valNum*453.5924).toFixed(4);
    inputDecagrams.value=(valNum*45.35924).toFixed(5);
    inputHectograms.value=(valNum*4.535924).toFixed(6);
    inputKilograms.value=(valNum*0.453592).toFixed(6);
    inputMetrictonnes.value=(valNum*0.000454).toFixed(6);
    inputOunces.value=(valNum*16).toFixed();
    inputCarats.value=(valNum*2267.962).toFixed(3);
    inputStones.value=(valNum*0.071429).toFixed(6);
  }
  if (source=="inputStones") {
    inputMilligrams.value=(valNum*6350293).toFixed();
    inputCentigrams.value=(valNum*635029.3).toFixed(1);
    inputDecigrams.value=(valNum*63502.93).toFixed(2);
    inputGrams.value=(valNum*6350.293).toFixed(3);
    inputDecagrams.value=(valNum*635.0293).toFixed(4);
    inputHectograms.value=(valNum*63.50293).toFixed(5);
    inputKilograms.value=(valNum*6.350293).toFixed(6);
    inputMetrictonnes.value=(valNum*0.00635).toFixed(5);
    inputOunces.value=(valNum*224).toFixed();
    inputPounds.value=(valNum*14).toFixed();
    inputCarats.value=(valNum*31751.47).toFixed(2);
  }
}

function Pressure(source,valNum) {
  valNum = parseFloat(valNum);
  var inputAtmospheres = document.getElementById("inputAtmospheres");
  var inputKilopascals = document.getElementById("inputKilopascals");
  var inputPascals = document.getElementById("inputPascals");
  var inputBars = document.getElementById("inputBars");
  var inputMillimetresofmercury = document.getElementById("inputMillimetresofmercury");
  var inputPoundspersquareinch = document.getElementById("inputPoundspersquareinch");
  
  if (source=="inputAtmospheres") {
    inputBars.value=(valNum*1.01325).toFixed(5);
    inputPascals.value=(valNum*101325).toFixed();
    inputPoundspersquareinch.value=(valNum*14.69595).toFixed(5);
    inputKilopascals.value=(valNum*101.325).toFixed(3);
    inputMillimetresofmercury.value=(valNum*760.1275).toFixed(4);
  }
  
  if (source=="inputPascals") {
    inputAtmospheres.value=(valNum*0.00001).toFixed(5);
    inputKilopascals.value=(valNum*0.001).toFixed(3);
    inputBars.value=(valNum*0.00001).toFixed(5);
    inputMillimetresofmercury.value=(valNum*0.007502).toFixed(6);
    inputPoundspersquareinch.value=(valNum*0.000145).toFixed(6);
    
  }
  if (source=="inputKilopascals") {
    inputAtmospheres.value=(valNum*0.009869).toFixed(4);
    inputPascals.value=(valNum*1000).toFixed();
    inputBars.value=(valNum*0.01).toFixed(2);
    
    inputPoundspersquareinch.value=(valNum*145038).toFixed(6);
    inputMillimetresofmercury.value=(valNum*7.501875).toFixed();
    
  }
  if (source=="inputBars") {
    inputAtmospheres.value=(valNum*0.986923).toFixed(6);
    inputKilopascals.value=(valNum*100).toFixed();
    inputPascals.value=(valNum*100000).toFixed();
    inputMillimetresofmercury.value=(valNum*750.1875).toFixed(4);
    inputPoundspersquareinch.value=(valNum*14.50377).toFixed(5);
   
  }
  if (source=="inputMillimetresofmercury") {
    inputAtmospheres.value=(valNum*0.001316).toFixed(6);
    inputKilopascals.value=(valNum*0.1333).toFixed(4);
    inputPascals.value=(valNum*133.3).toFixed(1);
    inputBars.value=(valNum*0.001333).toFixed(6);
    inputPoundspersquareinch.value=(valNum*0.019334).toFixed(6);
    
  }
  if (source=="inputPoundspersquareinch") {
    inputAtmospheres.value=(valNum*0.068046).toFixed(6);
    inputKilopascals.value=(valNum*6.894757).toFixed(6);
    inputPascals.value=(valNum*6894.757).toFixed(3);
    inputBars.value=(valNum*0.068948).toFixed(6);
    inputMillimetresofmercury.value=(valNum*51.72361).toFixed(5);
    
  }

}

function speedConverter(source,valNum) 
{
  valNum = parseFloat(valNum);
  var inputCPS = document.getElementById("inputCPS");
  var inputMPS = document.getElementById("inputMPS");
  var inputKPH = document.getElementById("inputKPH");
  var inputFPS = document.getElementById("inputFPS");
  var inputMPH = document.getElementById("inputMPH");
  var inputKnots = document.getElementById("inputKnots");
  var inputMach = document.getElementById("inputMach");
  if (source=="inputCPS") {
    inputKPH.value=(valNum*0.036).toFixed(3);
    inputKnots.value=(valNum*0.01944).toFixed(5);
    inputMach.value=(valNum*0.000029).toFixed(6);
    inputMPH.value=(valNum*0.022371).toFixed(5);
    inputMPS.value=(valNum*0.01).toFixed(2);
    inputFPS.value=(valNum*0.032808).toFixed(4);
  }
  if (source=="inputMPS") {
    inputCPS.value=(valNum*100).toFixed();
    inputKnots.value=(valNum*1.944012).toFixed(5);
    inputMach.value=(valNum*0.002939).toFixed(6);
    inputKPH.value=(valNum*3.6).toFixed(2);
    inputMPH.value=(valNum*2.237136).toFixed(5);
    inputFPS.value=(valNum*3.28084).toFixed(4);
  }
  if (source=="inputKPH") {
    inputMPH.value=(valNum*0.621427).toFixed(6);
    inputMPS.value=(valNum*0.2777).toFixed(3);
    inputFPS.value=(valNum*0.911344).toFixed(4);
    inputCPS.value=(valNum*27.777).toFixed(3);
    inputKnots.value=(valNum*0.540003).toFixed(2);
    inputMach.value=(valNum*0.000816).toFixed(6);
  }
  if (source=="inputFPS") {
    inputMPH.value=(valNum*0.681879).toFixed(5);
    inputKPH.value=(valNum*1.09728).toFixed(5);
    inputKnots.value=(valNum*0.592535).toFixed();
    inputCPS.value=(valNum*30.48).toFixed(2);
    inputMPS.value=(valNum*0.3048).toFixed(4);
    inputMach.value=(valNum*0.000896).toFixed(6);
  }
  if (source=="inputMPH") {
    inputMPS.value=(valNum*0.447).toFixed(3);
    inputKPH.value=(valNum*1.6092).toFixed(4);
    inputKnots.value=(valNum*0.868974).toFixed(4);
    inputFPS.value=(valNum*1.466535).toFixed(3);
    inputCPS.value=(valNum*44.7).toFixed(2);
    inputMach.value=(valNum*0.001314).toFixed(5);
  }
  if (source=="inputKnots") {
    inputMPH.value=(valNum*1.150783).toFixed(6);
    inputKPH.value=(valNum*1.85184).toFixed(4);
    inputFPS.value=(valNum*1.687664).toFixed(6);
    inputCPS.value=(valNum*51.44).toFixed(2);
    inputMPS.value=(valNum*0.5144).toFixed(4);
    inputMach.value=(valNum*0.001512).toFixed(5);
  }
  if (source=="inputMach") {
    inputMPH.value=(valNum*761.2975).toFixed(4);
    inputKPH.value=(valNum*1225.08).toFixed(2);
    inputKnots.value=(valNum*661.5474).toFixed(4);
    inputCPS.value=(valNum*34030).toFixed();
    inputFPS.value=(valNum*1116.47).toFixed(2);
    inputMPS.value=(valNum*340.3).toFixed(1);
  }
}

function temperatureConverter(source,valNum) {
  valNum = parseFloat(valNum);
  var inputFahrenheit = document.getElementById("inputFahrenheit");
  var inputCelsius = document.getElementById("inputCelsius");
  var inputKelvin = document.getElementById("inputKelvin");
  if (source=="inputFahrenheit") {
    inputCelsius.value=((valNum-32)/1.8).toFixed(2);
    inputKelvin.value=(((valNum-32)/1.8)+273.15).toFixed(2);
  }
  if (source=="inputCelsius") {
    inputFahrenheit.value=((valNum*1.8)+32).toFixed(2);
    inputKelvin.value=((valNum)+273.15).toFixed(2);
  }
  if (source=="inputKelvin") {
    inputFahrenheit.value=(((valNum-273.15)*1.8)+32).toFixed(2);
    inputCelsius.value=((valNum)-273.15).toFixed(2);
  }
}

function timeConverter(source,valNum) 
{
  valNum = parseFloat(valNum);
  var inputMicroseconds = document.getElementById("inputMicroseconds");
  var inputMilliseconds = document.getElementById("inputMilliseconds");
  var inputSecond = document.getElementById("inputSecond");
  var inputMinutes = document.getElementById("inputMinutes");
  var inputHours = document.getElementById("inputHours");
  var inputDays = document.getElementById("inputDays");
  var inputWeeks = document.getElementById("inputWeeks");
  var inputYears = document.getElementById("inputYears");
  if (source=="inputMicroseconds") {
    inputMilliseconds.value=(valNum*0.001).toFixed(3);
    inputSecond.value=(valNum*0.000001).toFixed(6);
    inputMinutes.value=(valNum*0.000000016666667).toFixed(15);
    inputHours.value=(valNum*0.000000000277778).toFixed(15);
    inputDays.value=(valNum*0.000000000011574).toFixed(15);
    inputWeeks.value=(valNum*0.000000000001653).toFixed(15);
    inputYears.value=(valNum*0.000000000000032).toFixed(15);
  }
  if (source=="inputMilliseconds") {
    inputMicroseconds.value=(valNum*1000).toFixed();
    inputSecond.value=(valNum*0.001).toFixed(3);
    inputMinutes.value=(valNum*0.000017).toFixed(6);
    inputHours.value=(valNum*0.000000277777777).toFixed(15);
    inputDays.value=(valNum*0.000000011574074).toFixed(15);
    inputWeeks.value=(valNum*0.000000001653439).toFixed(15);
    inputYears.value=(valNum*0.000000000031688).toFixed(15);
  }
  if (source=="inputSecond") {
    inputMicroseconds.value=(valNum*1000000).toFixed();
    inputMilliseconds.value=(valNum*1000).toFixed();
    inputMinutes.value=(valNum*0.016666).toFixed(6);
    inputHours.value=(valNum*0.000278).toFixed(6);
    inputDays.value=(valNum*0.000012).toFixed(6);
    inputWeeks.value=(valNum*0.000002).toFixed(6);
    inputYears.value=(valNum*0.000000031688088).toFixed(15);
  }
  if (source=="inputMinutes") {
    inputMicroseconds.value=(valNum*60000000).toFixed();
    inputMilliseconds.value=(valNum*60000).toFixed();
    inputSecond.value=(valNum*60).toFixed();
    inputHours.value=(valNum*0.016666).toFixed(6);
    inputDays.value=(valNum*0.000694).toFixed(6);
    inputWeeks.value=(valNum*0.000099).toFixed(6);
    inputYears.value=(valNum*0.000002).toFixed(6);
  }
  if (source=="inputHours") {
    inputMicroseconds.value=(valNum*3600000000).toFixed();
    inputMilliseconds.value=(valNum*3600000).toFixed();
    
    inputMinutes.value=(valNum*60).toFixed();
    inputDays.value=(valNum*0.041666).toFixed(6);
    inputWeeks.value=(valNum*0.005952).toFixed(6);
    inputYears.value=(valNum*0.000114).toFixed(6);
    inputSecond.value=(valNum*3600).toFixed();
  }
  if (source=="inputDays") {
    inputMicroseconds.value=(valNum*86400000000).toFixed();
    inputMilliseconds.value=(valNum*86400000).toFixed();
    inputSecond.value=(valNum*86400).toFixed();
    inputMinutes.value=(valNum*1440).toFixed();
    inputHours.value=(valNum*24).toFixed();
    inputWeeks.value=(valNum*0.142857).toFixed(6);
    inputYears.value=(valNum*0.002738).toFixed(6);
  }
  if (source=="inputWeeks") {
    inputMicroseconds.value=(valNum*604800000000).toFixed();
    inputMilliseconds.value=(valNum*604800000).toFixed();
    inputSecond.value=(valNum*604800).toFixed();
    inputMinutes.value=(valNum*10080).toFixed();
    inputHours.value=(valNum*168).toFixed();
    inputDays.value=(valNum*7).toFixed();
    inputYears.value=(valNum*0.019165).toFixed(6);
  }
  if (source=="inputYears") {
    inputMicroseconds.value=(valNum*31557600000000).toFixed();
    inputMilliseconds.value=(valNum*31557600000).toFixed();
    inputSecond.value=(valNum*31557600).toFixed();
    inputMinutes.value=(valNum*525960).toFixed();
    inputHours.value=(valNum*8766).toFixed();
    inputDays.value=(valNum*365.25).toFixed(2);
    inputWeeks.value=(valNum*52.17857).toFixed(5);
  }
}
function Volume(source,valNum) {
  valNum = parseFloat(valNum);
  var inputMillilitres = document.getElementById("inputMillilitres");
  var inputCubiccentimetres = document.getElementById("inputCubiccentimetres");
  var inputCubicmetres = document.getElementById("inputCubicmetres");
  var inputLitres = document.getElementById("inputLitres");
  var inputCubicinches = document.getElementById("inputCubicinches");
  var inputCubicfeet = document.getElementById("inputCubicfeet");
  var inputCubicyards = document.getElementById("inputCubicyards");
  var inputCentlitre = document.getElementById("inputCentlitre");
  var inputDecilitre = document.getElementById("inputDecilitre");
  var inputDecalitre = document.getElementById("inputDecalitre");
  var inputKilolitre = document.getElementById("inputKilolitre");
  var inputCentlitre = document.getElementById("inputCentlitre");
  
  if (source=="inputMillilitres") {
    inputLitres.value=(valNum*0.001).toFixed(3);
    inputCubicmetres.value=(valNum*0.000001).toFixed(6);
    inputCubicyards.value=(valNum*0.000001).toFixed(6);
    inputCubiccentimetres.value=(valNum*1).toFixed();
    inputCubicfeet.value=(valNum*0.000035).toFixed(6);
    inputCubicinches.value=(valNum*0.061024).toFixed(6);
    inputCentlitre.value=(valNum*0.1).toFixed(2);
    inputDecilitre.value=(valNum*0.01).toFixed(2);
    inputDecalitre.value=(valNum*0.0001).toFixed(4);
    inputHectolitre.value=(valNum*0.00001).toFixed(5);
    inputKilolitre.value=(valNum*0.000001).toFixed(6);
  }
  
  if (source=="inputCubicmetres") {
    inputMillilitres.value=(valNum*1000000).toFixed();
    inputCubiccentimetres.value=(valNum*1000000).toFixed();
    inputLitres.value=(valNum*1000).toFixed();
    inputCubicfeet.value=(valNum*35.31467).toFixed(5);
    inputCubicyards.value=(valNum*1.307951).toFixed(6);
    inputCubicinches.value=(valNum*61023.74).toFixed(2);
    inputCentlitre.value=(valNum*100000).toFixed();
    inputDecilitre.value=(valNum*10000).toFixed();
    inputDecalitre.value=(valNum*100).toFixed();
    inputHectolitre.value=(valNum*10).toFixed();
    inputKilolitre.value=(valNum*1).toFixed();
    
  }
  if (source=="inputCubiccentimetres") {
    inputMillilitres.value=(valNum*1).toFixed();
    inputCubicmetres.value=(valNum*0.000001).toFixed(6);
    inputLitres.value=(valNum*0.001).toFixed(3);
    inputCubicyards.value=(valNum*0.00000).toFixed(6);
    inputCubicfeet.value=(valNum*0.000035).toFixed(6);
    inputCubicinches.value=(valNum*0.061024).toFixed(6);
    inputCentlitre.value=(valNum*0.1).toFixed(1);
    inputDecilitre.value=(valNum*0.01).toFixed(2);
    inputDecalitre.value=(valNum*0.0001).toFixed(4);
    inputHectolitre.value=(valNum*0.00001).toFixed(5);
    inputKilolitre.value=(valNum*0.000001).toFixed(6);
  }
  if (source=="inputLitres") {
    inputMillilitres.value=(valNum*1000).toFixed();
    inputCubiccentimetres.value=(valNum*1000).toFixed();
    inputCubicmetres.value=(valNum*0.001).toFixed(3);
    inputCubicfeet.value=(valNum*0.035315).toFixed(6);
    inputCubicyards.value=(valNum*0.001308).toFixed(6);
    inputCubicinches.value=(valNum*61.02374).toFixed(5);
    inputCentlitre.value=(valNum*100).toFixed();
    inputDecilitre.value=(valNum*10).toFixed();
    inputDecalitre.value=(valNum*0.1).toFixed(1);
    inputHectolitre.value=(valNum*0.01).toFixed(2);
    inputKilolitre.value=(valNum*0.001).toFixed(3);
  }
  if (source=="inputCubicfeet") {
    inputMillilitres.value=(valNum*28316.85).toFixed(2);
    inputCubiccentimetres.value=(valNum*28316.85).toFixed(2);
    inputCubicmetres.value=(valNum*0.028316).toFixed(6);
    inputLitres.value=(valNum*28.31685).toFixed(5);
    inputCubicyards.value=(valNum*0.037037).toFixed(6);
    inputCubicinches.value=(valNum*1728).toFixed();
    inputCentlitre.value=(valNum*2831.6846592).toFixed(7);
    inputDecilitre.value=(valNum*283.16846592).toFixed(8);
    inputDecalitre.value=(valNum*2.8316846592).toFixed(10);
    inputHectolitre.value=(valNum*0.2831684659).toFixed(10);
    inputKilolitre.value=(valNum*0.0283168466).toFixed(10);
  }
  if (source=="inputCubicyards") {
    inputMillilitres.value=(valNum*764554.9).toFixed(1);
    inputCubiccentimetres.value=(valNum*764554.9).toFixed(1);
    inputCubicmetres.value=(valNum*0.764555).toFixed(6);
    inputLitres.value=(valNum*764.5549).toFixed(4);
    inputCubicfeet.value=(valNum*27).toFixed();
    inputCubicinches.value=(valNum*46656).toFixed();
    inputCentlitre.value=(valNum*76455.485798).toFixed(6);
    inputDecilitre.value=(valNum*7645.5485798).toFixed(7);
    inputDecalitre.value=(valNum*76.455485798).toFixed(9);
    inputHectolitre.value=(valNum*7.6455485798).toFixed(10);
    inputKilolitre.value=(valNum*0.764554858).toFixed(9);
  }
  if (source=="inputCubicinches") {
    inputMillilitres.value=(valNum*16.38706).toFixed(5);
    inputCubiccentimetres.value=(valNum*16.38706).toFixed(5);
    inputCubicmetres.value=(valNum*60.000016).toFixed(4);
    inputLitres.value=(valNum*0.016387).toFixed(6);
    inputCubicfeet.value=(valNum*0.000579).toFixed(6);
    inputCubicyards.value=(valNum*0.000021).toFixed(6);
    inputCentlitre.value=(valNum*1.6387064).toFixed(7);
    inputDecilitre.value=(valNum*0.16387064).toFixed(8);
    inputDecalitre.value=(valNum*0.0016387064).toFixed(10);
    inputHectolitre.value=(valNum*0.0001638706).toFixed(10);
    inputKilolitre.value=(valNum*0.0000163871).toFixed(10);
  }
  if (source=="inputCentlitre") {
    inputMillilitres.value=(valNum*10).toFixed();
    inputCubiccentimetres.value=(valNum*10).toFixed();
    inputCubicmetres.value=(valNum*0.00001).toFixed(5);
    inputLitres.value=(valNum*0.01).toFixed(2);
    inputCubicfeet.value=(valNum*0.0003531467).toFixed(10);
    inputCubicyards.value=(valNum*0.0000130795).toFixed(10);
    inputCubicinches.value=(valNum*0.6102374409).toFixed(10);
    inputDecilitre.value=(valNum*0.1).toFixed(1);
    inputDecalitre.value=(valNum*0.001).toFixed(3);
    inputHectolitre.value=(valNum*0.0001).toFixed(4);
    inputKilolitre.value=(valNum*0.00001).toFixed(5);
  }
  if (source=="inputDecilitre") {
    inputMillilitres.value=(valNum*100).toFixed();
    inputCubiccentimetres.value=(valNum*100).toFixed();
    inputCubicmetres.value=(valNum*0.0001).toFixed(4);
    inputLitres.value=(valNum*0.1).toFixed(1);
    inputCubicfeet.value=(valNum*0.0035314667).toFixed(10);
    inputCubicyards.value=(valNum*0.0001307951).toFixed(10);
    inputCentlitre.value=(valNum*10).toFixed();
    inputCubicinches.value=(valNum*6.1023744095).toFixed(10);
    inputDecalitre.value=(valNum*0.01).toFixed(2);
    inputHectolitre.value=(valNum*0.001).toFixed(3);
    inputKilolitre.value=(valNum*0.0001).toFixed(4);
  }
  if (source=="inputDecalitre") {
    inputMillilitres.value=(valNum*10000).toFixed();
    inputCubiccentimetres.value=(valNum*10000).toFixed();
    inputCubicmetres.value=(valNum*0.01).toFixed(2);
    inputLitres.value=(valNum*10).toFixed();
    inputCubicfeet.value=(valNum*0.3531466672).toFixed(10);
    inputCubicyards.value=(valNum*0.0130795062).toFixed(10);
    inputCentlitre.value=(valNum*1000).toFixed();
    inputDecilitre.value=(valNum*100).toFixed();
    inputCubicinches.value=(valNum*610.23744095).toFixed(8);
    inputHectolitre.value=(valNum*0.1).toFixed(1);
    inputKilolitre.value=(valNum*0.01).toFixed(2);
  }
  if (source=="inputHectolitre") {
    inputMillilitres.value=(valNum*100000).toFixed();
    inputCubiccentimetres.value=(valNum*100000).toFixed();
    inputCubicmetres.value=(valNum*0.1).toFixed(1);
    inputLitres.value=(valNum*100).toFixed();
    inputCubicfeet.value=(valNum*3.5314666721).toFixed(10);
    inputCubicyards.value=(valNum*0.1307950619).toFixed(10);
    inputCentlitre.value=(valNum*10000).toFixed();
    inputDecilitre.value=(valNum*1000).toFixed();
    inputDecalitre.value=(valNum*10).toFixed();
    inputCubicinches.value=(valNum*6102.3744095).toFixed(7);
    inputKilolitre.value=(valNum*0.1).toFixed(1);
  }
  if (source=="inputKilolitre") {
    inputMillilitres.value=(valNum*1000000).toFixed();
    inputCubiccentimetres.value=(valNum*1000000).toFixed();
    inputCubicmetres.value=(valNum*1).toFixed();
    inputLitres.value=(valNum*1000).toFixed();
    inputCubicfeet.value=(valNum*35.314666721).toFixed(9);
    inputCubicyards.value=(valNum*1.3079506193).toFixed(10);
    inputCentlitre.value=(valNum*100000).toFixed();
    inputDecilitre.value=(valNum*10000).toFixed();
    inputDecalitre.value=(valNum*100).toFixed();
    inputHectolitre.value=(valNum*10).toFixed();
    inputCubicinches.value=(valNum*61023.744095).toFixed(6);
  }
}  function filterQuestions() {
  var input = document.getElementById('filterInput').value.toLowerCase();
  var questions = document.querySelectorAll('.accordion-container .accordion');

  questions.forEach(function(question) {
      var text = question.textContent.toLowerCase();
      var panel = question.nextElementSibling;
      var panelText = panel.textContent.toLowerCase(); // Get text content of panel

      if (text.includes(input) || panelText.includes(input)) {
          question.style.display = 'block';
      } else {
          question.style.display = 'none';
          panel.style.display = 'none'; // Hide the panel if the question doesn't match
      }
  });
}
