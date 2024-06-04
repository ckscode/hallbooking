import express from 'express';
import { bookRoom, createRoom, getBookedRooms, getBookings, getCustomers, rooms, timesBooked} from '../Controllers/Controllers.js';

const router = express.Router();

router.get('/getRooms',rooms);
router.post('/createRoom',createRoom);
router.post('/bookRoom',bookRoom);
router.get('/getBookings',getBookings);
router.get('/getBookedRooms',getBookedRooms);
router.get('/getCustomers',getCustomers);
router.get('/getTimesBooked/:name',timesBooked);


export default router;