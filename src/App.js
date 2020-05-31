import React, {Component} from 'react';

import socketIOClient from "socket.io-client";


import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Player from './components/Player';
import Overlay from './components/Overlay';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.ENDPOINT = "http://127.0.0.1:4000";
    this.state = {
      msg: "Init",
      gameFinished: false,
      winner: {},
      playerOne: {currentScore: 0, newScore:0, name: "Roger", img:"/img/roger.png"},
      playerTwo: {currentScore: 0, newScore:0, name: "Tim", img:"/img/tim.png"}
    };
  }
  componentDidMount = () => {
    const socket = socketIOClient(this.ENDPOINT);
    socket.on("Bump", data => {
      this.setState({msg: data});
    });
    socket.on("abandoned", data => {
      //TODO show button to join new game
      this.setState({msg: data.opponent+" left game"});
    });
    socket.on("move state", data => {
      //TODO update scores and display message
    });
    socket.emit("new player",Math.random());
  }
  toggleShow = () => {
    this.setState({gameFinished:false})
  }
  addScore = () => {//This probably can be done better but for 5am can do...;
    let randomPlayer = Math.random();
    let players = [];
    players.push(randomPlayer < 0.5 ? {...this.state.playerOne} : {...this.state.playerTwo});
    players.push(randomPlayer < 0.5 ? {...this.state.playerTwo} : {...this.state.playerOne});
    players[0].currentScore = players[0].newScore
    players[0].newScore++;
    if(players[0].newScore===5 || (players[0].newScore===4 && players[1].newScore<=2))
    {
      this.setState({gameFinished:true,winner:players[0]});
      this.restart();
    }
    else if(players[0].newScore===4 && players[1].newScore===4)
    {
      players[1].currentScore = 4;
      players[1].newScore = 3;
      if(randomPlayer<0.5)
        this.setState({playerTwo:players[1]});
      else
        this.setState({playerOne:players[1]});
    }
    else
    {
      if(randomPlayer<0.5)
        this.setState({playerOne:players[0]});
      else
        this.setState({playerTwo:players[0]});
    }
  }
  restart = () => {
    this.setState({
      playerOne: {currentScore: 0, newScore:0, name: "Roger", img:"/img/roger.png"},
      playerTwo: {currentScore: 0, newScore:0, name: "Tim", img:"/img/tim.png"}
    });
  }
  render = () => {
  return (
    <Container className="p-3">
      <Jumbotron>
        <h1 className="header">Tennis Scoreboard</h1>
        <div>{this.state.msg}</div>
        <div style={{position:"relative"}}>
          <Overlay show={this.state.gameFinished} winner={this.state.winner} toggleShow={this.toggleShow.bind(this)} />
          <Row>
            <Col sm>
              <Player align="left" data={this.state.playerOne}></Player>
            </Col>
            <Col sm>
              <div className="score-button">
                <Button onClick={this.addScore}>Random</Button>
              </div>
            </Col>
            <Col sm>  
              <Player align="right" data={this.state.playerTwo}></Player>
            </Col>
          </Row>
        </div>
      </Jumbotron>
    </Container>
  );
  }
}

export default App;
