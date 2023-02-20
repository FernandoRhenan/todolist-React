import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from '../services/firebaseConfig'
import { doc, setDoc } from "firebase/firestore";


import { useEffect, useState } from "react";

const useUploadImage = (user) => {

    const [imgUrl, setImgUrl] = useState('')
    const [file, setFile] = useState('')
    const [themeColor, setThemeColor] = useState('')
    const [letterColor, setLetterColor] = useState('')

    useEffect(() => {
        if (imgUrl !== '' && file !== '') {
            setDoc(doc(db, user.uid, 'background'), {
                'url': imgUrl,
                'file_name': file,
                'color': null,
                'themeColor': themeColor,
                'letterColor': letterColor,
                'userId': user.uid
            }, { merge: true })
        }
    }, [imgUrl, file, themeColor, letterColor])

    const uploadImage = async (file, themeColor, letterColor) => {

        setFile(file.name)

        try {
            const storageRef = ref(storage, `${user.uid}/${file.name}`)
            const uploadTask = uploadBytesResumable(storageRef, file)

            await uploadTask.on(
                "state_changed",
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(url => {
                        setImgUrl(url)
                        setThemeColor(themeColor)
                        setLetterColor(letterColor)
                    }).catch(err => console.log(err))
                }
            )
        } catch (err) {
            console.log(err)
        }

    }

    const uploadColor = async (color, themeColor, letterColor) => {
        try {
            await setDoc(doc(db, user.uid, 'background'), {
                'url': null,
                'file_name': null,
                'color': color,
                'themeColor': themeColor,
                'letterColor': letterColor,
                'userId': user.uid
            }, { merge: true })
        } catch (err) {
            console.log(err)
        }
    }

    const uploadColors = async (themeColor, letterColor) => {
        try {
            await setDoc(doc(db, user.uid, 'background'), {
                'themeColor': themeColor,
                'letterColor': letterColor,
            }, { merge: true })
        } catch (err) {
            console.log(err)
        }


    }

    return { uploadImage, uploadColor, uploadColors }
}

export default useUploadImage