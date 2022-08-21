import Header from '../../components/Header'
import Acount from '../../components/Acount'
import Footer from '../../components/Footer'
import './style.css'
import { getProfile, updateProfile } from '../../features/userAuth'
import { useDispatch, useSelector } from 'react-redux'
import { selectfirstName, selectlastName, selectToken } from '../../utils/selectors'
import { useState } from 'react'

function Profile() {
    const token = useSelector(selectToken)
    const firstName = useSelector(selectfirstName)
    const lastName = useSelector(selectlastName)
    const [newFirstName, setNewFirstName] = useState('')
    const [newLastName, setNewLastName] = useState('')
    const [isVisible, setIsVisible] = useState(false)
    const [inputError, setInputError] = useState(false)
    const dispatch = useDispatch()

    function toggleEditForm() {
        setIsVisible(!isVisible)
        setInputError(false)
        setNewFirstName("")
        setNewLastName("")
    }

    function updateProfileName() {
        if (!newFirstName && !newLastName) {
            setInputError(true)
            return
        }
        toggleEditForm()
        if (!newFirstName && newLastName) {
            dispatch(updateProfile(firstName, newLastName, token))
        } else if (newFirstName && !newLastName) {
            dispatch(updateProfile(newFirstName, lastName, token))
        } else {
            dispatch(updateProfile(newFirstName, newLastName, token))
        }
    }

    dispatch(getProfile(token))

    return (
        <div>
            <Header navText={`${firstName}`} />
            <main className="bg-profil bg-dark">
                <div className="header">
                    <h1>Welcome back<br />{`${firstName} ${lastName}!`}</h1>
                    {!isVisible ? <button className="edit-button" onClick={toggleEditForm}>Edit Name</button> : null}
                    {isVisible ? <div><div className='edit-inputs'>
                        <div className={inputError ? "input-wrapper error" : "input-wrapper"}>
                            <input type="text" placeholder='Firstname' id="firstname" onInput={(e) => setNewFirstName(e.target.value)} />
                        </div>
                        <div className={inputError ? "input-wrapper error" : "input-wrapper"}>
                            <input type="text" placeholder='Lastname' id="lastname" onInput={(e) => setNewLastName(e.target.value)} />
                        </div>
                    </div>
                        <div className='save-cancel-buttons'>
                            <button className="edit-button" onClick={updateProfileName}>Save</button>
                            <button className="edit-button" onClick={toggleEditForm}>Cancel</button>
                        </div>
                    </div> : null}
                </div>
                <h2 className="sr-only">Accounts</h2>
                <Acount tilte='Argent Bank Checking (x8349)' amount='$2,082.79' description='Available Balance' />
                <Acount tilte='Argent Bank Savings (x6712)' amount='$10,928.42' description='Available Balance' />
                <Acount tilte='Argent Bank Credit Card (x8349)' amount='$184.30' description='Current Balance' />
            </main>
            <Footer />
        </div>
    )
}

export default Profile