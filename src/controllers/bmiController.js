import Bmi from '../models/bmiModel.js';

const bmiCalCulator = async (req, res) => {
  const userId = req.userId;
  const { weight, height } = req.body;
  if (
    !weight ||
    !height ||
    typeof weight !== 'number' ||
    typeof height !== 'number'
  )
    return res.status(401).json('Invalid Inputs');

  try {
    //calculating BMI INDEX
    const bmi = Math.round(weight / (height * height));

    //Storing it in the database
    const newBmiRecord = await Bmi.create({
      userId,
      weight,
      height,
      bmi,
    });

    res.status(201).json(newBmiRecord);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

//fetching all Bmi history of the user
const getBmiHistory = async (req, res) => {
  console.log('hii');
  const userId = req.userId;
  try {
    const bmiHistory = await Bmi.find({ userId: userId });
    console.log('bmiHistory: ', bmiHistory);
    res.status(200).json(bmiHistory);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export { bmiCalCulator, getBmiHistory };
