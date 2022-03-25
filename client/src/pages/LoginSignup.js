import { useState, useEffect } from "react";
import classes from './LoginSignup.module.css'

import Login from "../components/loginSignup/Login"
import Signup from "../components/loginSignup/Signup"

import { useMutation } from "@apollo/client";
import Auth from "../components/utils/auth"
import { ADD_USER } from "../components/utils/mutations";
import { LOGIN_USER } from "../components/utils/mutations";

const LoginSignup = () => {
    const [formState, setFormState] = useState({ username: "", password: "" });
    const [toggleForm, setToggleForm] = useState('Login');
    const [addUser] = useMutation(ADD_USER);
    const [login, { error }] = useMutation(LOGIN_USER);

    const submitHandler = async (event) => {
        event.preventDefault();
        // console.log(formState);
        try {
          if (
            formState.username &&
            formState.password &&
            formState.email
          ) {
     
            const mutationResponse = await addUser({
              variables: {
                username: formState.username,
                password: formState.password,
                email: formState.email,
              },
            });
    
            const token = mutationResponse.data.addUser.token;
            Auth.login(token);
    
          } else {
              
            const mutationResponse = await login({
              variables: { username: formState.username, password: formState.password },
            });
            const token = mutationResponse.data.login.token;
            Auth.login(token);
          }
        } catch (e) {
          console.log(e);
        }
      };

    const handleChange = (event) => {
        const { name, value } = event.target;
        // console.log(formState);
        setFormState({
          ...formState,
          [name]: value,
        });
      };
    
    const changeForm = () => {

    }

    useEffect(() =>{

    }, [toggleForm])

    return(
        <div className={classes.background}>
            <div className={classes.barrier}></div>
            <div className={classes.formCard}>
                <h1 className={classes.title}>Basketball Simulator</h1>

                <div className={classes.buttonDiv}>
                        <button className={classes.loginBtn} onClick={() => setToggleForm("Login")}>Login</button>
                        <button className={classes.signupBtn} onClick={() => setToggleForm("Signup")}>Sign up</button>
                </div>

                {toggleForm === "Login"
                ? (
                    <Login
                    setUsernameInput={handleChange}
                    setPasswordInput={handleChange}
                    />
                ) : (
                    <Signup
                    setUsernameInput={handleChange}
                    setEmailInput={handleChange}
                    setPasswordInput={handleChange}
                    setPasswordConfirmInput={handleChange}
                    />  
                )
            }
            </div>
        </div>
        
    )
}

export default LoginSignup;