import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authslice from './slice/authslice';
import cartslice from './slice/cartslice';
import filterslice from './slice/filterslice';
import orderslice from './slice/orderslice';
import bookingslice from './slice/bookingslice';
import favouritslice from './slice/favouritslice';
import serviceslice from './slice/serviceslice';
import notificationlice from './slice/notificationslice'
import carslice from './slice/carsslice';
import accessorieslice from './slice/accessoriesslice';
const rootreducer = combineReducers({
    auth: authslice.reducer,
    cart: cartslice.reducer,
    cars: carslice.reducer,
    accessories: accessorieslice.reducer,
    service: serviceslice.reducer,
    order: orderslice.reducer,
    filter: filterslice.reducer,
    booking: bookingslice.reducer,
    favourit: favouritslice.reducer,
    notification: notificationlice.reducer
});
const store = configureStore({
    reducer: rootreducer
})
export default store;