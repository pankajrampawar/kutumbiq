const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function (value) {
                // Check if phone is also not provided, then email must be present
                return value || this.phone;
            },
            message: 'Either email or phone must be provided.'
        }
    },
    phone: {
        type: String,
        validate: {
            validator: function (value) {
                // Check if email is also not provided, then phone must be present
                return value || this.email;
            },
            message: 'Either phone or email must be provided.'
        }
    },
    address: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Model creation
const Profile = mongoose.models.Profile || mongoose.model('Profile', profileSchema);

module.exports = Profile;