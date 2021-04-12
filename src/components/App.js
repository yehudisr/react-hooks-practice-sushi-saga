import React, { useState, useEffect } from "react";
import SushiContainer from "./SushiContainer";
import Table from "./Table";

const API = "http://localhost:3001/sushis";

function App() {

  const [sushis, setSushis] = useState([])
  const [budget, setBudget] = useState(100)

 useEffect(()=> {
    fetch(API)
    .then(resp => resp.json())
    .then(sushis => {
      const updatedSushis = sushis.map((sushi) => {
        return {...sushi, eaten: false} }) 
        setSushis(updatedSushis)})
 }, [])

 function handleEatenSushi(event){
 if(budget >= event.price){
  const updatedSushis = sushis.map((sushi) => {
    if (sushi.id === event.id) 
    return {...sushi, eaten: true}
    return sushi
  })
  setSushis(updatedSushis)
  setBudget((budget => budget - event.price))
} else {
  alert("you cant afford this")
}
}

const eatenSushis = sushis.filter((sushi) => sushi.eaten)

  return (
    <div className="app">
      <SushiContainer 
      sushis={sushis} 
      onEatSushi={handleEatenSushi} 
      budget={budget} 
      onSetBudget={setBudget}/>
      <Table budget={budget} plates={eatenSushis} />
    </div>
  );
}

export default App;
