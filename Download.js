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

	    setTimeout(() => {
		tooltip.remove();
	    }, 1000);
	}
	
	let latestFile = null;
	let downloadUrl = null;
	async function downloadfromS() {
		return fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://tobbeos.lysakermoen.com/iso/'))
		.then(response => response.json())
		.then(data => {
		    const html = data.contents;
		    const regex = /TobbeOS-(\d{4}\.\d{2}\.\d{2})-x86_64\.iso/g;
		    const matches = [...html.matchAll(regex)].map(match => match[0]);

		    if (matches.length === 0) {
			alert("No ISO files found.");
			return;
		    }

		    matches.sort((a, b) => {
			const dateA = a.match(/\d{4}\.\d{2}\.\d{2}/)[0];
			const dateB = b.match(/\d{4}\.\d{2}\.\d{2}/)[0];
			return new Date(dateB) - new Date(dateA);
		    });

	            latestFile = matches[0];
		    downloadUrl = `https://tobbeos.lysakermoen.com/iso/${latestFile}`;
		})
		.catch(err => {
		    console.error("Fetch failed:", err);
		    alert("Failed to load ISO list.");
		});
	}
	async function downloadHandle() {
		await downloadfromS()
		window.location.href = downloadUrl;
	}
	async function tooltipHandle(event) {
		await downloadfromS();
		showFilenameTooltip(latestFile, event.clientX, event.clientY);
	}

	download.addEventListener("click", downloadHandle);
	download.addEventListener("mouseover", tooltipHandle);
});
