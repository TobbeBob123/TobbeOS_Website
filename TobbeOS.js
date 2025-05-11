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
});
