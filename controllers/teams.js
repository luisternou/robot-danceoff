
// Include models
 
const https = require('https');
module.exports = {
  getTeams: async (req, res) => {


let query = req.query

let teamOneName = query.teamOne;
let teamTwoName = query.teamTwo;
 
 
    let robotIds = []

    function getRobotIds(outoforder, tooExpierienced) {
      let robotIds = []
      for (let index = 0; index < 10; index++) {
      let currentNumber = Math.ceil(Math.random() * 40)
      if (robotIds.includes(currentNumber) | outoforder.includes(currentNumber) | tooExpierienced.includes(currentNumber)) {
        currentNumber = Math.ceil(Math.random() * 40)
      }
      if (tooExpierienced.includes(currentNumber)) {
        currentNumber = Math.ceil(Math.random() * 40)
      }
       if (outoforder.includes(currentNumber)) {
        currentNumber = Math.ceil(Math.random() * 40)
      }
      robotIds[index] = currentNumber
    
      
      }
      return robotIds
    }

   // If there would be higher amount of robots consider getting robots individually 
   //rather than getting all robots
    
    function getRobots() {
  return new Promise((resolve, reject) => {
    https.get('https://challenge.parkside-interactive.com/api/robots/' , response => {
      let data = "";
      response.on('data', chunk => {
        data += chunk;
      });
      response.on('end', () => {
        let robot = JSON.parse(data);
        resolve(robot);
      })

    }).end();
  });


}


function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
   

   function interleave (arr, arr2) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        newArr.push(arr[i], arr2[i]);
    }
    
    return newArr;
};
 
 

    
(async() => {



let robots = await getRobots();

let brokenRobots = [];
let tooExpierienced = [];

for (let robot = 0; robot < robots.length; robot++) {
  if (robots[robot].outOfOrder === true) {
    brokenRobots.push(robots[robot].id)
  }
  
}


for (let robot = 0; robot < robots.length; robot++) {
  if (robots[robot].experience > 10) {
    tooExpierienced.push(robots[robot].id)
  }
  
}

console.log(brokenRobots)
console.log(tooExpierienced)

let robotIds = getRobotIds(brokenRobots, tooExpierienced)
let teamOneExperience = 0;
let teamTwoExperience = 0;

let teamOne = []
for (let index = 0; index < 5; index++) {
  teamOne[index] = robots[robotIds[index]]
  teamOneExperience += robots[robotIds[index]].experience;
  
}

teamOne.teamName = teamOneName;
teamOne.experience = teamOneExperience;

let teamTwo = [];
for (let index = 5; index < 10; index++) {
   teamTwo[index] = robots[robotIds[index]];
   teamTwoExperience += robots[robotIds[index]].experience;
  
}


teamTwo.teamName = teamTwoName;
teamTwo.experience = teamTwoExperience;
let teamTwoIds = [];
let teamOneIds = [];

for (let robot = 5; robot < teamTwo.length; robot++) {
  teamTwoIds[robot - 5] = teamTwo[robot].id
  
  
}
for (let robot = 0; robot < teamTwo.length - 5; robot++) {
  teamOneIds[robot] = teamOne[robot].id
  
  
}

teamOneIds = shuffle(teamOneIds);
teamTwoIds = shuffle(teamTwoIds);



let danceoffCompetetors = interleave(teamOneIds, teamTwoIds)


let danceoffId = "";

for (let index = 0; index < danceoffCompetetors.length; index++) {
  danceoffId += danceoffCompetetors[index]
  
}



  res.render('teams', {
    indexCSS: true,
    teamOne,
    query,
    teamTwo,
    danceoffCompetetors
    
    
  });
})();
   
  }

}

  

