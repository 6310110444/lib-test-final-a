import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isLibrarian = false
    let isAdmin = false
    let isUser = false
    let isGuest = true
    let status = "Guest"

    if (token) {
        const decoded = jwtDecode(token)
        const { username, roles } = decoded.UserInfo

        isLibrarian = roles.includes('Librarian')
        isAdmin = roles.includes('Admin')
        isUser = roles.includes('User')
        isGuest = roles.includes('Guest')

        if (isLibrarian) status = "Librarian"
        if (isAdmin) status = "Admin"
        if (isUser) status = "User"
        if (isGuest) status = "Guest"

        return { username, roles, status, isAdmin, isLibrarian, isUser , isGuest }
    }
    

    return { username: ['Guest'], roles: ['Guest'], isGuest ,isUser, isLibrarian, isAdmin, status}
}
export default useAuth