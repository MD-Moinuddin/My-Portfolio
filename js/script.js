$(document).ready(function() {
	$('#slides').superslides({
		animation: 'fade',
		play: 5000,
	});

	var typed = new Typed(".typed", {
		strings: ["Graduated from Computer Science", "UI/UX Engineer", "Software Engineer(Front End)", "Web Designer"],
		typeSpeed: 60,
		startDelay: 1000,
		showCursor: false,
		loop: true
	});

	$('.owl-carousel').owlCarousel({
		rtl:true,
	    loop:true,
	    nav: true,
	    items: 4,
	    responsive:{
	        0:{
	            items:1
	        },
	        480:{
	            items:1
	        },
	        768:{
	            items:2
	        },
	        938:{
	            items:3
	        }
	    }
	});

	

    var skillsTopOffset = $(".skills-section").offset().top;
    
    $(window).scroll(function(){
    	if (window.pageYOffset > skillsTopOffset - $(window).height() + 200) {
    		$('.chart').easyPieChart({
		        easing: 'easeInOut',
		        barColor: '#fff',
		        trackColor: false,
		        scaleColor: false,
		        size: '152',
		        onStep: function(from, to, percent) {
		        	$(this.el).find('.percent').text(Math.round(percent));
		        }
		    });
    	}
    });
});