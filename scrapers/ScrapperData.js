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
const findTechnologies = (jobsObject, keywords, website) =>{
    let listOfTechnologies = [];
    for(let i = 0; i<keywords.length; i++)
    {
        let technology = {
            title:keywords[i],
            count:0,
            average_salary:0,
            website:website,
        }
        for(let y = 0; y<jobsObject.length; y++){
            if(jobsObject[y].keywords.includes(keywords[i])){
                technology.count++;
              }
        }
        listOfTechnologies.push(technology);
    }
    
    return listOfTechnologies;
}
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
exports.findTechnologies = findTechnologies;
