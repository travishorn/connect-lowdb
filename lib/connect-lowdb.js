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

    get(sid, cb) {
      this.db.read()
        .then(() => {
          this.db.data ||= { sessions: [] };
          this.db.data.sessions ||= [];

          const dbSession = this.db.data.sessions
            .find(session => session.sid === sid);

          cb(null, dbSession ? dbSession.session : null);
        })
        .catch((err) => { cb(err); });;
    }

    set(sid, session, cb) {
      this.db.read()
        .then(() => {
          this.db.data ||= { sessions: [] };
          this.db.data.sessions ||= [];
    
          const sessionObj = { sid, session };
          
          const dbSession = this.db.data.sessions
            .find(session => session.sid === sid);
    
          if (dbSession) {
            const dbSessionIx = this.db.data.sessions
              .findIndex(session => session.sid === sid);
    
            this.db.data.sessions[dbSessionIx] = sessionObj;
          } else {
            this.db.data.sessions.push(sessionObj);
          }
    
          this.db.write()
            .then(() => { cb(null); })
            .catch((err) => { cb(err); });;
        })
        .catch((err) => { cb(err); });;
    }

    destroy(sid, cb) {
      this.db.read()
        .then(() => {
          this.db.data ||= { sessions: [] };
          this.db.data.sessions ||= [];

          const dbSessionIx = this.db.data.sessions
            .findIndex(session => session.sid === sid);

          this.db.data.sessions.splice(dbSessionIx, 1);
          
          this.db.write()
            .then(() => { cb(null); })
            .catch((err) => { cb(err); });
        })
        .catch((err) => { cb(err); });;
    }

    touch(sid, session, cb) {
      this.set(sid, session, cb);
    }

    all(cb) {
      this.db.read()
        .then(() => {
          this.db.data ||= { sessions: [] };
          this.db.data.sessions ||= [];

          cb(null, this.db.data.sessions);
        })
        .catch((err) => { cb(err); });;
    }

    clear(cb) {
      this.db.data ||= { sessions: [] };
      this.db.data.sessions = [];

      this.db.write()
        .then(() => { cb(null); })
        .catch((err) => { cb(err); });;
    }

    length(cb) {
      this.db.read()
        .then(() => {
          this.db.data ||= { sessions: [] };
          this.db.data.sessions ||= [];

          cb(null, this.db.data.sessions.length);
        })
        .catch((err) => { cb(err); });;
    }
  }

  return LowdbStore;
}

export default lowdbStore;
