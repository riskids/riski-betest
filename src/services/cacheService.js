const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => console.error('Redis Client Error', err));

client.connect().then(() => {
  console.log('Connected to Redis');
}).catch(console.error);

exports.cacheMiddleware = (req, res, next) => {
  const { accountNumber } = req.params;
  console.log(`Checking cache for accountNumber: ${accountNumber}`);
  
  client.get(accountNumber, (err, data) => {
    if (err) {
      console.error('Redis Get Error', err);
      return res.status(500).send('Internal Server Error');
    }
    if (data) {
      console.log(`Cache hit for accountNumber: ${accountNumber}`);
      return res.send(JSON.parse(data));
    }
    console.log(`Cache miss for accountNumber: ${accountNumber}`);
    next();
  });
};

exports.cacheUser = (accountNumber, data) => {
  client.setex(accountNumber, 3600, JSON.stringify(data), (err) => {
    if (err) console.error('Redis Set Error', err);
    else console.log(`Cached data for accountNumber: ${accountNumber}`);
  });
};
