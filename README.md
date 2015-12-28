Redux History
=============

Connect the [history api](https://github.com/rackt/history) to redux.  Redux History lets you sync redux with rackt history, giving you access to the current [location object](https://github.com/rackt/history/blob/master/docs/Location.md) in your reducers, optionally including [URL queries](https://github.com/rackt/history/blob/master/docs/QuerySupport.md).  It's meant to be a dead simple enhancement for redux, it will also work nicely with react-router.

## Installation

```
npm install --save redux-history
```

To enable Redux History, use `connectHistory()`:

```js
import { connectHistory } from 'redux-history'; 
import { createHistory, useQueries } from 'history';

const history = useQueries(createHistory)();
 
const unconnect = connectHistory(store, history);

```

## Usage

```js

// examples with:
// with history.push, history.replace
// with custom actions, custom reducers
// with react-router

```

## License

MIT
