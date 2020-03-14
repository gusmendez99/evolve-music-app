import * as db from "../database";

const GET_PERMISSIONS = "SELECT * FROM AppPermission ORDER BY Name ASC";
const GET_PERMISSION_BY_ID = "SELECT * FROM AppPermission WHERE PermissionId = $1";
const ADD_PERMISSION = "INSERT INTO AppPermission (Name) VALUES ($1)";
const UPDATE_PERMISSION = "UPDATE AppPermission SET Name=$1 WHERE PermissionId = $2";
const DELETE_PERMISSION = "DELETE FROM AppPermission WHERE PermissionId = $1";


const getPermissions = (request, response) => {
  db.query(GET_PERMISSIONS, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getPermissionById = (request, response) => {
  const id = parseInt(request.params.id);

  db.query(GET_PERMISSION_BY_ID, [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createPermission = (request, response) => {
  const { name } = request.body;

  db.query(
    ADD_PERMISSION,
    [ name ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Permission added with ID: ${results.insertId}`);
    }
  );
};

const updatePermission = (request, response) => {
  const id = parseInt(request.params.id);
  const { name } = request.body;

  db.query(
    UPDATE_PERMISSION,
    [name, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Permission modified with ID: ${id}`);
    }
  );
};

const deletePermission = (request, response) => {
  const id = parseInt(request.params.id);

  db.query(DELETE_PERMISSION, [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Permission deleted with ID: ${id}`);
  });
};

module.exports = {
  getPermissions,
  getPermissionById,
  createPermission,
  updatePermission,
  deletePermission
};
