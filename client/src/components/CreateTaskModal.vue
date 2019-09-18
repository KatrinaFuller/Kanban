<template>
  <div v-bind:id="`create-task-modal-${this.listId}`" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add a Task</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="addTask()">
            <div class="form-group">
              <label for="description">Task</label>
              <input
                type="text"
                class="form-control"
                id="description"
                placeholder="Enter description"
                v-model="newTask.description"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "create-task-modal",
  data() {
    return {
      newTask: {
        description: ""
      }
    };
  },
  props: ["listId"],
  computed: {},
  methods: {
    addTask() {
      this.newTask.boardId = this.$route.params.boardId;
      this.newTask.listId = this.listId;
      this.$store.dispatch("addTask", this.newTask);
      this.newTask = {};
      $(".close").click();
    }
  },
  components: {}
};
</script>


<style scoped>
</style>