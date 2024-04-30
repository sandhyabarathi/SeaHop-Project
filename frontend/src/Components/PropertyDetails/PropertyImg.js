import React, { useState } from 'react'
import PhotoAlbumIcon from '@mui/icons-material/PhotoAlbum';
import Modal  from './Modal';


const Propertyimg = ({images}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShowAllPhotos = () =>
  {
    setIsModalOpen(true);
  }
  const handleCloseModal = () => {
    setIsModalOpen(false);
  }
  return (
    <>
    <div className='property-img-container'>
      <div className='img-item first-image'>
        <img className='images' src={images[0].url} alt='property-1'></img>
      </div>
      {/* remaining images */}
      {images.slice(1,5).map((image,index) => (
        <div key={index} className='img-item'>
          <img className='images' src={image.url} alt={`property-${index+2}`}/>
        </div>
      ))}
    </div>

    <div className='similar-photos-container'>
      <button className='similar-photos' onClick={handleShowAllPhotos}><PhotoAlbumIcon/></button>
    </div>

    {isModalOpen && <Modal images={images} onClose={handleCloseModal}/>}
    
    </>
  )
}

export default Propertyimg