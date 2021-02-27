var MANDALA_LEVEL = view.size.width/2;
var BASE_ROTATION = 30;
var SEGMENT_LIMIT = 2000;
var MOUSE_AMP = 5;
var CURSOR_RATE = 0.5;
var MANDALA_LIMIT = view.size.width;

var frame = 0;
var mouseDelta = 0;

var dir = 1;
var kill_rate = 5;

var start = new Point(view.size.width/2, 0);
var cursor = start.clone();

var rect = new Path.Rectangle({
    point: [0, 0],
    size: [view.size.width, view.size.height],
    fillColor: {
        gradient: {
            stops: ['#f12711', '#f5af19']            
        },
        origin: new Point(view.size.width/2,0),
        destination: new Point(view.size.width/2,view.size.height)
    },
});
rect.sendToBack();

var path = new Path();
path.strokeColor = '#fff';
path.strokeWidth = 1;
path.dashArray = [50, 100];

function onMouseMove(event) {
    mouseDelta = event.delta.length*MOUSE_AMP;
}

function onFrame(event) {
    frame++;
    path.rotate(BASE_ROTATION + mouseDelta);
    path.scale(0.999);
    cursor.x += CURSOR_RATE*dir;
    if (cursor.x > start.x + MANDALA_LIMIT) {
        dir = -1;
    }
    if (cursor.x < start.x - MANDALA_LIMIT) {
        dir = 1;
    }
    if (path.segments.length > SEGMENT_LIMIT) {
        kill_rate = 1;
    }
    path.add(cursor.x,MANDALA_LEVEL);
    if (frame % kill_rate == 0) path.segments[0].remove();
    path.smooth();
    mouseDelta = 0;
    path.position.x = view.size.width/2;
    path.position.y = MANDALA_LEVEL;
}

