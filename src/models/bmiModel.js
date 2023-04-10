import mongoose from 'mongoose';

const bmiSchema = new mongoose.Schema(
  {},
  {
    versionKey: false,
    timestamps: true,
  }
);

const Bmi = mongoose.model('Bmi', bmiSchema);
export default Bmi;
