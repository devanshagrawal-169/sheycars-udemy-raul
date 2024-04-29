const mongoose = require('mongoose');

const carSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    image: { type: String, required: true },
    capacity: { type: Number, required: true },
    fuelType: { type: String, required: true },
    city: { type: String, required: true },
    bookedTimeSlots: [
      {
        from: { type: String, required: true },
        to: { type: String, required: true },
      },
    ],

    rentPerHour: { type: Number, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: false },
  },
  { timestamps: true },
  
);

carSchema.pre('save', function(next) {
  // Check if the city field is modified or is new
  if (this.isModified('city') || this.isNew) {
    // Capitalize the first letter of the city value
    this.city = this.city.charAt(0).toUpperCase() + this.city.slice(1).toLowerCase();
  }
  next();
});

const carModel = mongoose.model('cars', carSchema);
module.exports = carModel;
