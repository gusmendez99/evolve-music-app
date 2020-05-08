import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';

import * as selectors from '../../redux/root-reducer'

class LogBookListItem extends Component {
  constructor() {
    super();
    this.state = {
      artist: {}
    };
  }
  render() {
    const { log, currentUser } = this.props;
    console.log(log, currentUser);
    let mydate = new Date(log.recorddate);
    return (

      <Fragment>
        <tr>
          <td class="pv3 pr3 bb b--black-20">
            <p className="tc ma0 bg-white">{log.username}</p>
          </td>
          <td class="pv3 pr3 bb b--black-20">
            <p className="tc ma0 bg-white">{log.itemid}</p></td>
          <td class="pv3 pr3 bb b--black-20">
            <p className="tc ma0 bg-white">{log.action}</p></td>
          <td class="pv3 pr3 bb b--black-20">
            <p className="tc ma0 bg-white">{log.type}</p></td>
          <td class="pv3 pr3 bb b--black-20">
            <p className="tc ma0 bg-white">{mydate.toLocaleString()}</p></td>        
        </tr>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  authUser: selectors.getAuthUser(state),
  permissions: selectors.getAuthUserPermissions(state)
});

export default connect(mapStateToProps)(LogBookListItem);
