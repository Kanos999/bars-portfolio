$( document ).ready(function() {
    console.log("ready!");

	typeWriter("#sub1", "Shoot me an email:", 40);
	setTimeout(function() {
		typeWriter("#sub2", "business@kanejackson.com", 40);
	}, 1200);

	setTimeout(function() {
		typeWriter("#sub3", "Or, get in touch through LinkedIn", 40);
	}, 3500);

});
