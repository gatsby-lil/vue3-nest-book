// 上传状态
export enum UploadStatus {
  WAITING = 'WAITING', //等待上传
  UPLOADING = 'UPLOADING', //上传中
  FAIL = 'FAIL', //上传失败
  SUCCESS = 'SUCCESS', //上传成功
}

// 审核状态
export enum AuditStatus {
  PENDING = 'pending', //待审核
  PUBLISHED = 'published', //审核通过
  REJECTED = 'rejected', //审核不通过
  WITHDRAWN = 'withdrawn', //审核后撤回
}

export interface IFileWithFileId {
  file: File
  fileId: string
}
