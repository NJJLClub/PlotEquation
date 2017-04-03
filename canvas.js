function init() {
  window.requestAnimationFrame(draw);
}

/*
    This draw() function is for 2D Canvas operations.
*/

/*
** Define some global variables
*/

var dx = 0;
var dy = 0;

var vx = 1;
var vxmag = 1;

var vy = 1;
var vymag = 1;

var angle = 0.0;
var vangle = 5 * 0.0174533; // 1 degree in radians

var globalClearScreen = true;
var globalDoStroke = true;    // stroke outline, or fill area
var globalStrokeColor = '#ff0000';
var globalRadius = 10.0;

var colors = { "red":'#ff0000', "green":'#00ff00', "blue":'#0000ff' };

/*
** Define the various callback functions
*/

function plusvx(amount) {
    vx = vx + amount;
    $("label[id=vx]").html( vx );
}

function plusvy(amount) {
    vy = vy + amount;
    $("label[id=vy]").html( vy  );
}

function plusAngleDegree(amount) {
    vangle = vangle + amount * 0.0174533 ;
    $("label[id=degree]").html( Math.ceil( vangle/ 0.0174533));
}

function clearScreen() {
    globalClearScreen = true;
}

function colorChanged() {
    
    var tocolor = $("#selectColor").val();
    var rgb = colors[tocolor];
    globalStrokeColor = rgb;

}

function plusRadius(amount) {
    globalRadius += amount;
    $("label[id=radius]").html( globalRadius  );
}


/*
** The main starting point of the program
*/

function app() {
    $("label[id=vx]").html( vx );
    $("label[id=vy]").html( vy );
    $("label[id=degree]").html( vangle / 0.0174533);
    $("label[id=radius]").html(  globalRadius);
    draw();
}


/*
** The canvas drawing function
*/

function draw() {
    var canvas2d;
    var xd = [-1, 1,  1, -1];
    var yd = [-1, -1,  1, 1];    
    var x ;
    var y ;
    var height;
    var width;
    var radius;
    
    dx = dx + vx * vxmag;
    dy = dy + vy * vymag;
    
    angle = angle + vangle;
    
    height = 50; // height of object
    width = 50; // width of object
  
    
    if ( (dx+width) > 640 || dx < 0) {
        vxmag = -1 * vxmag;
        dx = dx + (vx * vxmag);
    }
    if ( (dy+height) > 480 || dy < 0) {
        vymag = vymag * -1;
        dy = dy + vy * vymag ;
    }
    
    canvas2d = document.getElementById('mycanvas');
    if (canvas2d.getContext) {
        
        var ctx = canvas2d.getContext('2d');
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.strokeStyle = globalStrokeColor ; //rgb(200,0,0)";
       
        ctx.beginPath();
        
        x = xd[0] * Math.sin(angle) * globalRadius + dx;
        y = yd[0] * Math.cos(angle) * globalRadius + dy;
        
        ctx.moveTo(x,y);
              
        for (var i=1; i<=xd.length -1; i++) {
            
            x = xd[i] * Math.sin(angle) * globalRadius + dx ;
            y = yd[i] * Math.cos(angle) * globalRadius + dy ;
            
            ctx.lineTo( x, y);
        }
        
        ctx.closePath();
        
        
        if ( globalClearScreen ) {
            ctx.clearRect(0,0,640,480); // clear canvas
            globalClearScreen = false;
        }
        
        if ( globalDoStroke ) {
            ctx.stroke();
            
        } else {
            ctx.fill();
        }
    
        window.requestAnimationFrame(draw);
        
    } else {
        alert("Unable to grab mycanvas handle.");
    }
}
