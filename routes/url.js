const express = require('express');
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');
const Url = require('../model/Url');

const router = express.Router();

router.post('/shorten', async (req, res) => {

  const { longUrl } = req.body;
  const baseUrl = config.get('baseUrl');

  if(!validUrl.isUri(baseUrl)){
    res.status(401).json("Invalid Url");
  }

  const urlCode = shortid.generate();

  if(validUrl.isUri(longUrl)){

    try {
      let url = await Url.findOne({longUrl});

      if(url){

        res.json(url);
      
      }else{

        let shortUrl = baseUrl + '/' + urlCode;

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date()
        });

        await url.save();

        res.json(url);
      }

    } catch (err) {
      console.error(err);
      res.status(500).json("Server error..");      
    }

  }else{
    res.status(401).json("Invalid long Url..");
  }

});

module.exports = router;