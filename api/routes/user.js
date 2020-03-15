const db = require("../database");

const LOGIN = "SELECT * FROM AppUser WHERE UserName = $1 AND Password =  LIMIT 1";
const GET_USERS = "SELECT * FROM AppUser ORDER BY UserName ASC";
const GET_USER_BY_ID = "SELECT * FROM AppUser WHERE UserId = $1";
const ADD_USER = "INSERT INTO AppUser (UserName, Password, FirstName, LastName, City, State, Country, PostalCode, Phone, Email, RoleId) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)";
const UPDATE_USER = "UPDATE AppUser SET UserName=$1, Password=$2, FirstName=$3, LastName=$4, City=$5, State=$6, Country=$7, PostalCode=$8, Phone=$9, Email=$10, RoleId=$11 WHERE UserId = $12";
const DELETE_USER = "DELETE FROM AppUser WHERE UserId = $1";

const GET_PERMISSIONS_BY_USER_ID = 'SELECT p.* FROM AppUser u INNER JOIN RolePermission rp ON rp.RoleId = u.RoleId INNER JOIN AppPermission p on p.PermissionId = rp.PermissionId WHERE u.UserId = $1 '


const getUsers = (request, response) => {
  db.query(GET_USERS, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  db.query(GET_USER_BY_ID, [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createUser = (request, response) => {
  const { username, firstname, password, lastname, city, state, country, postalCode, phone, email, roleId } = request.body;

  db.query(
    ADD_USER,
    [ username, firstname, password, lastname, city, state, country, postalCode, phone, email, roleId ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${results.insertId}`);
    }
  );
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { username, firstname, password, lastname, city, state, country, postalCode, phone, email, roleId } = request.body;

  db.query(
    UPDATE_USER,
    [username, firstname, password, lastname, city, state, country, postalCode, phone, email, roleId, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  db.query(DELETE_USER, [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

const getPermissionsByUser = (request,response) => {
  const userId = parseInt(request.params.id);

  db.query(GET_PERMISSIONS_BY_USER_ID, [userId], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
}




module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getPermissionsByUser
};
