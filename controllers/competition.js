
// Include models
 
const https = require('https');
module.exports = {
  getTeams: async (req, res) => {
console.log(req.query);

let query = req.query

 
 
    let robotIds = []

    function getRobotIds(outoforder) {
      let robotIds = []
      for (let index = 0; index < 10; index++) {
      let currentNumber = Math.ceil(Math.random() * 40)
      if (robotIds.includes(currentNumber) | outoforder.includes(currentNumber) ) {
        currentNumber = Math.ceil(Math.random() * 40)
      }
      robotIds[index] = currentNumber
    
      
      }
      return robotIds
    }

   
    
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



   
 
 

    
(async() => {



let robots = await getRobots();

let brokenRobots = [];

for (let robot = 0; robot < robots.length; robot++) {
  if (robots[robot].outOfOrder === true) {
    brokenRobots.push(robots[robot].id)
  }
  
}

console.log(brokenRobots)

let robotIds = getRobotIds(brokenRobots)

let teamOne = []
for (let index = 0; index < 5; index++) {
  teamOne[index] = robots[robotIds[index]]
  
}



let teamTwo = [];
for (let index = 5; index < 10; index++) {
   teamTwo[index] = robots[robotIds[index]];
  
}


  
  
  res.render('competition', {
    indexCSS: true,
    teamOne,
    query,
    teamTwo
    
    
  });
})();
   
  }

}

  

