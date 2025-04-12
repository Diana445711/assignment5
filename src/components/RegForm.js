import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RegForm.module.css';

const RegForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirm_password: '',
    email: ''
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validate = () => {
    const newErrors = {};

    if (!/^[A-Za-z][A-Za-z0-9_-]{2,19}$/.test(formData.username)) {
      newErrors.username =
        'Invalid username {Reason: must be 3-20 characters, start with a letter, and can not include spaces or special characters other than hyphens and underscores}';
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\[\]{}|;:'",.<>?/`~])[A-Za-z\d!@#$%^&*()\-_=+\[\]{}|;:'",.<>?/`~]{8,}$/.test(formData.password)
    ) {
      newErrors.password =
        'Invalid password {Reason: must be at least 8 characters long and include uppercase, lowercase, a number, and a special character. No spaces allowed.}';
    }

    if (formData.confirm_password !== formData.password) {
      newErrors.confirm_password = 'Passwords do not match.';
    }

    if (!/^[^\s@]+@[^\s@]+\.(com|net|io)$/.test(formData.email)) {
      newErrors.email =
        'Invalid Email {Reason: must be valid format and end with .com, .net, or .io.}';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    const updatedFormData = {
      ...formData,
      [fieldName]: fieldValue
    };

    setFormData(updatedFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');

  
    if (validate()) {
      fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 'success') {
            setSuccessMessage('Signup successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
          } else {
            setErrors({ api: data.message });
          }
        })
        .catch(() => {
          setErrors({ api: 'Server error. Please try again later.' });
        });
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2>Sign Up</h2>
      <form className={styles.container} onSubmit={handleSubmit}>
        <div className={styles.formBox}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
          </div>
          <br />
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
          </div>
          <br />
          <div className={styles.inputGroup}>
            <label htmlFor="confirm_password">Confirm Password:</label>
            <input type="password" id="confirm_password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} />
          </div>
          <br />
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <br />
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.button}>Sign Up</button>
          </div>
        </div>
      </form>

      {(Object.keys(errors).length > 0 || successMessage) && (
        <div className={styles.errorBox}>
          {successMessage && <div>{successMessage}</div>}
          {Object.values(errors).length > 0 && (
            <ul>
              {Object.values(errors).map((message, index) => (
                <div key={index}>{message}</div>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default RegForm;
