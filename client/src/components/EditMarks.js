import React from "react";
import { Button, Row, Col, Container, ListGroup, OverlayTrigger, Tooltip, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from 'axios'
import config from '../config.json'
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";


class EditMarks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            student:{},
            data: [],
            visible:false,
            label : 'Add Marks',
            subjects:[],
            marks:0,
            isDisabled : true
        }
        this.handleClick = this.handleClick.bind(this);
        this.setMarks = this.setMarks.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleUpdateMarks = this.handleUpdateMarks.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        axios.get(`${config.API_URL}/list/student/${this.props.match.params.id}`).then(response => {
            console.log(response.data)
            this.setState({
                name: response.data.fname + ' ' + (response.data.midname ? ' ' : '') + response.data.lname,
                rollNumber:response.data.rollNumber,
                subjects:response.data.subjects,
            })
        })
    }

    handleClick(event){
        let visible = this.state.visible
        let label = this.state.label;
        if(!visible){
            label = 'Save Marks';
        }else{
            label = 'Add Marks'
        }

        if(visible){
            axios.post(`${config.API_URL}/add/marks`,this.state).then(response=>{
                console.log(response.data);
            });
        }
        event.preventDefault();
        this.setState({
            label:label,
            visible : !visible
        })
    }

    handleChange(value){
        this.setState({
            marks : value
        });
    }

    handleSelectChange(event){
        console.log(event.target.value);
        this.setState({
            subcode:event.target.value
        })
    }

    setMarks(value){
        this.setState({
            marks:value
        })
    }
    
    handleUpdateMarks(){
        this.setState({
            isDisabled : !this.state.isDisabled,
            label:"Save Marks"
        })
    }

    render() {
        return (
            <Container>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Subject Code</th>
                            <th>Marks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            [1,2,3,4,5].map(ele=>{
                                return (
                                    <tr>
                                        <td>{ele}</td>
                                        <td>Mark</td>
                                        <td>
                                            <div>
                                                <input type="number" max={100} disabled={this.state.isDisabled} value={this.state.marks} onChange={(e) => this.handleChange(e.target.value)} /> &nbsp;&nbsp;
                                                <Button variant="success" onClick={this.handleUpdateMarks}>Update</Button>&nbsp;&nbsp;
                                                <Button variant="danger">Delete</Button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
                {
                    this.state.visible ? (
                        <Row>
                            <Col>
                                <select onChange={this.handleSelectChange}>
                                    <option selected disabled>Select Subject Code</option>
                                    {
                                        this.state.subjects.map(ele=>{
                                            return (<option value={ele.value}> {ele.label} </option>)
                                        })
                                    }
                                </select>
                            </Col>
                            <Col>
                                <input type='number' onChange={(e) => this.setMarks(e.target.value)}
                                    value={this.state.marks}
                                />
                            </Col>
                        </Row>
                        ): null
                }
                <Button onClick={this.handleClick} variant="primary">{this.state.label}</Button>
            </Container>
        )
    }
}
export default EditMarks;