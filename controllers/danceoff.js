

const https = require('https');


 module.exports = {
   postDanceoff: async (req, res) => {
    //Handle input
    const { danceoffs, danceoffId} = req.body
   var opponents = danceoffId.split(",");
  

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
  
  
const danceoffsObject = { 
    danceoffs: opponentsPair.map((opponents, index) => ({ opponents, winner: winnerArray[index] })) 
}

console.log(danceoffsObject.danceoffs);
console.log(danceoffsObject);

    res.redirect('/leaderboard')
    }
    




 }



  