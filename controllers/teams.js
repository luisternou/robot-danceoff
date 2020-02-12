

 // Include modules

const https = require('https');
module.exports = {
  getTeams: async (req, res) => {
try {
  
const EXPERIENCE_TOO_HIGH = 11
const ARRAY_LENGTH = 10
const HALF_ARRAY = ARRAY_LENGTH/2


let query = req.query

let teamOneName = query.teamOne;
let teamTwoName = query.teamTwo;
 

 
 

//-----------------------------------------------------------------------------
///
/// Create A List of Robot IDs that can be used
///
/// @param exclusionList The List of Robots that are not allowed 
/// @return Array of Random Robot IDs
//  
   function getRandomRobotIds(exclusionList) {
    
  
  const RANDOM_ROBOT_IDS = new Set();

  do {
    let randomRobot = Math.floor(Math.random() * 40) + 1;
    // As long as the exclusion rule is not violated, add the value to the Array
    if (!exclusionList.length || !exclusionList.includes(randomRobot)) {
      RANDOM_ROBOT_IDS.add(randomRobot);
    }
  } while (RANDOM_ROBOT_IDS.size < ARRAY_LENGTH);

  return Array.from(RANDOM_ROBOT_IDS);
}

   // NOTE TO SELF If there would be higher amount of robots consider 
   // getting robots individually, rather than getting all robots
    
//-----------------------------------------------------------------------------
///
/// Get all robots from the Array
///
/// @param None
/// @return None
// 
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

//-----------------------------------------------------------------------------
///
/// Shuffle Elements in an array
///
/// @param array the orriginal array
/// @return shuffled array
// 
function shuffle(array) {
    var j, x, i;
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
    }
    return array;
}
   //-----------------------------------------------------------------------------
///
/// Shuffle Elements in an array
///
/// @param the orriginal array
/// @return shuffled array
//

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

// Get all robots that are out of order

for (let robot = 0; robot < robots.length; robot++) {
  if (robots[robot].outOfOrder === true) {
    brokenRobots.push(robots[robot].id)
  }
  
}

// Get all robots that have a too high level of experience

for (let robot = 0; robot < robots.length; robot++) {
  if (robots[robot].experience > EXPERIENCE_TOO_HIGH ) {
    tooExpierienced.push(robots[robot].id)
  }
  
}

// Concatenate brokenRobots and tooExperience into one Array

let excludedRobots = brokenRobots.concat(tooExpierienced);


let robotIds = getRandomRobotIds(excludedRobots)

// Create Team one with its total experience

let teamOneExperience = 0;
let teamTwoExperience = 0;

let teamOne = []
for (let index = 0; index < HALF_ARRAY; index++) {
  teamOne[index] = robots[robotIds[index] - 1]
  teamOneExperience += robots[robotIds[index] - 1].experience;
  
}
// Assign a Name to Team One
teamOne.teamName = teamOneName;
teamOne.experience = teamOneExperience;
// Create Team two with its total experience

let teamTwo = [];
for (let index = HALF_ARRAY; index < ARRAY_LENGTH; index++) {
   teamTwo[index] = robots[robotIds[index] - 1];
   teamTwoExperience += robots[robotIds[index] - 1].experience;
  
}

// Assign a Name to Team One

teamTwo.teamName = teamTwoName;
teamTwo.experience = teamTwoExperience;
let teamTwoIds = [];
let teamOneIds = [];

// Get the Ids of each Team Member
for (let robot = 0; robot < HALF_ARRAY; robot++) {
  teamOneIds[robot] = teamOne[robot].id
  
}
for (let robot = HALF_ARRAY; robot < teamTwo.length; robot++) {
  teamTwoIds[robot - HALF_ARRAY] = teamTwo[robot].id
}


// Randomize Robot order

teamOneIds = shuffle(teamOneIds);
teamTwoIds = shuffle(teamTwoIds);


// Pair up opponents

let danceoffCompetetors = interleave(teamOneIds, teamTwoIds)


let danceoffId = "";

for (let index = 0; index < danceoffCompetetors.length; index++) {
  danceoffId += danceoffCompetetors[index]
  
}




  res.render('teams', {
    indexCSS: true,
    teamOne,
    teamTwo,
    danceoffCompetetors
    
    
  });
})();

} catch (error) {
  return console.log(error);
}
   
  }

}

  

