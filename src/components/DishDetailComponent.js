import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, BreadcrumbItem, Breadcrumb } from 'reactstrap';
import {Link} from 'react-router-dom';
import {Button, Modal, ModalHeader, ModalBody, FormGroup, Label} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import {Loading} from './LoadingComponent'
import {baseUrl} from '../shared/baseUrl'
import {FadeTransform, Fade, Stagger} from 'react-animation-components'
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{
    constructor(props){
        super(props)
        this.state={
            isModalOpen:false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }
    handleSubmit(values){
        this.toggleModal()
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render(){
        return(
        <>
        <Button outline onClick={this.toggleModal}>
            <i class="fa fa-pencil" aria-hidden="true"></i> Submit Comment
        </Button>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader>Submit comment</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    <FormGroup>
                        <Label htmlFor="rating">Rating</Label>
                        <Control.select model=".rating" name="rating" className="form-control">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                         </ Control.select>
                    </FormGroup>
                    <FormGroup>
                    <Label htmlFor="author">Your Name</Label>
                        <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                        />  
                                        <Errors 
                                            className="text-danger"
                                            model=".name"
                                            show="touched"
                                            messages={{
                                                requiered: 'Requiered',
                                                minLength: 'Must be greater than 3 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                        />
                        </FormGroup>
                    
                    <FormGroup>
                        <Label htmlFor="comment">Comment</Label>
                        <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="12"
                                        className="form-control"
                                        /> 
                    </FormGroup>
                    <Button type="submit" value="submit" color="primary">Submit</Button>
                </LocalForm>
            </ModalBody>
        </Modal>
        </>
        )
    }
}

    function RenderDish({dish}) { /*<React.Fragment>*/ 
       
            return(
                <div className="col-12 col-md-5 m-1">
                <FadeTransform in 
                    transfomProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                        <Card key={dish.id}>
                        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                </FadeTransform>
                </div>
            )
       
    }

    function RenderComments({comments, postComment, dishId}) {
        if(comments != null){
            return(
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        <Stagger in>
                            {
                            comments.map((comment) => 
                            <React.Fragment>
                                <Fade in>
                                    <li key = {comment.id}></li>
                                    <li>{comment.comment}</li>
                                    <li>--{comment.author}, {
                                    //comment.date
                                    new Intl.DateTimeFormat('en-US', {year:'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))
                                    }</li>
                                </Fade>
                            </React.Fragment>
                            )
                            }
                        </Stagger>
                    </ul>
                    <CommentForm dishId={dishId} postComment={postComment} />
                </div>
            )
        }
        else{
            return(
                <div>JAJAJAJAAJ</div>
            )
        }
    }

    const DishDetail=(props)=>{
        if (props.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            )
        }
        else if(props.errMess){
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            )
        }
        else if (props.dish != null){
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
                    <div className="row">
                        <RenderDish dish={props.dish} />
                        <RenderComments comments={props.comments} 
                            postComment={props.postComment}
                            dishId={props.dish.id}
                        />
                        
                    </div>
                </div>
            );
        }
        else{
            return(
                <div></div>
            )
        }
    }


export default DishDetail;