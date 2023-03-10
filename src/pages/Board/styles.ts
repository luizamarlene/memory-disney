import styled, {css} from 'styled-components/native'
import { FlatList , Platform, StatusBar } from "react-native";
import Label from '../../components/Label';

export const Container = styled.SafeAreaView`
	flex: 1;
	align-items: center;
	justify-content: flex-start;
	padding-top: ${Platform.OS === "android" ? 40 : 0}px;
`

export const ButtonsContainer = styled.View`
	align-items: center;
	justify-content: center;
	flex-direction: row;
`
export const Teste = styled.View<{ size: number }>`

	flex-direction: row;
	flex-wrap: wrap;
	width: 350px;
	justify-content: center;
	align-content: center;
	align-items: center;
	align-self: center;
	`

export const CardContainer = styled.ScrollView<{ size: number }>`
	width: 350px;
	align-self: center;
	height: ${({ size }) => size * 60}px;
	
	
	
	align-content: center;
`

export const FooterContainer = styled.View`
	flex-direction: row;
	justify-content: space-around;
	align-content: center;
	width: 90%;
`

export const Cards = styled(FlatList)`
	
	
	background-color: blue;

	justify-items: center;
`