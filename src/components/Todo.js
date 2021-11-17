import React,{useState,useEffect} from 'react'
import styled from 'styled-components/native'
import { View,Button,TextInput,Image,Text,TouchableHighlight,StyleSheet } from "react-native";
import AbortController from "abort-controller"
import axios from "axios";
import { sample } from 'lodash'


const StyledImage = styled.Image`
width:20px;
height:20px;
display: inline-block;
cursor: pointer;
float: right;
position: absolute;
left:190px;
`
const StyledView = styled.View`
width: 250px;
margin: 0 auto;
text-align: left;
margin-top: 15px;
background: #393E46;
color: #EEEEEE;
border: none;
border-radius: 5px;
cursor: pointer;
display:flex;
flex-direction:row;
align-items: center;
`
const StyledText = styled.Text`
display: inline-block;
cursor: pointer;
float: right;
font-size: 24px;
position: absolute;
left: 225px;
`
const TextView = styled.View`
width:70%;
`
const StyledButton = styled.TouchableHighlight`
color:white;
font-size:24px;
margin-left:15px;
background:#00ADB5;
padding-left:5px;
padding-right:5px;
height:50px;
display:flex;
align-items:center;
justify-content:center;
border-radius:5px;
`
const EditText = styled.Text`
color:#EEEEEE;
font-size:20px;
`
const StyledInput = styled.TextInput`
border-radius: 8px 0 0 8px;
border: 2px solid #00ADB5;
background: transparent;
color:white;
font-size:20px;
`
const Todo = ({todo,datetime, removeTodo,toggleTodo,switchTodo}) => {
    const [value, setValue] = useState(todo.task)
    let changeHandler = (e) => setValue(e.target.value);
    let handleKeyPress= (e) =>{
        if(e.key === 'Enter'){
            switchTodo(todo.id)
        }
    }



    return (
   <View>
       { todo.edit === true ? 
     <StyledView>       
          <StyledInput
          value={value}
          onChange={changeHandler}
          onKeyPress={handleKeyPress}
            placeholder="Edit a todo item"
            autoFocus={true}
            style=""
             />
        <StyledButton underlayColor="#1a0e2e"  onPress={()=> switchTodo(todo.id)}><EditText>Update</EditText></StyledButton>
        </StyledView>

    : 
    <StyledView  style={todo.complete ? styles.item_todo_danger :styles.item_todo} key={todo.id}>  
            <TextView style={todo.complete ? styles.strike : ""} onClick={()=>toggleTodo(todo.id)} >
                <EditText>{value}</EditText>
                <EditText>{datetime}</EditText>
            </TextView>
            <StyledImage  source={{uri: 
    'https://www.pngkey.com/png/full/917-9176740_png-file-svg-outline-pictures-of-pencil.png',}} width="20" onClick={() => switchTodo(todo.id)}/>
           
            <StyledText onClick={() => removeTodo(todo.id)}>X</StyledText>
          
        </StyledView>
       }
       </View>
    )

}
const styles = StyleSheet.create({

    item_todo:{
        padding: 14,
        width: 250,
        margin: 0,
        textAlign: "left",
        marginTop: 15,
        color: "white",
        borderRadius: 5,
        cursor: "pointer"
    },
    item_todo_danger:{
        padding: 14,
        width: 250,
        margin: 0,
        textAlign: "left",
        marginTop: 15,
        color: "white",
        borderRadius: 5,
        cursor: "pointer",
        filter:"brightness(0.5)"
    },
    strike:{
        textDecorationLine: 'line-through'
    }
})

export default Todo
