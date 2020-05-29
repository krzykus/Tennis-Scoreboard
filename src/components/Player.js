import React from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

import './Player.css'

const Player = (props) => {

    let scores = ["0","15","30","40","A"];
    return (
    <Card style={{ width: 'calc(3rem + 14vmin)' }} className={props.align}>
        <Card.Header>
            <Image src={props.data.img} roundedCircle className="avatar"/>
            <Card.Title>{props.data.name}</Card.Title>
        </Card.Header>
        <Card.Body>
            <div className="score-card">
                <div className="score front">{scores[props.data.currentScore]}</div>
                <div className="score back">{scores[props.data.newScore]}</div>
            </div>
        </Card.Body>
    </Card>
    );
}

export default Player;