import http from "@/utils/http";

/**
 * @description: 获取最新的购物车列表
 * @param {*}
 * @return {*}
 */
export function findNewCartListAPI(){
    return http.get('/member/cart');
}
/**
 * @description: 根据sku对象进行新增购物车
 * @param {sku} 用户对象
 * @return {*}
 */
export function insertCartAPI(sku){
    return http.post('/member/cart',sku);
}
/**
 * @description: 根据ids删除购物车
 * @param {*}
 * @return {*}
 */
export const delCartAPI = (ids) => {
    return http.delete('/member/cart',{data:{ids}})
}
export function mergeCartAPI(data){
    return http.post('/member/cart/merge',data);
}
export function updateCartItem(skuId,data){   
    return http.put(`/member/cart/${skuId}`,data);
}