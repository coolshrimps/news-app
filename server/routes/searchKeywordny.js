const express = require("express");
const fetch = require('node-fetch');
const router = express.Router();


router.get('/', (req,res,next) => {
    // console.log(req.query.id);
    keyword = req.query.q;
    console.log(keyword);
    apiUrl="https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+keyword+"&api-key=4MfAMTesv48XDl3msJSeo0I6v56f8m6n";
    // apiUrl = "https://content.guardianapis.com/search?q="+keyword+"&api-key=75e35a60-47b2-4b47-a46b-4cc2f1fb28d5&show-blocks=all"
    console.log(apiUrl);
    fetch(apiUrl)
        .then(result => result.json())
        .then(json => {
            json = getData(json);
            res.status(200).json(json)
        });
})

function getData(json){
    let infoArray = [];
    if(!json || !json.response){
        return {'result': infoArray};
    }
    let results = json.response.docs;
    let count = 0;
    for(let i = 0; i < results.length; i++) {
        if(!results[i].headline || !results[i].headline.main
            || !results[i].multimedia || !results[i].pub_date || results[i].multimedia.length == 0
            || !results[i].news_desk) {
            continue;
        }
        else {
            const multimedia = results[i].multimedia;
            let imgurl = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
            for (let j = 0; j < multimedia.length; j++) {
                if(multimedia[j].width >= 2000) {
                    imgurl='https://static01.nyt.com/'+multimedia[j].url;
                    break;
                }
            }
            infoArray[count]= {
                id:results[i].web_url,
                url:results[i].web_url,
                title: results[i].headline.main,
                section: results[i].news_desk,
                date: results[i].pub_date,
                image: imgurl,
                source:'nytimes'
            }
            count++;
        }
    }
    return {'result': infoArray};
}


module.exports = router;