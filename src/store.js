import { configureStore, createSlice  } from '@reduxjs/toolkit'

const user = createSlice({
  name : 'user',
  initialState : [
    {
      id : 'a@naver.com',
      name : '홍',
      password : '',
      lastLoginTime : '2022-11-13'
    },
    {
      id : 'a1@naver.com',
      name : '김',
      password : '',
      lastLoginTime : '2022-11-13'
    },
    {
      id : 'a2@naver.com',
      name : '박',
      password : '',
      lastLoginTime : '2022-11-13'
    },
    {
      id : 'a3@naver.com',
      name : '최',
      password : '',
      lastLoginTime : '2022-11-13'
    }
  ],
  reducers : {
    addUser(state,action) {
      state.push(action.payload)
    },
    modifyUser(state, action) {
      const result = state.find(function(state){
        return state.id === action.payload.id
      })
      console.log(result)
      return result 
    }
  }
})


export const { addUser, modifyUser } = user.actions


export default configureStore({
  reducer: { 
   user : user.reducer
  }
}) 