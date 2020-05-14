const db = require("../database");

const SEARCH_TRACK = "SELECT t.*, g.Name as GenreName, m.Name as MediaTypeName, a.Title as AlbumTitle FROM Track t INNER JOIN Genre g on t.genreid = g.genreid INNER JOIN MediaType m on t.mediatypeid = m.mediatypeid INNER JOIN Album a on t.albumid = a.albumid WHERE t.Name ILIKE $1 LIMIT 10";
const SEARCH_ALBUM = "SELECT al.*, art.Name AS ArtistName FROM Album al INNER JOIN Artist art ON art.ArtistId = al.ArtistId WHERE al.Title ILIKE $1 LIMIT 10";
const SEARCH_ARTIST = "SELECT * FROM Artist WHERE Name ILIKE $1 LIMIT 10";
const SEARCH_USER = "SELECT * FROM AppUser WHERE UserName ILIKE $1 LIMIT 10";
const SEARCH_LOG_BY_USERNAME = "SELECT LogBook.LogBookId, LogBook.UserId, AppUser.username, LogBook.itemid,LogBook.action, LogBook.type, LogBook.recorddate FROM LogBook inner join AppUser on LogBook.UserId = AppUser.UserId WHERE AppUser.UserName ILIKE $1 LIMIT 10";

// For Customer 
const SEARCH_PURCHASED_ACTIVE_TRACKS_BY_USER = "select distinct t.*, g.Name as GenreName, m.Name as MediaTypeName, art.Name as ArtistName, a.Title as AlbumTitle, i.invoicedate FROM InvoiceLine il inner join invoice i on il.invoiceid = i.invoiceid inner join Track t on t.trackid = il.trackid INNER JOIN Genre g on t.genreid = g.genreid INNER JOIN MediaType m on t.mediatypeid = m.mediatypeid INNER JOIN Album a on t.albumid = a.albumid INNER JOIN Artist art ON art.artistid = a.artistid WHERE NOT EXISTS (SELECT FROM InactiveTrack it WHERE it.TrackId = t.TrackId )  and i.userid = $2 and t.Name ILIKE $1 OR art.Name ILIKE $1 ORDER by t.Name asc, i.invoicedate desc LIMIT 10;"
const SEARCH_AVAILABLE_ACTIVE_TRACKS_BY_USER = "select distinct t.*, g.Name as GenreName, m.Name as MediaTypeName, art.Name as ArtistName, a.Title as AlbumTitle FROM Track t  INNER JOIN Genre g on t.genreid = g.genreid INNER JOIN MediaType m on t.mediatypeid = m.mediatypeid INNER JOIN Album a on t.albumid = a.albumid INNER JOIN Artist art ON art.artistid = a.artistid WHERE NOT EXISTS (SELECT FROM InactiveTrack it WHERE it.TrackId = t.TrackId )  and t.trackid not in (select distinct il2.trackid from invoiceline il2 inner join invoice i2 on i2.invoiceid = il2.invoiceid where i2.userid = $2) and t.Name ILIKE $1 OR art.Name ILIKE $1 ORDER BY t.Name asc LIMIT 10;"

const searchTrack = (request, response) => {
  const { query } = request.body;

  db.query(
    SEARCH_TRACK,
    [`%${query}%`],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).json(results.rows);
    }
  );
};

const searchAvailableTrack = (request, response) => {
  const { idUser, query } = request.body;

  db.query(
    SEARCH_AVAILABLE_ACTIVE_TRACKS_BY_USER,
    [`%${query}%`, idUser],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).json(results.rows);
    }
  );
};

const searchPurchasedTrack = (request, response) => {
  const { idUser, query } = request.body;

  db.query(
    SEARCH_PURCHASED_ACTIVE_TRACKS_BY_USER,
    [`%${query}%`, idUser],
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
    [ `%${query}%` ],
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
    [`%${query}%`],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).json(results.rows);
    }
  );
};

const searchUser = (request, response) => {
  const { query } = request.body;

  db.query(
    SEARCH_USER,
    [`%${query}%` ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).json(results.rows);
    }
  );
};

const searchLog = (request, response) => {
  const { query } = request.body;

  db.query(
    SEARCH_LOG_BY_USERNAME,
    [`%${query}%` ],
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
  searchAvailableTrack,
  searchPurchasedTrack,
  searchAlbum, 
  searchArtist,
  searchUser,
  searchLog

}