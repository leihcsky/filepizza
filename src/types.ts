import type { DataConnection } from 'peerjs'

export type UploadedFile = File & { entryFullPath?: string }

export enum UploaderConnectionStatus {
  Pending = '待命',
  Ready = '准备就绪',
  Paused = '暂停',
  Uploading = '上传中',
  Done = '完成',
  Authenticating = '验证中',
  InvalidPassword = '密码错误',
  Closed = '关闭',
}

export type UploaderConnection = {
  status: UploaderConnectionStatus
  dataConnection: DataConnection
  browserName?: string
  browserVersion?: string
  osName?: string
  osVersion?: string
  mobileVendor?: string
  mobileModel?: string
  uploadingFileName?: string
  uploadingOffset?: number
  completedFiles: number
  totalFiles: number
  currentFileProgress: number
}
