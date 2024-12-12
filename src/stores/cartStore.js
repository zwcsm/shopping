import {defineStore} from 'pinia';
import {ref,computed} from "vue";
import {useUserStore} from "@/stores/userStore";
import {delCartAPI} from "@/apis/cart";
import {findNewCartListAPI,insertCartAPI} from "@/apis/cart";

export const useCartStore = defineStore(
    'cart', 
    () => {
        const cartList = ref([])
        const userStore = useUserStore();
        const isLogin = computed(()=>userStore.userInfo.token);
        // 获取登录后最新购物车列表action
        const updateLoginCartList = async () => {
            const res = await findNewCartListAPI()
            cartList.value = res.result
        }
        const addCart=async (goods)=>{
            if(isLogin.value){
                //登录之后加入购物车逻辑
                await insertCartAPI(goods)
                await updateLoginCartList()
            }else {
                //判断商品是否在购物车
                const item = cartList.value.find(item => goods.skuId === item.skuId);
                if (item) {
                    item.count += goods.count
                } else {
                    cartList.value.push(goods)
                }
            }
        }
        const delCart = async (skuId) => {
            if(isLogin.value){
                //登录之后加入购物车逻辑
                console.log([skuId])
                await delCartAPI([skuId])
                await updateLoginCartList()
            }else {
                // 思路：
                // 1. 找到要删除项的下标值 - splice
                // 2. 使用splice删除找到的项，原数组改变
                const idx = cartList.value.findIndex((item) => skuId === item.skuId)
                cartList.value.splice(idx, 1)
            }
        }
        const checkAll = (selected) => {
            cartList.value.forEach(item => item.selected = selected)
        }
        // 清除购物车
        const clearCart = () => {
            cartList.value = []
        }
        //修改购物项
        const updateCartItem = async (goods) => {
        const {skuId,count,selected} = goods
        if (isLogin.value) {
            await updateCartItem(skuId,{count,selected})
            }
        }
        const isAll = computed(() => cartList.value.every((item) => item.selected))
        const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
        const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))
        const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
        const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))
        return{
            cartList,
            addCart,
            delCart,
            allCount,
            allPrice,
            checkAll,
            isAll,
            selectedCount,
            selectedPrice,
            updateLoginCartList,
            clearCart,
            updateCartItem
        }
    },
    {
        persist: true,
    }
)