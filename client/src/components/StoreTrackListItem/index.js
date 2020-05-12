import React, { Component, Fragment } from "react";
import axios from "axios";

import { connect } from "react-redux";

import * as actions from '../../redux/cart/cart.actions';
import * as selectors from "../../redux/root-reducer";


class StoreTrackListItem extends Component {
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
		const {isAddedToCart, authUser, addTrackToCart} = this.props;
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
							{!isAddedToCart ? (
								<button
								className="f6 dim ph3 pv2 mb0 mr3 dib white bg-green h-100"
								onClick={addTrackToCart}
								>Add to Cart</button>
							): (<p>Added to cart</p>)
							}
            </div>
          </div>
        </article>
      </Fragment>
    );
  }
}
const mapStateToProps = (state, {track}) => ({
	authUser: selectors.getAuthUser(state),
	isAddedToCart: (selectors.getCartTrack(state, track.trackid) === undefined) ? false: true,
});

const mapDispatchToProps = (dispatch, {track}) => ({
		addTrackToCart(){ 
			dispatch(actions.addTrackToCart({...track, 'quantity': 1}))
		}
});

export default connect(mapStateToProps,mapDispatchToProps)(StoreTrackListItem);
