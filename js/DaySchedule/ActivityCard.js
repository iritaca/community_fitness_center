import { ACTIVITIES_BY_DAY } from '../constants.js';
// @TODO: Add proper styling
class ActivityCard{
    constructor({activity}){
        this.title = activity.title
        this.instructor = activity.instructor
        this.time = activity.time
        this.render()

    }
    render(){
        this.container=document.createElement('div')
        this.container.classList.add('activity-card')

        this.titleEl= document.createElement('h6')
        this.titleEl.classList.add('activity-card-title')
        this.titleEl.textContent=this.title

        this.teacherEl = document.createElement('p')
        this.teacherEl.classList.add('activity-card-teacher')
        this.teacherEl.textContent=this.instructor

        this.timeEl=document.createElement('span')
        this.timeEl.classList.add('activity-card-time')
        this.timeEl.textContent=this.time

        this.container.appendChild(this.titleEl)
        this.container.appendChild(this.teacherEl)
        this.container.appendChild(this.timeEl)

    }

}

// @TODO: Add proper styling
export class ActivityCardList{
    constructor(day){
        this.day = day        
        this.activities=ACTIVITIES_BY_DAY.find(date=>date.day===this.day).activities
        this.render()
    }

    render(){
        const frag = document.createDocumentFragment()
        this.container=document.createElement('ul')
        this.container.classList.add('activity-card-list')

        for(const activity of this.activities){
            console.log({activity})
            const liEl =document.createElement('li')
            liEl.classList.add('activity-card-item')
            liEl.appendChild(new ActivityCard({activity}).container)
            frag.appendChild(liEl)
        }

        this.container.appendChild(frag)
    }
}