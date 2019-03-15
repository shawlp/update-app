/**
 * 生成器是一个函数，可以用来生成迭代器
 * 生成器和普通函数不一样，普通函数是一旦调用一定会执行完
 * 但是生成器函数可以暂停，执行一会休息一会
 */
function *go(a) {
    console.log(1);
    let b = yield a;
    console.log(2);
    let c = yield b;
    console.log(3);
    return c;
}

let it = go('a');
let r1 = it.next();
console.log('r1', r1); // {value: 'a', done: false},done为false表示还有值，还可以继续调用next方法。
let r2 = it.next('b');
console.log('r2', r2); // {value: 'b', done: false}
let r3 = it.next('c');
console.log('r3', r3); // {value: 'c', done: true}