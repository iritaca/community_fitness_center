import { ToggleScheduleView } from './ToggleScheduleView.js';
import { DropdownSelect, DateSelect } from './Select.js';
import { ScheduleList } from './DaySchedule/Schedule.js';
import { ACTIVITIES, DOM_IDS, FOOTER_LINKS, SELECT_DEFAULT_OPTION } from './constants.js';
import { Footer } from './Footer.js';
import { ActivityDescription } from './DaySchedule/ActivityDescription.js';


const toggle = new ToggleScheduleView({buttons:['daily','weekly'],wrapper:DOM_IDS.scheduleToggle})

const activitiesSelect = new DropdownSelect({
    label:'activity',
    wrapper:DOM_IDS.filtersContainer,
    options:ACTIVITIES,
    id:'class-select',
defaultOption:SELECT_DEFAULT_OPTION})

const activityDescription = new ActivityDescription({wrapper:DOM_IDS.activityDescription})
const schedule = new ScheduleList({wrapper:DOM_IDS.scheduleList})

const dateSelect = new DateSelect({label:'Date',wrapper:DOM_IDS.filtersContainer,id:'date'})

activitiesSelect.subscribe(activity=>{
    schedule.setActivities(activity)
    activityDescription.showDescriptionBox(activity)
})
dateSelect.subscribe(day=>schedule.setDate(day))

toggle.subscribe(active=>{
    const isDaily = active==='daily'
    dateSelect.setIsVisible(isDaily)
    schedule.setType(active)
})

const footerLinks = new Footer({links:FOOTER_LINKS})