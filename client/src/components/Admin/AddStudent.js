import axios from 'axios';
import React from 'react';
import {
    Form, Row, Col, Button, Container
} from 'react-bootstrap'
import config from '../../config.json'
import Select from 'react-select';

class AddStudent extends React.Component {

    constructor(props) {
        super(props);
        let data;
        if(this.props.op === 'edit'){
            data = this.getData(this.props.match.params.id)
        }

        this.state = {
            fname: '',
            mname: '',
            lname: '',
            dob: '',
            email: '',
            address: '',
            age: '',
            label:'Add',
            options:[
                { value: 'chocolate', label: 'Chocolate' },
                { value: 'strawberry', label: 'Strawberry' },
                { value: 'vanilla', label: 'Vanilla' },
            ],
            selectedOption:[]
            
        }
        this.setFirstName = this.setFirstName.bind(this)
        this.setMidName = this.setMidName.bind(this)
        this.setLname = this.setLname.bind(this)
        this.setage = this.setage.bind(this)
        this.setDob = this.setDob.bind(this)
        this.setemail = this.setemail.bind(this)
        this.setadd = this.setadd.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getData = this.getData.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    getData(id){
        axios.get(`${config.API_URL}/list/student/${id}`).then(response=>{
            this.setState({
                fname: response.data.fname||'',
                mname: response.data.midname ||'',
                lname: response.data.lname ||'',
                dob: this.convertDate(response.data.dob) ||'',
                email: response.data.email ||'',
                address: response.data.address ||'',
                age: response.data.age ||'',
                label:'Update',
                selectedOption:response.data.subjects || []
            })
        })

    }

    componentDidMount(){
        axios.get(`${config.API_URL}/list/subjects`).then(response => {
            var options = response.data.map(data=>{
                return {
                    value:data.subcode,
                    label: `${data.subname}`
                }
            })
            this.setState({
                options:options
            })
        })
    }

    setFirstName(fname) {
        this.setState({
            fname: fname,
        })
    }
    setMidName(mname) {
        this.setState({
            mname: mname,
        })
    }
    setLname(lname) {
        this.setState({
            lname: lname
        })
    }
    setage(age) {
        this.setState({
            age: age
        })
    }
    setDob(dob) {
        this.setState({
            dob: dob,
            age:this.getAge(dob)
        })
    }
    setemail(email) {
        this.setState({
            email: email
        })
    }
    setadd(address) {
        this.setState({
            address: address
        })
    }

    getAge(date){
        var dateParts = date.split("-");
        if(dateParts.length != 3){
            return ''
        }
        var birthDate = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
        var today = new Date();
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    convertDate(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat)
        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('-')
    }

    handleSubmit(event){
        let url = `${config.API_URL}/add/student`
        if(this.props.op === 'edit')
            url = `${config.API_URL}/edit/student/${this.props.match.params.id}`
    
        event.preventDefault()
        const data = {
            fname:this.state.fname,
            midname: this.state.midname || '',
            lname:this.state.lname,
            dob:this.state.dob,
            age:this.state.age+'',
            email:this.state.email,
            address:this.state.address,
            subjects:JSON.stringify(this.state.selectedOption),
        }
        axios.post(url, data, {
            'Content-Type': 'application\json',
            'Access-Control-Allow-Origin': '*'
        }).then(response => {
            alert(response.data)
            window.location = '/'
        })
    }

    handleChange(selectedOption){
        this.setState({
            selectedOption:selectedOption
        })
    }

    render() {
        const selectedOption = this.state;
        return (
            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control required type="name" placeholder="Enter name"
                                onChange={(e) => this.setFirstName(e.target.value)}
                                value={this.state.fname} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="mname">
                            <Form.Label>Mid Name</Form.Label>
                            <Form.Control type="mname" placeholder="Enter Your middle name"
                                onChange={(e) => this.setMidName(e.target.value)} 
                                value={this.state.mname}
                                />
                        </Form.Group>
                        <Form.Group as={Col} controlId="lname">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control required type="name" placeholder="Enter your Last name"
                                onChange={(e) => this.setLname(e.target.value)} 
                                value={this.state.lname}
                                />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="dob">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control required type="dob" placeholder="Enter Date Of Birth in the format DD-MM-YYYY"
                                onChange={(e) => this.setDob(e.target.value)} 
                                value={this.state.dob}
                                />
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3" controlId="age">
                            <Form.Label>Age</Form.Label>
                            <Form.Control type="age" disabled placeholder="Enter Your Age"
                                value={this.state.age}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control required type="email" placeholder="Enter Your email"
                                onChange={(e) => this.setemail(e.target.value)} 
                                value={this.state.email}
                                />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="Address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control required type="add" placeholder="Enter Your Address"
                                onChange={(e) => this.setadd(e.target.value)} 
                                value={this.state.address}
                                />
                        </Form.Group>
                        <Form.Group as={Col} controlId="subject">
                            <Form.Label> Subject </Form.Label>
                            <Select
                                value={this.state.selectedOption}
                                isMulti={true}
                                onChange={this.handleChange}
                                options={this.state.options}
                            />
                        </Form.Group>
                    </Row>
                    <Button variant="danger" type="submit">
                        {this.state.label} Student
                    </Button>
                </Form>
            </Container>
        )
    }
}

export default AddStudent;