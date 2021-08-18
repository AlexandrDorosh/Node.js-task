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

const users = [
    {name: "Olya", gender: "female", age: 21},
    {name: "Valya", gender: "female", age: 22},
    {name: "Natasha", gender: "female", age: 23},
    {name: "Lena", gender: "female", age: 14},
    {name: "Ulya", gender: "female", age: 15},
    {name: "Vasya", gender: "male", age: 21},
    {name: "Petya", gender: "male", age: 22},
    {name: "Sasha", gender: "male", age: 23},
    {name: "Seryu", gender: "male", age: 14},
    {name: "Vitalik", gender: "male", age: 15}
]

for (let user of users) {
    function writeFiles(dir){
        const textPath = path.join(__dirname, dir, `${user.name}.txt`);
        fs.writeFile(textPath, JSON.stringify(user), err => {
            if(err){
                console.log(err);
                return;
            }
            console.log("DONE");
        })
    }
    if(user.gender === 'male' && user.age > 20){
        writeFiles('manOlder20');
    } else if(user.gender === 'male' && user.age < 20){
        writeFiles('manYounger20');
    } else if(user.gender === 'female' && user.age > 20){
        writeFiles('womanOlder20');
    } else if(user.gender === 'female' && user.age < 20){
        writeFiles('womanYounger20');
    }
}