# スタッフ別活動レポートの編集ガイド

[編集画面を開く](https://app.pagescms.org/kobayashigen-bit/staff-activity-report/main/file/design) ｜ [見た目を試す](https://kobayashigen-bit.github.io/staff-activity-report/editor.html)

## 日常の変更手順

1. 編集画面にGitHubアカウントでログインします。
2. 文言、文字サイズ（pt）、色、余白、表示する項目を変更します。文字サイズは小数点も入力できます。
3. 右上の **Save** を押します。保存すると公開処理が自動で始まります。
4. 数分後にレポートを再読み込みして確認します。

変更は13エリア共通です。個人の実績値や要確認の判定は変更されません。保存内容はGitHubに履歴として残ります。

「見た目を試す」はサンプル数字でのプレビュー専用です。ここでの変更は公開されないので、公開したい設定は編集画面で保存してください。

## 変更できる内容

- タイトル、見出し、確認メッセージ
- 文字と数字のサイズ
- 背景色、実績の色、要確認の色
- カードの余白・間隔・角丸
- 各指標の表示／非表示

色は `#173e7c` のような6桁の色コードで入力します。サイズや余白は0〜100の範囲です。設定が不正な場合は自動公開を止め、前の公開版が残ります。

## レポートURL

| エリア | レポート |
|---|---|
| 長崎 | [開く](https://kobayashigen-bit.github.io/staff-activity-report/?area=nagasaki) |
| 福岡1 | [開く](https://kobayashigen-bit.github.io/staff-activity-report/?area=fukuoka1) |
| 福岡2 | [開く](https://kobayashigen-bit.github.io/staff-activity-report/?area=fukuoka2) |
| 中国1 | [開く](https://kobayashigen-bit.github.io/staff-activity-report/?area=chugoku1) |
| 中国2 | [開く](https://kobayashigen-bit.github.io/staff-activity-report/?area=chugoku2) |
| 中国3,4 | [開く](https://kobayashigen-bit.github.io/staff-activity-report/?area=chugoku34) |
| 近畿1 | [開く](https://kobayashigen-bit.github.io/staff-activity-report/?area=kinki1) |
| 近畿2 | [開く](https://kobayashigen-bit.github.io/staff-activity-report/?area=kinki2) |
| 近畿3 | [開く](https://kobayashigen-bit.github.io/staff-activity-report/?area=kinki3) |
| 宮城 | [開く](https://kobayashigen-bit.github.io/staff-activity-report/?area=miyagi) |
| 岩手 | [開く](https://kobayashigen-bit.github.io/staff-activity-report/?area=iwate) |
| 秋田 | [開く](https://kobayashigen-bit.github.io/staff-activity-report/?area=akita) |
| 青森 | [開く](https://kobayashigen-bit.github.io/staff-activity-report/?area=aomori) |

## 実績データの更新

既存GASの毎朝8時（日本時間）の更新を継続します。データ更新でデザイン設定は上書きされません。画面はGASの保存済みデータを取得し、開いている間は定期的に再取得します。

## 上司へ共有する際に

閲覧URLと編集URLは別です。編集にはPages CMSと対象リポジトリへの権限が必要です。GitHubユーザー名が確認できたら管理者が編集者として共有します。パスワードは共有しません。

## 公開処理の確認・復元

[公開処理の状況](https://github.com/kobayashigen-bit/staff-activity-report/actions)で緑のチェックが付けば公開完了です。前の値へ戻す場合は編集画面で数値・文言を戻して保存します。履歴からの復元はリポジトリ管理者が行います。

HTML全体の構造や集計ロジックの変更は、この設定画面の対象外です。開発者がソースを編集します。
