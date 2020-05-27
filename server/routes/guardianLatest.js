const express = require("express");
const fetch = require('node-fetch');
const router = express.Router();

const links = "https://content.guardianapis.com/search?order-by=newest&show-fields=starRating,headline,thumbnail,short-url&api-key=75e35a60-47b2-4b47-a46b-4cc2f1fb28d5";

router.get('/', (req,res,next) => {
    const apiUrl = links;
    fetch(apiUrl)
        .then(result => result.json())
        .then(json => {
            json = getData(json);
            res.status(200).json(json)
        });
})


function getData(json){
    let results = json.response.results;
    let count = 0;
    let infoArray = [];
    for(let i = 0; i < 10; i++) {
        if(count === 10) {
            break;
        }
        else {
            if(!results[i].webTitle || !results[i].webPublicationDate || !results[i].sectionName ||
                !results[i].id) {
                console.log('ccc');
                continue;
            }
            else {
                if(results[i].fields && results[i].fields.thumbnail) {
                    infoArray[count]= {
                        id: results[i].id,
                        url:results[i].id,
                        title: results[i].webTitle,
                        type: results[i].sectionName,
                        date: results[i].webPublicationDate,
                        description: "",
                        imgurl:results[i].fields.thumbnail,
                        source:'guardian',
                    }
                    count++;
                }
                else {
                    infoArray[count]= {
                        id: results[i].id,
                        url:results[i].id,
                        title: results[i].webTitle,
                        type: results[i].sectionName,
                        date: results[i].webPublicationDate,
                        description: "",
                        imgurl:"https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png",
                        source:'guardian',
                    }
                    count++;
                }
            }
        }
    }
    return {'result': infoArray};
}


module.exports = router;