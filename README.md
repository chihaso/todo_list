# Vue.jsによるToDoリスト
本リポジトリは[フィヨルドブートキャンプ](https://bootcamp.fjord.jp/)の提出課題です。
HTML, CSS, JSのみで作成しております。

## 外観
[![VueによるToDoリスト.png](https://bootcamp.fjord.jp/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBMlc4QVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--656f97ddff01637c2fcd96b8613828e3368cabde/Vue%E3%81%AB%E3%82%88%E3%82%8BToDo%E3%83%AA%E3%82%B9%E3%83%88.png)](https://bootcamp.fjord.jp/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBMlc4QVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--656f97ddff01637c2fcd96b8613828e3368cabde/Vue%E3%81%AB%E3%82%88%E3%82%8BToDo%E3%83%AA%E3%82%B9%E3%83%88.png)

## できること
* 入力フォームにテキストを入力して「追加」ボタンを押すと、ToDoが追加されます。
* 実行済みのToDoをチェックすることでテキストのスタイルが変化します。
* LocalStorageにより、ブラウザをリロードしてもリストの状態が維持されます。
* 「チェック済みの項目を削除」ボタンを押すと、チェック済みの項目がリストから削除されます。

## テストについて
SeleniumとmochaによるUIテストを添付しています。
* テストを実行するには、プロジェクトルートに実行可能なwebdriverを保存する必要があります。
* プロジェクトルートにて`npm test`コマンドを実行すると、テストが実行できます。

なお、[ChromeDriver 80.0.3987.106](https://chromedriver.storage.googleapis.com/index.html?path=80.0.3987.106/)にてテストが完了することを確認しております。
