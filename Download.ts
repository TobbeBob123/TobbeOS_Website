document.addEventListener("DOMContentLoaded", function () {
	const download = document.getElementById("DownloadBTN");
	function showFilenameTooltip(filename: string,  x: number, y: number) {
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

	let latestFile = '';
	let downloadUrl = '';
	async function downloadfromS() {
	     return await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://tobbeos.lysakermoen.com/iso/'))
		.then(res => res.json())
		.then((data: { contents: string }) => {
		    const html: string = data.contents;
		    const regex = /TobbeOS-(\d{4}\.\d{2}\.\d{2})-x86_64\.iso/g;
		    const matches: string[] = [...html.matchAll(regex)].map(match => match[0]);

		    if (matches.length === 0) {
			alert("No ISO files found.");
			console.log(matches);
			return;
		    }

		    matches.sort((a: string, b: string) => {
			const dateA = a.match(/\d{4}\.\d{2}\.\d{2}/)![0];
			const dateB = b.match(/\d{4}\.\d{2}\.\d{2}/)![0];
			return new Date(dateB).getTime() - new Date(dateA).getTime()
		    });

		    latestFile = matches[0];
		    downloadUrl = `https://tobbeos.lysakermoen.com/iso/${latestFile}`;
		}).catch(err => {
			console.log(err);
		});
	}
	async function downloadHandle() {
		await downloadfromS()
		window.location.href = downloadUrl;
	}
	async function tooltipHandle(event: MouseEvent) {
		await downloadfromS();
		if (latestFile) {
			showFilenameTooltip(latestFile, event.clientX, event.clientY);
		}
	}
	if (download) {
		download.addEventListener("click", downloadHandle);
		download.addEventListener("mouseover", tooltipHandle);
	}
});
