const {MongoClient} = require('mongodb');

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
    });
    db = await connection.db(global.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it('should insert a document into collection', async () => {
    const posts = db.collection('posts');

    const mockPost = {_id: 'some-post-id', name: 'Stocks'};
    await posts.insertOne(mockPost);

    const insertedPost = await posts.findOne({_id: 'some-post-id'});
    expect(insertedPost).toEqual(mockPost);
  });
});