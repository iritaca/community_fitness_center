
import { ValidateWrapper } from '../utils.js';
import { ActivityCardList } from './ActivityCard.js';
import { DayTitle } from './DayTitle.js';
// need a class wrapper that can decide either to render DayTitle or DayAccorion, then the inner container should be filled by ACTIVITIES_BY_DAY;
// then this super class should be able to filter by classes, meaning that when a day is picked all classes of that they should be shown.
// - if the selected class has a value, the activities list should be filtered by classes that include the selected class


export class DaySchedule{
    static VALID_DAYS =['monday','tuesday','wednesday','thursday','firday']
    constructor({type='daily',wrapper,day}){
        if(!DaySchedule.VALID_DAYS.includes(day)){
            throw new Error(`[DaySchedule] Invalid day ${day}`)
        }
        this.type=type
        this.day = day
        this.wrapper = new ValidateWrapper({wrapper,componentName:`day-schedule-${day}`}).getWrapper()

        this.render()
    }
    render(){
        this.wrapper.innerHTML = ''
        let headerToRender =  new DayTitle({title:this.day})
        if(this.type==='weekly'){
            // something will happen
        }

        this.wrapper.appendChild(headerToRender.container)
        
        const cardList = new ActivityCardList(this.day)
        
        this.wrapper.appendChild(cardList.container)
    }
}