<template>
  <div class="todo">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Vue Todo Managemante.</h1>
    <div class="narrow-todos">
      <p>状態で絞り込む</p>
      <label v-for="(option, index) in stateLabels" :key="index">
        <input type="radio" v-model="currentOption" :value="index">
        {{ option }}
      </label>
    </div>

    <div class="todo-table">
      <table>
        <thead v-pre>
          <tr>
            <th class="id">ID</th>
            <th class="task">タスク</th>
            <th class="memo">メモ</th>
            <th class="state">状態</th>
            <th class="button">-</th>
          </tr>
        </thead>
        <tbody>
          <!-- ToDo の要素をループ -->
          <tr
            v-for="todo in narrowedTodos"
            v-bind:key="todo.id"
            v-bind:class="{ done: wasDone(todo) }"
          >
            <th>{{ todo.id }}</th>
            <td class="task">{{ todo.task }}</td>
            <td class="memo">{{ todo.memo }}</td>
            <td class="state">
              <button @click="changeState(todo)">{{ stateLabels[todo.state] }}</button>
            </td>
            <td class="button">
              <button class="btn-danger" @click="removeTodo(todo)">削除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <addTodo></addTodo>
  </div>
</template>

<script>
// @ is an alias to /src
import AddTodo from "@/components/AddTodo";
import { getTodos } from "@/components/todoData.js";

export default {
  name: "todo",
  components: {
    AddTodo
  },
  data: function() {
    return {
      loading: false,
      todos: [],
      stateLabels: ["保留", "処理中", "完了", "すべて"],
      currentOption: 3,
      error: null
    };
  },
  created: function() {
    this.fetchData();
  },
  watch: {
    $route: "fetchDate"
  },
  methods: {
    fetchData: function() {
      this.loading = true;
      getTodos(
        function(err, todos) {
          this.loading = false;
          if (err) {
            this.error = err.toString();
          } else {
            this.todos = todos;
          }
        }.bind(this)
      );
    },
    changeState: function(todo) {
      todo.state += 1;
      if (todo.state > 2) {
        todo.state = 0;
      }
    },
    removeTodo: function(todo) {
      var removeItem = this.todos.indexOf(todo);
      this.todos.splice(removeItem, 1);
    },
    wasDone: function(todo) {
      return todo.state == 2;
    }
  },
  computed: {
    narrowedTodos: function() {
      return this.todos.filter(function(todo) {
        return this.currentOption == 3
          ? true
          : todo.state == this.currentOption;
      }, this);
    }
  }
};
</script>

<style lang='scss'>
html {
  font-size: 16px;
  box-sizing: border-box;
}
.todo {
  width: 80%;
  margin: 0 auto;
}
.narrow-todos {
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    margin-right: 30px;
  }
  label {
    display: inline-block;
    height: 24px;
    margin-right: 10px;
  }
}
.todo-table {
  margin: 40px 0;
}
table {
  width: 100%;
  border-collapse: collapse;
}
thead th {
  border-bottom: 2px solid #42b983; /*#d31c4a */
  color: #42b983;
}
th,
th {
  padding: 0 8px;
  line-height: 40px;
}
thead th.id {
  width: 50px;
}
thead th.state {
  width: 100px;
}
thead th.button {
  width: 60px;
}
tbody td.task,
tbody td.memo {
  text-align: left;
}
tbody td.button,
tbody td.state {
  text-align: center;
}
tbody tr td,
tbody tr th {
  border-bottom: 1px solid #ccc;
  transition: all 0.4s;
}
tbody tr.done td,
tbody tr.done th {
  background: #f8f8f8;
  color: #bbb;
}
tbody tr:hover td,
tbody tr:hover th {
  background: #f4fbff;
}
button {
  font-size: 0.8rem;
  font-weight: bold;
  border: none;
  border-radius: 20px;
  line-height: 24px;
  padding: 0 8px;
  background: #42b983;
  color: #fff;
  cursor: pointer;
}
.btn-danger {
  background-color: red;
}
</style>
