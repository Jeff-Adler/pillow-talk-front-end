import React from 'react'
import { ListGroup, ListGroupItem, ListGroupItemText } from 'reactstrap';


class UserAnalytics extends React.Component {

    state = {
        analytics:null
    }

    componentDidMount () {
        const token = localStorage.getItem("token")
        fetch(`http://localhost:3000/users/${this.props.user.id}/analytics`, {
            method: "GET",
            headers: {
                        Authorization: `Bearer ${token}`
                     }
            })
              .then(response => response.json())
              .then(analyticData => {
                this.setState({analytics:analyticData}, () => console.log(this.state.analytics))
            })
    }

    render () {
        return (
        <>
            {this.state.analytics !== null 
            ? 
                <>
                    <h3>User Analytics</h3>
                    <div className="center">
                        <ListGroup id="user-form">

                        <ListGroupItem>
                            <ListGroupItemText><strong>User Since: </strong> {Object.values(this.state.analytics[0])[0]}</ListGroupItemText>
                        </ListGroupItem>

                        <ListGroupItem>
                            <ListGroupItemText><strong>Total Comments: </strong> {Object.values(this.state.analytics[1])[0]}</ListGroupItemText>
                        </ListGroupItem>

                        <ListGroupItem>
                            <ListGroupItemText><strong>Total Upvotes: </strong> {Object.values(this.state.analytics[2])[0]}</ListGroupItemText>
                        </ListGroupItem>

                        <ListGroupItem>
                            <ListGroupItemText><strong>Total Downvotes: </strong> {Object.values(this.state.analytics[3])[0]}</ListGroupItemText>
                        </ListGroupItem>

                        <ListGroupItem>
                            <ListGroupItemText><strong>Most Popular Comment: </strong> {Object.values(this.state.analytics[4])[0].id}</ListGroupItemText>
                        </ListGroupItem>

                        <ListGroupItem>
                            <ListGroupItemText><strong>Most Commented Post: </strong> {Object.values(this.state.analytics[0])[0].id}</ListGroupItemText>
                        </ListGroupItem>

                    </ListGroup>
                    </div>
                </>
            :
                ""
            }
        </>
        )
    }
}

export default UserAnalytics