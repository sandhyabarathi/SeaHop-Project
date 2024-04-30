import React, {useEffect} from 'react'
import { PropTypes } from 'prop-types'
import "../../CSS/Modal.css";
import CloseIcon from '@mui/icons-material/Close';

const Modal = ({images, onClose}) => {
    useEffect(()=>{
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'visisble'
        };
    }, [])

  return (
    <div className='modal-backdrop'>
    <div className='modal-content'>
      <button className='close-button' onClick={onClose}><CloseIcon /></button>
      <div className='modal-image-container'>
        {images.map((image, index) => (
          <img key={index} src={image.url} alt={`${index+1}`}/>
        ))}
      </div>
    </div>
  </div>
  )
}

Modal.propTypes = {
  images: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
    
}

export default Modal