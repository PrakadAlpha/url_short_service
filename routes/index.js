const express = require('express');
const router = express.Router();
const Url = require('../model/Url');

router.get('/:code', async (req, res) => {

  let urlCode = req.params.code;

try {

  let url = await Url.findOne({urlCode});
  
  if(url)
    res.redirect(url.longUrl);
  else
    res.status(404).json("Link not Found");

} catch (error) {
  console.error(error);
  res.status(500).json("Server Error");
}

  

});



module.exports = router;