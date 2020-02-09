

 const https = require('https');
let avatarOne = "";
module.exports = {
  getHome: async (req, res) => {
   

let firstRandomId = Math.ceil(Math.random() * 40)
let secondRandomId = Math.ceil(Math.random() * 40)

if (secondRandomId === firstRandomId){
	  secondRandomId = Math.ceil(Math.random() * 40)
	}


function getRobotAvatar(randomId) {
  return new Promise((resolve, reject) => {
    https.get('https://challenge.parkside-interactive.com/api/robots/' + randomId, response => {
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
  let avatarOne = await getRobotAvatar(firstRandomId);
  let avatarTwo = await getRobotAvatar(secondRandomId);

  res.render('index', {
    indexCSS: true,
    avatarOne,
    avatarTwo
  });
})();

  }

}

  