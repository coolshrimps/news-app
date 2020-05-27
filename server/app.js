const express = require("express");
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const guardianLinks = require('./routes/guardianLinks');
const nytimesLinks = require('./routes/nytimesLinks');
// const guardianSearch = require('./routes/guardianSearch');
// const nytimesSearch = require('./routes/nytimesSearch');
const searchArticle = require('./routes/searchArticle');
const searchKeyword = require('./routes/SearchKeyword');
const searchKeywordny = require('./routes/searchKeywordny');
const trend = require('./routes/trend');
const guardianLatest = require('./routes/guardianLatest');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


app.use('/guardian',guardianLinks);
app.use('/nytimes',nytimesLinks);
// app.use('/search/guardian', guardianSearch);
// app.use('/search/nytimes', nytimesSearch);
app.use('/article', searchArticle);
app.use('/searchGuardian', searchKeyword);
app.use('/searchNytimes', searchKeywordny);
app.use('/trend', trend);
app.use('/latest', guardianLatest);

app.use((req,res,next)=> {
    const error = new Error("Not found");
    error.status=404;
    next(error);
})

app.use((error, req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    })
})
module.exports = app;