#
echo "The working script ! mvk-201800301-0900"
date > dowork1.log
echo "Copy pa_supplicant.conf /etc/wpa_supplicant/wpa_supplicant.conf"
sudo cp /home/pi/gitupdater/snpcode/wpa_supplicant.conf /etc/wpa_supplicant/wpa_supplicant.conf

echo "Updateing script";
echo "Backup old script pipbiotv2.js "
sudo mv /home/pi/playbulb/snp00/pipbiotv2.js /home/pi/playbulb/snp00/pipbiotv2.old.mvk-20180301
echo "cp pipbgpiov3.js  to pipbiotv2.js"
sudo cp /home/pi/gitupdater/snpcode/pipbgpiov3.js /home/pi/playbulb/snp00/pipbiotv2.js
echo "cp pipbgpiov3.js  to pipbgpiov3-is-in-pipbiotv2.js"
sudo cp /home/pi/gitupdater/snpcode/pipbgpiov3.js /home/pi/playbulb/snp00/pipbgpiov3-is-in-pipbiotv2.js             
echo "cp pipbgpiov3.js  to snp00/ pipbgpiov3.js"
sudo cp /home/pi/gitupdater/snpcode/pipbgpiov3.js /home/pi/playbulb/snp00/pipbgpiov3.js
echo "cp 7segmentv3.js  to snp00/ 7segmentv3.js"
sudo cp /home/pi/gitupdater/snpcode/7segmentv3.js /home/pi/playbulb/snp00/7segmentv3.js
echo "cp candle-service.js /home/pi/playbulb/lib/"          
sudo cp /home/pi/gitupdater/snpcode/candle-service.js /home/pi/playbulb/lib/
sudo npm install pigpio --prefix /home/pi/playbulb/snp00/
echo "Reboot in 90sec"
sleep 10
#sudo reboot
