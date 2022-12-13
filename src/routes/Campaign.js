import { useEffect, useState } from 'react'
import axios from 'axios'
import useModal from '../components/ErrorModal'
import PaginationWrap from '../components/Pagination'

// 세자리수 마다 ',' 표시
const priceToString = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// 소수점 셋째자리 반올림 후 퍼센티지 형식으로 포맷
const decimalToPercent = (price) => {
    let newPrice = price.toFixed(2)
    newPrice = parseInt(newPrice * 100) + '%'
    return newPrice
}

function Campaign(props) {
    
    // 리스트 데이터 저장할 state
    const [list , setList] = useState([])
    
    // useModal에서 리턴해준 값들 받아오기 (컴포넌트, 상태설정 함수)
    // openModal = 모달 show / closeModal = 모달 hide
    const { Modal: ErrorModal, openModal, closeModal } = useModal();
    
    const [page, setPage] = useState(1);
    const [items, setItems] = useState(25);
    const handlePageChange = (page) => { setPage(page); };

    // App 컴포넌트에서 받아온 userType
    useEffect(() => { console.log(props.userType) }, [props.userType])

    // data.json 에서 캠페인 리스트 받아오기
    useEffect(() => {
        axios.get('https://z1z1hh.github.io/adplatform-admin-front/data.json')
        .then((result) => {
            // 통신 성공 시 list state에 저장하기
            // console.log(result.data.content)
            setList(result.data.content)
        })
        // 통신 오류 시 에러 표시
        .catch((e) => {
            // 통신 실패 시 openModal 호출 !!
            openModal()
            console.log(e)
            return
        })
    }, [])

    console.log(items*(page-1), items*(page-1)+items)

    return (
        <div className="board-wrap">
            <ErrorModal />
            
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
               {/* 반복문으로 리스트 표시 */}
                {
                     list !== undefined ? 
                        list.slice(
                             items*(page-1),
                             items*(page-1) + items
                            ).map(function(a,i){
                            return (
                                
                                    <CampaignList list = {list.slice(
                                        items*(page-1),
                                        items*(page-1) + items
                                       )} i = {i}  userType={props.userType}  />
                                )
                        }) : <p className="txt-no-data">데이터가 없습니다</p> 
                }         
            </ul>
            <PaginationWrap page={page} items={items} totalItemsCount={list.length} pageRangeDisplayed={25} handlePageChange={handlePageChange}/>
            
        </div>
    )
}

function CampaignList(props) {
    //useEffect(() => { console.log(props.userType) }, [props.userType])
    return (
        <li key = {props.i}>
            <span>
                {
                    props.userType == 2 ? <input type="checkbox"  id={`toggle${props.i}`} disabled={true}></input> :
                    
                        <input type="checkbox"  id={`toggle${props.i}`} defaultChecked={props.list[props.i].enabled} 
                            onClick={ ()=>{
                                const copyList = [...props.list]
                                
                                // 내가 누른 행의 id의 데이터만 추출
                                const returnValue = copyList.find((data) => {
                                    return data.id === copyList[props.i].id
                                })

                            } }/> 
                }
                <label htmlFor={`toggle${props.i}`} className="toggleSwitch" >
                    <span className="toggleButton"></span>
                </label>
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
            <span>{ props.list[props.i].video_views }</span>
            <span>{ decimalToPercent(props.list[props.i].vtr) }</span>
        </li>
    )
}

// campaign_objective 값에 따른 타이틀명 세팅
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