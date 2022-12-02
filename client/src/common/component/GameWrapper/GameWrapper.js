import React, {useContext, useState} from 'react';
import style from './GameWrapper.module.scss'
import Card from "../Card/Card";
import AuthContext from "../../context/Auth/AuthContext";
import GameContext from "../../context/Game/GameContext";
import Modal from "../Modal/Modal";
import heart from "../../assets/icons/heart.svg"
import {toast} from 'react-toastify'
import {herpes} from "../../context/Game/Boss/herpes";
import {hepatiteB} from "../../context/Game/Boss/hepatiteB";
import cardsListFromJson from "../../utils/seedCards.json"

const GameWrapper = () => {
    const {user} = useContext(AuthContext)
    const {dispatch, currentBoss} = useContext(GameContext)
    console.log(currentBoss)

    const [showModal, setShowModal] = useState(false);
    const [showMonsterModal, setShowMonsterModal] = useState(false)
    const [cardsList, setCardsList] = useState(cardsListFromJson.filter((card) => card.boss === currentBoss.name));
    const handleSelectCard = (cardFromChild) => {
        setCardsList(cardsList.map((cardObject) => ({
                ...cardObject,
                selected: cardObject.cardName === cardFromChild.cardName
            }
        )))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const selectedCard = cardsList.filter((card) => card.selected)[0]
        if (selectedCard) {
            //    KEMO TU FAIS TON CODE ICI
            switch (currentBoss.name) {
                case "Herpès génital":
                    const {herpes} = require("../../context/Game/Boss/herpes")
                    const attackHerpes = herpes(selectedCard, user, currentBoss)
                    dispatch({type: 'SET_CURRENT_BOSS', payload: attackHerpes.boss})
                    dispatch({type: 'SET_CURRENT_USER', payload: attackHerpes.user})
                    break
                case "Hépatite B":
                    const {hepatiteB} = require("../../context/Game/Boss/hepatiteB")
                    const attackHepatite = hepatiteB(selectedCard, user, currentBoss)
                    dispatch({type: 'SET_CURRENT_BOSS', payload: attackHepatite.boss})
                    dispatch({type: 'SET_CURRENT_USER', payload: attackHepatite.user})
                    break
                case "Syphilis":
                    const {syphilis} = require("../../context/Game/Boss/syphilis")
                    const attackSyphilis = syphilis(selectedCard, user, currentBoss)
                    dispatch({type: 'SET_CURRENT_BOSS', payload: attackSyphilis.boss})
                    dispatch({type: 'SET_CURRENT_USER', payload: attackSyphilis.user})
                    break
                case "Papillomavirus":
                    break
                case "Chlamydiose":
                    break
                case "VIH":
                    break
                default:
                    toast.error("Virus inconnu")
            }

        }

    }
    const handleCloseModal = () => {
        setShowModal(false)
    }
    const handleCloseMonsterModal = () => {
        setShowMonsterModal(false)
    }
    const handleNext = () => {
    }
    return (
        <div className={style.container}>
            <div className={style.monsterWrapper}>
                <img src={`${currentBoss?.image.replaceAll('client/public/', './')}` || "./logo192.png"}
                     alt={"monstername"}/>
                <span className={style.monsterPV} style={{backgroundImage: `url(${heart}`}}>{currentBoss?.pv}</span>
                <button type={"button"} onClick={() => setShowMonsterModal(true)}
                        className={style.monsterButton}>?
                </button>
                <div className={style.monsterInfosWrapper}>
                    <span className={style.monsterName}>{currentBoss?.name}</span>

                </div>
                <Modal setShowModal={setShowMonsterModal} showModal={showMonsterModal}>
                    <div className={style.wrapperText}>
                        <span className={style.monsterName}>{currentBoss?.name}</span>
                        <span className={style.monsterText}>{currentBoss?.description}</span>
                    </div>
                    <div className={style.wrapperButton}>
                        <button type={"button"} className={`${style.cancelButton}`}
                                onClick={handleCloseMonsterModal}>Cancel
                        </button>
                    </div>
                </Modal>
            </div>

            <div className={style.userWrapper}>
                <div className={style.userInfosWrapper}>
                    <img src={user.avatar || "/logo192.png"} alt="avatar"/>
                    <span className={style.userPv} style={{backgroundImage: `url(${heart}`}}>{user.pv}</span>
                    <span className={style.userUsername}>{user.username}</span>
                </div>
                <form className={style.formCardWrapper} onSubmit={handleSubmit}>
                    <div className={style.cardWrapper}>
                        {cardsList.map((card, key) => (
                            <Card key={key} card={card} handleSelect={handleSelectCard}/>
                        ))}

                    </div>
                    <button type={"submit"}>Jouer cette carte</button>
                </form>
            </div>
            <div className={style.chat}>
                ChatInfos
            </div>
            <Modal setShowModal={setShowModal} showModal={showModal}>
                <div className={style.wrapperText}>
                    VictoryMessage
                </div>
                <div className={style.wrapperButton}>
                    <button type={"button"} className={style.cancelButton} onClick={handleCloseModal}>Cancel</button>
                    <button type={"button"} onClick={handleNext}>Suivant</button>
                </div>
            </Modal>
        </div>
    );
};

export default GameWrapper;