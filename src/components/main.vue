<template>
  <template v-for="(item) in dataArray"  v-bind:key="item" >
    <example-comp2 :params="item" :ins="rect" @onClickRectBtn="setEvent($event,item)"/>
  </template>
</template>

<script lang="ts">
import Rect, {ParentMenu, MenuBar, UnKnownMenu, DefaultMenu} from '@/script/parentRect';
import ChildRect from '@/script/childRect';
import {ref,onMounted} from 'vue'
import ExampleComp2 from "@/components/example2.vue";


export default {
  name: "main-1",
  components: {ExampleComp2},
    props: {
  },
  setup() {
    const rect = new Rect(new ChildRect());
    const dataArray = ref<ParentMenu[] & UnKnownMenu[]>(rect.dataArray);

    onMounted(() => {
      getData();
    })

   async function getData() {
      const data = JSON.parse(localStorage.getItem('data')!);

      if(!data || data?.length === 0) {
       await rect.addRect(new ChildRect()).then((e) => {
         return dataArray.value.push(e);
       })
      }
     // setData(data);
    dataArray.value = await setData2(data);

   }
   /* function setData(data: ParentMenu[]) {
      while(data.length > 0) {
        const [rowData] = data;
        let ins:DefaultMenu;
        if(rowData.more) {
          ins = new ChildRect();
          const rowDataChildrenMenu: Omit<DefaultMenu, 'callback'>[] = rowData.childrenMenu;
          const menu = rect.addRect(ins, rowData.title);
          dataArray.value.push(menu);
          if (rowDataChildrenMenu.length > 0) {
            rowDataChildrenMenu.forEach((a) => {
              ins.addChildrenRect(menu, a.title)
            })
          }
        }else {
          dataArray.value.push(rect.addNoneRect());
        }
        data.splice(0,1);

      }
   }
*/
     async  function setData2(data: ParentMenu[], instance?:DefaultMenu, menu?:ParentMenu) {
      const stack:ParentMenu[] = [];
      for (const a of data) {
        let ins:DefaultMenu;
        const rowData = rect.check<ParentMenu>(a as ParentMenu);

        if(rowData.childrenMenu?.length > 0) {
          ins = new ChildRect();
          const rowDataChildrenMenu: DefaultMenu[] = rowData.childrenMenu;
           rect.addRect(ins, rowData.title).then((e) =>{
            stack.push(e);
            setData2(rowDataChildrenMenu as ParentMenu[],ins,e);
          }).catch(() =>{
           })
        }else {
          if(rowData.more){
              await rect.addRect(new ChildRect(), rowData.title).then((e) => {
                stack.push(e);
              }).catch(() => {
              });
          }else if(rowData.more === false){
            stack.push(rect.addNoneRect() as ParentMenu);
          }else {
            instance?.addChildrenRect(menu,a.title);
          }
        }
      }
       return stack;
    }
    // function typeCheck<T> (args: T) : T {
    //   console.log(typeof args);
    //   return args;
    //   // console.log('error',args);
    // }

   function setEvent({key,callBack}:MenuBar,item: ParentMenu){
     callBack(item.title);
     if(key === 1){
       const instance = item.childIns;
       if(instance){
         instance.addChildrenRect(item);
       }
     }else if (key === 2){
       rect.addRect(new ChildRect()).then((e) => {
         dataArray.value.push(e);
       })
       //
     }else {
       dataArray.value.push(rect.addNoneRect());
     }
     setTimeout(() => {
       localStorage.setItem('data',JSON.stringify(dataArray.value));
     },100)
   }

    return {
      dataArray,
      setEvent,
      rect,
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>