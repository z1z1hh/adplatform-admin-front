import { configureStore, createSlice  } from '@reduxjs/toolkit'

const user = createSlice({
    name : 'user',
    initialState : {
      
    }
})


export default configureStore({
  reducer: { 
   user : user.reducer
  }
}) 