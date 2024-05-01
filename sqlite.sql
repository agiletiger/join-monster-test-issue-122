DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  created_at DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS user_tags;
CREATE TABLE user_tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  tag_id INTEGER NOT NULL,
  type VARCHAR(8),
  created_at DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS tags;
CREATE TABLE tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  body VARCHAR(255),
  created_at DEFAULT CURRENT_TIMESTAMP
);

insert into users (first_name, last_name) values ('John', 'Doe');

insert into tags (body) values ('tag1');
insert into tags (body) values ('tag2');
insert into tags (body) values ('tag3');
insert into tags (body) values ('tag4');
insert into tags (body) values ('tag5');
insert into tags (body) values ('tag6');
insert into tags (body) values ('tag7');
insert into tags (body) values ('tag8');
insert into tags (body) values ('tag9');
insert into tags (body) values ('tag10');

insert into user_tags (user_id, tag_id, type) values (1, 1, 'a');
insert into user_tags (user_id, tag_id, type) values (1, 2, 'b');
insert into user_tags (user_id, tag_id, type) values (1, 3, 'a');
insert into user_tags (user_id, tag_id, type) values (1, 4, 'b');
insert into user_tags (user_id, tag_id, type) values (1, 5, 'a');
insert into user_tags (user_id, tag_id, type) values (1, 6, 'b');
insert into user_tags (user_id, tag_id, type) values (1, 7, 'a');
insert into user_tags (user_id, tag_id, type) values (1, 8, 'b');
insert into user_tags (user_id, tag_id, type) values (1, 9, 'a');
insert into user_tags (user_id, tag_id, type) values (1, 10, 'b');
