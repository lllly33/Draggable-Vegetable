(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-58929426"],{"1ecd":function(e,r,s){"use strict";s("6ac1")},"6ac1":function(e,r,s){},c34d:function(e,r,s){"use strict";s.r(r);var t=function(){var e=this,r=e.$createElement,s=e._self._c||r;return s("div",[s("el-card",{attrs:{shadow:"always"}},[s("el-form",{ref:"RegForm",staticClass:"demo-ruleForm",attrs:{model:e.RegForm,rules:e.regFormRules,"label-width":"100px"}},[s("el-form-item",{attrs:{label:"用户名",prop:"username"}},[s("el-input",{model:{value:e.RegForm.username,callback:function(r){e.$set(e.RegForm,"username",r)},expression:"RegForm.username"}})],1),s("el-form-item",{attrs:{label:"密码",prop:"password"}},[s("el-input",{attrs:{type:"password"},model:{value:e.RegForm.password,callback:function(r){e.$set(e.RegForm,"password",r)},expression:"RegForm.password"}})],1),s("el-form-item",[s("el-button",{attrs:{type:"primary"},on:{click:function(r){return e.registered("RegForm")}}},[e._v("注册")]),s("el-button",{on:{click:function(r){return e.resetForm("RegForm")}}},[e._v("重置")])],1)],1)],1)],1)},a=[],o={data(){return{RegForm:{username:"",password:"",level:null},regFormRules:{username:[{required:!0,message:"请输入用户名,不少于4位",min:4,trigger:"blur"}],password:[{required:!0,message:"请输入密码,不少于4位",min:4,trigger:"blur"}],level:[{required:!0,message:"请输入权限等级",type:"number",trigger:"blur"}]}}},methods:{resetForm(e){this.$refs[e].resetFields()},registered(e){this.$refs[e].validate(async e=>{if(!e)return this.$message({message:"注册失败",type:"error"}),!1;{const e=await this.$http.post("register",this.RegForm);200==e.status&&(this.$message({message:"注册成功",type:"success"}),this.$router.push({path:"/Login"}))}})}}},l=o,n=(s("1ecd"),s("2877")),i=Object(n["a"])(l,t,a,!1,null,null,null);r["default"]=i.exports}}]);
//# sourceMappingURL=chunk-58929426.072d4a36.js.map