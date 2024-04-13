import { GenericData } from "./helpers-data-types.interface";

export interface GenericStorageContent<T> {
    [key: string]: GenericData<T>;
}

export type StorageMethodRes = 'getSessionStorage' | 'getLocalStorage';
export type StorageMethodReq = 'setSessionStorage' | 'setLocalStorage';