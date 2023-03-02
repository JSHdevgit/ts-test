<template>
  <div class="main">
<div class="rect">
  <div>{{params.menuTitle}}</div>
  <div class="add-circle" @click="addMenu"/>
</div>
    <div class="sub-container">
  <div class="sub-menu" v-show="show" :class="show ? 'click' : ''">
    <div class="sub-area" v-for="(v, n, index) of list" v-bind:key="index" @click="onClickSubMenu(v)">{{
      v
      }}</div>
  </div>
  </div>
  </div>
</template>

<script lang="ts">
import {computed,ref} from 'vue'

export default {
  name: 'example-comp',
  props: {
    params: {
      type: Object,
      default: () => {},
      require: true
    },
  },
  setup(props:any,{emit}:any) {
    const list = computed(() => {

      return props.params.subMenu;
    })

   //  watch(subMenu, (cur: object, old: object): void => {
   //
   //    console.log(cur,old);
   //      }
   // )
    let show = ref(props.params.show);
    function addMenu(){
      show.value = !show.value;
    }
    function  onClickSubMenu(item:string) {
        emit('onClickRectBtn',item);
    }
    return {
      list,
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
.sub-container {
  .sub-menu {
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