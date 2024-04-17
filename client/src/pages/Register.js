import React from 'react';
import { Row, Col, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../redux/actions/userActions';
import AOS from 'aos';
import Spinner from '../components/Spinner';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

function Register() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);

  // Custom validator function to check if passwords match
  const validateConfirmPassword = (_, value) => {
    const { password } = form.getFieldValue();
    if (value && value !== password) {
      return Promise.reject(new Error('The two passwords do not match'));
    }
    return Promise.resolve();
  };

  // Custom validator function to check if password is strong
  const validateStrongPassword = (_, value) => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    if (value && !strongPasswordRegex.test(value)) {
      return Promise.reject(new Error('Password should be strong'));
    }
    return Promise.resolve();
  };

  // Custom validator function to check if phone number is 10 digits
  const validatePhoneNumber = (_, value) => {
    const phoneNumberRegex = /^\d{10}$/;
    if (value && !phoneNumberRegex.test(value)) {
      return Promise.reject(new Error('Please enter a valid 10-digit phone number'));
    }
    return Promise.resolve();
  };

  // Reference to the form instance
  const [form] = Form.useForm();

  const onFinish = (values) => {
    dispatch(userRegister(values));
    console.log(values);
  };

  return (
    <div className="login">
      {loading && <Spinner />}
      <Row gutter={16} className="d-flex align-items-center">
        <Col lg={16} style={{ position: 'relative' }}>
          <img
            className="w-100"
            data-aos="slide-left"
            data-aos-duration="1500"
            src="https://img.freepik.com/premium-photo/cars-sale-rent-factory-stock-car-dealer-ai-generated_145713-14505.jpg"
            alt="Cars for sale"
          />
          <h1 className="login-logo">Road Connect</h1>
        </Col>
        <Col lg={8} className="text-left p-5">
          <Form
            form={form}
            layout="vertical"
            className="login-form p-5"
            onFinish={onFinish}
          >
            <h1>Register</h1>
            <hr />
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true, message: 'Please enter your username' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: 'Please enter your phone number' },
                { validator: validatePhoneNumber },
              ]}
            >
              <Input type="tel"/>
            </Form.Item>
            <Form.Item name="city" label="City" rules={[{ required: true, message: 'Please enter your city' }]}>
              <Input/>
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              minLength={8}
              required
              rules={[
                { required: true, message: 'Please enter your password' },
                { min: 8, message: 'Password must be at least 8 characters long' },
                { validator: validateStrongPassword }, // Added validation for strong password
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="cpassword"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              minLength={8}
              required
              rules={[
                { required: true, message: 'Please confirm your password' },
                { min: 8, message: 'Password must be at least 8 characters long' },
                { validator: validateConfirmPassword },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <button className="btn1 mt-2 mb-3" type="submit">Register</button>
            <br />
            <Link to="/login">Click Here to Login</Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Register;
