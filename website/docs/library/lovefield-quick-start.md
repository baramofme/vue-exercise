# Lovefield 를 위한 빠른 시작 가이드

## 3 분 빠른 시작

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

## 더 많은 세부사항

### Lovefield 를 NPM 으로 가져오기

[GitHub repository](
https://github.com/google/lovefield/tree/master/dist) 에서 직접 다운로드 외에도 , 러브필드는 패키지 관리자 `npm` 지원하고 
 다음처럼 사용할 수 있습니다.

```bash
npm i lovefield
```

의존성으로 Lovefield 추가 및`npm update` 실행하면 지정된 릴리스를 자동으로 다운받습니다.

### 스키마 정의

러브필드의 컨셉은 DB *__schema__* 를 정의하고, 그 스키마를 구현한 *__instance__* 에 수행하는 것입니다. 
이 예제에서, 스카마 정의는 몇몇 비동기 API 에 의해 가져와집니다.

```js
// 대응하는 SQL : CREATE DATABASE IF NOT EXISTS todo
// 이 스키마 정의 (또는 SQL, DDL의 데이터 정의 명령)는 즉시 실행되지 않습니다. 
// Lovefield는 스키마 패턴을 사용하여 먼저 스키마를 작성한 다음 나중에 필요한 
// 데이터베이스 열기 / 생성을 수행합니다.
var schemaBuilder = lf.schema.create('todo', 1);

// 대응하는 SQL:
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

위의 코드는 가상 SQL 명령을 사용하여 SQL에서 동일한 개념을 보여줍니다.  
스키마가 정의되면 Lovefield는 해당 인스턴스를 만들거나 연결하도록 지시해야합니다.

```js
// 인스턴스를 가져오는 Promise 기반 API 
schemaBuilder.connect().then(function(db) {
  // ...
});
```

이 시점부터는 스키마를 변경할 수 없습니다. `connect ()`와 Lovefield 제안 쿼리 API는 
모두 비동기 Promise 기반 API입니다. 이 디자인은 쿼리가 오랜 시간 실행되어 꽤 많은 CPU 및 I/O 사이클을 요구하기 때문에 
Lovefield가 메인 스레드를 차단하는 것을 방지하기위한 것입니다.

데이터베이스가 완전히 새로운 것이라면, Lovefield는 스키마를 사용하여 데이터베이스를 생성 할 것입니다. 
데이터베이스가 이미 존재하면 Lovefield는 스키마에 지정된 데이터베이스 이름을 사용하여 인스턴스를 식별하고 연결을 
시도합니다.

Lovefield는 Promise 체인 패턴을 광범위하게 사용합니다.

```js
// Promise 체인 시작
schemaBuilder.connect().then(function(db) {
  // 비동기 호출 connect()가 반환 한 객체 : db
  todoDb = db;

  // Item 테이블의 스키마 표현을 가져옵니다.
  // 모든 스키마 관련 API는 동기식입니다.
  item = db.getSchema().table('Item');

  // 행을 작성합니다. Lovefield는 플레인 객체를 줄처럼 받아들이지 않습니다.
  // 테이블 스키마에 제공된 createRow() API를 사용하여 행을 만듭니다.
  var row = item.createRow({
    'id': 1,
    'description': 'Get a cup of coffee',
    'deadline': new Date(),
    'done': false
  });

  // INSERT OR REPLACE INTO Item VALUES row;
  // exec () 메서드는 Promise를 반환합니다.
  return db.insertOrReplace().into(item).values([row]).exec();

}).then(function() {
  // 여기까지 오면, Lovefield는 이전 INSERT OR REPLACE가 암시적 트랜잭션으로 
  // 커밋되었음을 보장합니다.

  // SELECT * FROM Item WHERE Item.done = false;
  // 이 SELECT 쿼리의 exec() 메서드를 호출하여 다른 Promise를 반환합니다.
  return todoDb.select().from(item).where(item.done.eq(false)).exec();

}).then(function(results) {
  // SELECT 쿼리의 Promise는 선택된 행의 배열을 반환합니다.
  // 행이 없으면 배열은 비어 있습니다..

  results.forEach(function(row) {
    // 열 이름을 사용하여 행의 열을 직접 역참조합니다.
    console.log(row['description'], 'before', row['deadline']);
  });
});
```
