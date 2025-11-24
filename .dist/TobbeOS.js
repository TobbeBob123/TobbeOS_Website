window.onload = function () {
    if (!sessionStorage.getItem("reloaded")) {
        sessionStorage.setItem("reloaded", "true");
        location.reload();
    }
};
let slides;
$(() => {
    $('#Overview_News').on('click', TobbeOF_screenshot);
    $('#Overview_TobbeOS').on('click', TobbeOF_screenshot);
    $('#mirrorNav').on('click', function () {
        window.location.href = 'https://tobbeos.lysakermoen.com/iso/';
    });
    slides = document.querySelectorAll('.slide');
    showSlide(currentSlide);
    $('#DownloadBTN').on('click', downloadHandle);
    $('#DownloadBTN').on('mouseover', tooltipHandle);
});
function TobbeOF_screenshot() {
    const overviewInFunc = document.querySelectorAll(".slide");
    const overlay = document.getElementById("Image_overlay");
    const closeOverlay = document.getElementById("close_overlay");
    let overlayImage = null;
    if (overlay) {
        overlayImage = overlay.querySelector("img");
    }
    overviewInFunc.forEach(img => {
        img.addEventListener("click", () => {
            if (!overlayImage || !overlay)
                return;
            overlayImage.src = img.src;
            overlay.classList.remove("hidden");
        });
    });
    if (!overlay || !closeOverlay)
        return;
    closeOverlay.addEventListener("click", () => {
        overlay.classList.add("hidden");
    });
}
let currentSlide = 0;
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
    const url = 'https://tobbeos.lysakermoen.com/iso/';
    $.get(url)
        .done(function (html) {
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
            return new Date(dateB[0]).getTime() - new Date(dateA[0]).getTime();
        });
        latestFile = matches[0];
        downloadUrl = `https://tobbeos.lysakermoen.com/iso/${latestFile}`;
    })
        .fail(function (textStatus, error) {
        console.log('Request failed: ', textStatus, error);
    });
}
async function downloadHandle() {
    await downloadfromS();
    window.location.href = downloadUrl;
}
async function tooltipHandle(event) {
    await downloadfromS();
    if (latestFile) {
        showFilenameTooltip(latestFile, event.clientX, event.clientY);
    }
}
