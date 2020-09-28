<template>
  <div id="app" @contextmenu="handleAppContextMenu">
    <h2>这个演示 popup menu</h2>
    <br />
    <popup-menu
      v-if="popupConfig.isShow"
      :left="popupConfig.left"
      :top="popupConfig.top"
      @hide-popup-menu="handleHidePopupMenu"
    >
      <div class="menu-container">
        <div
          class="menu-item"
          v-for="item in contextMenu.menuList"
          :key="item.id"
          @click="handleMenuItemClick({ id: item.id })"
        >{{ item.label }}</div>
      </div>
    </popup-menu>
  </div>
</template>

<script>
/**
 * TODO: 做一个 popup 组件
 */
import PopupMenu from './components/popup-menu.vue'
import { reactive } from 'vue'
export default {
  name: 'App4',
  components: {
    PopupMenu
  },
  setup () {
    const { popupConfig, handleAppContextMenu, handleHidePopupMenu } = useShowContextMenu()
    const { contextMenu, handleMenuItemClick } = useContextMenuContent()

    return {
      popupConfig,
      contextMenu,
      handleAppContextMenu,
      handleMenuItemClick,
      handleHidePopupMenu
    }
  }
}

function useShowContextMenu () {
  const popupConfig = reactive({
    isShow: false,
    left: 0,
    top: 0
  })

  function handleAppContextMenu (e) {
    // 0. 禁止默认菜单
    e.preventDefault()
    // 1. 赋值
    popupConfig.left = e.x
    popupConfig.top = e.y
    // 2. 打开 右键菜单
    if (!popupConfig.isShow) {
      popupConfig.isShow = true
    }
  }

  function handleHidePopupMenu () {
    popupConfig.isShow = false
  }

  return {
    popupConfig,
    handleAppContextMenu,
    handleHidePopupMenu
  }
}

function useContextMenuContent () {
  const contextMenu = reactive({
    menuList: [
      { label: '第一项: 重命名文件', id: 1 },
      { label: '第二项: 移动文件', id: 2 },
      { label: '第三项: 删除文件', id: 3 },
    ]
  })

  function handleMenuItemClick ({ id }) {
    console.log('您点击的 item id is: ', id)
  }
  return {
    contextMenu,
    handleMenuItemClick
  }
}
</script>

<style scoped>
#app {
  width: 100vw;
  height: 300px;
}
.menu-container {
  margin: 0;
  padding: 0;
  background-color: pink;
}
.menu-item {
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
}
.menu-item:hover {
  background-color: gray;
  cursor: pointer;
}
</style>
