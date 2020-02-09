/* eslint-disable no-unused-vars */
/* eslint-disable strict */
'use strict';

const fs = require('fs');
const util = require('util');
const readingFile = util.promisify(fs.readFile);
const fileReader = (file, cb) => {
  return readingFile(file)
    .then(results => { return results; })
    .catch(e => console.error(e));
};

const writingFile = util.promisify(fs.writeFile);
const fileEditor = (file, data) => {
  return writingFile(file, data);
};

module.exports = { fileReader, fileEditor };