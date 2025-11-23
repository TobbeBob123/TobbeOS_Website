window.onload = function() {
	if (!sessionStorage.getItem("reloaded")) {
		 sessionStorage.setItem("reloaded", "true");
		 location.reload();
	}
};

document.addEventListener("DOMContentLoaded", function () {
	const mirrorSite = document.getElementById("mirrorNav");
	function mirrorPage() {
		window.location.href = 'https://tobbeos.lysakermoen.com/iso/';
	}
	if (mirrorSite) {
		mirrorSite.addEventListener("click", mirrorPage);
	}
	const overview1 = document.getElementById("Overview_News");
	const overview2 = document.getElementById("Overview_TobbeOS");
	if (overview1) {
		overview1.addEventListener("click", TobbeOF_screenshot)
	}
	else if (overview2) {
		overview2.addEventListener("click", TobbeOF_screenshot)
	}

	function TobbeOF_screenshot() {
		const overviewInFunc = document.querySelectorAll<HTMLImageElement>(".slide");
		const overlay = document.getElementById("Image_overlay");
		const closeOverlay = document.getElementById("close_overlay");
		let overlayImage: HTMLImageElement | null = null;
		if (overlay) {
			overlayImage = overlay.querySelector("img");
		}

		overviewInFunc.forEach(img => {
			img.addEventListener("click", () => {
				if (!overlayImage || !overlay) return;
				overlayImage.src = img.src;
				overlay.classList.remove("hidden");
			});
		});

		if (!overlay || !closeOverlay) return;
		closeOverlay.addEventListener("click", () => {
			overlay.classList.add("hidden");
		});
	}
	let currentSlide = 0;
	const slides = document.querySelectorAll<HTMLImageElement>('.slide');

	function showSlide(index: number) {
		  slides.forEach((slide, i) => {
		    slide.style.display = (i === index) ? 'block' : 'none';
		    });
	}
	function changeSlide(step: number) {
	  currentSlide = (currentSlide + step + slides.length) % slides.length;
	  showSlide(currentSlide);
	}

	setInterval(() => {
	  changeSlide(1);
	}, 10000);

	showSlide(currentSlide);

});
