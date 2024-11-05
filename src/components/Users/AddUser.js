import React, { useState, useRef } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css';

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();
  const passwordInputRef = useRef(); // Lisätty: Ref-muuttuja salasanaa varten

  //const [enteredUsername, setEnteredUsername] = useState('');
  //const [enteredAge, setEnteredAge] = useState('');
  const [error, setError] = useState();

  // Funktio salasanan generoimiseksi
  const generatePassword = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    passwordInputRef.current.value = password; 
  };

  const addUserHandler = (event) => {
    event.preventDefault();

    const enteredUsername = nameInputRef.current.value;
    const enteredAge = ageInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value; 

  
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0 || enteredPassword.trim().length === 0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name, age, and password (non-empty values).',
      });
      return;
    }

    
    if (+enteredAge < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).',
      });
      return;
    }

    // salasana on vähintään 12 merkkiä pitkä
    if (enteredPassword.length < 12) {
      setError({
        title: 'Invalid password',
        message: 'Please enter a password with at least 12 characters.',
      });
      return;
    }


    props.onAddUser(enteredUsername, enteredAge, enteredPassword);

    
    nameInputRef.current.value = '';
    ageInputRef.current.value = '';
    passwordInputRef.current.value = ''; // Lisätty: Salasanakentän tyhjennys
    //setEnteredUsername('');
    //setEnteredAge('');
  };

  /*const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };*/

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            //value={enteredUsername}
            //onChange={usernameChangeHandler}
            ref={nameInputRef}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            //value={enteredAge}
            //onChange={ageChangeHandler}
            ref={ageInputRef}
          />
          <label htmlFor="password">Password</label> {/* Lisätty: Salasanakenttä */}
          <input
            id="password"
            type="password"
            ref={passwordInputRef}
          />
          <Button type="button" onClick={generatePassword}>Generate Password</Button> {/* Lisätty: Salasanan generointipainike */}
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
