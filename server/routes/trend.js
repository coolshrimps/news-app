const express = require("express");
const fetch = require('node-fetch');
const router = express.Router();
const googleTrends = require('google-trends-api');

router.get('/', (req, res, next) => {
    // console.log(req.query.id);
    keyword = req.query.q;
    console.log(keyword);
    const searchObject = {
        keyword: keyword,
        startTime: new Date("June 1, 2019"),
    }

    googleTrends.interestOverTime(searchObject).then(function (results) {
        console.log(results, typeof results);
        //getPoint(results);
        res.status(200).json(JSON.parse(results));
        //res.status(200).json({"result":"ok"});
    })
        .catch(function (err) {
            console.log("error!");
            res.status(400).json({"response":"error"});
        });
    // fetch(apiUrl)
    //     .then(result => result.json())
    //     .then(json => {
    //         json = getData(json);
    //         res.status(200).json(json)
    //     });
})

// function getPoint(results){
//     results.
//
// }

module.exports = router;