import React from "react";
import "../styles/Header.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import 'bootstrap/dist/css/bootstrap.min.css';
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
            <Navbar bg="dark" variant="dark" id="mynav" expand="lg">
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
                    </Nav>
                    <Nav.Link href="/favorites"><FaRegBookmark style={{color: "white",fontSize:'20px',  marginRight: '15px'}}></FaRegBookmark></Nav.Link>
                </Navbar.Collapse>
            </Navbar>
        </div>
    }
}