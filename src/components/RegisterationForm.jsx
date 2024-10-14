// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const countries = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'India',
  'Germany',
  // Add more countries as needed
];

const RegisterationForm = () => {
  // Define the validation schema
  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(3, 'Full Name must be at least 3 characters long')
      .required('Full Name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    phone: Yup.string()
      .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
      .required('Phone number is required'),
    dob: Yup.date()
      .max(new Date(new Date().setFullYear(new Date().getFullYear() - 18)), 'You must be at least 18 years old')
      .required('Date of Birth is required'),
    gender: Yup.string().required('Gender is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[@$!%*?&]/, 'Password must contain at least one special character')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    address: Yup.string().required('Address is required'),
    country: Yup.string().required('Country must be selected'),
    profilePicture: Yup.mixed()
      .nullable()
      .test('fileSize', 'File Size is too large', value => {
        return value ? value.size <= 2000000 : true; // 2MB limit
      })
      .test('fileFormat', 'Unsupported Format', value => {
        return value ? ['image/jpeg', 'image/png'].includes(value.type) : true; // Allowed formats
      }),
    terms: Yup.bool()
      .oneOf([true], 'You must accept the terms and conditions')
      .required('You must accept the terms and conditions'),
  });

  return (
    <Formik
      initialValues={{
        fullName: '',
        email: '',
        phone: '',
        dob: '',
        gender: '',
        password: '',
        confirmPassword: '',
        address: '',
        country: '',
        profilePicture: null,
        terms: false,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log('Form data', values);
        // Handle form submission here
      }}
    >
      {({ setFieldValue }) => (
        <Form className="registration-form">
          <h2>User Registration</h2>
          <div className="form-group">
            <label htmlFor="fullName">Full Name:</label>
            <Field name="fullName" type="text" className="form-control" />
            <ErrorMessage name="fullName" component="div" className="error" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <Field name="email" type="email" className="form-control" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number:</label>
            <Field name="phone" type="text" className="form-control" />
            <ErrorMessage name="phone" component="div" className="error" />
          </div>

          <div className="form-group">
            <label htmlFor="dob">Date of Birth:</label>
            <Field name="dob" type="date" className="form-control" />
            <ErrorMessage name="dob" component="div" className="error" />
          </div>

          <div className="form-group">
            <label>Gender:</label>
            <div role="group" aria-labelledby="my-radio-group">
              <label>
                <Field type="radio" name="gender" value="male" />
                Male
              </label>
              <label>
                <Field type="radio" name="gender" value="female" />
                Female
              </label>
              <label>
                <Field type="radio" name="gender" value="other" />
                Other
              </label>
            </div>
            <ErrorMessage name="gender" component="div" className="error" />
          </div>
         
         <br />
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <Field name="password" type="password" className="form-control" />
            <ErrorMessage name="password" component="div" className="error" />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <Field name="confirmPassword" type="password" className="form-control" />
            <ErrorMessage name="confirmPassword" component="div" className="error" />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <Field name="address" component="textarea" className="form-control" />
            <ErrorMessage name="address" component="div" className="error" />
          </div>

          <div className="form-group">
            <label htmlFor="country">Country:</label>
            <Field as="select" name="country" className="form-control">
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </Field>
            <ErrorMessage name="country" component="div" className="error" />
          </div>

          <div className="form-group">
            <label htmlFor="profilePicture">Profile Picture (Optional):</label>
            <input
              name="profilePicture"
              type="file"
              accept="image/jpeg, image/png"
              onChange={(event) => {
                setFieldValue('profilePicture', event.currentTarget.files[0]);
              }}
              className="form-control"
            />
            <ErrorMessage name="profilePicture" component="div" className="error" />
          </div>

          <div className="form-group">
            <Field type="checkbox" name="terms" />
            <label htmlFor="terms">I accept the terms and conditions</label>
            <ErrorMessage name="terms" component="div" className="error" />
          </div>

          <button type="submit" className="submit-button">Register</button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterationForm;
