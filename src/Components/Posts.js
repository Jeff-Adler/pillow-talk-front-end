import React from 'react'
import CommentContainer from '../Containers/CommentContainer'
import CommentForm from './CommentForm'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'

class Post extends React.Component {

    state = {
        comments:[]
    }

    componentDidMount () {
        const token = localStorage.getItem("token")
        if (token) {
          fetch("http://localhost:3000/posts/", {
            method: "GET",
            headers: {
                        Authorization: `Bearer ${token}`
                     }
            })
              .then(response => response.json())
              .then(comments => {
                            //   console.log("Posts CDM?", comments)
                              this.setState({comments : comments})
                            }
                  )
        }
    }



    render() {
        // console.log(this.props.postObj)
        return (
            <Router>
                <div className="container">
                    <h3>Post {this.props.postObj.id}</h3>
                        <p>Positive: {this.props.postObj.positive}</p>
                        <p>Negative: {this.props.postObj.negative}</p>
                        <p>Severe: {this.props.postObj.severe ? "Yes" : "No"}</p>
                        <p>Category: {this.props.postObj.category}</p>
                        <NavLink to={`/posts/${this.props.postObj.id}/comments`}>
                            <li>Add Comment</li>
                        </NavLink>
                        <Route path='/comments' render={()=> <CommentContainer/>} /> 
                        <Route path='/comments' render={() => <CommentForm/>}/>    
                </div>
            </Router>
        )
    }
}

export default Post

