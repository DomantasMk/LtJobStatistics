const keywords = [
    'react',
    'javascript',
    'python',
    'java',
    'c\\+\\+',
    'php',
    'swift',
    'golang',
    'c#',
    'matlab',
    'bash',
    'typescript',
    'ruby',
    'html',
    'css',
    'kotlin',
    'f#',
    'assembly',
    'spring',
    'laravel',
    'django',
    'express',
    'mongo',
    'angular',
    'vue',
    'sass',
    'backend',
    'frontend',
    'fullstack',
    'asp.net',
    'asp',
    'js',
    'back-end',
    'front-end',
];

const findKeywords = (jobsObject, _keywords) => {
    for (let i = 0; i < jobsObject.length; i++) {
        let foundedKeywords = [];
        for (let j = 0; j < _keywords.length; j++) {
            if (
                new RegExp('\\b' + _keywords[j] + '(?!\\w)').test(
                    jobsObject[i].text.toLowerCase()
                )
            ) {
                foundedKeywords.push(_keywords[j]);
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
        let technology = {
            title: keywords[i],
            count: 0,
            average_salary: 0,
            website: website,
        };
        for (let y = 0; y < jobsObject.length; y++) {
            if (jobsObject[y].keywords.includes(keywords[i])) {
                technology.count++;
            }
        }
        listOfTechnologies.push(technology);
    }

    return listOfTechnologies;
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
        let regex = /\d+/g;
        let string = jobsObject[i].salary;
        let matches = string.match(regex); // creates array from matches

        if (matches === null) {
            jobsObject[i].min_salary = null;
            jobsObject[i].max_salary = null;
        } else {
            if (matches[0] !== undefined) {
                jobsObject[i].min_salary = parseFloat(matches[0]);
            } else {
                jobsObject[i].min_salary = null;
            }
            if (matches[1] !== undefined) {
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
