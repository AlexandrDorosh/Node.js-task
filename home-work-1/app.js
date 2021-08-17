const fs = require('fs');
const path = require('path');

// dir 1
const mkDirPath1800 = path.join(__dirname, '1800');

fs.mkdir(mkDirPath1800, { recursive: true }, err => {
    console.log(err);
})

// dir 2
const mkDirPath2000 = path.join(__dirname, '2000');

fs.mkdir(mkDirPath2000, { recursive: true }, err => {
    console.log(err);
})

// file Alex 1800
const textPathAlex = path.join(__dirname, "1800", "Alex.js");

fs.appendFile(textPathAlex, '', err => {
    if(err){
        console.log(err);
        return;
    }
    console.log("DONE");
})

// file Diana 1800
const textPathDiana = path.join(__dirname, "1800", "Diana.js");

fs.appendFile(textPathDiana, '', err => {
    if(err){
        console.log(err);
        return;
    }
    console.log("DONE");
})

// file Sergii 1800
const textPathSergii = path.join(__dirname, "1800", "Sergii.js");

fs.appendFile(textPathSergii, '', err => {
    if(err){
        console.log(err);
        return;
    }
    console.log("DONE");
})

// file Dima 2000
const textPathDima = path.join(__dirname, "2000", "Dima.js");

fs.appendFile(textPathDima, '', err => {
    if(err){
        console.log(err);
        return;
    }
    console.log("DONE");
})

// file Oksana 2000
const textPathOksana = path.join(__dirname, "2000", "Oksana.js");

fs.appendFile(textPathOksana, '', err => {
    if(err){
        console.log(err);
        return;
    }
    console.log("DONE");
})

// file Olesya 2000
const textPathOlesya = path.join(__dirname, "2000", "Olesya.js");

fs.appendFile(textPathOlesya, '', err => {
    if(err){
        console.log(err);
        return;
    }
    console.log("DONE");
})



// rename Alex

const alex = path.join(__dirname, '1800', 'Alex.js');
const alexTo2000 = path.join(__dirname, '2000', 'Alex.js');

fs.rename(alex, alexTo2000, err => {
    console.log(err);
})

// rename Sergii

const sergii = path.join(__dirname, '1800', 'Sergii.js');
const sergiiTo2000 = path.join(__dirname, '2000', 'Sergii.js');

fs.rename(sergii, sergiiTo2000, err => {
    console.log(err);
})

// rename Oksana

const oksana = path.join(__dirname, '2000', 'Oksana.js');
const oksanaTo1800 = path.join(__dirname, '1800', 'Oksana.js');

fs.rename(oksana, oksanaTo1800, err => {
    console.log(err);
})

// rename Olesya

const olesya = path.join(__dirname, '2000', 'Olesya.js');
const olesyaTo1800 = path.join(__dirname, '1800', 'Olesya.js');

fs.rename(olesya, olesyaTo1800, err => {
    console.log(err);
})

