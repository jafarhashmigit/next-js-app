const NoteSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    machineID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Machine",
    },
    note:{
        type: String, 
        trim: true,
        default:"",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", NoteSchema);
