import { useEffect, useState } from 'react'
import axios from 'axios'

function User(){
    const [list, setList] = useState([])
    const [modal, setModal] = useState(false)

    useEffect(() => {
        axios.get('https://z1z1hh.github.io/adplatform-admin-front/user.json')
        .then((result) => {
            console.log(result.data)
            setList(result.data)
            console.log(result.data)
        })
        .catch((e) => {
            alert("통신 중 에러가 발생했습니다.")
            console.log(e)
            return
        })
    }, [])
    
    return (
        <div className="board-wrap">
            <button onClick={()=>{setModal(true)}}>생성</button>
            <p className="title">사용자 관리</p>
            <ul className="title-wrap grid-four-columns">
                <li>아이디</li>
                <li>이름</li>
                <li>마지막 로그인 일시</li>
                <li>수정</li>
            </ul>
            <ul className="contents-wrap">
               
                {
                     list.map(function(a,i){
                         return (
                               <li className="grid-four-columns">
                                    <span>{list[i].id}</span>
                                    <span>{list[i].name}</span>
                               </li>
                               
                        )
                     })
                }         
            </ul>
                <Modal></Modal>
            
        </div>
    )
}

function Modal() {
    return (
        <div className="modal-wrap">
            <span>아이디</span>
            <input type="text"></input>
            <span>비밀번호</span>
            <input type="text"></input>
            <span>비밀번호 확인</span>
            <input type="text"></input>
            <span>이메일</span>
            <input type="text"></input>
        </div>
    )
}
export default User