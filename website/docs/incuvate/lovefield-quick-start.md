# Quick Start Guide for Lovefield

## <3 Minutes Quick Start

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Minimal example of using Lovefield</title>
    <script src="bower_components/lovefield/dist/lovefield.min.js"></script>
  </head>
  <body>
    <script>

var schemaBuilder = lf.schema.create('todo', 1);

schemaBuilder.createTable('Item').
    addColumn('id', lf.Type.INTEGER).
    addColumn('description', lf.Type.STRING).
    addColumn('deadline', lf.Type.DATE_TIME).
    addColumn('done', lf.Type.BOOLEAN).
    addPrimaryKey(['id']).
    addIndex('idxDeadline', ['deadline'], false, lf.Order.DESC);

var todoDb;
var item;
schemaBuilder.connect().then(function(db) {
  todoDb = db;
  item = db.getSchema().table('Item');
  var row = item.createRow({
    'id': 1,
    'description': 'Get a cup of coffee',
    'deadline': new Date(),
    'done': false
  });

  return db.insertOrReplace().into(item).values([row]).exec();
}).then(function() {
  return todoDb.select().from(item).where(item.done.eq(false)).exec();
}).then(function(results) {
  results.forEach(function(row) {
    console.log(row['description'], 'before', row['deadline']);
  });
});

    </script>
  </body>
</html>
```

위의 예제 TODO 앱이 [여기](https://github.com/google/lovefield/tree/master/demos/todo)에 있습니다. 실행하기 위해서는
로컬에서 체크 아웃의 해당 폴더로 이동 한 후 아래의 지시 사항을 따르십시오.

1. Install gulp (if you have not already), ```npm install -g gulp```
2. Install bower (if you have not already), ```npm install -g bower```
3. Pull dependencies in package.json, ```npm install .```
4. Pull dependencies in bower.json, ```bower install```
5. Start a local webserver, ```gulp debug```
6. Navigate to [http://localhost:8000/todo.html](http://localhost:8000/todo.html).


## 더 많은 세부사항

### Getting Lovefield via NPM or Bower

Besides downloading directly from [GitHub repository](
https://github.com/google/lovefield/tree/master/dist), Lovefield supports `npm`
and `bower` package management systems and can be found using

```bash
npm info lovefield
bower info lovefield
```

Adding Lovefield as the dependency and executing `npm update` or `bower update`
will automatically pull down the designated release.

### 스키마 정의

러브필드의 컨셉은 DB *__schema__* 를 정의하고, 그 스키마를 구현한 *__instance__* 에 수행하는 것입니다. 
이 예제에서, 스카마 정의는 몇몇 비동기 API 에 의해 가져와집니다.

```js
// SQL equivalent: CREATE DATABASE IF NOT EXISTS todo
// This schema definition (or data definition commands in SQL, DDL) is not
// executed immediately. Lovefield uses builder pattern to build the schema
// first, then performs necessary database open/creation later.
var schemaBuilder = lf.schema.create('todo', 1);

// SQL equivalent:
// CREATE TABLE IF NOT EXISTS Item (
//   id AS INTEGER,
//   description AS INTEGER,
//   deadline as DATE_TIME,
//   done as BOOLEAN,
//   PRIMARY KEY ON ('id')
// );
// ALTER TABLE Item ADD INDEX idxDeadLine(Item.deadline DESC);
schemaBuilder.createTable('Item').
    addColumn('id', lf.Type.INTEGER).
    addColumn('description', lf.Type.STRING).
    addColumn('deadline', lf.Type.DATE_TIME).
    addColumn('done', lf.Type.BOOLEAN).
    addPrimaryKey(['id']).
    addIndex('idxDeadline', ['deadline'], false, lf.Order.DESC);
```

The code above has pseudo SQL commands to demonstrate their equivalent concept
in SQL. Once the schema is defined, Lovefield needs to be instructed to create
or connect to the corresponding instance:

```js
// Promise-based API to get the instance.
schemaBuilder.connect().then(function(db) {
  // ...
});
```

From this point on, the schema cannot be altered. Both the `connect()` and
Lovefield offered query APIs are asynchronous Promise-based APIs. This design
is to prevent Lovefield from blocking main thread since the queries can be
long running and demanding quite some CPU and I/O cycles.

If the database is brand new, Lovefield will create it using the schema. If the
database already exists, Lovefield will attempt to identify the instance using
database name specified in the schema, and connect to it.

Lovefield also uses Promise chaining pattern extensively:

```js
// Start of the Promise chaining
schemaBuilder.connect().then(function(db) {
  // Asynchronous call connect() returned object: db
  todoDb = db;

  // Get the schema representation of table Item.
  // All schema-related APIs are synchronous.
  item = db.getSchema().table('Item');

  // Creates a row. Lovefield does not accept plain objects as row.
  // Use the createRow() API provided in table schema to create a row.
  var row = item.createRow({
    'id': 1,
    'description': 'Get a cup of coffee',
    'deadline': new Date(),
    'done': false
  });

  // INSERT OR REPLACE INTO Item VALUES row;
  // The exec() method returns a Promise.
  return db.insertOrReplace().into(item).values([row]).exec();

}).then(function() {
  // When reached here, Lovefield guarantees previous INSERT OR REPLACE
  // has been committed with its implicit transaction.

  // SELECT * FROM Item WHERE Item.done = false;
  // Return another Promise by calling this SELECT query's exec() method.
  return todoDb.select().from(item).where(item.done.eq(false)).exec();

}).then(function(results) {
  // The SELECT query's Promise will return array of rows selected.
  // If there were no rows, the array will be empty.

  results.forEach(function(row) {
    // Use column name to directly dereference the columns from a row.
    console.log(row['description'], 'before', row['deadline']);
  });
});
```
