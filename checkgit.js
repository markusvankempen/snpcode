var exec = require('child_process').exec;

        console.log('pulling code from GitHub snpcode... mvk20171112 v1');
  // now pull down the latest
        exec('git -C /home/pi/gitupdater/snpcode pull -f', execCallback);
  //
    //    exec('sudo systemctl status  gitupdatersnp.service', execCallback);

function execCallback(err, stdout, stderr) {
        if(stdout) console.log(stdout);
        if(stderr) console.log(stderr);
}
