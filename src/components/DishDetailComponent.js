import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component{
    

    render(){
        return(
            <div className="container">
                {this.renderDish(this.props.dish)}
            </div>
        );
    }

    renderDish(dish) { /*<React.Fragment>*/ 
        if (dish != null){ 
            return(
                    <div className="row">
                        <div key={dish.id} className="col-12 col-md-5 m-1">
                        <Card key={dish.id}>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                        </div>
                        <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                            {this.renderComments(dish)}
                        </div>
                    </div>
            )
        }
        else{
            return(
                <div></div>
            )
        }
    }

    renderComments(dish){
                const commenta = dish.comments.map((comment)=> {
                    return(
                        <React.Fragment>
                        <p>{comment.comment}</p>
                        <p>--{comment.author}, {new Intl.DateTimeFormat('en-US', {year:'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                        </React.Fragment>
                    );
                });
        return(
            commenta
        )      
    }
}

export default DishDetail;