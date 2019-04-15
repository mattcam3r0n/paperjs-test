Next Steps
* where should playback controls go?  eg, step forward, back, beginning etc.
  * flyout?  seems awkward
  * button bar below or above field?
* add storage
    * save/load drill in s3
      * straight json for now
    * rest api?
      * store drill record associated with object in s3
        * for searching, etc
        * ideally, the s3 storage event would trigger creation/update of this record, but will do manually for now
      * store user prefs (in dynamo or cognito)?
* add analytics
    * track user actions. which maneuvers, etc.
* routing
  * design view should be authenticated
  * admin dashboard
    * can i query pinpoint analytics? or just use aws dashboard?
  * menu bar should adapt to appropriate view
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


