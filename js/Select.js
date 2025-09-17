import { Observable } from './Observable.js'
import { capitalizeWord, ValidateWrapper } from './utils.js'

/**
 * Base Select component
 * - Wraps an input or a select with a label
 * 
 * @param {string} label - Text for the label above the input/select
 * @param {string} wrapper - DOM element ID where this component will be attached
 * @param {string} id - attribute for internal input/select
 */
class Select{
    constructor({label,wrapper,id}){
        this.wrapper = new ValidateWrapper({wrapper,componentName:this.constructor.name,customId:id}).getWrapper()

        this.label = label
        this.id = id

        this.observable = new Observable()

        // the container div for the element
        this.container = document.createElement('div')
        this.container.classList.add('select-container')

        // Label element
        this.labelEl = document.createElement('label')
        this.labelEl.classList.add('select-label')
        this.labelEl.textContent = this.label
        this.container.appendChild(this.labelEl)
        this.labelEl.setAttribute('for',id)
        
        this.render()
    }

    /**
     * Suscribe to value changes
     * @param {function} callback - receives the selected data string
     * 
     */
    subscribe(callback){
        this.observable.subscribe(callback)
    }

    notify(value){
        this.observable.notify(value)
    }

    bindWithObservable(el,event,extraFn){
        if(!el) return
        el.addEventListener(event, ()=>{
            extraFn?.()
            if(el.value) this.notify(el.value)
        })
    }

    render(){
        this.wrapper.appendChild(this.container)
        return this.container
    }

    setIsVisible(isVisible){
        this.container.classList.toggle('hide', !isVisible)
    }
}

/**
 * DropdownSelect extends Select
 * Renders a <select> element with options
 * Supports: alphabetical sorting and a default option at the top
 * 
 * @param {string} label - label text
 * @param {string} wrapper - the container ID
 * @param {string} id - Select ID
 * @param {string[]} options - Array of string options
 * @param {string} defaultOption - Optional string shown at top
 * @param {boolean} autoSort - Sort options alphabetically
 */
export class DropdownSelect extends Select{
    constructor({label,wrapper,options=[],id,defaultOption, autoSort=true}){
        super({label,wrapper,id})
        this.options=options
        this.selectEl = document.createElement('select')
        this.selectEl.setAttribute('id',id)

        // Sort options if requested
        let orderedOptions = autoSort ? [...options].sort((a,b)=>a.localeCompare(b)) : [...options]
        // Adds default option at the top
        if(defaultOption){
            orderedOptions.unshift(defaultOption)
        }

        // Populate <select>
        orderedOptions.forEach(option=>{
            const optionEl = document.createElement('option')
            optionEl.value=option
            optionEl.textContent=capitalizeWord(option)
            this.selectEl.appendChild(optionEl)
        })

        this.container.appendChild(this.selectEl)

        this.bindWithObservable(this.selectEl,'change')
    }

}

/**
 * DateSelect extended from Select
 * Renders a native <input type='date'> with a custom placeholder overlay
 * Fires observable events on value changes
 * 
 * @param {string} label - Label text
 * @param {string} wrapper - Container ID
 * @param {string} id - Input ID
 */
export class DateSelect extends Select{
    constructor({label,wrapper,id}){
        super({label,wrapper,id})
        this.inputEl = document.createElement('input')
        this.inputEl.setAttribute('id',id)
        this.inputEl.type='date'
        this.container.appendChild(this.inputEl)

        // Placeholder overlay
        this.placeholderEl = document.createElement('div')
        this.placeholderEl.textContent= 'Present day'
        this.placeholderEl.classList.add('date-placeholder')
        this.container.appendChild(this.placeholderEl)

        // Event listeners
        this.inputEl.addEventListener('focus',this.updatePlaceholder.bind(this))

        this.inputEl.addEventListener('blur',()=>{
            if(!this.inputEl.value)
            this.updatePlaceholder()})

        this.bindWithObservable(this.inputEl,'input',()=>{this.updatePlaceholder()})
    }
    // Updates the visibility of the placeholder based on the input
    updatePlaceholder(){
        const isEmpty = !this.inputEl.value
        this.placeholderEl.classList.toggle('hide', !isEmpty)
    }

    /**
     * Suscribe the date programatically
     * @param {string} dateString - format YY-MM-DD
     * 
     */
    setValue(dateString){
         this.inputEl.value = dateString
    }

}