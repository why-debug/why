

<template>
  <div class="nav-menu-view">
    <template v-for="(item) in list">
      <el-submenu :index="item.meta.forIndex"
                  class="nav-submenu"
                  v-if="item.meta && item.meta.routeName && item.children && item.children.length > 0">
        <template slot="title">
          <img class="menu-icon" v-if="item.meta.iconDefault" :src="item.meta.iconDefault">
          <span class="menu-icon" v-else></span>
          <span>{{ item.meta.routeName }}</span>
        </template>

        <nav-menu :list="item.children"></nav-menu>
      </el-submenu>

      <el-menu-item @click="changeRouter(item)" class="nav-menu-item"
                    v-if="item.meta && item.meta.routeName && (!item.children || item.children.length === 0)"
                    :index="item.meta.forIndex">
        <img class="menu-icon" v-if="item.meta.iconDefault" :src="item.meta.iconDefault">
        <span class="menu-icon" v-else></span>
        <span slot="title">{{ item.meta.routeName }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
  import {Menu,Submenu,MenuItem,MenuItemGroup} from "element-ui";

  export default {
    name: "navMenu",
    components: {
      "el-menu" : Menu,
      "el-menu-item" : MenuItem,
      "el-submenu" : Submenu,
      "el-menu-item-group" : MenuItemGroup
    },
    props: {
      list: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    methods: {
      // 切换路由
      changeRouter(item) {
        if (this.$route.name === item.name) return;

        this.$router.push({name: item.name});
      },
    }
  }
</script>
