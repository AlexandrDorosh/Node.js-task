const fs = require('fs');
const path = require('path');

const testFolder = './1800/';
const testFolder2 = './2000/';

fs.readdir(testFolder, (err, files) => {
    if (err){
        console.log(err)
        return
    }
    files.forEach(file => {
        const persons1800 = path.join(__dirname, '1800', file);

        fs.readFile(persons1800, (err1, data) => {
            if (err1){
                console.log(err1)
                return
            }
            const dataString = data.toString();
            const dataObj = JSON.parse(dataString);
            
            console.log(dataObj);

            if(dataObj.gender === 'male'){
                const personsTo2000 = path.join(__dirname, '2000', file);
                fs.rename(persons1800, personsTo2000, err => {
                console.log(err);
            })
            }
        })
    });
})

fs.readdir(testFolder2, (err, files) => {
    if (err){
        console.log(err)
        return
    }
    files.forEach(file => {
        const persons2000 = path.join(__dirname, '2000', file);

        fs.readFile(persons2000, (err1, data) => {
            if (err1){
                console.log(err1)
                return
            }
            const dataString = data.toString();
            const dataObj = JSON.parse(dataString);

            console.log(dataObj);

            if(dataObj.gender === 'female'){
                const personsTo1800 = path.join(__dirname, '1800', file);
                fs.rename(persons2000, personsTo1800, err => {
                    console.log(err);
                })
            }
        })
    });
})