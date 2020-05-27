import React from "react";
import "../styles/FavoriteItems.css";
import FItem from "./FItem";
import LoadingPage from "./LoadingPage";
import {toast, ToastContainer} from "react-toastify";
import Header3 from "./Header3";

export default class FavoriteItems extends React.Component {
    constructor() {
        super();
        this.state = {
            loaded: false,
            empty:false,
            Flist:[]
        };
        this.checkEmpty=this.checkEmpty.bind(this);
        this.notifyRemoving=this.notifyRemoving.bind(this);
    }

    removeTrash = (title)=>{
        const favorites = JSON.parse(localStorage.getItem('favorites'));
        if(favorites) {
            for(let i = 0; i < favorites.length; i++) {
                if(favorites[i].title === title){
                    favorites.splice(i,1);
                    break;
                }
            }
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
        this.setState({FItem:favorites}, this.checkEmpty);
    }

    componentDidMount() {
        localStorage.setItem('loc', 'favorite');
        const favorites = JSON.parse(localStorage.getItem('favorites'));
        if(favorites){
            this.setState({FItem:favorites})
        }
        this.checkEmpty();
        this.setState({loaded: true, num:favorites.length});
    }

    notifyRemoving(title){
        toast("Removing " + title, {
            toastId: 13,
            autoClose: 2000,
            className:'toast-success-container' ,
        });
        this.checkEmpty();
    }

    checkEmpty(){
        const favorites = JSON.parse(localStorage.getItem('favorites'));
        if(!favorites || favorites.length===0) {
            this.setState({...this.state, empty: true});
        }
        else {
            this.setState({...this.state, empty: false});
        }
    }

    render() {
        return <div>
            <Header3></Header3>
            <ToastContainer position="top-center" hideProgressBar={true} className='toastBar'/>
            {this.state.loaded ?
                <div>{this.state.empty ?
                        <div style={{width:'100%',textAlign:'center',fontSize:'large',fontWeight:'bold'}}>You have no saved articles</div>
                    :
                        <div>
                            <div className='fv'>Favorites</div>
                            <div className='fvItems'>{this.state.FItem.map((item,index) => {
                               return <FItem info={item}  pnotify={this.notifyRemoving} removeTrash={this.removeTrash} key={index}/>
                            }) }</div>
                        </div>
                }</div>
                :
                <LoadingPage></LoadingPage>
        }</div>
    }
}
