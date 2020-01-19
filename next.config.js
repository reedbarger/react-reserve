// must restart server whenever you make changes in next.config
module.exports = {
  env: {
    MONGO_SRV: "mongodb+srv://root-dbuser:7b6Deek3BMzX2gk@reactreserve-zv3yt.mongodb.net/test?retryWrites=true&w=majority",
    JWT_SECRET: "<insert-jwt-secret>",
    CLOUDINARY_URL: "https://api.cloudinary.com/v1_1/msonmez/image/upload",
    STRIPE_SECRET_KEY: "sk_test_MPVPlugFWmeEfwvu68TMhV6m00gGcnPtes"
  }
};
