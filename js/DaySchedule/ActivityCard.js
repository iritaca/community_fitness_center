import { ACTIVITIES_BY_DAY } from '../constants.js';
class ActivityCard{
    constructor({activity}){
        this.title = activity.activity
        this.instructor = activity.instructor
        this.time = activity.time
        this.container=document.createElement('div')
        this.render()

    }
    render(){
        this.container.classList.add('activity-card')

        this.titleEl= document.createElement('h6')
        this.titleEl.classList.add('activity-card-title')
        this.titleEl.textContent=this.title

        this.teacherEl = document.createElement('p')
        this.teacherEl.classList.add('activity-card-teacher')
        this.teacherEl.textContent=this.instructor

        this.timeEl=document.createElement('span')
        this.timeEl.classList.add('activity-card-time')
        this.timeEl.textContent=this.time + ' hr'

        this.container.appendChild(this.titleEl)
        this.container.appendChild(this.teacherEl)
        this.container.appendChild(this.timeEl)

    }

}

export class ActivityCardList{
    constructor({day,time}){
        this.day = day
        this.time = time
        this.activities=ACTIVITIES_BY_DAY.find(date=>date.day===this.day).activities
        this.container=document.createElement('ul')
        this.render()
    }
    
    render(){
        const frag = document.createDocumentFragment()
        this.container.classList.add('activity-card-list')

        const activitiviesSortedByTime = [...this.activities].sort((a,b)=> a.time.localeCompare(b.time))
        
        for(const activity of activitiviesSortedByTime){
            const liEl =document.createElement('li')
            liEl.classList.add('activity-card-item')
            if(this.time>=activity.time) liEl.classList.add('isOutOfTime')
            console.log({time:activity.time})
            liEl.appendChild(new ActivityCard({activity}).container)
            frag.appendChild(liEl)
        }

        this.container.appendChild(frag)
    }
}