const db = require("../database");
const requestModule = require("request");
const spotify = require("../spotify");

const GET_TRACKS = "SELECT t.*, g.Name as GenreName, m.Name as MediaTypeName, art.Name as ArtistName, a.Title as AlbumTitle FROM Track t INNER JOIN Genre g on t.genreid = g.genreid INNER JOIN MediaType m on t.mediatypeid = m.mediatypeid INNER JOIN Album a on t.albumid = a.albumid INNER JOIN Artist art ON art.artistid = a.artistid ORDER BY t.Name ASC";
const GET_TRACK_BY_ID =
  "SELECT t.*, g.Name as GenreName, m.Name as MediaTypeName, art.Name as ArtistName, a.Title as AlbumTitle FROM Track t INNER JOIN Genre g on t.genreid = g.genreid INNER JOIN MediaType m on t.mediatypeid = m.mediatypeid INNER JOIN Album a on t.albumid = a.albumid INNER JOIN Artist art ON art.artistid = a.artistid WHERE t.TrackId = $1";
const ADD_TRACK =
  "INSERT INTO Track (TrackId, Name, Composer, Milliseconds, UnitPrice, Bytes, AlbumId, GenreId, MediaTypeId) SELECT MAX( TrackId ) + 1, $1, $2, $3, $4, $5, $6, $7, $8 FROM Track RETURNING *";
const UPDATE_TRACK =
  "UPDATE Track SET Name=$1, Composer=$2, Milliseconds=$3, UnitPrice=$4, Bytes=$5, AlbumId=$6, GenreId=$7, MediaTypeId=$8 WHERE TrackId=$9 RETURNING *";
const DELETE_TRACK = "DELETE FROM Track WHERE TrackId = $1 RETURNING *";
const UPDATE_LOGBOOK = "SELECT updateLogbook($1,$2,$3,$4)";
//For Customer page
const GET_ACTIVE_TRACKS = "SELECT t.*, g.Name as GenreName, m.Name as MediaTypeName, art.Name as ArtistName, a.Title as AlbumTitle FROM Track t INNER JOIN Genre g on t.genreid = g.genreid INNER JOIN MediaType m on t.mediatypeid = m.mediatypeid INNER JOIN Album a on t.albumid = a.albumid INNER JOIN Artist art ON art.artistid = a.artistid WHERE NOT EXISTS (SELECT FROM InactiveTrack it WHERE it.TrackId = t.TrackId ) ORDER BY t.Name ASC";

const getTracks = (request, response) => {
  db.query(GET_TRACKS, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getActiveTracks = (request, response) => {
  db.query(GET_ACTIVE_TRACKS, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getTrackById = (request, response) => {
  const id = parseInt(request.params.id);

  db.query(GET_TRACK_BY_ID, [id], (error, results) => {
    if (error) {
      throw error;
    }
    
    response.status(200).json(results.rows);
  });
};

const getTrackMetadata = async (request, response) => {
  let trackName = request.query.name;
  let trackArtistName = request.query.artist;

  const token = await spotify.spotifyApi.clientCredentialsGrant().then(
    function(data) {
      // Save the access token so that it's used in future calls
      return data.body["access_token"];
    },
    function(err) {
      console.log(
        "Something went wrong when retrieving an access token",
        err.message
      );
    }
  );

  //console.log(token);

  const queryparam = `q=${encodeURI(`${trackName} artist:${trackArtistName}`)}&type=track&market=US&limit=1`;
  console.log(queryparam);

  const options = {
    url: spotify.SPOTIFY_API_URL + queryparam,
    headers: { Authorization: "Bearer " + token },
    json: true
  };        

  requestModule.get(options, function(error, innerResponse, body) {
    console.log(innerResponse.body);
    if (!error && innerResponse.statusCode === 200) {
      if (innerResponse.body.tracks.items.length > 0) {
        console.log(innerResponse.body.tracks.items[0]);
        const { album, name, preview_url} = innerResponse.body.tracks.items[0];

        response.status(200).json({ image: album.images[1].url, name, previewurl: preview_url  });
      } else {
        response.status(200).json(null);
      }
    } else {
      console.log(error);
      console.log(innerResponse.statusCode);
      response.status(200).json(null);
    }
    
  });

}

const createTrack = (request, response) => {
  const {
    name,
    composer,
    milliseconds,
    unitprice,
    bytes,
    albumid,
    genreid,
    mediatypeid,
    userid
  } = request.body;

  db.query(
    ADD_TRACK,
    [
      name,
      composer,
      milliseconds,
      unitprice,
      bytes,
      albumid,
      genreid,
      mediatypeid
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      db.query(UPDATE_LOGBOOK,
      [userid,'INSERT',results.rows[0].trackid, 'TRACK'],
      (error, results) => {
        if (error) {
        throw error;
      }});
      response.status(201).send(`Track added successfully`);
    }
  );
};

const updateTrack = (request, response) => {
  const id = parseInt(request.params.id);
  const {
    name,
    composer,
    milliseconds,
    unitprice,
    bytes,
    albumid,
    genreid,
    mediatypeid,
    userid
  } = request.body;

  db.query(
    UPDATE_TRACK,
    [
      name,
      composer,
      milliseconds,
      unitprice,
      bytes,
      albumid,
      genreid,
      mediatypeid,
      id
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      db.query(UPDATE_LOGBOOK,
      [userid,'UPDATE',results.rows[0].trackid, 'TRACK'],
      (error, results) => {
        if (error) {
        throw error;
      }});
      response.status(200).send(`Track modified with ID: ${id}`);
    }
  );
};

const deleteTrack = (request, response) => {
  const id = parseInt(request.params.id);
  const { userid } = request.body;

  db.query(DELETE_TRACK, [id], (error, results) => {
    if (error) {
      throw error;
    }
    db.query(UPDATE_LOGBOOK,
    [userid,'DELETE', id, 'TRACK'],
    (error, results) => {
      if (error) {
        throw error;
      }
    });
      response.status(200).send(`Track deleted with ID: ${id}`);
  });
};

module.exports = {
  getTracks,
  getActiveTracks,
  getTrackById,
  createTrack,
  updateTrack,
  deleteTrack,
  getTrackMetadata
};
