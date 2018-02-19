'use strict';

/**
 * Controls single digit 7-segment display // GPIOPorts 4,17,27,22
 * @param {number} pinA
 * @param {number} pinB
 * @param {number} pinC
 * @param {number} pinD
 * @param {number} pinE
 * @param {number} pinF
 * @param {number} pinG
 * @param {number} pinDP

 //                           A B  C   d
var draw = new segment(Gpio,17,4, 23, 24, 25, 27, 22, 18); // OR your own wiring options
See   diagram
https://github.com/sketchthat/7-segment-node
 */
var draw = function(Gpio, pinA, pinB,  pinC,  pinD,  pinE,  pinF,  pinG , pinDP) {
    var ledOn = 1;
    var ledOff = 0;

    var configA = new Gpio(pinA, {mode: Gpio.output});
    var configB = new Gpio(pinB, {mode: Gpio.output});
    var configC = new Gpio(pinC, {mode: Gpio.output});
    var configD = new Gpio(pinD, {mode: Gpio.output});
    var configE = new Gpio(pinE, {mode: Gpio.output});
    var configF = new Gpio(pinF, {mode: Gpio.output});
    var configG = new Gpio(pinG, {mode: Gpio.output});
    var configDP = new Gpio(pinDP, {mode: Gpio.output});

	

    var drawReset = function() {
      configA.digitalWrite(ledOff);
          configB.digitalWrite(ledOff);
              configC.digitalWrite(ledOff);
                  configD.digitalWrite(ledOff);
                      configE.digitalWrite(ledOff);
                            configF.digitalWrite(ledOff);
                                    configG.digitalWrite(ledOff);
					      configDP.digitalWrite(ledOff);

    };

   this.setA = function(v)
   {
	configA.digitalWrite(v)
   }	

     this.setB = function(v)
   {
        configB.digitalWrite(v)
   }

  this.setC = function(v)
   {
        configC.digitalWrite(v)
   }

  this.setD = function(v)
   {
        configD.digitalWrite(v)
   }

  this.setE = function(v)
   {
        configE.digitalWrite(v)
   }

  this.setF = function(v)
   {
        configF.digitalWrite(v)
   }

  this.setG = function(v)
   {
        configG.digitalWrite(v)
   }

  this.setDP = function(v)
   { 
        configDP.digitalWrite(v)
   }

   this.setAll = function(a,b,c,d,e,f,g,dp)
   {
console.log(">>>>>>>> setting All LED "+a+b+c+d+e+f+g+dp);
              configA.digitalWrite(a);
          configB.digitalWrite(b);
              configC.digitalWrite(c);
                  configD.digitalWrite(d);
                      configE.digitalWrite(e);
                            configF.digitalWrite(f);
                                    configG.digitalWrite(g);
                                              configDP.digitalWrite(dp);

   }


   this.setPinOn = function(v)
   { 
 	var mypin = new Gpio(pinDP, {mode: Gpio.output});
	mypin.digitalWrite(1);
   }

   this.setPinOff = function(v)
   {
        var mypin = new Gpio(pinDP, {mode: Gpio.output});
        mypin.digitalWrite(1);
   }

    this.reset = function() {
      drawReset();
    }

    var    runRefresh = function(i) {
        drawReset();

        if (i == 0) {
          configA.digitalWrite(ledOn);
        } else if (i == 1) {
           configB.digitalWrite(ledOn);
         } else if (i == 2) {
            configC.digitalWrite(ledOn);
          } else if (i == 3) {
             configD.digitalWrite(ledOn);
           } else if (i == 4) {
              configE.digitalWrite(ledOn);
            } else if (i == 5) {
               configF.digitalWrite(ledOn);
                // i = -1;
              } else if (i == 6) {
               	configF.digitalWrite(ledOn);
		}



    }

//    this.

    this.rotate = function() {
        var i = 0;

        var myint = setInterval(function() {
            runRefresh(i);
            if(i>=6)
		{
            	 clearInterval(myint);
			 drawReset();
		}
	    else
		i++;
        }, 200);
    }

    var blink =  function(number)
	{
	 drawReset();
                       configA.digitalWrite(ledOn);
                       configB.digitalWrite(ledOn);
                       configC.digitalWrite(ledOn);
                       configD.digitalWrite(ledOn);
                       configE.digitalWrite(ledOn);
                       configF.digitalWrite(ledOn);
                       configG.digitalWrite(ledOn);
		      configDP.digitalWrite(ledOn);
/*
	 drawReset();
  configA.digitalWrite(ledOn);
                       configB.digitalWrite(ledOn);
                       configC.digitalWrite(ledOn);
                       configD.digitalWrite(ledOn);
                       configE.digitalWrite(ledOn);
                       configF.digitalWrite(ledOn);
                       configG.digitalWrite(ledOn);
			    configDP.digitalWrite(ledOn);
  drawReset();
  configA.digitalWrite(ledOn);
                       configB.digitalWrite(ledOn);
                       configC.digitalWrite(ledOn);
                       configD.digitalWrite(ledOn);
                       configE.digitalWrite(ledOn);
                       configF.digitalWrite(ledOn);
                       configG.digitalWrite(ledOn);
*/
	}		

    this.display = function(number) {
        drawReset();

        if (number == '0') {
                  configA.digitalWrite(ledOn);
                  configB.digitalWrite(ledOn);
                  configC.digitalWrite(ledOn);
                  configD.digitalWrite(ledOn);
                  configE.digitalWrite(ledOn);
                  configF.digitalWrite(ledOn);

                } else if (number == '1') {
                      configB.digitalWrite(ledOn);
                      configC.digitalWrite(ledOn);
                } else if (number == '2') {
                  configA.digitalWrite(ledOn);
                  configB.digitalWrite(ledOn);

                  configD.digitalWrite(ledOn);
                  configE.digitalWrite(ledOn);

                  configG.digitalWrite(ledOn);
                   } else if (number == '3') {
                     configA.digitalWrite(ledOn);
                     configB.digitalWrite(ledOn);
                     configC.digitalWrite(ledOn);
                     configD.digitalWrite(ledOn);
                     configG.digitalWrite(ledOn);
                   } else if (number == '4') {

                     configB.digitalWrite(ledOn);
                     configC.digitalWrite(ledOn);
                    configF.digitalWrite(ledOn);
                     configG.digitalWrite(ledOn);

                    } else if (number == '5') {
                      configA.digitalWrite(ledOn);

                      configC.digitalWrite(ledOn);
                      configD.digitalWrite(ledOn);

                      configF.digitalWrite(ledOn);
                      configG.digitalWrite(ledOn);
                    } else if (number == '6') {
                      configA.digitalWrite(ledOn);

                      configC.digitalWrite(ledOn);
                      configD.digitalWrite(ledOn);
                      configE.digitalWrite(ledOn);
                      configF.digitalWrite(ledOn);
                      configG.digitalWrite(ledOn);
                  } else if (number == '7') {
                    configA.digitalWrite(ledOn);
                    configB.digitalWrite(ledOn);
                    configC.digitalWrite(ledOn);
                     } else if (number == '8') {
                       configA.digitalWrite(ledOn);
                       configB.digitalWrite(ledOn);
                       configC.digitalWrite(ledOn);
                       configD.digitalWrite(ledOn);
                       configE.digitalWrite(ledOn);
                       configF.digitalWrite(ledOn);
                       configG.digitalWrite(ledOn);
                   } else if (number == '9') {
                     configA.digitalWrite(ledOn);
                     configB.digitalWrite(ledOn);
                     configC.digitalWrite(ledOn);
                     configD.digitalWrite(ledOn);
                    
                     configF.digitalWrite(ledOn);
                     configG.digitalWrite(ledOn);
        } else if (number == '.') {
                configDP.digitalWrite(ledOn);
        }
    };
};

module.exports = draw;

