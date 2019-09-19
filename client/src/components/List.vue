<template>
  <div class="List col-3 border rounded">
    <div class="title">
      <span class="remove-list" @click="removeList">{{listProp.title}}</span>
      <span class="delete-list">x</span>
    </div>
    <Task v-for="task in tasks" :taskProp="task" :key="task._id" />
    <br />
    <CreateTaskModal :listId="listProp._id" />
    <button
      class="btn add-task"
      data-toggle="modal"
      :data-target="`#create-task-modal-${this.listProp._id}`"
    >Add Task</button>
  </div>
</template>


<script>
import Task from "../components/Task";
import CreateTaskModal from "../components/CreateTaskModal";

export default {
  name: "List",
  props: ["listProp"],
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getTasksById", this.listProp._id);
  },
  computed: {
    tasks() {
      return this.$store.state.tasks[this.listProp._id] || [];
    }
  },
  methods: {
    removeList() {
      this.$store.dispatch("removeList", this.listProp);
    }
  },
  components: { Task, CreateTaskModal }
};
</script>


<style scoped>
.title {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 35px;
}
.List {
  background-color: #f2f2f1;
  margin: 5px;
  font-size: 19px;
}
.add-task {
  background-color: #c5afbc;
}
.delete-list {
  color: red;
  font-weight: bold;
}
</style>