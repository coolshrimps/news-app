const express = require("express");
const fetch = require('node-fetch');
const router = express.Router();

router.get('/', (req,res,next) => {
    console.log(req.query.id);
    id = req.query.id;
    apiUrl = "https://content.guardianapis.com/"+ id +"?api-key=75e35a60-47b2-4b47-a46b-4cc2f1fb28d5&show-blocks=all";
    fetch(apiUrl)
        .then(result => result.json())
        .then(json => {
            json = getData(json, id);
            res.status(200).json(json)
        });
})

function getData(json, id){
    let results = json.response.content;
    const len = results.blocks.main.elements[0].assets.length;
    let infoArray = {};
    infoArray.title=results.webTitle;
    if(len === 0){
        infoArray.image="https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
    }
    else{
        infoArray.image=results.blocks.main.elements[0].assets[len-1].file;
    }
    infoArray.date=results.webPublicationDate;
    infoArray.des=results.blocks.body[0].bodyTextSummary;
    infoArray.type='guardian';
    infoArray.section=results.sectionId;
    infoArray.url="https://www.theguardian.com/" + id;
    return {'result': infoArray};
}

module.exports = router;