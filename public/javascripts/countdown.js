let timeleft = 5;
var redirectTimer = setInterval(function(){
  document.getElementById("countdown").innerHTML = " If you are not redirected in " + timeleft + " seconds";
  timeleft -= 1;
  if(timeleft <= 0){
    clearInterval(redirectTimer);
    document.getElementById("countdown").innerHTML = "If you are not redirected in " + timeleft + " seconds"
  }
}, 1000);