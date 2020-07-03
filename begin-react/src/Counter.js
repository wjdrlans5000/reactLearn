import React, {useReducer} from 'react';

function reducer(state, action){
    switch(action.type){
        case 'INCREMENT' :
            return state + 1;
        case 'DECREMENT' :
            return state - 1;
        default :
            throw new Error('Unhandled action');
    }
}

function Counter(){
    // const [number, setNumber] = useState(0);
    const [number, dispatch] = useReducer(reducer, 0);
    const onIncrease = () => {
        // 함수형 업데이트 -> 성능 최적화와 관련 있음
        dispatch({
            type:'INCREMENT'
        })
        // setNumber(prevNumber => prevNumber +1);
    }
    const onDecrease = () => {
        // setNumber(prevNumber => prevNumber -1);
        dispatch({
            type:'DECREMENT'
        })
    }
    return (
        <div>
            <h1>{number}</h1>
            {/* 함수를 넣어주는거지 호출하는것은 아님 onIncrease() 할 경우에는 렌더링시 함수를 호출해버림... */}
            <button onClick={onIncrease}>+1</button>
            <button onClick={onDecrease}>-1</button>
        </div>
    )
}

export default Counter;