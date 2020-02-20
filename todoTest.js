const { Builder, By } = require("selenium-webdriver");
const assert = require("assert");
let driver;

describe("VueによるToDoリストのUIテスト", () => {
  before(() => {
    driver = new Builder().forBrowser("chrome").build();
  });

  after(() => {
    return driver.quit();
  });

  it("入力フォームに文字列を打って追加ボタンを押すとリストの先頭に追加される", async () => {
    const newtask = "ごはんをたべる";
    await driver.get(
      "file:///Users/yuta/Documents/Vue/todo_list/todo-list.html"
    );
    await driver.findElement(By.id("todoInputArea")).sendKeys(newtask);
    await driver.findElement(By.id("addTodoButton")).click();

    assert.equal(
      await driver.findElement(By.className("todo-text")).getText(),
      newtask
    );
  });

  it("チェックボックスにチェックを入れるとテキストの表示が変化する", async () => {
    await driver.get(
      "file:///Users/yuta/Documents/Vue/todo_list/todo-list.html"
    );
    await driver.findElement(By.id("status")).click();

    assert.equal(
      await driver.findElement(By.className("todo-text")).getAttribute("class"),
      "todo-text isActive"
    );
  });
});
