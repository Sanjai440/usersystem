document.addEventListener("touchstart", function(e) {
    console.log("Touch Start", e.touches[0]);
});

document.addEventListener("touchend", function(e) {
    console.log("Touch End");
});