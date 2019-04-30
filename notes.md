Next Steps
* editing
    * step palette
    * keyboard handler for adding steps, stepping thru drill
    * maneuvers palette
    * delete-to-beginning - makes current count the new starting point
    * delete-to-end
* convert zoom flyout to palette
  * 
* add marchers
    * different shapes
* add analytics
    * track user actions. which maneuvers, etc.
* logging
  * modify lambda to send to papertrail?
  * batch logging to reduce calls?
* make drillcards more uniform
  * Admin
    * user list
    * can i query pinpoint analytics? or just use aws dashboard?
* where should playback controls go?  eg, step forward, back, beginning etc.
  * flyout?  seems awkward
  * button bar below or above field?
* API
    * model
        * Drill
            * Id
            * Name
            * Description
            * Owner
            * 
    * drills
        * get by id
        * list by user
        * delete by id
        * list all (for admins)
        
    * music
    * userProfile
* Do I create Drill, Marcher, Script, Step classes?
    * would need to serialize/deserialize drill to pure json on save/load
    * 
* timeline
* marcher colors
* music
* zoom palette?
* marchers palette? or go with flyout?
* settings
    * field customization
        * color scheme
        * line/number intensity
        * graph paper mode
        * logo
        * default color pickers to current settings (or defaults)
        * themes? default, graph, light, dark


Stores / Services
* appState - app-wide state, like authenticated, etc
* drillStore - user's drills
* designService (drillEditorService) - logic related to drill editing
* uiStore - ui info?
* fieldStore - field related info? field dimensions, sizing, etc

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


