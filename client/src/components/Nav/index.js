import React from 'react';

import {Link} from 'react-router-dom';

const Nav = ({currentUser}) =>{
        return (
            <nav className="db dt-l w-100 border-box pa3 ph5-l">
                <button className="db dtc-l v-mid mid-gray link dim w-100 w-25-l tc tl-l mb2 mb0-l" title="Home">
                    <img src="http://tachyons.io/img/logo.jpg" className="dib w2 h2 br-100" alt="Site Name" />
                </button>
                <div className="db dtc-l v-mid w-100 w-75-l tc tr-l">
                    <Link className="link dim dark-gray f6 f5-l dib mr3 mr4-l" to={`/${currentUser.username}/stats`}title="Stats">Statistics</Link>
                    <Link className="link dim dark-gray f6 f5-l dib mr3 mr4-l" to={`/${currentUser.username}/manageusers`} title="Users">Users</Link>
                    <Link className="link dim dark-gray f6 f5-l dib mr3 mr4-l" to={`/${currentUser.username}/manageroles`} title="Roles">Roles</Link>
                    <Link className="link dim dark-gray f6 f5-l dib mr3 mr4-l" to={`/${currentUser.username}/signout`} title="Sign Out">Sign Out</Link>
                </div>
            </nav>
        )
}
export default Nav;