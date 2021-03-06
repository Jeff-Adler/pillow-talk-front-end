import React from 'react';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';


 class UserEditForm extends React.Component {

    state={
        birthdate: "",
        gender: "",
        gender_other:"",
        location: ""
    }

    submitHelper = (e) => {
        e.preventDefault()
        this.props.editHandler(this.state)
    }


    locationChangeHandler = (e) => {
        this.setState({
            location: e.target.value
        })
    }

    genderChangeHandler = (e) => {
        this.setState({
            gender: e.target.value
        })
    }

    genderOtherChangeHandler = (e) => {
        this.setState({
            gender_other: e.target.value
        })
    }

    birthDateChangeHandler = (e) => {
        this.setState({
            birthdate: e.target.value
        })
    }

    render() {
        return(
            <>
                {
                    this.props.currentUser.id === this.props.user.id
                ?
                    <>
                        <h3>Edit User Profile</h3><br/>
                            
                        <div className="formCenter">
                            
                            <Form onSubmit={this.submitHelper} style={{ width: "300px" }}>
                            
                            <FormGroup >
                                <Label for="birthdate" className="mr-sm-2" >Date of Birth</Label>
                                <Input style={{ width: "300px" }} type="date" name="birthdate" placeholder="birthdate" value={this.state.birthdate} onChange={this.birthDateChangeHandler} />
                            </FormGroup>

                            <FormGroup tag="fieldset">
                        
                            <legend>Gender</legend>

                            <FormGroup check>
                                <Label check>
                                    <Input 
                                        type="radio" 
                                        value="Male"
                                        name="gender"
                                        checked={this.state.gender === "Male"}
                                        onChange={this.genderChangeHandler}/>
                                        Male
                                </Label>
                            </FormGroup>

                            <FormGroup check>
                                <Label check>
                                    <Input 
                                        type="radio" 
                                        value="Female"
                                        name="gender"
                                        checked={this.state.gender === "Female"}
                                        onChange={this.genderChangeHandler}/>
                                        Female
                                </Label>
                            </FormGroup>

                            <FormGroup check>
                                <Label check>
                                    <Input 
                                        type="radio" 
                                        value="Other"
                                        name="gender"
                                        checked={this.state.gender === "Other"}
                                        onChange={this.genderChangeHandler} />
                                        Other
                                </Label>
                            </FormGroup>

                            <FormGroup>
                                <Label for="gender">Please Specify:</Label>
                                <Input style={{ width: "300px" }} onChange={this.genderOtherChangeHandler} 
                                type="text" 
                                name="gender_other" 
                                value={this.state.gender === "Other" ? this.state.gender_other : ''}
                                disabled={this.state.gender !== "Other" ? 'disabled' : ''} />
                            </FormGroup>

                            </FormGroup>

                            <FormGroup>
                                <Label for="location" className="mr-sm-2">Location</Label>
                                <Input style={{ width: "300px" }} type="text" name="location" placeholder="location" autoComplete="address-level1" value={this.state.location} onChange={this.locationChangeHandler}  />
                            </FormGroup>

                            <Button type="submit" value="Login">Submit</Button><br/><br/>
                            </Form>
                        </div>
                    </>
                :
                    <h3>You're not allowed here!</h3>
                }
            </>
            
        )
    }

 }


export default UserEditForm