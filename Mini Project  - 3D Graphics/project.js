var watch;
var face;
var muchroom;
var table;
var clouds;
var watchTex;
var cardsTex;
var tableTex;
var catTex;
var mushTex;
var backgroundTex;

var x = [];
var y = [];
var z = [];
var cards = 300;

var rotateOpt1;
var rotateOpt2;

var xcamera = 4000;
var ycamera = -2000;
var zcamera = 0;

function preload() {
        
    watch = loadModel('models/pocketwatch.obj')
    face = loadModel('models/face.obj')
    muchroom = loadModel('models/mushroom.obj')
    table = loadModel('models/mytable.obj')
    clouds = loadModel('models/cloud.obj')

    watchTex = loadImage('textures/gold.jpg')
    cardsTex = loadImage('textures/rabbitcard.png')
    tableTex = loadImage('textures/checkerboard.jpg')
    catTex = loadImage('textures/cat.jpg')
    mushTex = loadImage('textures/mushTex.jpg')
    backgroundTex = loadImage('textures/forest.jpg')

}

function setup() {

    createCanvas(1600, 900, WEBGL);
  
    // USING THSEES PARAMETERS TO INTERACTE WITH LIGHT
    mouseX = width;
    mouseY = height;

    camera(xcamera, ycamera, zcamera, 0, 150, 0, -500, 300, -200); //camera([x],[y],[z],[centerX],[centerY],[centerZ],[upX],[upY],[upZ])

    angleMode(DEGREES); // change default mode to degrees 

    // Positioning the cloud of cards 

    for (var i = 0; i < cards; i = i + 1) {
        x[i] = random(-width * 2, width * 2);
        y[i] = random(-height * 3, height * 3);
        z[i] = random(-1500, 1500);
    }
}

//===================CREATING SEPARATE LIGHTING CONDITIONS=======//

function setLightsA() {
    ambientLight(0);
    directionalLight(255, 255, 255, 1, 1, -1);
    pointLight(255, 0, 0, mouseX, mouseY, 300);
}

function setLightsB() {
    ambientLight(280);
    directionalLight(200, 200, 200, 1, 1, -1);
    pointLight(255, 255, 255, mouseX, mouseY, 300);
}

function setLightsC() {
//    ambientLight(20);
    directionalLight(255, 255, 255, 1, 1, -1);
}

function setLightsD() {
    ambientLight(80);
    directionalLight(200, 200, 200,mouseX, mouseY, -1);
    pointLight(255, 255, 255, 1, -1, 300);
}

function dancingMushrooms(x, y, z) {

    rotateX(x);
    rotateY(y);
    rotateZ(z);

}

function draw() {
    
    //========MOVEMENT=============//

    orbitControl();

    background(255);

    //==============BACKGROUND-SPHERE===============//

    push()
    translate(340, -500, 0);
    rotateX(frameCount * 0.3);
    normalMaterial(255, 0, 0);
    setLightsD()
    scale(40)
    texture(backgroundTex)
    sphere(100)
    pop();

    //=================FLIPPING-FACE==============//

    push()
    translate(240, 500, 0);
    rotateX(90);
    rotateY(frameCount * 0.5);
    specularMaterial(255, 0, 0); // shiny 
    setLightsC();
    scale(800)
    model(face);
    pop();

    //==============CARDS==============//

    push()

    rotate(frameCount / 2);

    for (var i = 0; i < cards; i = i + 1) {

        push();
        translate(x[i], y[i], z[i]);
        noStroke();
        setLightsA();
        rotateX(x[i] / 15);
        rotateY(y[i] / 5);
        rotateZ(z[i] / 5);
        texture(cardsTex);
        plane(130);
        pop();

        // making the cards to fly up on the z
        
        z[i] = z[i] + 10;
        
        // Controlling the disappearence of card on the z-axis
        
        if (z[i] > 1000) {
            z[i] = -350;
        }
    }

    pop()

    //================POCKET-WATCH-STATIC===========//

    push()
    translate(840, 1800, 300);
    rotateX(10);
    rotateY(570);
    rotateZ(70);
    scale(6000);
    setLightsC();
    normalMaterial();
    texture(watchTex);
    model(watch);
    pop()

    push()
    translate(-440, -1400, -500);
    rotateX(-150);
    rotateY(-300);
    rotateZ(-300);
    scale(6000)
    setLightsC()
    normalMaterial();
    texture(watchTex)
    model(watch);
    pop()

    //===========MUSHROOMS============//

    push()
    translate(540, 1500, 100);
    dancingMushrooms(frameCount * 4, 0, frameCount * 2)
    scale(150)
    setLightsB()
    normalMaterial();
    texture(mushTex)
    model(muchroom);
    pop()

    push()
    translate(-150, -1200, -100);
    dancingMushrooms(0, 0, frameCount * 2)
    scale(100)
    setLightsB()
    normalMaterial();
    texture(mushTex)
    model(muchroom);
    pop()

    push()
    translate(-1450, -700, -300);
    dancingMushrooms(frameCount * 4, 0, frameCount * 2)
    scale(150)
    setLightsB()
    normalMaterial();
    texture(mushTex)
    model(muchroom);
    pop()

    push()
    translate(1450, 700, -300);
    dancingMushrooms(0, 0, frameCount * 2)
    scale(100)
    setLightsB();
    normalMaterial();
    texture(mushTex)
    model(muchroom);
    pop()

    //==========CAT=============//

    push();
    rotateOpt1 = rotateY(frameCount * 0.5);
    translate(1650, 0, 0);
    rotateX(20)
    rotateOpt2 = rotateY(frameCount * 0.025);
    normalMaterial(255)
    setLightsD()
    texture(catTex)
    sphere(400);
    pop();
    
    //==========TABLE===========//

    push();
    translate(240, 500, -1900);
    rotateX(90);
    rotateY(frameCount * 0.5);
    ambientLight(20);
    setLightsD()
    normalMaterial();
    scale(2000)
    texture(tableTex)
    model(table);
    pop();

    //==========CLOUDS===========//

    push()
    translate(0, 0, -700);
    setLightsD();
    normalMaterial();
    fill(200, 0, 200, 120)
    scale(5)
    rotateZ(frameCount / 2)
    model(clouds)
    pop()

}

