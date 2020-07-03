import React,{useState, useRef} from 'react';

function InputSample () {
    // const [text, setText] = useState('');
    const [inputs, setInputs] = useState({
        name: '',
        nickname: '',
    })
    const nameInput = useRef();
    const {name,nickname} = inputs;

    const onChange = (e) => {
        const {name,value} = e.target;
        // nextInputs[namee] = value;
        
        //리엑트에서는 객체를 업데이트할때 기존 객체 복사해야함
        setInputs({
            //객체상태를 업데이트할때는 기존객체 복사하여 새로운 객체를 설정하고 name값을 value값으로 변경
            //불변성을 지킨다고 함 -> 컴포넌트 업데이트 성능을 최적화 할수 있음...
            ...inputs,
            [name] : value,
        })
        // setText(e.target.value);
    }

    const onReset = () => {
        // setText('');
        setInputs({
            name:'',
            nickname:'',
        });
        nameInput.current.focus();
    }
    return (
        <div>
            {/* value값이 없을 경우 초기화가 안됨... */}
            {/* <input onChange = {onChange} value={text}/> */}
            <input name="name" placeholder="이름" onChange={onChange} value={name} ref={nameInput}/>
            <input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname}/>
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값 : </b>
                {name} ({nickname})
                {/* {text} */}
            </div>
        </div>
    )
}

export default InputSample;