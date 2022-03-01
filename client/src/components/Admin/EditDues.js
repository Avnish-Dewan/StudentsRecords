import React from "react";
import { Button, Col, Container, ListGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from 'axios'
import config from '../../config.json'


class EditDues extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data : []
        }
    }

    componentDidMount(){
        axios.get(`${config.API_URL}/list/dues/${this.props.match.params.id}`) // this.props.option === students
            .then(res => {
                const data = res.data;
                this.setState({ data: data })
            })
    }

    render() {
        return (
            <Container>
                <ListGroup as='ol' className="my-4" numbered>
                    {
                        this.state.data.map(due=>{
                            return (
                                <div>
                                    <ListGroup.Item variant={due.is_completed ? 'success' : 'danger'}> 
                                        <div>
                                            <span>
                                                {due.due_desc} - {due.is_completed ? <strike> ₹{due.due_payment} due </strike> : `₹ ${due.due_payment} due`}
                                            </span>
                                            <span className='float-right'>
                                                {[{
                                                    className: 'far fa-edit',
                                                    text: 'Edit Due',
                                                    link: `/edit/due/${due.due_id}`,
                                                }, {
                                                    className: 'fas fa-trash',
                                                    text: 'Delete Due',
                                                    link: `/delete/due/${due.due_id}`,
                                                }, {
                                                    className: due.is_completed ? 'fas fa-times-circle' :'fas fa-check-circle',
                                                    text: due.is_completed ? 'Mark as Incomplete' : 'Mark as Complete',
                                                    link: due.is_completed ? `/incomplete/due/${due.due_id}` :`/complete/due/${due.due_id}`,
                                                }].map(ele => {
                                                    return (<OverlayTrigger
                                                        placement="top"
                                                        delay={{ show: 250, hide: 400 }}
                                                        overlay={
                                                            <Tooltip>
                                                                {ele.text}
                                                            </Tooltip>
                                                        }
                                                    >
                                                        <Link style={{ textDecoration: 'none', color: '#000' }} to={ele.link}>
                                                            <i className={ele.className} >&nbsp;&nbsp;</i>
                                                        </Link>
                                                    </OverlayTrigger>)
                                                })}
                                            </span>
                                        </div>
                                    </ListGroup.Item>
                                    <br/>
                                </div>
                                )
                        })
                    }
                </ListGroup>

                <Link to={`/add/dues/${this.props.match.params.id}`}>
                    <Button variant="primary">Add dues</Button>
                </Link>
            </Container>
        )
    }
}
export default EditDues;