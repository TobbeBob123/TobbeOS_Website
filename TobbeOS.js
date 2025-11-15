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
	mirrorSite.addEventListener("click", mirrorPage);
});
