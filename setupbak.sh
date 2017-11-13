echo "Setup snpcodebak for git sync"
mkdir /home/pi/gitupdater
cd  /home/pi/gitupdater
git  clone https://github.com/markusvankempen/snpcodebak.git
sudo cp  gitupdatersnpbak.service /etc/systemd/system/
sudo systemctl enable gitupdatersnpbak.service
sudo systemctl start gitupdatersnpbak.service
sudo systemctl status gitupdatersnpbak.service
