
// include modules
const https = require('https');
module.exports = {
  getHome: async (req, res) => {
    try {

    const title = 'Strictly come dancing - Droid Edition'
      
    const API_URL = 'https://challenge.parkside-interactive.com/api/robots/'  
   
    // Generate two random ids for homepage avatars

    let firstRandomId = Math.ceil(Math.random() * 40)
    let secondRandomId = Math.ceil(Math.random() * 40)

    if (secondRandomId === firstRandomId){
	    secondRandomId = Math.ceil(Math.random() * 40)
	  }


    //-----------------------------------------------------------------------------
    ///
    /// Get the Robot Avatar based on the ID from the API
    ///
    /// @param randomId The ID of the robot 
    ///  @param url The URL of the API 
    /// @return None
    //

    function getRobotAvatar(randomId, url) {
      return new Promise((resolve, reject) => {
        https.get(url + randomId, response => {
          let data = "";
          response.on('data', chunk => {
            data += chunk;
        });
      response.on('end', () => {
        let avatarOne = JSON.parse(data).avatar;
        resolve(avatarOne);
      })

    }).end();
  });
}

(async() => {

  // Call function to get the robots' Avatar

  let avatarOne = await getRobotAvatar(firstRandomId, API_URL);
  let avatarTwo = await getRobotAvatar(secondRandomId, API_URL);

  res.render('index', {
    indexCSS: true,
    avatarOne,
    avatarTwo,
    title
  });
})();

} catch (error) {
     console.log(error);     
    }
  }
}

  