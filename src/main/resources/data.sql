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
    'https://www.sega.jp/history/hard/segasaturn/assets/30.png'
),
(
    'バーチャルボーイ',
    '不明',
    50000,
    'https://upload.wikimedia.org/wikipedia/commons/1/1d/Virtual-Boy-Set.png'
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