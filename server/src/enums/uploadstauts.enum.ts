export enum UploadStatus {
    PENDING = 'waiting',//等待上传
    PUBLISHED = 'uploading',//上传中
    REJECTED = 'fail',//上传失败
    WITHDRAWN = 'success',//上传成功
}