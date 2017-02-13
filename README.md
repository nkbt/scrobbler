# scrobbler

[![Greenkeeper badge](https://badges.greenkeeper.io/nkbt/scrobbler.svg)](https://greenkeeper.io/)

Manual bulk scrobbler from text or json file to LastFM.



# Install

```sh
npm install -g scrobbler
```


# Run

Create `secret.json` and fill all the values:
```json
{
  "LASTFM_API_KEY": "Your LastFM API key",
  "LASTFM_SECRET": "Your LastFM App secret",
  "LASTFM_USER": "Your LastFM username",
  "LASTFM_PASSWORD": "Your LastFM password"
}
```

Or run `scrobbler` with these ENV variables:

```sh
export LASTFM_API_KEY=123
export LASTFM_SECRET=123
export LASTFM_USER=123
export LASTFM_PASSWORD=123 

scrobbler tracks.json
```

Note that it will create `itunes` folder to keep database.
Next time you should run it in the same folder again and it will not submit same tracks again.

# Input file

`scrobbler` only works with JSON files that have exactly this format:

```json
[
  {
    "id": "track|Dopelord|Children Of The Haze|Navigator",
    "name": "Dopelord [Children Of The Haze] Navigator",
    "artist": "Dopelord",
    "album": "Children Of The Haze",
    "date": "2017",
    "track": "Navigator",
    "playCount": 1,
    "lastPlayed": 1486955443505,
    "loved": true
  },
  {
    "id": "track|Dopelord|Children Of The Haze|Scum Priest",
    "name": "Dopelord [Children Of The Haze] Scum Priest",
    "artist": "Dopelord",
    "album": "Children Of The Haze",
    "date": "2017",
    "track": "Scum Priest",
    "playCount": 1,
    "lastPlayed": 1486955929505,
    "loved": false
  }
]
```

You may add more fields for every track, they will be inserted to database as is, but not used for submissions.


Then run `scrobbler` to submit all tracks to LastFM
```sh
scrobbler tracks.json
```


# Text files

`scrobbler` has special tool to convert manually entered text file:

```sh
scrobbler-convert tracks.txt tracks.json
```


`tracks.txt` must have this format:
```
14:10 Dopelord - Children Of The Haze (2017)
*1. Navigator - 0:00
2. Scum Priest - 8:06
3. Children of the Haze - 14:17
4. Skulls and Candles - 21:45
5. Dead Inside (I&II) - 25:33
6. Reptile Sun - 34:53


15:20 Ritual Haze - Machine Sun (2017)
1. Fire - 0:00
2. Machine Sun - 8:27
3. Dark Night - 14:30
4. Desert Alias - 22:00
*5. Dither Haze - 29:17
```

Where `14:10` and `15:20` are start times today, `*` before track number is `loved` flag. Track times are starting times of each track relative to the beginning.

This track list format originally comes from full albums or mixes on Youtube.


# Extras


## scrobbler-addtime

Adds two times mm:ss. Can be used to calculate track start time in a mix.

```sh
scrobbler-addtime 10:00 12:30
22:30

scrobbler-addtime 2:13 3:51
6:4

scrobbler-addtime 24:35 128:56
153:31
```
