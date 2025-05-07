import React, { useEffect, useState } from 'react'
import PayQrImage from './PayQrImage'
import PayQrData from './PayQrData';

export default function PayContent({ onAmountValid }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const [isLoadingData, setIsLoadingData] = useState(false);
  const [showDataQr, setShowDataQr] = useState(false);
  const [qrData, setQrData] = useState(null);

  // useEffect(() => {
  //   if (selectedImage) {
  //     setTimeout(() => {
  //       setIsLoadingData(false)
  //       setShowDataQr(true)
  //     }, 2000);
  //   }
  // }, [selectedImage])

  return (
    <>
      {!showDataQr
        ? <PayQrImage
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          isLoadingData={isLoadingData}
          setIsLoadingData={setIsLoadingData}
          setQrData={setQrData}
          setShowDataQr={setShowDataQr}
        />
        : <PayQrData qrData={qrData} onAmountValid={onAmountValid} />
      }
    </>
  )
}