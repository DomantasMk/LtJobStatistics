const Technology = require('../models/Technology');
const Main = require('../models/Main');
const connectDB = require('../config/db');
const { keywords, addToDatabase } = require('../scrapers/ScrapperData');

//Passing data from technologies to main table
const combineData = async (keys) => {
    connectDB();
    try {
        Technology.find({})
            .select('-id -__v -date_added_to_db')
            .then((res) => {
                let fullData = [];
                for (let i = 0; i < keys.length; i++) {
                    let dataForKeyword = {
                        title: keys[i][0],
                        count: 0,
                        average_salary: 0,
                    };
                    let foundedNr = 0;
                    for (let j = 0; j < res.length; j++) {
                        if (keys[i][0] === res[j].title) {
                            dataForKeyword.count += res[j].count;
                            dataForKeyword.average_salary +=
                                res[j].average_salary;
                            foundedNr++;
                        }
                    }
                    if (dataForKeyword.average_salary !== 0) {
                        dataForKeyword.average_salary = Math.round(
                            dataForKeyword.average_salary / foundedNr
                        );
                    }

                    fullData.push(dataForKeyword);
                }

                //Insert many to main table
                addToDatabase(Main, fullData);
                console.log('Successfully added to main db');
            });
    } catch (err) {
        console.log(err);
    }
};

combineData(keywords);
