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
        axios.get(`${config.API_URL}/list/${this.props.option}`)
            .then(res => {
                const data = res.data;
                console.log('listdata,',data);
                this.setState({ data: data })
            })
        
    }

    deleteItem(event){
        console.log('deleted');
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
                                            <td style={{columnWidth:'160px',padding:'10px'}}>
                                            {[{
                                                className:'fas fa-user-edit',
                                                text:'Edit Student',
                                                link:`/edit/student/${student.rollNumber}`
                                            }, {
                                                className:'fas fa-edit',
                                                text:'Update Attendance',
                                                link:`/edit/attendance/${student.rollNumber}`
                                            }, {
                                                className:'fas fa-user-slash',
                                                text:'Delete Student',
                                                link: `/delete/student/${student.rollNumber}`
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
                    <Container>
                        <ListGroup variant='flush'>
                            {this.state.data.map(data => <ListGroup.Item key={data.subcode} > {data.subname}<span className="float-right"><Link style={{ textDecoration: 'none' }} to={`/edit/category/${data.subcode}`}><i className="fas fa-edit"></i></Link>  <span id={data.subcode} value={data.subname} onClick={this.deleteItem} className="fas fa-trash-alt"></span></span></ListGroup.Item>)}
                        </ListGroup>
                    </Container>
                )
            }
        } else {
            return <h1>Loading</h1>
        }

    }
}

export default List;