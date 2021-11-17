import React, { useState, useEffect } from "react";
import Todo from "./components/Todo.js"
import TodoInput from "./components/TodoInput.js"
import styled from 'styled-components/native'
import { View, Text, Platform, StyleSheet,Button, TouchableHighlight } from "react-native";
import AbortController from "abort-controller"
import axios from "axios";
import { sample } from 'lodash'

const StyledButton = styled.TouchableHighlight`
padding: 16px 7px;
border: none;
border-radius: 0 4px 4px 0;
cursor: pointer;
background:#393E46;
color: #fff;
text-transform: capitalize;
width:35%;
display:flex;
margin:0 auto;
`
const StyledText = styled.Text`
color:red;
font-size:24px;
color:#00ADB5;
`
const StyledView = styled.View`
text-align: center;
`
const TextButton = styled.Text`
color:#EEEEEE;
 font-size:18px;
`
const InputContainer = styled.View`
display:flex;
justify-content: center;
align-items: center;
`
const App = () => {
  const [todos,setTodos] = useState([]);

   async function data(){
   const res = await axios("http://worldtimeapi.org/api/timezone/Europe/Moscow")
   return await res;
  }
  const addTodo = async(userInput) =>{
    let item = await data() 
         console.log(item.data.datetime)
    if(userInput){
      const newItem ={
        id:Math.random().toString(36).substr(2,9),
        task:userInput,
        complete:false,
        edit:false,
        datetime:new Date(item.data.unixtime*1000).getFullYear() + '-' + 
        new Date(item.data.unixtime*1000).getDate() + "-" +  
        new Date(item.data.unixtime*1001).getMonth() + " " + 
        new Date(item.data.unixtime*1000).getHours() + ":" + new Date(item.data.unixtime*1000).getMinutes()+":" + new Date(item.data.unixtime*1000).getSeconds()

      }
    console.log()
      setTodos([...todos,newItem])
    }
 }
 const removeTodo = (id) =>{
   setTodos([...todos.filter((todo) => todo.id !== id)])
}
const handleToggle = (id) => {
  setTodos([
    ...todos.map((todo) => 
      todo.id === id ? { ...todo, complete: !todo.complete } : {...todo }
    )
  ])
}
const switchTodo = (id) => {
  setTodos([
    ...todos.map((todo) => 
      todo.id === id ? { ...todo, edit: !todo.edit } : {...todo }
    )
  ])
}
const deleteTodo = () => {
  setTodos([...todos.filter((todo) => todo.complete === false)])
}

  return (
    <StyledView>
     <StyledText>Список задач: {todos.length}</StyledText>
    
      <StyledButton underlayColor="#363636"  onPress={() => deleteTodo()}><TextButton>Удалить</TextButton></StyledButton>
      <InputContainer>
      <TodoInput  addTodo={addTodo}/>
      {}
      </InputContainer>
      {todos.map((todo)=>{
        return(
          <Todo todo={todo}
                key={todo.id}
                datetime={todo.datetime}
                toggleTodo={handleToggle}
                removeTodo={removeTodo}
                switchTodo={switchTodo}
          />
        )
        })}
    </StyledView>
  )
}

export default App;
