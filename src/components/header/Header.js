import styles from './Header.module.css'
import { IoMenuOutline, IoCloseOutline, IoLogOutOutline } from 'react-icons/io5'
import { useState, useContext } from 'react'
import useAuthentication from '../../hooks/useAuthentication'
import useUploadImage from '../../hooks/useUploadImage'
import { ColorContext } from '../../context/ColorContext'

const Header = ({ user }) => {

    const { logout } = useAuthentication()

    const { themeColor: theme, letterColor: letColor } = useContext(ColorContext)

    const [toggle, setToggle] = useState(false)
    const [imageUrl, setImageUrl] = useState('')
    const [color, setColor] = useState('')
    const [themeColor, setThemeColor] = useState('')
    const [letterColor, setLetterColor] = useState('')

    const { uploadImage, uploadColor, uploadColors } = useUploadImage(user)

    function handleSubmit(e) {
        e.preventDefault()
        if (imageUrl !== '') {
            setColor('')
            uploadImage(imageUrl, themeColor, letterColor)
        } else if (color !== '') {
            setImageUrl('')
            uploadColor(color, themeColor, letterColor)
        } else {
            uploadColors(themeColor, letterColor)
        }
    }

    return (
        <header>
            <div className={styles.header}>
                <IoMenuOutline style={{ color: `${theme}` }} onClick={() => { setToggle(true) }} className={styles.menuIcon} />
                <span style={{ color: `${theme}` }}>{user.displayName}</span>
                <div style={toggle ? { left: '0px' } : { left: '-310px' }} className={styles.slider}>
                    <div className={styles.boxCloseIcon}>
                        <IoCloseOutline onClick={() => { setToggle(false) }} className={styles.closeIcon} />
                    </div>
                    <div className={styles.sliderBody}>
                        <div>
                            <h3>visual</h3>
                            <form className={styles.form} onSubmit={handleSubmit}>
                                <label>
                                    <span>Plano de fundo:</span>
                                    <input type='file' onChange={(e) => setImageUrl(e.target.files[0])} />
                                    <p>sugestão: imagens de 1920x1080</p>
                                </label>
                                <label>
                                    <span>Cor de fundo:</span>
                                    <input type='color' onChange={(e) => setColor(e.target.value)} />
                                </label>
                                <label>
                                    <span>Tema:</span>
                                    <input type='color' onChange={(e) => setThemeColor(e.target.value)} />
                                </label>
                                <label>
                                    <span>Letras:</span>
                                    <input type='color' onChange={(e) => setLetterColor(e.target.value)} />
                                </label>
                                <button>Salvar</button>
                            </form>
                        </div>

                        <div onClick={logout} className={styles.logoutArea}>
                            <span>Sair</span>
                            <IoLogOutOutline />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header