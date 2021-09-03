import React,{Component} from 'react'
import { Modal,Button,Row,Col,Form } from 'react-bootstrap'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'


export class EditUserModal extends Component{
    constructor(props){
        super(props);
        this.state={users:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
    }

  
    componentDidMount(){
        fetch('http://localhost:44674/api/User')
        .then(response=>response.json())
        .then(data=>{
            this.setState({users:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch('http://localhost:44674/api/User', {
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Id:event.target.Id.value,
                userName:event.target.userName.value,
                userEmail:event.target.userEmail.value,
                Password:event.target.Password.value,
                City:event.target.City.value,
                Country:event.target.Country.value,
                userAddress:event.target.userAddress.value,
                // phoneNumber:event.target.querySelector('[type="tel"]').value

              
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            this.props.onHide();
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }



    render(){
        return (
            <div className="container-fluid">

<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
            Edit User
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form onSubmit={this.handleSubmit}>
        <Row>
            <Col sm={6}>
        
                <Form.Group controlId="Id">
                        <Form.Label>EmployeeId</Form.Label>
                        <Form.Control type="text" name="Id" required 
                        placeholder="Id"
                        disabled
                        defaultValue={this.props.Id}/>
                    </Form.Group>


                    <Form.Group controlId="userName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="userName" required 
                        defaultValue={this.props.userName}
                        placeholder="Name"/>
                    </Form.Group>

                    <Form.Group controlId="userEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" name="userEmail" required 
                        defaultValue={this.props.userEmail}
                        placeholder="Email"/>
                    </Form.Group>
                    {/* <Form.Group controlId="Password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="Password" required 
                        defaultValue={this.props.Password}
                        />
                    </Form.Group> */}
                    </Col>
                    <Col sm={6}>
                    <Form.Group controlId="City">
                        <Form.Label>Şehir</Form.Label>
                        <Form.Control type="text" name="Sehir"
                        onKeyPress={event => (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122)}
                        required 
                        defaultValue={this.props.City}/>
                    </Form.Group>
                    <Form.Group controlId="Country">
                        <Form.Label>İlçe</Form.Label>
                        <Form.Control type="text" name="Country" 
                        onKeyPress={event => (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122)}
                        required 
                       defaultValue={this.props.Country}/>
                    </Form.Group>
                
                    <Form.Group controlId="userAddress">
                        <Form.Label>Adres</Form.Label>
                        <Form.Control type="text" name="userAddress" required 
                        defaultValue={this.props.userAddress}/>
                    </Form.Group>

                    {/* <Form.Group>
                    <Form.Label>Telefon Numarası</Form.Label>
                 
                      <PhoneInput
                        country={'tr'}
                        controlId="phoneNumber"
                        name="phoneNumber"
                        defaultValue={this.props.phoneNumber}
                        required
                        /> 
                      </Form.Group>   */}
                    </Col>
          
        </Row>
                 
               <Form.Group>
                        <Button className="mt-1 " variant="primary" type="submit">
                            Update User
                        </Button>
                    </Form.Group>
                </Form>
        
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}