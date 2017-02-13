#!/usr/bin/env node
'use strict';


const path = require('path');
const {store, love, scrobble} = require('itunes-scrobbler');


const fileFrom = process.argv[2] || 'tracks.json';


console.log(`Importing from ${fileFrom}`);


const tracks = require(path.join(process.cwd(), fileFrom));


store(tracks)
  .then(love)
  .then(scrobble)
  .then(() => console.log('Finished') || process.exit(0))
  .catch(error => console.log(error.stack) || process.exit(1));
