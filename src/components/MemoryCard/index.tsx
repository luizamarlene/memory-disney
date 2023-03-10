import React from 'react'
import { Image, ImageSourcePropType, TouchableOpacityProps } from 'react-native'
import bela from '../../imgs/bela.png'
import adormecida from '../../imgs/adormecida.png'
import sin from '../../imgs/sin.png'
import mulan from '../../imgs/mulan.png'
import ariel from '../../imgs/ariel.png'
import merida from '../../imgs/merida.png'
import branca from '../../imgs/branca.png'
import cinderela from '../../imgs/cinderela.png'
import tina from '../../imgs/tina.png'
import * as S from './styles'

export enum PRINCESS_ENUM {
    bela = 'bela',
    adormecida = 'adormecida',
    sin = 'sin',
    mulan = 'mulan',
    ariel = 'ariel',
    merida = 'merida',
    branca = 'branca',
    cinderela = 'cinderela',
    tina = 'tina'
}

const PRINCESS: { [k: string]: ImageSourcePropType } = {
    bela,
    adormecida,
    mulan,
    sin,
    ariel,
    merida,
    branca,
    cinderela,
    tina
}

type MemoryCardProps = {
    princess: keyof typeof PRINCESS_ENUM
    visible: boolean,
    selected: boolean,
    
} & TouchableOpacityProps

export default function ({ princess, visible, selected, ...rest }: MemoryCardProps) {
    return (
        <S.Container selected={selected} visible={visible} {...rest}>
            {(selected || visible) &&
                (<S.Avatar
                    source={PRINCESS[princess]} />)}
        </S.Container>
    )
}