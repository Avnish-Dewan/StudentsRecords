import axios from 'axios';
import React from 'react';
import config from '../../config.json'

import { Table, Container, Card } from 'react-bootstrap';

class SubjectsList extends React.Component{

    constructor(props){
        super(props);
        this.state={
            data:null
        }
    }

    componentDidMount(){
        axios.get(`${config.API_URL}/view/student/${this.props.email}`).then(response => {
            this.setState({
                data: response.data
            })
        })
    }

    render(){
        if(this.state.data){
            return (
                <Container fluid className="px-4 mt-4">
                    <Card className="mb-4 mb-xl-0">
                        <Card.Header>Subjects Allocated to you :</Card.Header>
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Subject Code</th>
                                        <th>Subject Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.data.subjects.map((subject,index)=>{
                                            return (
                                                <tr>
                                                    <td>{index+1}</td>
                                                    <td>{subject.value}</td>
                                                    <td>{subject.label}</td>
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
        }else{
            return <h1>Loading</h1>
        }
    }

}

export default SubjectsList;