import { useEffect, useState } from 'react'
import axios from 'axios'


const priceToString = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const decimalToPercent = (price) => {
    let newPrice = price.toFixed(2)
    newPrice = parseInt(newPrice * 100) + '%'
    return newPrice
}

function Campaign(props) {
    
    // 리스트 데이터 저장할 state
    const [list , setList] = useState([])

    // 어드민, 매니저, 뷰어 여부, 어드민/매니저만 토글 버튼 변경 가능
    const [userType] = useState(props.userType)

    useEffect(() => {
        axios.get('https://z1z1hh.github.io/adplatform-admin-front/data.json')
        .then((result) => {
            console.log(result.data)
            setList(result.data)
            //console.log(result.data)
        })
        .catch((e) => {
            alert("통신 중 에러가 발생했습니다.")
            console.log(e)
            return
        })
    }, [])
    
    return (
        <div className="board-wrap">
            <p className="title">캠페인 관리</p>
            <ul className="title-wrap">
                <li>상태</li>
                <li>캠페인명</li>
                <li>캠페인 목적</li>
                <li>노출수</li>
                <li>클릭수</li>
                <li>CTR</li>
                <li>동영상 조회수</li>
                <li>VTR</li>
            </ul>
            <ul className="contents-wrap">
               
                {
                     list.map(function(a,i){
                         return (
                                <CampaignList list = {list} i = {i}  userType={userType}  />
                        )
                     })
                }         
            </ul>

            
        </div>
    )
}
//추가
function CampaignList(props) {
    return (
        <li key = {props.i}>
            <span>
                {
                    props.userType == 3 ? <input type="checkbox"  id="toggle" disabled={true}></input> :
                    <>
                        <input type="checkbox"  id="toggle" defaultChecked={props.list[props.i].enabled} 
                            onClick={ ()=>{
                                const copyList = [...props.list]
                                
                                // 내가 누른 행의 번호와 같은 데이터만 추출
                                const returnValue = copyList.find((data) => {
                                    return data.id === copyList[props.i].id
                                })
                                console.log(returnValue)

                            } }/> 
                        <label htmlFor="toggle" className="toggleSwitch" >
                            <span className="toggleButton"></span>
                        </label>
                    </>
                    
                }
                
            </span>
            <span>{props.list[props.i].name}</span>
            <span>
                {
                    <CampaignTitle campaign_objective = {props.list[props.i].campaign_objective} />
                }
            </span>
            <span>{ priceToString(props.list[props.i].impressions) }
            </span>
            <span>{ priceToString(props.list[props.i].clicks) }</span>
            <span>{ decimalToPercent(props.list[props.i].ctr) }</span>
            <span>{props.list[props.i].video_views}</span>
            <span>{ decimalToPercent(props.list[props.i].vtr) }</span>
        </li>
    )
    
}

function CampaignTitle(props) {
    const campaign_objective = props.campaign_objective

    switch(campaign_objective) {
        case 'WEBSITE_CONVERSIONS' : 
            return <span>웹사이트 전환</span>
        case 'WEBSITE_TRAFFIC' :
            return <span>웹사이트 트래픽</span>
        case 'SALES' : 
            return <span>판매</span>
        case 'APP_INSTALLATION' : 
            return <span>앱 설치</span>
        case 'LEAD' : 
            return <span>리드</span>
        case 'BRAND' : 
            return <span>브랜드 인지도 및 도달 범위</span>
        case 'VIDEO_VIEWS' : 
            return <span>동영상 조회</span>
    }
}


export default Campaign