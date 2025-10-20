var element = document.getElementById("blockclock-container");

var isFullscreen = false

document.addEventListener('click',function(){
  if (!isFullscreen) {
    activateFullscreen()
    isFullscreen = true
  } else {
    deactivateFullscreen()
    isFullscreen = false
  }
})

document.addEventListener("fullscreenchange", function () {
    // Code to run when full-screen status changes
    if (document.fullscreenElement) {
      console.log("Entered fullscreen mode")
    } else {
        console.log("Exited fullscreen mode");
    }
});

function activateFullscreen() {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
      // Firefox
      element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
      // Chrome, Safari and Opera
      element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
      // Internet Explorer
      element.msRequestFullscreen();
  }
}

function deactivateFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
      // Firefox
      document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
      // Chrome, Safari and Opera
      document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
      // Internet Explorer
      document.msExitFullscreen();
  }
}