var sketchProc=function(processingInstance){ with (processingInstance){
size(400, 400); 
frameRate(60);


///////////////////////////////////////
// Jinwoo Yom
// 12.11.15
// The Virtual Pool
//
// Play a game of 8 ball on a computer!
// This uses realistic physics to deliver
// you a fun and positive gaming expirience!
//////////////////////////////////////

angleMode = "radians";
//angles
var ninetyDeg = TWO_PI / 4;
var points = [];
var points2 = [];
var points3 = [];
var ready = false;
var poolstickNum;    // which stick to use
var tableNum = 8;       // which table to use
var a=random(300,1500);     // variable for parlin sky
var clickedX;           // used in mouse control
var clickedY;
var customCharMade = 0;
var newAngle;           // used in poolstick draw
var aming = true;       // determinds when you are aming
var offset = 0;         // pool stick's offset from the ball
var start = 7;          // game states
var images = [];
var dragCo = 0.1; 
var legalBallPlacement = true;
var startingOut = true;
var firstHit = false;
var gotoStateAfterPocketPicking = 0;
var gameOver = 2;
var showPlayerBallType= false;
var loadingHit = false;
var commentWhilePlaying = "Drag your mouse to hit the cue ball";

var midPoint = function(a, b) {
    var m = new PVector((a.x + b.x)/2, (a.y+b.y)/2);
    return m;
};

var clearPoints = function(p) {
    p.splice(0, p.length);
};

var drawShape = function(p) {
    //fill(255, 0, 0);
    beginShape();
        for (var i=0; i<p.length; i++) {
            vertex(p[i].x, p[i].y);
        }
    endShape();
};

// Split result in p2
var splitPoints = function(p1, p2) {
    clearPoints(p2);
    p2.push(p1[0]);
    for (var i = 0; i<p1.length-2; i++) {
        var m = midPoint(p1[i], p1[i+1]);
        p2.push(m);
        p2.push(p1[i+1]);
    }

    var m = midPoint(p1[i], p1[0]);
    p2.push(m);
    p2.push(points[0]);
};

// average
var averagePoints = function(p1, p2) {
    p2.splice(0, p2.length);
    for (var i = 0; i <p1.length-2; i++) {
        p2.push(midPoint(p1[i], p1[i+1]));
    }
    p2.push(midPoint(p1[i], p1[0]));
    p2.push(p2[0]);
};

//art
var customChar = function()
{
    customCharMade = 1;
    
    //Cue ball
    background(0, 0, 0, 0);
    noStroke();
    fill(231, 237, 199);
    ellipse(200,200,400,400);

    images.push(get(0,0,width,height)); //0
    
 
    //Solid ball
     background(0, 0, 0, 0);
    noStroke();
    fill(107, 107, 107);
    ellipse(200,200,400,400);   //ball
    
    images.push(get(0,0,width,height)); //1
    
    //ball 8
    background(0, 0, 0, 0);
    noStroke();
    fill(0, 0, 0);
    ellipse(200,200,400,400);   //ball
    fill(255, 255, 255);
    textSize(390);
    text("8",95,340);
    
    images.push(get(0,0,width,height)); //2
    
    //Striped ball
    background(0, 0, 0, 0);
    noStroke();
    fill(107, 107, 107);
    ellipse(200,200,400,400);   //ball
    fill(163, 245, 0);
    rect(26,100,347,200);
    arc(29,200,30,200,90,270);//left side
    arc(27,200,45,180,90,270);
    arc(20,200,40,129,90,270);
    arc(373,200,52,170,-90,90);//right side
    arc(373,200,30,195,-90,90);
    
    images.push(get(0,0,width,height)); //3
    
    //pool stick 1
    background(0, 0, 0, 0);
    noStroke();
    fill(199, 152, 22);
    quad(195,0,205,0,210,400,190,400);
    fill(0, 0, 0);                      //cue
    quad(195,0,205,0,205,15,195,15);
    fill(158, 0, 0);                  //handle
    quad(193,200,207,200,210,400,190,400);
    fill(250, 146, 0);
    triangle(206,400,194,400,200,300);
    stroke(120, 78, 0);
    strokeWeight(7);
    line(196,200,203,200);

    
    images.push(get(0,0,width,height)); //4
    
    //pool stick 2
    background(0, 0, 0, 0);
    noStroke();
    fill(181, 127, 0);
    quad(195,0,205,0,210,400,190,400);
    fill(0, 0, 0);                      //cue
    quad(195,0,205,0,205,15,195,15);
    fill(51, 128, 0);                  //handle
    quad(193,200,207,200,210,400,190,400);
    fill(182, 237, 0);                  //decor
    triangle(206,400,194,400,200,300);
    stroke(124, 212, 0);
    strokeWeight(7);
    line(196,200,203,200);
    
    images.push(get(0,0,width,height)); //5
    
    //pool stick 3
    background(0, 0, 0, 0);
    noStroke();
    fill(199, 152, 22);
    quad(195,0,205,0,210,400,190,400);
    fill(0, 0, 0);                      //cue
    quad(195,0,205,0,205,15,195,15);
    fill(61, 92, 176);                  //handle
    quad(193,200,207,200,210,400,190,400);
    fill(131, 54, 143);
    triangle(206,400,194,400,200,300);
    stroke(133, 49, 166);
    strokeWeight(7);
    line(196,200,203,200);
    
    images.push(get(0,0,width,height)); //6
    
    //pool stick 4
    background(0, 0, 0, 0);
    noStroke();
    fill(199, 152, 22);
    quad(195,0,205,0,210,400,190,400);
    fill(0, 0, 0);                      //cue
    quad(195,0,205,0,205,15,195,15);
    fill(237, 76, 181);                  //handle
    quad(193,200,207,200,210,400,190,400);
    fill(98, 149, 237);
    triangle(206,400,194,400,200,300);
    stroke(2, 107, 199);
    strokeWeight(7);
    line(196,200,203,200);
    
    images.push(get(0,0,width,height)); //7
    
    //table 1
    background(0, 0, 0, 0);
    noStroke();
    fill(148, 96, 0);
    //coner wood
    ellipse(25,100,50,50);//left top
    ellipse(25,300,50,50);//left bottom
    ellipse(375,100,50,50);//right top
    ellipse(375,300,50,50);//right bottom
    //edge wood
    rect(25,75,350,25);     //top
    rect(25,300,350,25);    //bottom
    rect(0,100,25,200);     //left
    rect(375,100,25,200);   //right
    //arrows
    noStroke();
    fill(0, 0, 0);
    triangle(110,88,115,88,112.5,94);       //LC top
    triangle(110,312,115,312,112.5,306);    //LC bottom
    ellipse(68.75, 91, 5, 5);               //LL-top
    ellipse(156.25, 91, 5, 5);              //LR-top
    ellipse(68.75, 309, 5, 5);              //LL-bottom
    ellipse(156.25,309, 5, 5);              //LR-bottom
    
    triangle(285,88,290,88,287.5,94);       //RC top
    triangle(285,312,290,312,287.5,306);    //RC bottom
    ellipse(243.75, 91, 5, 5);              //RL-top
    ellipse(331.25, 91, 5, 5);              //RR-top
    ellipse(243.75, 309, 5, 5);             //RL-bottom
    ellipse(331.25,309, 5, 5);              //RR-bottom
    //carpet
    stroke(0, 0, 0);
    strokeWeight(3);
    fill(41, 207, 8);
    rect(25,100,350,200);
    //shoot line
    stroke(255, 255, 255,90);
    strokeWeight(4);
    line(112.5, 102, 112.5, 298);
    //sticker
    noStroke();
    fill(255, 255, 255,150);
    ellipse(287.5, 200, 7,7);
    fill(0, 0, 0);
    ellipse(287.5, 200, 3,3);
    //holes
    fill(74, 50, 36);
    ellipse(25,100,30,30);//left top
    ellipse(25,300,30,30);//left bottom
    ellipse(375,100,30,30);//right top
    ellipse(375,300,30,30);//right bottom
    ellipse(200,100,30,30);//top
    ellipse(200,300,30,30);//bottom
    //decor
    noFill();
    stroke(0, 0, 0);
    strokeWeight(3);
    ellipse(200,200,100,100);
    fill(0, 0, 0);
    textSize(50);
    text("JW",160,180,50,50);
    
    images.push(get(0,0,width,height)); //8
    
    //table 2
    //carpet
    fill(210, 0, 0);
    rect(25,100,350,200);
    //shoot line
    stroke(255, 255, 255,90);
    strokeWeight(4);
    line(112.5, 102, 112.5, 298);
    //sticker
    noStroke();
    fill(255, 255, 255,150);
    ellipse(287.5, 200, 7,7);
    fill(0, 0, 0);
    ellipse(287.5, 200, 3,3);
    //holes
    fill(74, 50, 36);
    ellipse(25,100,30,30);//left top
    ellipse(25,300,30,30);//left bottom
    ellipse(375,100,30,30);//right top
    ellipse(375,300,30,30);//right bottom
    ellipse(200,100,30,30);//top
    ellipse(200,300,30,30);//bottom
    //decor
    noFill();
    stroke(0, 0, 0);
    strokeWeight(3);
    ellipse(200,200,100,100);
    fill(0, 0, 0);
    textSize(50);
    text("JW",160,180,50,50);
    
    images.push(get(0,0,width,height)); //9
    
    //table 3
    //carpet
    fill(189, 62, 176);
    rect(25,100,350,200);
    //shoot line
    stroke(255, 255, 255,90);
    strokeWeight(4);
    line(112.5, 102, 112.5, 298);
    //sticker
    noStroke();
    fill(255, 255, 255,150);
    ellipse(287.5, 200, 7,7);
    fill(0, 0, 0);
    ellipse(287.5, 200, 3,3);
    //holes
    fill(74, 50, 36);
    ellipse(25,100,30,30);//left top
    ellipse(25,300,30,30);//left bottom
    ellipse(375,100,30,30);//right top
    ellipse(375,300,30,30);//right bottom
    ellipse(200,100,30,30);//top
    ellipse(200,300,30,30);//bottom
    //decor
    noFill();
    stroke(0, 0, 0);
    strokeWeight(3);
    ellipse(200,200,100,100);
    fill(0, 0, 0);
    textSize(50);
    text("JW",160,180,50,50);
    
    images.push(get(0,0,width,height)); //10
    
    //button
    background(0, 0, 0, 0);
    points.push(new PVector(-10, 200));
    points.push(new PVector(40, 50));
    points.push(new PVector(200, 50));
    points.push(new PVector(360, 50));
    points.push(new PVector(410, 200));
    points.push(new PVector(360, 350));
    points.push(new PVector(200, 350));
    points.push(new PVector(40, 350));
    points.push(new PVector(-10, 200));
    splitPoints(points, points2);
    averagePoints(points2, points3);
    
    splitPoints(points3, points);
    averagePoints(points, points2);
    
    splitPoints(points2, points3);
    averagePoints(points3, points);
    fill(255, 0, 0);
    stroke(0, 0, 0);
    strokeWeight(10);
    drawShape(points);
    noStroke();
    //shades
    fill(255, 255, 255,30);
    ellipse(200,120,370,140);
    ellipse(200,110,340,120);
    ellipse(200,100,340,100);
    ellipse(200,90,300,70);
    
    fill(0, 0, 0,30);
    ellipse(200,300,340,100);
    ellipse(200,320,320,60);
    
    images.push(get(0,0,width,height)); //11
    
    //button shade
    background(0, 0, 0, 0);
    fill(0, 0, 0,130);
    noStroke();
    drawShape(points);
    
    images.push(get(0,0,width,height)); //12
};

// confetti object !
var explosionObj = function(a) {
    this.position = new PVector(0, 0);
    this.direction = new PVector(0, TWO_PI);
    this.size = random(1, 3);
    if (a === 0)
    {
        this.c1 = random(0, 250);
    }
    else
    {
        this.c1 = random(100, 255);
    }
    if (a === 1)
    {
        this.c2 = random(0, 250);
    }
    else
    {
        this.c2 = random(100, 255);
    }
    if (a === 3)
    {
        this.c3 = random(0, 250);
    }
    else
    {
        this.c3 = random(100, 255);
    }
    this.timer = 0;
};

//firework object
var fireworkObj = function(a)
{
    this.position = new PVector(200, 200);
    this.direction = new PVector(0, 0);
    this.target = new PVector(mouseX, mouseY);
    this.explosions = [];
    this.step = 0;
    for (var i = 0; i < 200; i++)
    {
        this.explosions.push(new explosionObj(a));
    }    
};

var firework = [new fireworkObj(0), new fireworkObj(1), new fireworkObj(2), new fireworkObj(4), new fireworkObj(0)];

fireworkObj.prototype.draw = function()
{
    fill(255, 255, 255);
    noStroke();
    ellipse(this.position.x, this.position.y, 2, 2);
    this.position.add(this.direction);

    if (dist(this.position.x, this.position.y, this.target.x, this.target.y) < 4)
    {
        this.step = 2;
        for (var i = 0; i < this.explosions.length; i++)
        {
            this.explosions[i].position.set(this.target.x, this.target.y);
            this.explosions[i].direction.set(random(0, 360), random(-0.3, 0.3));
            this.explosions[i].timer = 180;
        }
    }
};

// drawing fading confetties 
explosionObj.prototype.draw = function()
{
    fill(this.c1, this.c2, this.c3, this.timer);    // 4th value is a fader
    noStroke();
    ellipse(this.position.x, this.position.y, this.size, this.size);
    this.position.x += this.direction.y*cos(this.direction.x);
    this.position.y += this.direction.y*sin(this.direction.x);
    this.position.y += (90/(this.timer + 100));
    this.timer--;
};

//other functions
var closeToZero = function(x)   // checks if variable is almost 0
{
    return (x < 0.001 && x > -0.001);
};

//game states
var instructionState = function()
{
};

var optionsState = function()
{
};

var breakState = function()
{
};

var gameState = function()
{
};

var scratchState = function()
{
};

var pocketPickingState = function()
{
};

var gameOverState = function()
{
};

var loadingState = function()
{
};
// objects
var gameControllerObj = function()
{
    this.state = [new gameState(),new instructionState(), new optionsState(), new breakState(), new scratchState(), new pocketPickingState(), new gameOverState(),new loadingState()];
    this.currState = 7; //0-game 1-instruction 2-options 3-break 4-scratch 5-pocketPicking 6-gameOverState 7-loadingState
};

var ballObj = function(x,y,n)
{
    this.position = new PVector(x,y);
    this.velocity = new PVector(0,0);
    this.drag = new PVector(0,0);
    this.angle = 0;
    this.size = 15;
    this.mass = 3.5;
    this.num = n;
    this.alive = true;
    this.covered=false;
    this.dx = 0;
    this.dy = 0;
};

var pocketObj = function(x,y)
{
    this.x = x;
    this.y = y;
    this.selected = false;
};

var playerObj = function(n)
{
    this.numberOfWins = 0;
    this.playerNum = n;
    this.ballType = 0; // 0 -> not declared,  1 -> solid, 2 -> stripes
    this.stickType = 4+n;
    this.myTurn = false;
    this.continuePlaying = false;
    this.stopPlaying = false;
    this.fouled = false;
    this.lost = false;
    this.hasWon = false;
};

var poolStickObj = function(t)
{
    this.type = t;
    this.size = 150;
    this.show = true;
};

var cycleNum = 20;      // used for animations
var cycle = false;
//outputs
var instructionScreen = function()
{
    background(0, 89, 214);
    noStroke();
    var n1 = a;                      // perlin sky
    for (var x=0; x<=400; x+=8) {
        var n2 = 0;
        for (var y=0; y<=400; y+=8) {
            var c = map(noise(n1,n2),0,1,0,255);
            fill(c, c, c+140,150);
            rect(x,y,8,8);
            n2 += 0.05; // step size in noise
        }
        n1 += 0.02; // step size in noise
    }
    a -= 0.02;  // speed of clouds
    
    textFont(createFont("sans-serif"));
    fill(89, 40, 41);
    textSize(50);
    text("The Virtual Pool", 20, 65);
    fill(69, 69, 69);
    textSize(15);
    text("J  i  n  w  o  o    Y  o  m", 125, 90);
    stroke(69, 69, 69);
    line(50, 85, 110, 85);
    line(290, 85, 350, 85);
    var center = 20;
    for(var i = 1; i < 11; i++)             // display balls 1-10
    {
        if(i%2 === 0)
        {
            image( images[1], center , 105, 30, 30 );
        }
        else
        {
            image( images[3], center , 105, 30, 30 );
        }
        center+=35;
    }
    
    if(cycleNum<=335 && cycle)
    {
        cycleNum+=35;
        cycle = false;
        if(cycleNum > 335)
        {
            cycleNum = 20;
        }
    }
    if(cycleNum <= 335)
    {
        image( images[0], cycleNum , 105, 30, 30 );
    }
    
    textFont(createFont("sans-serif"));
    textSize(15);
    fill(0, 0, 0);
    text("-  This game follows the same rule as \n   a regular games of 8 ball", 70, 170);
    text("-  Drag and release your mouse to strike \n  the cue ball with a pool stick" ,70,215);
    text("-  Alternate between two players and be\n  the first player to win",70, 260);
    
    fill(39, 217, 26);
    image( images[11], 30 , 287, 150, 106 );     //start button
    image( images[11], 220 , 287, 150, 106 );    //options button
    
    textFont(createFont("fantasy"));
    textSize(35);
    fill(0, 0, 0);
    text("START",60,355);
    text("OPTIONS",235,355);
    
    if(mouseX > 30 && mouseX <180 && mouseY > 300 && mouseY <380) //start button fade
    {
        image( images[12], 30 , 287, 150, 106 );     //start button
    }
    if(mouseX > 220 && mouseX <370 && mouseY > 300 && mouseY <380) //options button fade
    {
        image( images[12], 220 , 287, 150, 106 );    //options button
    }
};

var poolStickPick = 65;     // stick and table pick initializations
var poolStickPick2 = 95;
var tablePick = 40;
var optionsScreen = function()
{
    noStroke();
    textFont(createFont("cursive"));
    background(105, 3, 3);
    fill(95, 133, 0);
    textSize(20);
    text("Choose your pool stick :", 20,30);
    fill(24, 255, 8);
    text("Player 1", 15,55);
    text("Player 2", 315,55);
    pushMatrix();
    rotate(ninetyDeg);
    image( images[4], -50, -330, 250,250);
    image( images[5], -20, -330, 250,250);
    image( images[6], 10, -330, 250,250);
    image( images[7], 40, -330, 250,250);
    popMatrix();
    image( images[8], 40 , 200, 100, 100 );
    image( images[9], 150 , 200, 100, 100 );
    image( images[10], 260 , 200, 100, 100 );
    fill(95, 133, 0);
    text("Choose your table :", 20,200);
    
    //poolstick select boxes
    fill(255, 255, 255);
    stroke(255, 0, 0);
    for(var xVar = 35; xVar < 400; xVar+= 320)
    {
        for(var yVar = 65; yVar < 180; yVar+=30)
        {
            rect(xVar,yVar, 20,20);
        }
    }
    noStroke();
    
    fill(0, 0, 0);
    rect(35,poolStickPick,20,20);    // pool stick choose box
    rect(355,poolStickPick2,20,20); 
    fill(255, 0, 0);
    ellipse(45,poolStickPick+10,10,10);
    ellipse(365,poolStickPick2+10,10,10);
    
    stroke(255, 0, 0);
    fill(130, 130, 130,130);
    rect(tablePick,215,100,70);    // table choose box
    
    fill(39, 217, 26);
    image( images[11], 30 , 287, 150, 106 );     //start button
    image( images[11], 220 , 287, 150, 106 );    //options button
    
    textFont(createFont("fantasy"));
    textSize(35);
    fill(0, 0, 0);
    text("START",60,355);
    text("BACK",255,355);
    
    if(mouseX > 30 && mouseX <180 && mouseY > 300 && mouseY <380) //start button fade
    {
        image( images[12], 30 , 287, 150, 106 );     //start button
    }
    if(mouseX > 220 && mouseX <370 && mouseY > 300 && mouseY <380) //options button fade
    {
        image( images[12], 220 , 287, 150, 106 );    //options button
    }
};

//instantiation of objects
var balls = [ new ballObj(112.5,240,0), new ballObj(287.5,240,1), new ballObj(287.5+((sqrt(sq(15)-sq(7.5)))*4),240+(7.5*4),1), new ballObj(287.5+((sqrt(sq(15)-sq(7.5)))*3),240+(7.5),1), new ballObj(287.5+((sqrt(sq(15)-sq(7.5)))*4),240,1), new ballObj(287.5+((sqrt(sq(15)-sq(7.5)))*2),240+(7.5*2),1), new ballObj(287.5+((sqrt(sq(15)-sq(7.5)))*3),240-(7.5*3),1), new ballObj(287.5+(sqrt(sq(15)-sq(7.5))),240-7.5,1), new ballObj(287.5+((sqrt(sq(15)-sq(7.5)))*2),240,2), new ballObj(287.5+((sqrt(sq(15)-sq(7.5)))*4),240-(7.5*2),3), new ballObj(287.5+(sqrt(sq(15)-sq(7.5))),240+7.5,3), new ballObj(287.5+((sqrt(sq(15)-sq(7.5)))*4),240-(7.5*4),3), new ballObj(287.5+((sqrt(sq(15)-sq(7.5)))*3),240+(7.5*3),3), new ballObj(287.5+((sqrt(sq(15)-sq(7.5)))*3),240-(7.5),3), new ballObj(287.5+((sqrt(sq(15)-sq(7.5)))*2),240-(7.5*2),3), new ballObj(287.5+((sqrt(sq(15)-sq(7.5)))*4),240+(7.5*2),3)
];
var poolstick = new poolStickObj(0);
var gameController = new gameControllerObj();
var players = [ new playerObj(0), new playerObj(1) ];
var dummyPlayer = new playerObj(1);
var pockets = [ new pocketObj(25,100), new pocketObj(200,100), new pocketObj(375,100), new pocketObj(25,300), new pocketObj(200,300), new pocketObj(375,300) ];

//mouse control
var mousePressed = function()
{
    if( (start ===0 && ready) || start === 7)              // in game use
    {
        clickedX = mouseX;
        clickedY = mouseY;
        aming = false;
    }
    else if(start === 1)        // for instruction screen use
    {
        if(mouseX > 30 && mouseX <180 && mouseY > 300 && mouseY <380)
        {
            start = 3;  //start button is pressed --> to the break state
        }
        if(mouseX > 220 && mouseX <370 && mouseY > 300 && mouseY <380)
        {
            start = 2;  //options button is pressed
        }
    }
    else if(start === 2)        // for options screen use
    {
        if(mouseX > 30 && mouseX <180 && mouseY > 300 && mouseY <380)
        {
            start = 3;  //start button is pressed --> to the break state
        }
        if(mouseX > 220 && mouseX <370 && mouseY > 300 && mouseY <380)
        {
            start = 1;  //back button is pressed
        }
        
        //player 1
        if(mouseX > 35 && mouseX <55 && mouseY > 65 && mouseY <85)
        {
            poolStickPick = 65;
            players[0].stickType =4;  //stick1 pressed -> player1
        }
        if(mouseX > 35 && mouseX <55 && mouseY > 95 && mouseY <115)
        {
            poolStickPick = 95;
            players[0].stickType =5;  //stick2 pressed -> player1
        }
        if(mouseX > 35 && mouseX <55 && mouseY > 125 && mouseY <145)
        {
            poolStickPick = 125;
            players[0].stickType =6;  //stick3 pressed -> player1
        }
        if(mouseX > 35 && mouseX <55 && mouseY > 155 && mouseY <175)
        {
            poolStickPick = 155;
            players[0].stickType =7;  //stick4 pressed- > player1
        }
        
        //player 2
        if(mouseX > 355 && mouseX <375 && mouseY > 65 && mouseY <85)
        {
            poolStickPick2 = 65;
            players[1].stickType =4;  //stick1 pressed -> player2
        }
        if(mouseX > 355 && mouseX <375 && mouseY > 95 && mouseY <115)
        {
            poolStickPick2 = 95;
            players[1].stickType =5;  //stick2 pressed -> player2
        }
        if(mouseX > 355 && mouseX <375 && mouseY > 125 && mouseY <145)
        {
            poolStickPick2 = 125;
            players[1].stickType =6;  //stick3 pressed -> player2
        }
        if(mouseX > 355 && mouseX <375 && mouseY > 155 && mouseY <175)
        {
            poolStickPick2 = 155;
            players[1].stickType =7;  //stick4 pressed- > player2
        }
        
        
        if(mouseX >40 && mouseX< 140 && mouseY > 215 && mouseY < 285)
        {
            tablePick = 40;
            tableNum=8; //table1 pressed
        }
        if(mouseX >150 && mouseX< 250 && mouseY > 215 && mouseY < 285)
        {
            tablePick = 150;
            tableNum=9; //table2 pressed
        }
        if(mouseX >260 && mouseX< 360 && mouseY > 215 && mouseY < 285)
        {
            tablePick = 260;
            tableNum=10; //table3 pressed
        }
    }
    else if(start === 3)        // for break state use
    {
        if(legalBallPlacement)
        {
            start = 0;
        }
    }
    else if(start === 4)        // for scratch state use
    {
        if(legalBallPlacement)
        {
            start = 0;
        }
    }
    else if(start === 5)        // for pocketPicking State use
    {
        if(legalBallPlacement)
        {
            start = gotoStateAfterPocketPicking;
        }
    }
    else if(start === 6)        // for gameOver State use
    {
        if(mouseX > 135 && mouseX <255 && mouseY > 310 && mouseY <390) //restart button
        {
            //reset the game
            clearPoints(balls);
            balls = [ new ballObj(112.5,200,0), new ballObj(287.5,200,1), new ballObj(287.5+((sqrt(sq(15)-sq(7.5)))*4),200+(7.5*4),1), new ballObj(287.5+((sqrt(sq(15)-sq(7.5)))*3),200+(7.5),1), new ballObj(287.5+((sqrt(sq(15)-sq(7.5)))*4),200,1), new ballObj(287.5+((sqrt(sq(15)-sq(7.5)))*2),200+(7.5*2),1), new ballObj(287.5+((sqrt(sq(15)-sq(7.5)))*3),200-(7.5*3),1), new ballObj(287.5+(sqrt(sq(15)-sq(7.5))),200-7.5,1), new ballObj(287.5+((sqrt(sq(15)-sq(7.5)))*2),200,2), new ballObj(287.5+((sqrt(sq(15)-sq(7.5)))*4),200-(7.5*2),3), new ballObj(287.5+(sqrt(sq(15)-sq(7.5))),200+7.5,3), new ballObj(287.5+((sqrt(sq(15)-sq(7.5)))*4),200-(7.5*4),3), new ballObj(287.5+((sqrt(sq(15)-sq(7.5)))*3),200+(7.5*3),3), new ballObj(287.5+((sqrt(sq(15)-sq(7.5)))*3),200-(7.5),3), new ballObj(287.5+((sqrt(sq(15)-sq(7.5)))*2),200-(7.5*2),3), new ballObj(287.5+((sqrt(sq(15)-sq(7.5)))*4),200+(7.5*2),3)];
            players[0].ballType = 0;
            players[1].ballType = 0;
            if(gameOver === 0 )         //winning player breaks for next 
            {
                players[0].myTurn = true;
                players[1].myTurn = false;
            }
            else
            {
                players[1].myTurn = true;
                players[0].myTurn = false;
            }
            gameOver = 2;
            showPlayerBallType= false;
            //go to break state
            start = 3;
        }
    }
};

var mouseDragged = function()
{
    if( (start === 0 && poolstick.show && ready) || start === 7)    // pulls the stick back
    {
        offset = dist(clickedX,clickedY,mouseX,mouseY);
        if(offset > 200)
        {
            offset = 200;
        }
    }
};

var mouseReleased = function()
{
    if( (start ===0 && poolstick.show && ready) || start === 7)    // gives the ball velocity
    {
        if(offset >= 0)
        {
            balls[0].velocity.set( -(balls[0].position.x-(balls[0].position.x+( cos(newAngle)*(offset/2) )))/7, -( balls[0].position.y-( balls[0].position.y+ ( sin(newAngle)*(offset/2) ) ) )/7 );
            balls[0].angle = newAngle;
            aming = true;
            offset = 0;
        }
    }
    else if(start === 0)        //safty
    {
        ready = true;
    }
};

//move functions
ballObj.prototype.move = function()
{
    //keeping the ball within the bound
    if( this.position.x-(this.size/2) <= 25 || this.position.x >= (375 -this.size/2) )
    {
        this.velocity.x = -this.velocity.x;
        if( this.position.x-(this.size/2) <= 25 || this.position.x >= (375 -this.size/2) )
        {
            if( (this.angle < -PI/2 && this.angle > -PI) || (this.angle > 0 && this.angle < (PI/2)) ) // II & IV
            {
                var diff;
                if(this.angle < 0)
                {
                    diff = (-PI/2) - this.angle;
                }
                else
                {
                    diff = this.angle - (PI/2);
                }
                this.angle += diff;
            }
            else if( (this.angle > PI/2 && this.angle < PI) || (this.angle < 0 && this.angle > (-PI/2)) ) // III & I
            {
                var diff;
                if(this.angle < 0)
                {
                    diff = this.angle - (-PI/2);
                }
                else
                {
                    diff = (PI/2) - this.angle;
                }
                this.angle -= diff;
            }
            else if(this.angle === 0 || this.angle === PI )
            {
                this.angle -= PI;
            }
            else if(this.angle === -PI)
            {
                this.angle = 0;
            }
        }
    }
    var loadingscreenOffset = 40;
    if(start !== 7)
    {
        loadingscreenOffset = 0;
    }
    if( this.position.y-(this.size/2) <= 100 + loadingscreenOffset || this.position.y >= (300+ loadingscreenOffset -this.size/2) )
    {
        this.velocity.y = -this.velocity.y;
        if( (this.angle <= PI  && this.angle > 0) || (this.angle >= -PI  && this.angle < 0) )
        {
            this.angle = -this.angle;
        }
    }
    
    //ball movement when hit
    this.dx *= dragCo;
    this.dy *= dragCo;
    this.velocity.x += this.dx;
    this.velocity.y += this.dy;
    this.velocity.add(this.drag);
    this.position.add(this.velocity);
    this.drag.set(this.velocity.x, this.velocity.y);
    this.drag.mult(-0.03);
};

//ball collision physics
var ballCollision = function()
{
    
    var activePlayer;       // active player
    var nonActivePlayer;
    if(start !== 7)
    {
        if( players[0].myTurn )
        {
            activePlayer = players[0];
            nonActivePlayer = players[1];
        }
        else
        {
            activePlayer = players[1];
            nonActivePlayer = players[0];
        }
    }
    for(var x = 0; x < balls.length; x++)
    {
        if(balls[x].covered === false && balls[x].alive)
        {
            for(var y = 0; y < balls.length; y++)
            {
                if(balls[y].alive && x !== y)
                {
                    var dx = balls[x].position.x - balls[y].position.x;
                    var dy = balls[x].position.y - balls[y].position.y;
                    var dr = 15;
                    
                    if (dx * dx + dy * dy < dr * dr)
                    {
                        loadingHit = true;
                        if(start !== 7)
                        {
                            if(firstHit && ( y === 0 || x === 0) )  //check for the correct first hit
                            {
                                if( activePlayer.ballType===1 && ( (y > 8) || (x > 8) ) )    //solid player hitting stripes
                                {
                                    commentWhilePlaying = "Scratch! - you hit your opponent's ball";
                                    activePlayer.fouled = true;
                                }
                                else if( activePlayer.ballType===2 && ( (y < 8 && y > 0) || (x < 8 && x > 0) ) )    //stripe player hitting solids
                                {
                                    commentWhilePlaying = "Scratch! - you hit your opponent's ball";
                                    activePlayer.fouled = true;
                                }
                                firstHit = false;
                            }
                        }
                        var theta = atan2(dy, dx);
                        var force = (dr - sqrt(dx*dx + dy*dy));
                        balls[x].dx += force * cos(theta);
                        balls[y].dx -= force * cos(theta);
                        balls[x].dy += force * sin(theta);
                        balls[y].dy -= force * sin(theta);
                        balls[y].covered = true;
                    }
                }
            }
        }
        balls[x].covered = true;
    }
    
    for(var i = 0; i < balls.length; i++)
    {
        balls[i].covered = false;
    }
};

//redisplay the pool stick when all balls stop moving
var showInfo = function()
{
    // only gives the user aming control when the ball is not moving
    poolstick.show = true;
    for(var i = 0; i < balls.length; i++)
    {
        if(!closeToZero(balls[i].velocity.x) && !closeToZero(balls[i].velocity.y) )
        {
            poolstick.show = false;
        }
    }
};

var sunkAllBalls = function( player)  //returns true if all balls are sunk
{
    var allGone = true;
    if(player.ballType === 1)           // checks to see if all solid balls are sunk
    {
        for(var i = 1; i<8; i++) //flags allGone if there is a ball left
        {
            if(balls[i].alive)
            {
                allGone = false;
            }
        }
    }
    else if(player.ballType === 2)      // checks to see if all stripe balls are sunk
    {
        for(var i = 9; i<balls.length; i++) //flags allGone if there is a ball left
        {
            if(balls[i].alive)
            {
                allGone = false;
            }
        }
    }
    else                                // if type not declared return false
    {
        return false;
    }
    
    if(allGone)
    {
        return true;
    }
    else
    {
        return false;
    }
};

pocketObj.prototype.work = function()
{
    if( start !== 4)
    {
        gameController.changeState(start);
    }
    var activePlayer;       // active player
    var nonActivePlayer;
    if( players[0].myTurn )
    {
        activePlayer = players[0];
        nonActivePlayer = players[1];
    }
    else
    {
        activePlayer = players[1];
        nonActivePlayer = players[0];
    }
    for(var i = 0; i<balls.length; i++)
    {
        if( i === 0 && dist(this.x, this.y, balls[0].position.x, balls[0].position.y) < 15)         //sunk cue ball
        {
            balls[i].velocity.x = 0;
            balls[i].velocity.y = 0;
            balls[i].position.x = 0;
            balls[i].position.y = 0;
            balls[i].drag.x =0;
            balls[i].drag.y =0;
            balls[i].alive = false;
            activePlayer.fouled = true;
            if( startingOut )          // if players are just starting out reset there ball types
            {
                commentWhilePlaying = "Scratch! ball declaration not vaild";
                activePlayer.ballType = 0;
                nonActivePlayer.ballType = 0;
            }
            //scratching on the 8 ball
            if( sunkAllBalls(activePlayer) )
            {
                commentWhilePlaying = "Scratch! You scratched on the 8 ball.YOU LOST";
                activePlayer.lost = true;
            }
            commentWhilePlaying = "Scratch! You sunk the cue ball !";
        }
        else if( i === 8 && dist(this.x, this.y, balls[8].position.x, balls[8].position.y) < 15)        // 8 ball sink
        {
            balls[i].velocity.x = 0;
            balls[i].velocity.y = 0;
            balls[i].position.x = 0;
            balls[i].position.y = 0;
            balls[i].drag.x =0;
            balls[i].drag.y =0;
            balls[i].alive = false;
            if(this.selected)               //if 8 ball goes into the selected pocket
            {
                commentWhilePlaying = "Fantasic Shot! you won !!!!!!!!!";
                this.selected = false;      //deselect the pocket
                activePlayer.hasWon = true;
            }
            else                            //if 8 ball goes into unselected pocket
            {
                commentWhilePlaying = "Scratch! 8 ball sunk illegally";
                this.selected = false;      // deselect the pocket
                activePlayer.lost = true;
            }
        }
        else if( dist(this.x, this.y, balls[i].position.x, balls[i].position.y) < 15)        //other balls sink
        {
            balls[i].velocity.x = 0;
            balls[i].velocity.y = 0;
            balls[i].position.x = 0;
            balls[i].position.y = 0;
            balls[i].drag.x =0;
            balls[i].drag.y =0;
            balls[i].alive = false;
            if( activePlayer.ballType === 0)    // when ball type has not been declared yet
            {
                if( i < 8 && !activePlayer.fouled)
                {
                    commentWhilePlaying = "First Sink ! You are now solids";
                    activePlayer.ballType = 1;      //solid
                    nonActivePlayer.ballType = 2;   //stripes
                }
                else if( i > 8 && !activePlayer.fouled)
                {
                    commentWhilePlaying = "First Sink ! You are now stripes";
                    activePlayer.ballType = 2;      //stripes
                    nonActivePlayer.ballType = 1;   //solid
                }
                activePlayer.continuePlaying = true;
            }
            if(activePlayer.ballType === 1 && !startingOut)     // solid player after ball type declaration
            {
                if(i < 8)       //sinks solid
                {
                    commentWhilePlaying = "Nice shot !   Keep up the good work!";
                    activePlayer.continuePlaying = true;
                }
                else            //sinks stripes
                {
                    commentWhilePlaying = "Scratch ! you sunk your opponent's ball";
                    activePlayer.stopPlaying = true;
                }
            }
            if(activePlayer.ballType === 2 && !startingOut)     // stripe player after ball type declaration
            {
                if(i < 8)       //sinks solid
                {
                    commentWhilePlaying = "Scratch ! you sunk your opponent's ball";
                    activePlayer.stopPlaying = true;
                }
                else            //sinks stripes
                {
                    commentWhilePlaying = "Nice shot !   Keep up the good work!";
                    activePlayer.continuePlaying = true;
                }
            }
        }
    }
};

//draw functions
pocketObj.prototype.draw = function()
{
    if(this.selected)
    {
        noFill();
        strokeWeight(5);
        stroke(38, 0, 255,140);
        ellipse(this.x, this.y, 40, 40);
    }
};
ballObj.prototype.draw = function()
{
    pushMatrix();
    translate(this.position.x, this.position.y);
    image( images[this.num], -this.size/2 , -this.size/2 , this.size, this.size );
    popMatrix();
};

//resets the player
var resetPlayer = function( thisPlayer)
{
    thisPlayer.continuePlaying = false;
    thisPlayer.stopPlaying = false;
    thisPlayer.fouled = false;
    thisPlayer.lost = false;
    thisPlayer.hasWon = false;
};

var savedx;
var savedy;
var proccessNecceray = false;
var deleteSelection = false;
poolStickObj.prototype.draw = function()
{
    if(this.show)   //true only when all balls stops moving
    {
        if(proccessNecceray && start !== 7)        //processing the result
        {
            if(deleteSelection)     //delete all selected pockets
            {
                for(var i = 0; i < pockets.length; i++)
                {
                    pockets[i].selected = false;
                }
            }
            var activePlayer;       // active player
            var nonActivePlayer;
            if( players[0].myTurn )
            {
                activePlayer = players[0];
                nonActivePlayer = players[1];
            }
            else
            {
                activePlayer = players[1];
                nonActivePlayer = players[0];
            }
            //take care of first time
            if(firstHit)   //if nothing was hit
            {
                activePlayer.fouled = true;
            }
            
            if(activePlayer.ballType !== 0)
            {
                showPlayerBallType= true;
            }
            
            if(activePlayer.lost)           // other player wins -> go to gameOver state
            {
                resetPlayer(activePlayer);
                gameOver = nonActivePlayer.playerNum;   //GameOver- nonActive Player won!
                players[gameOver].numberOfWins++;       // add wins to the player
                start = 6;                              //go to game over state
                textSize(25);
                fill(0, 12, 245);
                text("LOST",100,100);
            }
            else if(activePlayer.fouled)    // go to scratch state
            {
                resetPlayer(activePlayer);  // reset the active player
                activePlayer.myTurn = false;
                nonActivePlayer.myTurn = true;
                activePlayer = nonActivePlayer; //  nonActivePlayer is now the new active player
                start = 4;                  // go to scratch state
            }
            else if(activePlayer.hasWon)    // this player wins -> go to gameOver state
            {
                resetPlayer(activePlayer);              // reset the active player
                gameOver = activePlayer.playerNum;      // GameOver- nonActive Player won!
                players[gameOver].numberOfWins++;       // add wins to the player
                start = 6;                              // go to game over state
                textSize(25);
                fill(0, 12, 245);
                text("WON!.",100,100);
            }
            else if(activePlayer.stopPlaying)   // switches player
            {
                resetPlayer(activePlayer);  // reset the active player
                activePlayer.myTurn = false;
                nonActivePlayer.myTurn = true;
                activePlayer = nonActivePlayer; //  nonActivePlayer is now the new active player
            }
            else if(activePlayer.continuePlaying)   // resets the current player
            {
                //do Firework!
                for (var j = 0; j < 4; j++)
                {
                    if (firework[j].step === 0)
                    {
                        firework[j].target.set(random(330, 390), random(5, 55));
                        firework[j].position.set(firework[j].target.x, firework[j].target.y);
                        firework[j].direction.set(firework[j].target.x - firework[j].position.x, firework[j].target.y - firework[j].position.y);
                        var s = random(1, 2) / 100;
                        firework[j].direction.mult(s);
                        firework[j].step = 1;
                    }
                }
                resetPlayer(activePlayer);  // reset the active player
            }
            else                                    // if nothing happened switch player
            {
                resetPlayer(activePlayer);  // reset the active player
                activePlayer.myTurn = false;
                nonActivePlayer.myTurn = true;
                activePlayer = nonActivePlayer; //  nonActivePlayer is now the new active player
            }
            commentWhilePlaying = "Drag your mouse to hit the cue ball";
            poolstickNum = activePlayer.stickType;      // change the stickType to the current player's
            proccessNecceray = false;       // so that this block would only run once per turn
            if(activePlayer.ballType !==0)  // if ball type is declared turn off "startingOut"
            {
                startingOut = false;
            }
            firstHit = true;
            if(start !== 6)
            {
                if(sunkAllBalls(activePlayer))  // saves where it needs to go, then go to pick pocket state
                {
                    gotoStateAfterPocketPicking = start;
                    start = 5;
                }
            }
        }
        if(aming)
        {
            newAngle = atan2( (mouseY - balls[0].position.y), (mouseX - balls[0].position.x) );
        }
        pushMatrix();
        translate(balls[0].position.x, balls[0].position.y);
        savedx = balls[0].position.x;
        savedy = balls[0].position.y;
        rotate( newAngle + ninetyDeg);
        strokeWeight(1);
        stroke(0, 67, 237);
        line(0,-balls[0].size+5,0,-100);
        if(start === 7)
        {
            image( images[6], -this.size/2 , balls[0].size+(offset/2), this.size, this.size);
        }
        else
        {
            image( images[poolstickNum], -this.size/2 , balls[0].size+(offset/2), this.size, this.size);
        }
        popMatrix();
    }
    else
    {
        deleteSelection = true;
        if(!proccessNecceray)       // get ready to process the result!
        {
            proccessNecceray = true;
        }
        pushMatrix();
        translate(savedx, savedy);
        rotate( newAngle+ninetyDeg);
        if(start === 7)
        {
            image( images[6], -this.size/2 , balls[0].size+(offset/2), this.size, this.size);
        }
        else
        {
            image( images[poolstickNum], -this.size/2 , balls[0].size+(offset/2), this.size, this.size);
        }
        popMatrix();
    }
    
};

//States functions
gameControllerObj.prototype.changeState = function(x)
{
    this.currState = x;
};

var t = 0;
var state = 0;
var x;
var word = "";
var timeGoal = 250;
var frameCounter = 0;
var logoHeight = 190;
var loadingdone = false;
var moveLogo = true;
var fadeOut = false;
var fadeVar = 100;
loadingState.prototype.execute = function()
{
    if (customCharMade === 0)
    {
        customChar();           //building custom charactors
    }
    background(0, 0, 0);
    if(!loadingdone)        //show loading circle
    {
        noFill();
        stroke(0, 111, 222);
        strokeWeight(6);
        arc(200, 180, 100, 100, (0 + frameCount * 8)*PI/180, (90 + sin(frameCount /14.5) * 90 + frameCount * 8)*PI/180);
        fill(255, 255, 255);
        textFont(createFont("Verdana"));
        textSize(12);
        if(t >= 30)
        {
            if(state === 0)
            {
                word = "L O A D I N G .";
                state = 1;
            }
            else if(state === 1)
            {
                word = "L O A D I N G . .";
                state = 2;
            }
            else if(state === 2)
            {
                word = "L O A D I N G . . .";
                state = 0;
            }
            t = 0;
        }
        text(word, 160, 270);
        t++;
        frameCounter++;
        if(frameCounter > timeGoal)
        {
            frameCounter = 0;
            loadingdone = true;
        }
    }
    else                    //show logo and break
    {
        textFont(createFont("sans-serif"));
        fill(128, 0, 6);
        textSize(50);
        text("The Virtual Pool", 20, logoHeight);
        fill(163, 163, 163);
        textSize(15);
        text("J  i  n  w  o  o    Y  o  m", 125, logoHeight+25);
        stroke(69, 69, 69);
        strokeWeight(3);
        line(50, logoHeight+20, 110, logoHeight+20);
        line(290, logoHeight+20, 350, logoHeight+20);
        if(moveLogo)            // scroll the logo
        {
            frameCounter++;
            logoHeight = logoHeight- 1;
            if(logoHeight <= 65)
            {
                frameCounter = 0;
                moveLogo = false;
            }
        }
        
        if(!moveLogo)           // break to play!
        {
            
            image( images[tableNum], 0 , 40 , 400, 400 );
            for(var i = 0; i<balls.length; i++)
            {
                if(balls[i].alive)
                {
                    balls[i].draw();
                    balls[i].move();
                    ballCollision();
                }
            }
            showInfo();
            poolstick.draw();
            if(loadingHit)
            {
                frameCounter++;
                fadeOut = true;
            }
            else
            {
                fill(0, 0, 0);
                textSize(13);
                text("1. Click and drag the mouse to adjust shooting power",50,165);
                text("2. release to hit the cue ball !",50,180);
                fill(255, mouseX/2, mouseY/2);
                textSize(25);
                text("break the balls to start!",80,390);
            }
            if(fadeOut)
            {
                fill(0, 0, 0,fadeVar);
                fadeVar+=3;
                noStroke();
                rect(0,100, 400,300);
                if(frameCounter >= 55)
                {
                    start = 1;
                }
            }
        }
    }
    
    if( start !== 7)
    {
        clearPoints(balls);
        balls = [ new ballObj(112.5,200,0), new ballObj(287.5,200,1), new ballObj(287.5+((sqrt(sq(15)-sq(7.5)))*4),200+(7.5*4),1), new ballObj(287.5+((sqrt(sq(15)-sq(7.5)))*3),200+(7.5),1), new ballObj(287.5+((sqrt(sq(15)-sq(7.5)))*4),200,1), new ballObj(287.5+((sqrt(sq(15)-sq(7.5)))*2),200+(7.5*2),1), new ballObj(287.5+((sqrt(sq(15)-sq(7.5)))*3),200-(7.5*3),1), new ballObj(287.5+(sqrt(sq(15)-sq(7.5))),200-7.5,1), new ballObj(287.5+((sqrt(sq(15)-sq(7.5)))*2),200,2), new ballObj(287.5+((sqrt(sq(15)-sq(7.5)))*4),200-(7.5*2),3), new ballObj(287.5+(sqrt(sq(15)-sq(7.5))),200+7.5,3), new ballObj(287.5+((sqrt(sq(15)-sq(7.5)))*4),200-(7.5*4),3), new ballObj(287.5+((sqrt(sq(15)-sq(7.5)))*3),200+(7.5*3),3), new ballObj(287.5+((sqrt(sq(15)-sq(7.5)))*3),200-(7.5),3), new ballObj(287.5+((sqrt(sq(15)-sq(7.5)))*2),200-(7.5*2),3), new ballObj(287.5+((sqrt(sq(15)-sq(7.5)))*4),200+(7.5*2),3)
];
        gameController.changeState(start);
    }
};

instructionState.prototype.execute = function()
{
    instructionScreen();
    if( start !== 1)
    {
        gameController.changeState(start);
    }
};

optionsState.prototype.execute = function()
{
    optionsScreen();
    if( start !== 2)
    {
        gameController.changeState(start);
    }
};

breakState.prototype.execute = function()
{
    if( !players[0].myTurn && !players[1].myTurn)   //if game begans for the first time, player 1 goes first
    {
        players[0].myTurn = true;
    }
    background(0, 0, 0);
    image( images[tableNum], 0 , 0 , 400, 400 );
    for(var i = 1; i<balls.length; i++)
    {
        if(balls[i].alive)
        {
            balls[i].draw();
        }
    }
    
    if(mouseX >= (25 + balls[0].size/2) &&  mouseX <= 112.5)    // x controls
    {
        balls[0].position.x = mouseX;
    }
    else if( mouseX < (25 + balls[0].size/2) )
    {
        balls[0].position.x = (25 + balls[0].size/2);
    }
    else if( mouseX > 112.5 )
    {
        balls[0].position.x = 112.5;
    }
    
    if( mouseY >= (100 + balls[0].size/2) && mouseY <= (300 - balls[0].size/2) )    // y control
    {
        balls[0].position.y = mouseY;
    }
    else if( mouseY < (100 + balls[0].size/2) )
    {
        balls[0].position.y = (100 + balls[0].size/2);
    }
    else if ( mouseY <= (300 - balls[0].size/2) )
    {
        balls[0].position.y = (300 - balls[0].size/2);
    }
    
    var legalCount = 0;
    legalBallPlacement = true;
    fill(0, 255, 21);
    
    var holeOverlap = false;
    for(var i = 0; i<4; i+=3) //avoid hole overlaps
    {
        if( dist(balls[0].position.x,balls[0].position.y, pockets[i].x, pockets[i].y) < 15)
        {
            holeOverlap = true;
        }
    }
    if(holeOverlap)
    {
        legalBallPlacement = false;
        fill(255, 48, 48);
    }
    
    strokeWeight(1);
    stroke(0, 0, 0);
    ellipse( balls[0].position.x, balls[0].position.y, balls[0].size, balls[0].size);
    
    if( start !== 3)
    {
        gameController.changeState(start);
    }
};

gameState.prototype.execute = function()
{
    if(players[0].myTurn)
    {
        poolstickNum = players[0].stickType;
    }
    else
    {
        poolstickNum = players[1].stickType;
    }
    background(0, 0, 0);
    
    for (var j = 0; j < 4; j++)
    {
        if (firework[j].step === 1)
        {
            firework[j].draw();
        } 

        else if (firework[j].step === 2)
        {
            for (var i = 0; i < firework[j].explosions.length; i++)
            {
                firework[j].explosions[i].draw();   
            } 

            if (firework[j].explosions[0].timer <= 0)
            {
                firework[j].step = 0;   
            }
        }
    }
    
    image( images[tableNum], 0 , 0 , 400, 400 );
    for(var i = 0; i<pockets.length; i++) //avoid hole overlaps
    {
        pockets[i].draw();
    }
    
    for(var i = 0; i<balls.length; i++)
    {
        if(balls[i].alive)
        {
            balls[i].draw();
            balls[i].move();
            ballCollision();
        }
    }
    
    for(var i = 0; i<pockets.length; i++)
    {
        pockets[i].work();
    }
    showInfo();
    poolstick.draw();
    if( start !== 0)
    {
        gameController.changeState(start);
    }
};

scratchState.prototype.execute = function()
{
    if(!balls[0].alive)
    {
        balls[0].alive = true;
        balls[0].position.x = mouseX;
        balls[0].position.y = mouseY;
    }
    background(0, 0, 0);
    image( images[tableNum], 0 , 0 , 400, 400 );
    for(var i = 1; i<balls.length; i++)
    {
        if(balls[i].alive)
        {
            balls[i].draw();
        }
    }
    
    if(mouseX >= (25 + balls[0].size/2) &&  mouseX <= (375 - balls[0].size/2) )    // x controls
    {
        balls[0].position.x = mouseX;
    }
    else if( mouseX < (25 + balls[0].size/2) )
    {
        balls[0].position.x = (25 + balls[0].size/2);
    }
    else if( mouseX > (375 - balls[0].size/2) )
    {
        balls[0].position.x = (375 - balls[0].size/2);
    }
    
    if( mouseY >= (100 + balls[0].size/2) && mouseY <= (300 - balls[0].size/2) )    // y control
    {
        balls[0].position.y = mouseY;
    }
    else if( mouseY < (100 + balls[0].size/2) )
    {
        balls[0].position.y = (100 + balls[0].size/2);
    }
    else if ( mouseY <= (300 - balls[0].size/2) )
    {
        balls[0].position.y = (300 - balls[0].size/2);
    }
    
    var legalCount = 0;
    legalBallPlacement = true;
    fill(0, 255, 21);
    for(var i = 1; i<balls.length; i++) //avoid ball overlapse
    {
        if( dist(balls[0].position.x,balls[0].position.y, balls[i].position.x, balls[i].position.y) > 15)
        {
            legalCount++;
        }
    }
    if(legalCount !== 15)   // if all 14 ball are not overlapping with the cueball
    {
        legalBallPlacement = false;
        fill(255, 48, 48);
    }
    
    var holeOverlap = false;
    for(var i = 0; i<pockets.length; i++) //avoid hole overlaps
    {
        if( dist(balls[0].position.x,balls[0].position.y, pockets[i].x, pockets[i].y) < 15)
        {
            holeOverlap = true;
        }
    }
    if(holeOverlap)
    {
        legalBallPlacement = false;
        fill(255, 48, 48);
    }
    
    strokeWeight(1);
    stroke(0, 0, 0);
    ellipse( balls[0].position.x, balls[0].position.y, balls[0].size, balls[0].size);
    
    if( start !== 4)
    {
        gameController.changeState(start);
    }
};

pocketPickingState.prototype.execute = function()
{
    background(0, 0, 0);
    image( images[tableNum], 0 , 0 , 400, 400 );
    legalBallPlacement = false;
    for(var i = 0; i<pockets.length; i++) //avoid hole overlaps
    {
        pockets[i].selected = false;
        if( dist(mouseX,mouseY, pockets[i].x, pockets[i].y) < 30)       //higlightes the pocket when hovering
        {
            legalBallPlacement = true;
            pockets[i].selected = true;
        }
        pockets[i].draw();
    }
    for(var i = 0; i<balls.length; i++)
    {
        if(balls[i].alive)
        {
            balls[i].draw();
        }
    }
    
    if( start !== 5)
    {
        deleteSelection = false;
        gameController.changeState(gotoStateAfterPocketPicking);
        gotoStateAfterPocketPicking = 0;
    }
};

gameOverState.prototype.execute = function()
{
    fill(0, 0, 0, 60);
    rect(0, 0, 400, 400);
    
    for (var j = 0; j < firework.length; j++)
    {
        if (firework[j].step === 0)
        {
            firework[j].position.set(200, 450);
            firework[j].target.set(random(50, 350), random(50, 200));
            firework[j].direction.set(firework[j].target.x - firework[j].position.x, firework[j].target.y - firework[j].position.y);
            var s = random(1, 2) / 100;
            firework[j].direction.mult(s);
            firework[j].step = 1;
        }
        
        else if (firework[j].step === 1)
        {
            firework[j].draw();
        } 

        else if (firework[j].step === 2)
        {
            for (var i = 0; i < firework[j].explosions.length; i++)
            {
                firework[j].explosions[i].draw();   
            } 

            if (firework[j].explosions[0].timer <= 0)
            {
                firework[j].step = 0;   
            }
        }
    }

    
    if(gameOver === 0)
    {
        //player 1 wins
        textSize(50);
        fill(157, 255, 0);
        text("Player 1", 120,130);
    }
    else
    {
        //player 2 wins
        textSize(50);
        fill(157, 255, 0);
        text("Player 2", 120,130);
    }
    textSize(20);
    fill(255, 255, 255);
    text("P l a y e r   1", 50,300);
    text("P l a y e r   2", 250,300);
    textSize(100);
    text("-", 175,240);
    text(players[0].numberOfWins, 60,240);
    text(players[1].numberOfWins, 260,240);
    
    //replay button
    image( images[11], 135 , 310, 120, 80 );
    textSize(20);
    fill(0, 0, 0);
    text("REMATCH",146,359);
    if(mouseX > 135 && mouseX <255 && mouseY > 310 && mouseY <390) //rematch button fade
    {
        image( images[12], 135 , 310, 120, 80 );    //rematch button fade
    }
    if( start !== 6)
    {
        gameController.changeState(start);
    }
};

var commentary = function()
{
    textSize(20);
    var f = createFont("sans-serif");
    textFont(f);
    fill(255, 255, 255);
    if(start === 3)         // break state
    {
        text("Click to place the ball down and break !!", 20,55);
    }  
    if(start === 0)         // game state
    {
        if(commentWhilePlaying[0] === 'S')
        {
            fill(255, 0, 0);
        }
        else
        {
            fill(255, 255, 255);
        }
        text(commentWhilePlaying, 45,60);
    }
    else                    // set ready to false
    {
        ready = false;
    }
    
    if(start === 4)         // scratch state
    {
        text("Place the ball anywhere on the table", 40,60);
    }
    
    if(start === 5)         // gameOver state
    {
        text("select a pocket by click on one of them", 30,60);
    }
    
    if(start === 6)
    {
        textSize(26);
        fill(0, 204, 255);
        text("C O N G R A T U L A T I O N S !", 15,70);
    }
    
    if(start === 3 || start === 4 || start === 5 || start === 0)      // show player's stats
    {
        f=createFont("fantasy");
        textFont(f);
        fill(0, 255, 230);
        textSize(20);
        stroke(18, 101, 255);
        strokeWeight(2);
        if(players[0].myTurn && !players[1].myTurn)     // tells you who's turn
        {
            text("It's your turn player 1 !", 120, 25);
            fill(125, 209, 187,90);
            rect(20,330, 175,60);
        }
        else if(players[1].myTurn && !players[0].myTurn)
        {
            text("It's your turn player 2 !", 120, 25);
            fill(125, 209, 187,90);
            rect(205,330, 175,60);
        }
        f=createFont("fantasy");
        textFont(f);
        fill(125, 125, 125);
        noStroke();
        rect(5,10,90,20);
        f=createFont("sans-serif");
        textFont(f);
        textSize(15);
        fill(255, 255, 255);
        text("View Score", 10,25);
        fill(0, 255, 9);
        f=createFont("fantasy");
        textFont(f);
        textSize(25);
        text("Player 1", 30,350);
        text("Player 2", 290,350);
        textSize(20);
        //show player ball types
        if(showPlayerBallType)
        {  
            var solidsCount = 0;
            var stripeCount = 0;
            for(var i = 1; i<8; i++)                //counts up soild balls
            {
                if(balls[i].alive)
                {
                    solidsCount++;
                }
            }
            for(var i = 9; i<balls.length; i++)     //counts up stripe balls
            {
                if(balls[i].alive)
                {
                    stripeCount++;
                }
            }
            if(players[0].ballType === 1)
            {
                fill(255, 255, 255);
                text("solids", 30,380);
                text("stripes", 315,380);
                f=createFont("sans-serif");
                textFont(f);
                textSize(17);
                fill(255, 0, 0);
                text("        " + solidsCount + "\nRemaining", 110,360);
                text("        " + stripeCount + "\nRemaining", 210,360);
            }
            else if(players[0].ballType === 2)
            {
                fill(255, 255, 255);
                text("stripes", 30,380);
                text("solids", 315,380);
                f=createFont("sans-serif");
                textFont(f);
                textSize(17);
                fill(255, 0, 0);
                text("        " + stripeCount + "\nRemaining", 110,360);
                text("        " + solidsCount + "\nRemaining", 210,360);
            }
            f=createFont("fantasy");
            textFont(f);
            textSize(20);
        }
        else
        {
            fill(255, 0, 0);
            text("Not Declared", 30,380);
            text("Not Declared", 265,380);
        }
        strokeWeight(2);
        stroke(255, 0, 0);
        line(200,340,200,390);
        //5,10,90,20
        if(mouseX >= 5 && mouseX <= 95 && mouseY >= 10 && mouseY <= 30)         // view score
        {
            noStroke();
            fill(0, 0, 0,80);
            rect(5,10,90,20);       //highlight box
            
            fill(0, 0, 0,210);
            rect(25,100,350,200);
            textSize(20);
            fill(255, 255, 255, 210);
            text("P l a y e r   1", 60,270);
            text("P l a y e r   2", 250,270);
            textSize(100);
            text("-", 175,240);
            text(players[0].numberOfWins, 70,220);
            text(players[1].numberOfWins, 260,220);
        }
    }
    
};

var ResetTime = 15;
var countingFrame = 0;

var draw = function()
{
    if(countingFrame<ResetTime)             // Animation toggle
    {
        countingFrame++;
    }
    else
    {
        cycle=true;
        countingFrame = 0;
    }
    gameController.state[gameController.currState].execute();
    commentary();
};


}};
