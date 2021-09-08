import React from 'react';
import axios from 'axios';
import List from './List';
import config from '../config.json'
import { Tabs, Tab, Row, Col, Container, Jumbotron, Card } from 'react-bootstrap'


class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }

    componentDidMount() {
        axios.get(`${config.API_URL}/count`)
            .then(res => {
                const data = res.data;
                console.log('data=',data);
                this.setState({
                    data: data
                })
            })
    }

    render() {
        if (this.state.data != null) {
            return (
                <Container>
                    <Row>
                        <h1>Statistics for your site</h1>
                    </Row>
                    <Jumbotron className='p-10 px-5'>
                        <Row>
                            <Col xs='7' sm='7' md='7' lg='6'>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title>Total Students</Card.Title>
                                        <Card.Text>
                                            {this.state.data.students}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs='6' sm='7' md='7' lg='6'>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title>Total Subjects</Card.Title>
                                        <Card.Text>
                                            {this.state.data.subjects}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Jumbotron>

                    <Tabs id="uncontrolled-tab-example">
                        <Tab eventKey="home" title="Students">
                            <List option='students' />
                        </Tab>
                        <Tab eventKey="profile" title="Subjects">
                            <List option='subjects' />
                        </Tab>
                    </Tabs>

                </Container>
            )
        } else {
            return <h1>Loading</h1>
        }
    }
}

export default HomePage;