
// Include models

const https = require('https');
module.exports = {
  getLeaderboard: async (req, res) => {
    
      function getLeaderboardData() {
  return new Promise((resolve, reject) => {
    https.get('https://challenge.parkside-interactive.com/api/danceoffs/populated/', response => {
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
  let leaderboardData = await getLeaderboardData();
  

  res.render('leaderboard', {
    indexCSS: true,
    leaderboardData
  });
})();
    
  }

}

  