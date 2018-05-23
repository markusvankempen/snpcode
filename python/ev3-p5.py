import curses
import ev3
import os
import sys
import time

print ("Start ")
try:
	if len(os.environ["EV3"]) < 12:
   		print ("ERROR EV3 var not set - please use>>> export EV3='Your EV3 Bluetooth MAC Address'")
   		exit()
except:
    print ("ERROR EV3 var not set - please use>>> export EV3='Your EV3 Bluetooth MAC Address'")
    print("Unexpected error:", sys.exc_info()[0])
    exit()

def move(speed: int, turn: int) -> None:
    global myEV3, stdscr
#    stdscr.addstr(5, 0, 'speed: {}, turn: {}      '.format(speed, turn))
    if turn > 0:
        speed_right = speed
        speed_left  = round(speed * (1 - turn / 100))
    else:
        speed_right = round(speed * (1 + turn / 100))
        speed_left  = speed
    ops = b''.join([
        ev3.opOutput_Speed,
        ev3.LCX(0),                       # LAYER
        ev3.LCX(ev3.PORT_B),              # NOS
        ev3.LCX(speed_right),             # SPEED
        ev3.opOutput_Speed,
        ev3.LCX(0),                       # LAYER
        ev3.LCX(ev3.PORT_C),              # NOS
        ev3.LCX(speed_left),              # SPEED
        ev3.opOutput_Start,
        ev3.LCX(0),                       # LAYER
        ev3.LCX(ev3.PORT_B + ev3.PORT_C)  # NOS
    ])
    myEV3.send_direct_cmd(ops)

def stop() -> None:
    global myEV3, stdscr
#    stdscr.addstr(5, 0, 'vehicle stopped                         ')
    ops = b''.join([
        ev3.opOutput_Stop,
        ev3.LCX(0),                       # LAYER
        ev3.LCX(ev3.PORT_B + ev3.PORT_C), # NOS
        ev3.LCX(0)                        # BRAKE
    ])
    myEV3.send_direct_cmd(ops)



speed = 0
turn  = 0

ev3host = str(os.environ["EV3"])
myEV3 = ev3.EV3(protocol=ev3.BLUETOOTH,host=ev3host)

stop()
move(-100,0)
print ("sleep")
time.sleep(5)  #

print ("moving forward")
move(20,0)     # slow forward
print ("sleep")
time.sleep(5)  #In Seconds
print ("moving backward")
move(-20,0)
print ("sleep")
time.sleep(5)
move(20,100)
print ("turn and move left")
time.sleep(5)
move(20,-100)
print ("turn and move right")
time.sleep(5)
print ("program done")
stop()
