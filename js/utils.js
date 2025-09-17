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

/**
 * Capitalize the first character of a word
 * @param {string} word - The word to capitalize
 * @returns {string} Word with the first letter uppercased
 */
export function capitalizeWord(word){
    if(!word) return ''
    return word[0].toUpperCase() + word.slice(1)
}
/** 
 * Parses a YYYY-MM-DD string into a Date object (local timezone)
 * 
 * @param {string} dateString - Date string in the format "YY-MM-DD"
 * @returns {Date|null} A date object at local midnight, or null 
 * */
export function parseDateStringToDate(dateString) {
        if (!dateString) return null
        const [y, m, d] = dateString.split('-').map(Number)
        return new Date(y, m - 1, d)
}