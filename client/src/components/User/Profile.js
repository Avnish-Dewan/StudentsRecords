import React from 'react';
import axios from 'axios';
import config from '../../config.json'
import { Card, Col, Container, Form, Row } from 'react-bootstrap';

class Profile extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container fluid className="px-4 mt-4">
                    <Row>
                        <Col xl={4}>
                            <Card className="mb-4 mb-xl-0">
                                <Card.Header className="card-header">Profile Picture</Card.Header>
                                <Card.Body className="text-center">
                                    <img className="img-account-profile rounded-circle mb-2" src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                                        {/* <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                                        <button className="btn btn-primary" type="button">Upload new image</button> */}
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xl={8}>
                            <Card className="mb-4">
                                <Card.Header>Student Profile</Card.Header>
                                <Card.Body>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="small mb-1" >Roll Number</Form.Label>
                                            <Form.Control type="number" value="1" disabled />
                                        </Form.Group>
                                        <Form.Group as={Row} className="gx-3 mb-3">
                                            <Col md={4}>
                                                <Form.Label className="small mb-1" >First name</Form.Label>
                                                <Form.Control  type="text" value="ABC" disabled/>
                                            </Col>
                                            <Col md={4}>
                                                <Form.Label className="small mb-1" >Middle name</Form.Label>
                                                <Form.Control  type="text" value="DEF" disabled/>
                                            </Col>
                                            <Col md={4}>
                                                <Form.Label className="small mb-1" >Last name</Form.Label>
                                                <Form.Control type="text" value="GHI" disabled/>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="gx-3 mb-3">
                                            <Col md={6}>
                                                <Form.Label className="small mb-1" >Date of Birth</Form.Label>
                                                <Form.Control  type="text" value="12-11-1999" disabled />
                                            </Col>
                                            <Col md={6}>
                                                <Form.Label className="small mb-1">Age</Form.Label>
                                                <Form.Control type="number" value="22" disabled/>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="small mb-1" >Email address</Form.Label>
                                            <Form.Control type="email" value="abc@def.com" disabled/>
                                        </Form.Group>
                                        <Form.Group as={Row} className="gx-3 mb-3">
                                            <Col md={6}>
                                                <Form.Label className="small mb-1">Address</Form.Label>
                                                <Form.Control type="text" value="abcdef" disabled />
                                            </Col>
                                            <Col md={6}>
                                                <Form.Label className="small mb-1" >Number of Subject Allocated</Form.Label>
                                                <Form.Control type="number" value="2" disabled/>
                                            </Col>
                                        </Form.Group>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
            </Container>
        )
    }
}

export default Profile;