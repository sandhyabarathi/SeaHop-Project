import React , {useState,useEffect} from 'react'
import TuneIcon from '@mui/icons-material/Tune';
import FilterModal from './FilterModal';
import {useDispatch} from 'react-redux';
import { getAllProperties } from '../../Store/Property/property-action';
import { propertyAction } from '../../Store/Property/property-slice';


const Filter = () => {
    //State for controlling modal visibility
    const [isModelOpen, setIsModalOpen] = useState(false)
    //state for selecting filters 
    const [selectedFilters, setSelectedFilters] = useState({})

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(propertyAction.updateSearchParams(selectedFilters))
      dispatch(getAllProperties())
    },[selectedFilters, dispatch])
    //function to handle opening the modal/popupWindow
    const handleOpenModal = () =>{
        setIsModalOpen(true) // sets isModalOprn to true to open the modal
    }

    //function to handle closing the modal
    const handleCloseModal = () => 
    {
      setIsModalOpen(false) // sets isModal to false to close the modal
    }

    //function to handle changes in the filters 
    const handleFilterChange = (filterName,value) =>
    {
      //Update the selected filters with the new values
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        [filterName] : value
      }))
    }


  return (
    // fragment tag or empty tag
    <>
    {/* Click event to open the modal */}
     <TuneIcon onClick={handleOpenModal} style={{cursor: 'pointer'}}/>
     {isModelOpen && (
      <FilterModal selectedFilters = {selectedFilters} onFilterChange={handleFilterChange} onClose={handleCloseModal}/>
     )}
    </>
  )
}

export default Filter