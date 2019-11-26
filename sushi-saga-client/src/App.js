import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"


class App extends Component {
  constructor(){
    super()
    this.state = {
      sushis: [],
      renderedSushis: [],
      currentIndex: 0,
      emptyPlates: [],
      initialMoney: 50,
    }
  }

  componentDidMount(){
    fetch(API)
    .then(r => r.json())
    .then(response => {
      this.setState({
        sushis: response
      }, this.sendSushis)
    })
  }

  sendSushis = () => {
    const newSushis = []
    let idx = this.state.currentIndex
    let counter = idx + 4 
    for(idx; idx < counter; idx++){
      newSushis.push({...this.state.sushis[idx], isEaten: false})
    }
    this.setState({
      renderedSushis: newSushis 
    }, function(){
      this.setState({
        currentIndex: this.state.currentIndex + 4
      })
    })
  }

  changeEaten = (sushi) => {
    console.log(sushi)
    if(this.state.initialMoney >= sushi.price){
      const newArray = this.state.renderedSushis.map((eachSushi) => {
        return eachSushi === sushi ? {...eachSushi, isEaten: true} : eachSushi
      })
      this.setState({
        renderedSushis: newArray, emptyPlates: [...this.state.emptyPlates, "1"], initialMoney: this.state.initialMoney - sushi.price
      })
    } else {
      alert("you are broke!")
    }
  }



  render() {
    // console.log(this.state.sushis)
    return (
      <div className="app">
        <SushiContainer sendSushis={this.sendSushis} renderedSushis={this.state.renderedSushis} changeEaten={this.changeEaten} />
        <Table emptyPlates={this.state.emptyPlates} money={this.state.initialMoney} />
      </div>
    );
  }
}

export default App;