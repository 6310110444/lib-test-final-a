import { useParams } from 'react-router-dom'
import EditBookForm from './EditBookForm'
import { useGetNotesQuery } from './booksApiSlice'
import { useGetUsersQuery } from '../users/usersApiSlice'
import useAuth from '../../hooks/useAuth'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle'

const EditBook = () => {
    useTitle('Book')

    const { id } = useParams()

    const { username, isManager, isAdmin } = useAuth()

    const { Book } = useGetNotesQuery("BooksList", {
        selectFromResult: ({ data }) => ({
            Book: data?.entities[id]
        }),
    })

    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    if (!Book || !Book?.length) return <PulseLoader color={"#FFF"} />


    if (!isManager && !isAdmin) {
        if (Book.username !== username) {
            return <p className="errmsg">No access</p>
        }
    }

    const content = <EditBookForm Book={Book} users={users} />

    return content
}
export default EditBook