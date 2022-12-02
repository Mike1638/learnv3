<template>
    <div>
        <p ref="msg"></p>
        <HelloWorldVue ref="hw" msg="1"></HelloWorldVue>
    </div>
</template>

<script lang="ts">
interface Member{
    id:number,
    name:string,
    age?:number
}
import { defineComponent, onMounted, reactive, ref, toRef } from "vue"
import HelloWorldVue from "../components/HelloWorld.vue";
export default defineComponent({
    components: {
        HelloWorldVue
    },
    setup() {
        //挂载节点
        const msg = ref<HTMLElement>()
        const hw = ref<typeof HelloWorldVue>()  // 子组件通过typeof 获得类型
        // reactive 只适用于对象和数组
        const member:Member =  reactive({id:1,name:'1'})
        const arr:number[] = reactive([1,2,3,4])
        // toRef 和 toRefs ，都是用于 reactive 向 ref 转换。 
        // toRef	创建一个新的 Ref 变量，转换 Reactive 对象的某个字段为 Ref 变量
        const name = toRef(member,"name")   // 转ref   
        console.log(name.value)   // 使用 .value
        
        name.value = '2'  // 修改name值
        member.name = '3' // 或者修改这个   
        name.value  // 两个值都会改变 
        member.name // 两个值都会改变

        const four = toRef(arr,3)  //  数组
         
        // ** 设置默认值    如果 Reactive 对象上有一个属性本身没有初始值，也可以传递第三个参数进行设置（默认值仅对 Ref 变量有效)

        const age =toRef(member,"age",18)
        age.value  //18     默认值仅对 Ref 变量有效
        member.age  // undefined

        // 数组同理
        const five = toRef(arr,4,5)
        arr[4]
        five.value

        // toRefs	创建一个新的对象，它的每个字段都是 Reactive 对象各个字段的 Ref 变量 
        onMounted(()=>{
            console.log('typeof HelloWorldVue',typeof HelloWorldVue)
            console.log(msg.value)
            if(msg.value){
                msg.value.innerHTML = "msg"
            }
            // 考虑对reactive数组操作会影响响应式
            // 不要对reactive进行解构
            console.log(member.id,member.name) 
            console.log(hw.value)
        })
      return {msg,hw} //注意返回
    }
})
</script>