import { ITwitterData } from '../twitter-stream/interfaces/ITwitterData';
import { ADD_TWITTERDATA, REMOVE_TWITTERDATA } from './actions';

// twitterData: An array of type ITwitterData to contain all of our twitter items
// lastUpdate: Date type to contain the information when the ITwitterData array has been updated
export interface IAppState {
    twitterData: ITwitterData[];
    lastUpdate: Date;
}

// INITIAL_STATE is implementing the interface IAppState and initializing the properties
export const INITIAL_STATE: IAppState = {
    twitterData: [],
    lastUpdate: null
}

// every reducer function rootReducer takes two parameters: state and action. 
// state: is the previous state of the application
// action: is an object describing the change which has been dispatched. 

// ADD_TWITTERDATA:
// case uses the new  object which is available in action.twitter and  creates a 
// new state object in which the twitter array is extended with that new twitter element. 
// To create a new state object the Object.assign method is used

// REMOVE_TWITTERDATA:
// An action is handled which is returning a new state where a specific twitter entry
// has been removed from the previous state’s twitter array.
export function rootReducer(state: IAppState, action: any): IAppState {
    switch (action.type) {
        case ADD_TWITTERDATA:
            action.twitter.date = state.twitterData.length + 1;    
            return Object.assign({}, state, {
                twitter: state.twitterData.concat(Object.assign({}, action.twitter)),
                lastUpdate: new Date()
            })
        
        case REMOVE_TWITTERDATA:
            return Object.assign({}, state, {
                twitter: state.twitterData.filter(t => t.date !== action.date),
                lastUpdate: new Date()
            })
    }
    return state;
}