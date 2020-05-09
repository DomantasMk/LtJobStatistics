const keywords = ['javascript', 'react', 'bash'];
const objects = [
  {
  keywords: ['javascript', 'react', 'bash']
  },
  {
  keywords: ['javascript', 'kotlin', 'c#']
  },
]



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
        for(let y = 0; y<objects.length; y++){
            if(objects[y].keywords.includes(keywords[i])){
                technology.count++;
              }
        }
        listOfTechnologies.push(technology);
    }
    
    return listOfTechnologies;
}
console.log(findTechnologies(objects, keywords, "webiste"));