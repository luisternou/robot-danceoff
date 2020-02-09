
// Include models


module.exports = {
  getTeams: async (req, res) => {

    let robotIds = []

    for (let index = 0; index < 10; index++) {
      let currentNumber = Math.ceil(Math.random() * 40)
      if (robotIds.includes(currentNumber)) {
        currentNumber = Math.ceil(Math.random() * 40)
      }
      robotIds[index] = currentNumber
    
      
    }
    
    function getRobot(id) {
  return new Promise((resolve, reject) => {
    https.get('https://challenge.parkside-interactive.com/api/robots/' + id, response => {
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

    
   
      query = req.query

      let teamOne = []

      teamTwo = []
      res.render('competition', { indexCSS: true, query, teamOne, teamTwo})
   
  }

}

  


  // for (let index = 0; index < 5; index++) {
  //   teamOne[index] = await getRobot(robotIds[index])
    
  // }

  //   for (let index = 5; index < 9; index++) {
  //   teamTwo[index] = await getRobot(robotIds[index])
    
  // }