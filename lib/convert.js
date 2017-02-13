'use strict';


const toDate = (h, m) => {
  const d = new Date();
  d.setHours(parseInt(h, 10));
  d.setMinutes(parseInt(m, 10));
  return d.getTime();
};


const toSeconds = (tm, ts) => parseInt(tm, 10) * 60 * 1000 + parseInt(ts, 10) * 1000;


exports.convert = input => input.split(/(\r?\n){2,}/)
  .map(album => album.trim())
  .filter(album => album.length > 0)
  .map(album => album.split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .reduce((result, line, i) => {
      if (i === 0) {
        const [_, h, m, artist, album, date] = line.match(/(\d+):(\d+) (.+) - (.+) \((\d+)\)/);
        return {
          start: toDate(h, m),
          album,
          artist,
          date,
          tracks: []
        }
      }

      const [_, love, _num, track, tm, ts] = line.match(/(\*?)(\d+)\. (.+) - (\d+):(\d+)/);
      const lastPlayed = result.start + toSeconds(tm, ts);


      return Object.assign(result, {
        tracks: result.tracks.concat([{
          id: `track|${result.artist}|${result.album}|${track}`,
          name: `${result.artist} [${result.album}] ${track}`,
          artist: result.artist,
          album: result.album,
          date: result.date,
          track,
          playCount: 1,
          lastPlayed,
          lastPlayedDate: new Date(lastPlayed).toLocaleString(),
          loved: love === '*'
        }])
      });
    }, {}).tracks
  )
  .reduce((result, album) => result.concat(album), []);
