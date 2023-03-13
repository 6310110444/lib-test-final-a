import { useState, useEffect } from "react"
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { ROLES } from "../../config/roles"
import useAuth from "../../hooks/useAuth"

const NAME_REGEX = /^[A-z]{1,50}$/
const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const EditUserForm = ({ user }) => {
    const { isAdmin } = useAuth()

    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

    const [deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteUserMutation()

    const navigate = useNavigate()

    const [firstname, setFirstname] = useState(user.firstname)
    const [validFirstname, setValidFirstname] = useState(false)
    const [surname, setSurname] = useState(user.surname)
    const [validSurname, setValidSurname] = useState(false)
    const [username, setUsername] = useState(user.username)
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(user.roles)
    const [active, setActive] = useState(user.active)

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
        console.log(isSuccess)
        if (isSuccess || isDelSuccess) {
            setFirstname('')
            setSurname('')
            setUsername('')
            setPassword('')
            setRoles([])
            navigate('/users')
        }

    }, [isSuccess, isDelSuccess, navigate, isAdmin])

    const onFirstnameChanged = e => setFirstname(e.target.value)
    const onSurnameChanged = e => setSurname(e.target.value)
    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        setRoles(values)
    }

    const onActiveChanged = () => setActive(prev => !prev)

    const onSaveUserClicked = async (e) => {
        if (password) {
            await updateUser({ id: user.id, firstname, surname, username, password, roles, active })
        } else {
            await updateUser({ id: user.id, firstname, surname, username, roles, active })
        }
    }

    const onDeleteUserClicked = async () => {
        await deleteUser({ id: user.id })
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}

            > {role}</option >
        )
    })

    let canSave
    if (password) {
        canSave = [roles.length, validFirstname, validSurname, validUsername, validPassword].every(Boolean) && !isLoading
    } else {
        canSave = [roles.length, validFirstname, validSurname, validUsername].every(Boolean) && !isLoading
    }

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validFirstnameClass = !validFirstname ? 'public_form__input--incomplete' : ''
    const validSurnameClass = !validSurname ? 'public_form__input--incomplete' : ''
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = password && !validPassword ? 'form__input--incomplete' : ''
    const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

    let rolesselect = null
    if (isAdmin){
        rolesselect = (
            <>
                <label className="form__label form__checkbox-container" htmlFor="user-active">
                    ACTIVE:
                    <input
                        className="form__checkbox"
                        id="user-active"
                        name="user-active"
                        type="checkbox"
                        checked={active}
                        onChange={onActiveChanged}
                    />
                </label>
                <label className="form__label" htmlFor="roles">
                    ASSIGNED ROLES:
                </label>
                <select
                    id="roles"
                    name="roles"
                    className={`form__select ${validRolesClass}`}
                    multiple={true}
                    size="3"
                    value={roles}
                    onChange={onRolesChanged}
                >
                    {options}
                </select>
            </>
        )
    }
    let deletebutton = null
    if (isAdmin){
        deletebutton = (
            <button
                className="button_og"
                title="Delete"
                onClick={onDeleteUserClicked}
            >
                Delete
            </button>
        )
    }

    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit User</h2>
                </div>
                <label className="form__label" htmlFor="firstname">
                    Username: <span className="nowrap">[3-20 letters]</span></label>
                <input
                    className={`form__input ${validFirstnameClass}`}
                    id="firstname"
                    name="firstname"
                    type="text"
                    autoComplete="off"
                    value={firstname}
                    onChange={onFirstnameChanged}
                />
                <label className="form__label" htmlFor="surname">
                    Username: <span className="nowrap">[3-20 letters]</span></label>
                <input
                    className={`form__input ${validSurnameClass}`}
                    id="surname"
                    name="surname"
                    type="text"
                    autoComplete="off"
                    value={surname}
                    onChange={onSurnameChanged}
                />
                <label className="form__label" htmlFor="username">
                    Username: <span className="nowrap">[3-20 letters]</span></label>
                <input
                    className={`form__input ${validUserClass}`}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={username}
                    onChange={onUsernameChanged}
                />

                <label className="form__label" htmlFor="password">
                    Password: <span className="nowrap">[empty = no change]</span> <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                <input
                    className={`form__input ${validPwdClass}`}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onPasswordChanged}
                />
                {rolesselect}
            </form>
            <div className="edituserform">
                <button
                    className="button_og"
                    title="Save"
                    onClick={onSaveUserClicked}
                    disabled={!canSave}
                >
                    Save
                </button>
                {deletebutton}
            </div>
        </>
    )

    return content
}
export default EditUserForm