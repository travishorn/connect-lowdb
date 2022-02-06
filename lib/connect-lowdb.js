const lowdbStore = (session) => {
  const Store = session.Store;

  class LowdbStore extends Store {
    constructor(options = {}) {
      super(options);

      if (!options.db) {
        throw new Error("A db must be directly provided to the LowdbStore");
      }
      
      this.db = options.db;
    }

    async get(sid, cb) {
      await this.db.read();

      this.db.data.sessions ||= [];

      const dbSession = this.db.data.sessions
        .find(session => session.sid === sid);

      cb(null, dbSession ? dbSession.session : null);
    }

    async set(sid, session, cb) {
      await this.db.read();

      this.db.data.sessions ||= [];

      const sessionObj = {
        sid,
        session,
      };
      
      const dbSession = this.db.data.sessions
        .find(session => session.sid === sid);

      if (dbSession) {
        const dbSessionIx = this.db.data.sessions
          .findIndex(session => session.sid === sid);

        this.db.data.sessions[dbSessionIx] = sessionObj;
      } else {
        this.db.data.sessions.push(sessionObj);
      }

      await this.db.write();
      cb(null);
    }

    async destroy(sid, cb) {
      await this.db.read();

      this.db.data.sessions ||= [];

      const dbSessionIx = this.db.data.sessions
        .findIndex(session => session.sid === sid);

      this.db.data.sessions.splice(dbSessionIx, 1);
      
      await this.db.write();
      cb(null);
    }
  }

  return LowdbStore;
}

export default lowdbStore;
