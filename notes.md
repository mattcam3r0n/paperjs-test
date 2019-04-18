Next Steps
* rough out views and header transitions
* where should playback controls go?  eg, step forward, back, beginning etc.
  * flyout?  seems awkward
  * button bar below or above field?
* spinner for long ops
* notification system for feedback
* add storage
    * what buckets are needed?
        * drills (protected)
        * videos (public read-only?)
        * music (protected)
        * or can i use one bucket for drills and music, with a path?
            * /protected/{user}/drills
            * /protected/{user}/music
    * where does this logic go? drillState? or designViewState?
        * designViewState is mainly concerned with managing tools
        * drillState with managing drills
        * load/save
        * current drill
        * current drill count?
    * save/load drill in s3
      * straight json for now
    * rest api?
      * store drill record associated with object in s3
        * for searching, etc
        * ideally, the s3 storage event would trigger creation/update of this record, but will do manually for now
      * store user prefs (in dynamo or cognito)?
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
* add analytics
    * track user actions. which maneuvers, etc.
* routing
  * Home 
    * prompts for login if not authenticated
    * if authenticated, show recent drills, new drill link, help info, etc
    * Header shows links to Help, Admin (if admin)
  * Design
    * only accessible if authenticated
    * Header shows File/Edit/Help menus (maybe Admin)
  * Admin
    * user list
    * can i query pinpoint analytics? or just use aws dashboard?
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


