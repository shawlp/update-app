import React, { useState, useEffect } from 'react';

// 为何要使用Hooks,当你之前写函数组件的时候，有的时候需要添加状态，这时不得不转化成class，现在使用hooks不需要了
export default function example() {
    const [count, setCount] = useState(0);
    const [age, setAge] = useState(42);
    const [fruit, setFruit] = useState('banana');
    const [todos, setTodos] = useState([{text: 'learn hooks'}]);

    // 和生命周期componentDidMount,componentDidUpdate类似
    useEffect(() => {
        // 当count发生变化时，才会执行以下代码
        document.title = `You clicked ${count} times`; 
    }, [count]);

    function handleOrangeClick() {
        setFruit('orange');
    }

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                click
            </button>
            <p onClick={() => handleOrangeClick()}>fruit: {fruit}</p>
            <p onClick={() => setAge(age + 1)}>age: {age}</p> 
            <p>{JSON.stringify(todos)}</p> 
        </div>
    )
}