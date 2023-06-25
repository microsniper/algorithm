<template>
  <div  class="outside">
    <el-container>
      <el-header class="header">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-row :gutter="20" >
<!--            <el-col :span="3" style="text-align: center">-->
<!--              <el-menu-item index="/index/addOrUpdate" >-->
<!--                <i class="el-icon-thumb"></i>-->
<!--                <span>题目上传</span>-->
<!--              </el-menu-item>-->
<!--            </el-col>-->
            <el-col :span="3" style="text-align: center">
              <el-menu-item index="/index/list">
                <i class="el-icon-reading"></i>
                <span>题目列表</span>
              </el-menu-item>
            </el-col>
          </el-row>
        </el-menu>
      </el-header>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import logo from '../assets/logo.png'
export default {
  name: 'index',
  data () {
    return {
      activeIndex: '1',
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex = key;
      this.$router.push({path: key},() => {})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .outside{
    text-align: center;
    /*border: red 1px solid;*/
    margin-left: 5%;
    margin-right: 5%;
    height: 900px
  }
  .header{
    text-align: center;
    /*border: green 1px solid;*/
    height: 20%;
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
  }
  .main{
    text-align: center;
    /*border: red 1px solid;*/
    height: 700px;
    margin-top: 50px;
    margin-left: 5%;
    margin-right: 5%;
  }
</style>
