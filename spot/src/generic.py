import json
from skills import *
from variables import *
from mqtt_broker import *
from state_machine import *
from generic import *

### METHODS ###

def read_json_file(file_path):
    with open(file_path, "r") as file:
        data = json.load(file)
    return data