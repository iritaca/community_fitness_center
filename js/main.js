import { ToggleScheduleView } from './ToggleScheduleView.js';
import { DropdownSelect, DateSelect } from './Select.js';
import { ScheduleList } from './DaySchedule/Schedule.js';
import { ACTIVITIES, FOOTER_LINKS, SELECT_DEFAULT_OPTION } from './constants.js';
import { Footer } from './Footer.js';


// Containers
const filtersContainer = 'activities-filters'

// Components
const toggle = new ToggleScheduleView({buttons:['daily','weekly'],wrapper:'schedule-toggle'})

const activitiesSelect = new DropdownSelect({
    label:'activity',
    wrapper:filtersContainer,
    options:ACTIVITIES,
    id:'class-select',
defaultOption:SELECT_DEFAULT_OPTION})

const dateSelect = new DateSelect({label:'Date',wrapper:filtersContainer,id:'date'})


const schedule = new ScheduleList({wrapper:'activities'})

activitiesSelect.subscribe(activity=>{
    console.log('Activity filtered by', activity)
    schedule.setActivities(activity)
})

toggle.subscribe(active=>{
    console.log('Active toggle changed:', active)
    const isDaily = active==='daily'

    dateSelect.setIsVisible(isDaily)
    schedule.setType(active)
})

dateSelect.subscribe(day=>{
    console.log('Selected day:' + day)
    if(!day){
        schedule.setDate(null)
        return
    }
    schedule.setDate(day)
})


const FooterLinks = new Footer({links:FOOTER_LINKS})