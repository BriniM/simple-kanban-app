import * as SQLite from "expo-sqlite";

function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase("db.db");
  return db;
}

const db = openDatabase();

(() => {
  db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists tasks (id integer primary key not null, title varchar(50), duree varchar(20), type_tache integer);"
    );
  });
})();

export const createTask = (task, taskType) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "insert into tasks (title, duree, type_tache) values (?, ?, ?)",
        [task.title, task.duree, taskType],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}

export const getTasks = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "select * from tasks",
        [],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}

export const getTask = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "select * from tasks where id = ?",
        [id],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}

export const updateTask = (task, taskType) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "update tasks set title = ?, duree = ?, type_tache = ? where id = ?",
        [task.title, task.duree, taskType, task.id],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}

export const deleteTask = (task) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "delete from tasks where id = ?",
        [task.id],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}