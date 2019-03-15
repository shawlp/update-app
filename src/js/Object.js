// Object.assign(target, ...sources): target目标对象，sources多个源对象，返回目标对象
let o1 = {
    a: 1
},
o2 = {
    b: 2
},
o3 = {
    c: 3
};

// 不仅返回一个新拼接出来的值，同时也会改变第一个参数(target)的值
let obj = Object.assign(o1, o2, o3); // o1: {a: 1, b: 2, c: 3}, obj: {a: 1, b: 2, c: 3}

// 只会拷贝源对象自身的可枚举属性到目标对象身上，会跳过那些值为null和undefined的源对象
Object.assign({}, null, undefined); // {}

// Object.create(proto[, propertiesObj]) 第一个参数是要继承的原型，第二个为对象的属性描述符即自有属性
let obj1 = Object.create({ foo: 1 }, { // foo为原型上的属性
    bar: { // 不可枚举的自有属性bar
        value: 2 
    },
    baz: { // 可枚举的自有属性baz
        value: 666,
        enumerable: true
    }
})

// 只拷贝所有可枚举的自有属性值到目标对象中
let copy = Object.assign({}, obj1); // {baz: 666}

const objectA = {
	prop1: `Hello`,
	prop2: `World`,
	nested: {
		bool: true,
		super: 123,
		still: `here!`,
	},
	array1: [1, 2, 3],
	array2: [4, 5, 6],
};

const objectB = {
	prop2: `Universe`,
	name: `Josh`,
	nested: {
		bool: false,
	},
	array1: null,
};

const objectC = {
	location: `United Kingdom`,
	name: `Bob`,
	nested: {
		super: 999,
	},
	array2: [100, 101, 102],
};

// Object.assign()是浅克隆
/*
*   {
*     prop1: 'Hello',
*     prop2: 'Universe',
*     nested: { super: 999 }, // 我们所希望的是{ bool: false, super: 999, still: 'here!' }
*     array1: null,
*     array2: [100, 101, 102],
*     name: 'Bob',
*     location: 'United Kingdom'
*   }
*/
Object.assign(objectA, objectB, objectC); 

// 可使用Object-Assign-Deep库解决浅克隆的问题
// const objectAssignDeep = require(`object-assign-deep`);
// objectAssignDeep(objectA, objectB, objectC);
/*
*   {
*     prop1: 'Hello',
*     prop2: 'Universe',
*     nested: { bool: false, super: 999, still: 'here!' }
*     array1: null,
*     array2: [100, 101, 102],
*     name: 'Bob',
*     location: 'United Kingdom'
*   }
*/


/**
 * Object.create(proto[, propertiesObj]) 第一个参数是要继承的原型(必需)，第二个为对象的属性描述符即自有属性（可选）
 * 数据属性是可获取且可设置的属性，包括:value, writable, enumerable和configurable，若未指定最后3个属性，则默认为false
*/
// {size: "large", shape: "round"},原型为null，
// Object.getPrototypeOf(newObj1) = null
let newObj = Object.create(null, {
    size: {
        value: 'large',
        enumerable: true
    },
    shape: {
        value: 'round',
        enumerable: true
    }
})  
