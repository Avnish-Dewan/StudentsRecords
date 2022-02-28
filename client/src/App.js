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
import AddStudent from './components/AddStudent'
import AddSubject from './components/AddSubject';
import HomePage from './components/HomePage';
import AddDues from './components/AddDues';
import EditDues from './components/EditDues';
import EditMarks from './components/EditMarks'
class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			isLoggedIn:false
		}

		this.setLoggedIn = this.setLoggedIn.bind(this);
	}


	setLoggedIn(isLoggedIn,role){
		sessionStorage.setItem('isLoggedIn', isLoggedIn)
		sessionStorage.setItem('role',role);
		this.setState({
			isLoggedIn: JSON.parse(sessionStorage.getItem('isLoggedIn')),
			role: sessionStorage.getItem('role')
		});
	}

  	componentDidMount(){
		this.setState({
			isLoggedIn: JSON.parse(sessionStorage.getItem('isLoggedIn')),
			role: sessionStorage.getItem('role')
		});
	}


  	render() {
    	if(!this.state.isLoggedIn){
      		return (
        		<Login setLoggedIn = {this.setLoggedIn}/>
      		)
    	}else{
			if(this.state.role == 'user'){
				return <h1> User Side </h1>
			}else{
				return (
					<Router>
						<Header />
						<Switch>
							<Route exact path="/" component={HomePage}/>
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
						</Switch>
					</Router>
					)
			}
    	}
  	}
}

export default App;