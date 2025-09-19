import { ACTIVITIES, SELECT_DEFAULT_OPTION } from '../constants.js';

import { ValidateWrapper } from '../utils.js';

/**
 * Activity Description
 * - Show a brief description of a selected activity
 * 
 * DEPENDENCIES:
 *  - ACTIVITIES: constant list of {name,description} pairs
 *  - SELECT_DEFAULT_OPTION: the initial default option
 * 
 * BEHAVIOR
 * 
 * - On each call to `showDescriptionBox`, clears any previous content
 * - Creates and appends a new description box if activity is valid
 * - Renders nothing if the activity is falsy or equals to the default option
 */
export class ActivityDescription  {
    constructor({wrapper}){
        this.wrapper = new ValidateWrapper({wrapper,componentName:this.constructor.name}).getWrapper()

        this.container = null
    }
    /**
     * 
     * @param {string} activity - the activity to look for the description
     */
    showDescriptionBox(activity){
        

        // clear previous
        if(this.container){
            this.wrapper.removeChild(this.container)
            this.container = null
        }

        if(!activity||activity===SELECT_DEFAULT_OPTION) return

        const activityDescription = ACTIVITIES.find(act =>act.name ===activity).description

        this.container = document.createElement('div')
        this.container.classList.add('description')

        const titleEl = document.createElement('p')
        titleEl.classList.add('description-title')
        titleEl.textContent='Description'

        const descriptionEl = document.createElement('p')
        descriptionEl.textContent = activityDescription

        this.container.appendChild(titleEl)
        this.container.appendChild(descriptionEl)

        this.wrapper.appendChild(this.container)
    }
}