import React from 'react';
import "../src/styles/index.scss"
import Button from "./components/Button/Button";
import TreeGraph from "./components/TreeGraph/TreeGraph";

function App() {

  const data = {
    name: '根节点',
    fill: 'red',
    stroke: '#333',
    strokeWidth: 3,
    r: 40,
    children: [
      {
        name: '节点一',
        fill: 'red',
        stroke: '#333',
        strokeWidth: 3,
        r: 30,
        distance: 99,
        children: [
          {
            name: '节点二',
            fill: 'red',
            stroke: '#333',
            strokeWidth: 3,
            r: 30,
            distance: 78
          },
          {
            name: '节点三',
            fill: 'red',
            stroke: '#333',
            strokeWidth: 3,
            r: 30,
            distance: 56
          },
        ]
      },

      {
        name: '节点二',
        fill: 'red',
        stroke: '#333',
        strokeWidth: 3,
        r: 30,
        distance: 78
      },
      {
        name: '节点三',
        fill: 'red',
        stroke: '#333',
        strokeWidth: 3,
        r: 30,
        distance: 56
      },
      {
        name: '节点四',
        fill: 'red',
        stroke: '#333',
        strokeWidth: 3,
        r: 30,
        distance: 150
      },
      {
        name: '节点三',
        fill: 'red',
        stroke: '#333',
        strokeWidth: 3,
        r: 30,
        distance: 56
      },
      {
        name: '节点四',
        fill: 'red',
        stroke: '#333',
        strokeWidth: 3,
        r: 30,
        distance: 150
      },
      {
        name: '节点四',
        fill: 'red',
        stroke: '#333',
        strokeWidth: 3,
        r: 30,
        distance: 150
      },
      {
        name: '节点三',
        fill: 'red',
        stroke: '#333',
        strokeWidth: 3,
        r: 30,
        distance: 56
      },

    ]
  };

  return (
    <div className="App" style={{width: '100vw', height: '100vh', backgroundColor: '#444'}}>
      <div style={{width: '800px', height: '500px', position:'absolute',top:'20%',left:'20%'}}>
        <Button type={"dataV-animation2"}>按钮</Button>
        <Button type={"dataV-animation1"}>按钮</Button>
      </div>
    </div>
  );
}

export default App;
