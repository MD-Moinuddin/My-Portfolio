$(document).ready(function() {
	$('#slides').superslides({
		animation: 'fade',
		play: 5000,
	});

	var typed = new Typed(".typed", {
		strings: ["Doing masters in International Software System Science", "Software Engineer(Front End)", "UI/UX Engineer", "Web Designer"],
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
	            items:2
	        },
	        768:{
	            items:3
	        },
	        938:{
	            items:4
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