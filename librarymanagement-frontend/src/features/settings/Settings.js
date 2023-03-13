import { useNavigate } from 'react-router-dom'
import useTitle from '../../hooks/useTitle'

const Settings = () => {
    useTitle('Library Management System')

    const navigate = useNavigate()
    const onbookslisttableClicked = () => navigate('/settings/books')
    const onnewbooksClicked = () => navigate('/settings/books/new')
    const onuserslistClicked = () => navigate('/settings/userslist')
    const onnewusersClicked = () => navigate('/settings/userslist/new')
    

    let bookslistButton = (
            <button
                className="button_og"
                title="Bookslist"
                onClick={onbookslisttableClicked}
            >
                Books list Table
            </button>
        )

    let newbooksButton = (
            <button
                className="button_og"
                title="New books"
                onClick={onnewbooksClicked}
            >
                New books
            </button>
        )

    let userslistButton = (
            <button
                className="button_og"
                title="Users list Table"
                onClick={onuserslistClicked}
            >
                Users list Table
            </button>
        )

    let newusersButton = (
                <button
                    className="button_og"
                    title="New users"
                    onClick={onnewusersClicked}
                >
                    New users
                </button>
            )

    return (
        <main className='settings'>
            <div>
                <h2>Settings</h2>
            </div>
            <nav className='settings_nav'>
                {bookslistButton}
            </nav>
            <nav className='settings_nav'>
                {newbooksButton}
            </nav>
            <nav className='settings_nav'>
                {userslistButton}
            </nav>
            <nav className='settings_nav'>
                {newusersButton}
            </nav>
        </main>
    )
}
export default Settings