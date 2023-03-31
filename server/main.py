from src.mqtt_broker import *
from src.generic import *
from src.variables import *

### SCRIPT ###
startMosquitto()

### MQTT CLIENTS ###
state_client = MQTT_Topic(state_topic)
FLWC_settings_client = MQTT_Topic(FLWC_settings_topic)
SPOT_settings_client = MQTT_Topic(SPOT_settings_topic)

state_client.start()
FLWC_settings_client.start()
SPOT_settings_client.start()

# payload = {
#     "commandID": "000",
#     "message": "UELLAAAAAAAAAAAAAAAAA"
# }
 
# state_client.client.publish("STATE_TPC", json.dumps(payload), qos=1)



# actual_message = "{'command':'000', 'message': %s}" % json.dumps(state_db)
state_client.publishMessage(json.dumps(payload1))
state_client.publishMessage(json.dumps(payload2))
#FLWC_settings_client.publishMessage("{'command':'0'}", json.dumps(FLWC_settings))
#SPOT_settings_client.publishMessage("{'command':'0'}", json.dumps(SPOT_settings))

# state_client.client.disconnect()
# FLWC_settings_client.client.disconnect()
# SPOT_settings_client.client.disconnect()

### MQTT CLIENTS ###
FLWC_buffer_client = MQTT_Topic(FLWC_buffer_topic)
SPOT_buffer_client = MQTT_Topic(SPOT_buffer_topic)

FLWC_buffer_client.start()
SPOT_buffer_client.start()

# FLWC_buffer_client.client.disconnect()
# SPOT_buffer_client.client.disconnect()

"""
mosquitto_sub -h localhost -p 1883 -t STATE_TPC
mosquitto_sub -h localhost -p 1883 -t FLWC_SETTINGS_TPC
mosquitto_sub -h localhost -p 1883 -t SPOT_SETTINGS_TPC
mosquitto_sub -h localhost -p 1883 -t FLWC_BUFFER_TPC
mosquitto_sub -h localhost -p 1883 -t SPOT_BUFFER_TPC
"""