const { Builder, By } = require("selenium-webdriver");
const chai = require("chai");
const assert = chai.assert;
let driver;

describe("VueによるToDoリストのUIテスト", () => {
  before(() => {
    driver = new Builder().forBrowser("chrome").build();
  });

  after(async () => {
    return driver.quit();
  });

  it("入力フォームに文字列を打って追加ボタンを押すとリストの先頭に追加される", async () => {
    await driver.get(
      "file:///Users/yuta/Documents/Vue/todo_list/todo-list.html"
    );
    const newtodo = "ごはんをたべる";
    await driver.findElement(By.id("todoInputArea")).sendKeys(newtodo);
    await driver.findElement(By.id("addTodoButton")).click();
    assert.equal(
      await driver.findElement(By.className("todo-text")).getText(),
      newtodo
    );
  });

  it("チェックボックスにチェックを入れるとテキストに取り消し線がついて文字色がグレーになる", async () => {
    await driver.get(
      "file:///Users/yuta/Documents/Vue/todo_list/todo-list.html"
    );
    const gray = [
      "gray",
      "#808080",
      "rgb(128, 128, 128)",
      "rgba(128, 128, 128, 1)"
    ];
    await driver.findElement(By.className("status")).click();
    assert.include(
      await driver
        .findElement(By.className("todo-text"))
        .getCssValue("text-decoration"),
      "line-through"
    );
    assert.include(
      gray,
      await driver.findElement(By.className("todo-text")).getCssValue("color")
    );
  });

  it("リロードした際にリストの項目が再現される", async () => {
    await driver.get(
      "file:///Users/yuta/Documents/Vue/todo_list/todo-list.html"
    );
    const todoTextsList = async function(className) {
      const todoTexts = await driver.findElements(By.className(className));
      const list = [];
      for (const todoText of todoTexts) {
        list.push(await todoText.getText());
      }
      return list;
    };
    const newtodo = "ひなたぼっこをする";
    await driver.findElement(By.id("todoInputArea")).sendKeys(newtodo);
    await driver.findElement(By.id("addTodoButton")).click();
    const beforeReflesh = await todoTextsList("todo-text");
    await driver.navigate().refresh();
    const afterReflesh = await todoTextsList("todo-text");
    assert.equal(beforeReflesh.toString(), afterReflesh.toString());
  });

  it("リロードした際にチェックボックスのチェック状態が再現される", async () => {
    await driver.get(
      "file:///Users/yuta/Documents/Vue/todo_list/todo-list.html"
    );
    const checksList = async function(className) {
      const checks = await driver.findElements(By.className(className));
      const list = [];
      for (const check of checks) {
        list.push(await check.isSelected());
      }
      return list;
    };
    await driver.findElement(By.className("status")).click();
    const beforeReflesh = await checksList("status");
    await driver.navigate().refresh();
    const afterReflesh = await checksList("status");
    assert.equal(beforeReflesh.toString(), afterReflesh.toString());
  });

  it("「チェック済みの項目を削除」ボタンを押すとチェック済みの項目が削除される", async () => {
    await driver.get(
      "file:///Users/yuta/Documents/Vue/todo_list/todo-list.html"
    );
    const checkedTodosNum = async function() {
      const checks = await driver.findElements(By.className("status"));
      let num = 0;
      for (const check of checks) {
        if (await check.isSelected()) num += 1;
      }
      return num;
    };
    const allTodosNum = Object.keys(
      await driver.findElements(By.className("todo"))
    ).length;
    const doneTodosNum = await checkedTodosNum();
    await driver.findElement(By.id("deleteChecked")).click();
    const allTodosNumAfterDelete = Object.keys(
      await driver.findElements(By.className("todo"))
    ).length;
    assert.equal(allTodosNum - doneTodosNum, allTodosNumAfterDelete);
  });
});
