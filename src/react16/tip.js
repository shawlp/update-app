// async/await
let axios =  require('axios'); 

async function getData() {
    // const result = await axios.get('https://dube.io/service/ping');
    // 赋值解构
    const {data: newData} = await axios.get('https://dube.io/service/ping');

    return newData;
}

getData().then((data) => console.log('data', data));

// 一次性拿到全部的异步返回数据:Promise.all
// let myData = [{id: 0}, {id: 1}, {id: 2}];

// async function fetchData(dataSet) {
//     const gamersPromises = dataSet.map(entry => {
//         return axios.get(`https://ma-no.org/gamers/${entry.id}`);
//     });

//     const result = await Promise.all(gamersPromises);
//     console.log('result', result.data);
// }

// fetchData(myData); 
