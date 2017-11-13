
echo "Setup snpcode for git sync"
mkdir /home/pi/gitupdater
cd  /home/pi/gitupdater/
git  clone https://github.com/markusvankempen/snpcode.git
cd  /home/pi/gitupdater/snpcode/
sudo cp  gitupdatersnpbak.service /etc/systemd/system/
sudo systemctl enable gitupdatersnp.service
sudo systemctl start gitupdatersnp.service
sudo systemctl status gitupdatersnp.service

