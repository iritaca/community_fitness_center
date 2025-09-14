import { ToggleScheduleView } from './ToggleScheduleView.js';
import { DropdownSelect, DateSelect } from './Select.js';
import { DaySchedule } from './DaySchedule/DaySchedule.js';
import { ACTIVITIES } from './constants.js';


// Containers
const filtersContainer = 'activities-filters'

// Components
const toggle = new ToggleScheduleView({buttons:['daily','weekly'],wrapper:'schedule-toggle'})

const activitiesSelect = new DropdownSelect({
    label:'Selected class',
    wrapper:filtersContainer,
    options:ACTIVITIES,
    id:'class-select',
defaultOption:'all classes'})

const dateSelect = new DateSelect({label:'Date',wrapper:filtersContainer,id:'date'})

toggle.suscribe(active=>{
    console.log('Active toggle changed:', active)
    const isDaily = active==='daily'

    dateSelect.setIsVisible(isDaily)
})

const MondaySchedule = new DaySchedule({day:'monday',wrapper:'activities'})
console.log(MondaySchedule)