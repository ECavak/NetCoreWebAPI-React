import React,{Component} from 'react'
import { Modal,Button,Row,Col,Form } from 'react-bootstrap'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'


export class AddUserModal extends Component{
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
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                userName:event.target.userName.value,
                userEmail:event.target.userEmail.value,
                Password:event.target.Password.value,
                City:event.target.City.value,
                Country:event.target.Country.value,
                userAddress:event.target.userAddress.value,
                phoneNumber:event.target.querySelector('[type="tel"]').value
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
            <div className="container">

<Modal
{...this.props}
size="xl"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
            Add User
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form onSubmit={this.handleSubmit}>
        <Row>
            <Col lg={6}>
          
                    <Form.Group controlId="userName">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control type="text" name="userName" required 
                        placeholder="User Name"/>
                    </Form.Group>
                    <Form.Group controlId="userEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="userEmail" required 
                        placeholder="Email"/>
                       
                    </Form.Group>
                    <Form.Group controlId="Password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="Password" required 
                        placeholder="Password"/>
                    </Form.Group>

                    <Form.Group controlId="phoneNumber">
                    <Form.Label>Telefon Numarası</Form.Label>
                    {/* <Form.Group controlId="phoneNumber">
                        <Form.Control  name="phoneNumber" required   type="text" pattern="[0-9]*" maxLength="11"
                        placeholder="(0530)511 00 00"/>
                        <Form.Label className="text-muted">Lütfen sadece Telefon numarası girin.</Form.Label> */}
                    {/* </Form.Group> */}
                    { <PhoneInput
                        country={'tr'}
                        controlId="phoneNumber"
                        name="phoneNumber"
                        required
                        /> }
                      </Form.Group>

                    </Col>
                    <Col lg={6}>
                    <Form.Group controlId="City">
                        <Form.Label>Şehir</Form.Label>
                        <Form.Control type="text" name="City"
                        onKeyPress={event => (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122)}
                        required 
                        placeholder="City"/>
                    </Form.Group>
                    <Form.Group controlId="Country">
                        <Form.Label>İlçe</Form.Label>
                        <Form.Control type="text" name="Country" 
                        required 
                        onKeyPress={event => (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122)}
                        placeholder="Country"/>
                    </Form.Group>
                
                    <Form.Group controlId="userAddress">
                        <Form.Label>Adres</Form.Label>
                        <Form.Control type="text" name="userAddress" required 
                        placeholder="Address"/>
                    </Form.Group>
                
             
                
            </Col>
           
           
        </Row>  
        <Form.Group>
                        <Button className="mt-3"  variant="primary" type="submit">
                            Add User
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
