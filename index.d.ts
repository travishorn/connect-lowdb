import session from "express-session";
import { Low } from "lowdb";

declare module "connect-lowdb" {
    export type LowdbStoreOptions = {
        db: Low<any>;
    } & Partial<session.SessionOptions>;

    export class LowdbStore extends session.Store {
        constructor(options?: LowdbStoreOptions);
        db: Low<any>;

        get(sid: string, callback: (err: any, session?: session.SessionData | null) => any): void;
        set(sid: string, session: session.Session, callback: (err: any) => any): void;
        destroy(sid: string, callback: (err: any) => any): void;
        touch(sid: string, session: session.SessionData, callback: () => void): void;
        all(callback: (err: any, obj: session.SessionData[]) => any): void;
        clear(callback: (err: any) => any): void;
        length(callback: (err: any, length: number) => any): void;
    }

    const lowdbStore: (session: session) => typeof LowdbStore;

    export default lowdbStore;
}