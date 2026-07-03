'use client'

import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, FileText, X } from 'lucide-react'

interface PDFDownloadProps {
  document: React.ReactElement
  fileName: string
  children: React.ReactNode | (({ loading }: { loading: boolean }) => React.ReactNode)
  className?: string
}

export function PDFDownloadLink({ document, fileName, children, className }: PDFDownloadProps) {
  const [loading, setLoading] = useState(false)
  const [showNotif, setShowNotif] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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
      
      setShowNotif(true)
      setTimeout(() => setShowNotif(false), 4500)
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
    <>
      <div onClick={handleDownload} className={className} style={{ cursor: 'pointer' }}>
        {childNode}
      </div>
      {mounted && createPortal(
        <AnimatePresence>
          {showNotif && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-[9999] bg-slate-900 border border-emerald-500/30 shadow-[0_10px_40px_rgba(16,185,129,0.2)] rounded-2xl p-4 pr-12 flex items-center gap-4 max-w-sm"
            >
              <div className="bg-emerald-500/20 text-emerald-400 p-2.5 rounded-xl shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-slate-100 font-bold text-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Download Berhasil
                </h4>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                  Dokumen <strong className="text-slate-300">{fileName}</strong> telah berhasil disimpan ke perangkat Anda.
                </p>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); setShowNotif(false); }}
                className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
