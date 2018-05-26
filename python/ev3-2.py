# mvk@ca.ibm.com - program to control a lego mindstorm rover 20180526
import lego

print ("Play a sound and Flash LED")
lego.init()
print("Make some noise")
lego.playsound()
lego.time.sleep(3)
print("Set LED to RED FLASH")
lego.ledredflash()
lego.time.sleep(2)
print("Switch LED to GREEN Flash")
lego.ledgreenflash()
lego.time.sleep(2)
lego.ledoff()
print("progam done")
exit()
