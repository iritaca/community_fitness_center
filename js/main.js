import { ToggleScheduleView } from './ToggleScheduleView.js';

document.addEventListener('DOMContentLoaded',()=>{
    const toggle = new ToggleScheduleView((active)=>{
    console.log('Active toggle changed:', active)
})
})