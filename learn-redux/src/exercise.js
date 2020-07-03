import {createStore} from 'redux';

const initialState = {
    counter : 0,
    text: '',
    list: []
};

//액션 타입 정의
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';
const CHANGE_TEXT = 'CHANGE_TEXT';
const ADD_TO_LIST = 'ADD_TO_LIST';

//액션생성 함수
const increase = () => (
    {
    type : INCREASE,
    }
);

const decrease = () => ({
    type : DECREASE,
});

const changeText = text => ({
    type : CHANGE_TEXT,
    text
});

const addToList = item => ({
    type : ADD_TO_LIST,
    item
})

//리덕스에서 초기상태를 만들때 리듀서를 한번 호출함. -> 그 시점에 state가 undefined면 default로 undefined를 리턴하면서 초기상태가 만들어지지 않음.
//그래서 초기 state 값을 설정해줌
function reducer(state = initialState, action) {
    console.log('reducer')
    switch(action.type){
        case INCREASE :
            return{
                ...state,
                counter : state.counter + 1
            };
        case DECREASE :
            return{
                ...state,
                counter : state.counter - 1
            };
        case CHANGE_TEXT :
            return{
                ...state,
                text : action.text
            };
        case ADD_TO_LIST :
            return{
                ...state,
                //새로운 배열을 만들어서 기존리스트를 대체 시킴 (불변성을 지킴)
                list : state.list.concat(action.item) 
            };
        default : 
            return state;
        
    }
}

//스토어 생성
const store = createStore(reducer);
console.log(store.getState());

//리스너함수를 생성
const listener = () => {
    const state = store.getState();
    console.log('listener')
    console.log(state);
};

//구독
const unsubscribe = store.subscribe(listener);
// unsubscribe();

//구독 후 액션들을 디스패치하면 액션이 디스패치될때마다 스토어의 상태가 출력됨\
//특정 액션이 디스패치되면 store의 상태가 업데이트 되는 것
store.dispatch(increase());
store.dispatch(decrease());
store.dispatch(changeText('안녕하세요'));
store.dispatch(addToList({id:1,text:'와우'}));

window.store = store;


