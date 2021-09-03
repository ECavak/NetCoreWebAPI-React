import React, { Component } from 'react'
import { Table } from 'react-bootstrap';
import { Button,ButtonToolbar } from 'react-bootstrap';
import { AddUserModal } from './AddUserModal';
import { EditUserModal } from './EditUserModal';

// const API = 'http://localhost:44674/api/User';

export class User extends Component{


        constructor(props){
            super(props);
            this.state={users:[], addModalShow:false, editModalShow:false}
        }
    
        refreshList(){
            fetch('http://localhost:44674/api/User')
            .then(response=>response.json())
            .then(data=>{
                this.setState({users:data});
            })
        }
    
        componentDidMount(){
            this.refreshList();
        }
    
        componentDidUpdate(){
            this.refreshList();
        }
    
        deleteUser(Id){
            if(window.confirm('Are you sure?')){
                fetch('http://localhost:44674/api/User', {
                    method:'DELETE',
                    headers: {
                        "Content-Type" : "application/json"
                    },
                    body: JSON.stringify({
                        "Id": Id
                      })
                })
            }
        }
        render(){
            const {users,Id,userName,userEmail,City,Country,userAddress,phoneNumber}=this.state;
            let addModalClose=()=>this.setState({addModalShow:false});
            let editModalClose=()=>this.setState({editModalShow:false});
            return(
                <div >
                    <Table className="mt-4" striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>UserID</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>City</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user=>
                                 <tr key={user.Id}>
                                 <td>{user.Id}</td>
                                 <td>{user.userName}</td>
                                     <td>{user.userEmail}</td>
                                     <td>{user.City}</td>
                                     <td>
                                     
    <ButtonToolbar>
        <Button  variant="primary"
        onClick={()=>this.setState({editModalShow:true,
            Id:user.Id,
            userName:user.userName,
            userEmail:user.userEmail,
            City:user.City,
            Country:user.Country,
            userAddress:user.userAddress,
            phoneNumber:user.phoneNumber
          })}>
                Edit
            </Button>
    
            <Button className="ml5" variant="danger"
        onClick={()=>this.deleteUser(user.Id)}>
                Delete
            </Button>
    
            <EditUserModal show={this.state.editModalShow}
            onHide={editModalClose}
            Id={Id}
            userName={userName}
            userEmail={userEmail}
            City={City}
            Country={Country}
            userAddress={userAddress}
            phoneNumber={phoneNumber}
            />
    </ButtonToolbar>
    
                                    </td>
    
                                </tr>)}
                        </tbody>
    
                    </Table>
    
                    <ButtonToolbar>
                        <Button variant='primary'
                        onClick={()=>this.setState({addModalShow:true})}>
                        Add User</Button>
    
                        <AddUserModal show={this.state.addModalShow}
                        onHide={addModalClose}/>
                    </ButtonToolbar>
                </div>
            )
        }
    }