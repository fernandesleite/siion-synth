import React from "react";
import * as Tone from "tone";

import "./Global.module.scss";

import style from "./App.module.scss";

import OscillatorSection from "./Oscillator";
import Envelope from "./Envelope";

class App extends React.Component {
  state = {
    oscOne: {},
    oscTwo: {},
    ampEnv: {}
  };
  playNote = () => {
    // var filter = new Tone.Filter(2000, "lowpass");

    let osc = [this.state.oscOne, this.state.oscTwo];
    osc.forEach(o => {
      o.toMaster();
      o.triggerAttackRelease(["C4", "E4", "G4"], "4n");
    });
  };
  componentDidMount = () => {
    Tone.context.resume();
  };

  getOscillator = (oscNum, osc) => {
    if (oscNum === 1) {
      this.setState({ oscOne: osc });
    } else {
      this.setState({ oscTwo: osc });
    }
  };

  getAmpValue = value => {
    this.setState({ ampEnv: value });
  };
  render() {
    return (
      <div className={style.synth}>
        <div className={style.bg}></div>
        <div className={style.synth__top}>
          <OscillatorSection getOscillator={this.getOscillator} ampEnv={this.state.ampEnv} oscNumber={1}/>
          <OscillatorSection getOscillator={this.getOscillator} oscNumber={2} />
        </div>
        <div className={style.synth__middle}>

        </div>
        <div className={style.synth__bottom}>
          <Envelope getAmpValue={this.getAmpValue} />
          <Envelope getAmpValue={this.getAmpValue} />
        </div>

        <button onClick={this.playNote}>Play Test</button>
      </div>
    );
  }
}

export default App;
