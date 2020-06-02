import React, { Component, Fragment } from "react";
import sampleSize from 'lodash/sampleSize';
import sumBy from 'lodash/sumBy';

import axios from 'axios';
import Spinner from '../Spinner';


import DatePicker from "react-datepicker";
import { connect } from "react-redux";

import * as actions from '../../redux/cart/cart.actions';
import * as selectors from "../../redux/root-reducer";

import './styles.css';

class Simulation extends Component {
  constructor() {
    super();
    this.state = {
      invoicedate: null,
      promotionInitialDate: new Date(),
      promotionFinalDate: new Date(),
      units: 1,
      billingaddress: '',
      billingcity: '',
      billingstate: '',
      billingcountry: '',
      billingpostalcode: '',
      total: 0,
      tracks: [],
      isFetching: true,
      isPostingPromotion: false,
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:3000/tracks/active`)
      .then(response => {
        this.setState({ tracks: response.data })
        this.setState({ isFetching: false })
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
    this.setState({ invoicedate: date })
  }

  handlePromotionDatePickerChange = (date, isInitial) => {
    if (isInitial) {
      this.setState({ promotionInitialDate: date })
    } else {
      this.setState({ promotionFinalDate: date })
    }
  }

  handleChange = event => {
    const { value } = event.target;
    if (value > 100) {
      this.setState({ units: 100 });
    }
    this.setState({ units: value });
  }

  handlePostPromotion = () => {
    const { promotionInitialDate, promotionFinalDate } = this.state;
    const data = { initial_date: promotionInitialDate.toISOString().split('T')[0], final_date: promotionFinalDate.toISOString().split('T')[0] }

    console.log(data)

    this.setState({ isPostingPromotion: true })
    axios.post(`http://localhost:3000/mongo`, data)
      .then(response => {
        this.setState({ isPostingPromotion: false })
      })
      .catch(error => console.log(error));

  }

  handleSubmit = () => {
    const checkoutData = {
      invoicedate: this.state.invoicedate.toISOString().split('T')[0],
      billingaddress: this.state.billingaddress,
      billingcity: this.state.billingcity,
      billingstate: this.state.billingstate,
      billingcountry: this.state.billingcountry,
      billingpostalcode: this.state.billingpostalcode,
      total: this.state.total,
    }
    const module = this.state.units % 10;
    let iterations = (this.state.units - module) / 10;
    console.log(iterations);
    for (let i = 0; i < iterations; i++) {
      setTimeout(() => {
        const cartTracks = sampleSize(this.state.tracks, 10);
        checkoutData.total = (sumBy(cartTracks, item => parseFloat(item.unitprice))).toString();
        console.log("Total ---->", checkoutData.total);
        this.props.startSimulation(checkoutData, cartTracks);
      }, 5000 * i
      );
    }
    if (module > 0) {
      const cartTracks = sampleSize(this.state.tracks, module);
      setTimeout(() => {
        console.log("Finally ");
        checkoutData.total = (sumBy(cartTracks, item => parseFloat(item.unitprice))).toString();
        this.props.startSimulation(checkoutData, cartTracks);
      }, 6000
      );
    }
  }

  render() {
    return (

      <Fragment>
        <div className="simulation-container">
          <div className="fl w-50">
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
                      className="b f6 link dim ph3 pv2 mb2 dib white bg-blue tc mt3-ns br3"
                      onClick={() => this.handleSubmit()}
                    >
                      Start
              </button>
                }
              </div>
            </div>
          </div>
          <div className="fl w-50">
            <div className="flex mw5 mw7-ns center bg-lightest-blue pa3 ph7-ns pb5-ns br3 mt6 shadow-4-l">
              <div className="flex-column tc">
                <h1 className="tc">Promotion NoSQL</h1>
                <p className="mt2-m">Initial Date</p>
                <DatePicker
                  selected={this.state.promotionInitialDate}
                  onChange={(date) => this.handlePromotionDatePickerChange(date, true)}
                />
                <p className="mt2-m">Final Date</p>
                <DatePicker
                  selected={this.state.promotionFinalDate}
                  onChange={(date) => this.handlePromotionDatePickerChange(date, false)}
                />
                {
                  this.state.isPostingPromotion ? <Spinner /> :
                    <button
                      className="b f6 link dim ph3 pv2 mb2 dib white bg-green tc mt3-ns br3"
                      onClick={() => this.handlePostPromotion()}
                    >
                      Promote
              </button>
                }
              </div>
            </div>
          </div>

        </div>



        <br /><br />
      </Fragment>


    );
  }
}

const mapStateToProps = (state) => ({
  user: selectors.getAuthUser(state),
  isLoading: selectors.isExecutingCheckout(state),
  tracks: selectors.getCartTracks(state),
});

const mapDispatchToProps = (dispatch) => ({
  startSimulation(checkoutData, cartTracks) {
    //console.log("esto va", checkoutData, cartTracks);
    dispatch(actions.startCheckoutSimulation(checkoutData, cartTracks));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Simulation);



      // invoicedate: new Date().toISOString().split('T')[0],
      // billingcity: user.city,
      // billingstate: user.state,
      // billingcountry: user.country,
      // billingpostalcode: user.postalcode,
      // total,
