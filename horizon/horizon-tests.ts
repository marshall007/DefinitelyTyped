// Type definition tests for Horizon v0.3.2
// Project: http://horizon.io
// GitHub: https://github.com/rethinkdb/horizon
// Definitions by: Marshall Cottrell <http://github.com/marshall007>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped


/// <reference path="horizon.d.ts" />



////////////////////////////////////////////
// Client Setup
////////////////////////////////////////////


const horizon = new Horizon({ host: 'localhost' });
const messages = horizon('messages');



////////////////////////////////////////////
// Query Operations
////////////////////////////////////////////


// fetch

messages.fetch().subscribe(
  results => console.log(results),
  err => console.error(err)
)


// watch

messages.watch().subscribe(
  results => console.log(results)
)
messages.watch({ rawChanges: true }).subscribe(
  results => console.log(results),
  err => console.error(err)
)


// findAll

messages.findAll({ id: 1 }, { id: 1 })
messages.findAll({ name: "dalan" }, { id: 3 })


// find

messages.find(1)
messages.find({ id: 1 })
messages.find({ name: "dalan" })


// order

messages.order("id")
messages.order("name")
messages.order("name", "ascending")
messages.order("age", "descending")


// above

messages.order("id").above(3)
messages.order("id").above(3, "closed")
messages.order("id").above({ author: "d" })


// below

messages.order("id").below(3)
messages.order("id").below(3, "closed")
messages.order("id").below({ author: "d" })


// limit

messages.limit(5)
messages.findAll({ author: "dalan" }).limit(5)
messages.order("datetime", "descending").limit(5)



////////////////////////////////////////////
// Write Operations
////////////////////////////////////////////

messages.store({ id: 1, text: "G'day!" })
messages.upsert({ id: 1, text: "G'day!" })
messages.insert({ id: 1, text: "G'day!" })
messages.replace({ id: 1, text: "G'day!" })
messages.update({ id: 1, text: "G'day!" })


// remove

messages.remove(1);
messages.remove({ id: 1 })


// removeAll

messages.removeAll([1, 2, 3]);
messages.removeAll([{ id: 1 }, { id: 2 }, { id: 3 }]);
