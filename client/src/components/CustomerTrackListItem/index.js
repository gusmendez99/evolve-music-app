import React, { Component, Fragment } from "react";
import axios from "axios";

class CustomerTrackListItem extends Component {
  constructor() {
    super();
    this.state = {
      track: {}
    };
  }
  componentDidMount() {
    axios
      .get(`http://localhost:3000/tracks/${this.props.track.trackid}`)
      .then(response => {
        this.setState({ track: response.data[0] });
      });
  }

  render() {
    const {track} = this.state;
    return (
      <Fragment>
        <article className="dt w-100 bb b--black-05 pb2 mt2" href="#0">
          <div className="dtc w2 w3-ns v-mid">
            <img
              src="https://image.flaticon.com/icons/svg/195/195163.svg"
              className="ba b--black-10 db br-100 w2 w3-ns h2 h3-ns"
            />
          </div>
          <div className="dtc v-mid pl3">
            <h1 className="f6 f5-ns fw6 lh-title black mv0">{track.name}</h1>
            <h2 className="f6 fw4 mt0 mb0 black-60 fw6">{track.albumtitle}</h2>
            <h5 className="f6 fw4 mt0 mb0 black-60">{track.genrename}</h5>
          </div>
          <div className="dtc v-mid">
            <form className="w-100 tr">
              <button
                className="f6 button-reset bg-white ba b--black-10 dim pointer pv1 black-60"
                type="submit"
              >
                Play
              </button>
            </form>
          </div>
        </article>
      </Fragment>
    );
  }
}

export default CustomerTrackListItem;
