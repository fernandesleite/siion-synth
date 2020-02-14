import React from "react";
import * as Tone from "tone";
import Knob from "./Knob";

class Envelope extends React.Component {
  state = {
    attack: 2,
    decay: 0.2,
    sustain: 1,
    release: 0.8
  }
  componentDidMount = () => {this.sendEnvelope()}
  

  sendEnvelope = () => {
    this.props.getEnvelope(new Tone.AmplitudeEnvelope({
      attack: this.state.attack,
      decay: this.state.decay,
      sustain: this.state.sustain,
      relase: this.state.release
    }))
  }
  changeAttack = value => {
    console.log(value);
    this.setState({attack: value});
    this.sendEnvelope();
  };
  changeDecay = value => {};

  changeSustain = value => {};
  changeRelease = value => {};

  render() {
    return (
      <div>
        <Knob
          min={0}
          max={2}
          callback={this.changeAttack}
          initialKnobPosition={0}
        />
        <Knob
          min={-127}
          max={127}
          callback={this.changeAttack}
          initialKnobPosition={50}
        />
        <Knob
          min={-127}
          max={127}
          callback={this.changeAttack}
          initialKnobPosition={50}
        />
        <Knob
          min={-127}
          max={127}
          callback={this.changeAttack}
          initialKnobPosition={50}
        />
      </div>
    );
  }
}

export default Envelope;
