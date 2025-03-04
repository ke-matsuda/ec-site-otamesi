-- productsテーブルの作成
CREATE TABLE products(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    price DECIMAL(10, 2) NOT NULL,
    imageurl VARCHAR(255),
    is_in_cart BOOLEAN DEFAULT FALSE
);

-- productsテーブルのデータ挿入
INSERT INTO products(
    name,
    description,
    price,
    imageurl
)
VALUES
(
    '任天堂スイッチ',
    '任天堂が出しているゲーム',
    35000,
    'https://m.media-amazon.com/images/I/51ROyu2HXoL._AC_UF1000,1000_QL80_.jpg'
),
(
    'セガサターン',
    'セガが出していたゲーム',
    20000,
    'https://www.sega.jp/history/hard/img/segasaturn/topics_img_1.jpg'
),
(
    'バーチャルボーイ',
    '不明',
    50000,
    'https://www.nintendo.co.jp/n09/vue/vb.gif'
),
-- 追加分
(
    'プレイステーション5',
    'ソニーの最新ゲーム機',
    60000,
    'https://image.yodobashi.com/product/100/000/001/008/128/676/100000001008128676_10204.jpg'
),
(
    'Xbox Series X',
    'マイクロソフトの次世代ゲーム機',
    55000,
    'https://m.media-amazon.com/images/I/51hV2qz3WuL.__AC_SX300_SY300_QL70_ML2_.jpg'
),
(
    'ゲームボーイアドバンス',
    '携帯型ゲーム機の名作',
    12000,
    'https://www.famitsu.com/images/000/216/261/y_60544a4baab79.jpg'
),
(
    'ニンテンドー3DS',
    '裸眼で3Dが楽しめる携帯ゲーム機',
    15000,
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Nintendo-3DS-AquaOpen.jpg/640px-Nintendo-3DS-AquaOpen.jpg'
),
(
    'ドリームキャスト',
    'セガ最後の家庭用ゲーム機',
    25000,
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Dreamcast-Console-Set.png/640px-Dreamcast-Console-Set.png'
),
(
    'プレイステーション2',
    '世界で最も売れたゲーム機',
    20000,
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/PlayStation_2.png/640px-PlayStation_2.png'
),
(
    'Nintendo 64',
    'スーパーマリオ64など名作多数',
    18000,
    'https://upload.wikimedia.org/wikipedia/commons/9/99/Nintendo-64-wController-L.jpg'
),
(
    'PSP',
    '携帯ゲーム機の革命児',
    15000,
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/PSP-1000.png/640px-PSP-1000.png'
),
(
    'ゲームキューブ',
    '任天堂のキューブ型ゲーム機',
    16000,
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Gamecube-top.jpg/640px-Gamecube-top.jpg'
),
(
    'Wii',
    'モーションコントロールで大ヒット',
    22000,
    'https://upload.wikimedia.org/wikipedia/commons/5/5b/Wii-console.jpg'
);


-- usersテーブルの作成
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE
);

-- usersテーブルのデータ挿入
INSERT INTO users (username) VALUES ('ユーザー１');

-- cartテーブルの作成（user_idとproduct_idの組み合わせで管理）
CREATE TABLE cart (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,	
	created_by INT NOT NULL,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	updated_by INT NOT NULL,
    UNIQUE (user_id, product_id)  -- 1ユーザーが同じ商品を複数回追加できないようにする
);