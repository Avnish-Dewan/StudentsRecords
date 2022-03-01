import React from "react";
import { Button, Row, Col, Container, Table } from "react-bootstrap";
import axios from 'axios'
import config from '../../config.json'



class EditMarks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            student:{},
            data: [],
            visible:false,
            label : 'Add Marks',
            subjects:[],
            marks:null,
            text:'Edit',
        }
        this.buttons = []
        this.inputs = []
        this.getData(this.props.match.params.id);
        this.getData = this.getData.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleUpdateMarks = this.handleUpdateMarks.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.modifyArray = this.modifyArray.bind(this);
        setTimeout(()=>{
            this.modifyArray();
        },100)
        this.handleDeleteMarks = this.handleDeleteMarks.bind(this);
    }

    getData(rollNumber){
        axios.get(`${config.API_URL}/list/marks/${rollNumber}`).then(response => {
            this.setState({
                addedMarks : response.data
            })
        })
        
    }

    componentDidMount() {
        axios.get(`${config.API_URL}/list/student/${this.props.match.params.id}`).then(response => {
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

        if(visible){
            axios.post(`${config.API_URL}/add/marks`,this.state).then(response=>{
                window.location.reload()
            });
        }
        event.preventDefault();
        this.setState({
            label:label,
            visible : !visible
        })
    }

    handleChange(value,index,subcode){
        this.inputs[index].value = value;
        var addedMarks = this.state.addedMarks;
        for(var i = 0;i<addedMarks.length;i++){
            if(addedMarks[i].subcode == subcode){
                addedMarks[i].marks = value;
            }
        }
        this.setState({
            addedMarks : addedMarks
        })
    }

    handleSelectChange(event){
        this.setState({
            subcode:event.target.value
        })
    }

    
    handleUpdateMarks(index,subcode){
        const data = this.inputs[index].disabled;
        this.inputs[index].disabled = !data;
        let text = this.buttons[index].textContent
        if(text === 'Edit'){
            this.buttons[index].textContent = 'Update';
        }else if(text === 'Update'){
            this.buttons[index].textContent = 'Edit'
            var marks = this.inputs[index].value
            const data = {
                rollNumber:this.props.match.params.id,
                subcode : subcode,
                marks:parseInt(marks)
            }
            axios.post(`${config.API_URL}/edit/marks`,data, {
                'Content-Type': 'application\json',
                'Access-Control-Allow-Origin': '*'
            }).then(response => {
                alert(response.data)
            })
        }
    }

    modifyArray(){
        let addedArray = this.state.addedMarks;
        let totalArray = this.state.subjects;


        var elmts = totalArray.filter(f => {
            for(var i of addedArray){
                if(i.subcode == f.value){
                    return false;
                }
            }
            return true;
        });
        this.setState({
            subjects : elmts
        })
    }

    handleDeleteMarks(subcode){
        let addedMarks = this.state.addedMarks;
        
        addedMarks = addedMarks.filter(ele=>{
            return (ele.subcode != subcode);
        })

        const data = {
            rollNumber : this.props.match.params.id,
            subcode : subcode
        }

        axios.post(`${config.API_URL}/delete/marks`, data, {
            'Content-Type': 'application\json',
            'Access-Control-Allow-Origin': '*'
        }).then(response => {
            alert(response.data)
            window.location.reload();
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
                            this.state.addedMarks && this.state.addedMarks.length > 0 ? ( this.state.addedMarks.map((ele,index)=>{
                                return (
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{ele.subcode}</td>
                                        <td>
                                            <div key={ele.subcode}>
                                                <input type="number" max={100} ref={ref => this.inputs[index] = ref} disabled={true} value={ele.marks} onChange={(e) => this.handleChange(e.target.value,index,ele.subcode)} /> &nbsp;&nbsp;
                                            </div>
                                        </td>
                                        <td>
                                            <Button variant="success" ref={ref => this.buttons[index] = ref} onClick={() => this.handleUpdateMarks(index,ele.subcode)}>{this.state.text}</Button>&nbsp;&nbsp;
                                            <Button variant="danger" onClick={()=>this.handleDeleteMarks(ele.subcode)}>Delete</Button>
                                        </td>
                                    </tr>
                                )
                            }) ) : (<tr> <td style={{textAlign:'center'}} colspan="3"> No Data to show </td> </tr>)
                        }
                    </tbody>
                </Table>
                {
                    this.state.visible ? (
                        <Row>
                            <Col>
                                <select onChange={this.handleSelectChange}>
                                    <option selected disabled>Select Subject</option>
                                    {
                                        this.state.subjects.map(ele => {
                                            return (<option value={ele.value}> {ele.label} </option>)
                                        })
                                    }
                                </select>
                            </Col>
                            <Col>
                                <input type='number' placeholder="Enter marks"
                                    value={this.state.marks}
                                    onChange={(e)=>this.setState({
                                        marks:e.target.value
                                    })}
                                />
                            </Col>
                        </Row>
                    ) : null
                }
                <Button onClick={this.handleClick} variant="primary">{this.state.label}</Button>
            </Container>
        )
    }
}
export default EditMarks;