import React from 'react';

function Hello({color, name, isSpecial}){

    return (
        <div style={{
            color
        }}>
            {/* {isSpecial ? <b>*</b> : null} */}
            {isSpecial && <b>*</b>}
            {/* null,undefined등 false한 값들은 아무것도 표시 안됨 0은 예외 */}
            안녕하세요.{name}
        </div>
    )
}

Hello.defaultProps = {
    name:'이름없음'
}

export default Hello;