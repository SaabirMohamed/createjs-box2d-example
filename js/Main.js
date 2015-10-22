var box2d = {
	b2Vec2 : Box2D.Common.Math.b2Vec2,
	b2BodyDef : Box2D.Dynamics.b2BodyDef,
	b2Body : Box2D.Dynamics.b2Body,
	b2FixtureDef : Box2D.Dynamics.b2FixtureDef,
	b2Fixture : Box2D.Dynamics.b2Fixture,
	b2World : Box2D.Dynamics.b2World,
	b2MassData : Box2D.Collision.Shapes.b2MassData,
	b2PolygonShape : Box2D.Collision.Shapes.b2PolygonShape,
	b2CircleShape : Box2D.Collision.Shapes.b2CircleShape,
	b2DebugDraw : Box2D.Dynamics.b2DebugDraw
};

var SCALE = 30; //convert meters to pixels
var stage, world, debug, silo;


function init(){
	stage = new createjs.Stage(document.getElementById("canvas"));
	debug = document.getElementById("debug");

	setupPhysics();

	createObject(0, 300, 20, 300, 0); // left wall
	createObject(800, 300, 20, 300, 0); // right wall
	//createObject(100, 300, 100, 50, -50);  // collision object

	// create silo
	silo = new Silo(200,430).view;
	stage.addChildAt(silo, 0);

	// create seeds
	createSeeds();

	// we have to enable onMouseOver & onMouseOut events on stage
	stage.enableMouseOver();

	// set up event listeners
	setupListeners();

	// set easel ticker
	createjs.Ticker.setFPS(50);
	createjs.Ticker.addEventListener("tick", tick);
	createjs.Ticker.useRAF = true; //request animation frame

}

function setupPhysics() {
	world = new box2d.b2World(new box2d.b2Vec2(0, 50), true); 

	// create ground
	var fixDef = new box2d.b2FixtureDef();
	fixDef.density = 1;
	fixDef.friction = 1;
	fixDef.restitution = 0;
	var bodyDef = new box2d.b2BodyDef();
	bodyDef.type = box2d.b2Body.b2_staticBody;
	bodyDef.position.x = 400 / SCALE;
	bodyDef.position.y = 600 / SCALE;
	fixDef.shape = new box2d.b2PolygonShape();
	fixDef.shape.SetAsBox(400 / SCALE, 20 / SCALE);
	world.CreateBody(bodyDef).CreateFixture(fixDef);

	// setup debug draw
	var debugDraw = new box2d.b2DebugDraw();
	debugDraw.SetSprite(debug.getContext('2d'));
	debugDraw.SetDrawScale(SCALE);
	debugDraw.SetFillAlpha(0.5);
	debugDraw.SetFlags(box2d.b2DebugDraw.e_shapeBit | box2d.b2DebugDraw.e_jointBit);
	world.SetDebugDraw(debugDraw);
}

function tick() {
	stage.update();
	world.DrawDebugData();
	world.Step(1/50, 10, 10); // framerate, physics step, position step
	world.ClearForces();
}

function createObject(x, y, width, height, rotation) {

	var fixDef = new box2d.b2FixtureDef();
	fixDef.density = 1;
	fixDef.friction = 0.5;
	fixDef.restitution = 0;
	var bodyDef = new box2d.b2BodyDef();
	bodyDef.type = box2d.b2Body.b2_staticBody;
	bodyDef.position.x = x / SCALE;
	bodyDef.position.y = y / SCALE;
	bodyDef.angle = rotation;
	fixDef.shape = new box2d.b2PolygonShape();
	fixDef.shape.SetAsBox(width / SCALE, height / SCALE);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
}

function setupListeners() {

	silo.on("click", handleMouseEvent);
	silo.on("mouseover", handleMouseEvent);
	silo.on("mouseout", handleMouseEvent);

}

function handleMouseEvent(evt) {

	switch(evt.type) {

		case 'click':
			// Set silo at new vector position
			silo.body.SetPosition(new box2d.b2Vec2(6.7, 11));

		case 'mouseover':
			// create a shadow object on the event target
			evt.target.shadow = new createjs.Shadow("#FFFFFF", 0, 0, 5);
			break;

		case 'mouseout':
			// set the shadow object to nothing on the event target
			evt.target.shadow = null;
			break;

	}

}

function createSeeds() {

	var amount = 200,
		count = 0,
		timeInMS = 10;

	// Create a seed object in an interval to avoid performance issues
	var interval = setInterval(function(){
		var seed = new Seed(280, 480);
		stage.addChild(seed.view);
		stage.setChildIndex(seed.view, 0);
		count++;
		if(count > amount) {
			clearInterval(interval);
		}
	}, timeInMS);
}
