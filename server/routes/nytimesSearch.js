const express = require("express");
const fetch = require('node-fetch');
const router = express.Router();

router.get('/', (req,res,next) => {
    console.log(req.query.id);
    id = req.query.id;
    apiUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:(\"https://www.nytimes.com/"+ id +".html\")&api-key=4MfAMTesv48XDl3msJSeo0I6v56f8m6n";
    // apiUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:(\"https://www.nytimes.com/2020/04/04/us/coronavirus-china-travel-restrictions.html\")&api-key=4MfAMTesv48XDl3msJSeo0I6v56f8m6n";
    fetch(apiUrl)
        .then(result => result.json())
        .then(json => {
            json = getData(json, id);
            res.status(200).json(json)
        });
})

function getData(json, id){
    let results =  json.response.docs[0];
    let infoArray = {};
    infoArray.title=results.headline.main;
    //Pick the first multimedia image with width atleast 2000.
    const multimedia = results.multimedia;
    infoArray.image = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
    for (let j = 0; j < multimedia.length; j++) {
        if(multimedia[j].width >= 2000) {
            infoArray.image='https://static01.nyt.com/'+multimedia[j].url;
            break;
        }
    }
    infoArray.date=results.pub_date;
    infoArray.des=results.abstract;
    infoArray.type='nytimes';
    infoArray.section=results.section_name.toLowerCase();
    infoArray.url="https://www.nytimes.com/" + id +".html";
    return {'result': infoArray};
}

module.exports = router;