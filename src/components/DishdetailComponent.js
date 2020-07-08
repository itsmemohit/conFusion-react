import React, { Component } from 'react';
import {Card, CardImg, CardText,CardBody,CardTitle, Col, Row} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component{
    constructor(props) {
        super(props);
        this.state={
            isModalOpen:  false,
            
        };
        this.toggleModal = this.toggleModal.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit(values) {
        alert("Current State is: " + JSON.stringify(values));
        
    }

    validate(yourname) {
        const errors = {
            yourname: '',
            
        };

        if (this.state.touched.yourname && yourname.length < 3)
            errors.yourname = 'First Name should be >= 3 characters';
        else if ((this.state.touched.yourname && yourname.length > 10))
            errors.yourname = 'First Name should be <= 10 characters';

        return errors;
    }

        render() {
            return(
                <div>
                    <Button outline type="submit" onClick={this.toggleModal}><span class="fa fa-pencil"></span>Submit Comment</Button>   
                    <Modal isOpen={this.state.isModalOpen} toggle= {this.toggleModal}>
                        <ModalHeader toggle= {this.toggleModal}>
                            Submit Comment
                        </ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor=".rating" md={12}>Rating</Label>
                                    <Col md={12}>
                                        <Control.select model=".rating" id="rating" name="rating"
                                        className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                            <option>6</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor=".author" md={12}>Your Name</Label>
                                    <Col md={12}>
                                        <Control.text model=".yourname" id="yourname" name="yourname" 
                                        placeholder="Your Name" 
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                        />
                                    <Errors
                                        className="text-danger"
                                        model=".yourname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: " Must be greater than 2 characters",
                                            maxLength: ' Must be 15 characters or less'
                                        }}
                                    />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="comment" md={12}>Comment</Label>
                                    <Col md={12}>
                                        <Control.textarea model=".message" id="message" name="message" 
                                        rows="6" className="from-control col-12" />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={{size: 10}}>
                                        <Button type="submit" color="primary">
                                        Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
            
            );
        }
    }

    function RenderDish({dish}) {
        
        if (dish!=null){
            return(
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg top src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        }
        else{
            return(
                <div></div>
            )
        }
    }

    function RenderComments({comments}) {
        
        if (comments!=null){
            const comm = comments.map((comment) => {
                return(
                    <div className="list-unstyled">                
                        <p>{comment.comment}</p>
                <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US',{year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                    </div>
                );
            });
            return(
              <div>
                  <h4>Comments</h4>
            <div>{comm}</div>
            <CommentForm/>
              </div>            
            );
        }   
        else{
            return(
                <div></div>
            );
        }
    }    

    const DishDetail = (props) => {
        
        if (props.dish != null) {
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>    
                    <div class="row">
                        <RenderDish dish={props.dish}/>
                        <RenderComments comments={props.comments}/>  
                    </div>
                </div>
            );
        }
        else return(
            <div></div>
        ); 
            

    }



export default DishDetail;