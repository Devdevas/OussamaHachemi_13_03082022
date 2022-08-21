import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleSubmit } from '../../features/userAuth'
import './style.css'
import { selectError, selectToken } from '../../utils/selectors';
import { Navigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValidAuth, setIsValidAuth] = useState(true)
    const error = useSelector(selectError)
    const token = useSelector(selectToken)
    const dispatch = useDispatch()

    useEffect(() => {
        if (error) {
            setIsValidAuth(false)
        }

    }, [error])

    if (token) {
        return <Navigate to="/profile" />
    }

    function submitForm(e) {
        e.preventDefault()
        dispatch(handleSubmit(email, password))
    }


    return (
        <div>
            <Header navText='Sign In' className='hidden-signout' />
            {<main className="bg-login bg-dark">
                <section className="sign-in-content">
                    <FontAwesomeIcon icon={faCircleUser} />
                    <h1>Sign In</h1>
                    <form onSubmit={submitForm}>
                        {!isValidAuth ? <p className='error'>Invalid email or password!</p> : null}
                        <div className={!isValidAuth ? "invalid-input" : "input-wrapper"}>
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" onInput={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className={!isValidAuth ? "invalid-input" : "input-wrapper"}>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" onInput={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="input-remember">
                            <input type="checkbox" id="remember-me" />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        <button className="sign-in-button">Sign In</button>
                    </form>
                </section>
            </main>}
            <Footer />
        </div>
    )
}

export default Login