from skills import *
from variables import *
from mqtt_broker import *
from state_machine import *
from generic import *

def function_0(mqttSpeaker, abc):
    #print("FINALLY!", abc)
    print(abc)

def function_1(mqttSpeaker, abc):
    #print("FINALLY111111!", abc)
    print(abc)

def function_2(mqttSpeaker, abc):
    #print("Function 2 executed!", abc)
    print(abc)

def spot_ready_signal(mqttSpeaker, abc):
    #print("Function 3 executed!", abc)
    print(abc)
    if state_db and SPOT_settings:
        mqttSpeaker.publishMessage("WE ARE READY TO GO!")

def load_state_db(mqttSpeaker, abc):
    #print("Function 5 executed!", abc)
    global state_db
    state_db = abc
    print("STATE DB: ", abc)

def load_SPOT_settings(mqttSpeaker, abc):
    #print("Function 4 executed!", abc)
    global SPOT_settings
    SPOT_settings = abc
    print("SPOT SETTINGS: ", abc)
    print("LET'S LOOK HERE: ", state_db)
    my_state_machine = StateMachine(state_db)

    my_state_machine.initialize_machine()

    my_state_machine.execute_machine()