
import { useState } from "react"

function Error() {
    return (
       <ErrorWrap />
    )
}

function ErrorWrap() {
    
    return (
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
                    <button>확인</button>
                </div>
               
            </div>
        </div>
    )
}
export default Error