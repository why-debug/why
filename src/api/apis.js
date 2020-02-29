import axios from 'axios';

let req = axios.create({
    baseURL: 'http://localhost:3000', // 基本路径
    timeout:  10000  
})

// 获取商家信息数据
export function getseller(){
    return req.get('/api/seller')
}
//获取评论列表信息
export function getcomment(){
    return req.get('/api/ratings')
}
//获取商品列表信息
export function getgoods(){
    return req.get('/api/goods')
}
