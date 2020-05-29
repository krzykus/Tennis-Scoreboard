import React, {Component} from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Player from './components/Player';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOne: {currentScore: 0, newScore:0, name: "Roger", img:"/img/roger.png"},
      playerTwo: {currentScore: 0, newScore:0, name: "Tim", img:"/img/tim.png"}
    };
  }

  addScore = () => {//This probably can be done better but for 5am can do...
    console.log(this.state);
    let randomPlayer = Math.random();
    let players = [];
    players.push(randomPlayer < 0.5 ? this.state.playerOne : this.state.playerTwo);
    players.push(randomPlayer < 0.5 ? this.state.playerTwo : this.state.playerOne);
    players[0].currentScore = players[0].newScore
    players[0].newScore++;
    if(players[0].newScore==5 || (players[0].newScore==4 && players[1].newScore==2))
    {
      //TODO: Show alert that player won
      if(randomPlayer<0.5)
      {
        //PlayerOne won
      }
      else
      {
        //PlayerTwo won
      }
      this.restart();
    }
    else if(players[0].newScore==4 && players[1].newScore==4)
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
      </Jumbotron>
    </Container>
  );
  }
}

export default App;
