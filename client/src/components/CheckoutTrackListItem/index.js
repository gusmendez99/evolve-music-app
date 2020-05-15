import React, { Component, Fragment } from "react";
import axios from "axios";

import { connect } from "react-redux";

import * as actions from '../../redux/cart/cart.actions';
import * as selectors from "../../redux/root-reducer";


class CheckoutTrackListItem extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 0,
    };
  }


  render() {
    const { track, permissions, onDelete } = this.props;
    return (
      <Fragment>
        <article className="dt w-100 bb b--black-05 pb2 mt2" href="#0">
          <div className="dtc v-mid pl3">
            <h1 className="f6 f5-ns fw6 lh-title black mv0">{track.name}</h1>
            <h2 className="f6 fw4 mt0 mb0 black-60 fw6">{track.artistname}</h2>
            <h5 className="f6 fw4 mt0 mb0 black-60">
              {track.albumtitle} - {track.genrename}
            </h5>
          </div>
          <div className="dtc v-mid">
            <div className="w-100 tr">
              {permissions.isCustomer ?
                <span></span>
                :
                <input type="number" id="quantity" name="quantity" min="1" max="5"></input>

              }
              <button
                className="f6 dim ph3 pv2 mb0 mr3 dib red bg-white h-100"
                onClick={onDelete}
              >X</button>
            </div>
          </div>
        </article>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, { track }) => ({
  permissions: selectors.getAuthUserPermissions(state),
});

const mapDispatchToProps = (dispatch, { track }) => ({
  onDelete() {
    dispatch(actions.removeTrackFromCart(track.id))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutTrackListItem);
