import React, { Component, Fragment } from "react";
import axios from "axios";

class CustomerTrackListItem extends Component {
  constructor() {
    super();
    this.state = {
      track: {},
      metadata: {}
    };
  }
  componentDidMount() {
    axios
      .get(`http://localhost:3000/tracks/${this.props.track.trackid}`)
      .then(response => {
        this.setState({ track: response.data[0] });
      });

    const name = encodeURI(this.props.track.name.replace(/[^a-z\s]+/gi, " "));
    const artist = encodeURI(
      this.props.track.artistname.replace(/[^a-z\s]+/gi, " ")
    );

    console.log(
      `http://localhost:3000/metadata/tracks?name=${name}&artist=${artist}`
    );

    axios
      .get(
        `http://localhost:3000/metadata/tracks?name=${name}&artist=${artist}`
      )
      .then(res => {
        this.setState({ metadata: res.data });
      });
  }

  render() {
    const { track, metadata } = this.state;
    return (
      <Fragment>
        <article className="dt w-100 bb b--black-05 pb2 mt2" href="#0">
          <div className="dtc w2 w3-ns v-mid">
            {metadata ? (
              <img
                src={`${metadata.image}`}
                alt="track"
                className="ba b--black-10 db br-100 w2 w3-ns h2 h3-ns"
              />
            ) : (
              <img
                src="https://image.flaticon.com/icons/svg/195/195163.svg"
                alt="track"
                className="ba b--black-10 db br-100 w2 w3-ns h2 h3-ns"
              />
            )}
          </div>
          <div className="dtc v-mid pl3">
            <h1 className="f6 f5-ns fw6 lh-title black mv0">{track.name}</h1>
            <h2 className="f6 fw4 mt0 mb0 black-60 fw6">{track.artistname}</h2>
            <h5 className="f6 fw4 mt0 mb0 black-60">
              {track.albumtitle} - {track.genrename}
            </h5>
          </div>
          <div className="dtc v-mid">
            <div className="w-100 tr">
              {(metadata && metadata.previewurl) ? (
                <button className="f6 button-reset bg-white ba b--black-10 dim pointer pv1 black-60">
                  Play
                </button>
              ) : (
                <span></span>
              )}
            </div>
          </div>
        </article>
      </Fragment>
    );
  }
}

export default CustomerTrackListItem;
