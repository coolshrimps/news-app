import React from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'x-dialog/lib/index.css';
import LoadingPage from "./LoadingPage";
import '../styles/ExpandItem.css';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import Tooltip from '@material-ui/core/Tooltip';
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    TwitterIcon,
    TwitterShareButton
} from "react-share";
import Comment from "./Comment";
import BACKEND_URL from "../constants";

window.scrollTo({top: 0, left: 0, behavior: 'smooth' });

export default class ExpandItemny extends React.Component{
    constructor(){
        super();
        this.state = {
            loaded: false,
            expand: false,
            favorite: false,
        };
        this.handleClickExpand=this.handleClickExpand.bind(this);
        this.handleClickPack=this.handleClickPack.bind(this);
        this.myRef = React.createRef();
        this.checkFavorite=this.checkFavorite.bind(this);
    }

    handleClickPack(){
        this.setState({...this.state, expand: false});
    }

    handleClickExpand(ref){
        this.setState({...this.state, expand: true});
        ref.current.scrollIntoView({behavior: 'smooth'})
    }

    checkFavorite(){
        const favorites = JSON.parse(localStorage.getItem('favorites'));
        if(!favorites || favorites.length===0) {
            return;
        }
        for(var i = 0; i<favorites.length; i++) {
            if(favorites[i].title === this.state.info.title) {
                this.setState({ ...this.state, favorite:true });
                return;
            }
        }
        this.setState({ ...this.state, favorite:false });
    }

    componentDidMount() {
        const {location} = this.props;
        this.url=BACKEND_URL+"/search/nytimes?id="+location.search.substring(4);
        // this.url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:(\"https://www.nytimes.com/"+ location.search.substring(4) +".html\")&api-key=4MfAMTesv48XDl3msJSeo0I6v56f8m6n";
        axios.get(this.url)
            .then(res => {
                const ItemInfo  = res.data.result;
                console.log(ItemInfo);
                this.setState({ ...this.state, info: ItemInfo});
                // this.saveItems();
                this.checkFavorite();
                this.setState({ ...this.state, loaded:true });
            });
    }


    notify = () => {
        if(this.state.favorite){
            toast("Removing " + this.state.info.title, {
                toastId: 13,
                autoClose: 2000,
                className:'toast-success-container' ,
            });
            this.setState({favorite: false}, this.unsaveNews);
        }
        else{
            toast("Saving " + this.state.info.title, {
                toastId: 13,
                autoClose: 2000,
                className:'toast-success-container' ,
            });
            this.setState({favorite: true}, this.saveNews);
        }
    }

    unsaveNews= () => {
        const favorites = JSON.parse(localStorage.getItem('favorites'));
        const index = favorites.indexOf(this.state.info);
        favorites.splice(index, 1);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    saveNews= () => {
        const favorites = JSON.parse(localStorage.getItem('favorites'));
        if(!favorites){
            const newfavorites=[];
            newfavorites.push(this.state.info);
            localStorage.setItem('favorites', JSON.stringify(newfavorites));
        }
        else {
            favorites.push(this.state.info);
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
        console.log(localStorage);
    }

    render() {
        return <div>
            {this.state.loaded ?
                <div>
                <div className='expand'>
                    <h1 className='expandTitle'>{this.state.info.title}</h1>
                    <div className='infoLine1'>
                        <div className='date1'>{this.state.info.date.substring(0,10)}</div>
                        <div className='iconBar1'>
                            <Tooltip title='FaceBook' placement='top' arrow>
                                <FacebookShareButton hashtag="#Kun_Shi_NewsApp" url={this.state.info.url} className='shareIcon1' ><FacebookIcon size={30} round={true}></FacebookIcon></FacebookShareButton>
                            </Tooltip>
                            <Tooltip title='Twitter' placement='top' arrow>
                                <TwitterShareButton hashtags={this.tag} url={this.state.info.url} className='shareIcon1'><TwitterIcon size={30} round={true}></TwitterIcon></TwitterShareButton>
                            </Tooltip>
                            <Tooltip title='Email' placement='top' arrow>
                                <EmailShareButton subject="#Kun_Shi_NewsApp"  url={this.state.info.url} className='shareIcon1'><EmailIcon size={30} round={true}></EmailIcon></EmailShareButton>
                            </Tooltip>
                        </div>
                        <ToastContainer position="top-center" hideProgressBar={true} className='toastBar'/>
                        {this.state.favorite ?
                            <Tooltip title='bookmark' placement='top' arrow>
                                <div className='bookmark' onClick={this.notify}>
                                    <FaBookmark size={30} style={{color: "red"}}></FaBookmark>
                                </div>
                            </Tooltip>
                            :
                                <Tooltip title='bookmark' placement='top' arrow>
                                    <div className='bookmark' onClick={this.notify}>
                                        <FaRegBookmark size={30} style={{color: "red"}}></FaRegBookmark>
                                    </div>
                                </Tooltip>
                        }
                    </div>
                    <div style={{width:'100%'}}><img src={this.state.info.image} alt=""/></div>
                    {/*<div style={{width:'100%'}}>{this.state.info.image}</div>*/}
                    {this.state.expand ?
                        <div style={{width:'100%'}}>
                            <div className='description2' style={{textAlign: 'left'}}>{this.state.info.des}</div>
                            <div className='expandIcon' style={{float:'right'}}><MdExpandLess size={30} onClick={this.handleClickPack}></MdExpandLess></div></div>
                        :
                        <div style={{width:'100%'}}>
                            <div className='description' style={{textAlign: 'left'}}>{this.state.info.des}</div>
                            <div className='expandIcon' style={{float:'right'}}><MdExpandMore size={30} onClick={() => this.handleClickExpand(this.myRef)}></MdExpandMore></div></div>
                    }
                </div>
                <div ref={this.myRef}><Comment id={this.props.location.search.substring(4)}></Comment></div>
                </div>
                :
                <LoadingPage />}
        </div>;
    }
}