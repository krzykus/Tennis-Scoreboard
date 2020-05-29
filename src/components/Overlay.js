import React from 'react';
import Toast from 'react-bootstrap/Toast';

import './Overlay.scss'

//class Overlay extends Component {
const Overlay = (props) => {
    return (
        <Toast show={props.show} onClose={props.toggleShow} transition={false}>
            <Toast.Header>
                <strong className="mr-auto">Game Finished</strong>
            </Toast.Header>
            <Toast.Body>
                <img src={props.winner.img} alt=""/>
                <span>{props.winner.name} has won!</span>
                </Toast.Body>
        </Toast>
    );
  }

export default Overlay;