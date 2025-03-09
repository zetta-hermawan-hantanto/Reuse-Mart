// *************** IMPORT LIBRARY ***************
import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    // status of the user
    status: {
      type: String,
      enum: ['active', 'inactive'],
      required: true,
      default: 'active',
    },

    // First name of the user
    first_name: {
      type: String,
      required: true,
      default: '',
    },

    // Last name of the user
    last_name: {
      type: String,
      required: true,
      default: '',
    },

    // Email of the user
    email: {
      type: String,
      required: true,
      default: '',
    },

    // Password of the user
    password: {
      type: String,
      required: true,
      default: '',
    },

    // Role of the user
    role: {
      type: String,
      enum: ['buyer', 'seller', 'quality_control', 'customer_service', 'depositor'],
      required: true,
      default: 'buyer',
    },

    // Balance of the user
    balance: {
      type: Number,
      required: true,
      default: 0,
    },

    // Address of the user
    address: [
      {
        type: String,
        required: true,
        default: '',
      },
    ],

    // Phone number of the user
    phone_number: {
      type: String,
      required: true,
      default: '',
    },
  },

  // Enable timestamps
  { timestamps: true }
);

const UserModel = model('user', userSchema);

// *************** EXPORT MODULES ***************
export default UserModel;
