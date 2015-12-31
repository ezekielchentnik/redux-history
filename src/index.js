const UPDATE_LOCATION = 'UPDATE_LOCATION';
import { createLocation } from 'history';

var initialState = createLocation();

export function locationReducer(state = initialState, action) {

    if (action.type === UPDATE_LOCATION) {
        return Object.assign({}, state, action.payload)
    }
    return state;

}

export function updateLocation(location) {
    return {
        type: UPDATE_LOCATION,
        payload: location
    }
}

export function connectHistory(history, store) {

    let currentKey;

    function createUniqueKey(location){
      let key = history.createPath(location);
      return key;
    }

    const unsubscribeHistory = history.listen(nextLocation => {
      
      const { location } = store.getState();
      let key = createUniqueKey(location);
      currentKey = createUniqueKey(nextLocation);

      if (key !== currentKey) {
        store.dispatch(updateLocation(nextLocation));
      }
        
    });

    const unsubscribeStore = store.subscribe(() => {

      const { location } = store.getState();
      let key = createUniqueKey(location);

      if (key !== currentKey) {
        const method = location.action === 'REPLACE' ? 'replace' : 'push';
        history[method](location);
      }

    });
    
    return function unconnectHistory() {
      unsubscribeHistory();
      unsubscribeStore();
    };

}
