import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RegForm.module.css';


const RegForm = () => {
    return (
      <div className={styles.wrapper}>
        <h2>Sign Up</h2>
        <form className={styles.container}>
            <div className={styles.formBox}>
            <div className={styles.inputGroup}>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" />
            </div>
            <br/>
            <div className={styles.inputGroup}>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />
            </div>
            <br/>
            <div className={styles.inputGroup}>
            <label htmlFor="confirm_password">Confirm Password:</label>
            <input type="password" id="confirm_password" name="confirm_password" />
            </div>
            <br/>
            <div className={styles.inputGroup}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />
            </div>
            <br/>
            <div className={styles.buttonContainer}>
            <button type="submit" className={styles.button}>Sign Up</button>
            </div>
            </div>
        </form>
    </div>
  );
};

export default RegForm;