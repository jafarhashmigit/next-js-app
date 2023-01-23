(async () => {
  try {
    await mongoose.connect(
      process.env.NODE_ENV != "dev" && process.env.NODE_ENV != "prod"
          ? process.env.MONGO_URL
          : `${process.env.MONGO_URL}${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_NAME}?authSource=admin`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
    console.log(`Connected to database + ${process.env.NODE_ENV}`)
  } catch (error) {
    console.log(`Some Error From Database Connection, Error`+ `${error}`);
    process.exit(1);
  }
})();
