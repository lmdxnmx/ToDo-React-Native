import React,{useState} from 'react'
import { View, Text, Platform, StyleSheet,Button,TextInput,TouchableHighlight } from "react-native";
import { useForm, Controller } from "react-hook-form";
import styled from 'styled-components/native'

const StyledTextInput = styled.TextInput`
padding: 14px 32px 14px 16px;
border-radius: 4px 0 0 4px;
border: 2px solid #00ADB5;
outline: none;
background: transparent;
margin-top:3px;
width:505px;
display:flex;
color:#EEEEEE;
`
const InputView = styled.View`
display:flex;
flex-direction: row;
justfify-content:center;
align-items:center;
`
const ButtonStyled = styled.TouchableHighlight`
 padding:14px;
 border: 2px solid #00ADB5;
 margin-top:3px;
`
const InputText = styled.Text`
color:#EEEEEE;
`

const Input = (props) => {
     const [value, setValue] = useState('')
     const { control } = useForm();
     let inpStr = (e) => setValue(e.target.value);
     let handleSubmit = (e) => {
         e.preventDefault()
     props.addTodo(value)
      setValue('')
     }
     let handleKeyPress= (e) =>{
         if(e.key === 'Enter'){
            handleSubmit(e)
         }
     } 
    return (
        <InputView>
        <Controller
          control={control}
          render={() => (
            <StyledTextInput
              onChange={inpStr}
              value={value}
              onKeyPress={handleKeyPress}
              placeholder="Ваши дела"
            />
            )}
            />
            <Controller
          control={control}
          render={() => (
            <ButtonStyled onPress={handleSubmit}><InputText>Добавить</InputText></ButtonStyled>
          )}
        />
        </InputView>
    )
}

export default Input
