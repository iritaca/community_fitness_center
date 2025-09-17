import { ACTIVITIES_BY_DAY, SELECT_DEFAULT_OPTION } from '../constants.js';

/**
 * ActivityCard
 * - Renders a single activity card showing:
 *  - Activity title
 *  - Instructor name
 *  - Activity time
 * 
 * @param {Object} props
 * @param {Object} props.activity - Activity data
 * @param {string} props.activity.activity - Name of the activity
 * @param {string} props.activity.instructor - Name of the instructor
 * @param {string} props.activity.time - Time of the activity (hours)
 */
class ActivityCard{
    constructor({activity}){
        this.title = activity.activity
        this.instructor = activity.instructor
        this.time = activity.time

        this.container=document.createElement('div')

        this.render()

    }

    /**
     * Helper to create DOM element with class and text, appended to the container
     * @param {string} tag - Tag name of the element
     * @param {string} className  - class to add
     * @param {string} text - text content
     * @returns {HTMLElement} The created element
     */
    createElement(tag,className,text){
        const el=document.createElement(tag)
        el.classList.add(className)
        el.textContent=text
        this.container.appendChild(el)
        return el
    }

    render(){
        this.container.classList.add('activity-card')

        this.titleEl = this.createElement('h6','activity-card-title',this.title)
        this.teacherEl = this.createElement('p','activity-card-teacher',this.instructor)
        this.timeEl = this.createElement('span','activity-card-time', this.time + 'hr')
    }
}

/**
 * ActivityCardList
 * Renders a list of activities for a given day
 *  - Sorts activities by time
 *  - Marks activities out-of-time if current time has passed
 */
export class ActivityCardList{
    /**
     * 
     * @param {Object} props
     * @param {string} props.day - Day of the week
     * @param {string} props.time  - Current time in HH:mm
     */
    constructor({day,time,schedule}){
        this.day = day
        this.time = time
        this.activities=ACTIVITIES_BY_DAY.find(date=>date.day===this.day).activities
        this.container=document.createElement('ul')
        this.schedule = schedule
        this.render()
    }
    getActivitiesList(){
        const filter=this.schedule.filterByActivity ;
        let activitiesList = [...this.activities]
        
        if(filter && filter!==SELECT_DEFAULT_OPTION){
            activitiesList= activitiesList.filter(item=>item.activity.toLowerCase().includes(filter.toLowerCase()))
        }
        return activitiesList.sort((a,b)=>a.time.localeCompare(b.time))
    }
    
    render(){
        const toggleType = this.schedule.type
        this.container.classList.add('activity-card-list')

        const activitiesList = this.getActivitiesList()

        if(activitiesList.length===0 && toggleType==='daily' ){
            const emptyCard= new EmptyCard()
            this.container.appendChild(emptyCard)
            return
        }

        for(const activity of activitiesList){
            const liEl =document.createElement('li')
            liEl.classList.add('activity-card-item')
            if(this.time>=activity.time) liEl.classList.add('isOutOfTime')
            liEl.appendChild(new ActivityCard({activity}).container)
            this.container.appendChild(liEl)
        }

    }
}
/**
 * Renders and empty card with a custom message
 * @param {string} message - for the custom message
 */
export class EmptyCard{
    constructor(message='No results'){
        const emptyState = document.createElement('div')
        emptyState.classList.add('activity-card-item-empty')
        emptyState.textContent=message
        return emptyState
    }
}