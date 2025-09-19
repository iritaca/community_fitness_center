export class DayTitle{
    constructor({title}){
        this.title = title

        this.container = document.createElement('div')
        this.container.classList.add('schedule-header')

        this.titleEl= document.createElement('h3')
        this.titleEl.textContent=this.title

        this.container.appendChild(this.titleEl)

    }
}