

const https = require('https');


 module.exports = {
   postDanceoff: async (req, res) => {

     try {
       
   
 
    const { danceoffs, danceoffId} = req.body
   var opponents = danceoffId.split(",");
  
  let test = opponents.map(function (y) {
  return parseInt(y, 10);
})
opponents = test;


    function pairOpponents(array) {
  var temp = array.slice();
  var pairArray = [];

  while (temp.length) {
    pairArray.push(temp.splice(0,2));
  }

  return pairArray;
}
    let opponentsPair = pairOpponents(opponents);

  
  let winnerArray = [];
 
 for (let index = 0; index < opponentsPair.length; index++) {
   winnerArray[index] = opponentsPair[index][Math.floor(Math.random() * opponentsPair[index].length)]
  
   
  }

let result = winnerArray.map(function (x) { 
  return parseInt(x, 10); 
});
winnerArray = result;


  
  
let danceoffsObject = { 
    danceoffs: opponentsPair.map((opponents, index) => ({ opponents, winner: winnerArray[index] })) 
}
 danceoffsObject = JSON.stringify(danceoffsObject)

const options = {
  hostname: 'challenge.parkside-interactive.com',
  port: 443,
  path: '/api/danceoffs',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': danceoffsObject.length
  }
}


const postRequest = https.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', (d) => {
    process.stdout.write(d)
  })
})

postRequest.on('error', (error) => {
  console.error(error)
})

postRequest.write(danceoffsObject)
postRequest.end()

console.log(danceoffsObject);

    res.redirect('/leaderboard');
      } catch (error) {
       return console.log(error)
     }
    }
    




 }



  