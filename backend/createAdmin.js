import axios from 'axios';

const createFirstAdmin = async () => {
  try {
    const response = await axios.post('https://hospital-management-r7hc.onrender.com/api/v1/user/admin/first', {
      firstName: "Admin",
      lastName: "User",
      email: "admin@zeecare.com",
      phone: "1234567890",
      Adhar: "123456789012",
      dob: "1990-01-01",
      gender: "Male",
      password: "Admin@123"
    });

    console.log('Admin created successfully:', response.data);
  } catch (error) {
    console.error('Error creating admin:', error.response?.data || error.message);
  }
};

createFirstAdmin(); 