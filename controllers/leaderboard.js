
// Include modules

const https = require('https');
module.exports = {
  getLeaderboard: async (req, res) => {
  try {
 const API_URL = 'https://challenge.parkside-interactive.com/api/danceoffs/populated/'   
  
 //-----------------------------------------------------------------------------
///
/// Get the Leaderboard Data from the API
///
/// @param url The URL of the API  
/// @return None
//  
  function getLeaderboardData(url) {
  return new Promise((resolve, reject) => {
    https.get(url, response => {
      let data = "";
      response.on('data', chunk => {
        data += chunk;
      });
      response.on('end', () => {
        let leaderboard = JSON.parse(data);
        resolve(leaderboard);
      })

    }).end();
  });


}

(async() => {
  let leaderboardData = await getLeaderboardData(API_URL);
  

  res.render('leaderboard', {
    indexCSS: true,
    leaderboardData
  });
})();

} catch (error) {
    return console.log(error)
  }  
    
  }

}

  