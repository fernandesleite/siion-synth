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
    voices: 3,
    oscillator: new Tone.PolySynth(3, Tone.Synth, {
      oscillator: {
        type: "sine",
        count: 3,
        spread: 0,
        volume: 0
      }
    })
  };

  componentDidMount = () => {
    this.props.getOscillator(this.props.oscNumber, this.state.oscillator);
    console.log(this.state.oscillator.get("detune"));
  };

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
    console.log(this.state.oscillator.get("detune"));
  };
  changeSpread = value => {
    this.state.oscillator.voices.forEach(v => {
      console.log(v.oscillator.spread);
      v.oscillator.spread = Math.round(value);
      console.log(v.oscillator.spread);
    });
  };
  changeCount = e => {
    // console.log(e.target.value = e.target.value + 1);
    this.setState({ voices: e.target.value });
    this.state.oscillator.set("count", e.target.value);
    this.state.oscillator.voices.forEach(v => {
      console.log(v.oscillator);
      v.oscillator.count = this.state.voices;
    });
  };

  render() {
    let leds = waves.map((wave, i) => (
      <div key={i} className={style.waveform__ledWrapper}>
        <Led condition={wave === this.state.wave}></Led>
        <img className={style.waveImg} src={`./../${wave}.png`} alt={wave} />
      </div>
    ));
    return (
      <div>
        <h2>Oscillator {this.props.oscNumber}</h2>
        <div className={style.oscillator}>
          <div className={style.waveform}>
            <div className={style.btnWrapper}>
              <Button onClick={this.changeWaveform}></Button>
              <label>Waveform</label>
            </div>
            <div className={style.waveform__leds}>{leds}</div>
          </div>
          <div className={style.waveform__knobsSession}>
            <div className={style.knobWrapper}>
              <Knob
                value={200}
                min={-64}
                max={0}
                callback={this.changeVolume}
                initialKnobPosition={0}
              ></Knob>
              <label>Volume</label>
            </div>
            <div className={style.knobWrapper}>
              <Knob
                min={-127}
                max={127}
                callback={this.changeDetune}
                initialKnobPosition={50}
              ></Knob>
              <label>Detune</label>
            </div>
            <div className={style.knobWrapper}>
              <Knob
                value={200}
                min={30}
                max={100}
                callback={this.changeSpread}
                initialKnobPosition={0}
              ></Knob>
              <label>Spread</label>
            </div>
          </div>
          <div>
            <div className={style.unison}>
              <div className={style.btnWrapper}>
                <Button onClick={this.toggleUnison} />
                <label>Unison</label>
                <Led condition={this.state.unison} />
              </div>
              <input
                id="dragnumber"
                min="1"
                max="5"
                step="1"
                type="number"
                value={this.state.voices}
                onChange={this.changeCount}
                className={style.inputVoices}
              ></input>
              <label>Voices</label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Oscillator;
