import React from "react";
import "./Timer.css";
import Button from "../Button/Button";

import { connect } from "react-redux";
import {
  COUNTDOWN,
  COUNTDOWNATZERO,
  DECREMENT,
  INCREMENT,
  RESET,
} from "../../Redux/actions";

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.timer = 0;
  }

  secondsToTime = (secs) => {
    let hours = Math.floor(secs / (60 * 60));
    let minutes = Math.floor((secs % (60 * 60)) / 60);
    let seconds = Math.ceil((secs % (60 * 60)) % 60);

    return {
      h: hours,
      m: minutes,
      s: seconds,
    };
  };

  incTimer = () => {
    if (this.props.seconds >= 0) {
      this.props.onIncrement(this.secondsToTime);
    }
  };

  decTimer = () => {
    if (this.props.seconds > 0 && this.timer === 0) {
      this.props.onDecrement(this.secondsToTime);
    }
  };

  startTimer = () => {
    if (this.props.seconds > 0 && this.timer === 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  };

  countDown = () => {
    this.props.onCountDown(this.secondsToTime);

    if (this.props.seconds === 0) {
      clearInterval(this.timer);
      this.props.onCountDownAtZero();
    }
  };

  stopTimer = () => {
    if (this.props.seconds !== 0 && this.timer !== 0) {
      clearInterval(this.timer);
      this.timer = 0;
    }
  };

  resetTimer = () => {
    this.props.onReset();

    if (this.timer !== 0) {
      clearInterval(this.timer);
      this.timer = 0;
    }
  };

  timeFormatter = (time) => {
    let { h, m, s } = time;

    if (h.toString().length < 2) {
      h = `0${h}`;
    }
    if (m.toString().length < 2) {
      m = `0${m}`;
    }
    if (s.toString().length < 2) {
      s = `0${s}`;
    }
    return { h, m, s };
  };

  render() {
    let { h, m, s } = this.timeFormatter(this.props.time);

    return (
      <React.Fragment>
        <span className="timer">
          {h}:{m}:{s}
        </span>
        <div>
          <Button clicked={this.incTimer}>+</Button>
          <Button clicked={this.startTimer}>Start</Button>
          <Button clicked={this.stopTimer}>Stop</Button>
          <Button clicked={this.resetTimer}>Reset</Button>
          <Button clicked={this.decTimer}>-</Button>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    time: state.time,
    seconds: state.seconds,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrement: (fn) => dispatch({ type: INCREMENT, secToTime: fn }),
    onDecrement: (fn) => dispatch({ type: DECREMENT, secToTime: fn }),
    onCountDown: (fn) => dispatch({ type: COUNTDOWN, secToTime: fn }),
    onCountDownAtZero: () => dispatch({ type: COUNTDOWNATZERO }),
    onReset: () => dispatch({ type: RESET }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
