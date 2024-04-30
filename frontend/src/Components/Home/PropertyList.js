import React, { useState, useEffect } from 'react'
import {useDispatch , useSelector} from 'react-redux'
import { propertyAction } from '../../Store/Property/property-slice'
import { getAllProperties } from '../../Store/Property/property-action'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import DeckIcon from '@mui/icons-material/Deck';
import {Link} from 'react-router-dom'

const Card = ({id,image,address,price,name}) =>
{
    return(
        <figure className='property'>
            <Link to={`/propertylist/${id}`}>
                <img src={image} alt='Propertyimg'/>
            </Link>
            <h4>{name}</h4>
            <figcaption>
                <main className='propertydetails'>
                    <h5>{name}</h5>
                    <h6>
                        <DeckIcon/> &nbsp; &nbsp;
                        {address}
                    </h6>
                    <p>
                        <span className='price'>&#8377;{price}</span> &nbsp; per night
                    </p>
                </main>
            </figcaption>
        </figure>
    )
}
const PropertyList = () => {
    const [currentPage, setCurrentPage] = useState({page: 1})
    const {properties,totalProperties} = useSelector(
         (state)=>state.properties
    )

    const lastPage = Math.ceil(totalProperties/12);
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchProperties = async (page) => {
            dispatch(propertyAction.updateSearchParams(page))
            dispatch(getAllProperties())
        }

        fetchProperties(currentPage)
    },[currentPage,dispatch])

    return(
        <>
         {properties.length === 0 ? (
            <p className='not_found'>"Property not found......"</p>
        ):(
            <div className='propertylist'>
            {properties.map((property)=>( <Card key={property._id} id={property._id} image={property.images[0].url} name = {property.propertyName} address={`${property.address.city}, ${property.address.state} , ${property.address.pincode}`} price={property.price}/>))}
            </div>
        )}
        {/* Pagination Control */}
        <div className="pagination">
            {/* previous button */}
            <button className="previous_btn" onClick={()=> setCurrentPage((prev) => ({page: prev.page - 1 }))} disabled={currentPage.page===1} >
                <ArrowLeftIcon fontSize='large'/>
            </button>
            {/* Next button */}
            <button className='next_btn' onClick={()=> setCurrentPage((prev) => ({page: prev.page + 1,}))} disabled={properties.length<12 || currentPage.page ===lastPage}>
                <ArrowRightIcon fontSize='large'/>
            </button>
            
        </div>
        </> 
  )
}

export default PropertyList