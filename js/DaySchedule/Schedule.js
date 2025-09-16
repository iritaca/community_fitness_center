
import { ValidateWrapper } from '../utils.js';
import { ActivityCardList } from './ActivityCard.js';
import { DayTitle } from './DayTitle.js';
// need a class wrapper that can decide either to render DayTitle or DayAccorion, then the inner container should be filled by ACTIVITIES_BY_DAY;
// then this super class should be able to filter by classes, meaning that when a day is picked all classes of that they should be shown.
// - if the selected class has a value, the activities list should be filtered by classes that include the selected class

const VALID_DAYS=['monday','tuesday','wednesday','thursday','friday']

export class Day{
    constructor({day}){
        this.day = day
        this.container = document.createElement('div')
        
        console.log(this.day)
        this.render()
    }
    render(){
        let headerToRender =  new DayTitle({title:this.day})
        this.container.appendChild(headerToRender.container)
        const cardList = new ActivityCardList(this.day)
        this.container.appendChild(cardList.container)
        
    }
}

export class ScheduleList{
    constructor({wrapper,type='weekly'}){
        this.wrapper = new ValidateWrapper({wrapper,componentName:this.constructor.name}).getWrapper()
        this.type = type

        this.render()
    }

    render(){
        this.wrapper.innerHTML = ''

        if(this.type==='daily'){
            //return present day
            const today = new Day({day:'monday'})
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

