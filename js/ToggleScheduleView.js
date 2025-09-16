import { Observable } from './Observable.js' 
import { capitalizeWord, ValidateWrapper } from './utils.js'

/** Toggle schedule view
 *  --------------------
 * A toggle component to switch between different schedule views (daily/weekly)
 * Extends Observable to notify subscribers when the active toggle changes.
 * 
 * Features
 * - Dynamically creates buttons from provided array
 * - Manages active state and UI updates
 * - Emits events to observers
 * - Handles accessibility (aria-pressed)
**/
export class ToggleScheduleView extends Observable{
    /**
     * 
     * @param {HTMLElement} container - The container element where the toggle button will be mounted
     * @param {string[]} buttons  - Array of button ids; first element is default active
     */
    constructor({buttons=['daily','weekly'],wrapper}){
        super()// to access Observable constructor
        this.wrapper=new ValidateWrapper({wrapper,componentnName:'week-toggle'}).getWrapper()

        this.buttons = buttons
        this.activeToggle=buttons[0]

        this.createButtons()
        this.init()
    }
    
    /** Creates toggle buttons and appends them to the container */
    createButtons(){
        this.wrapper.innerHTML =''
        this.buttons.forEach(id=>{
            const btn = document.createElement('button')
            btn.id=id
            btn.classList.add('toggle-button')
            btn.setAttribute('aria-pressed','false')
            btn.textContent=capitalizeWord(id) + ' schedule'
            this.wrapper.appendChild(btn)
        })
    }
    /** Sets up event listener for button clicks and updates initial UI */
    init(){
        this.wrapper.addEventListener('click', (e)=> this.handleClick(e))
        this.updateUI()
    }
/** Handles toggle click events
 * @param {MouseEvent} e
 */
    handleClick(e){
        const toggleButton = e.target.closest('button')
        if(!toggleButton) return

        const selected = toggleButton.id
        if(selected===this.activeToggle) return

        this.activeToggle = selected
        this.updateUI()

        // Notify all observers of the change
        this.notify(this.activeToggle)
    }
    /** Updates the UI to reflect the current active toggle and accessibility state */
    updateUI(){
        const buttons = this.wrapper.querySelectorAll('button')
        buttons.forEach(btn=>{
            if(btn.id===this.activeToggle){
                btn.setAttribute('data-active', 'isActive')
                btn.setAttribute('aria-pressed','true')
            }else{
                btn.removeAttribute('data-active')
                btn.setAttribute('aria-pressed','false')
            }
        })
    }
}
