import React, { Component, Fragment } from "react";

import DatePicker from "react-datepicker";
import { connect } from "react-redux";

import * as actions from '../../redux/cart/cart.actions';
import * as selectors from "../../redux/root-reducer";
import Spinner from '../Spinner';

class CheckoutForm extends Component {
  constructor() {
    super();
    this.state = {
      invoicedate: '',
      billingaddress: '',
      billingcity: '',
      billingstate: '',
      billingcountry: '',
      billingpostalcode: '',
      total: 0
    };
  }

  componentDidMount() {
    const { user, total } = this.props;
    this.setState({
      invoicedate: new Date().toISOString().split('T')[0],
      billingcity: user.city,
      billingstate: user.state,
      billingcountry: user.country,
      billingpostalcode: user.postalcode,
      total,
    });
  }

  render() {
    const { onCheckout, isLoading } = this.props;
    return (
      <Fragment>
          <div className="flex felx-row justify-center pa5">
          <div className="flex flex-column pa5-ns">
            <div className="w-100 tr">
              <DatePicker selected={Date.now()} disabled={true}/>
              <input
              placeholder="Billing address"/>
              <input
              placeholder="Billing City" 
              value={this.state.billingcity}/>
              <input
              placeholder="Billing State" 
              value={this.state.billingstate}/>
              <input
              placeholder="Billing country" 
              value={this.state.billingcountry}/>
              <input
              placeholder="Billing postalcode" 
              value={this.state.billingpostalcode}/>
              <input value={this.state.total} disabled={true}/>

              {!isLoading ? 
                <button
                  className="f6 dim ph3 pv2 mb0 mr3 dib white bg-green h-100"
                  onClick={() => onCheckout(this.state)}
                >Check Out!</button>
                :
                <Spinner/>
              }
            </div>
          </div>
          </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  total: selectors.getTotalPriceInvoice(state),
  user: selectors.getAuthUser(state),
  isLoading: selectors.isExecutingCheckout(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCheckout(details) {
    console.log("estos son los detalles de la compra",details);
    dispatch(actions.startCheckout(details))
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);


// dispatch(actions.startCheckout({
//   invoicedate: '2020/10/10',
//   billingaddress: 'A',
//   billingcity: 'B',
//   billingstate: 'C',
//   billingcountry: 'E',
//   billingpostalcode: 'X',
//   total: 0.99
// }))