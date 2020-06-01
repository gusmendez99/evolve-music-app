import React, { Component, Fragment } from "react";
import sampleSize from 'lodash/sampleSize';
import sumBy from 'lodash/sumBy';

import axios from 'axios';
import Spinner from '../Spinner';


import DatePicker from "react-datepicker";
import { connect } from "react-redux";

import * as actions from '../../redux/cart/cart.actions';
import * as selectors from "../../redux/root-reducer";

import getRandom from '../../utils/random.utils';

class Simulation extends Component {
  constructor() {
    super();
    this.state = {
      invoicedate : null,
      units : 1,
      billingaddress: '',
      billingcity: '',
      billingstate: '',
      billingcountry: '',
      billingpostalcode: '',
      total: 0,
      tracks: [],
      isFetching: true,
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:3000/tracks/active`)
    .then(response => {
      this.setState({tracks: response.data})
      this.setState({isFetching : false})
    })
    .catch(error => console.log(error));

    const { user } = this.props;
    this.setState({
      invoicedate: new Date(),
      billingcity: user.city,
      billingstate: user.state,
      billingcountry: user.country,
      billingpostalcode: user.postalcode,
    });
  }


  handleDatePickerChange = date => {
    this.setState({ invoicedate : date })
  }

  handleChange = event => {
    const { value } = event.target;
    if (value > 100){
      this.setState({ units: 100});
    }
    this.setState({ units: value});
  }

  handleSubmit = () => {
    const checkoutData = {
      invoicedate:this.state.invoicedate.toISOString().split('T')[0],
      billingaddress: this.state.billingaddress,
      billingcity: this.state.billingcity,
      billingstate: this.state.billingstate,
      billingcountry: this.state.billingcountry,
      billingpostalcode: this.state.billingpostalcode,
      total: this.state.total,
    }
    const module = this.state.units % 10;
    let  iterations = (this.state.units - module) / 10;
    console.log(iterations);
    for(let i=0; i < iterations;i++){
      setTimeout(() => {
        const cartTracks = sampleSize(this.state.tracks, 10);
        checkoutData.total =  (sumBy(cartTracks, item => parseFloat(item.unitprice))).toString();
        console.log("Total ---->", checkoutData.total);
        this.props.startSimuli(checkoutData, cartTracks);
      }, 5000*i
    );
    }
    if(module>0){
      const cartTracks = sampleSize(this.state.tracks, module);
      setTimeout(() => {
        console.log("Finally ");
        checkoutData.total =  (sumBy(cartTracks, item => parseFloat(item.unitprice))).toString();
        this.props.startSimuli(checkoutData, cartTracks);
      }, 6000
      );
    }
  }

  render() {
    return (

      <Fragment>
        <div className="flex mw5 mw7-ns center bg-light-gray pa3 ph7-ns pb5-ns br3 mt6 shadow-4-l">
          <div className="flex-column tc">
            <h1 className="tc">Simulation</h1>
            <p className="mt2-m">Date</p>
            <DatePicker
              selected={this.state.invoicedate}
              onChange={this.handleDatePickerChange}
            />
            <p className="mt2-m">Quantity of tracks</p>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              max="100" 
              value={this.state.units}
              onChange={this.handleChange}
              />
            {
              this.state.isFetching ? <Spinner /> :
              <button 
              className="f6 link dim ph3 pv2 mb2 dib white bg-dark-green tc mt3-ns br3"
              onClick={() => this.handleSubmit()}
              >
              Start
              </button>
            }
          </div>
        </div>
      </Fragment>


    );
  }
}

const mapStateToProps = (state) => ({
  user:selectors.getAuthUser(state),
  isLoading: selectors.isExecutingCheckout(state),
  tracks: selectors.getCartTracks(state),
});

const mapDispatchToProps = (dispatch) => ({
  startSimuli(checkoutData, cartTracks) {
    //console.log("esto va", checkoutData, cartTracks);
    dispatch(actions.startCheckoutSimulation(checkoutData, cartTracks ));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Simulation);



      // invoicedate: new Date().toISOString().split('T')[0],
      // billingcity: user.city,
      // billingstate: user.state,
      // billingcountry: user.country,
      // billingpostalcode: user.postalcode,
      // total,
