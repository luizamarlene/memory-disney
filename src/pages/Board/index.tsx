import React, { useEffect, useMemo, useState } from 'react'

import Label from '../../components/Label'

import * as S from './styles'
import Colors from '../../utils/colors';
import MemoryCard, { PRINCESS_ENUM } from '../../components/MemoryCard';
import Button from '../../components/Button';
import NewModal from './NewModal';
import VitoryModal from './VitoryModal';
import { sizeState, victoriesState, defeatsState, movesState, timerState } from '../../../src/atoms/gameState';
import { useRecoilValue, useRecoilState } from 'recoil';

type ImagesCards = {
    princess: keyof typeof PRINCESS_ENUM
    selected: boolean
    visible: boolean
}[]

const imagesBySize = {
    3: [
        PRINCESS_ENUM.bela,
        PRINCESS_ENUM.mulan,
        PRINCESS_ENUM.ariel
    ],
    6: [
        PRINCESS_ENUM.bela,
        PRINCESS_ENUM.mulan,
        PRINCESS_ENUM.ariel,
        PRINCESS_ENUM.adormecida,
        PRINCESS_ENUM.merida,
        PRINCESS_ENUM.tina,
    ],
    9: [
        PRINCESS_ENUM.bela,
        PRINCESS_ENUM.mulan,
        PRINCESS_ENUM.ariel,
        PRINCESS_ENUM.adormecida,
        PRINCESS_ENUM.merida,
        PRINCESS_ENUM.tina,
        PRINCESS_ENUM.branca,
        PRINCESS_ENUM.cinderela,
        PRINCESS_ENUM.sin,
    ],
}

export default function Board() {
    const [newModal, setNewModal] = useState(false);
    const [victoryModal, setVictoryModal] = useState(false);
    const [victories, setVictories] = useRecoilState(victoriesState)
    const [defeats, setDefeats] = useRecoilState(defeatsState)
    const [moves, setMoves] = useRecoilState(movesState)
    const [timer, setTimerState] = useRecoilState(timerState)
    const [imagesCards, setImagesCards] = useState<ImagesCards>([]);
    const size = useRecoilValue(sizeState);
    const [timerInterval, setTimerInterval] = useState<NodeJS.Timer>(null as any);


    const onHandleNewModal = () => {
        setNewModal(true)
        setVictoryModal(false)
        setDefeats(defeats + 1)
        clearInterval(timerInterval);
    }

    const onHandleVictoryModal = () => {
        setVictoryModal(true)
        setNewModal(false)
    }

    const verifyEqualCards = () => {
        const newImagesCards = [...imagesCards]
        const selectedCards = newImagesCards.filter((item) => item.selected)

        if (selectedCards.length === 2) {
            const [card1, card2] = selectedCards
            if (card1.princess === card2.princess) {
                card1.selected = false
                card2.selected = false
                card1.visible = true
                card2.visible = true
            } else {
                card1.selected = false
                card2.selected = false
            }
            setImagesCards(newImagesCards)

            const visibleCards = newImagesCards.filter((item) => item.visible)
            if (visibleCards.length === (size * 2)) {
                setVictories(victories + 1)
                setVictoryModal(true)
                setTimerState('0:00')
                setMoves(0)
                clearInterval(timerInterval);
                setTimerInterval(null as any);
            }
        }
    }

    const handleCardPress = async (indexCard: number) => {
        updateTimer()
        setMoves(moves + 1)
        const newImagesCards = [...imagesCards]

        const selectedItem = newImagesCards[indexCard]
        if (!selectedItem) {
            throw new Error('Item not found')
        }

        const selectedCards = newImagesCards.filter((item) => item.selected)
        if (selectedCards.length < 2) {
            newImagesCards[indexCard].selected = true
            setImagesCards(newImagesCards)
        }
    }

    const checkCards = async () => {
        const selectedCards = imagesCards.filter((item) => item.selected)
        if (selectedCards.length === 2) {
            await new Promise(res => {
                setTimeout(res, 1000)
            });
            verifyEqualCards()
        }
    }

    useEffect(() => {
        checkCards()
    }, [imagesCards])

    const updateTimer = () => {
        if (timerInterval === null) {
            let counter = 0;

            let interval = setInterval(() => {
                counter++;
                const dateObj = new Date(counter * 1000);
                const minutes = dateObj.getUTCMinutes();
                const seconds = dateObj.getSeconds();
    
                const timeString = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
    
                setTimerState(timeString)
            }, 1000);

            setTimerInterval(interval)
        }
    }

    useEffect(() => {
        setImagesCards(imagesBySize[size]
            .concat(imagesBySize[size])
            .sort(() => Math.random() - 0.5)
            .map((image) => ({ princess: image, selected: false, visible: false })))
    }, [size, defeats, victories])

    return (
        <S.Container>
            <Label color={Colors.purple} fontSize={50}>Mem??ria</Label>
            <S.ButtonsContainer>
                <Button backgroundColor={Colors.pink} onPress={() => onHandleVictoryModal()}>
                    <Label color={Colors.purple}>Reiniciar</Label>
                </Button>
                <Button backgroundColor={Colors.purple} onPress={() => onHandleNewModal()}>
                    <Label color={Colors.pink}>Novo</Label>
                </Button>
            </S.ButtonsContainer>
            <NewModal open={newModal} onClosed={() => setNewModal(false)} />
            <VitoryModal
                open={victoryModal}
                onClosed={() => setVictoryModal(false)}
                setNewModal={() => { onHandleNewModal()}
            } />

            <S.CardContainer
                size={size}
                centerContent={true}
                contentContainerStyle={{
                    flexGrow: 1,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    alignContent: 'center',
                }}
            >
                {
                    imagesCards.map((item, index) => (
                        <MemoryCard
                            key={index}
                            princess={item.princess}
                            selected={item.selected}
                            visible={item.visible}
                            onPress={() => handleCardPress(index)}
                        />
                    ))
                }
            </S.CardContainer>

            <S.FooterContainer>
                <Label color={Colors.purple} >Tempo: {timer}</Label>
                <Label color={Colors.purple}>Tentativas: {moves}</Label>
            </S.FooterContainer>

        </S.Container>
    )
}