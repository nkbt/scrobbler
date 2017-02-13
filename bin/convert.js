#!/usr/bin/env node
'use strict';


const fs = require('fs');
const path = require('path');
const {convert} = require('../lib/convert');



const fileFrom = process.argv[2] || 'tracks.txt';
const fileTo = process.argv[3] || 'tracks.json';


console.log(`Importing from ${fileFrom}`);
const tracks = convert(fs.readFileSync(fileFrom, 'utf-8'));
console.log(`${tracks.length} tracks extracted.`);


console.log(`Exporting to ${fileTo}`);
fs.writeFileSync(fileTo, JSON.stringify(tracks, null, 2), 'utf-8');
