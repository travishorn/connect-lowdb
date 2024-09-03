import expressSession from "express-session";
import { Low } from "lowdb";

declare namespace connectLowdb {
    export type LowdbStoreOptions = {
        db: Low<any>;
    } & Partial<expressSession.SessionOptions>;

    export class LowdbStore extends expressSession.Store {
        constructor(options?: LowdbStoreOptions);
        db: Low<any>;

        get(sid: string, callback: (err: any, expressSession?: expressSession.SessionData | null) => any): void;
        set(sid: string, expressSession: expressSession.Session, callback: (err: any) => any): void;
        destroy(sid: string, callback: (err: any) => any): void;
        touch(sid: string, expressSession: expressSession.SessionData, callback: () => void): void;
        all(callback: (err: any, obj: expressSession.SessionData[]) => any): void;
        clear(callback: (err: any) => any): void;
        length(callback: (err: any, length: number) => any): void;
    }
}

declare function connectLowdb(session: typeof expressSession): typeof connectLowdb.LowdbStore;

export = connectLowdb;