import React from "react";

import style from "./Knob.module.scss";

class Knob extends React.Component {
  state = {
    initialMousePoint: 0,
    currentKnobPos: (this.props.initialKnobPosition * 275) / 100,
    value: 0,
    activeTick: 0
  };
  knobEl = React.createRef();

  componentDidMount = () => {
    let initialKnobPosition = (this.props.initialKnobPosition * 275) / 100;
    this.knobEl.current.style.transform = `rotate(${initialKnobPosition}deg)`;
    this.setState(
      {
        value:
          ((Math.abs(this.props.min) + this.props.max) *
            this.state.currentKnobPos) /
            275 -
          Math.abs(this.props.min)
      },
      () => {
        this.props.callback(this.state.value);
      }
    );
  };
  startDrag = e => {
    document.addEventListener("mousemove", this.onDrag, false);
    document.addEventListener("mouseup", this.endDrag, false);
    this.setState({ initialMousePoint: e.clientY });
  };
  onDrag = e => {
    e.preventDefault();
    let turn = this.state.initialMousePoint - e.clientY;
    let turningKnob = this.state.currentKnobPos + turn;

    if (turningKnob <= 0) {
      turningKnob = 0;
    } else if (turningKnob >= 275) {
      turningKnob = 275;
    }
    this.props.callback(this.state.value);
    this.setState({
      value:
        ((Math.abs(this.props.min) + this.props.max) * turningKnob) / 275 -
        Math.abs(this.props.min)
    });
    this.knobEl.current.style.transform = "rotate(" + turningKnob + "deg)";
    this.setState({ activeTick: Math.round(turningKnob / 10) });
  };

  endDrag = e => {
    document.removeEventListener("mousemove", this.onDrag, false);
    document.removeEventListener("mouseup", this.endDrag, false);
    this.setState({
      currentKnobPos: parseInt(
        this.knobEl.current.style.transform.replace(/[^0-9]/g, "")
      )
    });
  };
  render() {
    const Ticks = () => {
      let ticksArray = [];
      for (let i = 28; i > 0; i--) {
        ticksArray.push(
          <div
            key={i}
            id={i}
            className={
              this.state.activeTick >= i
                ? `${style.tick} ${style.activetick}`
                : style.tick
            }
          ></div>
        );
      }
      return ticksArray;
    };
    return (
      <div className={style.knobSurround}>
        <div
          ref={this.knobEl}
          className={style.knob}
          onMouseDown={this.startDrag}
        ></div>
        <div className={style.ticks}>
          <Ticks />
        </div>
      </div>
    );
  }
}
export default Knob;
