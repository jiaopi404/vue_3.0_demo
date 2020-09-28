<template>
  <div
    ref="popper"
    class="popup-menu"
    :style="{ left: left + 'px', top: top + 'px' }"
  >
    <slot></slot>
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref } from 'vue'
export default {
  name: "popup-menu",
  props: ['left', 'top'],
  /**
   * 入口函数
   * @param props
   * @param emit
   * @returns {{}}
   */
  setup (props, { emit }) {
    // 使用此方式绑定 dom 元素or 子组件
    const popper = ref(null)
    function bodyClickHandler (e) {
      const leftTopPoint = { // popupMenu left-top point
        x: props.left,
        y: props.top
      }
      // 获取元素方式有待商榷
      // const popupMenu = document.querySelector('.popup-menu')
      const rightBottomPoint = { // popupMenu right-bottom point
        x: props.left + popper.value.clientWidth,
        y: props.top + popper.value.clientHeight
      }
      const clickPoint = { // 鼠标点击的位置点
        x: e.x,
        y: e.y
      }
      if (
        clickPoint.x < leftTopPoint.x ||
        clickPoint.x > rightBottomPoint.x ||
        clickPoint.y < leftTopPoint.y ||
        clickPoint.y > rightBottomPoint.y
      ) {
        emit('hide-popup-menu') // 触发事件
      }
    }
    // mounted 钩子 挂载事件
    onMounted(() => {
      document.body.addEventListener('click', bodyClickHandler)
    })
    onBeforeUnmount(() => {
      document.body.removeEventListener('click', bodyClickHandler)
    })

    // 模板不需要的就没有必要返回
    // return {
    //   bodyClickHandler
    // }

    return {
      popper
    }
  }
}
</script>

<style scoped>
.popup-menu {
  position: fixed;
  padding: 0;
  margin: 0;
  border: 1px solid #ff3040;
}
</style>
