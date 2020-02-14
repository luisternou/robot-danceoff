// get 404 page
module.exports = {
  getError: (req, res) => {
    const title = 'Eish, it\'s broken';
    res.render('error', {title ,errorCSS: true })
  }
};