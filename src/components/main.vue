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
import { validateOrReject} from 'class-validator';


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

   function getData() {
      const data = JSON.parse(localStorage.getItem('data')!);

      if(!data || data?.length === 0) return dataArray.value.push(rect.addRect(new ChildRect()));
     // setData(data);
    dataArray.value = setData2(data);

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
     function setData2(data: ParentMenu[], instance?:DefaultMenu, menu?:ParentMenu) {
      const stack:ParentMenu[] = [];

      data.forEach((a) => {
        // const rowData = a;
        let ins:DefaultMenu;
        // const rowData:ParentMenu = a as ParentMenu;
        const rowData = rect.check<ParentMenu>(a as ParentMenu);

        if(rowData.childrenMenu) {
          rect.title = rowData.title;

          validateOrReject(rect).then(() => {
          }).catch((e) =>{
            console.error('에러:',e);
          })
        }

        if(rowData.childrenMenu?.length > 0) {
          ins = new ChildRect();


          const rowDataChildrenMenu: DefaultMenu[] = rowData.childrenMenu;
          const menu = rect.addRect(ins, rowData.title);
          stack.push(menu);
          setData2(rowDataChildrenMenu as ParentMenu[],ins,menu);


        }else {
          if(rowData.more){
            stack.push(rect.addRect(new ChildRect(), rowData.title));
          }else if(rowData.more === false){
            stack.push(rect.addNoneRect() as ParentMenu);
          }else {
            instance?.addChildrenRect(menu,a.title);

          }
        }
      });
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
       dataArray.value.push(rect.addRect(new ChildRect()));
       //
     }else {
       dataArray.value.push(rect.addNoneRect());
     }
     localStorage.setItem('data',JSON.stringify(dataArray.value));
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