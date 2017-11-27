var exec = require('child_process').exec;

console.log('pulling snpcode from GitHub snpcode... mvk20171127 v5');
console.log('Lets wait for 30 sec to get all other services online')
exec('sleep 30', startwork);


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
          if(str.includes("Updating"))
          {
            console.log("Found git update will reboot in 30 sec")
            exec('sleep 30', myreboot);
            
          }
            
        }
        if(stderr) console.log("StdErr ="+stderr);
}

function myreboot(err, stdout, stderr) {
exec('reboot', execCallback);
}


function execCallboot(err, stdout, stderr) {
}  


//
