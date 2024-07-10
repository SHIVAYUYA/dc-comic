-- Windows環境で文字化け対応
SET CHARACTER SET utf8mb4;

create table library (
    book_id int auto_increment primary key,
    book_name varchar(255) not null,
    book_num int not null,
    book_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

insert into library (book_name,book_num) values ('hoge','1',);