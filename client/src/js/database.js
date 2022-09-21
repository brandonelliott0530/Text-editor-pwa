import { openDB } from "idb";

// crates the database
const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
    },
  });

// Adds text into the database
export const putDb = async (content) => {
  const jateDb = await openDB("jate", 1);

  const tx = jateDb.transaction("jate", "readwrite");

  const store = tx.objectStore("jate");

  const request = store.put({ content: content });

  const result = await request;
};

// gets the content from the database on page load
export const getDb = async () => {
  const jateDb = await openDB("jate", 1);

  const tx = jateDb.transaction("jate", "readonly");

  const store = tx.objectStore("jate");

  const request = store.getAll();

  const result = await request;

  return result.value;
};

initdb();
