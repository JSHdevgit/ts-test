<template>
  <div class="main">
    <div class="rect-container">
     <div class="rect">
      <div>{{params.title}}</div>
      <div v-if="params.more" class="add-circle" @click="addMenu"/>

    </div>
    <template v-for="(item, index) in params.childrenMenu" v-bind:key="index">
      <div class="children-rect">
        {{item.title}}
      </div>
    </template>
  </div>
    <div class="sub-container">
      <div class="sub-menu" v-show="show" :class="show ? 'click' : ''">
        <div class="sub-area" v-for="(v, n, index) of ins.menuBar()" v-bind:key="index" @click="onClickSubMenu(v)">{{
            v.name
          }}</div>
      </div>
    </div>
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
    function  onClickSubMenu(item:object) {


      emit('onClickRectBtn',item);
    }
    return {
      show,
      addMenu,
      onClickSubMenu
    };
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: row;
  .rect-container {
    flex-direction: row;
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