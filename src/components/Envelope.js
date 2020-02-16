import React from "react";
import Knob from "./Knob";

import style from "./Envelope.module.scss";

class Envelope extends React.Component {
  state = {
    attack: 2,
    decay: 0.2,
    sustain: 1,
    release: 0.8
  };
  componentDidMount = () => {
    this.props.getAmpValue(this.sendEnvelope());
  };

  sendEnvelope = () => {
    return {
      attack: this.state.attack,
      decay: this.state.decay,
      sustain: this.state.sustain,
      release: this.state.release
    };
  };
  changeAttack = value => {
    this.setState({ attack: value });
    this.props.getAmpValue(this.sendEnvelope());
  };
  changeDecay = value => {
    this.setState({ decay: value });
    this.props.getAmpValue(this.sendEnvelope());
  };

  changeSustain = value => {
    this.setState({ sustain: value });
    this.props.getAmpValue(this.sendEnvelope());
  };
  changeRelease = value => {
    this.setState({ release: value });
    this.props.getAmpValue(this.sendEnvelope());
  };

  render() {
    return (
      <div className={style.container}>
        <h2>Amplitude Envelope</h2>
        <div className={style.envelope}>
          <div className={style.knobWrapper}>
            <Knob
              min={0.1}
              max={2}
              callback={this.changeAttack}
              initialKnobPosition={0}
            />
            <label>Attack</label>
          </div>
          <div className={style.knobWrapper}>
            <Knob
              min={1}
              max={2}
              callback={this.changeDecay}
              initialKnobPosition={0}
            />
            <label>Decay</label>
          </div>
          <div className={style.knobWrapper}>
            <Knob
              min={1}
              max={1}
              callback={this.changeSustain}
              initialKnobPosition={0}
            />
            <label>Sustain</label>
          </div>
          <div className={style.knobWrapper}>
            <Knob
              min={0.1}
              max={4}
              callback={this.changeRelease}
              initialKnobPosition={0}
            />
            <label>Release</label>
          </div>
        </div>
      </div>
    );
  }
}

export default Envelope;
