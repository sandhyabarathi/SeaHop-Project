import React,{useState} from 'react'
import {DatePicker, Space} from 'antd';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import { getAllProperties } from '../../Store/Property/property-action';
import { propertyAction } from '../../Store/Property/property-slice';



const Search = () => {
    const {RangePicker} = DatePicker;
    const [keyword, setKeyword] = useState({});
    //storing the date range value

    const [value, setValue] = useState([]);

    const dispatch = useDispatch();
    function searchHandler(e){
      e.preventDefault();
      dispatch(propertyAction.updateSearchParams(keyword))
      dispatch(getAllProperties())
      setKeyword({
        city:"",
        guests:"",
        dateIn:"",
        dateOut:"",
      })
      setValue([])
    }
    
    function returnDates(date,dateString) 
    {
      //setting the date range value in state
      setValue([date[0],date[1]])  
      //updating keyword object with date range range
      updateKeyword("dateIn",dateString[0])
      updateKeyword("dateOut",dateString[1]);
    }

    //function to update a specific field in the keyword state object
    const updateKeyword = (field, value)=> {
      setKeyword((prevKeyword) => ({
        ...prevKeyword,
        [field]:value,
      }))
    }
  return <>
    <div className='searchbar'>
      {/*Input field for searching destinations */}
        <input className='search' id='search_destination' placeholder='Search destinations' type='text' value={keyword.city} onChange={(e) => updateKeyword("city", e.target.value)}/>
        {/* Date Range Picker */}
        <Space direction='vertical' size={12} className='search'>
          <RangePicker value={value} format='YYYY-MM-DD' picker='date' className='date_picker' disabledDate={(current)=>{
            return current && current.isBefore(Date.now(),"day")
          }} onChange={ returnDates }/>
        </Space>
        <input className='search' id='addguest' placeholder='Add guest' type='number' onChange={(e) => updateKeyword("guests", e.target.value)}/>
        {/*Search text*/}
        {/* <span class='material-symbols-outlined'>search</span> */}
        <SearchIcon style={{cursor: 'pointer'}}  onClick={searchHandler} />
    </div>
    </>
  
}

export default Search