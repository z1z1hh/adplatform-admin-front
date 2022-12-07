import './common.css';
import './App.css';
import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Campaign from './routes/Campaign'

function App() {
  // inform-popup은 이메일주소 클릭 시에만 보이게 한다.
  // 이메일 주소 클릭 여부
  const [popupShowYn, setPopupShowYn] = useState(false)

  /*
    메뉴 권한 
    - 캠페인 : 어드민, 매니저, 뷰어
    - 사용자 : 어드민
    어드민 클릭 시 0 , 매니저 1, 뷰어 2로 설정
  */

 // 유저 타입을 저장할 state
  const [userType, setUserType] = useState('0')
  useEffect(() => {
  }, [userType])

  return (
    <div className="App">
      <ul className="menubar-wrap">
        <li>Wisebirds</li>
        <li>캠페인</li>
        { userType === '0' ? <li>사용자</li> : null }
        <li className="user-email"
            onClick={()=>{ setPopupShowYn(!popupShowYn) }}>abc@abc.com
            { popupShowYn === true ? <Popup/> : null }
        </li>
        <li>
          <select defalutValue='0' onChange={(e) => { 
            setUserType(e.target.value); 
          }}>
            <option value="0">어드민</option>
            <option value="1">매니저</option>
            <option value="2">뷰어</option>
          </select>
        </li>
      </ul>

      <Routes>
        <Route path="/campaign" element={<Campaign />} />
      </Routes>   
    </div>
  );
}

function Popup() {
  return (
    <div className="inform-popup">
      <div>홍길동</div>
      <div>abc@abc.com</div>
      <div>와이즈버즈</div>
    </div>
  )
}
export default App;
