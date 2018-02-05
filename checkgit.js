var exec = require('child_process').exec;

console.log('pulling snpcode from GitHub snpcode... mvk20171127 v7');
console.log('Lets wait for 90 sec to get all other services online')
exec('sleep 90', startwork);


function startwork(err, stdout, stderr) {
  // now pull down the latest
        console.log("executing 'git -C /home/pi/gitupdater/snpcode pull -f'");
        exec('git -C /home/pi/gitupdater/snpcode pull -f', execCallback);

  //
    //    exec('sudo systemctl status  gitupdatersnp.service', execCallback);
//install 
//exec('npm install web-terminal -g', execCallback);

//start web terminal
//          exec('sudo /home/pi/.nvm/versions/node/v8.1.3/bin/web-terminal --port 8088', execCallback);

//  exec('sudo systemctl restart  gitupdatersnp.service', execCallback);

//exec('sudo systemctl stop  gitupdatersnp.service', execCallback);
}

function execCallback(err, stdout, stderr) {
        if(err) console.log("Err ="+err);
        if(stdout) 
        {
          console.log("StdOut ="+stdout);
          if(stdout.includes("Updating")) ///did we update the code
          {
            console.log("Found git update will reboot in 90 sec")
            
            // Update Networksetting
            console.log("Update Networksetting")
            exec('cp /home/pi/gitupdater/snpcode/wpa_supplicant.conf /etc/wpa_supplicant/wpa_supplicant.conf', execCallbackNoCheck);  
                        
             //// Update Candle Code START
          /*  
             console.log("cp /home/pi/gitupdater/snpcode/pipbiotv3.js /home/pi/playbulb/snp00/pipbiotv2.js"+Date.now());
             exec('mv /home/pi/playbulb/snp00/pipbiotv2.js /home/pi/playbulb/snp00/pipbiotv2.old.js'+Date.now(), execCallbackNoCheck);
             exec('cp /home/pi/gitupdater/snpcode/pipbiotv3.js /home/pi/playbulb/snp00/pipbiotv2.js', execCallbackNoCheck);  
             exec('cp /home/pi/gitupdater/snpcode/pipbiotv3.js /home/pi/playbulb/snp00/pipbiotv3-usev2.js', execCallbackNoCheck);  
             exec('cp /home/pi/gitupdater/snpcode/candle-service.js /home/pi/playbulb/lib/', execCallbackNoCheck);  
            
            ///// Update END
             */
            exec('sleep 90', myreboot);
           
          }else{
          
          console.log("All Uptodate");   
             
          }
            
        }
  
        if(stderr) console.log("StdErr ="+stderr);
  
  console.log("StdErr ="+stderr);
  console.log("Err ="+err);
  console.log("StdOut ="+stdout);
          
    if(stderr == "" && err == "" && stdout =="")
      console.log("No Error nor message - Nothing to do - all good"); 
}

function myreboot(err, stdout, stderr) {
exec('reboot', execCallback);
}


function execCallboot(err, stdout, stderr) {
}  

function execCallbackNoCheck(err, stdout, stderr) {
          if(err) console.log("Err ="+err);
        if(stdout) 
        {
          console.log("StdOut ="+stdout); 
        }
        if(stderr) console.log("StdErr ="+stderr);
}  
