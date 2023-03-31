from skills import *
from skills import function_0, load_state_db, load_SPOT_settings, spot_ready_signal
from variables import *
from mqtt_broker import *
from state_machine import *
from generic import *

state_topic = "STATE_TPC"
SPOT_settings_topic = "SPOT_SETTINGS_TPC"

state_db = None
SPOT_settings = None
command_mapping = None

command_mapping = {
'000': load_state_db,
'001': load_SPOT_settings,
'002': spot_ready_signal,
'003': function_0,
'004': function_0,
'005': function_0
}

payload1 = {
    "commandID": "00X",
    "message": "START!"
}