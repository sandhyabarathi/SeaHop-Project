import axios from 'axios'
import { addBooking, setBookings, setBookingDetails } from './booking-slice'

export const createBooking = (bookingDate) => async (dispatch) => {
    try
    {
        const response = await axios.post('/api/v1/rent/user/booking/new', bookingDate)
        dispatch(addBooking(response.data.data.booking))
    }
    catch(error)
    {
        console.error("Error in booking",error)
    }
}

export const fetchBookingDetails = (bookingId) => async (dispatch) => {
    try
    {
        const response = await axios.get(`/api/v1/rent/user/booking/${bookingId}`)
        dispatch(setBookingDetails(response.data.data))
    }
    catch(error)
    {
        console.error("Error fetchin booking details", error)
    }
}

export const fetchUserBookings = () => async(dispatch) => {
    try
    {
        const response  = await axios.get('/api/v1/rent/user/booking')
        dispatch(setBookings(response.data.data.bookings))
    }
    catch(error)
    {
        console.error("Error fecthing bookings:", error)
    }
}