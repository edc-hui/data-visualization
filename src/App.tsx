import React, {useEffect} from 'react';
import "../src/styles/index.scss"
// import Button from "./components/Button/Button";
// import TreeGraph from "./components/TreeGraph/TreeGraph";
// import Border from "./components/Border/Border";
// import FlyLine from "./components/FlyLine/FlyLine";
import {getPathLength} from "./utils";
import Split from "./components/SplitPanel";

const Panel = Split.Panel;


function App() {

  useEffect(() => {
    console.log(getPathLength("M0.5,0.5 L300,0.5 L300,200 L0.5,200 L0.5,0.5"), '会是谁遇上')
  }, [])

  const click = () => {

  }

  return (
    <div className="App" style={{width: '100vw', height: '100vh', backgroundColor: '#444'}}>
      <div style={{
        width: '800px',
        height: '500px',
        position: 'absolute',
        top: '20%',
        left: '20%',
        backgroundColor: '#fff'
      }}>
        {/*<FlyLine*/}
        {/*  path="M0.828125,23 C13.5629422,16.6325914 31.8615403,6.50147786 45.828125,4 C59.6439483,1.52552418 73.8010881,0.507823268 87.828125,1 C133.714184,2.61003717 143.53015,67.2645815 145.828125,98 C146.157571,102.406334 150.417543,154.618992 143.828125,173 C128.605165,215.464046 111.526592,241.818576 113.828125,289 C114.936652,311.724803 141.243387,323.598351 159.828125,328 C208.613116,339.55434 278.272819,344.973093 317.828125,307 C320.303838,304.623316 322.024881,301.336552 322.828125,298 C326.39398,283.187985 327.310665,267.823582 330.828125,253 C332.000331,248.059989 335.508192,243.902607 336.828125,239 C347.267607,200.22478 361.470463,160.046235 346.828125,121"*/}
        {/*/>*/}
        <Split
          // mode="vertical"
        >
          <Panel>
            <Split mode="vertical">
              <Panel><div onClick={click}>面板一</div></Panel>
              <Panel><div onClick={click}>面板二</div></Panel>
            </Split>

          </Panel>
          <Panel>
            <Split mode="vertical">
              <Panel><div style={{backgroundColor:"pink"}}>面板三</div></Panel>
              <Panel><div style={{backgroundColor:"hotpink"}}>面板四</div></Panel>
            </Split>

          </Panel>
        </Split>
      </div>
    </div>
  );
}

export default App;
