import React, { Component } from 'react'
// import {NavLink} from 'react-router-dom'
import {Nav} from 'react-bootstrap'


export class Navigation extends Component{
    render(){
        return(
            <Nav variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
                <Nav.Link href="/User">User List</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="disabled" disabled>
                Disabled
                </Nav.Link>
            </Nav.Item>
            </Nav>
            );
    }
}