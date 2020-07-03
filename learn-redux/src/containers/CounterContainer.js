import React from 'react';
import Counter from '../components/Counter'
import {useSelector, useDispatch, shallowEqual} from 'react-redux' 
import { increase, decrease, setDiff } from '../modules/counter';


//컨테이너 컴포넌트로 상태관리 수행하여 props만 프리젠테이셔널 컴포넌트로 넘겨줌
//스토어와 통신 
function CounterContainer () {
    const {number, diff} = useSelector(state => ({
        number : state.counter.number,
        diff: state.counter.diff
    }), shallowEqual)

    //useSelector 최적화
    // const number = useSelector(state => state.counter.number);
    // const diff = useSelector(state => state.counter.diff);

    const dispatch = useDispatch();

    const onIncrease = () => dispatch(increase());
    const onDecrease = () => dispatch(decrease());
    const onSetDiff = diff => dispatch(setDiff(diff));


    return (
        <Counter
            number={number}
            diff={diff}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            onSetDiff={onSetDiff}
        />
    );
}

export default CounterContainer;