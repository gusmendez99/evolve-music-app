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

  handleFieldChange = event => {
    const { value, name } = event.target;
    switch(name){
      case 'billingaddres': {
        return this.setState({billingaddress: value});
      }
      case 'billingcity': {
        return this.setState({billingcity: value});
      }
      case 'billingstate': {
        return this.setState({billingstate: value});
      }
      case 'billingcountry': {
        return this.setState({billingcountry: value});
        
      }
      case 'billingpostalcode': {
        return this.setState({billingpostalcode: value});
      }
    }
  }

  render() {
    const { onCheckout, isLoading } = this.props;
    return (
      <Fragment>
        <div className="w-100 tc">
          <input
            className='w-100 bb-l bt-0-l br-0-l bl-0-l ma3-l'
            name={'billingaddres'}
            placeholder="Billing address"
            value={this.state.billingaddress}
            onChange={this.handleFieldChange} />
          <input
            className='w-100 bb-l bt-0-l br-0-l bl-0-l ma3-l'
            name={"billingcity"}
            placeholder="Billing City"
            value={this.state.billingcity}
            onChange={this.handleFieldChange} />
          <input
            className='w-100 bb-l bt-0-l br-0-l bl-0-l ma3-l'
            name={'billingstate'}
            placeholder="Billing State"
            value={this.state.billingstate}
            onChange={this.handleFieldChange} />
          <input
            className='w-100 bb-l bt-0-l br-0-l bl-0-l ma3-l'
            name='billingcountry'
            placeholder="Billing country"
            value={this.state.billingcountry}
            onChange={this.handleFieldChange} />
          <input
            className='w-100 bb-l bt-0-l br-0-l bl-0-l ma3-l'
            name={'billingpostalcode'}
            placeholder="Billing postalcode"
            value={this.state.billingpostalcode}
            onChange={this.handleFieldChange} />
          <input
            className='w-100 bb-l bt-0-l br-0-l bl-0-l ma3-l bg-#e1ebfc' value={`Total: $ ${this.state.total}`} disabled={true} />
            <DatePicker selected={Date.now()} disabled={true} />
          <div className="tc">
            {!isLoading ?
              <button
                className="f6 link dim ph3 pv2 mb2 dib white bg-dark-green w-100-ns  ma3-l" 
                onClick={() => onCheckout(this.state)}
              >Check Out!</button>
              :
              <Spinner />
            }
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
