import json
import paho.mqtt.client as mqtt
import threading
from src.skills import *
from src.variables import *
from src.mqtt_broker import *
from src.state_machine import *
from src.generic import *

### SCRIPT ###

state_client = MQTT_Speaker(state_topic)
SPOT_settings_client = MQTT_Speaker(SPOT_settings_topic)

# # Open the JSON file
# with open('db.json', 'r') as f:
#     # Load the JSON data into a variable
#     state_diagram = json.load(f)

# my_state_machine = StateMachine(state_diagram)

# my_state_machine.initialize_machine()

# my_state_machine.execute_machine()

# state_client.client.loop_forever()
# SPOT_settings_client.client.loop_forever()

thread1 = threading.Thread(target=state_client.client.loop_forever)
#thread2 = threading.Thread(target=SPOT_settings_client.client.loop_forever)

thread1.start()
#thread2.start()