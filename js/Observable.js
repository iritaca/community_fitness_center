export class Observable{
    constructor(){
        this.observers=[]
    }

    // registers the observers
    suscribe(fn){
        this.observers.push(fn)
    }

    notify(data){
        this.observers.forEach(fn=>fn(data))
    }
}