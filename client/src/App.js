import './App.css';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from 'react-router-dom';
import config from './config.json'
import React from 'react';
import Login from './components/Login'
import Header from './components/Header'
import AddStudent from './components/Admin/AddStudent'
import AddSubject from './components/Admin/AddSubject';
import HomePage from './components/HomePage';
import AddDues from './components/Admin/AddDues';
import EditDues from './components/Admin/EditDues';
import EditMarks from './components/Admin/EditMarks';
import SubjectsList from './components/User/SubjectsList';
import MarksList from './components/User/MarksList'
import DuesList from './components/User/DuesList';
import Payment from './components/User/Payment';
class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			isLoggedIn:false
		}

		this.setLoggedIn = this.setLoggedIn.bind(this);
	}


	setLoggedIn(isLoggedIn,role,username){
		sessionStorage.setItem('isLoggedIn', isLoggedIn)
		sessionStorage.setItem('role',role);
		sessionStorage.setItem('username',username);
		this.setState({
			isLoggedIn: JSON.parse(sessionStorage.getItem('isLoggedIn')),
			role: sessionStorage.getItem('role'),
			email:username
		});
	}

  	componentDidMount(){
		this.setState({
			isLoggedIn: JSON.parse(sessionStorage.getItem('isLoggedIn')),
			role: sessionStorage.getItem('role'),
			email : sessionStorage.getItem('username')
		});
	}


  	render() {
    	if(!this.state.isLoggedIn){
      		return (
        		<Login setLoggedIn = {this.setLoggedIn}/>
      		)
    	}else{
				return (
					<Router>
						<Header handleLogout = {this.setLoggedIn} role={this.state.role}/>
						<Switch>
							<Route exact path="/" render={(props) => <HomePage role={this.state.role} email={this.state.email} {...props}/> } />
							<Route path="/add/student" component={AddStudent} />
							<Route path="/add/subject" component={AddSubject}/>
							<Route path="/edit/student/:id" render={(props) => <AddStudent op='edit' {...props} />} />
							<Route path="/edit/subject/:id" render={(props) => <AddSubject op='edit' {...props} />} />
							<Route path="/delete/subject/:id" render={(props) =>{
									if(window.confirm(`Are you sure you want to delete the subject(${props.match.params.id})`)){
										axios.post(`${config.API_URL}/delete/subject/${props.match.params.id}`, {}, {
											'Content-Type': 'application\json',
											'Access-Control-Allow-Origin': '*'
										}).then(response => {
											alert(response.data)
											window.location = '/';
										})
									} else {
										window.history.back();
									}
							} } />
							<Route path="/delete/student/:id" render={(props) => {
									if (window.confirm(`Are you sure you want to delete the student(Roll Number:${props.match.params.id})`)) {
										axios.post(`${config.API_URL}/delete/student/${props.match.params.id}`, {}, {
											'Content-Type': 'application\json',
											'Access-Control-Allow-Origin': '*'
										}).then(response => {
											alert(response.data)
											window.location = '/';
										})
									} else {
										window.history.back();
									}
								}} />
								<Route path="/edit/dues/:id" render={(props) => <EditDues {...props} />} />
								<Route path="/add/dues/:id" render={(props) => <AddDues {...props} />} />
								<Route path="/complete/due/:id" render={(props) => {
									if (window.confirm(`Are you sure you want to mark the due as Completed?`)) {
										axios.post(`${config.API_URL}/complete/due/${props.match.params.id}`, {}, {
											'Content-Type': 'application\json',
											'Access-Control-Allow-Origin': '*'
										}).then(response => {
											alert(response.data)
											window.history.back();
										})
									}else{
										window.history.back();
									}
								}} />
								<Route path="/incomplete/due/:id" render={(props) => {
									if (window.confirm(`Are you sure you want to mark the due as incomplete?`)) {
										axios.post(`${config.API_URL}/incomplete/due/${props.match.params.id}`, {}, {
											'Content-Type': 'application\json',
											'Access-Control-Allow-Origin': '*'
										}).then(response => {
											window.history.back();
										})
									} else {
										window.history.back();
									}
								}} />
								<Route path="/delete/due/:id" render={(props) => {
									if (window.confirm(`Are you sure you want to delete the due?`)) {
										axios.post(`${config.API_URL}/delete/due/${props.match.params.id}`, {}, {
											'Content-Type': 'application\json',
											'Access-Control-Allow-Origin': '*'
										}).then(response => {
											window.history.back();
										})
									} else {
										window.history.back();
									}
								}} />
								<Route path="/edit/due/:id" render={(props) => <AddDues op='edit' {...props} />} />
								<Route path="/edit/marks/:id" render={(props) => <EditMarks {...props} />}  />
								<Route path="/view/subjects" render={(props) => <SubjectsList email={this.state.email} {...props} /> } />
								<Route path="/view/marks" render={(props) => <MarksList email={this.state.email} {...props} />} /> 
								<Route path="/view/dues" render={(props) => <DuesList email={this.state.email} {...props} />} />
								<Route path="/payment" component={Payment} />
						</Switch>
					</Router>
					)
    	}
  	}
}

export default App;