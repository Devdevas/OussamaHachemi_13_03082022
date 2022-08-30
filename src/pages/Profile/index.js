import Header from '../../components/Header'
import Account from '../../components/Account'
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
    const [newFirstName, setNewFirstName] = useState(firstName)
    const [newLastName, setNewLastName] = useState(lastName)
    const [visibleEditForm, setVisibleEditForm] = useState(false)
    const [editFormError, setEditFormError] = useState(false)
    const dispatch = useDispatch()

    function toggleEditForm() {
        if (!visibleEditForm) {
            setNewFirstName("")
            setNewLastName("")
        }
        setVisibleEditForm(!visibleEditForm)
        setEditFormError(false)
    }

    function updateProfileName() {
        if (!newFirstName && !newLastName) {
            setEditFormError(true)
            return
        }
        const updatedFirstName = newFirstName || firstName;
        const updatedLastName = newLastName || lastName;
        dispatch(updateProfile(updatedFirstName, updatedLastName, token));
        toggleEditForm()
    }

    dispatch(getProfile(token))

    return (
        <div>
            <Header navText={`${firstName}`} />
            <main className="bg-profil bg-dark">
                <div className="header">
                    <h1>Welcome back<br />{`${firstName} ${lastName}!`}</h1>
                    {!visibleEditForm ? <button className="edit-button" onClick={toggleEditForm}>Edit Name</button>
                        : <div>
                            <div className='edit-inputs'>
                                <div className={editFormError ? "input-wrapper error" : "input-wrapper"}>
                                    <input type="text" placeholder='Firstname' id="firstname" onInput={(e) => setNewFirstName(e.target.value)} />
                                </div>
                                <div className={editFormError ? "input-wrapper error" : "input-wrapper"}>
                                    <input type="text" placeholder='Lastname' id="lastname" onInput={(e) => setNewLastName(e.target.value)} />
                                </div>
                            </div>
                            <div className='save-cancel-buttons'>
                                <button className="edit-button" onClick={updateProfileName}>Save</button>
                                <button className="edit-button" onClick={toggleEditForm}>Cancel</button>
                            </div>
                        </div>}
                </div>
                <h2 className="sr-only">Accounts</h2>
                <Account title='Argent Bank Checking (x8349)' amount='$2,082.79' description='Available Balance' />
                <Account title='Argent Bank Savings (x6712)' amount='$10,928.42' description='Available Balance' />
                <Account title='Argent Bank Credit Card (x8349)' amount='$184.30' description='Current Balance' />
            </main>
            <Footer />
        </div>
    )
}

export default Profile