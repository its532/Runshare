
## Runshare

自分自身の競技生活を通してランニングは
運動不足解消、ストレス解消、ダイエットなどのメリットはあると思うが、景色やコースを楽しめること、また仲間でランニングすることはコミュニケーションの場にもなり精神面でも楽になることもランニングの良さだと思う。
そこで全国のランナー、ウォーキングしている方のおすすめランニング、ウォーキングコースを共有すれば今まで知らなかったコースや仲間に出会えることができるのではと思い制作した。

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
