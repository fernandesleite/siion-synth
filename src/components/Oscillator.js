import React from "react";

import * as Tone from "tone";

import Button from "./Button";
import Led from "./Led";
import style from "./Oscillator.module.scss";

const waves = ["sine", "square", "sawtooth", "triangle"];
class Oscillator extends React.Component {
  state = {
    wave: "sine",
    oscillator: new Tone.PolySynth(1, Tone.Synth, {
      oscillator: {
        type: this.wave
      }
    })
  };

  componentDidMount = () => {
    this.props.getOscillator(this.props.oscNumber, this.state.oscillator);
  };

  changeWaveform = () => {
    let nextIndex = waves.indexOf(this.state.wave) + 1;
    nextIndex = nextIndex > waves.length - 1 ? 0 : nextIndex++;
    this.setState({ wave: waves[nextIndex] });
    this.state.oscillator.set({
      oscillator: {
        type: waves[nextIndex]
      }
    });
  };

  render() {
    let leds = waves.map((wave, i) => (
      <div className={style.waveform__ledWrapper}>
        <Led condition={wave === this.state.wave}></Led>
        <span>{wave}</span>
      </div>
    ));
    return (
      <div className={style.oscillator}>
        <h2>Oscillator {this.props.oscNumber}</h2>
        <div className={style.waveform}>
          <div className={style.waveform__btnWrapper}>
            <Button onClick={this.changeWaveform}></Button>
            <label>Waveform</label>
          </div>
          <div className={style.waveform__leds}>{leds}</div>
        </div>
      </div>
    );
  }
}

export default Oscillator;
