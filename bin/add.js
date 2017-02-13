#!/usr/bin/env node
'use strict';


const {add} = require('../lib/add');


console.log(add(process.argv[2], process.argv[3]));
