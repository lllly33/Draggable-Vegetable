(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c91d9"],{5888:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t._m(0),a("el-table",{ref:"conData",staticStyle:{width:"642px",margin:"20px"},attrs:{data:t.conData,"highlight-current-row":"",height:"500",border:""}},[a("el-table-column",{attrs:{type:"index",label:"索引",width:"120"}}),a("el-table-column",{attrs:{property:"sensor_id",label:"传感器id",width:"120"}}),a("el-table-column",{attrs:{property:"control_id",align:"center",label:"控制属性",width:"200"}}),a("el-table-column",{attrs:{property:"intensity",align:"center",label:"强度",width:"200"}})],1)],1)},l=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"head"},[a("h1",[t._v("控制日志（显示所有操作记录）")])])}],r={data(){return{conData:[]}},methods:{async getConData(){const t=await this.$http.post("find_control_logs_All");200==t.status&&(this.conData=t.data)}},mounted(){this.getConData()}},i=r,o=a("2877"),s=Object(o["a"])(i,n,l,!1,null,null,null);e["default"]=s.exports}}]);
//# sourceMappingURL=chunk-2d0c91d9.29cdbed1.js.map