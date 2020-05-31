import React, { Component, Fragment } from "react";

import DatePicker from "react-datepicker";
import { connect } from "react-redux";

import * as actions from '../../redux/cart/cart.actions';
import * as selectors from "../../redux/root-reducer";

class Simulation extends Component {
  constructor() {
    super();
    this.state = {
      date : new Date(),
      units : 1,
    };
  }

  handleDatePickerChange = date => {
    this.setState({ date: date })
  }

  handleChange = event => {
    const { value } = event.target;
    if (value > 100){
      this.setState({ units: 100});
    }
    this.setState({ units: value});
  }

  handleSubmit = (data) => {
    const toStringDate = data.date.toISOString().split('T')[0]
    const newData = {date: toStringDate, units: data.units}
    this.props.startSimuli(newData);
  }

  render() {
    return (

      <Fragment>
        <div className="flex mw5 mw7-ns center bg-light-gray pa3 ph7-ns pb5-ns br3 mt6 shadow-4-l">
          <div className="flex-column tc">
            <h1 className="tc">Simulation</h1>
            <p className="mt2-m">Date</p>
            <DatePicker
              selected={this.state.date}
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
            <button 
            className="f6 link dim ph3 pv2 mb2 dib white bg-dark-green tc mt3-ns br3"
            onClick={() => this.handleSubmit(this.state)}
            >
            Start
            </button>
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
  startSimuli(data) {
    console.log("Detalles de la simulaicon", data);
    // dispatch(actions.startCheckout(details))
  }
});
export default connect(undefined, mapDispatchToProps)(Simulation);




