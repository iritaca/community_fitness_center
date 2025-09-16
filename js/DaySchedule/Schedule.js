
import { Observable } from '../Observable.js';
import { ValidateWrapper } from '../utils.js';
import { ActivityCardList } from './ActivityCard.js';
import { DayTitle } from './DayTitle.js';
// need a class wrapper that can decide either to render DayTitle or DayAccorion, then the inner container should be filled by ACTIVITIES_BY_DAY;
// then this super class should be able to filter by classes, meaning that when a day is picked all classes of that they should be shown.
// - if the selected class has a value, the activities list should be filtered by classes that include the selected class

const VALID_DAYS=['monday','tuesday','wednesday','thursday','friday']

export class Day{
    constructor({day,time}){
        this.day = day
        this.time= time
        this.container = document.createElement('div')
        
        console.log(this.day)
        this.render()
    }
    render(){
        let headerToRender =  new DayTitle({title:this.day})
        this.container.appendChild(headerToRender.container)
        const cardList = new ActivityCardList({day:this.day,time:this.time})
        this.container.appendChild(cardList.container)
        
    }
}

export class ScheduleList extends Observable{
    constructor({wrapper,type='daily'}){
        super()
        this.wrapper = new ValidateWrapper({wrapper,componentName:this.constructor.name}).getWrapper()
        this.type = type
        this.render()
    }

    setType(type){
        this.type = type
        this.render()
    }

    getPresentDay(){
        const now = new Date()

        const day = new Intl.DateTimeFormat('en-US',{weekday:'long'}).format(now).toLowerCase()

        const time = now.toLocaleTimeString('en-US',{
            hour:'2-digit',
            minute:'2-digit',
            hour12:false
        })

        return {day,time}
    }


    render(){
        this.wrapper.innerHTML = ''

        if(this.type==='daily'){
            //return present day
            const present = this.getPresentDay()
            const today = new Day({day:present.day,time:present.time})
            this.wrapper.appendChild(today.container)
            return 
            // return selected day from date input
        }

        const frag = document.createDocumentFragment()
        const ul = document.createElement('ul')
        for(const day of VALID_DAYS){
            const li=document.createElement('li')
            const newDay = new Day({day})
            li.appendChild(newDay.container)
            frag.appendChild(li)
        }
        
        ul.appendChild(frag)
        this.wrapper.appendChild(ul)
    }
}

