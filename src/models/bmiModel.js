import mongoose from 'mongoose';

const bmiSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    weight: Number,
    height: Number,
    bmi: Number,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Bmi = mongoose.model('Bmi', bmiSchema);
export default Bmi;
