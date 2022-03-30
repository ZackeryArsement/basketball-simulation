import { useState, useEffect } from "react";
import classes from './LoginSignup.module.css'

import Login from "../components/loginSignup/login/Login"
import Signup from "../components/loginSignup/signup/Signup"

import { useMutation } from "@apollo/client";
import Auth from "../components/utils/auth"
import { ADD_USER } from "../components/utils/mutations";
import { LOGIN_USER } from "../components/utils/mutations";

const LoginSignup = (props) => {
    const [formState, setFormState] = useState({ username: "", password: "" });
    const [toggleForm, setToggleForm] = useState('Login');
    const [addUser] = useMutation(ADD_USER);
    const [login, { error }] = useMutation(LOGIN_USER);

    const submitHandler = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
          if (
            formState.username &&
            formState.password &&
            formState.email
          ) {
            console.log("sign up")

            const mutationResponse = await addUser({
              variables: {
                username: formState.username,
                password: formState.password,
                email: formState.email,
              },
            });

            console.log(mutationResponse);
    
            const token = mutationResponse.data.addUser.token;
            Auth.login(token);
    
          } else {
            console.log("log in")
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
        setFormState({
          ...formState,
          [name]: value,
        });
      };

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

                <form  onSubmit={submitHandler}>
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
                    )}
                </form>
            </div>
        </div>
        
    )
}

export default LoginSignup;