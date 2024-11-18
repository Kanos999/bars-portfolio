function typeWriter(element, text, delay) {
	let tmp = $(element).text() + "|";
	for (let i = 0; i < text.length; i++) {
		setTimeout(() => {
			tmp = tmp.slice(0,-1) + text[i] + "|";
			$(element).text(tmp);
		}, delay * i);
	}
	setTimeout(() => {
		tmp = tmp.slice(0,-1);
		$(element).text(tmp);
	}, delay * (text.length + 6));
}

var backgroundBars = []
let isMobile = false;

function setup() {
	let newHeight = windowHeight;
	if (newHeight < $(".main").height() + 380) newHeight = $(".main").height() + 380;
	$(".segment").css({"top":newHeight});
	createCanvas(windowWidth, newHeight);
	background(20);

	backgroundBars = generateBackground();

	if (navigator.userAgent.match(/Android/i)
         || navigator.userAgent.match(/webOS/i)
         || navigator.userAgent.match(/iPhone/i)
         || navigator.userAgent.match(/iPad/i)
         || navigator.userAgent.match(/iPod/i)
         || navigator.userAgent.match(/BlackBerry/i)
         || navigator.userAgent.match(/Windows Phone/i)) {
            isMobile = true ;
						
         }
}
  
function draw() {
	
	if (!isMobile) updateBackground(backgroundBars);	
}


function windowResized() {
	let newHeight = windowHeight;
	if (newHeight < $(".main").height() + 380) newHeight = $(".main").height() + 380;
	resizeCanvas(windowWidth, newHeight);
	$(".belowMain").css({"top":newHeight});
}

function generateBackground() {
	var bars = []
	for(var i = 0; i < 200; i++) {
		bars.push({
			id: i,
			w: random(),
			h: random(),
			x: random() * 2 * width - 0.5 * width,
			y: random() * 2 * height - 0.5 * height,
			color: random()*10
		});
	}
	return bars;
}

function updateBackground(bars) {
	background(16, 25, 45);
	bars.forEach(bar => {
		let a = noise(bar.color);
		//52, 152, 219
		let c = color(14*a+12, 21*a+18, 39*a+33);
		fill(c);
		noStroke();
		rect(
			noise(bar.x) * 2 * width - 0.5 * width, 
			noise(bar.y) * 2 * height - 0.5 * height, 
			bar.w * 200 + 80, 
			bar.h * 15 + 10,
			10
		);
		bar.x += 0.0006;
	});
	return bars;
}