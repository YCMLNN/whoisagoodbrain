import json

class STATE_MACHINE():
    def __init__(self, STATE_DIAGRAM):
        self.STATE_DIAGRAM = STATE_DIAGRAM
        self.START_STATE_USI = None
        self.CURSOR = None

    def INITIALIZE_MACHINE(self):
        self.START_STATE_USI = [USI for USI in self.STATE_DIAGRAM if self.STATE_DIAGRAM[USI]["ID"] == 0][0]
        print("FOUND STARTING STATE USI: ", self.START_STATE_USI)
        self.CURSOR = self.STATE_DIAGRAM[self.START_STATE_USI]
        print("THE CURSOR IS ON: ", self.CURSOR)

    def EXECUTE_MACHINE(self):
        if self.CURSOR != None:
            print("The state function of the start state will be executed.")
            #globals()[self.CURSOR["stateFunction"]]() This line and the next one are alternative
            self.STATE_CHAIN_EXECUTION(state = self.CURSOR)
        else:
            print("The cursor is not set on the start state.")

    def STATE_CHAIN_EXECUTION(self, state):
        print("Entering: " + state["name"])
        # output = eval(state["stateFunction"], globals())(state["name"]) # This line executes the stateFunction by calling a string with the same name of the function
        output = eval(state["stateFunction"], globals())(self.CURSOR)
        print(output)
        nextState = state["nextState"][str(output)]
        self.STATE_CHAIN_EXECUTION(state = self.STATE_DIAGRAM[nextState])



def samplefunc(content):
    print("THIS IS A SAMPLE FUNC." + content)
    return 1

def samplefunc2(content):
    print("THIS IS A SAMPLE FUNC222222222222222." + content)
    return 0

    

# Open the JSON file
with open('db.json', 'r') as f:
    # Load the JSON data into a variable
    STATE_DIAGRAM = json.load(f)

# # Print the contents of the file
# print("########### THE FOLLOWING STATE DIAGRAM HAS BEEN LOADED: \n")
# print(STATE_DIAGRAM)

# type(STATE_DIAGRAM)

# for (key, value) in STATE_DIAGRAM.items():
#     print(STATE_DIAGRAM[key]["nextState"])

# result = [key for key in STATE_DIAGRAM if STATE_DIAGRAM[key]["ID"] == 1][0]
# print(result)

mystatemachine = STATE_MACHINE(STATE_DIAGRAM)

mystatemachine.INITIALIZE_MACHINE()

mystatemachine.EXECUTE_MACHINE()