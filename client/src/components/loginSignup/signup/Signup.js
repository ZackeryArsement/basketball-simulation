import classes from './Signup.module.css';

const Signup = (props) => {
    return (
        <div className={classes.form}>
            <div>
                <h2 className={classes.title}>Sign Up Below</h2>
                <div>

                    <div>
                        <input className={classes.input} type="text" placeholder='Username' name="username" value={props.usernameInput} onChange={props.setUsernameInput}/>
                        <input className={classes.input} type="email" placeholder='Email' name="email" value={props.emailInput} onChange={props.setEmailInput}/>
                    </div>

                    <div>
                        <input className={classes.input} type="password" placeholder='Password' name="password" value={props.passwordInput} onChange={props.setPasswordInput}/>
                        {/* <input className={classes.input} type="password" placeholder='Confirm Password' name="confirmPassword" value={props.passwordConfirmInput} onChange={props.setPasswordConfirmInput}/> */}
                    </div>
                </div>
            </div>

            <button className={classes.submitBtn} type="submit">Sign up</button>
        </div>
    )
}

export default Signup;