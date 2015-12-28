# basic

import { connectHistory } from 'redux-history';
import { createHistory } from 'history';

const history = createHistory();
connectHistory(store, history);

