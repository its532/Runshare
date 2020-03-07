
## Runshare
<img width="962" alt="スクリーンショット 2020-02-17 10 44 22" src="https://user-images.githubusercontent.com/52303699/74894776-4b044f80-53d3-11ea-8fde-79e6eef73e3c.png">

全国のランナー、ウォーキングをしている方のおすすめランニング、ウォーキングコースを共有し今まで知らなかったコースや仲間に出会うことを目的としたサービス。

自分自身の競技生活を通してランニング、ウォーキングは 運動不足解消、ストレス解消、ダイエットなどのメリットはよく知られているが、景色やコースを楽しめること、また仲間でランニング、ウォーキングすることはコミュニケーションの場にもなり精神面でも楽になることも良さだと考える。

全国のランニング、ウォーキングを楽しまれている方に新たな景色やコース、仲間を見つけてランニングをより楽しんで頂きたいとの想いから制作した。

<h4>サーバー側のコードはRunshare-serverリポジトリ</h4>


### 環境構築

Server Side: Firebase</br>
Frontend: React(Redux)</br>
Docker

Email　test@test.jp　Pw 123456　でログインできます

イメージをビルド</br>
`docker-compose build`

依存ライブラリのインストール</br>
`docker-compose run —-rm node npm install`

 コンテナ起動</br>
 `docker-compose up`
 
 コンテナ停止</br>
 `docker-compose down`

Cannot read property 'apply' of undefined</br>
エラーが出る場合がありますので
redux dev toolsをコメントアウトしています</br>

src/redux/store.js</br>
`window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()`
