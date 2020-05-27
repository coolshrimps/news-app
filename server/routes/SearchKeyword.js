const express = require("express");
const fetch = require('node-fetch');
const router = express.Router();


router.get('/', (req,res,next) => {
    // console.log(req.query.id);
    keyword = req.query.q;
    console.log(keyword);
    apiUrl = "https://content.guardianapis.com/search?q="+keyword+"&api-key=75e35a60-47b2-4b47-a46b-4cc2f1fb28d5&show-blocks=all"
    console.log(apiUrl);
    fetch(apiUrl)
        .then(result => result.json())
        .then(json => {
            json = getData(json);
            // console.log(json);
            res.status(200).json(json)
        });
})

function getData(json){
    let results = json.response.results;
    let count = 0;
    let infoArray = [];
    for(let i = 0; i < results.length; i++) {
        if(!results[i].id){continue};
        if(!results[i].sectionId){continue};
        if(!results[i].webTitle){continue};
        if(!results[i].webPublicationDate){continue};
        if(!results[i].webUrl){continue};
        if(!results[i].blocks || !results[i].blocks.main || !results[i].blocks.main.elements[0] ||
            !results[i].blocks.main.elements[0].assets || results[i].blocks.main.elements[0].assets.length == 0) {
            infoArray[count]= {
                id:results[i].id,
                title :results[i].webTitle,
                url :results[i].webUrl,
                section: results[i].sectionId,
                date: results[i].webPublicationDate,
                source :'guardian',
                image :"https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png",
            }
        }
        else {
            const len = results[i].blocks.main.elements[0].assets.length;
            console.log(count, len);
            infoArray[count]= {
                id:results[i].id,
                title :results[i].webTitle,
                url :results[i].webUrl,
                section: results[i].sectionId,
                date: results[i].webPublicationDate,
                source :'guardian',
                image : results[i].blocks.main.elements[0].assets[len-1].file,
            }
        }
        count++;
    }
    return {'result': infoArray};
}


module.exports = router;