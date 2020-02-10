

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

  console.log(opponentsPair);
  
 
 for (let index = 0; index < opponentsPair.length; index++) {
   var winner = opponentsPair[index][Math.floor(Math.random() * opponentsPair[index].length)]
   console.log(winner);
   
  }
   
    res.redirect('/leaderboard')
    }
    




 }



  