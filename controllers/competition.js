
// Include models


module.exports = {
  getTeams: async (req, res) => {
    try {
      query = req.query
      res.render('competition', { indexCSS: true, query})
    } catch (err) {
      return console.log(err)
    }
  }

}

  