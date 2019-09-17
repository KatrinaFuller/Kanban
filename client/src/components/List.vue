<template>
  <div class="List col-3 border rounded">
    <h1>{{listProp.title}}</h1>
    <Task v-for="task in tasks" :taskProp="task" :listProp="list" :key="task._id" />
    <br />
    <button class="btn btn-danger" @click="removeList">Delete List</button>
    <CreateTaskModal :listId="listProp._id" />
    <button class="btn btn-primary" data-toggle="modal" data-target="#create-task-modal">Add Task</button>
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
    // viewList() {
    //   this.$router.push({
    //     name: "List",
    //     params: {
    //       listId: this.listProp._id,
    //       boardId: this.boardProp._id
    //     }
    //   });
    // },
    removeList() {
      this.$store.dispatch("removeList", this.listProp);
      // this.$store.dispatch("removeList", this.boardProp._id);
    },
    tasks() {
      return this.$store.state.tasks;
    }
  },
  components: { Task, CreateTaskModal }
};
</script>


<style scoped>
</style>