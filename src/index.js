const UPDATE_LOCATION = 'UPDATE_LOCATION';
import { createLocation } from 'history';

var initialState = createLocation();

export function locationReducer(state = initialState, action) {
    //needs support for Immutable.js

    if (action.type === UPDATE_LOCATION) {
        return Object.assign({}, state, action.payload)
    }
    return state;

}

export function updateLocation(location) {
    return {
        type: UPDATE_LOCATION,
        payload: createLocation(location)
    }
}

export function connectHistory(store, history) {

    let currentKey;

    function createUniqueKey(location){
      //needs to account for location.state
      return history.createPath(location);
    }

    const unlisten = history.listen(nextLocation => {
      
      const { location } = store.getState();//needs support for state selection
      let key = createUniqueKey(location);
      currentKey = createUniqueKey(nextLocation);

      if (key != currentKey) {
        store.dispatch(updateLocation(nextLocation));
      }
        
    });

    const unsubscribe = store.subscribe(() => {

      const { location } = store.getState();
      let key = createUniqueKey(location);

      if (key !== currentKey) {
        const method = location.action === 'REPLACE' ? 'replace' : 'push';
        history[method](location);
      }

    });
    
    return function unconnectHistory() {
      unlisten();
      unsubscribe();
    };

}
