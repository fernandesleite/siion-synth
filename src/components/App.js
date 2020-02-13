import React from "react";
import * as Tone from "tone";

import "./Global.module.scss";

import OscillatorSection from "./Oscillator";
class App extends React.Component {
  state = {
    oscOne: {},
    oscTwo: {}
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
  render() {
    return (
      <div>
        <OscillatorSection
          getOscillator={this.getOscillator}
          oscNumber={1}
        ></OscillatorSection>
        <OscillatorSection
          getOscillator={this.getOscillator}
          oscNumber={2}
        ></OscillatorSection>

        <button onClick={this.playNote}>Play Test</button>
      </div>
    );
  }
}

export default App;
