-- Windows環境で文字化け対応
SET CHARACTER SET utf8mb4;

create table library (
    book_id int auto_increment primary key,
    book_name varchar(255) not null,
    book_type varchar(255) not null,
    book_start_number int not null,
    book_finish_number int not null,
    book_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

insert into library (book_name,book_start_num,book_finish_number) values ('hoge','1','2');