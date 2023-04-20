短網址處理網頁
====
AC 2-3後端_A14作業_測試cookie

-------
產品功能
-----
- 執行seed之後建立user資料庫
- 可於首頁測試帳號密碼相符以及不相符的情況
- 一旦登入成功後, 伺服器會傳送最後登入資訊給瀏覽器. 之後就會一直用這個登入了. 除非手動刪除cookie

使用套件
-----
- express: 4.18.2
- express-handlebars: 7.0.1
- mongoose: 7.0.0
- dotenv: 16.0.3
- cookie-parser: 1.4.6


安裝方式
----
1.使用終端機於套件覆蓋路徑, ，Clone 此專案, 

    $ git clone https://github.com/playcsgo/A13_login.git
    
2.安裝套件

    $ npm -i express express-handlebars mongoose dotenv
    
3.創建.env檔案 

    將mongoDB的連線字串複製上來
    MONGODB_URI = 連線字串
    
4.啟動
    
    於專案檔案根目錄下
    使用者模式:
    $ npm run start  
    開發模式:
    $ npm run dev
    
    出現以下訊息表示成功開啟
    express is runing on http://localhost3000
    mongoDB connected!!