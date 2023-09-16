import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

export default function persist(reducers) {
    const persistReducers = persistReducer(
        {
            key: 'SNAKE',
            storage,
            whitelist: ['score']
        },
        reducers
    )

    return persistReducers
}