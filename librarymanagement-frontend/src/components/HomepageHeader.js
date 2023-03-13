import { useEffect } from 'react'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import { PulseLoader } from 'react-spinners'
import { useSendSignoutMutation } from '../features/auth/authApiSlice'
import useAuth from '../hooks/useAuth'

const HomepageHeader = () => {
    const { isGuest, isUser, isLibrarian, isAdmin } = useAuth()

    const navigate = useNavigate()

    const [sendSignout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendSignoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    const onbooksClicked = () => navigate('/notes')
    const ontransectionsClicked = () => navigate('/notes')
    const onsettingsClicked = () => navigate('/settings')
    const onusersClicked = () => navigate('/users')
    const onsigninClicked = () => navigate('/signin')
    const onsignupClicked = () => navigate('/signup')
    

    let booksButton = null
    if (isUser || isLibrarian || isAdmin) {
        booksButton = (
            <button
                className="button_og"
                title="Books"
                onClick={onbooksClicked}
            >
                Books
            </button>
        )
    }

    let transectionsButton = null
    if (isLibrarian || isAdmin) {
        transectionsButton = (
            <button
                className="button_og"
                title="Transections"
                onClick={ontransectionsClicked}
            >
                Transections
            </button>
        )
    }

    let settingsButton = null
    if (isAdmin) {
        settingsButton = (
            <button
                className="button_og"
                title="Settings"
                onClick={onsettingsClicked}
            >
                Settings
            </button>
        )
    }

    let usersButton = null
    if (isUser || isLibrarian || isAdmin) {
        usersButton = (
            <button
                className="button_og"
                title="Users"
                onClick={onusersClicked}
            >
                Users
            </button>
        )
    }

    let signupButton = null
    if (isGuest) {
            signupButton = (
                <button
                    className="button_og"
                    title="SIGN UP"
                    onClick={onsignupClicked}
                >
                    SIGN UP
                </button>
            )
    }

    let signinButton = null
    if (isGuest) {
        signinButton = (
            <button
                className="button_signin"
                title="Sign In"
                onClick={onsigninClicked}
            >
                SIGN IN
            </button>
        )
    }
    
    let signoutButton = null
    if (isUser || isLibrarian || isAdmin) {
        signoutButton = (
            <button
                className="icon_button"
                title="Signout"
                onClick={sendSignout}
            >
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </button>
        )
    }

    const errClass = isError ? "errmsg" : "offscreen"

    let buttonContentLeft
    if (isLoading) {
        buttonContentLeft = <PulseLoader color={"#FFF"} />
    } 
    else {
        buttonContentLeft = (
            <>
                {booksButton}
                {transectionsButton}
                {settingsButton}
                {usersButton}
            </>
        )
    }

    let buttonContentRight
    if (isLoading) {
        buttonContentRight = <PulseLoader color={"#FFF"} />
    } 
    else {
        buttonContentRight = (
            <>
                {signupButton}
                {signinButton}
                {signoutButton}
            </>
        )
    }

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <header className="homepage_header">
                <div className={`homepage_header_container`}>
                    <nav className="homepage_header_nav">
                        {buttonContentLeft}
                    </nav>
                    <nav className="homepage_header_nav">
                        {buttonContentRight}
                    </nav>
                </div>
            </header>
        </>
    )

    return content
}
export default HomepageHeader