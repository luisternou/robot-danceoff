
// Include models


module.exports = {
  getLeaderboard: async (req, res) => {
    try {
      res.render('leaderboard', { indexCSS: true})
    } catch (err) {
      return console.log(err)
    }
  }

}

  