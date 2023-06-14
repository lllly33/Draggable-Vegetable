<template>
  <el-container>
    <el-header>
      <div id="left">
        <draggable
          :list="PreSensorlist"
          :group="{ name: 'Sensorlist', pull: 'clone', put: false }"
          @change="log"
        >
          <el-button
            type="primary"
            v-for="element in PreSensorlist"
            :key="element.sensor_id"
            @mousedown.native="giveid(element)"
            >{{ element.name }}</el-button
          >
        </draggable>
      </div>

      <div id="right">
        <draggable
          id="border"
          :list="deleted"
          :group="{ name: 'Sensorlist' }"
          @change="log"
          :class="{ 'drag-enter': isDragging }"
          @drag-enter="dragEnter"
          @drag-leave="dragLeave"
        >
          <el-button
            type="primary"
            v-for="element in deleted"
            :key="element.id"
            >{{ element.name }}</el-button
          >
        </draggable>
        <el-button
          type="danger"
          style="margin-left: 0px;"
          @click="deleteSensor()"
          >删除</el-button
        >
      </div>
    </el-header>
    <el-main style="min-height: 100px; max-height: 200px;">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          v-for="item in GreenHouseList"
          :key="item.id"
          :label="item.name"
          :name="item.id"
        >
          <draggable
            :list="tmpData"
            :group="{ name: 'Sensorlist' }"
            @change="log"
            @add="add1()"
          >
            <el-button
              type="primary"
              v-for="element in tmpData"
              :key="element.id"
              >{{ element.name }}</el-button
            >
          </draggable>
        </el-tab-pane>
      </el-tabs>
    </el-main>
    <el-footer>
      <el-table :data="tmpData" stripe style="width: 100%">
        <el-table-column prop="sensor_id" label="ID" width="180">
          <template slot-scope="scope">
            <p>{{ scope.row.sensor_id }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" width="180">
          <template slot-scope="scope">
            <p>{{ scope.row.name }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="180">
          <template slot-scope="scope">
            <p>{{ scope.row.status }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="power" label="大棚" width="180">
          <template slot-scope="scope">
            <p>{{ scope.row.ph }}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="editSensor(scope.row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-footer>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-form ref="sensorForm" :model="this.editForm" label-width="100px">
        <el-form-item label="传感器名称">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="大棚">
          <el-input v-model="editForm.ph"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="this.complete">编辑</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-container>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "AddSensor",
  components: {
    draggable
  },
  data() {
    return {
      activeName: "1",
      dialogVisible: false,
      presenttable: 1,
      presentid: null,
      presentstatus: 0,
      sensorData: [],
      tmpData: [],
      PreSensorlist: [
        { sensor_id: "1", name: "温度传感器", status: "工作", ph: "1" },
        { sensor_id: "2", name: "湿度传感器", status: "过热", ph: "1" },
        { sensor_id: "3", name: "风速传感器", status: "工作", ph: "1" },
        { sensor_id: "4", name: "光照传感器", status: "工作", ph: "1" },
        { sensor_id: "5", name: "综合传感器", status: "工作", ph: "1" }
      ],
      deleted: [],
      GreenHouseList: [
        { id: "1", name: "一号大棚" },
        { id: "2", name: "二号大棚" },
        { id: "3", name: "三号大棚" }
      ],
      sensorForm: {
        sensor_id: "",
        name: "",
        status: "",
        ph: ""
      },
      editForm: {
        sensor_id: "",
        name: "",
        status: "",
        ph: "" //有place改为ph！！！！！！！！！！！！！！！！！！！！！
      },
      isDragging: false
    };
  },
  methods: {
    async complete() {
      const res = await this.$http.post("sensor/edit", this.editForm);
      if (res.status == 200) {
        //更新传感器信息
        this.getSensor();
        //关闭弹框
        //this.dialogVisible = false;
        this.$router.go(0);
        // console.log(res);
        this.$message({
          message: "编辑成功",
          type: "success"
        });
      }
    },
    editSensor(row) {
      console.log(row);
      this.dialogVisible = true;
      this.editForm.sensor_id = row.sensor_id;
      this.editForm.name = row.name;
      this.editForm.ph = row.ph;
      this.editForm.status = row.status;
      //console.log(this.editForm);
    },
    async deleteSensordata(sensor_id) {
      console.log(sensor_id);
      const res = await this.$http.get("sensor/delete?sensor_id=" + sensor_id);
      if (res.status == 200) {
        this.getSensor();
        this.$message({
          message: "删除成功",
          type: "success"
        });
      }
    },
    async addForm() {
      const res = await this.$http.post("sensor/new", this.sensorForm);
      if (res.status == 200) {
        this.$message({
          message: res.data,
          type: "success"
        });
      }
    },
    handleClick(tab) {
      this.tmpData = [];
      this.presenttable = tab._props.name;
      this.getSensor();
      for (let item of this.sensorData) {
        if (tab._props.name == item.ph) {
          this.tmpData.push(item);
        }
      }
    },
    add1() {
      this.sensorForm.status = this.presentstatus;
      this.sensorForm.sensor_id = this.presentid;
      this.sensorForm.ph = this.presenttable;
      this.addForm();
      // this.handleClick(this.sensorForm.ph);
      //this.handleClick(this.sensorForm.ph);
    },
    deleteSensor() {
      for (let item of this.deleted) {
        this.deleteSensordata(item.sensor_id);
      }
      this.deleted = [];
    },
    log: function(evt) {
      window.console.log(evt);
      this.sensorForm.name = evt.added.element.name;
      this.sensorForm.sensor_id = Date.parse(new Date()) + evt.added.element.id;
      //console.log(evt.added.element.id);
    },
    async getSensor() {
      const res = await this.$http.get("sensor/find");
      if (res.status == 200) this.sensorData = res.data;
      //console.log(this.sensorData);
    },
    dragEnter() {
      this.isDragging = true;
    },
    dragLeave() {
      this.isDragging = false;
    },
    initsensor() {
      this.getSensor();
      for (let item of this.sensorData) {
        this.PreSensorlist.push(item);
      }
    },
    giveid(key) {
      console.log("被按了" + key);
      console.log(key.sensor_id);
      //this.presentid = key.sensor_id + (Date.parse(new Date()) % 9);
      this.presentid = key.sensor_id
      this.presentstatus = key.status;
      console.log(this.presentid);
      console.log(this.presentstatus);
    }
  },
  mounted() {
    this.getSensor();
    //this.handleClick();
    this.initsensor();
  }
};
</script>

<style>
.el-header {
  display: flex;
}
#left {
  width: 50%;
}
#right {
  width: 40%;
  display: flex;
}
#border {
  width: 85%;
  border: 3px solid;
  padding: 8px;
  box-sizing: border-box;
  background-color: #ffffff;
  transition: background-color 0.5s;
}
.drag-enter {
  background-color: #f00;
}
</style>
