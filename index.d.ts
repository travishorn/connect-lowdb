import session from "express-session";
import { Low } from "lowdb";

declare module "connect-lowdb" {
    export type LowdbStoreOptions = {
        db: Low;
    } & session.SessionOptions;

    export class LowdbStore extends session.Store {
        constructor(options?: LowdbStoreOptions);
        db: Low;

        get(sid: string, cb: (err: any, session?: session.SessionData | null) => any): void;
        set(sid: string, session: session.Session, cb: (err: any) => any): void;
        destroy(sid: string, cb: (err: any) => any): void;
        touch(sid: string, session: session.SessionData, cb: (err: any) => any): void;
        all(cb: (err: any, obj: session.SessionData[]) => any): void;
        clear(cb: (err: any) => any): void;
        length(cb: (err: any, length: number) => any): void;
    }

    const lowdbStore = (session: session.Session) => LowdbStore;
    export default lowdbStore;
}