(function(window){

	function Silo(x, y) {
		this.view = new createjs.Bitmap("images/silo_lg.png");
		// this.view.regX = 75
		// this.view.regY = 79; // 150x158 png image

		var fixDef = new box2d.b2FixtureDef();
		fixDef.density = 10.0;
		fixDef.friction = 0.5;
		fixDef.restitution = 0;
		var bodyDef = new box2d.b2BodyDef();
		bodyDef.type = box2d.b2Body.b2_staticBody;
		bodyDef.position.x = x / SCALE;
		bodyDef.position.y = y / SCALE;
		this.view.body = world.CreateBody(bodyDef);

		fixDef.shape = new box2d.b2PolygonShape();
		fixDef.shape.SetAsOrientedBox(35 / SCALE, 5 / SCALE, new box2d.b2Vec2(110 / SCALE, 25 / SCALE), 0.39);
		this.view.body.CreateFixture(fixDef);

		fixDef.shape = new box2d.b2PolygonShape();
		fixDef.shape.SetAsOrientedBox(35 / SCALE, 5 / SCALE, new box2d.b2Vec2(40 / SCALE, 25 / SCALE), 2.80);
		this.view.body.CreateFixture(fixDef);

		fixDef.shape = new box2d.b2PolygonShape();
		fixDef.shape.SetAsOrientedBox(5 / SCALE, 60 / SCALE, new box2d.b2Vec2(10 / SCALE, 90 / SCALE), 0);
		this.view.body.CreateFixture(fixDef);

		fixDef.shape = new box2d.b2PolygonShape();
		fixDef.shape.SetAsOrientedBox(5 / SCALE, 60 / SCALE, new box2d.b2Vec2(140 / SCALE, 90 / SCALE), 0);
		this.view.body.CreateFixture(fixDef);

		//this.view.onTick = tick;
		this.view.on('tick', tick, this.view);
	}

	function tick(e) {
		
		this.x = this.body.GetPosition().x * SCALE;
		this.y = this.body.GetPosition().y * SCALE;
		this.rotation = this.body.GetAngle() * (180/Math.PI); // radians to degrees
	}

	window.Silo = Silo;

})(window);
