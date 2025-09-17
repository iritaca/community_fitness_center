/**
 * Simple Observable
 * Allows other code to subscribe to events and be notified when data changes
 */
export class Observable{
    constructor(){
        /**
         * @type {Function[]} - list of subscriber callback functions
         */
        this.observers=[]
    }

    /**
     * Rgisters a new observer callback
     * @param {Function} callback - callback function to call on notify
     */
    subscribe(callback){
        this.observers.push(callback)
    }

    /**
     * Notify all subscribers with given data
     * @param {*} data - any data to send to observers
     */
    notify(data){
        this.observers.forEach(fn=>fn(data))
    }
}