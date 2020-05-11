const keywords = [
    ['react', 'react.js'],
    ['javascript', 'js', 'java script'],
    ['python'],
    ['java'],
    ['c\\+\\+'],
    ['php'],
    ['swift'],
    ['golang'],
    ['c#'],
    ['matlab'],
    ['bash'],
    ['typescript', 'ts'],
    ['ruby'],
    ['html'],
    ['css'],
    ['kotlin'],
    ['f#'],
    ['assembly'],
    ['spring'],
    ['laravel'],
    ['django'],
    ['express'],
    ['mongo'],
    ['angular', 'angular.js'],
    ['vue', 'vue.js'],
    ['sass'],
    ['fullstack'],
    ['asp.net', 'asp'],
    ['back-end', 'backend'],
    ['front-end', 'frontend'],
    ['node'],
];

const findKeywords = (jobsObject, _keywords) => {
    for (let i = 0; i < jobsObject.length; i++) {
        let foundedKeywords = [];
        for (let j = 0; j < _keywords.length; j++) {
            for(let y = 0; y < _keywords[j].length; y++){
                if (
                    new RegExp('\\b' + _keywords[j][y] + '(?!\\w)').test(
                        jobsObject[i].text.toLowerCase()
                    )
                ) {
                    foundedKeywords.push(_keywords[j][0]);
                    break;
                }
            }
        }
        //Add keywords to same jobsObject object for further use
        jobsObject[i].keywords = foundedKeywords;
    }
    return jobsObject;
};
const findTechnologies = (jobsObject, keywords, website) => {
    let listOfTechnologies = [];
    for (let i = 0; i < keywords.length; i++) {
        let averageArray = [];
        let technology = {
            title: keywords[i],
            count: 0,
            average_salary: 0,
            website: website,
        };
        for (let y = 0; y < jobsObject.length; y++) {
            if (jobsObject[y].keywords.includes(keywords[i])) {
                technology.count++;

                if (jobsObject[y].min_salary !== null) {
                    averageArray.push(
                        getAverageSalaryFromMinMax(jobsObject[y])
                    );
                }
            }
        }
        technology.average_salary = getAverageSalary(averageArray);
        listOfTechnologies.push(technology);
    }
    return listOfTechnologies;
};

const getAverageSalary = (averageArray) => {
    try {
        const sum = averageArray.reduce((a, b) => {
            return a + b;
        });

        const average_salary = sum / averageArray.length;
        return Math.round(average_salary);
    } catch (error) {
        return 0;
    }
};

const getAverageSalaryFromMinMax = (jobsObject) => {
    let average = null;

    if (jobsObject.max_salary !== null) {
        average = (jobsObject.min_salary + jobsObject.max_salary) / 2;
    } else if (jobsObject.min_salary !== null) {
        average = jobsObject.min_salary;
    }
    return average;
};

const addToDatabase = async (_Job, jobsObject) => {
    try {
        await _Job.insertMany(jobsObject);
    } catch (error) {
        console.log(error.message);
    }
};

const findSalary = (jobsObject) => {
    for (let i = 0; i < jobsObject.length; i++) {
        let regex = /[\d\.]+/g;
        let string = jobsObject[i].salary;
        let matches = string.match(regex); // creates array from matches

        if (matches === null) {
            jobsObject[i].min_salary = null;
            jobsObject[i].max_salary = null;
        } else {
            if (matches[0] !== undefined) {
                matches[0] = matches[0].replace('.', '');
                jobsObject[i].min_salary = parseFloat(matches[0]);
            } else {
                jobsObject[i].min_salary = null;
            }
            if (matches[1] !== undefined) {
                matches[1] = matches[1].replace('.', '');
                jobsObject[i].max_salary = parseFloat(matches[1]);
            } else {
                jobsObject[i].max_salary = null;
            }
        }
    }
    return jobsObject;
};

exports.findKeywords = findKeywords;
exports.keywords = keywords;
exports.addToDatabase = addToDatabase;
exports.findTechnologies = findTechnologies;
exports.findSalary = findSalary;
