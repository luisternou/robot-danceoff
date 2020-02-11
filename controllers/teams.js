
// Include models
 
const https = require('https');
module.exports = {
  getTeams: async (req, res) => {


let query = req.query

let teamOneName = query.teamOne;
let teamTwoName = query.teamTwo;
 

 
 


   function getUniqueRandomValues(exclusion) {
  // By definition, values inside of a Set are unique
  const randomArray = new Set();

  do {
    let randomValue = Math.floor(Math.random() * 40) + 1;
    // If the exclusion rule is satisfied push the new value in the random array
    if (!exclusion.length || !exclusion.includes(randomValue)) {
      randomArray.add(randomValue);
    }
  } while (randomArray.size < 10);

  console.log(randomArray);
  

  return Array.from(randomArray);
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
  if (robots[robot].experience > 11) {
    tooExpierienced.push(robots[robot].id)
  }
  
}

let excludedRobots = brokenRobots.concat(tooExpierienced);
console.log("wrong " + excludedRobots);

let robotIds = getUniqueRandomValues(excludedRobots)


let teamOneExperience = 0;
let teamTwoExperience = 0;

let teamOne = []
for (let index = 0; index < 5; index++) {
  teamOne[index] = robots[robotIds[index] - 1]
  teamOneExperience += robots[robotIds[index] - 1].experience;
  
}

teamOne.teamName = teamOneName;
teamOne.experience = teamOneExperience;

let teamTwo = [];
for (let index = 5; index < 10; index++) {
   teamTwo[index] = robots[robotIds[index] - 1];
   teamTwoExperience += robots[robotIds[index] - 1].experience;
  
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

console.log(teamOne[0]);


  res.render('teams', {
    indexCSS: true,
    teamOne,
    teamTwo,
    danceoffCompetetors
    
    
  });
})();
   
  }

}

  

