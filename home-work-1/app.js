
const fs = require('fs');
const path = require('path');

const textPathAlex = path.join(__dirname, "1800", "Alex.txt");
const alexTo2000 = path.join(__dirname, '2000', 'Alex.txt');

const textPathSergii = path.join(__dirname, "1800", "Sergii.txt");
const sergiiTo2000 = path.join(__dirname, '2000', 'Sergii.txt');

const textPathDiana = path.join(__dirname, "1800", "Diana.txt");

const textPathDima = path.join(__dirname, "2000", "Dima.txt");

const textPathOksana = path.join(__dirname, "2000", "Oksana.txt");
const oksanaTo1800 = path.join(__dirname, '1800', 'Oksana.txt');

const textPathOlesya = path.join(__dirname, "2000", "Olesya.txt");
const olesyaTo1800 = path.join(__dirname, '1800', 'Olesya.txt');


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

fs.writeFile(textPathAlex, 'name: Alex, gender: male', err => {
    if(err){
        console.log(err);
        return;
    }
    console.log("DONE");
})

// file Diana 1800
const diana = 'name: Diana, gender: female';

fs.writeFile(textPathDiana, diana, err => {
    if(err){
        console.log(err);
        return;
    }
    console.log("DONE");
})

// file Sergii 1800
const sergii = 'name: Sergii, gender: male';

fs.writeFile(textPathSergii, sergii, err => {
    if(err){
        console.log(err);
        return;
    }
    console.log("DONE");
})

// file Dima 2000
const dima = 'name: Dima, gender: male';

fs.writeFile(textPathDima, dima, err => {
    if(err){
        console.log(err);
        return;
    }
    console.log("DONE");
})

// file Oksana 2000
const oksana = 'name: Oksana, gender: female';

fs.writeFile(textPathOksana, oksana, err => {
    if(err){
        console.log(err);
        return;
    }
    console.log("DONE");
})

// file Olesya 2000
const olesya = 'name: Olesya, gender: female';

fs.writeFile(textPathOlesya, olesya, err => {
    if(err){
        console.log(err);
        return;
    }
    console.log("DONE");
})

// rename Alex
fs.rename(textPathAlex, alexTo2000, err => {
    console.log(err);
})

// rename Sergii
fs.rename(textPathSergii, sergiiTo2000, err => {
    console.log(err);
})

// rename Oksana
fs.rename(textPathOksana, oksanaTo1800, err => {
    console.log(err);
})

// rename Olesya
fs.rename(textPathOlesya, olesyaTo1800, err => {
    console.log(err);
})

