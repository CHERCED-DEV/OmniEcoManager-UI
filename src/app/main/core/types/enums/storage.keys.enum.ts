export enum StorageApiKeys {
    BLOG = 'blog',
    ECO = 'eco',
    COMMON = 'common',
    INFO = 'info',
    MEMBERS = 'members'
}
export enum StorageServiceKey {
    CULTURE= 'culture'
}
export interface GenericCultureNode<T> {
    [key: string]: T;
}

export type StorageMethodRes = 'getSessionStorage' | 'getLocalStorage';
export type StorageMethodReq = 'setSessionStorage' | 'setLocalStorage';