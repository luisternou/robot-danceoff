window.onload = function() {
  let firstRandomId = Math.ceil(Math.random() * 40)
let secondRandomId = Math.ceil(Math.random() * 40)

if (secondRandomId === firstRandomId){
	secondRandomId = Math.ceil(Math.random() * 40)
	}

let baseURL = 'https://challenge.parkside-interactive.com/api';
let firstRobot = document.getElementById('firstRobot');
let secondRobot = document.getElementById('secondRobot');
$.ajax({
  url: baseURL + '/robots/' + firstRandomId,
  method: 'GET'
}).then(function(data) {
	firstRobot.src = data.avatar
});

$.ajax({
  url: baseURL + '/robots/' + secondRandomId,
  method: 'GET'
}).then(function(data) {
	secondRobot.src = data.avatar
});
}