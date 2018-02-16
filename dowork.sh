#
echo "The working script ! mvk-20180216"
date > dowork1.log
echo "Copy pa_supplicant.conf /etc/wpa_supplicant/wpa_supplicant.conf"
sudo cp /home/pi/gitupdater/snpcode/wpa_supplicant.conf /etc/wpa_supplicant/wpa_supplicant.conf

echo "Updateing script";
echo "Backup old script pipbiotv2.js "
sudo mv /home/pi/playbulb/snp00/pipbiotv2.js /home/pi/playbulb/snp00/pipbiotv2.old.mvk-2018020
sudo rm /home/pi/playbulb/snp00/pipbiotv2.js
echo "cp pipbgpiov1.js  to pipbiotv2.js"
sudo cp /home/pi/gitupdater/snpcode/pipbgpiov1.js /home/pi/playbulb/snp00/pipbiotv2.js
echo "cp pipbgpiov1.js  to pipbgpiov1-is-in-pipbiotv2.js"
sudo cp /home/pi/gitupdater/snpcode/pipbgpiov1.js /home/pi/playbulb/snp00/pipbgpiov1-is-in-pipbiotv2.js             
echo "cp pipbgpiov1.js  to snp00/ pipbgpiov1.js"
sudo cp /home/pi/gitupdater/snpcode/pipbgpiov1.js /home/pi/playbulb/snp00/pipbgpiov1.js
echo "cp andle-service.js /home/pi/playbulb/lib/"          
sudo cp /home/pi/gitupdater/snpcode/candle-service.js /home/pi/playbulb/lib/
sudo npm install pigpio --prefix /home/pi/playbulb/snp00/
echo "Reboot in 60sec"
sleep 60
sudo reboot
