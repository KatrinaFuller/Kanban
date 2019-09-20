<template>
  <!-- entire task column -->
  <div class="Task col-12">
    <div class="card">
      <div class="card-body">
        <h3 class="inline">{{taskProp.description}}</h3>
        <span class="bg-light text-danger rounded px-1 ml-1 pb-1" @click="removeTask">x</span>
        <hr />
        <!-- comments -->
        <div v-for="comment in this.taskProp.comments" :key="comment._id">
          <p>
            {{comment.content}}
            <button
              type="button"
              class="btn btn-sm x bg-light text-danger rounded px-1 ml-1 pb-1"
              @click="removeComment(comment)"
            >X</button>
          </p>
        </div>
        <CreateCommentModal :taskProp="taskProp" />
        <!-- input to add comments -->
        <!-- <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Enter comment"
            v-model="newComment.content"
          />
        </div>-->
        <div class="input-group-append justify-content-center">
          <button
            class="btn add-comment"
            type="button"
            id="button-addon2"
            data-toggle="modal"
            :data-target="`#create-comment-modal-${this.taskProp._id}`"
          >Add Comment</button>
        </div>
      </div>
      <!-- </div> -->
      <!-- dropdown  -->
      <select v-model="newListId" @change="moveTask">
        <option disabled value>Move task to:</option>
        <option v-for="list in lists" :key="list._id" :value="list._id">{{list.title}}</option>
      </select>
    </div>
    <br />
  </div>
</template>


<script>
import CreateCommentModal from "../components/CreateCommentModal";
export default {
  name: "Task",
  props: ["taskProp"],
  data() {
    return {
      newListId: ""
    };
  },
  computed: {
    lists() {
      return this.$store.state.lists;
    }
  },
  methods: {
    removeTask() {
      this.$store.dispatch("removeTask", this.taskProp);
    },
    // addComment() {
    //   this.newComment.listId = this.taskProp.listId;
    //   this.newComment.taskId = this.taskProp._id;
    //   this.$store.dispatch("addComment", this.newComment);
    // },
    removeComment(comment) {
      comment.taskId = this.taskProp._id;
      comment.listId = this.taskProp.listId;
      this.$store.dispatch("removeComment", comment);
    },
    moveTask() {
      // console.log("it changed!1");
      let payload = {
        taskId: this.taskProp._id,
        listId: this.newListId,
        currentListId: this.taskProp.listId
      };
      this.$store.dispatch("moveTask", payload);
    }
  },
  components: { CreateCommentModal }
};
</script>
 

<style scoped>
.x {
  color: #cb3232;
  background-color: #f9fafc;
}
.card {
  background-color: #a2798f;
  color: #f2f2f1;
}
.add-comment {
  background-color: #8caba8;
}
.inline {
  display: inline;
}
</style>