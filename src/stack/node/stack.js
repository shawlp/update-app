// 执行上下文环境栈
function one() {
    console.log(1);
    let a = 'a';
    two();
    function two() {
        let b = 'b';
        three();
        console.log(2);
        function three() {
            let c = 'c';
            console.log(a, b, c);
            console.log(3);
        }
    }
}

one();