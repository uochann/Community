# Community

## アプリケーション概要
##### このアプリケーションでは、グループチャットに特化したアプリケーションです。

## URL
##### <https://original-app-30549.herokuapp.com/>

## 利用方法
##### アカウント登録を行っていただき、ログインしたらトップページに遷移します。  その後、画面上部にある、ナビバーにルームを作成するボタンがあるので、クリックしていただき、ルーム名を作成できます。そしてルームに招待するユーザーを指定し、作成します。トップページには参加してるルームが表示され、いつでもトークルームに入ることができます。



# 課題解決
##### 複数にでコミュニケーションをとることができるので、周知や、リマインドを複数の参加者に発信できます。

# 要件定義
## ユーザー管理機能
##### ユーザーそれぞれがアカウントを持つことで、アカウントごとに異なるやりとりや、メッセージをすることができる。さらにログイン機能の実装により、瞬時にアカウントごとのページに遷移できます。

## ルーム機能
##### ユーザーが好きな人とやりとりをするために、孤立した空間を作成することができる。参加していないユーザーからはアクセスすることはできません。

## メッセージ機能
##### 個人間でやりとりするための機能。写真でのやりとりも可能です。

# 今後実装予定の機能
## ・AWSのEC2を利用し、自動デプロイをします。

## ・メッセージ機能の非同期通信化

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
| content | string     |                                |
| user    | references | null: false, foreign_key: true |
| room    | references | null: false, foreign_key: true |

### Association

- belongs_to :room
- belongs_to :user
