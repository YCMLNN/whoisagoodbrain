from skills import *
from variables import *
from mqtt_broker import *
from state_machine import *
from generic import *

class StateMachine:
    """
    This class implements a state machine that can execute a series of states based on the state diagram provided.
    """
    def __init__(self, state_diagram):
        print("INIT!")
        self.state_diagram = state_diagram
        self.start_state_usi = None
        self.cursor = None

    def initialize_machine(self):
        """
        This function initializes the state machine by finding the start state and setting the cursor on it.
        """
        print("INITIALIZE MACHINE!")
        print(type(self.state_diagram))
        print([usi for usi in self.state_diagram])
        self.start_state_usi = [usi for usi in self.state_diagram if self.state_diagram[usi]["ID"] == 0][0]
        print("FOUND STARTING STATE USI: ", self.start_state_usi)
        self.cursor = self.state_diagram[self.start_state_usi]
        print("THE CURSOR IS ON: ", self.cursor["name"])

    def execute_machine(self):
        """
        This function executes the state machine by calling the `state_chain_execution` function.
        """
        print("EXECUTE MACHINE!")
        if self.cursor:
            print("The state function of the start state will be executed.")
            self.state_chain_execution(state=self.cursor)
        else:
            print("The cursor is not set on the start state.")

    def state_chain_execution(self, state):
        print("CHAIN EXECUTION!")
        """
        This function executes the state chain by calling the state function and setting the next state.
        """
        print("Entering: " + state["name"])
        self.cursor = state
        output = eval(state["stateFunction"], globals())(self.cursor["name"])
        print(output)
        if state["nextState"]:
            next_state = state["nextState"][str(output)]
            print("next state: yes or no? ", next_state)
            self.state_chain_execution(state=self.state_diagram[next_state])

def samplefunc(content):
    print("THIS IS A SAMPLE FUNC: " + content)
    return 1

def samplefunc2(content):
    print("THIS IS A SAMPLE FUNC2: " + content)
    return 0