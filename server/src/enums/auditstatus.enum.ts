export enum AuditStatus {
    PENDING = 'pending',//待审核
    PUBLISHED = 'published',//审核通过
    REJECTED = 'rejected',//审核不通过
    WITHDRAWN = 'withdrawn',//审核后撤回
}