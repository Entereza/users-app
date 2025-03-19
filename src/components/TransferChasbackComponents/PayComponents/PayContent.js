import React, { useEffect, useState } from 'react'
import PayQrImage from './PayQrImage'
import PayQrData from './PayQrData';

export default function PayContent() {
  const [selectedImage, setSelectedImage] = useState(null);

  const [isLoadingData, setIsLoadingData] = useState(false);
  const [showDataQr, setShowDataQr] = useState(true);

  useEffect(() => {
    if (selectedImage) {
      setTimeout(() => {
        setIsLoadingData(false)
        setShowDataQr(false)
      }, 2000);
    }
  }, [selectedImage])

  return (
    <>
      {showDataQr
        ? <PayQrImage
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          isLoadingData={isLoadingData}
          setIsLoadingData={setIsLoadingData}
        />
        : <PayQrData />
      }
    </>
  )
}