'use client'

import { JSX } from 'react'
import { useWebRTCPeer } from './WebRTCProvider'
import { useCallback, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import CancelButton from './CancelButton'

export default function ReportTermsViolationButton({
  uploaderPeerID,
  slug,
}: {
  uploaderPeerID: string
  slug: string
}): JSX.Element {
  const { peer } = useWebRTCPeer()
  const [showModal, setShowModal] = useState(false)
  const [isReporting, setIsReporting] = useState(false)

  const reportMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/destroy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      })
      if (!response.ok) {
        throw new Error('Failed to report violation')
      }
      return response.json()
    },
  })

  const handleReport = useCallback(() => {
    try {
      // Destroy the channel so no further downloads can be made.
      setIsReporting(true)
      reportMutation.mutate()

      // Send a report message to the uploader to hard-redirect them to the reported page.
      // The uploader will broadcast a report message to all connections, which will hard-redirect all downloaders to the reported page.
      const conn = peer.connect(uploaderPeerID, {
        metadata: { type: 'report' },
      })

      // Set a timeout to redirect after 2 seconds even if connection doesn't open
      const timeout = setTimeout(() => {
        conn.close()
        window.location.href = '/reported'
      }, 2000)

      conn.on('open', () => {
        clearTimeout(timeout)
        conn.close()
        window.location.href = '/reported'
      })
    } catch (error) {
      console.error('Failed to report violation', error)
      setIsReporting(false)
    }
  }, [peer, uploaderPeerID])

  return (
    <>
      <div className="flex justify-center">
        <button
          onClick={() => setShowModal(true)}
          className="text-sm text-red-600 dark:text-red-400 hover:underline transition-colors duration-200"
          aria-label="Report terms violation"
        >
          举报可疑的投递 &raquo;
        </button>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg p-8 max-w-md w-full shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              id="modal-title"
              className="text-xl font-bold mb-4 text-stone-900 dark:text-stone-50"
            >
              发现可疑的投递？
            </h2>

            <div className="space-y-4 text-stone-700 dark:text-stone-300">
              <p>
                在举报此次投递之前，请仔细阅读 FileSou 条款：
              </p>

              <ul className="list-none space-y-3">
                <li className="flex items-start gap-3 px-4 py-2 rounded-lg bg-stone-100 dark:bg-stone-800">
                  <span className="text-base">✅</span>
                  <span className="text-sm">
                    只能上传你有权分享的文件
                  </span>
                </li>
                <li className="flex items-start gap-3 px-4 py-2 rounded-lg bg-stone-100 dark:bg-stone-800">
                  <span className="text-base">🔒</span>
                  <span className="text-sm">
                    分享下载链接时，请只与知晓的收件人分享
                  </span>
                </li>
                <li className="flex items-start gap-3 px-4 py-2 rounded-lg bg-stone-100 dark:bg-stone-800">
                  <span className="text-base">⚠️</span>
                  <span className="text-sm">
                    请勿上传任何违反法律或有害内容
                  </span>
                </li>
              </ul>

              <p>
                如果您发现了违反这些条款的行为，请点击“举报”以中止该次传送。
              </p>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <CancelButton onClick={() => setShowModal(false)} />
              <button
                disabled={isReporting}
                onClick={handleReport}
                className={`px-4 py-2 bg-gradient-to-b from-red-500 to-red-600 text-white rounded-md border border-red-600 shadow-sm text-shadow disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:from-red-500 enabled:hover:to-red-700 enabled:hover:shadow-md transition-all duration-200`}
                aria-label="Confirm report"
              >
                {isReporting ? '举报中...' : '举报'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
