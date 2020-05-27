import React from "react";
import ShareItem from "./ShareItem";
import 'react-toastify/dist/ReactToastify.css';
import 'x-dialog/lib/index.css';
import { Link } from "react-router-dom";
import '../styles/Item.css'
import Truncate from "react-truncate";

export default class Item extends React.Component{
    constructor(){
        super();
        this.state = {
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount(){
        if(this.props.info.type === 'world'){
            this.setState({ ...this.state, type:'world', color:'#6666ff', font:'white' });
        }
        else if(this.props.info.type === 'sport' || this.props.info.type === 'sports') {
            this.setState({ ...this.state, type:'sports', color:'#ffcc00' , font: 'black' });
        }
        else if(this.props.info.type === 'politics') {
            this.setState({ ...this.state, type:'polotics', color: '#008060', font:'white' });
        }
        else if(this.props.info.type === 'technology') {
            this.setState({ ...this.state, type:'technology', color: '#99cc00' , font: 'black'});
        }
        else if(this.props.info.type === 'business') {
            this.setState({ ...this.state, type:'business',color:'#00a3cc', font:'white'  });
        }
        // else if(this.props.info.type === '') {
        //     this.setState({ ...this.state, color:  });
        // }
        else{
            this.setState({ ...this.state, type:this.props.info.type, color:'gray', font:'white' });
        }
    }

    handleClick() {
        console.log("click");
    }

    render(){
        return <Link to={`/article?id=${this.props.info.id}`} style={{all: 'unset'}}>
                <div className="newsItem" onClick={() => this.handleClick()}>
                    <div className="newsImg">
                        <img src={this.props.info.imgurl} alt=""/></div>
                    <div className="newsContent">
                        <span style={{display:'flex'}}>
                            <h1>{this.props.info.title}</h1>
                            <ShareItem type={this.props.type} id={this.props.info.id} content={this.props.info.title}></ShareItem>
                        </span>
                        <p className="des">{this.props.info.description}</p>
                        <div className="info">
                            <p style={{fontStyle:'italic', fontWeight:'bold'}}>{this.props.info.date.substring(0,10)}</p>
                            <p className="type"
                               style={{
                                   backgroundColor:this.state.color,
                                   color:this.state.font,
                                   WebkitTextFillColor: this.state.font,
                               }}>{this.state.type}</p>
                        </div>
                    </div>
                </div>
        </Link>;
    }
}
