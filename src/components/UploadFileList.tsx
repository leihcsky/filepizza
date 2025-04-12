import React, { JSX } from 'react'
import TypeBadge from './TypeBadge'

type UploadedFileLike = {
  fileName?: string
  type: string
  size?: number
}

export default function UploadFileList({
  files,
  onRemove,
}: {
  files: UploadedFileLike[]
  onRemove?: (index: number) => void
}): JSX.Element {
  const items = files.map((f: UploadedFileLike, i: number) => (
    <div
      key={f.fileName}
      className={`w-full border-b border-stone-300 dark:border-stone-700 last:border-0`}
    >
      <div className="flex justify-between items-center py-2 pl-3 pr-2">
        <p className="truncate text-sm font-medium text-stone-800 dark:text-stone-200">
          {f.fileName}
          <span className="text-stone-500 dark:text-stone-400 ml-2 text-xs font-normal">
            {formatFileSize(f.size || 0)}
          </span>
        </p>
        <div className="flex items-center">
          <TypeBadge type={f.type} />
          {onRemove && (
            <button
              onClick={() => onRemove?.(i)}
              className="text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200 focus:outline-none pl-3 pr-1"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  ))

  return (
    <div className="w-full border border-stone-300 dark:border-stone-700 rounded-md shadow-sm dark:shadow-sm-dark bg-white dark:bg-stone-800">
      {items}
      <div className="border-t border-stone-300 dark:border-stone-700 p-3 text-sm font-medium text-stone-800 dark:text-stone-200 bg-stone-50 dark:bg-stone-800/50">
        <div className="flex justify-between items-center">
          <span>总文件大小：</span>
          <span>{formatFileSize(files.reduce((sum, f) => sum + (f.size || 0), 0))}</span>
        </div>
      </div>
    </div>
  )
}

function formatFileSize(bytes: number): string {
  console.log("文件大小："+bytes);
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
