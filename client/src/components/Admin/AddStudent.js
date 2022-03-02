import axios from 'axios';
import React from 'react';
import {
    Form, Row, Col, Button, Card, Container
} from 'react-bootstrap'
import config from '../../config.json'
import Select from 'react-select';
import S3FileUpload from 'react-s3';

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
            img_src:'https://studentmanagingsystem.s3.ap-south-1.amazonaws.com/images/default.jpeg',
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
        this.handleImageChange = this.handleImageChange.bind(this)
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
                selectedOption:response.data.subjects || [],
                img_src:response.data.image
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
        console.log(date);
        const dob = new Date(date);
        var month_diff = Date.now() - dob.getTime();
        var year = new Date(month_diff).getUTCFullYear();
        var age = Math.abs(year - 1970);
        
        return age;
        
    }

    convertDate(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat)

        return (d.getFullYear())+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate()) ;
    }

    async handleSubmit(event){

        event.preventDefault();
        let image_url = 'https://studentmanagingsystem.s3.ap-south-1.amazonaws.com/images/default.jpeg'
        if(this.state.image_file){
            const conf = {
                bucketName: 'studentmanagingsystem',
                dirName: 'images',
                region: 'ap-south-1',
                accessKeyId: 'AKIAXKB5WGU6NLP7R34Z',
                secretAccessKey: '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'
            }

            const file = new File([this.state.image_file], this.state.fname + "_" + this.state.lname);
            await S3FileUpload.uploadFile(file, conf)
            .then(data => {
                console.log(data.location);
                image_url = data.location
            }).catch((err) => {
                console.log(err);
            });
        }
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
            image_url:image_url
        }
        console.log(data);
        axios.post(url, data, {
            'Content-Type': 'application\json',
            'Access-Control-Allow-Origin': '*'
        }).then(response => {
            alert(response.data)
            if(response.data == 'Successfully Added')
                window.location = '/'
        })
    }

    handleChange(selectedOption){
        this.setState({
            selectedOption:selectedOption
        })
    }

    handleImageChange(event){
        if (event.target.files && event.target.files[0]) {
            console.log(URL.createObjectURL(event.target.files[0]));


            this.setState({
                img_src: URL.createObjectURL(event.target.files[0]),
                image_file:event.target.files[0]
            });
        }
    }

    render() {
        const selectedOption = this.state;
        return (
            <Container fluid className="px-4 mt-4">
                <Row>
                    <Col xl={4}>
                        <Card className="mb-4 mb-xl-0">
                            <Card.Header className="card-header">Profile Picture</Card.Header>
                            <Card.Body className="text-center">
                                <img 
                                className="img-account-profile mb-2" 
                                style={{
                                    borderRadius:'25px'
                                }} 
                                src={this.state.img_src} alt="" />
                                <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                                <label for="upload" className="btn btn-primary">Upload</label>
                                <input className="btn btn-primary" id="upload" type="file" style={{
                                    opacity: 0,
                                    position: 'absolute',
                                    zIndex: -1
                                }}
                                    onChange={this.handleImageChange}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={8}>
                        <Card className="mb-4">
                            <Card.Header>Student Profile</Card.Header>
                            <Card.Body>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group as={Row} className="gx-3 mb-3">
                                        <Col md={4}>
                                            <Form.Label className="small mb-1" >First name *</Form.Label>
                                            <Form.Control 
                                                type="text"
                                                value={this.state.fname} 
                                                onChange={(e) => this.setFirstName(e.target.value) }
                                                placeholder="Enter Student's First Name"
                                                required
                                                />
                                        </Col>
                                        <Col md={4}>
                                            <Form.Label className="small mb-1" >Middle name</Form.Label>
                                            <Form.Control 
                                                type="text"
                                                value={this.state.midname} 
                                                onChange={(e) => this.setMidName(e.target.value)}
                                                placeholder="Enter Student's Middle Name(Optional)"
                                                />
                                        </Col>
                                        <Col md={4}>
                                            <Form.Label className="small mb-1" >Last name *</Form.Label>
                                            <Form.Control 
                                                type="text"
                                                value={this.state.lname}
                                                placeholder="Enter Student's Last Name" 
                                                onChange={(e) => this.setLname(e.target.value)}
                                                required
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="gx-3 mb-3">
                                        <Col md={6}>
                                            <Form.Label className="small mb-1" >Date of Birth *</Form.Label>
                                            <Form.Control 
                                                type='date' 
                                                value={this.state.dob}
                                                onChange={(e) => this.setDob(e.target.value)}
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <Form.Label className="small mb-1">Age</Form.Label>
                                            <Form.Control 
                                                type="number"
                                                value={this.state.age}
                                                disabled 
                                                placeholder="Student's Age"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="small mb-1" >Email address *</Form.Label>
                                        <Form.Control 
                                            type="email" 
                                            value={this.state.email} 
                                            required
                                            placeholder="Enter Your email"
                                            onChange={(e) => this.setemail(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Row} className="gx-3 mb-3">
                                        <Col md={6}>
                                            <Form.Label className="small mb-1">Address</Form.Label>
                                            <Form.Control 
                                                type="text"
                                                value={this.state.address}
                                                placeholder="Enter Your Address"
                                                onChange={(e) => this.setadd(e.target.value)}
                                                />
                                        </Col>
                                        <Col md={6}>
                                            <Form.Label className="small mb-1" >Subjects to be Allocated:</Form.Label>
                                            <Select
                                                value={this.state.selectedOption}
                                                isMulti={true}
                                                onChange={this.handleChange}
                                                options={this.state.options}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="gx-3 mb-3">
                                        <Col>
                                            <Button variant="danger" type="submit">
                                                {this.state.label} Student
                                            </Button>
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            // <Container>
            //     <Form onSubmit={this.handleSubmit}>
            //         <Row className="mb-3">
            //             <Form.Group as={Col} controlId="name">
            //                 <Form.Label>Name</Form.Label>
            //                 <Form.Control required type="name" placeholder="Enter name"
            //                     onChange={(e) => this.setFirstName(e.target.value)}
            //                     value={this.state.fname} />
            //             </Form.Group>
            //             <Form.Group as={Col} controlId="mname">
            //                 <Form.Label>Mid Name</Form.Label>
            //                 <Form.Control type="mname" placeholder="Enter Your middle name"
            //                     onChange={(e) => this.setMidName(e.target.value)} 
            //                     value={this.state.mname}
            //                     />
            //             </Form.Group>
            //             <Form.Group as={Col} controlId="lname">
            //                 <Form.Label>Last name</Form.Label>
            //                 <Form.Control required type="name" placeholder="Enter your Last name"
            //                     onChange={(e) => this.setLname(e.target.value)} 
            //                     value={this.state.lname}
            //                     />
            //             </Form.Group>
            //         </Row>
            //         <Row className="mb-3">
            //             <Form.Group as={Col} controlId="dob">
            //                 <Form.Label>Date of Birth</Form.Label>
            //                 <Form.Control required type="dob" placeholder="Enter Date Of Birth in the format DD-MM-YYYY"
            //                     onChange={(e) => this.setDob(e.target.value)} 
            //                     value={this.state.dob}
            //                     />
            //             </Form.Group>
            //             <Form.Group as={Col} className="mb-3" controlId="age">
            //                 <Form.Label>Age</Form.Label>
            //                 <Form.Control type="age" disabled placeholder="Enter Your Age"
            //                     value={this.state.age}
            //                 />
            //             </Form.Group>
            //         </Row>
            //         <Row className="mb-3">
            //             <Form.Group as={Col} controlId="email">
            //                 <Form.Label>Email</Form.Label>
            //                 <Form.Control required type="email" placeholder="Enter Your email"
            //                     onChange={(e) => this.setemail(e.target.value)} 
            //                     value={this.state.email}
            //                     />
            //             </Form.Group>
            //         </Row>
            //         <Row className="mb-3">
            //             <Form.Group as={Col} controlId="Address">
            //                 <Form.Label>Address</Form.Label>
            //                 <Form.Control required type="add" placeholder="Enter Your Address"
            //                     onChange={(e) => this.setadd(e.target.value)} 
            //                     value={this.state.address}
            //                     />
            //             </Form.Group>
            //             <Form.Group as={Col} controlId="subject">
            //                 
            //             </Form.Group>
            //         </Row>
            //         <Button variant="danger" type="submit">
            //             {this.state.label} Student
            //         </Button>
            //     </Form>
            // </Container>
        )
    }
}

export default AddStudent;