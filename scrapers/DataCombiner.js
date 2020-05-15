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
                        title: keys[i][0].replace(/\\/g, ''),
                        count: 0,
                        average_salary: 0,
                    };
                    let foundedAverage = [];
                    for (let j = 0; j < res.length; j++) {
                        if (keys[i][0] === res[j].title) {
                            dataForKeyword.count += res[j].count;

                            let obj = {
                                count: res[j].count,
                                average_salary: res[j].average_salary,
                            };
                            foundedAverage.push(obj);
                        }
                    }

                    //Counting weighted average
                    let averageSalaryWeighted = 0;

                    foundedAverage.forEach((item) => {
                        averageSalaryWeighted +=
                            item.count * item.average_salary;
                    });

                    if (averageSalaryWeighted !== 0) {
                        dataForKeyword.average_salary = Math.round(
                            averageSalaryWeighted / dataForKeyword.count
                        );
                    }

                    fullData.push(dataForKeyword);
                }

                //Insert many to main table
                addToDatabase(Main, fullData);

                console.log('Successfully added to db');
            });
    } catch (err) {
        console.log(err);
    }
};

combineData(keywords);
