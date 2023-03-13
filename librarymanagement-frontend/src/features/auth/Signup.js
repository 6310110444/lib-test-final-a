import { useRef, useState, useEffect } from "react"
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useAddNewUserMutation } from "../users/usersApiSlice"
import { setCredentials } from './authSlice'
import { useSigninMutation } from './authApiSlice'
import useTitle from "../../hooks/useTitle"
import usePersist from '../../hooks/usePersist'
import PulseLoader from 'react-spinners/PulseLoader'
import { toast } from 'react-toastify';

const NAME_REGEX = /^[A-z]{1,50}$/
const USER_REGEX = /^[A-z0-9]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const Signup = () => {
    useTitle('Sign Up')

    const [addNewUser, {
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [firstname, setFirstname] = useState('')
    const [validFirstname, setValidFirstname] = useState(false)
    const [surname, setSurname] = useState('')
    const [validSurname, setValidSurname] = useState(false)
    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [validConfirmPassword, setValidConfirmPassword] = useState(false)
    const [CheckConfirmPassword, setCheckConfirmPassword] = useState(false)
    const [roles, setRoles] = useState(["User"])

    const userRef = useRef()
    const [persist, setPersist] = usePersist()

    const [signin, { isLoading }] = useSigninMutation()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setValidFirstname(NAME_REGEX.test(firstname))
    }, [firstname])

    useEffect(() => {
        setValidSurname(NAME_REGEX.test(surname))
    }, [surname])

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        setValidConfirmPassword(PWD_REGEX.test(confirmPassword))
    }, [confirmPassword])

    useEffect(() => {
        setCheckConfirmPassword(confirmPassword === password)
    }, [password, confirmPassword])

    useEffect(() => {
        if(isError) {
            toast.dismiss()
            toast.error(error?.data?.message, {
                position: "bottom-right",
                autoClose: 10000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }, [isError, error?.data?.message])

    useEffect(() => {
        if(isSuccess){
            toast.dismiss()
            toast.success('Account has been created.', {
                position: "bottom-right",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            const isSuccessSignup = async () => {
                const { accessToken } = await signin({ username, password }).unwrap()
                dispatch(setCredentials({ accessToken }))
                setFirstname('')
                setSurname('')
                setUsername('')
                setPassword('')
                setRoles([])
                navigate('/dash')
                toast.success('Login successful!', {
                    position: "bottom-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            isSuccessSignup()
        }
    }, [isSuccess, dispatch, navigate, password, signin, username])

    const onFirstnameChanged = e => setFirstname(e.target.value)
    const onSurnameChanged = e => setSurname(e.target.value)
    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)
    const onConfirmPasswordChanged = e => setConfirmPassword(e.target.value)
    const handleToggle = () => setPersist(prev => !prev)

    if (isLoading) return <PulseLoader color={"#FFF"} />

    const canSave = [roles.length, validFirstname, validSurname, validUsername, validPassword, validConfirmPassword, CheckConfirmPassword].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewUser({ firstname, surname, username, password, roles })       
        }
    }

    const validFirstnameClass = !validFirstname ? 'public_form__input--incomplete' : ''
    const validSurnameClass = !validSurname ? 'public_form__input--incomplete' : ''
    const validUserClass = !validUsername ? 'public_form__input--incomplete' : ''
    const validPwdClass = !validPassword ? 'public_form__input--incomplete' : ''
    const validConfirmPwdClass = !validConfirmPassword ? 'public_form__input--incomplete' : `${(confirmPassword === password) ? '' : 'public_form__input--incomplete'}`

    const content = (
        <section className="public_signin">
            <section>
                <header className='text'>
                    <h1>SIGN UP</h1>
                </header>
                <section className="public_signin_container">
                    <main className="signin">

                        <form className="public_form" onSubmit={onSaveUserClicked}>
                            <section className="public_form_name">
                                <label htmlFor="firstname">Firstname:</label>
                                <input
                                    className={`public_form__input ${validFirstnameClass}`}
                                    type="text"
                                    id="firstname"
                                    name="firstname"
                                    ref={userRef}
                                    value={firstname}
                                    onChange={onFirstnameChanged}
                                    autoComplete="off"
                                    required
                                />

                                <label htmlFor="surname">Surname:</label>
                                <input
                                    className={`public_form__input ${validSurnameClass}`}
                                    type="text"
                                    id="surname"
                                    name="surname"
                                    value={surname}
                                    onChange={onSurnameChanged}
                                    autoComplete="off"
                                    required
                                />
                            </section>

                            <label htmlFor="username">Username:</label>
                            <input
                                className={`public_form__input ${validUserClass}`}
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={onUsernameChanged}
                                autoComplete="off"
                                required
                            />

                            <label htmlFor="password">Password:</label>
                            <input
                                className={`public_form__input ${validPwdClass}`}
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={onPasswordChanged}
                                required
                            />

                            <label htmlFor="passwordconfirm">Confirm Password:</label>
                            <input
                                className={`public_form__input ${validConfirmPwdClass}`}
                                type="password"
                                id="confirmpassword"
                                name="confirmpassword"
                                value={confirmPassword}
                                onChange={onConfirmPasswordChanged}
                                required
                            />

                            <button className="public_form__submit-button">SIGN UP</button>

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
export default Signup