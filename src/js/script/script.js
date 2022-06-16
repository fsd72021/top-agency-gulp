$(document).ready(function () {
	"use strict";

	let dropdowntoggle = $("header .hamburger-menu");
	let sideWidget = $(".side-widget");

	//toggle between menue and x in navbar
	dropdowntoggle.on("click", function () {
		sideWidget.toggleClass("active");

		if (sideWidget.hasClass("active")) {
			$(this).addClass("open");
		} else {
			$(this).removeClass("open");
		}
	});
	$("section").on("click", function () {
		if (sideWidget.hasClass("active")) {
			sideWidget.removeClass("active");
			dropdowntoggle.removeClass("open");
		}
	});

	//fixed header
	function removeClassFunc(selectorName, className) {
		$(selectorName).removeClass(className);
	}

	function addClassFunc(selectorName, className) {
		$(selectorName).addClass(className);
	}

	$(window).scroll(function () {
		let scroll = $(window).scrollTop();

		if (scroll > 1) {
			addClassFunc("header", "fixed");
		} else {
			removeClassFunc("header", "fixed");
		}

		$(".dropdown-menu").removeClass("show")
	});

	//to top button
	$(window).scroll(function () {
		if ($(this).scrollTop() >= 500) {
			$("#toTop").fadeIn(100);
		} else {
			$("#toTop").fadeOut(100);
		}
	});

	$("#toTop").click(function () {
		$("html, body").animate({
			scrollTop: 0
		}, 0);
	});

	//validate form
	(function () {
		//Fetch all the forms we want to apply custom Bootstrap validation styles to
		let forms = document.querySelectorAll(".needs-validation")

		//Loop over them and prevent submission
		Array.prototype.slice.call(forms)
			.forEach(function (form) {
				form.addEventListener("submit", function (event) {
					if (!form.checkValidity()) {
						event.preventDefault()
						event.stopPropagation()
					} else {
						event.preventDefault()
					}
					form.classList.add("was-validated")
				}, false)
			})
	})();

	//lazyload images
	$("img").Lazy({
		scrollDirection: "vertical",
		effect: "fadeIn",
		visibleOnly: false,
	});

	$(".testimonials-carousel").owlCarousel({
		loop: true,
		autoplay: true,
		autoplayTimeout: 3000,
		items: 2,
		nav: true,
		dots: false,
		rtl: true,
		margin: 20,
		navText: ["<i class='fa-solid fa-arrow-right'></i>", "<i class='fa-solid fa-arrow-left'></i>"],
		responsive: {
			0: {
				items: 1,
				nav: false,
				dots: true,
			},
			575: {
				items: 1,
			},
			768: {
				items: 1,
			},

			992: {
				items: 1,
			},
			1199: {
				items: 2,
			}
		}
	});

	// AOS.init({
	// 	duration: 1000,
	// });
});

$(window).on("load", function () {
	// $('.preloader').delay(500).slideUp(300);
});