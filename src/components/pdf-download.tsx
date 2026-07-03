'use client'

import React, { useState } from 'react'

interface PDFDownloadProps {
  document: React.ReactElement
  fileName: string
  children: React.ReactNode | (({ loading }: { loading: boolean }) => React.ReactNode)
  className?: string
}

export function PDFDownloadLink({ document, fileName, children, className }: PDFDownloadProps) {
  const [loading, setLoading] = useState(false)

  const handleDownload = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    if (loading) return
    
    setLoading(true)
    try {
      const { pdf } = await import('@react-pdf/renderer')
      const blob = await pdf(document as any).toBlob()
      const url = URL.createObjectURL(blob)
      const link = window.document.createElement('a')
      link.href = url
      link.download = fileName
      link.click()
      setTimeout(() => URL.revokeObjectURL(url), 1000)
    } catch (error) {
      console.error('Error generating PDF:', error)
    } finally {
      setLoading(false)
    }
  }

  const childNode = typeof children === 'function' ? children({ loading }) : children

  if (React.isValidElement(childNode)) {
    return React.cloneElement(childNode as React.ReactElement<any>, {
      onClick: (e: any) => {
        if ((childNode as React.ReactElement<any>).props.onClick) {
          (childNode as React.ReactElement<any>).props.onClick(e)
        }
        handleDownload(e)
      }
    })
  }

  return (
    <div onClick={handleDownload} className={className} style={{ cursor: 'pointer' }}>
      {childNode}
    </div>
  )
}
