import { ValidateWrapper } from './utils.js';

// @TODO: Add styles and documentation
export class Footer{
    constructor({links=[]}=[]){
        this.links = links
        this.wrapper = new ValidateWrapper({wrapper:'footer',componentName:this.constructor.name}).getWrapper()
        this.render()
    }
    render(){
        const frag = document.createDocumentFragment()
        const nav = document.createElement('nav')
        const ul = document.createElement('ul')
        ul.classList.add('footer-list')
        for(const {title,link} of this.links){
            const li = document.createElement('li')
            li.classList.add('footer-list-item')
            const a = document.createElement('a')
            a.setAttribute('href',link)
            a.textContent = title
            li.appendChild(a)
            ul.appendChild(li)
        }

        nav.appendChild(ul)
        frag.appendChild(nav)
        this.wrapper.appendChild(frag)
    }
}