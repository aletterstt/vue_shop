<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
 
</el-breadcrumb>
<!-- 卡片视图区域 -->
<el-card >
  <el-row :gutter="20">
  <el-col :span="10">
  <el-input placeholder="请输入内容"  class="input-with-select" v-model="queryInfo.query"  clearable @clear="getUserList">
     <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
  </el-input>
    </el-col>
    <el-col :span="4"></el-col>
 <el-col :span="4">
<el-button type="primary" @click="dialogVisible =true ">添加用户</el-button>
 </el-col>
 </el-row>
 </el-card>
 <!-- 用户列表 -->
 <el-table
    :data="userList"
    border
    stripe
    style="width: 100%">
    <el-table-column type="index">
    </el-table-column>
    <el-table-column
      prop="username"
      label="姓名">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      width="180px">
    </el-table-column><el-table-column
      prop="mobile"
      label="电话">
    </el-table-column>
    <el-table-column
      prop="role_name"
      label="角色">
    </el-table-column>
    <el-table-column label="状态" >
      <template slot-scope="scope">
       <el-switch
       v-model="scope.row.mg_state"
       active-color="#13ce66"
       @change="userStateChanged(scope.row)"
      >
     </el-switch>
      </template>
    </el-table-column>
    <el-table-column
      label="操作" width="180px">
      <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeEdit(scope.row.id)"></el-button>
        <el-tooltip class="item" effect="dark" content="分配角色" placement="top">
        <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
        </el-tooltip>
      </template>
    </el-table-column>
    
  </el-table>

  <!-- 分页 -->
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1,2,5,10]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

<!-- 提示框 -->
   <el-dialog
  title="添加用户"
  :visible.sync="dialogVisible"
  width="50%"
  @close="addClose"
  >
  <el-form ref="addForm" :rules="addRules" :model="addUsers" label-width="80px">
  <el-form-item label="用户名" prop="username">
    <el-input v-model="addUsers.username" prop="username"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input v-model="addUsers.password"></el-input>
  </el-form-item><el-form-item label="邮箱" prop="email">
    <el-input v-model="addUsers.email"></el-input>
  </el-form-item><el-form-item label="电话" prop="phone">
    <el-input v-model="addUsers.phone"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary"  @click="sure" >确 定</el-button>
  </span>
</el-dialog>
    
<!-- 编辑用户 -->
<el-dialog
  title="提示"
  :visible.sync="editDialogVisible"
  width="40%"
  >
 <el-form :model="editForm" :rules="editFormRules" ref="editFormRef"  label-width="80px">
  <el-form-item label="用户名" prop="username">
    <el-input v-model="editForm.username" disabled></el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop="email">
    <el-input v-model="editForm.email"></el-input>
  </el-form-item>
  <el-form-item label="手机号" prop="mobile">
    <el-input v-model="editForm.mobile"></el-input>
  </el-form-item>
 </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editSure" >确 定</el-button>
  </span>
</el-dialog>

  </div>
</template>

<script>
export default {
data(){
  return {
   queryInfo:{
     query:'',
   pagenum:1,
   pagesize:2
   },
   userList:[],
   total:0,
   dialogVisible: false,
   editDialogVisible:false,
   editForm:{
     username:'',
     email:'',
     mobile:'',
   },
   editFormRules:{
     email: [
            { required: true, message: '请输入邮箱', trigger: ['blur','change'] },
            { min: 3, max: 11, message: '长度在 3 到 11 个字符', trigger: ['blur','change'] }
          ],
    mobile: [
            { required: true, message: '请输入电话号码', trigger: ['blur','change'] },
            { min: 8, max: 11, message: '长度在 8 到 11 个字符', trigger: ['blur','change'] }
          ],
   },
   addUsers:{
     username:'',
     password:'',
     email:'',
     phone:''
   },
   addRules:{
     username: [
            { required: true, message: '请输入用户名', trigger: ['blur','change'] },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: ['blur','change'] }
          ],
    password: [
            { required: true, message: '请输入密码', trigger: ['blur','change']},
            { min: 3, max: 9, message: '长度在 3 到 9个字符', trigger: ['blur','change'] }
          ],
    email: [
            { required: true, message: '请输入邮箱', trigger: ['blur','change'] },
            { min: 3, max: 11, message: '长度在 3 到 11 个字符', trigger: ['blur','change'] }
          ],
    phone: [
            { required: true, message: '请输入电话号码', trigger: ['blur','change'] },
            { min: 8, max: 11, message: '长度在 8 到 11 个字符', trigger: ['blur','change'] }
          ],
   }
  }

},
created(){
   this.getUserList()
},
methods:{
 async getUserList(){
 let res = await this.$axios.get('/users',
 {params:this.queryInfo})
  console.log("用户列表",res.data);
  this.userList = res.data.data.users;
  this.total = res.data.data.total
  },
  handleSizeChange(size){
    // console.log(size);
    this.queryInfo.pagesize=size
    this.getUserList()
  },
  handleCurrentChange(num){
    console.log(num);
    this.queryInfo.pagenum = num
    this.getUserList()

  },
 async userStateChanged(userInfo){
  //  console.log(userInfo);
   let res = await this.$axios.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
   console.log('修改用户状态',res.data);
   if(res.data.meta.status !==200){
     userInfo.mg_state =!userInfo.mg_state
    return  this.$message.error(res.data.meta.msg)
   }
   else{
      this.$message.success(res.data.meta.msg)
   }
  },
  sure(){
   this.$refs.addForm.validate(async (valid) => {
          if (!valid) return false;

            this.dialogVisible= false
            let res = await this.$axios.post('users',this.addUsers)
            console.log('添加用户',res.data);
            const {status,msg} = res.data.meta
            if(status == 201){
            this.$message.success(msg)
            this.getUserList()
            }
        else{
            this.$message.error(msg)
        }
  
}) 
},
addClose(){
  this.$refs.addForm.resetFields()
},
async showEditDialog(id){
  let res = await this.$axios.get(`users/${id}`)
  console.log('获取用户信息',res.data);
  this.editForm=res.data.data
this.editDialogVisible = true
},
 editSure(){
   this.$refs.editFormRef.validate(async (valid)=>{
if(!valid) return 
  let res =await this.$axios.put(`users/${this.editForm.id}`,{
    email:this.editForm.email,
    mobile:this.editForm.mobile
  })
  console.log('编辑信息提交',res.data);
  if(res.data.meta.status==200){
    this.$message.success(res.data.meta.msg)
   this.getUserList()
   this.editDialogVisible = false
  }
   })
   
},
async removeEdit(id){
let confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)
        console.log(confirmResult);
        if(confirmResult != "confirm"){
          return
        }
       let res = await this.$axios.delete(`users/${id}`)
      //  console.log('删除用户',res.data);
        if(res.data.meta.status==200){
          this.$message.success(res.data.meta.msg)
          this.getUserList()
        }
        else{
          this.$message.info(res.data.meta.msg)
        }
        
},

}
}
</script>

<style scoped lang="less">
.el-breadcrumb{
margin: 20px 0;
}
.el-card{
  box-shadow: 0 1px 1px rgba(0 , 0, 0, 0.15) !important;
  // margin-bottom: 15px !important;
}

.el-pagination{
  margin-top: 20px;
}
</style>