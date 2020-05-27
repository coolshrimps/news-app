import React from "react";
import "../styles/FItem.css";
import { FaTrash } from 'react-icons/fa';
import ShareFItem from "./ShareFItem";
import {toast, ToastContainer} from "react-toastify";
import {Link} from "react-router-dom";
import Grid from '@material-ui/core/Grid';

export default class SItem extends React.Component {
    constructor() {
        super();
        this.state = {
            loaded:false,
        };
    }

    componentDidMount() {
        this.setStyle();
        this.setState({loaded: true});
    }

    setStyle = ()=>{
        const section=this.props.info.section;
        if(section === 'world'){
            this.setState({ ...this.state, color1:'#6666ff', font1:'white' });
        }
        else if(section === 'sport' || section === 'sports') {
            this.setState({ ...this.state, color1:'#ffcc00' , font1: 'black' });
        }
        else if(section === 'politics') {
            this.setState({ ...this.state, color1: '#008060', font1:'white' });
        }
        else if(section === 'technology') {
            this.setState({ ...this.state, color1: '#99cc00' , font1: 'black'});
        }
        else if(section === 'business') {
            this.setState({ ...this.state, color1:'#00a3cc', font1:'white'  });
        }
        else{
            this.setState({ ...this.state, color1:'gray', font1:'white' });
        }
        const type=this.props.info.type;
        if(type==='guardian'){
            this.setState({ ...this.state, color2:'darkblue', font2:'white' });
        }
        else {
            this.setState({ ...this.state, color2:'lightgray', font2:'black' });
        }
    }


    render() {
        return <Grid item xs={12} sm={6} md={6} lg={3}>
            <Link to={`/article?id=${this.props.info.id}`} style={{all: 'unset'}}>
                {this.state.loaded ?
                    <div className='content'>
                        <div className='title' >
                            {this.props.info.title}
                            <span><ShareFItem info={this.props.info}></ShareFItem></span>
                        </div>
                        <div className='img'><img src={this.props.info.image} alt=""/></div>
                        <div className='infoLine'>
                            <div className='date'>{this.props.info.date.substring(0, 10)}</div>
                            <div className='section' style={{
                                color: this.state.font1,
                                WebkitTextFillColor:this.state.font1,
                                background: this.state.color1
                            }}>{this.props.info.section}</div>
                        </div>
                    </div>
                    :
                    <div></div>
                }
            </Link>
        </Grid>

    }
}
