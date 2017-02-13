'use strict';


const parse = d => parseInt(d.split(':')[0]) * 60 + parseInt(d.split(':')[1]);
const format = seconds => `${Math.floor(seconds / 60)}:${seconds % 60}`;
const add = (d1,d2) => format(parse(d1) + parse(d2));


exports.add = add;
