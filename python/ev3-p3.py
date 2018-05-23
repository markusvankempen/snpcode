
import ev3
import os
import sys

#print (os.environ["EV3"])
try:

	if len(os.environ["EV3"]) < 12:
   		print ("ERROR EV3 var not set - please use>>> export EV3='Your EV3 Bluetooth MAC Address'")
   		exit()

except:
    print ("ERROR EV3 var not set - please use>>> export EV3='Your EV3 Bluetooth MAC Address'")
    print("Unexpected error:", sys.exc_info()[0])
    exit()

ev3host = str(os.environ["EV3"])
my_ev3 = ev3.EV3(protocol=ev3.BLUETOOTH,host=ev3host)

#my_ev3.verbosity = 1
my_ev3.verbosity = 1
ops = b''.join([
    ev3.opUI_Write,
    ev3.LED,
    ev3.LED_RED,
    ev3.opSound,
    ev3.TONE,
    ev3.LCX(1),
    ev3.LCX(262),
    ev3.LCX(500),
    ev3.opSound_Ready,
    ev3.opUI_Write,
    ev3.LED,
    ev3.LED_GREEN,
    ev3.opSound,
    ev3.TONE,
    ev3.LCX(1),
    ev3.LCX(330),
    ev3.LCX(500),
    ev3.opSound_Ready,
    ev3.opUI_Write,
    ev3.LED,
    ev3.LED_RED,
    ev3.opSound,
    ev3.TONE,
    ev3.LCX(1),
    ev3.LCX(392),
    ev3.LCX(500),
    ev3.opSound_Ready,
    ev3.opUI_Write,
    ev3.LED,
    ev3.LED_RED_FLASH,
    ev3.opSound,
    ev3.TONE,
    ev3.LCX(2),
    ev3.LCX(523),
    ev3.LCX(2000),
    ev3.opSound_Ready,
    ev3.opUI_Write,
    ev3.LED,
    ev3.LED_GREEN
])
my_ev3.send_direct_cmd(ops)

#ops = b''.join([
#    ev3.opSound,
#    ev3.PLAY,
#    ev3.LCX(100),                  # VOLUME
#    ev3.LCS('./ui/DownloadSucces') # NAME
#])
#my_ev3.send_direct_cmd(ops)
