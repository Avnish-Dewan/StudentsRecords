import axios from 'axios';
import React from 'react';
import config from '../../config.json'

import { Table, Container, Card } from 'react-bootstrap';

class MarksList extends React.Component {

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
            axios.get(`${config.API_URL}/list/marks/${rollNumber}`).then(response => {
                const arr = this.mapData(response.data,res.data.subjects);
                console.log(arr);
                this.setState({
                    data: arr
                })
            })
        })
    }

    mapData(marks,subjects){
        const arr = []
        for(var i of marks){
            let filteredArray = subjects.filter(ele => ele.value === i.subcode)
            arr.push({
                subcode:i.subcode,
                subname:filteredArray[0].label,
                marks:i.marks
            })
        }
        return arr;
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
                                        <th>Subject Code</th>
                                        <th>Subject Name</th>
                                        <th>Marks(out of 100)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.data.map((subject, index) => {
                                            return (
                                                <tr>
                                                    <td >{index + 1}</td>
                                                    <td width={"10%"}>{subject.subcode}</td>
                                                    <td>{subject.subname}</td>
                                                    <td width={"35%"}>{subject.marks}</td>
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

export default MarksList;