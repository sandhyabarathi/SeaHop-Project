import React from 'react'
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { processPayment } from '../../Store/Payment/payment-actions'
import '../../CSS/MyBookings.css'

const Payment = () => {
    const stripe = useStripe()
    const elements = useElements()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {bookingId, propertyId} = useParams()

    const {isAuthenticated} = useSelector((state) => state.user)
    const {checkinDate, checkoutDate, totalPrice, propertyName, address, maximumGuest, nights} = useSelector((state) => state.payment.paymentDetails)
    
    const paymentHandler = processPayment( {
        totalAmount:totalPrice,
        stripe, elements, checkinDate, checkoutDate, propertyName, address, maximumGuest, nights, bookingId, propertyId, dispatch, navigate
    })

  return (
    <div className='row wrapper'>
        <div className='col-10 col-lg-5'>
            {isAuthenticated ? (
                <form className='shadow-lg' onSubmit={paymentHandler}>
                    <div className='form-group'>
                        <label htmlFor='card_num_field'>Card number</label>
                        <CardNumberElement type='text' id='car_num_field' className='form-control' options={{}}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='card_exp_field'>Expiry Date</label>
                        <CardExpiryElement type='text' id='car_exp_field' className='form-control' options={{}}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='card_cvc_field'>CVC </label>
                        <CardCvcElement type='text' id='car_cvc_field' className='form-control' options={{}}/>
                    </div>
                    <button type='submit' className='paymentbtn'>Pay -&#8377; {totalPrice}</button>
                </form>
            ):(
                <div>{navigate("/login")}</div>
            )}
        </div>
    </div>
  )
}

export default Payment