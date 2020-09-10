import React from 'react'
import Search from './Search'
import {Link} from 'react-router-dom'
import {ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Button} from 'reactstrap';
import alertStar from './Images/alertStar.png'
var moment = require('moment');

class UserList extends React.Component {

    state = {searchValue:''}

    changeHandler = (e) => {
        this.setState({searchValue: e.target.value})
    }

    convertCreatedDate = (postObj) => {
        let convertedCreateDate = moment(postObj.created_at, "YYYY-MM-DD").format('MMMM Do, YYYY');
        return convertedCreateDate
    }
    
    searchPosts = () => {
        return this.props.posts.filter(postObj => {
            return postObj.mood_description.toLowerCase().includes(this.state.searchValue.toLowerCase()) || postObj.mood_title.toLowerCase().includes(this.state.searchValue.toLowerCase())
            })
        }

    renderList = () => {
        return (
            this.searchPosts().map(postObj => {
                return (
                    <ListGroupItem key={postObj.id}>
                        <ListGroupItemHeading tag={Link} to={`/posts/${postObj.id}/`}>{postObj.mood_title}</ListGroupItemHeading>{`\xa0`}            
                        {postObj.mood_purpose === "Get Support" ? <img className="alert-star" src={alertStar} alt="needs support"/> : ""} 
                        <ListGroupItemText>
                            <i>{postObj.mood_category === "Other" ? postObj.mood_category_detail : postObj.mood_category}</i><br/>
                            <strong>{postObj.poster_name}</strong>
                            {`\xa0\xa0\xa0\xa0\xa0\xa0\xa0`}
                            {this.convertCreatedDate(postObj)}
                        </ListGroupItemText>
                    </ListGroupItem>
                )
            })
        ) 
    }

    render() {
        return (
            <>
                <h3>{this.props.user.username}'s Posts</h3><br/>
                <Search changeHandler={this.changeHandler} searchValue={this.state.searchValue} /> {`\xa0`}
                <Button onClick={this.props.sortByCategory}>Sort by Category</Button>
                <div className="posts-container">
                    <ListGroup className="posts">
                        {this.renderList()}
                    </ListGroup>   
                </div>   
            </>
        )
    }
}

export default UserList