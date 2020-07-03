import React,{useRef, useState, useMemo, useCallback, useReducer} from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';
import Counter from './Counter';
import InputSample from './InputSample';
import UserList from './UserList';
import CreateUser from './CreateUser';

// import './App.css';
function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중 ....')
  return users.filter(user => user.active).length;
}

const initialState = {
  inputs: {
    username: '',
    email : '',
  },
  users : [
    {
      id:1,
      username : 'gimun',
      email : 'qweqweqwe@naver.com',
      active : true,
  },
  {
      id:2,
      username : 'gimun2',
      email : 'adasdasd@naver.com',
      active : false,
    },
    {
      id:3,
      username : 'gimun3',
      email : 'zxczxcxzc@naver.com',
      active : false,
  },
  ]

  
}
//컴포넌트에서 관리하는 값이 하나고 그 값이 단순하다면 useState로 관리하는 것이 편리.
//만약 관리하는 값이 여러개라 상태의 구조가 복잡하면 useReducer 가 편리할수 있음.
//선택의문제....
//그냥 간단하면 useState 복잡하면 useReducer 사용하면 됨
function reducer(state, action){
  switch(action.type){
    case 'CHANGE_INPUT' :
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name] : action.value
        }
      };
    case 'CREATE_USER':
      return {
        inputs : initialState.inputs,
        users : state.users.concat(action.user)
      };
    case 'TOGGLE_USER':
      return {
        ...state,
        users: state.users.map(user => 
            user.id === action.id
              ? { ...user, active : !user.active}
              : user
          )
      };
      case 'REMOVE_USER':
        return {
          ...state,
          users: state.users.filter(user => user.id !== action.id)
        }
    default :
      throw new Error('Unhandled action');
  }
}

function App() {
  // const name = 'react'
  // const style = {
  //   backgroundColor : 'black',
  //   color : 'aqua',
  //   fontSize : 24,
  //   padding: '1rem'
  // };
  // const [inputs,setInputs] = useState({
  //   username: '',
  //   email : '',
  // });
  // const {username,email} = inputs;
  // //useCallback -> inputs가 바뀔때만 onChange를 다시만들어주고 그렇지 않으면 기존함수 재사용하게 됨.
  // const onChange = useCallback(e => {
  //   const {name,value} = e.target;
  //   setInputs({
  //     ...inputs,
  //     [name] : value
  //   })
  // },[inputs]);

  // const [users, setUsers] =  useState([
  //   {
  //       id:1,
  //       username : 'gimun',
  //       email : 'qweqweqwe@naver.com',
  //       active : true,
  //   },
  //   {
  //       id:2,
  //       username : 'gimun2',
  //       email : 'adasdasd@naver.com',
  //       active : false,
  //     },
  //     {
  //       id:3,
  //       username : 'gimun3',
  //       email : 'zxczxcxzc@naver.com',
  //       active : false,
  //   },
  // ])

  

  // //이 값이 바뀌어도 컴포넌트가 리렌더링 될 필요가 없기에 useRef로 관리 useState의 경우에는 컴포넌트가 리렌더링됨...
  // //특정 변수를 리렌더링되도 계속 기억할수 있음
  // const nextId = useRef(4);

  // const onCreate = useCallback(() => {
  //   const user = {
  //     id : nextId.current,
  //     username,
  //     email,
  //   }
  //   //배열에 항목 추가하는 방법 두가지
  //   //1. 스프레드 사용하여 배열에 항목 추가
  //   // setUsers([...users, user]);
  //   //2. 새 배열을만들어서 그뒤에 user 항목을 붙여줌
    
  //   setUsers(users => users.concat(user));
  //   setInputs({
  //     username:'',
  //     email:''
  //   });

  //   console.log(nextId.current); //4
  //   nextId.current += 1;
  //   //props로 받아온것들 넣어줘야함
  // },[username, email]);

  // const onRemove = useCallback(id => {
  //   //컴포넌트가 만들어질때 딱한번 만들고 그 이후로 users를 재사용..
  //   //함수형 업데이트
  //   setUsers(users => users.filter(user => user.id !== id));
  // },[])

  // const onToggle = useCallback(id => {
  //   setUsers(users => users.map(
  //     user => user.id === id
  //       ? { ...user, active: !user.active }
  //       : user
  //   ))
  // },[])
  //users가 바뀔때만 호출되고 그렇지 않으면 이전에 값을 재 사용
  //필요한 연산을 필요할때만 할수 있음.
  //컴포넌트 성능을 최적화할때 사용
  //useMemo를 사용하지 않으면 input change 발생할때마다 countActiveUsers 호출
  //why?input onChange 마다 state 상태값 관리 하기 때문
  // const count = useMemo(() => countActiveUsers(users),[users])
  const [state, dispatch] = useReducer(reducer,initialState);
  const nextId = useRef(4);
  const {users} = state;
  const {username, email} = state.inputs;

  const onChange = useCallback(e => {
    const {name, value} = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value
    })
  }, [])

  const onCreate = useCallback(()=>{
    dispatch({
      type:'CREATE_USER',
      user:{
        id:nextId.current,
        username,
        email,
      }
    });
    nextId.current += 1
  },[username,email])

  const onToggle = useCallback(id => {
    dispatch({
      type: 'TOGGLE_USER',
      id
    });
  },[]);

  const onRemove = useCallback(id => {
    dispatch({
      type: 'REMOVE_USER',
      id
    });
  },[]);

  const count = useMemo(() => countActiveUsers(users),[users])

  return (

    <Wrapper>
      <CreateUser 
        username={username} 
        email={email}
        onChange={onChange} 
        onCreate={onCreate}
      />
      <UserList 
        users={users} 
        onToggle={onToggle}
        onRemove={onRemove} />
      <div>활성 사용자 수 : {count}</div>
      {/* <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate}/>
      <UserList users={users} onRemove = {onRemove} onToggle = {onToggle}/> */}
      {/* <div>활성 사용자 수 : {count}</div> */}
      {/* <InputSample/> */}
      {/* <Counter/> */}
    {/* 어쩌고 저쩌고 */}
      {/* <Hello name="react" color="red" isSpecial="true"/>
      <Hello  color="pink"/> */}
      {/* <div style={style}>{name}</div> */}
      {/* <div className="gray-box"></div> */}
    </Wrapper>
    
  )
}

export default App;
