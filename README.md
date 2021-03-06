# アプリケーション名: Community

## アプリケーション概要
##### このアプリケーションでは、グループチャットに特化したアプリケーションです。実際の現場で開発環境として使われている、dockerやCircleCi、githubやAWSなど、モダンな技術を使い開発を行いました。アプリケーション自体の目的はコミュニケーションツール(slack)イメージして作成いたしました。

## 開発環境

### OS
##### Mac, Linux

### エディタ
##### Visual Studio Code

### 言語
##### Ruby(2.6.5~), JavaScript(jquery)

### フレームワーク
##### Ruby on Rails(6.0.0~)

### DB
##### Mysql

### インフラ
##### AWS(EC2, S3, route53, cloudfront, IAM, Certificate Manager)

### ミドルウェア
##### Docker, CircleCi(自動テスト、自動デプロイ)
###### CircleCiのビルドの結果をslackで通知するように設定いたしました。

### ローカル環境
##### docker-compose

### Webサーバ
##### Nginx

### ソース管理
##### Github

### コミュニケーション
##### Slack

### タスク管理
##### Trello

## URL
##### <https://simplecommunity.work/>

## 利用方法
##### アカウント登録を行っていただき、ログインしたらトップページに遷移します。  その後、画面上部にある、ナビバーにルームを作成するボタンがあるので、クリックしていただき、ルーム名を作成できます。そしてルームに招待するユーザーを指定し、作成します。トップページには参加してるルームが表示され、いつでもトークルームに入ることができます。

## testアカウント

### ユーザー1
##### email: tanaka@gmail.com
##### password: tanaka0

### ユーザー2
##### email: satou@gmail.com
##### password: satou0


# 課題解決
##### 複数人でコミュニケーションをとることができるので、周知や、リマインドを複数の参加者に発信できます。


# 要件定義
## ユーザー管理機能
##### ユーザーそれぞれがアカウントを持つことで、アカウントごとに異なるやりとりや、メッセージをすることができる。さらにログイン機能の実装により、瞬時にアカウントごとのページに遷移できます。ログインやアカウント登録に関しては、グーグル認証を使って、簡単に取得することができるので、ユーザーがすぐにチャットできるように設定いたしました。

## ルーム機能
##### ユーザーが好きな人とやりとりをするために、孤立した空間を作成することができる。参加していないユーザーからはアクセスすることはできません。

## メッセージ機能
##### 個人間でやりとりするための機能。写真でのやりとりも可能です。擬似的な非同期通信を実装しており、メッセージを取得する際にページ遷移やリロードを行わなくても自動的に最新のメッセージを取得できます。



# テーブル設計

## users テーブル

| Column   | Type   | Options     |
| -------- | ------ | ----------- |
| name     | string | null: false |
| email    | string | null: false |
| password | string | null: false |

### Association

- has_many :room_users
- has_many :rooms, through: room_users
- has_many :messages

## rooms テーブル

| Column | Type   | Options     |
| ------ | ------ | ----------- |
| name   | string | null: false |

### Association

- has_many :room_users
- has_many :users, through: room_users
- has_many :messages


## room_users テーブル

| Column | Type       | Options                        |
| ------ | ---------- | ------------------------------ |
| user   | references | null: false, foreign_key: true |
| room   | references | null: false, foreign_key: true |

### Association

- belongs_to :room
- belongs_to :user

## messages テーブル

| Column  | Type       | Options                        |
| ------- | ---------- | ------------------------------ |
| name    | string     |                                |
| user    | references | null: false, foreign_key: true |
| room    | references | null: false, foreign_key: true |

### Association


- belongs_to :room
- belongs_to :user