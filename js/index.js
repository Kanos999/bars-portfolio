
$( document ).ready(function() {
	console.log("ready!");

	let isMobile = false;
	if (navigator.userAgent.match(/Android/i)
			|| navigator.userAgent.match(/webOS/i)
			|| navigator.userAgent.match(/iPhone/i)
			|| navigator.userAgent.match(/iPad/i)
			|| navigator.userAgent.match(/iPod/i)
			|| navigator.userAgent.match(/BlackBerry/i)
			|| navigator.userAgent.match(/Windows Phone/i)) {
				isMobile = true ;
				window.location.replace("./mobile/index.html");
			}

	typeWriter("#landingTitle", "Hi! I'm Kane", 80);
	setTimeout(function() {
		typeWriter("#sub1", "// I like to do stuff and make things", 40);
	}, 1500);
	setTimeout(function() {
		typeWriter("#sub2", "// Mechatronics / Computer Science, UNSW", 40);
	}, 3500);

	let titlesLoaded = {
		about: {
			loaded: false,
			text: "About me",
			selector: "#aboutTitle"
		},
		projects: {
			loaded: false,
			text: "Projects / Portfolio",
			selector: "#projectsTitle"
		},
		skills: {
			loaded: false,
			text: "Skills",
			selector: "#skillsTitle"
		},
		contact: {
			loaded: false,
			text: "Get in touch!",
			selector: "#contactTitle"
		}
	}


	let sections = $('.section'); //.offset().top;

	let pageScrollIntervals = [];

	for (let i = 0; i < sections.length; i++) {
		pageScrollIntervals.push({
			id: sections[i].id,
			offset: $(`#${sections[i].id}`).offset().top
		});
	}

	updateMenuSelection();


	$(".navigationItem").click((event) => {
		let currentItem = $(event.target)

		$('html, body').animate({
			scrollTop: $(currentItem.attr("section")).offset().top - 80
		}, 400, 'swing', updateMenuSelection);
	});

	$(window).scroll(() => {
		throttle(updateMenuSelection(), 800);
	});

	function updateMenuSelection() {
		pageScrollIntervals.forEach((section) => {
			if ( $(window).scrollTop() >= section.offset - 260) {
				$(".navigationItem").removeClass("selected");
				$(`[section='#${section.id}']`).addClass("selected");

				if (section.id in titlesLoaded) {
					if (titlesLoaded[section.id].loaded === false) {
						console.log(titlesLoaded[section.id].text);
						titlesLoaded[section.id].loaded = true;
						typeWriter(titlesLoaded[section.id].selector, titlesLoaded[section.id].text, 80);
					}
				}
				//typeWriter("#landingTitle", "Hi! I'm Kane", 80);
			}
		});
	}

	// Throttling the scroll for better performance
	function throttle(fn, wait) {
		var time = Date.now();
		return () => {
			if ((time + wait - Date.now()) < 0) {
				fn();
				time = Date.now();
			}
		}
	}

	///////////////////////////////////////////////////
	//
	// Email contact
	//
	emailjs.init('auEZ9YqZNL9QIWVVW');
	document.getElementById('contact-form').addEventListener('submit', function(event) {
		event.preventDefault();
		// generate a five digit number for the contact_number variable
		this.contact_number.value = Math.random() * 100000 | 0;
		if (this.user_name.value == "" || this.user_email == "" || this.message == "") {
			$("#submitButton").addClass("red");
			return;
		}
		// these IDs from the previous steps
		emailjs.sendForm('service_hwtx6yl', 'template_tpudjv6', this)
			.then(function() {
				$("#submitButton").removeClass("red");
				$("#submitButton").addClass("green");
				document.getElementById('contact-form').removeEventListener('submit');
			}, function(error) {
				$("#submitButton").removeClass("green");
				$("#submitButton").addClass("red");
			});
	});


	///////////////////////////////////////////////////
	//
	// Word Cloud
	//
	const myTags = [
		'JavaScript', 'CSS', 'HTML',
		'C', 'C++', 'React',
		'Python', 'git', 'Node.js', 'OpenCV',
		'MySQL', 'jQuery', 'AngularJS'
	];
	if (!isMobile) {
		var tagCloud = TagCloud('.skillsCloud', myTags,{

			// radius in px
			radius: 300,
		
			maxSpeed: 'mid',
			initSpeed: 'mid',
		
			direction: 135,
		
			// interact with cursor move on mouse out
			keep: true
		
		}); 
	}
});
