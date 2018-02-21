#
echo "The working script ! mvk-201802120-0900"
date > dowork1.log
echo "Copy pa_supplicant.conf /etc/wpa_supplicant/wpa_supplicant.conf"
sudo cp /home/pi/gitupdater/snpcode/wpa_supplicant.conf /etc/wpa_supplicant/wpa_supplicant.conf

echo "Updateing script";
echo "Backup old script pipbiotv2.js "
sudo mv /home/pi/playbulb/snp00/pipbiotv2.js /home/pi/playbulb/snp00/pipbiotv2.old.mvk-20180219
echo "cp pipbgpiov2.js  to pipbiotv2.js"
sudo cp /home/pi/gitupdater/snpcode/pipbgpiov2.js /home/pi/playbulb/snp00/pipbiotv2.js
echo "cp pipbgpiov2.js  to pipbgpiov2-is-in-pipbiotv2.js"
sudo cp /home/pi/gitupdater/snpcode/pipbgpiov2.js /home/pi/playbulb/snp00/pipbgpiov2-is-in-pipbiotv2.js             
echo "cp pipbgpiov2.js  to snp00/ pipbgpiov2.js"
sudo cp /home/pi/gitupdater/snpcode/pipbgpiov2.js /home/pi/playbulb/snp00/pipbgpiov2.js
echo "cp 7segmentv3.js  to snp00/ 7segmentv3.js"
sudo cp /home/pi/gitupdater/snpcode/7segmentv3.js /home/pi/playbulb/snp00/7segmentv3.js
echo "cp andle-service.js /home/pi/playbulb/lib/"          
sudo cp /home/pi/gitupdater/snpcode/candle-service.js /home/pi/playbulb/lib/
sudo npm install pigpio --prefix /home/pi/playbulb/snp00/
echo "Reboot in 90sec"
sleep 120
sudo reboot


