import React from 'react'
import Search from './Search'
import {Link} from 'react-router-dom'
import {ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Button} from 'reactstrap';

class UserList extends React.Component {

    state = {searchValue:''}

    changeHandler = (e) => {
        this.setState({searchValue: e.target.value})
    }
    
    searchPosts = () => {
        return this.props.posts.filter(postObj => {
            return postObj.mood_description.toLowerCase().includes(this.state.searchValue.toLowerCase()) || postObj.mood_title.toLowerCase().includes(this.state.searchValue.toLowerCase())
            })
        }

    //need to update this
    sortByCategory = () => {
        let sortedPosts = (
            this.props.posts.sort((a,b) => {
            return (
                a.mood_category.localeCompare(b.mood_category)
                )
            })
        )
        this.setState({posts: sortedPosts})
    }

    renderList = () => {
        return (
            this.searchPosts().map(postObj => {
                return (
                    <ListGroupItem key={postObj.id}>
                        <ListGroupItemHeading tag={Link} to={`/posts/${postObj.id}/`}>{postObj.mood_title}</ListGroupItemHeading>
                        <ListGroupItemText>
                            {` 
                                ${postObj.mood_purpose}
                                \xa0\xa0\xa0\xa0\xa0\xa0\xa0
                                ${postObj.mood_rating}  
                                \xa0\xa0\xa0\xa0\xa0\xa0\xa0 
                                ${postObj.mood_category}    
                                \xa0\xa0\xa0\xa0\xa0\xa0\xa0 
                                ${postObj.created_at.toString().substring(0,10)}
                            `}
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