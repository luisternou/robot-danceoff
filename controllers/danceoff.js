

const https = require('https');
module.exports = {
  postDanceoff: async (req, res) => {
    try {
       
   
    // Get Post body
    const { danceoffId} = req.body;
    let opponents = danceoffId.split(",");
    let intOpponents = opponents.map(function (y) {
      return parseInt(y, 10);
    });
    opponents = intOpponents;

    //-----------------------------------------------------------------------------
    ///
    /// Creates an Array whereby each element is in a pair
    ///
    /// @param array The Flat Array
    ///  @param url The URL of the API 
    /// @return pairArray The Array where each element is paired up 
    //
    function pairOpponents(array) {
      let temp = array.slice();
      let pairArray = [];

      while (temp.length) {
        pairArray.push(temp.splice(0,2));
      }

      return pairArray;
    }
    let opponentsPair = pairOpponents(opponents);

  
    let winnerArray = [];

    // create array of winners which are chosen at random
 
    for (let index = 0; index < opponentsPair.length; index++) {
      winnerArray[index] = opponentsPair[index][Math.floor(Math.random() * opponentsPair[index].length)] 
  }

    // Convert every element in the Array to an Integer
    let winnerInt = winnerArray.map(function (x) {
      return parseInt(x, 10); 
    });
    winnerArray = winnerInt;


  
    // Convert and combine arrays to the form of Dance-off model

    let danceoffsObject = { 
      danceoffs: opponentsPair.map((opponents, index) => ({ opponents, winner: winnerArray[index] })) 
    };
    danceoffsObject = JSON.stringify(danceoffsObject);

    // Config for Post Request
    const options = {
    hostname: 'challenge.parkside-interactive.com',
    port: 443,
    path: '/api/danceoffs',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': danceoffsObject.length
      }
    };

    // Post request of Danceoffs 

    const postRequest = https.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on('data', (d) => {
      process.stdout.write(d)
      })
    });

    postRequest.on('error', (error) => {
      console.error(error)
  });

    postRequest.write(danceoffsObject);
    postRequest.end();


    res.redirect(301, '/leaderboard');
    res.status(200).json({
      status: 'succes',
      data: req.body,
    })
    } catch (error) {
       return console.log(error)
    }
  }

 };



  