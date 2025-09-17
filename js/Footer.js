import { ValidateWrapper } from './utils.js';

/** Footer
 * -------
 * Renders a footer navigation with links
 * {only for presentation}
 * @param {Object} props
 * @param {Array} - Linsk to display
 */
export class Footer{
    constructor({links=[]}=[]){
        this.links = links
        this.wrapper = new ValidateWrapper({wrapper:'footer',componentName:this.constructor.name}).getWrapper()
        this.render()
    }
    // Creates a <li><a> element for footer link
    createLinkElement(title){
        const li = document.createElement('li')
            li.classList.add('footer-list-item')
            const a = document.createElement('a')
            a.setAttribute('href','#')
            a.textContent = title
            a.addEventListener('click',e=>e.preventDefault())
            li.appendChild(a)
            return li
    }

    render(){
        const nav = document.createElement('nav')
        const ul = document.createElement('ul')
        ul.classList.add('footer-list')
        for(const {title} of this.links){
            ul.appendChild(this.createLinkElement(title))
        }
        nav.appendChild(ul)
        this.wrapper.appendChild(nav)
    }
}