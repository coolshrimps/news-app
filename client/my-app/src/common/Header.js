import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/Header.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Switch from "react-switch";
import { FaRegBookmark } from 'react-icons/fa';
import SelectInput from "./SelectInput";

export default class Header extends React.Component{
    constructor(){
        super();
        this.state={
        }
    }

    render(){
        return <div style={{width:'100%'}}>
            <Navbar bg="light" variant="dark" id="mynav" expand="lg">
                    <div ><SelectInput/></div>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className='navbar-collapse'>
                        <Nav className="mr-auto">
                            <Nav.Link active={window.location.pathname==='/'}  href="/" >Home</Nav.Link>
                            <Nav.Link active={window.location.pathname==='/world'} href="/world" >World</Nav.Link>
                            <Nav.Link active={window.location.pathname==='/politics'} href="/politics" >Politics</Nav.Link>
                            <Nav.Link active={window.location.pathname==='/business'}  href="/business" >Business</Nav.Link>
                            <Nav.Link active={window.location.pathname==='/technology'} href="/technology" >Technology</Nav.Link>
                            <Nav.Link active={window.location.pathname==='/sport'}  href="/sport">Sports</Nav.Link>
                            {/*style={{WebkitTextFillColor:'rgba(255,255,255,0.5)'}}*/}
                        </Nav>
                        <Nav.Link href="/favorites"><FaRegBookmark style={{color: "white", fontSize:'20px', marginRight: '15px'}}></FaRegBookmark></Nav.Link>
                        <div className='switchBar' style={{display:'flex'}} >
                            <Navbar.Text style={{marginRight:'20px',color:"white",WebkitTextFillColor:"white"}}>NYTimes</Navbar.Text>
                            <SwitchBar news={this.props.newsFrom} gpmethod={this.props.setNews}></SwitchBar>
                            <Navbar.Text style={{marginLeft:'20px',color:"white",WebkitTextFillColor:"white"}}>Guardian  </Navbar.Text>
                        </div>
                    </Navbar.Collapse>
            </Navbar>
            </div>
    }
}


class SwitchBar extends React.Component{
    constructor(){
        super();
        if(localStorage.getItem('source') === 'Guardian'){
            this.state = {
                checked: true,
            };
        }
        else{
            this.state = {
                checked: false,
            };
        }

        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        if(this.props.news === 'Guardian') {
            this.setState({ ...this.state, checked:true});
        }
        else {
            this.setState({ ...this.state, checked:false});
        }
    }

    handleChange(checked) {
        this.setState({ checked });
        if(checked) {
            this.props.gpmethod('Guardian');
        }
        else {
            this.props.gpmethod('NYTimes');
        }
        // console.log(this.state.checked);
    }

    render(){
        return     <div><Switch checked={this.state.checked}
                        onChange={() => this.handleChange(!this.state.checked)}
                        onColor="#86d3ff"
                        onHandleColor="#2693e6"
                                offColor="#dbdbdb"
                        handleDiameter={25}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={25}
                        width={50}
                        className="react-switch"
                        id="material-switch"/>
        </div>
    }
}