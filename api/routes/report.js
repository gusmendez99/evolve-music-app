const db = require("../database");

//New Queries
const GET_MOST_COMMON_ARTISTS = "SELECT a.ArtistId, a.Name, count(al.*) as Albums from album al INNER JOIN artist a on a.ArtistId = al.ArtistId GROUP BY a.ArtistId ORDER BY count(al.*) DESC LIMIT 5";
const GET_MOST_COMMON_GENRES = "SELECT g.GenreId, g.Name, count(t.*) as Songs from track t INNER JOIN genre g on g.GenreId = t.GenreId GROUP BY g.GenreId, g.Name ORDER BY count(*) DESC LIMIT 5";
const GET_PLAYLISTS_BY_DURATION = "SELECT pl.Name, SUM(t.Milliseconds) as duration FROM PlaylistTrack plt INNER JOIN Playlist pl ON plt.PlaylistId=pl.PlaylistId INNER JOIN Track t ON plt.TrackId=t.TrackId GROUP BY pl.Name"
const GET_LONGEST_SONGS = "SELECT t.TrackId, t.Name as Track, a.Name as Artist, al.Title as Album, cast((t.Milliseconds/60000.0) as decimal(10,2)) as Minutes from Track t INNER JOIN album al on al.AlbumId = t.AlbumId INNER JOIN artist a on al.ArtistId = a.ArtistId ORDER BY t.Milliseconds DESC LIMIT 5";
const GET_USERS_WITH_MORE_TRACKS_REGISTER = "SELECT u.Name, count(u.UserId) as TracksRegister FROM TrackHistory tah INNER JOIN AppUser u ON u.UserId = tah.UserId GROUP BY u.UserId ORDER BY count(u.UserId) DESC LIMIT 5";
const GET_GENRES_DURATION_AVG = "SELECT g.GenreId, g.Name as Genre, cast((avg(t.Milliseconds)/60000.0) as decimal(10,2)) as avg_minutes from track t INNER JOIN genre g on t.GenreId = g.GenreId GROUP BY g.GenreId, g.Name ORDER BY avg(t.Milliseconds) DESC";
const GET_COUNT_ARTIST_BY_PLAYLIST = "SELECT apl.Name, COUNT(apl.Name) FROM (SELECT pl.Name as Name, COUNT(t.AlbumId) as ArtistCount FROM PlaylistTrack plt INNER JOIN Playlist pl ON plt.PlaylistId = pl.PlaylistId INNER JOIN Track t ON plt.TrackId = t.TrackId GROUP BY (pl.Name, t.AlbumId)) ArtistPlayList apl GROUP BY apl.name"
const GET_ARTIST_WITH_MORE_GENRES = "SELECT a.Name, COUNT(a.Name) FROM (SELECT a.ArtistId, t.GenreId FROM Artist a INNER JOIN Album al ON a.ArtistId = al.ArtistId INNER JOIN Track ON al.AlbumId = t.AlbumId GROUP BY(a.ArtistId, t.GenreIdd)) ArtistGenre ag INNER JOIN Artist a ON ag.ArtistId = a.ArtistId INNER JOIN Genre g ON ag.GenreId = g.GenreId GROUP BY (a.Name) ORDER BY COUNT(a.Name) DESC LIMIT 5"


const getMostCommonArtists = (request, response) => {
  db.query(GET_MOST_COMMON_ARTISTS, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getMostCommonGenres = (request, response) => {
  db.query(GET_MOST_COMMON_GENRES, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getPlayListByDuration = (request, response) => {
  db.query(GET_PLAYLISTS_BY_DURATION, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getLongestSongs = (request, response) => {
  db.query(GET_LONGEST_SONGS, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUsersWithMoreTracksRegister = (request, response) => {
  db.query(GET_USERS_WITH_MORE_TRACKS_REGISTER, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getGenresDurationAvg = (request, response) => {
  db.query(GET_GENRES_DURATION_AVG, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getArtistByPlayListCount = (request, response) => {
  db.query(GET_COUNT_ARTIST_BY_PLAYLIST, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getArtistWithMoreDiversityGenres = (request, response) => {
  db.query(GET_ARTIST_WITH_MORE_GENRES, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};


module.exports = {
  getMostCommonArtists,
  getMostCommonGenres,
  getPlayListByDuration,
  getLongestSongs,
  getUsersWithMoreTracksRegister,
  getGenresDurationAvg,
  getArtistByPlayListCount,
  getArtistWithMoreDiversityGenres
  
};
