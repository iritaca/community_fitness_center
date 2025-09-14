import { ToggleScheduleView } from './ToggleScheduleView.js';
import { DropdownSelect, DateSelect } from './Select.js';

// Containers
const filtersContainer = 'activities-filters'

const ACTIVITIES =['strength','pilates','weights','kickboxing','strength & flexibility','all-ages endurance','yoga & flow','all-american dance','ultimate endurance','skinny fit','fit & flex','fitness mix']

// Components
const toggle = new ToggleScheduleView({buttons:['daily','weekly'],wrapper:'schedule-toggle'})

const activitiesSelect = new DropdownSelect({
    label:'Selected class',
    wrapper:filtersContainer,
    options:ACTIVITIES,
    id:'activities',
defaultOption:'all classes'})

const dateSelect = new DateSelect({label:'Date',wrapper:filtersContainer,id:'date'})

toggle.suscribe(active=>{
    console.log('Active toggle changed:', active)
    const isDaily = active==='daily'

    dateSelect.setIsVisible(isDaily)
})
