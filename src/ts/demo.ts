import { ref, UnwrapNestedRefs } from "vue";
import type { Ref } from "vue";

interface Calculator{
    number:Ref<number>,
    add:()=>void
}

function UseCalculator():Calculator{
    const number = ref<number>(0)
    function add(){
        number.value ++
    }
    return {number,add}
}
const {number,add} = UseCalculator()
add()
console.log(number.value)


function reactive<T extends object>(target:T):UnwrapNestedRefs<T>
interface Member{
    id:number,
    name:string
}

const member:Member={
    id:1,
    name:'1'
}

const members:Member[]=[
    {id:1,name:'1'}
]

