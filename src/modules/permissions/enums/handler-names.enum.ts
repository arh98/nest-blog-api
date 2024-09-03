export enum CommonHandlers {
    FindOne = 'findOne',
    FindAll = 'findAll',
    Create = 'create',
    Update = 'update',
    Remove = 'remove',
}

export enum SpecificHandlers {
    GetUserProfile = 'getUserProfile',
    PublishPost = 'publishPost',
    ApproveMultiple = 'approveMultiple',
    UploadFile = 'uploadFile',
    CreateMultipleUsers = 'createMany',
    Sync = 'syncPermissions',
    FindUnpublished = 'findUnpublished',
    UpdatePostStatus = 'updatePostStatus',
}
