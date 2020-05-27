import React from "react";
import SItem from './SItem';
import LoadingPage from "./LoadingPage";
import axios from "axios";
import '../styles/SearchItems.css'
import Header2 from "./Header2";
import BACKEND_URL from "../constants";

export default class SearchItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        };
        this.saveItems=this.saveItems.bind(this);
        this.fetchAgain=this.fetchAgain.bind(this);
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if(prevProps.location.search !== this.props.location.search) {
            const {location} = this.props;
            this.url = BACKEND_URL+"/searchGuardian?q="+location.search.substring(3);
            this.setState({ ...this.state, loaded:false }, this.fetchAgain);
        }
    }

    fetchAgain(){
        axios.get(this.url)
            .then(res => {
                const ItemsInfo = res.data.result;
                // console.log(ItemsInfo);
                this.setState({ ...this.state, info: ItemsInfo, loaded:false}, this.saveItems);
                this.setState({ ...this.state, loaded:true });
            });
    }


    componentDidMount() {
        localStorage.setItem('loc', 'searchResult');
        const {location} = this.props;
        this.url = BACKEND_URL+"/searchGuardian?q="+location.search.substring(3);
        axios.get(this.url)
            .then(res => {
                const ItemsInfo = res.data.result;
                console.log(ItemsInfo);
                this.setState({ ...this.state, info: ItemsInfo}, this.saveItems);
                this.setState({ ...this.state, loaded:true });
            });
    }

    saveItems(){
        this.addSItems = [];
        for(let i = 0; i < this.state.info.length; i++) {
            this.addSItems.push(<SItem info={this.state.info[i]} key={i}/>);
        }
    }

    render() {
        return <div>
            <Header2></Header2>
            {
                this.state.loaded ?
                    <div>
                    <div className='result'>Results</div>
                        <div className='sItems'>{this.addSItems}</div>
                    </div>
                :
                    <LoadingPage></LoadingPage>
            }
        </div>
    }
}