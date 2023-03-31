import json
import paho.mqtt.client as mqtt
from skills import *
from variables import command_mapping
from mqtt_broker import *
from state_machine import *
from generic import *

# state_topic = "STATE_TPC"
# SPOT_settings_topic = "SPOT_SETTINGS_TPC"

# state_db = None
# SPOT_settings = None
# command_mapping = None

# # msg = '''
# # {
# # "type": "statelist"
# # }
# # '''

# # message_obj = json.loads(msg)
# # message_obj["type"]

# command_mapping = {
# '000': load_state_db,
# '001': load_SPOT_settings,
# '002': spot_ready_signal,
# '003': function_0,
# '004': function_0,
# '005': function_0
# }

class MQTT_Speaker():
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
                decoded_message = json.loads(myjson["message"])
                command_mapping[commandID](self, decoded_message)
        #received_msg = json.loads(str(message.payload))
        #print("RECEIVED MESSAGE: " + str(received_msg))

    def on_disconnect(client, userdata, rc):
        print("Disconnected from broker with result code:", rc)
        # If the disconnection was not intentional, attempt to reconnect
        if rc != 0:
            client.reconnect()

    def publishMessage(self, content):
        full_message = str(content) + "\n"
        self.client.publish(self.topic_name, full_message, qos=1)

    def start(self):
        self.client.loop_start()