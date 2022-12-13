import { configureStore, createSlice  } from '@reduxjs/toolkit'

const user = createSlice({
  name : 'user',
  initialState : [
    {
      id : '3',
      name : '홍길동',
      password : '',
      lastLoginTime : '2022-11-13',
      email : 'a@naver.com',
      company : {
        id : 3,
        name : "와이즈버즈"
      }
    },
    {
      id : '2',
      name : '김철수',
      password : '',
      lastLoginTime : '2022-11-13',
      email : 'ab@naver.com',
      company : {
        id : 2,
        name : "와이즈버즈"
      }
    },
    {
      id : '0',
      name : '박철수',
      password : '',
      lastLoginTime : '2022-11-13',
      email : 'abc@naver.com',
      company : {
        id : 0,
        name : "와이즈버즈"
      }
    },
    {
      id : '1',
      name : '최길순',
      password : '',
      lastLoginTime : '2022-11-13',
      email : 'abcd@naver.com',
      company : {
        id : 1,
        name : "와이즈버즈"
      }
    }
  ],
  reducers : {
    addUser(state,action) {
      state.push(action.payload)
    },
    modifyUser(state, action) {
      console.log(action.payload)
      // const result = state.find(function(state){
      //    return state.id === action.payload.id
      //  })
      // console.log(JSON.stringify(result))

      const copyUser = [...state]
      copyUser.map(function(a,i) {
        if(a.id === action.payload.id) {
          a.name = action.payload.name
        }
      })
    }
  }
})


export const { addUser, modifyUser } = user.actions

export default configureStore({
  reducer: { 
   user : user.reducer
  }
}) 