
import { Observable } from '../Observable.js';
import { ValidateWrapper,parseDateStringToDate } from '../utils.js';
import { ActivityCardList, EmptyCard } from './ActivityCard.js';
import { DayTitle } from './DayTitle.js';
// need a class wrapper that can decide either to render DayTitle or DayAccorion, then the inner container should be filled by ACTIVITIES_BY_DAY;
// - if the selected class has a value, the activities list should be filtered by classes that include the selected class

const VALID_DAYS=['monday','tuesday','wednesday','thursday','friday']

/** Day - represents a single day in the schedule view
 * 
 * - schedule passes filter and toggleType to activityCardList
 * 
 * - Renders:
 *  - the day title
 *  - activity cards
 *  - An empty state if the day has no valid activities
 * 
 * Dependencies: 
 *  - DayTitle: Renders the day title
 *  - ActivityCardList: Renders the activities for a given day
 *  - VALID_DAYS: the array of valid day names
 */
export class Day{
    constructor({day,time,schedule}){
        this.day = day
        this.time= time
        this.container = document.createElement('div')
        this.schedule=schedule
        this.render()
    }
    /**
     * Renders the day container with title and activites or empty state
     */
    render(){
        // Always render the day title
        const headerToRender =  new DayTitle({title:this.day})
        this.container.appendChild(headerToRender.container)

        // If the day is not valid -> show empty state
        if(!VALID_DAYS.includes(this.day)){
            const emptyCard = new EmptyCard()
            this.container.appendChild(emptyCard)
            return
        }

        // Otherwise render the list of activities 
        const cardList = new ActivityCardList({day:this.day,time:this.time,schedule:this.schedule})
        this.container.appendChild(cardList.container)
    }
}

/** ScheduleList manages rendering a daily or weekly schedule view
 * - Daily view shows the current or selected day
 * - Weekly view shows all valid days
 * 
 * - Keep track of the current date or a user-selected date
 * - Normalize dates to a given timeZone ('America/Mexico_city)
 * - Delegates rendering of individual days to the Day component
 * 
 * - Extends Observable
 * 
 */
export class ScheduleList extends Observable{
    constructor({wrapper,type='daily',filterByActivity=''}){
        super()
        this.wrapper = new ValidateWrapper({wrapper,componentName:this.constructor.name}).getWrapper()
        this.type = type
        this.date = null
        this.timeZone= 'America/Mexico_City'
        this.filterByActivity = filterByActivity
        this.render()
    }

     setType(type){
        this.type = type
        this.render()
    }

     getPresentDay() {
        const now = new Date()
        const day = new Intl.DateTimeFormat('en-US', { weekday:'long', timeZone:this.timeZone }).format(now).toLowerCase()
        const time = now.toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit', hour12:false })

        return { day, time }
    }

    setActivities(filter){
         this.filterByActivity=filter
         this.render()
    }

     // Set the selected date from input or other sources
    setDate(dateStringOrDate) {
        if (!dateStringOrDate) {
            this.date = null // fallback : use present day
        }
        else {
            this.date = parseDateStringToDate(dateStringOrDate) // normalize input
        }

        // If selected date equals today in MX timezone -> treat it as 'present date'
        const today = parseDateStringToDate(
            new Date().toLocaleDateString('en-CA', { timeZone: this.timeZone })
        )
        if (this.date && this.isSameDay(this.date, today)) {
            this.date = null
        }

        this.render()
    }

    // Checks if two Date objects are the same day
    isSameDay(a, b) {
        return (
            a.getFullYear() === b.getFullYear() &&
            a.getMonth() === b.getMonth() &&
            a.getDate() === b.getDate()
        )
    }

    render() {
        this.wrapper.innerHTML = ''
        if (this.type === 'daily') this.renderDaily()
        else this.renderWeekly()
    }

    renderDaily() {
        let dayInstance
        if (this.date) {
            const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long', timeZone: this.timeZone })
                .format(this.date)
                .toLowerCase()
            dayInstance = new Day({ day: dayName,schedule:this })
        } else {
            const present = this.getPresentDay()
            dayInstance = new Day({ day: present.day, time: present.time,schedule:this })
        }
        if (!dayInstance || !dayInstance.container) {
            console.error('Failed to create Day instance', dayInstance)
            return
        }
        this.wrapper.appendChild(dayInstance.container)
    }

    renderWeekly() {
        
        const ul = document.createElement('ul')
        for (const day of VALID_DAYS) {
            const li = document.createElement('li')
            const newDay = new Day({ day,schedule:this })
            li.appendChild(newDay.container)
            ul.appendChild(li)
        }
        this.wrapper.appendChild(ul)
    }

}

