
// Toggle schedule view
export class ToggleScheduleView {
    constructor(onChange,buttons=['daily','weekly']){
        this.container = document.getElementById('schedule-toggles')
        this.activeToggle=buttons[0]
        this.buttons = buttons
        this.onChange = onChange

        this.createButtons()
        this.init()
    }

    createButtons(){
        // clears the container
        this.container.innerHTML =''
        this.buttons.forEach(id=>{
            const btn = document.createElement('button')
            btn.id=id
            btn.classList.add('toggle-button')
            btn.textContent=id[0].toUpperCase() + id.slice(1) + ' schedule'
            this.container.appendChild(btn)
        })
    }

    init(){
        this.container.addEventListener('click', (e)=> this.handleClick(e))
        this.updateUI()
    }

    handleClick(e){
        const toggleButton = e.target.closest('button')
        if(!toggleButton) return

        const selected = toggleButton.id
        if(selected===this.activeToggle) return
        

        this.activeToggle = selected
        this.updateUI()
        this.onChange(this.activeToggle)
    }

    updateUI(){
        const buttons = this.container.querySelectorAll('button')
        buttons.forEach(btn=>{
            if(btn.id===this.activeToggle){
                btn.setAttribute('data-active', 'isActive')
            }else{
                btn.removeAttribute('data-active')
            }
        })
    }
}
