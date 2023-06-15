import React from 'react'

import WebView from 'react-native-webview'

export default function PdfReaderDownload({ url: uri }) {
  return (
    <WebView style={{ flex: 1 }} source={{ uri }} />
  )
}
