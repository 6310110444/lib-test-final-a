import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useSigninMutation } from './authApiSlice'
import usePersist from '../../hooks/usePersist'
import useTitle from '../../hooks/useTitle'
import PulseLoader from 'react-spinners/PulseLoader'
import { toast } from 'react-toastify';

const Signin = () => {
    useTitle('Sign In')

    const userRef = useRef()
    const errRef = useRef()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [persist, setPersist] = usePersist()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [signin, { isLoading }] = useSigninMutation()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    useEffect(() => {
        if (errMsg) {
            toast.dismiss()
            toast.error(errMsg, {
                position: "bottom-right",
                autoClose: 10000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    }, [errMsg])


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { accessToken } = await signin({ username, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setUsername('')
            setPassword('')
            navigate('/dash')
            toast.dismiss()
            toast.success('Login successful!', {
                position: "bottom-right",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        } 
        catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        }
    }

    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)
    const handleToggle = () => setPersist(prev => !prev)

    if (isLoading) return <PulseLoader color={"#FFF"} />

    const content = (
        <section className="public_signin">
            <section>
                <header className='text'>
                    <h1>SIGN IN</h1>
                </header>
                <section className="public_signin_container">
                    <main className="signin">

                        <form className="public_form" onSubmit={handleSubmit}>
                            <label htmlFor="username">Username:</label>
                            <input
                                className="public_form__input"
                                type="text"
                                id="username"
                                ref={userRef}
                                value={username}
                                onChange={handleUserInput}
                                autoComplete="off"
                                required
                            />

                            <label htmlFor="password">Password:</label>
                            <input
                                className="public_form__input"
                                type="password"
                                id="password"
                                onChange={handlePwdInput}
                                value={password}
                                required
                            />
                            <button className="public_form__submit-button">SIGN IN</button>


                            <label htmlFor="persist" className="publice_form__persist">
                                <input
                                    type="checkbox"
                                    className="public_form__checkbox"
                                    id="persist"
                                    onChange={handleToggle}
                                    checked={persist}
                                />
                                Trust This Device
                            </label>
                        </form>
                    </main>
                </section>
                <footer>
                    <Link to="/">Back to Home</Link>
                </footer>
            </section>
        </section>
    )

    return content
}
export default Signin