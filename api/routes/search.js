const db = require("../database");

const SEARCH_TRACK = "t.*, g.Name as GenreName, m.Name as MediaTypeName, a.Title as AlbumTitle FROM Track t INNER JOIN Genre g on t.genreid = g.genreid INNER JOIN MediaType m on t.mediatypeid = m.mediatypeid INNER JOIN Album a on t.albumid = a.albumid WHERE t.Name ILIKE $1 LIMIT 10";
const SEARCH_ALBUM = "SELECT al.*, art.Name AS ArtistName FROM Album al NATURAL JOIN Artist art WHERE al.Title ILIKE $1 LIMIT 10";
const SEARCH_ARTIST = "SELECT * FROM Artist WHERE Name ILIKE $1 LIMIT 10";
const SEARCH_USER = "SELECT * FROM AppUser WHERE UserName ILIKE $1 AND UserId<>$2 LIMIT 10";

const searchTrack = (request, response) => {
  const { query } = request.body;

  db.query(
    SEARCH_TRACK,
    [ query ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).json(results.rows);
    }
  );
};

const searchAlbum = (request, response) => {
  const { query } = request.body;

  db.query(
    SEARCH_ALBUM,
    [ query ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).json(results.rows);
    }
  );
};

const searchArtist = (request, response) => {
  const { query } = request.body;

  db.query(
    SEARCH_ARTIST,
    [ query ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).json(results.rows);
    }
  );
};

const searchUser = (request, response) => {
  const { query, userid } = request.body;

  db.query(
    SEARCH_USER,
    [ query, userid ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).json(results.rows);
    }
  );
};

module.exports =  {
  searchTrack,
  searchAlbum, 
  searchArtist,
  searchUser

}