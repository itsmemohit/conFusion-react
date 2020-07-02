import React from 'react';
import {Card, CardImg, CardText,CardBody,CardTitle} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';



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