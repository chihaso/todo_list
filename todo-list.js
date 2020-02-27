var todoList = new Vue({
  el: "#todoList",
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
  methods: {
    saveCheck(check) {
      check ? false : true;
      this.saveTodoItems();
    },
    saveTodoItems() {
      const parsed = JSON.stringify(this.todoItems);
      localStorage.setItem("todoItems", parsed);
    }
  }
});

var input = new Vue({
  el: "#addNewTodo",
  data: {
    newTodo: ""
  },
  methods: {
    addTodo() {
      if (this.newTodo != "") {
        todoList.todoItems.unshift({
          text: this.newTodo,
          check: false
        });
        this.newTodo = "";
        todoList.saveTodoItems();
      }
    }
  }
});

var header = new Vue({
  el: "#header",
  methods: {
    deleteChecked() {
      console.log(todoList.todoItems.length);
      for (let i = todoList.todoItems.length - 1; i >= 0; i -= 1) {
        todoList.todoItems[i].check ? todoList.todoItems.splice(i, 1) : null;
      }
      todoList.saveTodoItems();
    }
  }
});
