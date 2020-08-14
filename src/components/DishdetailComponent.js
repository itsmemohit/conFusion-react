import React, { Component } from 'react';
import { Card, CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem, 
    Button, Modal, ModalHeader, ModalBody, Label, Col, Row } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state={
            isModalOpen: false
        }
        this.toggleModal=this.toggleModal.bind(this);
        this.handleLogin=this.handleLogin.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    
    handleLogin(event) {
        this.toggleModal();
        event.preventDefault();
    }

    handleSubmit(values) {
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }
    
    render() {
        
        return(
            <>
                <Button type="button" className="btn btn-light btn-outline-secondary" 
                onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment 
                </Button>
                
                <Modal isOpen ={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="rating" md={3}>Rating</Label>
                            <Col md={12}>
                                <Control.select model=".rating" id="rating" name="rating"                                    
                                    className="form-control">  
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>                                     
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="author" md={3}>Your Name</Label>
                            <Col md={12}>
                                <Control.text model=".author" id="author" name="author"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }} />
                                <Errors 
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages= {{
                                            required: 'Required! ',
                                            minLength: 'Must be greater that 2 characters! ',
                                            maxLength: 'Must be 15 characters or less!  '
                                        }}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="comment" md={3}>Comment</Label>
                            <Col md={12}>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                    rows="6"
                                    className="form-control" />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={{size:10}}>
                                <Button type="submit" color="primary">Submit</Button>    
                            </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
                </Modal>
                </>
        );
        
    }
}

function ImageDish({selDish}) {
    console.log('ImageDish function invoked: ', selDish);
    return(
        <div>
            <Card>
    <           CardImg width="100%" src={baseUrl + selDish.image} alt={selDish.name} />
                <CardTitle><strong>{selDish.name}</strong></CardTitle>
                <CardText>{selDish.description}</CardText>                                
            </Card>
            
        </div>
    );
}

function CommentDish({comments, postComment, dishId}) {

    const comDish = comments.map((comm) => {
        return (               
                <div key={comm.id} className="col-12 col-md-12 m-1">
                    <h6>{comm.comment}</h6>
                    <p>--{comm.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comm.date)))}</p>
                    <hr />                    
                </div>
        );
    });
    return (
        <div>
            <h5>Comments:</h5>
            {comDish} 
            <CommentForm dishId={dishId} postComment={postComment} />      
        </div>
        
    );
}


const DishDetail = (props) => {    
    if(props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }       
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }  
    else if (props.selDish!= null) {
        return (
            <div className = 'container'>
                <div className="row ">
                    <Breadcrumb>
                    <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.selDish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.selDish.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div  className="col-12 col-md-5 m-1">
                        <ImageDish selDish = {props.selDish}  />
                    </div>
                    <div  className="col-12 col-md-5 m-1">                        
                        <CommentDish comments={props.comments}
                            postComment={props.postComment}
                            dishId={props.selDish.id}
                        />
                    </div>                                                               
                </div>
            </div>
        );}
    else {
        return(
            <div>              
            </div>
        );
    }
}

export default DishDetail;