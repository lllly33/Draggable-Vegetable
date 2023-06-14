<template>
  <div>
    <div class="header-container">
    <img src="../../assets/logo_veg.png" alt="Logo" class="logo">
    </div>
    <el-card shadow="always">
      <el-form
        :model="RegForm"
        :rules="regFormRules"
        ref="RegForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="RegForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="RegForm.password"></el-input>
        </el-form-item>
        <!-- <el-form-item label="权限等级" prop="level">
          <el-input v-model.number="RegForm.level"></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="registered('RegForm')"
            >注册</el-button
          >
          <el-button @click="resetForm('RegForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <footer  class="footer">
      <div class="content"></div>
      <div>成员信息：</div>
      <div>刘源 |</div>
      <div>张学凯 |</div>
      <div>陈露阳 |</div>
      <div>马新跃 |</div>
      <div>王术亮 |</div>
      <div>郑星辰 </div>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      RegForm: {
        username: "",
        password: "",
        level: null
      },
      regFormRules: {
        username: [
          {
            required: true,
            message: "请输入用户名,不少于4位",
            min: 4,
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码,不少于4位",
            min: 4,
            trigger: "blur"
          }
        ],
        level: [
          {
            required: true,
            message: "请输入权限等级",
            type: "number",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    registered(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await this.$http.post("register", this.RegForm);
          if (res.status == 200) {
            this.$message({
              message: "注册成功",
              type: "success"
            });
            this.$router.push({ path: "/Login" });
          }
        } else {
          this.$message({
            message: "注册失败",
            type: "error"
          });
          return false;
        }
      });
    }
  }
};
</script>
<style>
body {
  background: linear-gradient(to bottom, #ffffff, #dbfce4);
}
.el-card {
  width: 500px;
  height: 250px;
  padding: 40px 50px 20px 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -80%);
}
.header-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  width: 20%;
  height: auto;
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 15%;
  background: linear-gradient(to bottom,  #dffee6,#28cc9e);
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  writing-mode: horizontal-tb;
  font-family: Arial, sans-serif;
  font-size: 24px;
  line-height: 1.5;
  letter-spacing: 0.1em;
}
</style>
