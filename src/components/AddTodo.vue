<template>
  <div class="AddTodo">
    <div class="add-task-form">
      <div>
        <label>New Task</label>
        <input type="text" :style="errorMessageStyle" v-model="todo.task">
      </div>
      <div v-if="error" class="error">{{ error }}</div>
      <div>
        <label>Memo</label>
        <input type="text" v-model="todo.memo">
      </div>
      <input type="button" id="add-task-btn" @click="createTodo" value="タスクを追加">
    </div>
  </div>
</template>

<script>
import { postTodo } from "./todoData.js";
export default {
  name: "AddTodo",
  data: function() {
    return {
      sending: false,
      todo: this.defaultTodo(),
      error: null
    };
  },
  computed: {
    errorMessageStyle: function() {
      return {
        border: this.error ? "1px solid red" : ""
      };
    }
  },
  created: function() {},
  methods: {
    defaultTodo: function() {
      return {
        task: "",
        memo: "",
        state: 0
      };
    },
    createTodo: function() {
      if (this.todo.task.trim() === "") {
        this.error = "タスクは必須です";
        return;
      }
      postTodo(
        this.todo,
        function(err, todo) {
          this.sending = false;
          if (err) {
            this.error = err.toString();
          } else {
            this.error = null;
            this.todo = this.defaultTodo();
          }
        }.bind(this)
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.error {
  width: 100%;
  margin-left: 30%;
  margin-top: -10px;
  font-size: 0.8rem;
  color: red;
}
label {
  display: inline-block;
  font-size: 1.2rem;
  font-weight: bold;
  width: 30%;
}
input {
  font-size: 1rem;
  width: 60%;
}
.add-task-form {
  width: 50%;
  margin: 0 auto;
  div {
    text-align: left;
    margin-bottom: 15px;
  }
}
#add-task-btn {
  display: inline-block;
  width: 100px;

  cursor: pointer;
}
</style>
