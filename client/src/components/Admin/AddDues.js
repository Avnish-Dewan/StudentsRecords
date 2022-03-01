import React from "react";
import {
    Form, Row, Col, Button, Container
} from 'react-bootstrap'
import axios from "axios";
import config from '../../config.json'

class AddDues extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            amount: 0.0,
            reason: '',
            rollNumber: this.props.match.params.id,
            label:'Add'
        }
        this.setAmount = this.setAmount.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setReason = this.setReason.bind(this);
        this.getData = this.getData.bind(this);
    }

    setAmount(amount) {
        this.setState({
            amount: amount
        })
    }

    setReason(reason) {
        this.setState({
            reason: reason
        })
    }

    async getData(id){
        await axios.get(`${config.API_URL}/list/due/${id}`).then(response => {
            this.setState({
                due_data : response.data || '',
                label:'Update'
            })            
        })
    }

   async componentDidMount(){
        if(this.props.op === 'edit'){
            await this.getData(this.state.id);
        }
        let id = this.state.due_data ? this.state.due_data.stud_id : this.state.id;
        await axios.get(`${config.API_URL}/list/student/${id}`).then(response => {
            this.setState({
                rollNumber:id,
                name: response.data.fname + ' ' + (response.data.midname?' ':'') + response.data.lname,
                reason: this.state.due_data ? this.state.due_data.due_desc : '',
                amount: this.state.due_data ? this.state.due_data.due_payment : 0
            })
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        let url = `${config.API_URL}/add/dues`
        if(this.props.op === 'edit'){
            url = `${config.API_URL}/update/dues/${this.state.id}`
        }

        axios.post(url, this.state, {
            'Content-Type': 'application\json',
            'Access-Control-Allow-Origin': '*'
        }).then(response => {
            alert(response.data)
            window.history.back();
        });

    }


    render() {
        return (
            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Form.Group as={Col} controlId="code">
                            <Form.Label>Roll Number</Form.Label>
                            <Form.Control required type="code" placeholder="Student Roll Number" value={this.state.rollNumber} disabled readOnly />
                        </Form.Group>
                        <Form.Group as={Col} controlId="code">
                            <Form.Label>Student's Name</Form.Label>
                            <Form.Control required type="code" placeholder="Student's Name" value={this.state.name} disabled readOnly />
                        </Form.Group>
                        <Form.Group as={Col} controlId="dueamount">
                            <Form.Label>Enter Due Amount</Form.Label>
                            <Form.Control required
                                type="number"
                                placeholder="Enter Due amount"
                                value={this.state.amount}
                                onChange={(e) => this.setAmount(e.target.value)}
                            />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} className="mb-3" style={{ width: '75%' }} controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Due Reason</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                value={this.state.reason}
                                onChange={(e) => this.setReason(e.target.value)}
                            />
                        </Form.Group>
                    </Row>
                    <Button variant="danger" type="submit">
                        {this.state.label} Due
                    </Button>
                </Form>
            </Container>
        )

    }

}
export default AddDues;