import React, { PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import tweenState from 'react-tween-state'
import _ from 'lodash'
import { connect } from 'react-redux'
import Sound from 'react-sound'
import { nextFragment } from '../actions'

const Appear = React.createClass({
  mixins: [tweenState.Mixin],
  propTypes: {
    children: PropTypes.node,
    style: PropTypes.object,
    route: PropTypes.object
  },
  contextTypes: {
    export: PropTypes.bool,
    overview: PropTypes.bool,
    slide: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  },
  getInitialState() {
    return {
      active: false,
      opacity: this.props.route.params.indexOf("export") !== -1 || this.props.route.params.indexOf("overview") !== -1 ? 1 : 0
    };
  },
  componentWillReceiveProps(nextProps) {
    const state = nextProps.fragment;
    const slide = this.props.route.slide;
    const fragment = findDOMNode(this.refs.fragment);
    const key = _.findKey(state.fragments[slide], {
      "id": parseInt(fragment.dataset.fid)
    });
    if (slide in state.fragments && state.fragments[slide].hasOwnProperty(key)) {
      const isPlaying = state.playingFragment == key && state.playingSlide === slide // Check is sound is play for current Appear

      this.setState({
        active: state.fragments[slide][key].visible,
        isPlaying
      }, () => {
        let endVal = this.state.active ? 1 : 0;
        if (this.props.route.params.indexOf("export") !== -1 || this.props.route.params.indexOf("overview") !== -1) {
          endVal = 1;
        }
        this.tweenState("opacity", {
          easing: tweenState.easingTypes.easeInOutQuad,
          duration: 300,
          endValue: endVal
        });
      });
    }
  },

  render() {
    const styles = {
      opacity: this.getTweeningValue("opacity")
    };
    const child = React.Children.only(this.props.children);

    const props = {
      style: Object.assign({}, this.props.style, styles),
      className: "fragment",
      ref: "fragment"
    }

    // Here to get the latest
    const isPlaying = this.state.isPlaying

    return (
      <div {...props}>
        { isPlaying && (
          <Sound url={this.props.soundUrl} // Replace me with dynamic
                 playStatus={isPlaying ? 'PLAYING' : 'STOPPED'}
                 playFromPosition={300 /* in milliseconds */}
                 onLoading={this.handleSongLoading}
                 onPlaying={this.handleSongPlaying}
                 onFinishedPlaying={() => this.props.dispatch(nextFragment())} />
        ) }
        { child }
      </div>
    )
  }
});

export default connect((state) => state)(Appear);
