# mvk@ca.ibm.com - program to control a lego mindstorm rover 20180526
import lego

print ("Rename my rover and Play a Sound")
lego.init()
rovername = "myEV3-##"  #TODO  adjust the number ## with you group #
print ("Rename my rover to "+rovername)
lego.rename(rovername)
print("Make some noise")
lego.time.sleep(1)
lego.playsound()
lego.time.sleep(3)
print("progam done")
