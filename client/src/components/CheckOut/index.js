import React, { Component } from 'react';

import CheckoutTrackListItem from '../CheckoutTrackListItem';
import * as selectors from '../../redux/root-reducer';
import { connect } from 'react-redux';

class CheckOut extends Component {
  constructor(){
    super()
    this.state = {
      checkOutTracks: []
    }

  };


  render() {
    const { tracks } = this.props;
    return (
      <div>
        {tracks.length === 0 ? <h1>No hay tracks en tu carrito, intenta agregar</h1> :
          tracks.map(track => (
            <CheckoutTrackListItem
              key={track.id}
              track={track}
            />
            ))
        }
      </div>
    );
  
  }
}

// dispatch(actions.startCheckout({
//   invoicedate: '2020/10/10',
//   billingaddress: 'A',
//   billingcity: 'B',
//   billingstate: 'C',
//   billingcountry: 'E',
//   billingpostalcode: 'X',
//   total: 0.99
// }))


export default connect(
  state => ({
    tracks : selectors.getCartTracks(state),
  }),
  undefined
)(CheckOut);