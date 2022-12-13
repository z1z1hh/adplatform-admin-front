import { useState } from "react"
import { useNavigate } from 'react-router-dom'

/* 
    공통 Error 모달 
    상태 관리하고 , 상태가 true일때만 모달을 show
    상태, 상태설정 함수, 모달 컴포넌트를 리턴
*/

const  useModal = () => {
   
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const Modal = ({typeError}) => (
        
        <>
        {/* isOpen이 true일 경우에만 모달 show하기 */}
            {isOpen && (
                    <div>
                        <div className="modal-background">

                        </div>
                        <div className="modal-wrap">
                            <div className="error-modal">
                                <div>에러가 발생했습니다. </div>
                                <div>같은 현상이 반복되면 고객센터로 문의바랍니다.</div>
                                <div>※ 고객센터</div>
                                <div>- email: helpdesk@wisebirds.ai</div>
                            </div>

                            <div className="error-cls-btn">
                                <ClsBtn typeError={typeError} closeModal={closeModal} />
                            </div>
                        
                        </div>
                    </div>
                )
            }
        </>
    );

    // 모달 컴포넌트, 상태 설정 함수를 리턴
    return { Modal, openModal, closeModal }
}

function ClsBtn({typeError ,closeModal}) {
    
    /*
     typeError가 true인 경우 
        -   사용자 리스트(어드민만 접근 가능한 페이지)에서 유저 타입을 매니저 or 뷰어로 변경한 경우 
            에러 모달을 띄워주고 확인 누를시 캠페인 리스트로 강제 이동

     아닌 경우 (통신 에러)
        -   팝업 닫기
    */ 
    const navigate = useNavigate()
    if(typeError) {
        return (
            <button onClick={()=>{ navigate('/')}}>확인</button>
        )
    } else {
        return (
            <button onClick={closeModal}>확인</button>
        )
    }
   
}

export default useModal