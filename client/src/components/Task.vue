<template>
  <!-- entire task column -->
  <div class="Task col-12">
    <div class="card">
      <div class="card-body">
        <h3>
          {{taskProp.description}}
          <button
            type="button"
            class="btn btn-default x"
            @click="removeTask"
          >X</button>
        </h3>
        <hr />
        <!-- comments -->
        <div v-for="comment in this.taskProp.comments" :key="comment._id">
          <p>
            {{comment.content}}
            <button
              type="button"
              class="btn btn-default x"
              @click="removeComment(comment)"
            >X</button>
          </p>
        </div>
        <!-- input to add comments -->
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Enter comment"
            v-model="newComment.content"
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              @click="addComment"
            >Add Comment</button>
          </div>
        </div>
      </div>
    </div>
    <br />
  </div>
</template>


<script>
export default {
  name: "Task",
  props: ["taskProp"],
  data() {
    return {
      newComment: {}
    };
  },
  computed: {},
  methods: {
    removeTask() {
      this.$store.dispatch("removeTask", this.taskProp);
    },
    addComment() {
      this.newComment.listId = this.taskProp.listId;
      this.newComment.taskId = this.taskProp._id;
      this.$store.dispatch("addComment", this.newComment);
    },
    removeComment(comment) {
      comment.taskId = this.taskProp._id;
      comment.listId = this.taskProp.listId;
      this.$store.dispatch("removeComment", comment); //check if this is correct
    }
  },
  components: {}
};
</script>


<style scoped>
.x {
  color: red;
}
.card {
  background-color: #e5e7eb;
}
</style>