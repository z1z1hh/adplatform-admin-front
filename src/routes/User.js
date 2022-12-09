import { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, modifyUser  } from './../store'

function User(){
    const [list, setList] = useState([])
    const [isShowModal, setModal] = useState(false)
    const [isModifyModal, setModifyModal] = useState(false)

    const dispatch = useDispatch()
    const user = useSelector((state) => {return state.user})

    console.log(useSelector)
    // useEffect(() => {
    //     axios.get('https://z1z1hh.github.io/adplatform-admin-front/user.json')
    //     .then((result) => {
    //         console.log(result.data)
    //         setList(result.data)
    //         console.log(result.data)
    //     })
    //     .catch((e) => {
    //         alert("통신 중 에러가 발생했습니다.")
    //         console.log(e)
    //         return
    //     })
    // }, [])

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
                     user.map(function(a,i){
                         return (
                               <li className="grid-four-columns">
                                    <span>{user[i].id}</span>
                                    <span>{user[i].name}</span>
                                    <span>{user[i].lastLoginTime}</span>
                                    <span>
                                        <button onClick={()=>{
                                            setModifyModal(true)
                                            const result = dispatch(modifyUser(user[i].id))
                                            console.log(result)
                                        }
                                        }>수정</button>
                                    </span>
                               </li>
                               
                        )
                     })
                }         
            </ul>
                {
                    isShowModal === true ? <Modal setModal={setModal}></Modal> : null
                }
                {
                    isModifyModal === true ? <ModifyModal setModifyModal={setModifyModal}></ModifyModal> : null
                }
        </div>
    )
}

function Modal({setModal}) {
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [idAlertMsg, setIdAlertMsg] = useState('')
    const [nameAlertMsg, setNameAlertMsg] = useState('')
    const [passwordAlertMsg, setPasswordAlertMsg] = useState('')
    const [confirmPasswordAlertMsg, setConfirmPasswordAlertMsg] = useState('')
    const dispatch = useDispatch()
    
    const onChangeId = (e) => {
        const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; // 이메일 형식 체크 정규식
        setId(e.target.value)

        if(!e.target.value) {
            console.log("id")
            setIdAlertMsg('아이디를 입력해주세요')
        } else if(e.target.value.length < 9 || e.target.value.length > 50 || !regExp.test(e.target.value)) {
            console.log("id2")
            setIdAlertMsg('올바른 이메일 주소를 입력하세요.')
        } else {
            console.log('3')
            setIdAlertMsg('')
        }
    }
    
   
    const onChangePwd = (e) => {
        
        const passwordRule = /(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}/
        setPassword(e.target.value)

        if(!password) {
            console.log("password")
            setPasswordAlertMsg('비밀번호를 입력해주세요')
        } else if(!passwordRule.test(password)) {
            console.log("pwd2")
            setPasswordAlertMsg('8~15자 영문, 숫자, 특수문자를 사용하세요. ')
        } else {
            console.log('3')
            setPasswordAlertMsg('')
        }
    }
    
    const onChangeConfirmPwd = (e) => {
        setConfirmPassword(e.target.value)

        if(!e.target.value) {
            console.log("password2")
            setConfirmPasswordAlertMsg('비밀번호를 입력해주세요')
        } else if(password != e.target.value) {
            console.log(password)
            setConfirmPasswordAlertMsg('비밀번호가 일치하지 않습니다.')
        } else {
            console.log('pwd3')
            setConfirmPasswordAlertMsg('')
        }
    }
    
    const onChangeName = (e) => {
        const nameRule = /^[가-힣a-zA-Z]+$/;
        setName(e.target.value)

        if(!e.target.value) {
            console.log('name')
            setNameAlertMsg('이름을 입력해 주세요')
        } else if(!nameRule.test(e.target.value) || e.target.value.length < 1 || e.target.value.length > 16) {
            setNameAlertMsg(' 이름을 올바르게 입력하세요. (숫자, 특수문자, 공백 입력불가')
        } else {
            setNameAlertMsg('')
        }
    }
    return (
        <>
            <div className="modal-background">

            </div>
            <div className="modal-wrap">
                <span>아이디</span>
                <input type="text" onChange={onChangeId} minLength="9" maxLength="50"></input>
                    { idAlertMsg !== '' ? <p>{idAlertMsg}</p> : null}  
                <span>비밀번호</span>
                <input type="password" onChange={onChangePwd} placeholder='영문, 숫자, 특수문자 조합 8~15자'></input>
                    { passwordAlertMsg !== '' ? <p>{passwordAlertMsg}</p> : null}  
                <span>비밀번호 확인</span>
                <input type="password" onChange={onChangeConfirmPwd}></input>
                    { confirmPasswordAlertMsg !== '' ? <p>{confirmPasswordAlertMsg}</p> : null}  
                <span>이름</span>
                <input type="text" onChange={onChangeName}></input>
                    { nameAlertMsg !== '' ? <p>{nameAlertMsg}</p> : null}
                <div>
                    <button onClick={
                        ()=>{setModal(false)}
                    }>취소</button>
                    <button onClick={()=>{
                        const userData = {
                            id : id,
                            password : password,
                            name : name
                        }
                        dispatch(addUser(userData))
                        alert("생성 완료")
                        setModal(false)
                        // .then(response => {
                        //     if(response.payload.success) {
                        //         alert("생성 완료")
                        //         setModal(false)
                        //     } else {
                        //         alert("error")
                        //     }
                           
                        // })
                        // .catch((e) => {
                        //     console.log(e)
                        //     alert("생성 실패")
                        // })
                    }}>생성</button>
                </div>
            
            </div>
        </>
        
    )
}

function ModifyModal({setModifyModal}) {
    return (
        <div>
            <div className="modal-background">

            </div>
            <div className="modal-wrap">
                <span>아이디</span>
                <div className="border">아이디입력</div>
                <span>이름</span>
                <input type="text"></input>
                <div>
                    <button>수정</button>
                    <button onClick={()=>{setModifyModal(false)}}>닫기</button>
                </div>
               
            </div>
        </div>
    )
}
export default User