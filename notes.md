Next Steps
* animation loop
  * 
* amplify setup


* Step - describes a step to take
    * strideType
    * stepType
    * direction
    * dR
    * dX
    * dY
* State - describes the current or initial state of a marcher
* Steps are used to modify state
* Script is a set of Steps that a marcher will take
    * simple object keyed by count
    * if no step at given count, previous step is repeated
* ScriptBuilder is a wrapper that provides methods for manipulating a script
* ScriptInterpreter takes a "script" and modifies state
* StepInterpreter applies changes to state for a given step
* new marcher structure
    * script
        * initialState
        * currentState
        * steps

{
    script: {
        initialState: {

        },
        currentState: {

        },
        steps: {
            "1": {

            }
        }
    }
}


