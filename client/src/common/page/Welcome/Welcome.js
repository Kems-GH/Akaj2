import React, {useContext, useState} from 'react';
import style from './Welcome.module.scss'
import {createUser} from "../../context/Auth/AuthActions";
import AuthContext from '../../context/Auth/AuthContext';
import {toast} from 'react-toastify'
import { SQLInjection } from '../../utils/HonneyPot';

const Welcome = () => {
    const {dispatch} = useContext(AuthContext);
    const [states, setStates] = useState({
        username: {value: '', error: false},
        avatarQuery: {value: '', error: false}
    });
    const [SQLInjections,setSQLInjection] = useState({
        username : false,
        avatarQuery: false

    })
    const {username, avatarQuery} = states;
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            setSQLInjection({
                username: SQLInjection(username.value),
                avatarQuery: SQLInjection(avatarQuery.value),
            })
            const res = await createUser(avatarQuery.value)
            dispatch({type: "SET_CURRENT_USER", payload: {username: username.value, avatar: res}}); 
        } catch (e) {
            toast.error("Une erreur est survenue, veuillez vérifier vos paramètres.");
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
                    <label htmlFor="username">Pseudo du joueur</label>
                    <input type="text" value={username.value} id={"username"} name={"username"} onChange={onChange}
                           required/>
                    
                    {username.error ? <span>Une erreur est survenue</span> : null}
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="avatarQuery">Créez votre avatar grâce à des mots clés</label>
                    <input type="text" value={avatarQuery.value} id={"avatarQuery"} name={"avatarQuery"}
                           onChange={onChange}
                           required/>
                    {avatarQuery.error ? <span>Une erreur est survenue au chargement de Dall-E</span> : null}

                    <p>Afin de générer un avatar original, nous utilisons l&apos;IA Dall-E.</p>
                </div>
                <button type={"submit"}>Jouer</button>
                {SQLInjections.username ? <div>Connecté, recharger la page</div> : null}
                {SQLInjections.avatarQuery ? <div>Connecté, recharger la page</div> : null}
            </form>
        </div>
    );
};

export default Welcome;