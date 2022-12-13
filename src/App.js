import './common.css';
import './App.css';
import { useEffect, useState } from 'react'
import { useNavigate, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Campaign from './routes/Campaign'
import User from './routes/User'
import axios from 'axios';

function App() {

  // inform-popup은 상단 이메일주소 클릭 시에만 보이게 한다.
  // 이메일 주소 클릭 여부
  const [popupShowYn, setPopupShowYn] = useState(false)
  
  // 로그인 된 유저를 user[0] 이라고 가정
  const user = useSelector((state) => {return state.user})

  /*
    메뉴 권한 
    - 캠페인 : 어드민, 매니저, 뷰어
    - 사용자 : 어드민
    어드민 클릭 시 0 , 매니저 1, 뷰어 2로 설정
  */

 // 유저 타입을 저장할 state
  const [userType, setUserType] = useState('0')

  const changeUserType = e => {
    setUserType(parseInt(e.target.value))
  }

  useEffect(() => {
   // console.log('유저 타입 변경')
  }, [userType])
  
  const navigate = useNavigate()

  return (
    <div className="App">
      <ul className="menubar-wrap">
        <li>Wisebirds</li>
        <li onClick={()=>{ navigate('/campaign')}}>캠페인</li>
        { userType == '0' ? <li onClick={()=> { navigate('/user')}}>사용자</li> : null }
        <li className="user-email"
            onClick={()=>{ setPopupShowYn(!popupShowYn) }}>{user[0].email}
            { popupShowYn === true ? <Popup user={user[0]}/> : null }
        </li>
        <li>
          <select defalutValue="0" key="0" onChange={changeUserType}>
            <option value="0">어드민</option>
            <option value="1">매니저</option>
            <option value="2">뷰어</option>
          </select>
        </li>
      </ul>
      <Routes>
          <Route path ="/campaign" element={<Campaign userType={userType} />}></Route>
					<Route path="/user" element={<User userType={userType} />}></Route>
			</Routes>
      
     
    </div>
  );
}

function Popup({user}) {
  return (
    <div className="inform-popup">
      <div>{user.name}</div>
      <div>{user.email}</div>
      <div>{user.company.name}</div>
    </div>
  )
}
export default App;
