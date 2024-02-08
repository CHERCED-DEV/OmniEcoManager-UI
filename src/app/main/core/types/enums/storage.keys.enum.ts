export enum StorageApiKeys {
    COMMON= 'common',
}
export enum StorageServiceKey {
    CULTURE= 'culture'
}

export type StorageMethodRes = 'getSessionStorage' | 'getLocalStorage';
export type StorageMethodReq = 'setSessionStorage' | 'setLocalStorage';