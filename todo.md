TODO

General
* figure out multiple paperscopes...
    * in particular, how to handle multiple tools
    * may need to create and store paperscopes in appState or fieldState 
    * so they can be passed to tools, field painter, etc
* rename project, locally and on github.  precision-2?
* refactor appState into separate, smaller stores
    * appState
        * logged in, user, etc.
    * designState
        * active tool, etc
    * fieldState?
        * show logo, grid, etc
* draw field on separate layer
    * is hit detection per layer?

Serverless
* set up serverless framework
    * host in aws
* set up authentication
* set up drill and music buckets

General UI
* Menu bar
* Routing
* tool palette base component
* flyout button menu component
* communication among tool windows, design surface
* zoom tool
    * click to zoom in/out, try to keep click point in view
    * zoom to band?
    * zoom to fit
    * pan tool
* timeline component
    * custom? paper js? 
    * show counts and/or time (or show time on hover?)
    * how to show bookmarks and music?
* sourcemap-like feature for timeline, showing where turns are? music? bookmarks?
    * acts as a scrollbar too. drag active portion to scroll.
    * hover over count, show shadows on field
    * click or dbl click to jump there

Selection
* rectangular selection
* irregular (polygon) selection
* multiple selection?
* merge selections?
* selection mode
    * how to differentiate individual mode, files, ranks, blocks, etc.

Editing
* Path tool
* Follow line tool 
    * draw a line thru members, they will follow line
* Turn editing 
    * show next turns on field
    * hover over turn marker to see which members turn there
    * allow deleting or moving of turn markers
* Add marchers tool
    * block, triangle, diamond, chevron

Testing
* choose and set up a testing framework
* investigate component testing