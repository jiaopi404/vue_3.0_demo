<template>
  <div
    class="popup-menu"
    :style="{ left: left + 'px', top: top + 'px' }"
  >
    <slot></slot>
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount } from 'vue'
export default {
  name: "popup-menu",
  props: ['left', 'top'],
  setup (props, { emit }) {
    function bodyClickHandler (e) {
      const leftTopPoint = {
        x: props.left,
        y: props.top
      }
      const popupMenu = document.querySelector('.popup-menu')
      const rightBottomPoint = {
        x: props.left + popupMenu.clientWidth,
        y: props.top + popupMenu.clientHeight
      }
      const clickPoint = {
        x: e.x,
        y: e.y
      }
      if (
        clickPoint.x < leftTopPoint.x ||
        clickPoint.x > rightBottomPoint.x ||
        clickPoint.y < leftTopPoint.y ||
        clickPoint.y > rightBottomPoint.y
      ) {
        emit('hide-popup-menu')
      }
    }
    onMounted(() => {
      document.body.addEventListener('click', bodyClickHandler)
    })
    onBeforeUnmount(() => {
      document.body.removeEventListener('click', bodyClickHandler)
    })

    return {
      bodyClickHandler
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
