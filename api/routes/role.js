const db = require("../database");

const GET_ROLES = "SELECT * FROM AppRole ORDER BY Name ASC";
const GET_ROLE_BY_ID = "SELECT * FROM AppRole WHERE RoleId = $1";
const ADD_ROLE = "INSERT INTO AppRole (Name) VALUES ($1)";
const UPDATE_ROLE = "UPDATE AppRole SET Name=$1 WHERE RoleId = $2";
const DELETE_ROLE = "DELETE FROM AppRole WHERE RoleId = $1";
const GET_PERMISSIONS_BY_ROLE = "SELECT p.* FROM RolePermission rp INNER JOIN AppPermission p ON p.PermissionId = rp.PermissionId WHERE rp.RoleId = $1"
const GET_USERS_BY_ROLE = "SELECT * FROM AppUser WHERE RoleId=$1 ORDER BY UserName ASC";



const ADD_ROLE_PERMISSION = "INSERT INTO RolePermission(PermissionId, RoleId) VALUES($1,$2)";
const DELETE_ROLE_PERMISSION = "DELETE FROM RolePermission WHERE PermissionId = $1 AND RoleId = $2";

const getRoles = (request, response) => {
  db.query(GET_ROLES, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getRoleById = (request, response) => {
  const id = parseInt(request.params.id);

  db.query(GET_ROLE_BY_ID, [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createRole = (request, response) => {
  const { name } = request.body;

  db.query(
    ADD_ROLE,
    [ name ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Role added with ID: ${results.insertId}`);
    }
  );
};

const updateRole = (request, response) => {
  const id = parseInt(request.params.id);
  const { name } = request.body;

  db.query(
    UPDATE_ROLE,
    [name, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Role modified with ID: ${id}`);
    }
  );
};

const deleteRole = (request, response) => {
  const id = parseInt(request.params.id);

  db.query(DELETE_ROLE, [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Role deleted with ID: ${id}`);
  });
};

// New queries added

const getUsersByRole = (request, response) => {
  const id = parseInt(request.params.id);

  db.query(GET_USERS_BY_ROLE, [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
}

const getPermissionsByRole = (request, response) => {
  db.query(GET_PERMISSIONS_BY_ROLE, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createRolePermission = (request, response) => {
  const { idPermission } = request.body;
  const id = parseInt(request.params.id);

  db.query(
    ADD_ROLE_PERMISSION,
    [ idPermission, id ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`PermissionId ${idPermission} added to RoleId: ${id}`);
    }
  );
};

const deleteRolePermission = (request, response) => {
  const id = parseInt(request.params.id);
  const idPermission = parseInt(request.params.pid);

  db.query(DELETE_ROLE_PERMISSION, [ idPermission, id ], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`PermissionId ${idPermission} removed from RoleId: ${id}`);
  });
};

module.exports = {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
  getUsersByRole,
  getPermissionsByRole,
  createRolePermission,
  deleteRolePermission
};
