export class ValidateWrapper{
    /**
     * Resolves a DOM element for a component
     * @param {string} wrapper - the ID of the element
     * @param {string} componentName - name of the component for better error messages
     * @param {string} customId - will create a new div if wrapper not found
     */
    constructor({wrapper,componentName,customId=''}){
        if(typeof wrapper ==='string'){
            wrapper = document.getElementById(wrapper)
        }

        // Optionally create the container if missing
        if(!wrapper && customId !== ''){
            wrapper = document.createElement('div')
            wrapper.id = customId + '-container'
            document.body.appendChild(wrapper)
            console.warn(`[ValidateWrapper] ${componentName} wrapper was missing. Created a new container: ${wrapper.id}`)
        }

        
        if(!(wrapper instanceof HTMLElement)){
            throw new Error(`[ValidateWrapper] ${componentName}: wrapper element not found or invalid`)
        }

        this.wrapper = wrapper

    }
     getWrapper(){
        return this.wrapper
     }
}

// @TODO: Add documentation
export function capitalizeWord(word){
    return word[0].toUpperCase() + word.slice(1)
}