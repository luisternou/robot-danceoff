module.exports = {
    getStartCompetition: async (req, res) => {
    try {
      res.render('startCompetition', { indexCSS: true})
    } catch (err) {
      return console.log(err)
    }
  }
}

  