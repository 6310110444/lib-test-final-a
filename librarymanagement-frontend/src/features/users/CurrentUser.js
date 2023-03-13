import { useGetUsersQuery } from './usersApiSlice'
import { memo } from 'react'
import useAuth from '../../hooks/useAuth'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

const CurrentUser = ({ userId }) => {

    const { username } = useAuth();

    const navigate = useNavigate()

    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[userId]
        }),
    })


    if (user) {
        const handleEdit = () => navigate(`/users/${userId}`)

        const userRolesString = user.roles.toString().replaceAll(',', ', ')

        if((user.username === username)) {
            return (
                <section className='currentuser'>
                    <nav className="icon">
                        <FontAwesomeIcon icon={faCircleUser} />
                    </nav>
                    <section>Name: {user.firstname} {user.surname}</section>
                    <section>Username: {user.username}</section>
                    <section>Permission: {userRolesString}</section>
                    <section>
                        <button
                            className="button_og"
                            onClick={handleEdit}
                        >
                            Edit User
                        </button>
                    </section>
                </section>
            )
        }

    } else return null
}

const memoizedCurrentUser = memo(CurrentUser)

export default memoizedCurrentUser