import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import * as selectors from "../../redux/root-reducer";
import * as userActions from "../../redux/user/user.actions";
import * as roleActions from "../../redux/role/role.actions";

import UserListItem from "../UserListItem";
import Pagination from "../Pagination";

const ManageUsers = ({ authUser, users, roles, isLoading, onLoad }) => {

  const [isSearching, changeIsSearching] = useState(false);
  const [isPaginating, changeIsPaginating] = useState(false);
  const [searchList, changeSearchList] = useState([]);
  const [searchField, changeSearchField] = useState("");
  const [currentUsers, changeCurrentUsers] = useState([]);
  const [currentPage, changeCurrentPage] = useState(0);
  const [totalPages, changeTotalPages] = useState(0);

  const onPageChanged = (data) => {
    changeIsPaginating(true);
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentUsersPaginated = users.slice(offset, offset + pageLimit);

    changeCurrentPage(currentPage);
    changeTotalPages(totalPages);
    changeCurrentUsers(currentUsersPaginated);
    changeIsPaginating(false);
  };

  const handleSearchFieldChange = async (event) => {
    const { value } = event.target;
    console.log(value);

    changeSearchField(value);

    if (value && value !== "") {
      changeIsSearching(true);

      axios({
        method: "post",
        url: `http://localhost:3000/search/users`,
        data: { query: value },
      }).then((res) => {
        changeSearchList(res.data);
      });
    } else {
      changeIsSearching(false);
    }
  };
  //Update on changes, pending update...
  useEffect(onLoad, []);

  return (
    <Fragment>
      <div className="pa1 ph5-l tc">
        <h1 className="f3 fw6">Manage Users</h1>
        {currentPage && !searchField && (
          <h6>
            Page {currentPage} / {totalPages}
          </h6>
        )}
      </div>
      {users.length === 0 && !isLoading && <p>{"No users yet..."}</p>}
      {isLoading && <p>{"Cargando..."}</p>}

      {users.length > 0 && roles.length > 0 && !isLoading && !isPaginating && (
        <Fragment>
          <div className="pa3 ph5-l ">
            <label className="f6 b db mb2 blue">Búsqueda</label>
            <input
              id="search"
              name="search"
              className="input-reset ba b--black-20 pa2 mb2 db w-100"
              type="text"
              aria-describedby="name-desc"
              onChange={handleSearchFieldChange}
            />
          </div>
          <div className="pa3 ph5-l">
            <div className="overflow-y-scroll vh-50">
              <table className="f6 w-100" cellSpacing="0">
                <thead>
                  <tr>
                    <th className="fw6 bb b--black-20 tc pb3 pr3 bg-white">
                      Username
                    </th>
                    <th className="fw6 bb b--black-20 tc pb3 pr3 bg-white">
                      Name
                    </th>
                    <th className="fw6 bb b--black-20 tc pb3 pr3 bg-white">
                      Last Name
                    </th>
                    <th className="fw6 bb b--black-20 tc pb3 pr3 bg-white">
                      E-Mail
                    </th>
                    <th className="fw6 bb b--black-20 tc pb3 pr3 bg-white">
                      Phone
                    </th>
                    <th className="fw6 bb b--black-20 tc pb3 pr3 bg-white">
                      Country
                    </th>
                    <th className="fw6 bb b--black-20 tc pb3 pr3 bg-white">
                      Role
                    </th>
                    <th className="fw6 bb b--black-20 tc pb3 pr3 bg-white">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="lh-copy">
                  {isSearching
                    ? searchList.map((singleUser, i) => {
                        if (singleUser.userid !== authUser.userid) {
                          return (
                            <UserListItem
                              key={singleUser.userid}
                              user={singleUser}
                              roles={roles}
                              currentUser={authUser}
                              index={i}
                            />
                          );
                        }
                      })
                    : currentUsers.map((singleUser, i) => {
                        if (singleUser.userid !== authUser.userid) {
                          return (
                            <UserListItem
                              key={singleUser.userid}
                              user={singleUser}
                              roles={roles}
                              currentUser={authUser}
                              index={i}
                            />
                          );
                        }
                      })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="f3 fw6 pa4 tc">
            {!searchField && (
              <Pagination
                totalRecords={users.length}
                pageLimit={15}
                pageNeighbours={1}
                onPageChanged={onPageChanged}
              />
            )}
          </div>
        </Fragment>
      )}

      <div className="tc pa2">
        <Link
          className="f5 link dim ph4 pv3 m2 dib white bg-green"
          to={`/${authUser.rolename}/manageusers/new`}
        >
          Add User
        </Link>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  authUser: selectors.getAuthUser(state),
  users: selectors.getUsers(state),
  roles: selectors.getRoles(state),
  isLoading: selectors.isFetchingUsers(state),
});

const mapDispatchToProps = dispatch => ({
  onLoad() {
    dispatch(userActions.startFetchingUsers());
    dispatch(roleActions.startFetchingRoles());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageUsers);
