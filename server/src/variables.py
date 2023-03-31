import json
from generic import *

### MQTT TOPICS ###
state_topic = "STATE_TPC"
FLWC_settings_topic = "FLWC_SETTINGS_TPC"
SPOT_settings_topic = "SPOT_SETTINGS_TPC"
FLWC_buffer_topic = "FLWC_BUFFER_TPC"
SPOT_buffer_topic = "SPOT_BUFFER_TPC"

### JSONS ###
state_db = read_json_file("data/M_db.json")
FLWC_settings = read_json_file("data/M_FLWC_settings.json")
SPOT_settings = read_json_file("data/M_SPOT_settings.json")

payload1 = {
    "commandID": "000",
    "message": json.dumps(state_db)
}
payload2 = {
    "commandID": "001",
    "message": json.dumps(SPOT_settings)
}

command_mapping = {
'00X': ""
}

