import React from "react";
import "../styles/Header.css";
import Item from "./Item.js";
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import 'x-dialog/lib/index.css';
import LoadingPage from "./LoadingPage";
import Header from "./Header";
import BACKEND_URL from "../constants";

export default class HomeItemsny extends React.Component{
    constructor(props){
        super(props);
        this.url = "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=4MfAMTesv48XDl3msJSeo0I6v56f8m6n";
        this.state = {
            ItemsInfo:{},
            loaded: false,
            news : localStorage.getItem('source'),
        };
        this.changeNews = this.changeNews.bind(this);
    }

    componentDidMount() {
        localStorage.setItem('loc', 'page');
        const {match, location} = this.props;
        if(match.path === '/') {
            this.url = BACKEND_URL+"/nytimes/home";
        }
        else {
            const path = match.path.substring(1, match.path.length);
            if(path === "sport") {
                this.url = BACKEND_URL+"/nytimes/sport";
            } else {
                this.url = BACKEND_URL+"/nytimes/" + path;
            }
        }
        axios.get(this.url)
            .then(res => {
                const ItemsInfo = res.data;
                this.setState({ ...this.state, ItemsInfo:ItemsInfo}, this.saveGItems);
                this.setState({ ...this.state, loaded:true });
            });
    }

    saveGItems=()=>{
        this.addItems = [];
        for(let i = 0; i < 10; i++) {
            this.addItems.push(<Item info={this.state.ItemsInfo.result[i]} key={i} type="nytimes" />);
        }
    }

    style={
        width:"100%",
    };

    changeNews(news) {
        this.setState({
            ...this.state,
            news: news,
        });
        localStorage.setItem('source',news);
    }

    render(){
        return <div style={this.style}>
            <Header newsFrom={this.props.newsFrom} setNews={this.props.setNews}></Header>
            { this.state.loaded ?  <div>
                <div className={'page'} >{this.addItems}</div>
            </div> : <LoadingPage></LoadingPage>}
        </div>
    }
}
