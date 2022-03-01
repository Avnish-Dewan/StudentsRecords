import axios from 'axios';
import React from 'react';
import config from '../../config.json'

import { Table, Container, Card, AccordionCollapse } from 'react-bootstrap';

class DuesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }

    componentDidMount() {
        axios.get(`${config.API_URL}/view/student/${this.props.email}`).then(res => {
            // this.setState({
            //     data: response.data
            // })
            const rollNumber = res.data.rollNumber;
            axios.get(`${config.API_URL}/list/dues/${rollNumber}`).then(response => {
                // const arr = this.mapData(response.data, res.data.subjects);
                // console.log(arr);
                console.log(response.data);
                this.setState({
                    data: response.data
                })
            })
        })
    }

    handleClick(amount){
        axios.post(`${config.API_URL}/create-checkout-session`,{
            price:amount,
            cancel: window.location.href
        }).then(response=>{
            console.log(response);
            window.location=response.data;
        })
    }

    render() {
        if (this.state.data) {
            return (
                <Container fluid className="px-4 mt-4">
                    <Card className="mb-4 mb-xl-0">
                        <Card.Header>Your Marks :</Card.Header>
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Description</th>
                                        <th>Fine/Fee</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.data.map((due, index) => {
                                            return (
                                                <tr>
                                                    <td width="5%">{index + 1}</td>
                                                    <td width={"50%"}>{due.due_desc}</td>
                                                    <td>{due.due_payment}</td>
                                                    <td> <button onClick={(e) => { this.handleClick(due.due_payment) }}><i class='fab fa-amazon-pay' 
                                                    style={{
                                                        fontSize:'48px',
                                                        color:'rgba(35, 40, 51, 0.671)'
                                                        }} ></i> </button> </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Container>
            )
        } else {
            return <h1>Loading</h1>
        }
    }

}

export default DuesList;