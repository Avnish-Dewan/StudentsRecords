import React from 'react';
import axios from 'axios'
import config from '../config.json'
import {
    Form, 
    Row,
    Col,
    Button, 
    Container     
} from 'react-bootstrap'
    

class AddSubject extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            subcode:null,
            subname:null,
        }
        this.setcode = this.setcode.bind(this);
        this.setsubname = this.setsubname.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    setcode(subcode){
        this.setState({
            subcode:subcode,
        })
    }
    setsubname(subname){
        this.setState({
            subname:subname,
        })
    }

    handleSubmit(event){
        event.preventDefault();
        const data = {
            subcode:this.state.subcode,
            subname:this.state.subname
        }
        axios.post(`${config.API_URL}/add/subject`, data, {
            'Content-Type': 'application\json',
            'Access-Control-Allow-Origin': '*'
        }).then(response => {
            console.log(response);
            alert(response.data)
            this.setState({
                subcode:'',
                subname:''
            })
        })
    }

    render() {
        return (
            <Container>
                <Form onSubmit={this.handleSubmit}>  
                        <Form.Group as={Col} controlId="code">
                            <Form.Label>Enter Subject Code</Form.Label>
                                <Form.Control 
                                required 
                                type="number" 
                                placeholder="Enter Subject Code" 
                                onChange={(e) => this.setcode(e.target.value)}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="subname">
                            <Form.Label>Enter Subject Name</Form.Label>
                            <Form.Control 
                                required
                                type="name" 
                                placeholder="Enter Subject Name" 
                                onChange={(e) => this.setsubname(e.target.value)}/>
                        </Form.Group>
                    <Button variant="danger" type="submit">Add Subject</Button>
                </Form>
            </Container>
          )
    }
    
}

export default AddSubject;