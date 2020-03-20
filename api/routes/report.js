const db = require("../database");

const GET_MOST_COMMON_GENRES = "select g.genreid, g.name, count(t.*) as songs from track t inner join genre g on g.genreid = t.genreid group by g.genreid, g.name order by count(*) desc limit 10";
const GET_MOST_COMMON_ARTISTS = "select a.artistid, a.name, count(al.*) as albums from album al inner join artist a on a.artistid = al.artistid group by a.artistid order by count(al.*) desc limit 10";
const GET_LONGEST_SONGS = "select t.trackid, t.name as track, a.name as artist, al.title as album, cast((t.milliseconds/60000.0) as decimal(10,2)) as minutes from track t inner join album al on al.albumid = t.albumid inner join artist a on al.artistid = a.artistid order by t.milliseconds desc limit 10";
const GET_GENRES_DURATION_AVG = "select g.genreid, g.name as genre, cast((avg(t.milliseconds)/60000.0) as decimal(10,2)) as avg_minutes from track t inner join genre g on t.genreid = g.genreid group by g.genreid, g.name order by avg(t.milliseconds) desc limit 10";
const GET_MOST_COLLABORATIVE_ARTIST = "select a1.name, count(a1.name) from album al1 join artist a1 on al1.artistid = a1.artistid join track t1 on t1.composer = a1.name group by a1.name order by count(a1.name) desc limit 10";

const getMostCommonGenres = (request, response) => {
  db.query(GET_MOST_COMMON_GENRES, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getMostCommonArtists = (request, response) => {
  db.query(GET_MOST_COMMON_ARTISTS, (error, results) => {
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

const getGenresDurationAvg = (request, response) => {
  db.query(GET_GENRES_DURATION_AVG, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getMostCollaborativeArtist = (request, response) => {
  db.query(GET_MOST_COLLABORATIVE_ARTIST, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};




module.exports = {
  getMostCollaborativeArtist,
  getMostCommonArtists,
  getMostCommonGenres,
  getGenresDurationAvg,
  getLongestSongs
};
