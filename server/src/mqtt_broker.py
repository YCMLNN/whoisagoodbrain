import subprocess
import paho.mqtt.client as mqtt

### METHODS ###

def startMosquitto():
    # Start the Mosquitto broker
    print("ONE!")
    mosquitto_process = subprocess.Popen(["mosquitto"])
    print("TWO!")

class MQTT_Topic():
    def __init__(self, topic_name):
        self.topic_name = topic_name
        self.client = mqtt.Client()
        self.client.connect("localhost", 1883) # Connect to the broker
        #self.client.subscribe(self.topic_name) # Subscribe to the topic
        #self.client.publish(self.topic_name, self.topic_name + " initialized.") # Publish a message to the topic
        self.client.on_message = self.on_message_callback
        self.client.on_disconnect = self.on_disconnect

    def on_message_callback(self, client, userdata, message):
        print(message.topic + " - " + str(message.payload.decode("utf-8")))
        pass

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
    
    # client.loop_forever()


### PARAMETERS ###

### MQTT TOPICS ###
state_topic = "STATE_TPC"
FLWC_settings_topic = "FLWC_SETTINGS_TPC"
SPOT_settings_topic = "SPOT_SETTINGS_TPC"
FLWC_buffer_topic = "FLWC_BUFFER_TPC"
SPOT_buffer_topic = "SPOT_BUFFER_TPC"