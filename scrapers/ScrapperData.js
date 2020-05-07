const keywords = [
    'react',
    'javascript',
    'python',
    'java',
    'c++',
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
];

const findKeywords = (jobsObject, _keywords) => {
    for (let i = 0; i < jobsObject.length; i++) {
        let foundedKeywords = [];
        for (let j = 0; j < _keywords.length; j++) {
            if (jobsObject[i].text.toLowerCase().includes(_keywords[j])) {
                foundedKeywords.push(_keywords[j]);
            }
        }
        //Add keywords to same jobsObject object for further use
        jobsObject[i].keywords = foundedKeywords;
    }
    return jobsObject;
};

const addToDatabase = async (_Job, jobsObject) => {
    try {
        await _Job.insertMany(jobsObject);
    } catch (error) {
        console.log(error.message);
    }
};

exports.findKeywords = findKeywords;
exports.keywords = keywords;
exports.addToDatabase = addToDatabase;
