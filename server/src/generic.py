import json

### METHODS ###

def read_json_file(file_path):
    with open(file_path, "r") as file:
        data = json.load(file)
    return data

### PARAMETERS ###

### JSONS ###
state_db = read_json_file("data/M_db.json")
FLWC_settings = read_json_file("data/M_FLWC_settings.json")
SPOT_settings = read_json_file("data/M_SPOT_settings.json")

