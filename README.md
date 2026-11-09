# スタッフ別活動レポート

## 編集する方へ

HTMLやMarkdownを書き換える必要はありません。Pages CMSの「レポートの見た目と文言」で変更して保存すると、GitHub Pagesに自動反映される構成です。

1. 管理者から共有されたPages CMSの編集画面を開きます。
2. 「レポートの見た目と文言」を開き、タイトル・文字サイズ・色・カードの余白などを変更します。
3. 保存します。保存は公開につながるため、入力内容を確認してください。
4. GitHub Actionsの公開処理が完了したら、レポートを再読み込みします。

実績値・対象者・判定はGAS側で集計します。デザイン設定は別ファイルに保存するため、日次の実績更新で上書きされません。

## 管理者の初期設定

- GitHubにこのフォルダを新しいリポジトリとして登録します。
- Settings → Pages → Sourceを「GitHub Actions」に設定します。
- https://app.pagescms.org/ にGitHubでログインし、このリポジトリだけを対象にアプリを接続します。
- 必要に応じて上司をPages CMSへメール招待します。
- GAS接続は設定済みです（バージョン52）。再設置時のみ `gas/PagesExport.gs` を利用します。
- `site/connection.json` のGAS URLを確認します。

## 構成

- `site/design.json`: 編集画面で保存するデザインと文言。
- `.pages.yml`: コード不要の編集フォーム定義。
- `site/index.html`: 全エリア共通の閲覧画面。
- `site/connection.json`: 実績データの接続先。
- `.github/workflows/pages.yml`: 保存後の自動公開。

エリアURLは `?area=iwate` などを使用します。GitHub Pagesで公開されるレポートはURLを知っている人が閲覧できます。

## 状態

初期構築中。GASのJSON接続機能は2026年11月9日にバージョン52として公開済み。ローカルの別オリジン画面から岩手の実データ11名を読み込めることを確認済みです。GitHubへの設置・Pages CMS認証・GitHub Pages上での接続はログイン待ちです。
