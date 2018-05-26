# mvk@ca.ibm.com - program to control a lego mindstorm rover 20180526
import lego



print ("Rover move comand example program")
lego.init()

print ("Using MAC = "+lego.ev3host)
lego.stop()
lego.playsound()
lego.time.sleep(3)

print ("moving forward")
lego.move(30,0)      #slow forward speed 30 no turn
print ("sleep")
lego.time.sleep(3)      #In Seconds
print ("moving backward")
lego.move(-30,0)
print ("sleep")
lego.time.sleep(3)
print ("turn and move left")
lego.move(30,90)     #turn left with speed 30
lego.time.sleep(3)
print ("turn and move right")
lego.move(30,-100)
lego.time.sleep(3)

print ("turn /circle on the spot")
lego.move(30,-200)
lego.time.sleep(3)

lego.ledgreenflash()
lego.time.sleep(3)
lego.ledoff()
lego.stop()
print ("program done")
