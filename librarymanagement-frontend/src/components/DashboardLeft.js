import { useEffect } from 'react'
import { faArrowRightFromBracket, faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import { PulseLoader } from 'react-spinners'
import { useSendSignoutMutation } from '../features/auth/authApiSlice'
import useAuth from '../hooks/useAuth'

const DashboardLeft = () => {
    const { username, status, isUser, isLibrarian, isAdmin } = useAuth()

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

    const ondashboardClicked = () => navigate('/dash')
    const onbooksClicked = () => navigate('/notes')
    const ontransectionsClicked = () => navigate('/notes')
    const onsettingsClicked = () => navigate('/settings')
    const onusersClicked = () => navigate('/users')
    
    let dashboardButton = null
    if (isUser || isLibrarian || isAdmin) {
        dashboardButton = (
            <button
                className="button_og"
                title="Dashboard"
                onClick={ondashboardClicked}
            >
                Dashboard
            </button>
        )
    }

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

    let buttonContentTop
    if (isLoading) {
        buttonContentTop = <PulseLoader color={"#FFF"} />
    } else {
        buttonContentTop = (
            <>
                {dashboardButton}
                {booksButton}
                {transectionsButton}
                {settingsButton}
                {usersButton}
            </>
        )
    }

    let buttonContentBottom
    if (isLoading) {
        buttonContentBottom = <PulseLoader color={"#FFF"} />
    } 
    else {
        buttonContentBottom = (
            <>
                {signoutButton}
            </>
        )
    }

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>
            <section className = "dashboard_left">
                <nav className="icon_user">
                    <nav className="icon_user_nav">
                        <FontAwesomeIcon icon={faCircleUser} />
                    </nav>
                    <nav className="text">
                        <p>{username}</p>
                        <p>status : {status}</p>
                    </nav>
                </nav>
                <section className="manu">
                    <nav className="dashboard_left_nav">
                        {buttonContentTop}
                    </nav>
                </section>
                <section className="manu_logout">
                    <nav className="dashboard_left_nav">
                        {buttonContentBottom}
                    </nav>
                </section>
            </section>
        </>
    )

    return content
}
export default DashboardLeft