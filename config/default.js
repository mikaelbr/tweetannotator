module.exports = {
  "Twitter": {
    "consumer_key": process.env.TWEET_ANNO_consumer_key,
    "consumer_secret": process.env.TWEET_ANNO_consumer_secret,
    "access_token_key": process.env.TWEET_ANNO_access_token_key,
    "access_token_secret": process.env.TWEET_ANNO_access_token_secret
  },
  "MongoJS": {
    "connect_url": process.env.MONGOHQ_URL
  }
};