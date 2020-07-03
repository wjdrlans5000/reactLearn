import React,{useEffect} from 'react';

//react.memo로 감싸주면 props가 바뀌었을때만 리렌더링 함
//최적화가 어느정도 됨. 
const User = React.memo(function User({user, onRemove, onToggle}){
    const {username, email, id, active} = user;
    useEffect(() =>{
        console.log('컴포넌트가 화면에 나타남.')
        // props -> state
        // rest api
        // d3 video.js 등 라이브러리 사용시 
        // setInterval, setTimeout
        // ui가 화면에 나타난 이후 useEffect 사용
        return () => {
            // 클리너 함수(뒷정리 함수)
            // 컴포넌트가 사라질때 호출됨.
            // clearInterval, clearTimeout
            // 라이브러리 인스턴스 제거
            console.log('컴포넌트가 화면에서 사라짐.')
        }
    },[]);

    //이 값이 설정되거나 바뀔때마다
    // useEffect(() => {
    //     console.log(user);
    //     return () => {
        // 컴포넌트 사라질때, user 객체가 업데이트 직전에 호출됨.
    //         console.log('user 값이 바뀌기 전');
    //         console.log(user);
    //     }
    // },[user])
    return(
        <div>
            <b style={{
                color:active ? 'green' : 'black', cursor:'pointer' 
            }}
            onClick = {() => onToggle(id)}
            >
            &nbsp;    
            {username}</b><span>{email}</span>
            {/* {onRemove(id)} >> 이렇게하면 컴포넌트가 렌더링되는 시점에 함수를 호출해버림.. */}
            <button onClick={() => onRemove(id)}>삭제</button>
        </div>
    )
});


function UserList({users, onRemove, onToggle}) {


    return  (
        <div>
            {
                //배열내부를 돌아 새로운 배열 생성
                users.map(
                    user => (<User user={user} key={user.id} onRemove={onRemove} onToggle={onToggle}/>)
                    //key가 없을 경우 index 지정 가능하나 에러만 사라지지 성능적으로 좋아지진 않음..
                    // (user,index) => (<User user={user} key={index} />)
                )
            }
        </div>
    )
}

export default React.memo(
    UserList,
    //prevProps, nextProps 를 가져와서 비교 후 true 반환시 리렌더링X, false 반환시 리렌더링
    //users를 제외한 나머지 props가 정말로 고정적이어서 비교를 할 필요가 없는것이지 꼭 확인해줘야 함.
    //users, onRemove, onToggle 세개의 props중 onRemove와 onToggle의 경우 함수형 업데이트를 사용하여
    //props를 재사용하여 항상 고정적임
    //onRemove와 onToggle에서 함수형 업데이트를 사용하지않았을 경우 해당함수들을 호출시 
    //항상 최신상태의 users를 가리키고 있지 않기때문에 오류가 발생함.
     (prevProps, nextProps) => nextProps.users === prevProps.users);