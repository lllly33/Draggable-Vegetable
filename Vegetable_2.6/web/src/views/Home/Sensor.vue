<template>
  <div>
    <!--使用draggable组件-->
    <div class="itxst">
      <div class="col">
        <div class="title">现有传感器</div>
        <draggable
          v-model="arr1"
          :group="groupA"
          animation="300"
          dragClass="dragClass"
          ghostClass="ghostClass"
          chosenClass="chosenClass"
          @start="onStart"
          @end="onEnd"
        >

          <transition-group :style="style">
            <div class="item" v-for="item in sensorData" :key="item.sensor_id">
              {{ item.name }}
            </div>
          </transition-group>


        </draggable>
      </div>
      <div class="col">
        <div class="title">大棚1</div>
        <draggable
          v-model="arr2"
          :group="groupB"
          animation="300"
          dragClass="dragClass"
          ghostClass="ghostClass"
          chosenClass="chosenClass"
          @start="onStart"
          @end="onEnd"
        >
          <transition-group :style="style">
            <div class="item" v-for="item in arr2" :key="item.sensor_id">
              {{ item.name }}
            </div>
          </transition-group>
        </draggable>
      </div>
    </div>
  </div>
</template>
<script>
//导入draggable组件
import draggable from "vuedraggable";
export default {
  //注册draggable组件
  components: {
    draggable
  },
  data() {
    return {
      drag: false,
      groupA: {
        name: "site",
        pull: true, //可以拖从
        put: true //可以拖出
      },
      groupB: {
        name: "site",
        pull: true,
        put: true
      },
      //定义要被拖拽对象的数组
      arr1: [
        { id: 1, name: "温度传感器" },
        { id: 2, name: "湿度传感器" },
        { id: 3, name: "光照传感器" },
        { id: 4, name: "ph传感器" }
      ],
      arr2: [], //空数组
      //空数组之在的样式，设置了这个样式才能拖入

      style: "min-height:120px;display: block;",

      sensorData: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      editForm: {
        sensor_id: "",
        name: "",
        status: "",
        place: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    async getSensor() {
      const res = await this.$http.get("sensor/find");
      if (res.status == 200) {
        this.sensorData = res.data;
        // console.log(res);
      }
    },
    //开始拖拽事件
    onStart() {
      this.drag = true;
    },
    //拖拽结束事件
    onEnd() {
      this.drag = false;
    }
  },
  mounted() {
    this.getSensor();
  }
};

</script>
<style scoped>
/*定义要拖拽元素的样式*/
.ghostClass {
  background-color: rgb(118, 118, 235) !important;
}
.chosenClass {
  background-color: rgb(70, 91, 134) !important;
  opacity: 1 !important;
}
.dragClass {
  background-color: rgb(126, 236, 255) !important;
  opacity: 1 !important;
  box-shadow: none !important;
  outline: none !important;
  background-image: none !important;
}
.itxst {
  margin: 10px;
}
.title {
  padding: 6px 12px;
}
.col {
  width: 40%;
  flex: 1;
  padding: 10px;
  border: solid 1px #eee;
  border-radius: 5px;
  float: left;
}
.col + .col {
  margin-left: 10px;
}

.item {
  padding: 6px 12px;
  margin: 0px 10px 0px 10px;
  border: solid 1px #eee;
  background-color: #f1f1f1;
}
.item:hover {
  background-color: #fdfdfd;
  cursor: move;
}
.item + .item {
  border-top: none;
  margin-top: 6px;
}
</style>
