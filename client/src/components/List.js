import React from 'react';
import axios from 'axios';
import config from '../config.json'
import { Link } from 'react-router-dom'
import { Container, ListGroup,OverlayTrigger,Table,Tooltip } from 'react-bootstrap'

class List extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data:null
        }
    }

    componentDidMount() {
        axios.get(`${config.API_URL}/list/${this.props.option}`) // this.props.option === students
            .then(res => {
                const data = res.data;
                console.log('listdata,',data);
                this.setState({ data: data })
            })
        
    }


    renderTooltip(props){
        <Tooltip id="button-tooltip" {...props}>
            Simple tooltip
        </Tooltip>
    }


    render() {

        if (this.state.data) {
            if(this.state.data.length == 0){
                return <div className = 'text-center'> No Data to Show </div>
            }
            // console.log(this.props.option)
            if(this.props.option === 'students'){
                return (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Middle Name</th>
                                <th>Last name</th>
                                <th>Date Of Birth(MM/DD/YYYY)</th>
                                <th>Age</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Subjects Allocated</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map(student=>{
                                return (
                                        <tr>
                                            <td> {student.rollNumber} </td>
                                            <td> {student.fname} </td>
                                            <td> { (student.midname === 'undefined' || student.midname === 'null') ? '' : student.midname} </td>
                                            <td> {student.lname} </td>
                                            <td> {new Date(student.dob).toLocaleDateString()} </td>
                                            <td> {student.age} </td>
                                            <td> {student.email} </td>
                                            <td> {student.address} </td>
                                            <td>
                                                {
                                                    (student.subjects == null) ? 'No Subjects Allocated' : 
                                                    student.subjects.map(ele=>{
                                                        return (<li key={ele.value}> {ele.label} </li>)
                                                    })
                                                }
                                            </td>
                                            <td style={{columnWidth:'250px'}}>
                                            {[{
                                                className:'fas fa-user-edit',
                                                text:'Edit Student',
                                                link:`/edit/student/${student.rollNumber}`
                                            }, {
                                                className:'fas fa-edit',
                                                text:'Edit Dues',
                                                link:`/edit/dues/${student.rollNumber}`
                                            }, {
                                                className:'fas fa-user-slash',
                                                text:'Delete Student',
                                                link: `/delete/student/${student.rollNumber}`
                                                },{
                                                    className: 'fas fa-plus-square',
                                                    text: 'Add/Edit Marks',
                                                    link: `/edit/marks/${student.rollNumber}`,
                                                }].map(ele=>{
                                                return (<OverlayTrigger
                                                    placement="top"
                                                    delay={{ show: 250, hide: 400 }}
                                                    overlay={
                                                        <Tooltip>
                                                            {ele.text}
                                                        </Tooltip>
                                                    }
                                                >
                                                    <Link style={{ textDecoration: 'none',color:'#000' }} to={ele.link}>
                                                        <i className={ele.className}>&nbsp;&nbsp;</i>
                                                    </Link>
                                                </OverlayTrigger>)
                                            })}
                                            </td>
                                        </tr>
                                    )
                            })}
                        </tbody>
                    </Table>
                )
            }else{
                return (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Subject Code</th>
                                <th>Subject Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((subject,index)=>{
                                return (
                                        <tr>
                                            <td>{index+1}</td>
                                            <td> {subject.subcode} </td>
                                            <td> {subject.subname} </td>
                                            <td style={{columnWidth:'50px'}}>
                                            {[{
                                                className:'fas fa-edit',
                                                text:'Edit Subject',
                                                link:`/edit/subject/${subject.subcode}`
                                            }, {
                                                className:'fas fa-trash-alt',
                                                text:'Delete Subject',
                                                link: `/delete/subject/${subject.subcode}`
                                                }].map(ele=>{
                                                return (<OverlayTrigger
                                                    placement="top"
                                                    delay={{ show: 250, hide: 400 }}
                                                    overlay={
                                                        <Tooltip>
                                                            {ele.text}
                                                        </Tooltip>
                                                    }
                                                >
                                                    <Link style={{ textDecoration: 'none',color:'#000' }} to={ele.link}>
                                                        <i className={ele.className}>&nbsp;&nbsp;</i>
                                                    </Link>
                                                </OverlayTrigger>)
                                            })}
                                            </td>
                                        </tr>
                                    )
                            })}
                        </tbody>
                    </Table>
                )
            }
        } else {
            return <h1>Loading</h1>
        }

    }
}

export default List;