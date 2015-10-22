(function(window){

	function Seed(x, y) {
		this.view = new createjs.Bitmap("images/seed.png");
		this.view.regX = this.view.regY = 5; // 50x50 png image

		var fixDef = new box2d.b2FixtureDef();
		fixDef.density = 1.0;
		fixDef.friction = 5;
		fixDef.restitution = 0.1;
		var bodyDef = new box2d.b2BodyDef();
		bodyDef.type = box2d.b2Body.b2_dynamicBody;
		bodyDef.position.x = x / SCALE;
		bodyDef.position.y = y / SCALE;
		fixDef.shape = new box2d.b2CircleShape(3.8 / SCALE);
		this.view.body = world.CreateBody(bodyDef);
		this.view.body.CreateFixture(fixDef);
		this.view.on('tick', tick, this.view);
	}

	function tick(e) {
		this.x = this.body.GetPosition().x * SCALE;
		this.y = this.body.GetPosition().y * SCALE;
		this.rotation = this.body.GetAngle() * (180/Math.PI); // radians to degrees
	}

	window.Seed = Seed;

})(window);