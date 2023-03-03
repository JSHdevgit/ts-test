<template>
  <div class="main" v-for="(child,index) in params"  v-bind:key="index">
    <div class="rect-container" @click="onClickRect($event,child)">
      <div class="rect">
        <div>{{child.title}}</div>
        <div v-if="child.more" class="add-circle" @click="addMenu"/>
      </div>
      <div class="sub-container" v-if="child.more">
        <div class="sub-menu" v-show="show" :class="show ? 'click' : ''">
          <div class="sub-area" v-for="(v, n, index) of child.menuBar" v-bind:key="index" @click="onClickSubMenu(v,child,params)">{{
              v.name
            }}</div>
        </div>
      </div>
    </div>
    <example-comp2 :params="child.childrenMenu" @onClickRectBtn="$emit('onClickRectBtn',$event)"/>
  </div>
</template>

<script lang="ts">
import {ref} from 'vue'

export default {
  name: 'example-comp2',
  props: {
    params: {
      type: Object,
      default: () => {},
      require: true
    },
    ins: Object,
  },
  setup(props:any,{emit}:any) {

    //  watch(subMenu, (cur: object, old: object): void => {
    //
    //    console.log(cur,old);
    //      }
    // )

    let show = ref(false);
    function addMenu(){
      show.value = !show.value;
    }
    function  onClickSubMenu(item:object,child:object, parent: object) {
      // eslint-disable-next-line no-debugger
      emit('onClickRectBtn',[item,child,parent]);
    }
    function onClickRect(event:Event,item:any) {
      // eslint-disable-next-line no-debugger
      if(item){
        event.stopPropagation();
        item.callback();
      }else {
        props.params.callback();
      }
    }
    return {
      show,
      addMenu,
      onClickSubMenu,
      onClickRect
    };
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  .rect-container {
    flex-direction: row;
    display: flex;
    .rect {
      height: 50px;
      width: 300px;
      border: 1px solid black;
      position: relative;
      justify-content: center;
      align-items: center;
      display: flex;
      margin-bottom: 4px;

      .add-circle {
        cursor: pointer;
        position: absolute;
        right: 5px;
        height: 16px;
        width: 16px;
        mask-size: contain;
        mask-repeat: no-repeat;
        mask-position: center;
        background-color: #666666;
        mask: url('../assets/add-circle.svg');
      }
    }

    .children-rect {
      margin-left: 20px;
      height: 30px;
      width: 280px;
      border: 1px solid black;
      position: relative;
      justify-content: center;
      align-items: center;
      display: flex;
      margin-bottom: 4px;

    }
  }
  .sub-container {
    .sub-menu {
      cursor: pointer;
      margin-left: 10px;
      min-width: 100px;
      border: 1px solid black;
      flex-direction: column;
      transition: opacity 1s;
      visibility: hidden;
      opacity: 0;
      position: absolute;

      &.click {
        visibility: visible;
        opacity: 1;
      }

      .sub-area:not(:last-child) {
        border-bottom: 1px solid black;
      }
    }
  }
}
</style>