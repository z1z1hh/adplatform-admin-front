import { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, modifyUser  } from './../store'
import useModal from '../components/ErrorModal'

function User({userType}){
    // useModal에서 리턴해준 값들 받아오기 (컴포넌트, 상태설정 함수)
    // openModal = 모달 show / closeModal = 모달 hide
    const { Modal: ErrorModal, openModal, closeModal } = useModal();
    const [typeError, setTypeError] = useState(false)
    
    // 사용자 타입이 어드민에서 매니저 or 뷰어로 바뀌면 사용자 리스트 접근 못하도록 
    useEffect(() => { 
        console.log(userType)
        if(userType != 0) {
            setTypeError(true)
            openModal()     // 에러 모달 표시
        } 
    }
    , [userType])
    
    // const [list, setList] = useState([])
    // 사용자 생성 모달 show , hide 여부 저장할 state
    const [isShowModal, setModal] = useState(false)

    // 사용자 수정 모달 show , hide 여부 저장할 state
    const [isModifyModal, setModifyModal] = useState(false)

    // store에 저장된 user state 받아오기
    const user = useSelector((state) => {return state.user})

    const [selectedUser, setSelectedUser] = useState('')

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
            <ErrorModal typeError={typeError} />
            <p className="title">사용자 관리</p>
            <div className="add-btn">
                <button onClick={()=>{setModal(true)}}>생성</button>
            </div>
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
                               <li className="grid-four-columns" key={i}>
                                    <span>{user[i].email}</span>
                                    <span>{user[i].name}</span>
                                    <span>{user[i].lastLoginTime}</span>
                                    <span>
                                        <button onClick={()=>{
                                            setModifyModal(true)

                                            // 내가 선택한 유저의 정보 
                                            const result = user.find(function(data) {
                                                 return data.id === user[i].id
                                             })
                                             console.log(result)
                                             setSelectedUser(result)
                                        }
                                        }>수정</button>
                                    </span>
                               </li>
                               
                        )
                     })
                }         
            </ul>
            {/* 사용자 생성 모달과 사용자 수정 모달은 state 값이 true일 때만 보여준다. */}
                {
                    isShowModal === true ? <Modal setModal={setModal}></Modal> : null
                }
                {
                    isModifyModal === true ? <ModifyModal setModifyModal={setModifyModal} selectedUser={selectedUser}></ModifyModal> : null
                }
        </div>
    )
}

function Modal({setModal}) {
    // 아이디 , 비번, 비번 확인, 이름 저장할 state
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')

    // 아이디, 비번, 비번 확인, 이름 경고 문구 저장할 state 
    const [idAlertMsg, setIdAlertMsg] = useState('')
    const [nameAlertMsg, setNameAlertMsg] = useState('')
    const [passwordAlertMsg, setPasswordAlertMsg] = useState('')
    const [confirmPasswordAlertMsg, setConfirmPasswordAlertMsg] = useState('')

    const [passwordType, setPasswordType] = useState({
        type: 'password',
        visible: false
    });

    const handlePasswordType = e => {
        setPasswordType(() => {
            if (!passwordType.visible) {
                return { type: 'text', visible: true };
            }
            return { type: 'password', visible: false };
        })
    }

    // store의 state 변경함수 요청을 위함
    const dispatch = useDispatch()
    
    const onChangeId = (e) => {
        // 이메일 형식 체크 정규식
        const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; 
        setId(e.target.value)

        // 아이디가 입력되지 않은 경우
        if(!e.target.value) {
            //console.log("id")
            setIdAlertMsg('아이디를 입력해주세요')
        } else if(e.target.value.length < 9 || e.target.value.length > 50 || !regExp.test(e.target.value)) {
            //console.log("id2")
            setIdAlertMsg('올바른 이메일 주소를 입력하세요.')
        } else {
            //console.log('3')
            setIdAlertMsg('')
        }
    }
    
   
    const onChangePwd = (e) => {
        // 비밀번호 형식 체크 (8~15자 영문, 숫자, 특수문자)
        const passwordRule = /(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}/
        setPassword(e.target.value)

        if(!password) {
            //console.log("password")
            setPasswordAlertMsg('비밀번호를 입력해주세요')
        } else if(!passwordRule.test(password)) {
            //console.log("pwd2")
            setPasswordAlertMsg('8~15자 영문, 숫자, 특수문자를 사용하세요. ')
        } else {
            //console.log('3')
            setPasswordAlertMsg('')
        }
    }
    
    const onChangeConfirmPwd = (e) => {
        setConfirmPassword(e.target.value)

        if(!e.target.value) {
            //console.log("password2")
            setConfirmPasswordAlertMsg('비밀번호를 입력해주세요')
        } else if(password != e.target.value) {
            //console.log(password)
            setConfirmPasswordAlertMsg('비밀번호가 일치하지 않습니다.')
        } else {
            //console.log('pwd3')
            setConfirmPasswordAlertMsg('')
        }
    }
    
    const onChangeName = (e) => {
        // 이름은 한글, 영문만 입력 가능
        const nameRule = /^[가-힣a-zA-Z]+$/;
        setName(e.target.value)

        if(!e.target.value) {
            //console.log('name')
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
                    { idAlertMsg !== '' ? <p>{idAlertMsg}</p> : <p></p>}  
                <span>비밀번호</span>
                <div className="inputWrap">
                    <input type={passwordType.type} onChange={onChangePwd} placeholder='영문, 숫자, 특수문자 조합 8~15자' />
                    <button className="btnClear" onClick={handlePasswordType}></button>
                </div>
                    { passwordAlertMsg !== '' ? <p>{passwordAlertMsg}</p> : <p></p>}  
                <span>비밀번호 확인</span>
                
                <div className="inputWrap">
                    <input type={passwordType.type} onChange={onChangeConfirmPwd}></input>
                    <button className="btnClear" onClick={handlePasswordType}></button>
                </div>
                { confirmPasswordAlertMsg !== '' ? <p>{confirmPasswordAlertMsg}</p> : <p></p>}  

                <span>이름</span>
                <input type="text" onChange={onChangeName}></input>
                    { nameAlertMsg !== '' ? <p>{nameAlertMsg}</p> : <p></p>}

                <div className="two-btn-wrap">
                    <button onClick={
                        ()=>{setModal(false)}
                    }>취소</button>
                    <button onClick={()=>{
                        const userData = {
                            email : id,
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

function ModifyModal({setModifyModal,selectedUser}) {
    const [modifyName, setModifyName] = useState('')
    const [nameAlert, setNameAlert] = useState('')
    const dispatch = useDispatch()

    const onChangeModifyName = (e) => {
        // 이름은 한글, 영문만 입력 가능
        const rule = /^[가-힣a-zA-Z]+$/;
        setModifyName(e.target.value)

        if(!e.target.value) {
            setNameAlert('이름을 입력해 주세요')
        } else if(!rule.test(e.target.value) || e.target.value.length < 1 || e.target.value.length > 16) {
            setNameAlert(' 이름을 올바르게 입력하세요. (숫자, 특수문자, 공백 입력불가)')
        } else {
            setNameAlert('')
        }
    }

    const modifyValidation = () => {
        // 이름 벨리데이션 체크 안 된 경우
        if(nameAlert !== '') {
            alert(nameAlert)
        } else {
            console.log(modifyName)
            
            dispatch(modifyUser({id : selectedUser.id, name : modifyName}))
            setModifyModal(false)
            alert('수정완료')
        }
    }

    return (
        <div>
            <div className="modal-background">

            </div>
            <div className="modal-wrap">
                <span>아이디</span>
                <div>{selectedUser.email}</div>
                <span>이름</span>
                <input type="text" defaultValue={selectedUser.name} onChange={onChangeModifyName}></input>
                { nameAlert !== '' ? <p>{nameAlert}</p> : <p></p>}  
                <div className="two-btn-wrap">
                    <button onClick={modifyValidation}>수정</button>
                    <button onClick={()=>{setModifyModal(false)}}>닫기</button>
                </div>
               
            </div>
        </div>
    )
}
export default User