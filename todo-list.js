Vue.component("todo-item", {
  props: ["todo"],
  template: `<li>
      <span class="todo-text" v-bind:class="{isActive: todo.check}">
        {{ todo.text }}
      </span>
      <input id="status" type="checkbox" v-model="todo.check" />
    </li>`
});

var todoList = new Vue({
  el: "#todo-list",
  data: {
    todoItems: [
      { text: "歯を磨く", check: false },
      { text: "顔を洗う", check: false },
      { text: "起きる", check: false }
    ]
  },
  mounted() {
    if (localStorage.getItem("todoItems")) {
      this.todoItems = JSON.parse(localStorage.getItem("todoItems"));
    }
  },
  watch: {
    todoItems(newTodoitems) {
      localStorage.todoItems.text = newTodoitems.text;
    }
  }
});

var input = new Vue({
  el: "#input",
  data: {
    newTodo: ""
  },
  methods: {
    addTodo() {
      if (this.newTodo != "") {
        todoList.todoItems.unshift({ text: this.newTodo, check: false });
        this.newTodo = "";
        this.saveTodoItems();
      }
    },
    saveTodoItems() {
      const parsed = JSON.stringify(todoList.todoItems);
      localStorage.setItem("todoItems", parsed);
    }
  }
});
