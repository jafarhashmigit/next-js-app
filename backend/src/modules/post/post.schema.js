const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String, 
      trim: true,
      default:"",
    },
    description: {
      type: String, 
        trim: true,
        default:"",
    },
    slug: {
      type: String, 
        trim: true,
        default:"",
    },
    category: {
      type: String, 
        trim: true,
        default:"",
    },
  },
  { timestamps: true }
);

module.exports =mongoose.models.Post || mongoose.model("Post", PostSchema);
