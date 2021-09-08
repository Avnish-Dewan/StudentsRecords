import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Container, ListGroup } from 'react-bootstrap'


class CategoryList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: null,
            products: null
        }
        this.deleteItem = this.deleteItem.bind(this);
    }

    componentDidMount() {
        if (this.props.option === 'category') {
            axios.get(`http://localhost:5000/students`)
                .then(res => {
                    const cat = res.data;
                    this.setState({ categories: cat })
                })
        } else {
            axios.get(`http://localhost:5000/subjects`)
                .then(res => {
                    const products = res.data;
                    this.setState({ products: products })
                })
        }
    }

    deleteItem(event) {
        event.preventDefault()
        console.log('props = ', this.props)
        if (this.props.option === 'category') {
            let c = window.confirm(`Are you sure you want to delete the category ${event.target.getAttribute('value')}`)
            if (c) {
                axios.post(`http://localhost:5000/delete/category/${event.target.id}`, {})
                    .then(res => {
                        const data = res.data;
                        console.log(data)
                        alert(data);
                        window.location.reload()
                    })
            }
        } else if (this.props.option === 'product') {
            let c = window.confirm(`Are you sure you want to delete the product ${event.target.getAttribute('value')}`)
            if (c) {
                axios.post(`http://localhost:5000/delete/product/${event.target.id}`, {})
                    .then(res => {
                        const data = res.data;
                        console.log(data)
                        alert(data);
                        window.location.reload()
                    })
            }
        }
    }

    render() {
        if (this.props.option === 'category') {
            if (this.state.categories) {
                return (
                    <Container>
                        <ListGroup variant='flush'>
                            {this.state.categories.map(category => <ListGroup.Item key={category.id} action href={`/category/${category.id}`}> {category.data.name} ({category.data.products} products)<span className="float-right"><Link style={{ textDecoration: 'none' }} to={`/edit/category/${category.id}`}><i className="fas fa-edit"></i></Link>  <span id={category.id} value={category.data.name} onClick={this.deleteItem} className="fas fa-trash-alt"></span></span></ListGroup.Item>)}
                        </ListGroup>
                    </Container>
                )
            } else {
                return <h1>Loading</h1>
            }
        } else {
            if (this.state.products) {
                return (
                    <Container>
                        <ListGroup variant='flush'>
                            {this.state.products.map(product => <ListGroup.Item key={product.id} action href={`/product/${product.id}`}> {product.data.name} <span className="float-right"><Link style={{ textDecoration: 'none' }} to={`/edit/product/${product.id}`}><i className="fas fa-edit"></i></Link>  <span id={product.id} value={product.data.name} onClick={this.deleteItem} className="fas fa-trash-alt"></span></span></ListGroup.Item>)}
                        </ListGroup>
                    </Container>
                )
            } else {
                return <h1>Loading</h1>
            }
        }
    }
}

export default CategoryList;