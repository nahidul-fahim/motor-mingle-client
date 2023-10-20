import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import app from "../../Firebase/Firebase.config";



const auth = getAuth(app);

export const AuthContext = createContext('');

const googleProvider = new GoogleAuthProvider();



const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState('')
    const [authLoading, setAuthLoading] = useState(true);


    // email-password sign up function
    const createNewUser = (email, password) => {
        setAuthLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };



    // Email-password sign up profile info update

    const updateProfileInfo = (currentUsersInfo, username, photo) => {
        updateProfile(currentUsersInfo, {
            displayName: username, photoURL: photo
        })
            .then(() => {
                console.log("Profile info updated")
            })
            .catch(() => {
                console.log("Profile info update failed")
            })
    }


    // email-password log in function

    const accessExistingUser = (email, password) => {
        setAuthLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }


    //Google sign up function

    const createNewUserByGoogle = () => {
        setAuthLoading(true);
        return signInWithPopup(auth, googleProvider);
    };


    //Sign out

    const signOutUser = () => {
        setAuthLoading(true);
        return signOut(auth);
    }


    //keep trace on logged in user

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setAuthLoading(false);
        });
        return () => {
            unSubscribe();
        }
    }, [])


    const authInfo = { createNewUser, createNewUserByGoogle, signOutUser, currentUser, accessExistingUser, updateProfileInfo, authLoading };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.node,
}