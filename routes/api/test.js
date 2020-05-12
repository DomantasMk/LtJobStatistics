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
let objects = [{
    job_title: 'WEB/Mobile projektų testuotojas (-a)',
    text: '\n' +
      '                                            \n' +
      '                                                            Darbo pobūdis\n' +
      '                                                        WEB/Mobile sistemų testavimas (vartotojo sąsajos testavimas, atskirų sistemos modulių testavimas, bendras sistemų testavimas);\n' +
      'Klaidų JS registravimas;\n' +
      'Ataskaitų rengimas;\n' +
      'Projektų kokybės react.js užtikrinimas.\n' +
      '                        \n' +
      '                    \n' +
      '                                            \n' +
      '                                                            Reikalavimai\n' +
      '                                                        WEB/Mobile sistemų veikimo principų suvokimas;\n' +
      'Patirtis testavimo arba IT srityje;\n' +
      'Anglų ir lietuvių kalbų žinios žodžiu bei raštu;\n' +
      'Kruopštumas ir atsakingumas;\n' +
      'Atidumas, sugebėjimas analitiškai mąstyti;\n' +
      'Aukštasis išsilavinimas IT srityje (gali būti paskutinių kursų studentas).\n' +
      '\n' +
      'Privalumai: \n' +
      'Automatizuotų testų, testavimo scenarijų rašymas;\n' +
      'WEB programavimo įgūdžiai;\n' +
      'HTML, CSS supratimas.\n' +
      '                        \n' +
      '                    \n' +
      '                                            \n' +
      '                                                            Mes jums siūlome\n' +
      '                                                        Geras darbo sąlygas biure, Vilniaus centre;\n' +
      'Draugišką kolektyvą;\n' +
      'Ne priežiūrą, o pagalbą siekiant bendrų komandos užsibrėžtų rezultatų;\n' +
      'Darbą su idomiais klientais ir projektais;\n' +
      'Atlyginimą, priklausantį nuo Jūsų sugebėjimų, padarytos pažangos ir klientų įvertinimo.\n' +
      '                        \n' +
      '                    \n' +
      '                                            \n' +
      '                            Atlyginimas\n' +
      '                            \n' +
      '                                Nuo 900                                €/mėn.                                neatskaičius mokesčių                                \n' +
      '\n' +
      '                                                            \n' +
      '                        \n' +
      '                                    ',
    company: 'UAB „Nordcode technology“',
    job_posted_date: '2020-05-11',
    salary: 'Nuo 900',
    website: 'CvBankas.lt'
  },
  {
    job_title: 'Application Lifecycle Specialist',
    text: '\n' +
      '                                            \n' +
      '                                                            Darbo pobūdis\n' +
      '                  javascript                                      As an Application Lifecycle Specialist you will be responsible for managing applications through theirs lifecycle. Your main role will be to do software compliance checks, preventing application from Cyber Security threats by eliminating security risks and ensure that applications are up to date.\n' +
      'Your daily work day will look like:\n' +
      'Recurring checks of the software compliance status\n' +
      'Cyclical check of the CyberSecurity status for defined Applications\n' +
      'Taking Security ownership for applications used in business departments\n' +
      'Identification and elimination of security risks\n' +
      'Documentation \n' +
      'Optimize and expand usage of automatic software deployment\n' +
      'Ordering Software Packaging, Quality Review of Packages\n' +
      'Monitoring rollout of Software Package\n' +
      '                        \n' +
      '                    \n' +
      '                                            \n' +
      '                                                            What do we expect\n' +
      '                                                        University degree \n' +
      'Experience in IT Security\n' +
      'English – fluent\n' +
      'Enjoy dealing with employees\n' +
      'Willingness to learn, work independently and in the team\n' +
      'Deep knowledge of the Microsoft Windows operating system.\n' +
      'Strong analytical skills\n' +
      '                        \n' +
      '                    \n' +
      '                                            \n' +
      '                                                            What should you expect\n' +
      '                                                        Receive not only remuneration package, but also:\n' +
      'Broaden your mind in collaboration with colleagues from other Festo units\n' +
      'Gain an international working experience\n' +
      'Take a part in professional trainings in Germany\n' +
      'Use internal career opportunities\n' +
      'Develop your skills and grow as a professional\n' +
      'Get support and mentoring from a leader, who is working under the Coaching culture principles\n' +
      'Participate in the company‘s events and initiatives\n' +
      'Have comfortable conditions for work and the times in between (chill zones, table tennis, foosball, terrace and more)\n' +
      '                        \n' +
      '                    \n' +
      '                                            \n' +
      '                            Atlyginimas\n' +
      '                            \n' +
      '                                Nuo 1200                                €/mėn.                                neatskaičius mokesčių                                \n' +
      '\n' +
      '                                                            \n' +
      '                        \n' +
      '                                    ',
    company: 'UAB „FESTO“',
    job_posted_date: '2020-05-11',
    salary: 'Nuo 1200',
    website: 'CvBankas.lt'
  },]


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

findKeywords(objects, keywords).map(obj =>{console.log(obj.keywords)});
