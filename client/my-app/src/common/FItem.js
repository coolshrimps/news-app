import React from "react";
import "../styles/FItem.css";
import { FaTrash } from 'react-icons/fa';
import ShareFItem from "./ShareFItem";
import {toast, ToastContainer} from "react-toastify";
import {Link} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Truncate from "react-truncate";

export default class FItem extends React.Component {
    constructor() {
        super();
        this.state = {
            loaded:false,
            truncated: false,
        };
        this.handleTruncate = this.handleTruncate.bind(this);
        this.handleTrashClick = this.handleTrashClick.bind(this);
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

    handleClick(){
        console.log('click');
    }

    handleTrashClick = (e) => {
        const title = this.props.info.title;
        this.props.pnotify(title);
        e.preventDefault();
        this.props.removeTrash(title);
    }

    handleTruncate(truncated) {
        if (this.state.truncated !== truncated) {
            this.setState({
                truncated
            });
        }
    }

    render() {
        const { truncated } = this.state;
        return <Grid item xs={12} sm={6} md={6} lg={3}>
            <Link to={`/article?id=${this.props.info.id}`} style={{all: 'unset'}}>
                <ToastContainer position="top-center" hideProgressBar={true} className='toastBar'/>
                {this.state.loaded ?
                    // <Link to={`/article?id=${this.props.info.id}`} style={{all: 'unset'}}>
                    <div className='content'>
                        <div className='title' >
                            <Truncate lines={2} ellipsis={
                                <span >... <ShareFItem info={this.props.info} ></ShareFItem>
                                    <FaTrash onClick={this.handleTrashClick}></FaTrash>
                                </span>}
                                      onTruncate={this.handleTruncate}>
                                {this.props.info.title}
                            </Truncate>
                            {!truncated && (
                                <span>
                                    <ShareFItem info={this.props.info}></ShareFItem>
                                    <FaTrash onClick={this.handleTrashClick}></FaTrash>
                                </span>
                            )}
                        </div>
                        <div className='img'><img src={this.props.info.image} alt=""/></div>
                        <div className='infoLine'>
                            <div className='date'>{this.props.info.date.substring(0, 10)}</div>
                            <div className='section' style={{
                                color: this.state.font1,
                                WebkitTextFillColor:this.state.font1,
                                background: this.state.color1
                            }}>{this.props.info.section}</div>
                            <div className='section' style={{
                                color: this.state.font2,
                                WebkitTextFillColor:this.state.font2,
                                background: this.state.color2
                            }}>{this.props.info.type}</div>
                        </div>
                    </div>
                    :
                    <div></div>
                }
            </Link>
            </Grid>

    }
}
