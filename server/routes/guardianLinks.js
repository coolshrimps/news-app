const express = require("express");
const fetch = require('node-fetch');
const router = express.Router();

const links = {
    'home': "https://content.guardianapis.com/search?api-key=75e35a60-47b2-4b47-a46b-4cc2f1fb28d5&section=(sport|business|technology|politics)&show-blocks=all&page-size=20",
    'sport':"https://content.guardianapis.com/search?api-key=75e35a60-47b2-4b47-a46b-4cc2f1fb28d5&section=sport&show-blocks=all&page-size=20",
    'world':"https://content.guardianapis.com/search?api-key=75e35a60-47b2-4b47-a46b-4cc2f1fb28d5&section=world&show-blocks=all&page-size=20",
    'business':"https://content.guardianapis.com/search?api-key=75e35a60-47b2-4b47-a46b-4cc2f1fb28d5&section=business&show-blocks=all&page-size=20",
    'politics':"https://content.guardianapis.com/search?api-key=75e35a60-47b2-4b47-a46b-4cc2f1fb28d5&section=politics&show-blocks=all&page-size=20",
    'technology':'https://content.guardianapis.com/search?api-key=75e35a60-47b2-4b47-a46b-4cc2f1fb28d5&section=technology&show-blocks=all&page-size=20',
    'science':'https://content.guardianapis.com/search?api-key=75e35a60-47b2-4b47-a46b-4cc2f1fb28d5&section=science&show-blocks=all&page-size=20'
}

router.get('/:section', (req,res,next) => {
    const section = req.params.section;
    const apiUrl = links[section];
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
    for(let i = 0; i < 20; i++) {
        if(count === 10) {
            break;
        }
        else {
            if(!results[i].blocks || !results[i].blocks.main || !results[i].blocks.main.elements[0] ||
                !results[i].blocks.main.elements[0].assets || !results[i].blocks || !results[i].blocks.body) {
                console.log('ccc');
                continue;
            }
            else {
                const len = results[i].blocks.main.elements[0].assets.length;
                if(results[i].webTitle && results[i].sectionId
                    && results[i].webPublicationDate && results[i].blocks.body[0].bodyTextSummary
                    && len > 0 && results[i].blocks.main.elements[0].assets[len-1].file) {
                    infoArray[count]= {
                        id: results[i].id,
                        url:results[i].id,
                        title: results[i].webTitle,
                        type: results[i].sectionId,
                        date: results[i].webPublicationDate,
                        description: results[i].blocks.body[0].bodyTextSummary,
                        imgurl:results[i].blocks.main.elements[0].assets[len-1].file,
                        source:'guardian',
                    }
                    count++;
                }
                else if(results[i].webTitle && results[i].sectionId
                    && results[i].webPublicationDate && results[i].blocks.body[0].bodyTextSummary){
                    infoArray[count]= {
                        id: results[i].id,
                        url:results[i].id,
                        title: results[i].webTitle,
                        type: results[i].sectionId,
                        date: results[i].webPublicationDate,
                        description: results[i].blocks.body[0].bodyTextSummary,
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