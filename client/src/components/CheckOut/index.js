import React, { Component, Fragment } from 'react';

import CheckoutTrackListItem from '../CheckoutTrackListItem';
import CheckoutForm from '../CheckoutForm';
import * as selectors from '../../redux/root-reducer';
import { connect } from 'react-redux';
import logo from '../../noItemsInCart.png';

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
      <Fragment>
        {tracks.length === 0 ?
          <div className="flex felx-row justify-center pa5">
            <div className='flex flex-column justify-center '>
              <div>
                <h1>No hay tracks en tu carrito, intenta agregar</h1>
              </div>
              <div className="pa2">
                <img src={logo} />
              </div>
            </div>
          </div>  
          :
          <div>
          <div className='flex justify-center'>
            <h1>Por comprar ... </h1>
          </div>
            <div className='flex justify-around'>
              <div  class="w-25 pa4 ">
              <CheckoutForm />
              </div>
              <div  class="w-25 pa4">
              {
                tracks.map(track => (
                  <CheckoutTrackListItem
                    key={track.id}
                    track={track}
                  />
                ))
              }
              </div>
            </div>
          </div>
        }
      </Fragment>
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