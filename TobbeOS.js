document.addEventListener("DOMContentLoaded", function () {
	const download = document.getElementById("DownloadBTN");

	download.addEventListener("click", downloadfromS);

	function downloadfromS() {
		fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://tobbeos.lysakermoen.com/'))
		.then(response => response.text())
		.then(html => {
		    const regex = /TobbeOS-(\d{4}\.\d{2}\.\d{2})-x86_64\.iso/g;
		    const matches = [...html.matchAll(regex)].map(match => match[0]);

		    if (matches.length === 0) {
			alert("No ISO files found.");
			return;
		    }

		    // Sort by date descending
		    matches.sort((a, b) => {
			const dateA = a.match(/\d{4}\.\d{2}\.\d{2}/)[0];
			const dateB = b.match(/\d{4}\.\d{2}\.\d{2}/)[0];
			return new Date(dateB) - new Date(dateA);
		    });

		    const latestFile = matches[0];
		    const downloadUrl = `https://tobbeos.lysakermoen.com/${latestFile}`;
		    window.location.href = downloadUrl;
		})
		.catch(err => {
		    console.error("Fetch failed:", err);
		    alert("Failed to load ISO list.");
		});
	}

	const overview = document.getElementById("Overview_TobbeOS");
	overview.addEventListener("click", TobbeOF_screenshot);

	function TobbeOF_screenshot() {
		const overview1 = document.getElementById("Overview_TobbeOS");
		const overlay = document.getElementById("Image_overlay");
		const closeOverlay = document.getElementById("close_overlay");

		overview1.addEventListener("click", () => {
			overlay.classList.remove("hidden");
		});

		closeOverlay.addEventListener("click", () => {
			overlay.classList.add("hidden");
		});
	}
	let currentSlide = 0;
	const slides = document.querySelectorAll('.slide');
	const prev = document.getElementById('prev');
	const next = document.getElementById('next');
	prev.addEventListener("click", () => changeSlide(-1));
	next.addEventListener("click", () => changeSlide(1));

	function showSlide(index) {
	  slides.forEach((slide, i) => {
	    slide.style.display = (i === index) ? 'block' : 'none';
	  });
	}
	function changeSlide(step) {
	  currentSlide = (currentSlide + step + slides.length) % slides.length;
	  showSlide(currentSlide);
	}

	// Auto-play (optional)
	setInterval(() => {
	  changeSlide(1);
	}, 4000); // 4 seconds

	// Initial display
	showSlide(currentSlide);
});
