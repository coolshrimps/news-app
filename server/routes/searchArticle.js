const express = require("express");
const fetch = require('node-fetch');
const router = express.Router();

router.get('/', (req,res,next) => {
    console.log(req.query.id);
    id = req.query.id;
    console.log(id);
    let regex = /www.nytimes.com/g;
    let reg = id.match(regex);
    console.log(reg);
    if(reg == null){
        console.log('backend g');
        apiUrl = "https://content.guardianapis.com/"+ id +"?api-key=75e35a60-47b2-4b47-a46b-4cc2f1fb28d5&show-blocks=all";
        fetch(apiUrl)
            .then(result => result.json())
            .then(json => {
                json = getDataGuardian(json, id);
                res.status(200).json(json)
            });
    }
    else {
        console.log('backend n');
        apiUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:(\""+id+"\")&api-key=4MfAMTesv48XDl3msJSeo0I6v56f8m6n";
        fetch(apiUrl)
            .then(result => result.json())
            .then(json => {
                json = getDatanytimes(json, id);
                res.status(200).json(json)
            });
    }

})

function getDataGuardian(json, id){
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
    infoArray.id=id;
    return {'result': infoArray};
}

function getDatanytimes(json, id){
    let results =  json.response.docs[0];
    let infoArray = {};
    infoArray.title=results.headline.main;
    //Pick the first multimedia image with width atleast 2000.
    const multimedia = results.multimedia;
    infoArray.image = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
    for (let j = 0; j < multimedia.length; j++) {
        if(multimedia[j].width >= 2000) {
            infoArray.image='https://static01.nyt.com/' + multimedia[j].url;
            break;
        }
    }
    infoArray.date=results.pub_date;
    infoArray.des=results.abstract;
    infoArray.type='nytimes';
    infoArray.section=results.section_name.toLowerCase();
    // infoArray.url="https://www.nytimes.com/" + id +".html";
    infoArray.url=id;
    infoArray.id=id;
    return {'result': infoArray};
}


module.exports = router;