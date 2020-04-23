import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            this.renderDish(this.props.dish)
        );
    }

    renderDish(dish) {
        if (dish != null){
            return(
                    <div>
                        <div className="col-12 col-md-5 m-1">
                        <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                        </div>
                    
                    
                    {dish.comments.map((comment)=> {
                        return(
                        <div className="col-12 col-md-5 m-1">
                        <h1>{comment.author}</h1>
                        </div>
                        )
                    })}
                    </div>
            )
        }
        else{
            return(
                <div></div>
            )
        }
    }
/*
    renderComments(dish){
                const comments = dish.comments.map((comment)=> {
                    return(
                        <div><h1>{comment.autor}</h1></div>
                    );
                });
    }*/
}

export default DishDetail;