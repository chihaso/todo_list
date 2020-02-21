const { Builder, By } = require("selenium-webdriver");
const chai = require("chai");
const assert = chai.assert;
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

  it("チェックボックスにチェックを入れるとテキストに取り消し線がついて文字色がグレーになる", async () => {
    const gray = [
      "gray",
      "#808080",
      "rgb(128, 128, 128)",
      "rgba(128, 128, 128, 1)"
    ];
    await driver.get(
      "file:///Users/yuta/Documents/Vue/todo_list/todo-list.html"
    );
    await driver.findElement(By.id("status")).click();

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
});
