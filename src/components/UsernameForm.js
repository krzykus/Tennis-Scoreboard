import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class UsernameForm extends Component {
    constructor(props) {
      super(props);
      this.usernameHandler = props.handler;
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleSubmit(event) {
      this.usernameHandler(escape(event.target.username.value));
      event.preventDefault();
    }
    render() {
      return (
        <Form onSubmit={this.handleSubmit}>
            <Form.Group md="4" controlId="username">
                <Form.Control
                    required
                    type="text"
                    placeholder="Username"
                />
            </Form.Group>
            <Button type="submit">Submit form</Button>

        </Form>
        
      );
    }
}

export default UsernameForm;