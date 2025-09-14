import { ValidateWrapper } from './utils.js'
class Select{
    constructor({label,wrapper,id}){
        this.wrapper = new ValidateWrapper({wrapper,componentName:this.constructor.name,customId:id}).getWrapper()

        this.label = label
        this.id = id


        this.container = document.createElement('div')
        this.container.classList.add('select-container')

        this.labelEl = document.createElement('label')
        this.labelEl.textContent = this.label
        this.container.appendChild(this.labelEl)
        this.labelEl.setAttribute('for',id)

        this.wrapper.appendChild(this.container)
    }

    render(){
        return this.container
    }

    setIsVisible(isVisible){
        this.container.style.display = isVisible?'flex':'none'
    }
}

export class DropdownSelect extends Select{
    constructor({label,wrapper,options=[],id,defaultOption, autoSort=true}){
        super({label,wrapper,id})
        this.options=options
        this.selectEl = document.createElement('select')
        this.selectEl.setAttribute('id',id)

        // handle sorting if needed
        let orderedOptions = autoSort ? [...options].sort((a,b)=>a.localeCompare(b)) : [...options]
        // Adds default option at the top
        if(defaultOption){
            orderedOptions.unshift(defaultOption)
        }

        orderedOptions.forEach(option=>{
            const optionEl = document.createElement('option')
            optionEl.value=option
            optionEl.textContent=option
            this.selectEl.appendChild(optionEl)
        })

        this.container.appendChild(this.selectEl)
    }

}

export class DateSelect extends Select{
    constructor({label,wrapper,id}){
        super({label,wrapper,id})
        this.inputEl = document.createElement('input')
        this.inputEl.setAttribute('id',id)
        this.inputEl.type='date'
        this.container.appendChild(this.inputEl)
    }
}