module.exports = mongoose => {
  const Secret = mongoose.model(
    "Secret",
    mongoose.Schema(
      {
        hash: String,
        secretText: String,
        expiresAt: {
          type: Date,
          required: true,
          index: { expireAfterSeconds: 0 },
        },
        remainingViews: String
      },
      { timestamps: true },
    )
  );
  return Secret;
};