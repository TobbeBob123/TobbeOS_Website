"use strict";
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
    let latestFile = '';
    let downloadUrl = '';
    async function downloadfromS() {
        try {
            const res = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://tobbeos.lysakermoen.com/iso/'));
            const data = res.json();
            data.then(html => {
                html = html.contents;
                const regex = /TobbeOS-(\d{4}\.\d{2}\.\d{2})-x86_64\.iso/g;
                const matches = [...html.matchAll(regex)].map(match => match[0]);
                if (matches.length === 0) {
                    alert("No ISO files found.");
                    console.log(matches);
                    return;
                }
                matches.sort((a, b) => {
                    const dateA = a.match(/\d{4}\.\d{2}\.\d{2}/);
                    const dateB = b.match(/\d{4}\.\d{2}\.\d{2}/);
                    if (!dateA || !dateB)
                        return 0;
                    const parsedA = new Date(dateA[0].replace(/\./g, '-'));
                    const parsedB = new Date(dateB[0].replace(/\./g, '-'));
                    return parsedB.getTime() - parsedA.getTime();
                });
                latestFile = matches[0];
                downloadUrl = `https://tobbeos.lysakermoen.com/iso/${latestFile}`;
            }).catch(err => {
                console.log(err);
            });
        }
        catch (err) {
            console.error("Fetch failed:", err);
            alert("Failed to load ISO list.");
        }
        ;
    }
    async function downloadHandle() {
        await downloadfromS();
        window.location.href = downloadUrl;
    }
    async function tooltipHandle(event) {
        await downloadfromS();
        showFilenameTooltip(latestFile, event.clientX, event.clientY);
    }
    if (download) {
        download.addEventListener("click", downloadHandle);
        download.addEventListener("mouseover", tooltipHandle);
    }
});
