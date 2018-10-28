import {applyMiddleware, createStore} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import rootReducer from 'revolut/reducers';
import rootEpic from 'revolut/epics';

const epicMiddleware = createEpicMiddleware();

function configureStore() {
    const store = createStore(
        rootReducer,
        applyMiddleware(epicMiddleware),
    );

    epicMiddleware.run(rootEpic);

    return store;
}

export const store = configureStore();
