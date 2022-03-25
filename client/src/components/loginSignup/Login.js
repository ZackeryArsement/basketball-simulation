import classes from './Login.module.css';

const Login = (props) => {
    return (
        <div className={classes.form}>
            <div>
                <h2 className={classes.title}>Let's Hoop</h2>

                <div className={classes.inputsColumn}>
                    <input className={classes.input} type="text" placeholder='Username' name="username" value={props.usernameInput} onChange={props.setUsernameInput}/>
                    <input className={classes.input} type="password" placeholder='Password' name="password" value={props.passwordInput} onChange={props.setPasswordInput}/>
                </div>
            </div>
            
            <button className={classes.submitBtn} type="submit">Login</button>
        </div>
    )
}

export default Login;