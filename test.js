//test.js

const database = require('./dbMap');

//db = database.init();
let db = database.init('[[1,"one"],[2,{"value": "two"}],[3,"three"]]');
console.log(`db: ${database.stringify(db)}`);

db = database.create(db,4,"four");
console.log(`db: ${database.stringify(db)}`);

console.log(`key 2 read: ${database.read(db,2)}`);
console.log(`key 2 string: ${database.stringify(db,2)}`);

db = database.del(db,4);
console.log(`db: ${database.stringify(db)}`);

db = database.clear();
console.log(`db: ${database.stringify(db)}`);