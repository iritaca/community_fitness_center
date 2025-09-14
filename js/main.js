import { ToggleScheduleView } from './ToggleScheduleView.js';

document.addEventListener('DOMContentLoaded',()=>{
    const container = document.getElementById('schedule-toggle')
    const toggle = new ToggleScheduleView(['daily','weekly'],container)

    toggle.suscribe(active=>{
    console.log('Active toggle changed:', active)
})
})