window.onload = function() {
	if (!sessionStorage.getItem("reloaded")) {
		 sessionStorage.setItem("reloaded", "true");
		 location.reload();
	}
};

document.addEventListener("DOMContentLoaded", function () {
	const download = document.getElementById("DownloadBTN");

	function showFilenameTooltip(filename, x, y) {
	    const tooltip = document.createElement('div');
	    tooltip.textContent = filename;
	    tooltip.style.position = 'absolute';
	    tooltip.style.left = `${x + 10}px`;
	    tooltip.style.top = `${y + 10}px`;
	    tooltip.style.background = '#333';
	    tooltip.style.color = '#fff';
	    tooltip.style.padding = '6px 10px';
	    tooltip.style.borderRadius = '6px';
	    tooltip.style.fontSize = '14px';
	    tooltip.style.zIndex = '1000';
	    tooltip.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
	    document.body.appendChild(tooltip);

	    // Auto-remove after 2 seconds
	    setTimeout(() => {
		tooltip.remove();
	    }, 1000);
	}
	
	let latestFile = null;
	let downloadUrl = null;
	async function downloadfromS() {
		return fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://tobbeos.lysakermoen.com/'))
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

	            latestFile = matches[0];
		    downloadUrl = `https://tobbeos.lysakermoen.com/${latestFile}`;
		})
		.catch(err => {
		    console.error("Fetch failed:", err);
		    alert("Failed to load ISO list.");
		});
	}

	download.addEventListener("click", async (event) => {
	    const down = event.button === 0;
	    await downloadfromS().then(() => {
		    if (down) {
			    window.location.href = downloadUrl;
		    }
	    });
	});
	download.addEventListener("mouseover", async (event) => {
	    await downloadfromS().then(() => {
		    showFilenameTooltip(latestFile, event.clientX, event.clientY);
	    });
	});

	const overview1 = document.getElementById("Overview_News");
	const overview2 = document.getElementById("Overview_TobbeOS");
	if (overview1) {
		overview1.addEventListener("click", TobbeOF_screenshot)
	}
	else {
		overview2.addEventListener("click", TobbeOF_screenshot)
	}

	function TobbeOF_screenshot() {
		const overviewInFunc = document.querySelectorAll(".slide");
		const overlay = document.getElementById("Image_overlay");
		const closeOverlay = document.getElementById("close_overlay");
		const overlayImage = overlay.querySelector("img");

		overviewInFunc.forEach(overviewInFunc => {
			overviewInFunc.addEventListener("click", () => {
				overlayImage.src = overviewInFunc.src;
				overlay.classList.remove("hidden");
			});
		});

		closeOverlay.addEventListener("click", () => {
			overlay.classList.add("hidden");
		});
	}
	let index = 0;
	let currentSlide = 0;
	const slides = document.querySelectorAll('.slide');
	const prev = document.getElementById('prev');
	const next = document.getElementById('next');
	if (prev || next) {
		prev.addEventListener("click", () => changeSlide(-1));
		next.addEventListener("click", () => changeSlide(1));
	}

	function showSlide(index) {
	  slides.forEach((slide, i) => {
	    slide.style.display = (i === index) ? 'block' : 'none';
	    });
	}
	function changeSlide(step) {
	  currentSlide = (currentSlide + step + slides.length) % slides.length;
	  showSlide(currentSlide);
	}

	setInterval(() => {
	  changeSlide(1);
	}, 10000);

	showSlide(currentSlide);
});
