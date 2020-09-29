import React from 'react';
import "../src/styles/index.scss"
import Button from "./components/Button/Button";
import TreeGraph from "./components/TreeGraph/TreeGraph";
import Border from "./components/Border/Border";
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
        <Border style={{width:'400px',height:'300px'}}>你好啊 </Border>
      </div>
    </div>
  );
}

export default App;
