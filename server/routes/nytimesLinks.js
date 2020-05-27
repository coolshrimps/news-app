const express = require("express");
const fetch = require('node-fetch');
const router = express.Router();

const links = {
    'home': "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=4MfAMTesv48XDl3msJSeo0I6v56f8m6n",
    'sport':"https://api.nytimes.com/svc/topstories/v2/sports.json?api-key=4MfAMTesv48XDl3msJSeo0I6v56f8m6n",
    'world':"https://api.nytimes.com/svc/topstories/v2/world.json?api-key=4MfAMTesv48XDl3msJSeo0I6v56f8m6n",
    'business':"https://api.nytimes.com/svc/topstories/v2/business.json?api-key=4MfAMTesv48XDl3msJSeo0I6v56f8m6n",
    'politics':"https://api.nytimes.com/svc/topstories/v2/politics.json?api-key=4MfAMTesv48XDl3msJSeo0I6v56f8m6n",
    'technology':'https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=4MfAMTesv48XDl3msJSeo0I6v56f8m6n'
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
    let results = json.results;
    let count = 0;
    let infoArray = [];
    for(let i = 0; i < 20; i++) {
        if(count === 10) {
            break;
        }
        else {
            //https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg
            if(results[i].title && results[i].section
                && results[i].published_date && results[i].abstract && results[i].multimedia) {
                const multimedia = results[i].multimedia;
                let imgurl = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
                for (let j = 0; j < multimedia.length; j++) {
                    if(multimedia[j].width >= 2000) {
                        imgurl=multimedia[j].url;
                        break;
                    }
                }
                infoArray[count]= {
                    // id:results[i].url.substring(24,results[i].url.length-5),
                    id:results[i].url,
                    // url:results[i].webUrl,
                    url:results[i].url,
                    title: results[i].title,
                    type: results[i].section,
                    date: results[i].published_date,
                    description: results[i].abstract,
                    imgurl: imgurl,
                    source:'nytimes'
                }
                console.log(infoArray[count])
                count++;
            }
        }
    }

    return {'result': infoArray};
}

module.exports = router;