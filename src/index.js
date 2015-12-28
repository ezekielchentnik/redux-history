const CHANGE_LOCATION = 'CHANGE_LOCATION';
import { createLocation } from 'history';

var initialState = createLocation();

export function location(state = initialState, action) {

    if (action.type === CHANGE_LOCATION) {
        return Object.assign({}, state, action.payload)
    }
    return state;

}

export function changeLocation(location) {
    return {
        type: CHANGE_LOCATION,
        payload: createLocation(location)
    }
}

export function connectHistory(store, history) {

    let currentKey;

    function createUniqueKey(location){//needs to account for location.state
      return history.createPath(location);
    }

    const unlisten = history.listen(nextLocation => {
      
      const { location } = store.getState();
      let key = createUniqueKey(location);
      currentKey = createUniqueKey(nextLocation);
      if (key != currentKey) {
        store.dispatch(changeLocation(nextLocation));
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
    
    return function() {
      unlisten();
      unsubscribe();
    };

}
