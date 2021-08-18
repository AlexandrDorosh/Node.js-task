const fs = require('fs');
const path = require('path');

// dir manOlder20
const mkDirManOlder20 = path.join(__dirname, 'manOlder20');

fs.mkdir(mkDirManOlder20, { recursive: true }, err => {
    console.log(err);
})

// dir manYounger20
const mkDirManYounger20 = path.join(__dirname, 'manYounger20');

fs.mkdir(mkDirManYounger20, { recursive: true }, err => {
    console.log(err);
})

// dir womanOlder20
const mkDirWomanOlder20 = path.join(__dirname, 'womanOlder20');

fs.mkdir(mkDirWomanOlder20, { recursive: true }, err => {
    console.log(err);
})

// dir womanYounger20
const mkDirWomanYounger20 = path.join(__dirname, 'womanYounger20');

fs.mkdir(mkDirWomanYounger20, { recursive: true }, err => {
    console.log(err);
})

function createFiles(){

}