/* eslint-disable no-unused-vars */
/* eslint-disable strict */

'use strict';

const edit = require('../../lib/edit-file.js');
const path = require('path');

describe('Reading', () => {
  let file = `${__dirname}/data/person.json`;

  it('should return an error to not exists files', () => {
    edit.fileReader(file, (err, data) => {
      expect(err).toBeUndefined();
    });
  });

  it('should return data to an exists file', () => {
    edit.fileReader(file, (err, data) => {
      expect(typeof data).toBe('string');
    });
  });
});

describe('Editing', () => {
  it('should acccept a file name as a command line parameter', () => {
    let file = `${__dirname}/data/person.json`;
    let fileName = path.basename(file);
    process.argv.push(fileName);
    expect(process.argv[process.argv.length - 1]).toEqual(fileName);
  });

  it('ssss', () => {
    let file = `${__dirname}/data/person.json`;
    return edit.fileReader(file)
      .then(data => {
        let jsonData = JSON.parse(data.toString().trim());
        return jsonData;
      })
      .then(data => {
        data.name = 'Ibrahim';
        let buffered = Buffer.from(JSON.stringify(data));
        return edit.fileEditor(file, buffered);
      })
      .then(() => {
        return edit.fileReader(file)
          .then(data => {
            let jsonData = JSON.parse(data.toString().trim());
            expect(jsonData.name).toMatch('Ibrahim');
          });
      })
      .catch(err => { return err; });
  });

  it('should check if the other values didn\'t change', () => {
    let file = `${__dirname}/data/person.json`;
    return edit.fileReader(file)
      .then(data => {
        let jsonData = JSON.parse(data.toString().trim());
        return jsonData;
      })
      .then(data => {
        data.name = 'Aya';
        let buffered = Buffer.from(JSON.stringify(data));
        return edit.fileEditor(file, buffered);
      })
      .then(() => {
        return edit.fileReader(file)
          .then(data => {
            let jsonData = JSON.parse(data.toString().trim());
            expect(jsonData.lastName).toEqual('Scissorhands');
          });
      })
      .catch(err => { return err; });
  });

  it('', () => {
    let file = `${__dirname}/data/person.json`;
    return edit.fileReader(file)
      .then(data => {
        let jsonData = JSON.parse(data.toString().trim());
        return jsonData;
      })
      .then(data => {
        data.firstName = 'HIMA';
        let buffered = Buffer.from(JSON.stringify(data));
        return edit.fileEditor(file, buffered);
      })
      .then(() => {
        return edit.fileReader(file)
          .then((data) => {
            let jsonData = data.toString().trim();
            return expect(typeof (jsonData)).toEqual('string');
          });
      })
      .catch((error) => { return error; });
  });
});