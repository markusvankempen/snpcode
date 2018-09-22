var RaspiCam = require("./node-raspicam/lib/raspicam");

  var fs = require('fs')

var camera = new RaspiCam({
	mode: "photo",
	output: "image.jpg",
//	encoding: "jpg",
	timeout: 1, // take the picture immediately
//	nopreview: true
	hflip: true
});
var t1
var t2
camera.on("start", function( err, timestamp ){
	t1=timestamp
	console.log("photo started at " + timestamp );
});

camera.on("read", function( err, timestamp, filename ){
         console.log("captured" + timestamp );
	console.log("It took:"+(timestamp-t1)/1000)
	console.log("photo image captured with filename: " + filename );





 console.log("Reading file");
    fs.readFile(filename, 'base64',function (err, content) {
      if (err) {
            console.log(err);

      } else {

        mytpe =  'image/jpg'
        myname = filename
        pkgsize = 30000
        mylen = content.toString().length
        pkgsend = 0
        data = ""
        wmylen = content.toString().length
        startlen = 0
        pkg=1
        console.log( wmylen );
        while(0 < wmylen)
        {

        if(wmylen >pkgsize){
  console.log("startlen:"+startlen+" pkgsize:"+pkgsize);
          data = content.substr(startlen,pkgsize)
          console.log(data.length)
          startlen=startlen+pkgsize
          wmylen= wmylen - pkgsize
        }else {
          data = content.substr(startlen,wmylen)
          startlen=startlen+wmylen
            console.log(data.length)
          wmylen=0

        }

  console.log("IN length:"+mylen+" sizeleft:"+data.length+" pkg:"+pkg)
     pkg++;
    }//while

	
      }//if
    });//readfile

});

camera.on("exit", function( timestamp ){
	console.log("photo child process has exited at " + timestamp );
});

camera.start();
