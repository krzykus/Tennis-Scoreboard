import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

const Message = (props) => {
    return (
    <>
        <Alert show={props.show} variant="success" transition={null}>
        <div>
            {props.children}
        </div>
        <div className="d-flex justify-content-end">
          <Button onClick={() => props.handler()} variant="outline-success">
            Close!
          </Button>
        </div>
      </Alert>
    </>
    )
}

export default Message;