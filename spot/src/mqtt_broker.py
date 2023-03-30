import json
import paho.mqtt.client as mqtt
import threading
from .state_machine import *

state_topic = "STATE_TPC"
SPOT_settings_topic = "SPOT_SETTINGS_TPC"

state_db = None
SPOT_settings = None

# msg = '''
# {
# "type": "statelist"
# }
# '''

# message_obj = json.loads(msg)
# message_obj["type"]

def function_0(abc):
    #print("FINALLY!", abc)
    print(abc)

def function_1(abc):
    #print("FINALLY111111!", abc)
    print(abc)

def function_2(abc):
    #print("Function 2 executed!", abc)
    print(abc)

def function_3(abc):
    #print("Function 3 executed!", abc)
    print(abc)

def load_state_db(abc):
    #print("Function 5 executed!", abc)
    global state_db
    state_db = abc
    print("STATE DB: ", abc)

def load_SPOT_settings(abc):
    #print("Function 4 executed!", abc)
    global SPOT_settings
    SPOT_settings = abc
    print("SPOT SETTINGS: ", abc)
    print("LET'S LOOK HERE: ", state_db)
    my_state_machine = StateMachine(state_db)

    my_state_machine.initialize_machine()

    my_state_machine.execute_machine()



command_mapping = {
'000': load_state_db,
'001': load_SPOT_settings,
'002': function_2,
'003': function_3,
'004': function_0,
'005': function_0
}

class MQTT_Topic():
    def __init__(self, topic_name):
        self.topic_name = topic_name
        self.client = mqtt.Client()
        self.client.connect("localhost", 1883) # Connect to the broker
        self.client.subscribe(self.topic_name) # Subscribe to the topic
        # self.client.publish(self.topic_name, self.topic_name + " initialized.") # Publish a message to the topic
        self.client.on_message = self.on_message_callback
        self.client.on_disconnect = self.on_disconnect

    def on_message_callback(self, client, userdata, message):
        print(message.topic) #+ " - " + str(message.payload.decode()), .decode("utf-8")
        # print(message.payload)
        #print("MESSAGE LENGTH: ", len(message.payload.decode("utf-8")))
        #print("JSON PROBLEMS")
        myjson = json.loads(message.payload)
        print(type(myjson))
        #print("UEEEEEEEEEEEE")
        #print(type(myjson))
        if "commandID" in myjson.keys():
            #print("UE BELLO")
            #print("COMMAND ID: ", myjson["commandID"], "MESSAGE: ", myjson["message"])
            # print(myjson["command"])
            print(type(myjson["commandID"]))
            print(type(json.loads(myjson["message"])))
            commandID = myjson["commandID"]
            if commandID in command_mapping.keys():
                command_mapping[commandID](json.loads(myjson["message"]))
        #received_msg = json.loads(str(message.payload))
        #print("RECEIVED MESSAGE: " + str(received_msg))

    def on_disconnect(client, userdata, rc):
        print("Disconnected from broker with result code:", rc)
        # If the disconnection was not intentional, attempt to reconnect
        if rc != 0:
            client.reconnect()

    # def publishMessage(self, contentID, content):
    #     full_message = "### " + contentID + " ### : \n" + str(content)
    #     self.client.publish(self.topic_name, full_message, qos=1)

    def start(self):
        self.client.loop_start()