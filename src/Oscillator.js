import React from "react";

import * as Tone from "tone";

import Button from "./Button";
import Led from "./Led";
import Knob from "./Knob";
import style from "./Oscillator.module.scss";

const waves = ["sine", "square", "sawtooth", "triangle"];
const wavesFat = ["fatsine", "fatsquare", "fatsawtooth", "fattriangle"];
class Oscillator extends React.Component {
  state = {
    wave: "sine",
    unison: false,
    oscillator: new Tone.PolySynth(3, Tone.Synth, {
      "oscillator": {
        "type" : "sine",
        "count" : 3,
        "spread" : 100
      }
    })
  };

  componentDidMount = () => {
    this.props.getOscillator(this.props.oscNumber, this.state.oscillator);
  };

  componentDidUpdate = () => {
    console.log("update render ")
  }

  changeWaveform = () => {
    let nextIndex = waves.indexOf(this.state.wave) + 1;
    nextIndex = nextIndex > waves.length - 1 ? 0 : nextIndex++;
    this.setState({ wave: waves[nextIndex] });
    this.state.oscillator.set({
      oscillator: {
        type: this.state.unison ? wavesFat[nextIndex] : waves[nextIndex]
      }
    });
  };

  toggleUnison = () => {
    this.setState({ unison: !this.state.unison }, () => {
      let currentWave = this.state.oscillator.get().oscillator.type;
      this.state.oscillator.set({
        oscillator: {
          type: this.state.unison ? `fat${currentWave}` : currentWave.slice(3)
        }
      });
    });
  };

  changeVolume = value => {
    this.state.oscillator.set("volume", Number(value.toFixed(2)));
  };
  changeDetune = value => {
    this.state.oscillator.set("detune", Number(value.toFixed(2)));
  };
  changeSpread = value => {
    this.state.oscillator.set("spread", Math.round(value));
  }

  render() {
    let leds = waves.map((wave, i) => (
      <div key={i} className={style.waveform__ledWrapper}>
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
            <Button onClick={this.toggleUnison}></Button>
            <label>Unison</label>
            <Led condition={this.state.unison}></Led>
          </div>
          <div className={style.waveform__leds}>{leds}</div>
          <div className={style.waveform__knobsSession}>
            <div className={style.waveform__knobWrapper}>
              <Knob
                value={200}
                min={-64}
                max={0}
                callback={this.changeVolume}
                initialKnobPosition={0}
              ></Knob>
              <label>Volume</label>
            </div>
            <div className={style.waveform__knobWrapper}>
              <Knob
                value={200}
                min={-127}
                max={127}
                callback={this.changeDetune}
                initialKnobPosition={0}
              ></Knob>
              <label>Detune</label>
            </div>
            <div className={style.waveform__knobWrapper}>
              <Knob
                value={200}
                min={0}
                max={100}
                callback={this.changeSpread}
                initialKnobPosition={0}
              ></Knob>
              <label>Spread</label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Oscillator;
