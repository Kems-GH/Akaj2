import React, {useContext, useState} from 'react';
import style from './Welcome.module.scss'
import {createUser} from "../../context/Auth/AuthActions";
import {toast} from 'react-toastify'

const Welcome = () => {
    const [states, setStates] = useState({
        username: {value: '', error: false},
        avatarQuery: {value: '', error: false}
    });
    const {username, avatarQuery} = states;
    const onSubmit = async (e) => {
        e.preventDefault();
        toast.success("test")
        try {
            const res = await createUser(avatarQuery)
        } catch (e) {

            console.log(e)
            toast.error("Une erreur est survenue, veuillez vérifier vos paramètres");
        }
    }
    const onChange = (e) => {
        setStates((precStates) => ({
            ...precStates,
            [e.target.id]: {value: e.target.value, error: false}
        }));
    }
    return (
        <div className={style.container}>
            <form onSubmit={onSubmit} className={style.form}>
                <div className={style.inputGroup}>
                    <label htmlFor="username">Pseudo</label>
                    <input type="text" value={username.value} id={"username"} name={"username"} onChange={onChange}
                           required/>
                    {username.error ? <span>Une erreur est survenue</span> : null}
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="avatarQuery">Décrivez votre avatar</label>
                    <input type="text" value={avatarQuery.value} id={"avatarQuery"} name={"avatarQuery"}
                           onChange={onChange}
                           required/>
                    {avatarQuery.error ? <span>Une erreur est survenue au chargement de Dall-E</span> : null}

                    <p>Afin de générer un avatar original, nous utilisons l&apos;IA Dall-E.</p>
                </div>
                <button type={"submit"}>Jouer</button>
            </form>
        </div>
    );
};

export default Welcome;