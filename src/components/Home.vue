<template>
  <div>
    <el-container>
  <el-header>
    <div class="left">
      <img src="../assets/heima.png" alt="">电商后台管理系统
    </div>
    <div class="right">
      <el-button @click="logout" type="warning" round>退出</el-button>
    </div>
  </el-header>
  <el-container>
    <el-aside :width="isCollapse ?' 64px ': '200px'">
      <el-menu
      :collapse="isCollapse"
      unique-opened
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      router
      active-text-color="#ffd04b">
      <div class="toggle-button" @click=" toggleCollapse">|||</div>
      <el-submenu :index="'/'+item.path" v-for="item in menuList" :key="item.id" >
        <template slot="title">
          <i :class="iconsObj[item.id]"></i>
          <span>{{item.authName}}</span>
        </template>
        <el-menu-item :index="'/'+item.path" v-for="tab in item.children" :key="tab.id" @click="saveNavState($route.path)">
         <template slot="title">
          <i class="el-icon-menu"></i>
          <span>{{tab.authName}}</span>
        </template>
        </el-menu-item>
       
      </el-submenu>
    </el-menu>
    </el-aside>
    <el-main>
   <router-view></router-view>
    
    </el-main>
  </el-container>
</el-container>
  </div>
</template>

<script>
export default {
  data(){
    return {
      menuList:[],
      iconsObj:{
         '125':'el-icon-s-custom',
        '103':'iconfont icon-tijikongjian',
        '101':'iconfont icon-shangpin',
        '102':'iconfont icon-danju',
        '145':'iconfont icon-baobiao'
      },
      isCollapse:false
    }
  },
  created(){
    this.getMenuList()
  },
methods:{
  logout(){
    localStorage.removeItem('token')
    this.$message.success('退出成功')
    this.$router.push('/login')
  },
  async getMenuList(){
    let res = await this.$axios.get('/menus')
    console.log('侧边栏',res.data);
    this.menuList = res.data.data
   },
   toggleCollapse(){
     this.isCollapse = !this.isCollapse
   }
}
}
</script >
 
<style scoped lang="less">
.el-container{
  height: 1000px;
}
.el-header{
    background-color: #B3C0D1;
   display: flex;
   align-items: center;
  justify-content: space-between;
  .left{
    img{
      vertical-align: middle;
      padding-right: 20px;
    }
  }
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
    /deep/  .el-submenu__title{
      padding: 0 40px;
    }
    .el-menu{
      height: 100%;
    }
  }
  
  .el-main {
    background-color: #E9EEF3;
  }
   /deep/ .toggle-button{
    // height: 24px;
    color: #ffffff;
    line-height: 24px;
    background-color: #4a5064;
     text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
</style>