

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
my_ev3.verbosity = 1
ops = b''.join([
    ev3.opCom_Set,
    ev3.SET_BRICKNAME,
    ev3.LCS("myEV3")
])
my_ev3.send_direct_cmd(ops)


#except:
#    print("Unexpected error:", sys.exc_info()[0])


