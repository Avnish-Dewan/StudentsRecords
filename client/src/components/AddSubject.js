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
        
        if(this.props.op == 'edit'){
            this.getData(this.props.match.params.id);
        }

        this.state={
            subcode:null,
            subname:null,
            label:'Add'
        }
        this.setcode = this.setcode.bind(this);
        this.setsubname = this.setsubname.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getData = this.getData.bind(this);
    }

    getData(id) {
        axios.get(`${config.API_URL}/list/subject/${id}`).then(response => {
            // console.log(response.data);
            this.setState({
                subcode : response.data.subcode,
                subname: response.data.subname,
                label: 'Update'
            })
        })

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
        let url = `${config.API_URL}/add/subject`
        if (this.props.op === 'edit')
            url = `${config.API_URL}/edit/subject/${this.props.match.params.id}`
        const data = {
            subcode:this.state.subcode,
            subname:this.state.subname
        }
        axios.post(url, data, {
            'Content-Type': 'application\json',
            'Access-Control-Allow-Origin': '*'
        }).then(response => {
            console.log(response);
            alert(response.data)
            window.location.reload();
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
                                type="text" 
                                placeholder="Enter Subject Code" 
                                onChange={(e) => this.setcode(e.target.value)}
                                value={this.state.subcode}
                                />
                        </Form.Group>
                        <Form.Group as={Col} controlId="subname">
                            <Form.Label>Enter Subject Name</Form.Label>
                            <Form.Control 
                                required
                                type="name" 
                                placeholder="Enter Subject Name" 
                                onChange={(e) => this.setsubname(e.target.value)}
                                value={this.state.subname}
                                />
                        </Form.Group>
                    <Button variant="danger" type="submit">{this.state.label} Subject</Button>
                </Form>
            </Container>
          )
    }
    
}

export default AddSubject;