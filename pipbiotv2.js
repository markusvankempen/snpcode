/************************************************************************
* Copyright 2017 IBM Corp. All Rights Reserved.
************************************************************************
*
* mvk@ca.ibm.com - 455
* adjustemts for SNP Workshop - 20170804
* added ippaddress,webservice,confirmation mqtt
*
* Service instructions:
* https://www.axllent.org/docs/view/nodejs-service-with-systemd/#user-comments
************************************************************************
*
* This porgram controls a playbulb via watson speech to text api and
* mqqt using bluemix and watson iot platform
*/
// Require child_process
var exec = require('child_process').exec;

// Create shutdown function
function shutdown(callback){
    exec('shutdown -r now', function(error, stdout, stderr){ callback(stdout); });
}

var sys = require('util')
//var exec = require('child_process').exec;
function mystop(error, stdout, stderr) {console.log("exe ble stop "+stdout)}
function mystart(error, stdout, stderr) {
console.log("exec ble start "+stdout)
console.log(stderr)
if (stderr != "")
exec("sudo systemctl start hciuart", mystart2);
}
function mystart2(error, stdout, stderr) {
console.log("exec ble start no2 "+stdout);
console.log(stderr);
if (stderr != "")
console.log("Reboot maybe better ???")
}

  var iotf = require("../iotf/iotf-client");

/// IP address

  var
      // Local ip address that we're trying to calculate
      address
      // Provides a few basic operating-system related utility functions (built-in)
      ,os = require('os')
      // Network interfaces
      ,ifaces = os.networkInterfaces();

  function internalIP()
  {

  var ifaces = os.networkInterfaces();

  //console.log(JSON.stringify(ifaces, null, 4));

  for (var iface in ifaces) {
    var iface = ifaces[iface];
    for (var alias in iface) {
      var alias = iface[alias];

    //  console.log(JSON.stringify(alias, null, 4));

      if ('IPv4' !== alias.family || alias.internal !== false) {
        //console.log("skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses");
        //console.log(alias);
        continue;
      }
      //console.log("Found ipaddress: " + alias.address);
      return alias.address;
    }
  }
  }
  function externalIP()
  {
      // Iterate over interfaces ...
      for (var dev in ifaces) {

          // ... and find the one that matches the criteria
          var iface = ifaces[dev].filter(function(details) {
              //console.log(iface);
            //  console.log(dev);

            return details.family === 'IPv4' && details.internal === false;
          });

          if(iface.length > 0) address = iface[0].address;
      }


      return address;
  }



  var intIP = internalIP();
  var extIP = externalIP();
  var myhostname = os.hostname();
  console.log("hostname = " +os.hostname());
  console.log("External IP ="+extIP);
  console.log("internal IP ="+intIP);

// WEB server

var http = require('http'),
    fs = require('fs'),
    // NEVER use a Sync function except at start-up!
    index = fs.readFileSync(__dirname + '/logviasocket.html');

    const hostname = '0.0.0.0';
    const port = 88;

// Send index.html to all requests
var app = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('Hello World!<br>');
    res.write("Hostname = " +os.hostname());
    res.write("External IP ="+extIP);
    res.write("Internal IP ="+intIP);
    res.end();
});
//lt --port 88 --subdomain playbulb00

/*
console.log("starting lt --port 88 --subdomain "+os.hostname())    
exec('/home/pi/.nvm/versions/node/v8.1.3/bin/lt --port 88 --subdomain '+os.hostname(), function(err, stdout, stderr){ 
console.log(stdout); 
console.log(stderr); 
console.log(err);
  if (err instanceof Error)
    throw err;
  process.stderr.write(err);
  process.stdout.write(out);
  process.exit(code);
});
*/

const localtunnel = require('localtunnel');


var tunnel = localtunnel(port, { subdomain: myhostname+"mvk"} ,function(err, tunnel) {
    if (err)
      console.log("tunnel error ="+err)
    // the assigned public url for your tunnel
    // i.e. https://abcdefgjhij.localtunnel.me
      console.log("tunnel  ="+tunnel.url);
	console.log(tunnel);
});

console.log("starting lt --port 88 --subdomain "+os.hostname())

// Socket.io server listens to our app
var io = require('socket.io').listen(app);

// Send current time to all connected clients
function sendTime() {
    io.emit('clearance', { time: new Date().toJSON() });
    log(io,"Helo There");
}
function log(io,data){
     console.log(data);
     io.emit('message', { time: new Date().toJSON() ,text: data});
}
// Send current time every 10 secs
//set
//Interval(sendTime, 10000);

// Emit welcome message on connection
io.on('connection', function (socket) {
    // Use socket to communicate with this particular client only, sending it it's own id
    socket.emit('welcome', { message: 'Welcome! You are '+myhostname, id: socket.id });

    socket.on('receiveClerance', function (data) {
        log(socket,data);
        // Reboot computer
       shutdown(function(output){
           log(output);
        });
    });
});



app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
//// BLE

var NobleDevice = require('../lib/noble-device');
NobleDevice.Util = require('../lib/util');

var idOrLocalName = process.argv[2];

if (!idOrLocalName) {
    //myhostname = "playbulb01" ;
  console.log("node program.js [BLE ID or local name] will use hostname ="+myhostname);
//  process.exit(1);
}else{


}

var CandleDevice = function(device) {
  NobleDevice.call(this, device);
};

CandleDevice.is = function(device) {
  var localName = device.advertisement.localName;
  log(io," id: " +device.id + " name: "+localName);
  return (device.id === idOrLocalName || localName === myhostname  );
};

NobleDevice.Util.inherits(CandleDevice, NobleDevice);

CandleDevice.prototype.getBatteryLevel = function(callback) {
  this.readDataCharacteristic('180f', '2a19', callback);
};

CandleDevice.prototype.getCurrentColor = function(callback) {
  this.readDataCharacteristic('ff02', 'fffc', callback);
};

CandleDevice.prototype.candleName = function(callback) {
    this.readDataCharacteristic('ff02', 'ffff', callback);
};

CandleDevice.prototype.read = function(serviceUUID,charUUID,callback) {
  this.readDataCharacteristic(serviceUUID, charUUID, callback);
};

CandleDevice.prototype.write = function(serviceUUID,charUUID,data,callback) {
  this.writeDataCharacteristic(serviceUUID, charUUID,data, callback);
};
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function hexToBytes(hex) {
  if(hex === undefined)
   return 0;

        for (var bytes = [], c = 0; c < hex.length; c += 2)
            bytes.push(parseInt(hex.substr(c, 2), 16));
        return bytes;
    };

function bytesToHex (bytes) {
   if(bytes === undefined)
    return 0;

        for (var hex = [], i = 0; i < bytes.length; i++) {
            hex.push((bytes[i] >>> 4).toString(16));
            hex.push((bytes[i] & 0xF).toString(16));
        }
        return hex.join("");
    };

var candleName="";
var batLevel="";
var candleColor="";
var rr="";
var bb="";
var gg="";
var cmode;
/************************************************************************
 * Discover BLE devices
 ************************************************************************/
var bleconnected = false;
var gmqttClient = null;
CandleDevice.discoverAll(function(device) {
  //  var localName = device.advertisement.localName;
  console.log('discovered: ' + device);// +" Name:"+localName);

  device.on('disconnect', function() {
  //console.log('disconnected'); 
    log(io,'disconnected!');
    bleconnected = false;
      try{
      gmqttClient.publish('status', 'json', {"ble":"disconnected"},1);
     var mqmsg  ='{"value":'+0+',"mode":"'+0+'","batLevel":"'+0+'","candleColor":"'+0+'","candleRR":"'+0+'","candleGG":"'+0+'","candleBB":"'+0+'","ipAddr":"'+intIP+'","candleID":"'+0+'","candleName":"'+candleName+ '","ts":"'+Date.now()+'","bleconnected":"'+bleconnected+ '"} ';
     qmqttClient.publish('ping', 'json', mqmsg,1);
}catch(e){
console.log(">>>could not publish disconnect message");
}
    process.exit(0);
  //CandleDevice.stopDiscoverAll();
//  mqttClient.publish('status', 'json', {"ble":"disconnected"},1);
  });

  device.on('change', function(data) {
    console.log("update : " + data);
  });

device.on('connect', function(data) {
    console.log("connect : " + data);
  });

  device.connectAndSetUp(function(callback) {
    console.log('ConnectAndSetUp');
    bleconnected = true;
    var config = require("./"+myhostname+".json");
    var mqttClient = new iotf.IotfDevice(config);
    gmqttClient = mqttClient;
    //setting the log level to trace. By default its 'warn'
    mqttClient.log.setLevel('debug');

    /************************************************************************
     * Connect to WIOTP
     ************************************************************************/
    log(io,"IOTF start with "+myhostname);
    mqttClient.connect();

    mqttClient.on('connect', function(){
        var i=0;
        log(io,"connected to IBM IOTF/Bluemix");

                  sleep(500)
                  setCandleGreen();
                    sleep(500);
                  setCandleGreen();
   sleep(500);

        setInterval(function function_name () {
          i++;
	
	try{
          device.candleName(function(error,data) {
            candleName = data;
          })
          device.getBatteryLevel(function(error,data) {
            batLevel =   parseInt(bytesToHex(data),16);
          })
          device.getCurrentColor(function(error,data) {
            candleColor = bytesToHex(data);
            rr =  parseInt(bytesToHex(data).substring(2,4),16);
            gg =  parseInt(bytesToHex(data).substring(4,6),16);
            bb =  parseInt(bytesToHex(data).substring(6,8),16);
         })
             //readCandleMode(
	 
           device.read('ff02','fffb',function(error,data1) {
             cmode = bytesToHex(data1);
           });
	
	}catch(e){
		log(io,"Can not read ble device data");

           gmqttClient.publish('status', 'json', {"ble":"disconnected - could not read "},1);
           var mqmsg  ='{"value":'+0+',"mode":"'+0+'","batLevel":"'+0+'","candleColor":"'+0+'","candleRR":"'+0+'","candleGG":"'+0+'","candleBB":"'+0+'","ipAddr":"'+intIP+'","candleID":"'+0+'","candleName":"'+candleName+ '","ts":"'+Date.now()+'","bleconnected":"'+bleconnected+ '"} ';
           gmqttClient.publish('ping', 'json', mqmsg,1);
          process.exit(0);

           device.disconnect(function(error) {
             console.log('disconnected from peripheral: ' + device.uuid);
           });

exec("sudo systemctl stop hciuart", mystop);
exec("sudo systemctl start hciuart", mystart);

	
	}//catch
               /************************************************************************
                * Send some device Information to WIOT and NODE-RED
                ************************************************************************/
if(bleconnected)
{
          var mqmsg  ='{"value":'+i+',"mode":"'+cmode+'","batLevel":"'+batLevel+'","candleColor":"'+candleColor+'","candleRR":"'+rr+'","candleGG":"'+gg+'","candleBB":"'+bb+'","ipAddrExt":"'+extIP+'","ipAddr":"'+intIP+'","candleID":"'+device.id+'","candleName":"'+candleName+ '","ts":"'+Date.now()+'","bleconnected":"'+bleconnected+ '"} ';
          mqttClient.publish('ping', 'json', mqmsg,1);
          log(io,mqmsg);
}else{
  var mqmsg  ='{"value":'+i+',"mode":"'+0+'","batLevel":"'+0+'","candleColor":"'+0+'","candleRR":"'+0+'","candleGG":"'+0+'","candleBB":"'+0+'","ipAddr":"'+intIP+'","candleID":"'+0+'","candleName":"'+candleName+ '","ts":"'+Date.now()+'","bleconnected":"'+bleconnected+ '"} ';
  mqttClient.publish('ping', 'json', mqmsg,1);
  log(io,mqmsg);

}
          //  setCandleColor(0,0,i);
          //Text    mqttClient.publish('stt', 'json', '{"text":"Set candle to blue"}');
        },1000);

        //setCandleBlue();
    });

    mqttClient.on('disconnect', function(){
      log(io,'Disconnected from IoTF');
    });


        /************************************************************************
         * WAITING for actions
         ************************************************************************/
         var c=0;
    mqttClient.on("command", function (commandName,format,payload,topic) {
      c++;
    console.log("Command:", commandName);
  //  log(io,"Comand received with payload = "+JSON.parse(payload));
    myjson = JSON.parse(payload);

    var mqmsg  ='{"receivedcmd":"'+commandName+'","confno":"'+c+'","mode":"'+cmode+'","batLevel":"'+batLevel+'","candleColor":"'+candleColor+'","candleRR":"'+myjson.rr+'","candleGG":"'+myjson.gg+'","candleBB":"'+myjson.bb+'","ipAddr":"'+intIP+'","candleID":"'+device.id+'","candleName":"'+candleName+  '","ts":"'+Date.now()+ +'","bleconnected":"'+bleconnected+ '"} ';
    mqttClient.publish('confirmation', 'json', mqmsg,1);
    log(io,"Command:" + commandName +" Payload:"+myjson);
//  console.log("payload = "+JSON.parse(payload).rr);
    if(commandName === "setModeCandleLight") {
        setModeCandleLight();
      }else if(commandName === "setCandleMode") {
            setCandleMode(myjson.rr,myjson.gg,myjson.bb,myjson.mode,myjson.speed1,myjson.speed2);
      }else if(commandName === "setColorBlue") {
            setCandleBlue();
        } else if(commandName === "setColor") {
            setCandleColor(myjson.rr,myjson.gg,myjson.bb);
        }else {
            log(io,"Command not supported.. " + commandName);
        }
    }); //Command

    ////***

  });//connectAndSetUp
  /************************************************************************
   * PlayBulb Functions
   ************************************************************************/

function setModeCandleLight (){
  // mode 4
//new Buffer([0, r, g, b, effect, 0, speedBytes[0], speedBytes[1]]);
  device.write('ff02','fffb',new Buffer([0, 255, 255, 0, 4,0,1,0 ]),function() {
     console.log('Setting candle to CandleMode = 04 = Candle Effect.');
   });
}

function setCandleMode (r,g,b,mode,speed1,speed2){
// mode =01 = Fade, 02 = Jump RBG (rainbow), 03 = Fade RGB (rainbow), 04 = Candle Effect
//new Buffer([0, r, g, b, effect, 0, speedBytes[0], speedBytes[1]]);
  device.write('ff02','fffb',new Buffer([0, r, g, b, mode,0,speed1,speed2]),function() {
     console.log("modes:01 = Fade, 02 = Jump RBG (rainbow), 03 = Fade RGB (rainbow), 04 = Candle Effect");
     console.log('Writing effect data:'+mode);
     readCandleMode(true);
   });
}

function readCandleMode (log){
// mode =01 = Fade, 02 = Jump RBG (rainbow), 03 = Fade RGB (rainbow), 04 = Candle Effect
//new Buffer([0, r, g, b, effect, 0, speedBytes[0], speedBytes[1]]);
  device.read('ff02','fffb',function(error,data1) {
    if(log)
    {
    console.log('ModeCode         = xxRRGGBBMMxxS1S2');
    console.log('CurrentModeCode  = '+ bytesToHex(data1));
  }
    return  bytesToHex(data1);
   });
}

function setCandleBlue()
{
  setCandleColor(0,0,255)
}


function setCandleColor(r,g,b)
  {
    setCandleMode(0,0,0,0,0,0); //reset
// read and write color
     device.read('ff02','fffc', function(error,data1) {
      console.log('ColorCode       = xxRRGGBB');
//      console.log('CurrentColor  = '+ bytesToHex(data1));
      // write color
          device.write('ff02','fffc',new Buffer([0, r, g , b]), function() {
           console.log("Set Color to r="+r+" g="+g+" b="+b);


         });
    });
}
function setCandleYellow(){
  setCandleColor(255,255,0);
}
function setCandleBlue(){
  setCandleColor(0,0,255);
}
function setCandleGreen(){
  setCandleColor(0,255,0);
}
function setCandleRed(){
      // write color
          device.write('ff02','fffc',new Buffer([0, 255, 0, 0]), function() {
           log(io,"Set Color to RED");
         });
}

function setCandleOn(){
      // write color
          device.write('ff02','fffc',new Buffer([0, 0, 0, 255]), function() {
           log(io,"Set Candle to On");
         });
}

function setCandleOff(){
      // write color
          device.write('ff02','fffc',new Buffer([0, 0, 0, 0]), function() {
           log(io,"Set Candle to Off");
         });
}



})
