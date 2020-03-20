const db = require("../database");

const LOGIN = "SELECT u.UserId, u.UserName, u.FirstName, u.LastName, u.RoleId, r.Name AS RoleName FROM AppUser u INNER JOIN AppRole r ON r.RoleId = u.RoleId WHERE u.UserName = $1 AND u.Password = $2  LIMIT 1";
const GET_USERS = "SELECT * FROM AppUser ORDER BY UserName ASC";
const GET_USER_BY_ID = "SELECT * FROM AppUser WHERE UserId = $1";
const ADD_USER = "INSERT INTO AppUser (UserName, Password, FirstName, LastName, City, State, Country, PostalCode, Phone, Email, RoleId) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)";
const UPDATE_USER = "UPDATE AppUser SET UserName=$1, Password=$2, FirstName=$3, LastName=$4, City=$5, State=$6, Country=$7, PostalCode=$8, Phone=$9, Email=$10, RoleId=$11 WHERE UserId = $12";
const DELETE_USER = "DELETE FROM AppUser WHERE UserId = $1";
const GET_ROLE_BY_USER_ID = 'select r.name from approle r inner join appuser u on R.roleid = (SELECT roleid FROM appuser a WHERE UserId = $1) '
const GET_PERMISSIONS_BY_USER_ID = 'SELECT p.* FROM AppUser u INNER JOIN RolePermission rp ON rp.RoleId = u.RoleId INNER JOIN AppPermission p on p.PermissionId = rp.PermissionId WHERE u.UserId = $1 '

const login = (request, response) => {
  
  const { username, password } = request.body;
  console.log(username, " ", password)

  db.query(LOGIN, [username, password ], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};


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
  const { username, firstname, password, lastname, city, state, country, postalcode, phone, email, roleid } = request.body;
  response.header("Access-Control-Allow-Origin", "*");
  response.header('Access-Control-Allow-Methods', 'DELETE, PUT, POST');
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  db.query(
    ADD_USER,
    [ username, firstname, password, lastname, city, state, country, postalcode, phone, email, roleid ],
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
  const { username, firstname, password, lastname, city, state, country, postalcode, phone, email, roleid } = request.body;
  response.header("Access-Control-Allow-Origin", "*");
  response.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  db.query(
    UPDATE_USER,
    [username, password,firstname, lastname, city, state, country, postalcode, phone, email, roleid, id],
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
  response.header("Access-Control-Allow-Origin", "*");
  response.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  db.query(DELETE_USER, [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

const getRoleByUserId = (request,response) => {
  const userId = parseInt(request.params.id);
  db.query(GET_ROLE_BY_USER_ID, [userId], (error, results) => {
    if (error){
      throw error;
    }
    response.status(200).json(results.rows);

  });
}

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
  login,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getPermissionsByUser,
  getRoleByUserId
};
