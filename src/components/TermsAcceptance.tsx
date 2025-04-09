'use client'

import { JSX, useState } from 'react'
import CancelButton from './CancelButton'

export default function TermsAcceptance(): JSX.Element {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className="flex justify-center">
        <span className="text-xs text-stone-600 dark:text-stone-400">
          选择文件, 您将同意这些{' '}
          <button
            onClick={() => setShowModal(true)}
            className="underline hover:text-stone-900 dark:hover:text-stone-200 transition-colors duration-200"
            aria-label="View upload terms"
          >
          条款
          </button>
          .
        </span>
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
              条款
            </h2>

            <div className="space-y-4 text-stone-700 dark:text-stone-300">
              <ul className="list-none space-y-3">
                <li className="flex items-start gap-3 px-4 py-2 rounded-lg bg-stone-100 dark:bg-stone-800">
                  <span className="text-base">📤</span>
                  <span className="text-sm">
                    文件会直接在浏览器之间共享 — 没有服务器存储
                  </span>
                </li>
                <li className="flex items-start gap-3 px-4 py-2 rounded-lg bg-stone-100 dark:bg-stone-800">
                  <span className="text-base">✅</span>
                  <span className="text-sm">
                    只上传你有权分享的文件
                  </span>
                </li>
                <li className="flex items-start gap-3 px-4 py-2 rounded-lg bg-stone-100 dark:bg-stone-800">
                  <span className="text-base">🔒</span>
                  <span className="text-sm">
                    分享下载链接只给已知的接收者
                  </span>
                </li>
                <li className="flex items-start gap-3 px-4 py-2 rounded-lg bg-stone-100 dark:bg-stone-800">
                  <span className="text-base">⚠️</span>
                  <span className="text-sm">
                    只允许上传没有违法或无害内容
                  </span>
                </li>
              </ul>

              <p className="text-sm italic">
                通过上传文件，您确认您理解并同意这些条款。
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <CancelButton
                text="知道了!"
                onClick={() => setShowModal(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
