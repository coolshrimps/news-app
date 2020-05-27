import React from "react";
import "../styles/Header.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Header";
import ShareItem from "./ShareItem";
import HomeItems from "./HomeItems";
import HomeItemsny from "./HomeItemsny";
import FavoriteItems from "./FavoriteItems";
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';
import LoadingPage from "./LoadingPage";
import ExpandItem from "./ExpandItem";
import ExpandItemny  from "./ExpandItemny";
import SearchItems from "./SearchItems";
import SearchItemsny from "./SearchItemsny";


export default class WholePage extends React.Component{
    constructor(){
        super();
        this.state = {
            news : localStorage.getItem('source'),
        };
        this.changeNews = this.changeNews.bind(this);
    }



    changeNews(news) {
        this.setState({
            ...this.state,
            news: news,
        });
        localStorage.setItem('source',news);
        console.log(this.state.news);
    }

    style={
        width:'100%',
        height:'100%'

    }

    render(){
        return  <div style={this.style}>
                        <BrowserRouter>
                            <Switch>
                                {this.state.news === 'Guardian' ?
                                    <Route path="/" render={(props)=><HomeItems {...props} newsFrom={this.state.news} setNews={this.changeNews}/>} exact/>
                                    :
                                    <Route path="/" render={(props)=><HomeItemsny {...props} newsFrom={this.state.news} setNews={this.changeNews}/>} exact/> }
                                {this.state.news === 'Guardian' ?
                                    <Route path="/world" render={(props)=><HomeItems {...props} newsFrom={this.state.news} setNews={this.changeNews}/>} exact/>
                                    :
                                    <Route path="/world" render={(props)=><HomeItemsny {...props} newsFrom={this.state.news} setNews={this.changeNews}/>} exact/>}
                                {this.state.news === 'Guardian' ?
                                    <Route path="/politics" render={(props)=><HomeItems {...props} newsFrom={this.state.news} setNews={this.changeNews}/>} exact/>
                                    :
                                    <Route path="/politics" render={(props)=><HomeItemsny {...props} newsFrom={this.state.news} setNews={this.changeNews}/>} exact/> }
                                {this.state.news === 'Guardian' ?
                                    <Route path="/business" render={(props)=><HomeItems {...props} newsFrom={this.state.news} setNews={this.changeNews}/>} exact/>
                                    :
                                    <Route path="/business" render={(props)=><HomeItemsny {...props} newsFrom={this.state.news} setNews={this.changeNews}/>} exact/> }
                                {this.state.news === 'Guardian' ?
                                    <Route path="/technology" render={(props)=><HomeItems {...props} newsFrom={this.state.news} setNews={this.changeNews}/>} exact/>
                                    :
                                    <Route path="/technology" render={(props)=><HomeItemsny {...props} newsFrom={this.state.news} setNews={this.changeNews}/>} exact/> }
                                {this.state.news === 'Guardian' ?
                                    <Route path="/sport" render={(props)=><HomeItems {...props} newsFrom={this.state.news} setNews={this.changeNews}/>} exact/>
                                    :
                                    <Route path="/sport" render={(props)=><HomeItemsny {...props} newsFrom={this.state.news} setNews={this.changeNews}/>} exact/> }
                                <Route path="/#Home" component={ExpandItem}/>
                                <Route path="/article" component={ExpandItem}/>
                                <Route path="/favorites" component={FavoriteItems}/>
                                {this.state.news === 'Guardian' ?
                                    <Route path="/search" component={SearchItems} /> :  <Route path="/search" component={SearchItemsny} /> }
                            </Switch>
                        </BrowserRouter>
                    </div>
    }
}