# mvk@ca.ibm.com - program to control a lego mindstorm rover wrapper 20180526
# wrapper for some fuctions
import curses,ev3, os,sys,time
ev3host = '00:16:53:48:d5:??'
myEV3 = '' #x ev3.EV3(protocol=ev3.BLUETOOTH,host=ev3host)
def init()-> None:
	global myEV3, ev3host
	try:
		if len(os.environ["EV3"]) < 12:
	   		print ("ERROR EV3 var not set - please use>>> export EV3='Your EV3 Bluetooth MAC Address'")
	   		exit();
		else:
		    ev3host = str(os.environ["EV3"])
		    myEV3 = ev3.EV3(protocol=ev3.BLUETOOTH,host=ev3host)
	except:
	    print ("ERROR EV3 something is wrong EV3 is offline or so")
	    print("Unexpected error:", sys.exc_info()[0])
	    exit()

speed = 0
turn  = 0
#ev3host = str(os.environ["EV3"])
#myEV3 = ev3.EV3(protocol=ev3.BLUETOOTH,host=ev3host)
def rename(name : str) -> None:
    global myEV3
#    myEV3.verbosity = 1
    ops = b''.join([
        ev3.opCom_Set,
        ev3.SET_BRICKNAME,
        ev3.LCS(name)
    ])
    myEV3.send_direct_cmd(ops)

def playsound() -> None:
    global myEV3
    ops = b''.join([
    ev3.opSound,
    ev3.PLAY,
    ev3.LCX(100),                  # VOLUME
    ev3.LCS('./ui/DownloadSucces') # NAME
    ])
    myEV3.send_direct_cmd(ops)

def ledgreen() -> None:
    global myEV3
    ops = b''.join([
    ev3.opUI_Write,
    ev3.LED,
    ev3.LED_GREEN,
    ev3.opSound,
    ev3.BREAK
    ])
    myEV3.send_direct_cmd(ops)

def ledred() -> None:
    global myEV3
    ops = b''.join([
    ev3.opUI_Write,
    ev3.LED,
    ev3.LED_RED,
    ev3.opSound,
    ev3.BREAK
    ])
    myEV3.send_direct_cmd(ops)

def ledoff() -> None:
    global myEV3
    ops = b''.join([
    ev3.opUI_Write,
    ev3.LED,
    ev3.LED_OFF,
    ev3.opSound,
    ev3.BREAK
    ])
    myEV3.send_direct_cmd(ops)

def ledredflash() -> None:
    global myEV3
    ops = b''.join([
    ev3.opUI_Write,
    ev3.LED,
    ev3.LED_RED_FLASH,
    ev3.opSound,
    ev3.BREAK
    ])
    myEV3.send_direct_cmd(ops)
def ledgreenflash() -> None:
    global myEV3
    ops = b''.join([
    ev3.opUI_Write,
    ev3.LED,
    ev3.LED_GREEN_FLASH,
    ev3.opSound,
    ev3.BREAK
    ])
    myEV3.send_direct_cmd(ops)

def move(speed: int, turn: int) -> None:
    global myEV3, stdscr
    if speed > 50:
        spedd = 50
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
