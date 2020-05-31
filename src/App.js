import React, {Component} from 'react';

import socketIOClient from "socket.io-client";


import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Player from './components/Player';
import Overlay from './components/Overlay';
import UsernameForm from './components/UsernameForm';
import Message from './components/Message';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.ENDPOINT = "http://127.0.0.1:4000";
    this.socket = socketIOClient(this.ENDPOINT);
    this.state = {
      msg: {value: "",display:false},

      playerID: -1,
      gameFinished: false,
      winner: {},
      playerOne: {currentScore: 0, newScore:0, name: "???", img:"/img/roger.png"},
      playerTwo: {currentScore: 0, newScore:0, name: "???", img:"/img/tim.png"}
    };
  }
  componentDidMount = () => {
    this.socket.on("abandoned", data => {
      //TODO show button to join new game
      this.setMessage(data.opponent+" left game");
    });

    this.socket.on("move state", data => {
      console.log(data)
      if(data.move==="Awaiting move") {
        this.setMessage("Awaiting for all players to make a move");
      }
      else if(data.move==="Scored") {
        //Update Scores
        if(data.serving===this.state.playerID) {
          let playerOne = {...this.state.playerOne};
          playerOne.currentScore = playerOne.newScore;
          playerOne.newScore = data.scores[this.state.playerID];
          this.setMessage("You've scored!");
          this.setState({playerOne:playerOne});
        }
        else {
          
          let playerTwo = {...this.state.playerTwo};
          playerTwo.currentScore = playerTwo.newScore;
          playerTwo.newScore = data.scores[1-this.state.playerID];
          this.setMessage(playerTwo.name+" has scored!");
          this.setState({playerTwo:playerTwo});
        }
      }
      else if(data.move==="Continue") {

      }
      else if(data.move==="Finished") {
        let winner = this.state.playerID===data.serving ? this.state.playerOne : this.state.playerTwo;
        this.setState({gameFinished:true, winner:winner});
        this.setMessage("");
      }
    });
    this.socket.on("created", data => {
      console.log("created")
      console.log(data);
    })
    this.socket.on("game started", data => {
      this.setState({msg: "Game started! Playing against: "+data.opponent, playerID:data.playerID})
      let opponent = {...this.state.playerTwo};
      opponent.name = data.opponent;
      this.setState({playerTwo:opponent}); 
      console.log("game started")
      console.log(data);
    })
  }
  makeMove = (move) => {
    this.socket.emit("move made",move);
  }
  setUsername = (username) => {
    let player = {...this.state.playerOne};
    player.name = username;
    this.setState({playerOne:player});
    this.socket.emit("new player",username);
  }
  setMessage = (msg) => {
    this.setState({
      msg:{value:msg, display:true}
    });
  }
  closeMessage = () => {
    this.setState({
      msg:{display:false}
    })
  }
  toggleShow = () => {
    this.setState({gameFinished:false})
  }
  restart = () => {
    let playerOne = {...this.state.playerOne};
    let playerTwo = {...this.state.playerTwo};
    playerOne.currentScore = playerTwo.currentScore = 0;
    playerOne.newScore = playerTwo.newScore = 0;

    this.setState({
      playerOne: playerOne,
      playerTwo: playerTwo
    });
  }
  render = () => {
  return (
    <Container className="p-3">
      <Jumbotron>
        <h1 className="header">Tennis Scoreboard</h1>
          <Message show={this.state.msg.display} handler={this.closeMessage}>{this.state.msg.value}</Message>
        <div>
          {this.state.playerID===-1? <UsernameForm handler={this.setUsername} />: null}
        </div>
        <div style={{position:"relative"}}>
          <Overlay show={this.state.gameFinished} winner={this.state.winner} toggleShow={this.toggleShow.bind(this)} />
          <Row>
            <Col sm>
              <Player align="left" data={this.state.playerOne}></Player>
            </Col>
            <Col sm>
              <div className="score-button">
                <Button onClick={()=>this.makeMove('left')}>Left</Button>
                <Button onClick={()=>this.makeMove('right')}>Right</Button>
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
