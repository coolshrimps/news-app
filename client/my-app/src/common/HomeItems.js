import React from "react";
import "../styles/Header.css";
import Item from "./Item.js";
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import 'x-dialog/lib/index.css';
import LoadingPage from "./LoadingPage";
import Header from "./Header";
import BACKEND_URL from "../constants";

export default class HomeItems extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ItemsInfo:{},
            loaded: false,
            news : localStorage.getItem('source'),
        };
        this.changeNews = this.changeNews.bind(this);
        this.saveGItems=this.saveGItems.bind(this);
    }

    componentDidMount() {
        const {match} = this.props;
        // console.log(match.path);
        if(match.path === '/') {
            this.url = BACKEND_URL+"/guardian/home";
        }
        else {
            console.log(match.path.substring(1, match.path.length));
            this.url = BACKEND_URL+"/guardian/"+ match.path.substring(1, match.path.length);
        }
        axios.get(this.url)
            .then(res => {
                const ItemsInfo = res.data;
                this.setState({ ItemsInfo: ItemsInfo}, this.saveGItems);
                this.setState({ ...this.state, loaded:true });
            });
    }

    saveGItems(){
        this.addItems = [];
        for(let i = 0; i < 10; i++) {
            this.addItems.push(<Item info={this.state.ItemsInfo.result[i]} key={i} type='guardian'/>);
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
            { this.state.loaded ?<div>

                <div className={'page'} >{this.addItems}</div>
                </div>
                : <LoadingPage></LoadingPage>}
        </div>
    }
}
