const { Router } = require('express');
const { last } = require('underscore');
const router = Router();

const regExp = /^[a-zA-Z\s]*$/; // only letters and spaces
const onlyNum = /^[0-9]+$/;

const errors = require('../errors.json');
console.log(errors);

function calculateYourAge(day, month, year) {
    var yourAge;
    var date = new Date();
    const currentDay = date.getDay();
    const currentMonth = date.getMonth() + 1; // cause it starts from 0 = January
    const currentYear = date.getFullYear();

    if( currentMonth >= month && currentDay >= day ) {
        yourAge = currentYear - year;
    }
    else {
        yourAge = currentYear - year - 1;
    }
    return yourAge;
}

function calculateAge(day, month, year) {

    var finalAge;

    if( ( month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month ==12 ) && ( day <= 31 && year < 2021 ) ) {
        finalAge = calculateYourAge(day, month, year);
    }
    else if( ( month == 4 || month == 6 || month == 9 || month == 11 ) && ( day <= 30 && year < 2021 ) ) {
        finalAge = calculateYourAge(day, month, year);
    }
    else if( month == 2 &&  day < 29 && year < 2021 ) {
        finalAge = calculateYourAge(day, month, year);
    }
    else {
        return 1001;
    }

    return finalAge;
}

router.get('/', (req, res) => {
    // lo que se obtenga de la consulta FETCH se guardará como STRING en la variable RESPONSE
    res.send("Hola desde la página USERS");
});

router.post('/', (req, res) => {

    var age;
    const { name, lastname, day, month, year } = req.body;

    if( name && lastname && day && month && year ) {
        if( regExp.test(name) == false || regExp.test(lastname) == false ) {
            console.log(`Error: ${errors[1].error}. ${errors[1].description}.`);
            res.status(400).json({"error": "Check out your name"});    
            
        }
        else if( onlyNum.test(day) && onlyNum.test(month) && onlyNum.test(year) ) {
            age = calculateAge(day, month, year);
            if( age == 1001 ) {
                console.log(`Error: ${errors[0].error}. ${errors[0].description}.`);
                res.status(400).json({"error": "Please check your date of birth info"})
            }
            else {
                // SUCCESFUL CASE
                const newUser = {...req.body, age};
                res.json(newUser);
            }
        }
        else {
            console.log(`Error: ${errors[4].error}. ${errors[4].description}.`);
            res.status(400).json({"error": "Only numbers in your date of birth, please"});        
        }
        
    }
    else if( name == false || lastname == false ) {
        console.log(`Error: ${errors[3].error}. ${errors[3].description}.`);
        res.status(400).json({"error": "Check out your name"});
    }
    else {
        console.log(`Error: ${errors[2].error}. ${errors[2].description}.`);
        res.status(400).json({"error": "Check out your date of birth"});    
    }
    
});

module.exports = router;