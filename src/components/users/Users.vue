<template>
  <div>
    <!-- 面包屑导航区域 -->
    <Breadcrumb name1="用户管理" name2="用户列表" />
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索框 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getUerList"
          >
            <el-button @click="getUerList" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 表格 -->
      <el-table :data="userlist" border stripe>
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChanged(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改用户 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showeditDialog(scope.row.id)"
            ></el-button>
            <!-- 删除用户 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeUserById(scope.row.id)"
            ></el-button>
            <!-- 权限设置 -->
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button
                type="warning"
                icon="el-icon-s-tools"
                size="mini"
                @click="setRole(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[2, 4, 8, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加用户 -->
    <el-dialog
      title="添加用户"
      width="50%"
      @close="addDialogClosed"
      :visible.sync="addDialogVisible"
      :before-close="handleClose"
    >
      <el-form :model="addForm" ref="addFormRef" :rules="addFormRules" label-width="100px">
        <el-form-item prop="username" label="用户姓名">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="用户密码">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱地址">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="手机号码">
          <el-input v-model.number="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">提 交</el-button>
      </div>
    </el-dialog>
    <!-- 修改用户 -->
    <el-dialog
      title="修改用户信息"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClose"
    >
      <el-form :model="editForm" ref="editFormRef" :rules="editFormRules" label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱地址">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="手机号码">
          <el-input v-model.number="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog
      title="分配角色"
      :visible.sync="setRoleDialogVisible"
      width="50%"
      @close="setRoleDialogClose"
    >
      <div>
        <p>当前的用户: {{ userInfo.username }}</p>
        <p>当前的角色: {{ userInfo.role_name }}</p>
        <p>
          分配角色:
          <el-select v-model="selectedRoleId" placeholder="请选择">
            <el-option
              v-for="item in rolesList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from '../Breadcrumb.vue'
export default {
  name: 'User',
  components: { Breadcrumb },
  data() {
    const checkMobile = (rule, value, cb) => {
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (reg.test(value) || value === '') {
        cb()
      } else {
        cb(new Error('手机号码格式不正确'))
      }
    }
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 8
      },
      userlist: [],
      total: 0,
      addDialogVisible: false,
      editDialogVisible: false,
      setRoleDialogVisible: false,
      // 添加用户表单对象
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editForm: {},
      addFormRules: {
        username: [
          { required: true, message: '请输入活用户名称', trigger: 'blur' },
          { min: 3, max: 8, message: '用户名长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入活用户密码', trigger: 'blur' },
          { min: 6, max: 16, message: '用户名长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        email: [{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
        mobile: [{ validator: checkMobile, trigger: 'blur' }]
      },
      editFormRules: {
        email: [{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
        mobile: [{ validator: checkMobile, trigger: 'blur' }]
      },
      userInfo: {},
      rolesList: [],
      selectedRoleId: ''
    }
  },
  created() {
    this.getUerList()
  },
  methods: {
    async getUerList() {
      const { data: res } = await this.$http.get('users', { params: this.queryInfo })
      // console.log(res)
      if (res.meta.status !== 200) return this.$message.error('获取用户列表失败')
      this.userlist = res.data.users
      this.total = res.data.total
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getUerList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      // console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getUerList()
    },
    // 监听 switch 开关状态的改变
    async userStateChanged(userinfo) {
      const { data: res } = await this.$http.put(`users/${userinfo.id}/state/${userinfo.mg_state}`)
      if (res.meta.status !== 200) {
        userinfo.mg_state = !userinfo.mg_state
        return this.$message.error('更新用户状态失败')
      }
      this.$message.success('更新用户状态成功！')
    },
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    editDialogClose() {
      this.$refs.editFormRef.resetFields()
    },
    setRoleDialogClose() {
      this.selectedRoleId = ''
      this.userInfo = {}
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    addUser() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('users', this.addForm)
        if (res.meta.status !== 201) {
          this.$message.error('添加失败')
        }
        this.$message.success('添加成功')
        this.addDialogVisible = false
        this.getUerList()
      })
    },
    async showeditDialog(id) {
      const { data: res } = await this.$http.get(`users/${id}`)
      if (res.meta.status !== 200) {
        return this.$message.error('查询用户失败')
      }
      this.editForm = res.data
      this.editDialogVisible = true
    },
    editUser() {
      this.$refs.editFormRef.validate(async valid => {
        // console.log(editinfo)
        if (!valid) return
        const { data: res } = await this.$http.put(`users/${this.editForm.id}`, {
          email: this.editForm.email,
          mobile: this.editForm.mobile
        })
        if (res.meta.status !== 200) {
          return this.$message.error('更新用户失败')
        }
        this.editDialogVisible = false
        this.getUerList()
        this.$message.success('更新用户成功！')
        // console.log(valid)
      })
    },
    async removeUserById(id) {
      const confirmResult = await this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      const { data: res } = await this.$http.delete(`users/${id}`)
      if (res.meta.status !== 200) {
        return this.$message.error('删除用户失败')
      }
      this.getUerList()
      this.$message.success('删除用户成功')
    },
    async setRole(userInfo) {
      this.userInfo = userInfo
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败')
      }
      this.rolesList = res.data
      this.setRoleDialogVisible = true
    },
    async saveRoleInfo() {
      if (!this.selectedRoleId) {
        return this.$message.error('请选择分配角色')
      }
      const { data: res } = await this.$http.put(`users/${this.userInfo.id}/role`, {
        rid: this.selectedRoleId
      })
      if (res.meta.status !== 200) {
        return this.$message.error('更新角色失败')
      }

      this.$message.success('更新角色成功')
      this.getUerList()
      this.setRoleDialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped></style>
