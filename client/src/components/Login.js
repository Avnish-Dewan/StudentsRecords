import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import config from '../config.json'

import "./Login.css";

export default class Login extends React.Component{

    constructor(props){
        super(props);
        this.state={
            email:"",
            password:""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    setEmail(email) {
        this.setState({
            email: email
        })
    }

    setPassword(pass) {
        this.setState({
            password: pass
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('Submitted');
        console.log(config)

        const data = {
            username:this.state.email,
            password:this.state.password
        }

        axios.post(`${config.API_URL}/login`,data,{
            'Content-Type':'application\json',
            'Access-Control-Allow-Origin':'*'
        }).then(response=>{
            if(response){
                if (response.data.statusCode == 200){
                    this.props.setLoggedIn(true);
                }else{
                    alert(response.data.data);
                }
            }else{
                alert("Something went wrong! \nPlease try again some time.")
            }
        })

    }
    render(){
        return (
            <div className="Login">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group size="lg" controlId="email">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            autoFocus
                            type="text"
                            value={this.state.email}
                            onChange={(e) => this.setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={this.state.password}
                            onChange={(e) => this.setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button block size="lg" type="submit" disabled={!this.validateForm()}>
                            Login
                    </Button>
                </Form>
            </div>
        );
    }
}