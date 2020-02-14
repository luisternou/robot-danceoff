
// Include modules

const https = require('https');
 
module.exports = {
    getLeaderboard: async (req, res) => {

      try
      {
        let title = 'The Top King pins';
        let isNotAllowedToBeViewed = 0;
        const API_URL = 'https://challenge.parkside-interactive.com/api/danceoffs/populated/';

        let ref = req.headers.referer;

        let doesContain = /team|leaderboard/.test(ref);


        if ((ref === undefined) || (doesContain === false))
        {
            isNotAllowedToBeViewed = 1;
            title = 'No, you can\'t go here';
        }


       //-----------------------------------------------------------------------------
      ///
      /// Get the Leaderboard Data from the API
      ///
      /// @param url The URL of the API
      /// @return None
      //
      function getLeaderboardData(url)
      {
        return new Promise((resolve) =>
        {
          https.get(url, response =>
          {
            let data = "";
            response.on('data', chunk =>
            {
              data += chunk;
            });
          response.on('end', () =>
          {
            let leaderboard = JSON.parse(data);
            resolve(leaderboard);
          })

        }).end();
      });


    }

    (async() =>
    {
  
      let leaderboardData = await getLeaderboardData(API_URL);
  

       if (isNotAllowedToBeViewed === 0)
       {
          res.render('leaderboard',
              {
          indexCSS: true,
          leaderboardData,
          title
 
        });
       }
       else
           {
             res.render('forbidden', {
             title, errorCSS: true
             });
           }
      })();

  } catch (error)
      {
    return console.log(error)
      }

  }

};

  