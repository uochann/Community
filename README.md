# Community

## アプリケーション概要
##### このアプリケーションでは、グループチャットに特化したアプリケーションです。

## 開発環境

### OS
##### Mac, Linux

### 言語
##### Ruby on Rails, JavaScript,

### DB
##### Mysql, 

## URL
##### <https://original-app-30549.herokuapp.com/>

## 利用方法
##### アカウント登録を行っていただき、ログインしたらトップページに遷移します。  その後、画面上部にある、ナビバーにルームを作成するボタンがあるので、クリックしていただき、ルーム名を作成できます。そしてルームに招待するユーザーを指定し、作成します。トップページには参加してるルームが表示され、いつでもトークルームに入ることができます。

## testアカウント

### ユーザー1
##### email: tanaka@com
##### password: tanaka0

### ユーザー2
##### email: satou@com
##### password: satou0


# 課題解決
##### 複数にでコミュニケーションをとることができるので、周知や、リマインドを複数の参加者に発信できます。
##### カレンダー機能により、コミュニケーションを取れない時もカレンダーを記入することで、相手の用意を把握することができる

# 要件定義
## ユーザー管理機能
##### ユーザーそれぞれがアカウントを持つことで、アカウントごとに異なるやりとりや、メッセージをすることができる。さらにログイン機能の実装により、瞬時にアカウントごとのページに遷移できます。

## ルーム機能
##### ユーザーが好きな人とやりとりをするために、孤立した空間を作成することができる。参加していないユーザーからはアクセスすることはできません。

## メッセージ機能
##### 個人間でやりとりするための機能。写真でのやりとりも可能です。

## カレンダー機能
##### トーク相手とのカレンダーを共有できる

# 今後実装予定の機能
## 開発環境にDockerを導入します。



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
