
// Include models


module.exports = {
  getHome: async (req, res) => {
    try {
      res.render('index', { indexCSS: true})
    } catch (err) {
      return console.log(err)
    }
  }

}

  