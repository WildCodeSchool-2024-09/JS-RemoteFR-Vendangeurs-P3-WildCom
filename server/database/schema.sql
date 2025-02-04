create table user (
  id int unsigned primary key auto_increment not null,
  email varchar(255) not null unique,
  firstname varchar(255) not null,
  lastname varchar(255) not null,
  password varchar(255) not null,
  avatar varchar(255) null,
  github VARCHAR(255) NULL,
  linkedin VARCHAR(255) NULL,
  site VARCHAR(255) NULL,
  biography text NULL,
  role VARCHAR(255) NOT NULL DEFAULT "user"
);

CREATE TABLE category (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL,
  type ENUM('post', 'event') NOT NULL,
  UNIQUE (name, type)
);

create table post (
  id int unsigned primary key auto_increment not null,
  content text not null,
  picture varchar(255) null,
  created_at timestamp default current_timestamp not null,
  category_id int unsigned not null,
  user_id int unsigned not null,
  constraint fk_post_user foreign key (user_id) references user(id),
  constraint fk_post_category foreign key (category_id) references category(id) on delete restrict
);

create table event (
  id int unsigned primary key auto_increment not null,
  content text not null,
  category_id int unsigned not null,
  picture varchar(255) null,
  created_at timestamp default current_timestamp not null,
  title varchar(255) not null,
  place varchar(255) not null,
  calendar date not null,
  time time not null,
  user_id int unsigned not null,
  constraint fk_event_user foreign key (user_id) references user(id),
  constraint fk_event_category foreign key (category_id) references category(id) on delete restrict
);

create table comment (
  id int unsigned primary key auto_increment not null,
  content text not null,
  created_at timestamp default current_timestamp not null,
  user_id int unsigned not null,
  post_id int unsigned null,
  event_id int unsigned null,
  constraint fk_comment_user foreign key (user_id) references user(id) on delete CASCADE,
  constraint fk_comment_post foreign key (post_id) references post(id) on delete CASCADE,
  constraint fk_comment_event foreign key (event_id) references event(id)  on delete CASCADE 
);

CREATE TABLE post_like (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  user_id INT UNSIGNED NOT NULL,
  post_id INT UNSIGNED NOT NULL,
  CONSTRAINT fk_like_user FOREIGN KEY (user_id) REFERENCES user(id) on delete CASCADE,
  CONSTRAINT fk_like_post_id FOREIGN KEY (post_id) REFERENCES post(id) on delete CASCADE,
  UNIQUE (user_id, post_id)
);

CREATE TABLE event_participation (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  user_id INT UNSIGNED NOT NULL,
  event_id INT UNSIGNED NOT NULL,
  CONSTRAINT fk_participation_event FOREIGN KEY (event_id) REFERENCES event(id) ON DELETE CASCADE,
  CONSTRAINT fk_participation_user FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
  UNIQUE (user_id, event_id)
);

insert into user(id, email, firstname, lastname, password, avatar, linkedin, github, site, biography, role)
values
  (1, "nimda.wildcom@gmail.com","Christian", "Morin", "$argon2id$v=19$m=65536,t=3,p=4$To1Iwi/SI/GPnSTkKAsY9g$vFWc/CisZrIK1yjrlL6Wz6ZQhxoj/CHqTzIsuyqeoLE", "http://localhost:3000/src/assets/images/pictureprofil.webp", "https://linkedin.com/exemple", "https://github.com/exemple", "monsupersite.com", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, soluta. Corrupti consectetur quod dolore velit quis. Assumenda vitae, optio nemo sint iure totam maxime, aliquid et quod omnis officia, quia quos quasi natus? Molestias explicabo accusamus officia optio veritatis, alias deserunt necessitatibus modi, facere vero suscipit atque doloremque provident ut!", "admin"),
  (2, "sophie.lambert@mail.com", "Sophie", "Lambert", "$argon2id$v=19$m=65536,t=3,p=4$oY4oe43j9ZBEBbwXqNHl8g$xty2LSIt1JJhcmZvEYvu7JXTvz5+krqLvgFSiKPGEak", "http://localhost:3000/src/assets/images/demo/woman1.jpg", "https://linkedin.com/exemple", "https://github.com/exemple", "monsupersite.com", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, soluta. Corrupti consectetur quod dolore velit quis. Assumenda vitae, optio nemo sint iure totam maxime, aliquid et quod omnis officia, quia quos quasi natus? Molestias explicabo accusamus officia optio veritatis, alias deserunt necessitatibus modi, facere vero suscipit atque doloremque provident ut!", "user"),
  (3, "adrien.morel@mail.com", "Adrien", "Morel", "$argon2id$v=19$m=65536,t=3,p=4$MXErqR/8Cpjkr9KXADtYIQ$4k9Ud6WyvUqEuSuxRGIKm7BTLdT89o7yiyPhV86qBHk", "http://localhost:3000/src/assets/images/demo/man.jpg", "https://linkedin.com/exemple", "https://github.com/exemple", "monsupersite.com", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, soluta. Corrupti consectetur quod dolore velit quis. Assumenda vitae, optio nemo sint iure totam maxime, aliquid et quod omnis officia, quia quos quasi natus? Molestias explicabo accusamus officia optio veritatis, alias deserunt necessitatibus modi, facere vero suscipit atque doloremque provident ut!", "user"),
  (4, "clara.duval@mail.com", "Clara", "Duval", "$argon2id$v=19$m=65536,t=3,p=4$9TT5lTPX5Zn7AvyRRMxkhg$Z1d6Te4E1NNPPdB1XtsC5KhVMa9mXWfZKFxZLQ10wHI", "http://localhost:3000/src/assets/images/demo/woman2.jpg", "https://linkedin.com/exemple", "https://github.com/exemple", "monsupersite.com", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, soluta. Corrupti consectetur quod dolore velit quis. Assumenda vitae, optio nemo sint iure totam maxime, aliquid et quod omnis officia, quia quos quasi natus? Molestias explicabo accusamus officia optio veritatis, alias deserunt necessitatibus modi, facere vero suscipit atque doloremque provident ut!", "user");

INSERT INTO category(id, name, type)
VALUES 
(1, "Emploi", "post"),
(2, "Divers", "post"),
(3, "Tech", "post"),
(4, "Projet", "post"),
(5, "Rencontre", "event"),
(6, "Conférence", "event"),
(7, "Démo day", "event"),
(8, "Hackathon", "event");

insert into post(id, content, picture, category_id, user_id)
values
  (1,"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus temporibus dolores, eaque laudantium eius architecto quae autem rerum ratione, culpa incidunt sunt non eum animi atque corrupti vero tempore excepturi doloribus deserunt amet modi error officia! Commodi, corporis tenetur aspernatur quisquam nostrum aliquid dignissimos quo molestiae, ipsum, odio alias ad delectus vitae expedita. Molestias itaque facere architecto modi beatae ut dignissimos officiis numquam cumque vero adipisci, necessitatibus sequi dolor voluptatum?", "http://localhost:3000/src/assets/images/demo/fog.jpg",  2, 2),
  (2, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis blanditiis vero magnam quos eligendi esse neque sed quae quaerat distinctio cum reprehenderit nisi ipsum, ducimus nemo culpa! Corrupti, eaque voluptatem saepe facilis laborum molestias. Laudantium sit repellendus tenetur a dignissimos veniam laboriosam possimus esse repudiandae!", "",  4, 3),
  (3, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque quidem reiciendis tempore facere omnis aperiam sunt tempora libero. Iusto mollitia sunt aspernatur eos consequuntur maiores minima repellendus. Dicta, voluptatum ut?", "http://localhost:3000/src/assets/images/demo/landscape.jpg",  3, 4);

insert into event(id, content, category_id, picture, title, place, calendar, time, user_id)
values
  (1, "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus temporibus dolores, eaque laudantium eius architecto quae autem rerum ratione, culpa incidunt sunt non eum animi atque corrupti vero tempore excepturi doloribus", 5, "http://localhost:3000/src/assets/images/demo/fog.jpg", "Super event de ouf", "Nogent le retrou", "2024-04-01", "18:20:00", 1),
  (2, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis blanditiis vero magnam quos eligendi esse neque sed quae quaerat distinctio cum reprehenderit nisi ipsum, ducimus nemo culpa! Corrupti, eaque voluptatem saepe facilis laborum molestias. Laudantium sit repellendus tenetur a dignissimos veniam laboriosam possimus esse repudiandae!", 7, "", "Boire un coup ou deux", "Bordeaux", "2026-06-15", "18:20:00", 2),
  (3, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque quidem reiciendis tempore facere omnis aperiam sunt tempora libero. Iusto mollitia sunt aspernatur", 8, "http://localhost:3000/src/assets/images/demo/landscape.jpg", "Viens on est bien", "Nantes", "2042-07-30", "18:20:00", 3);



insert into comment(id, content, user_id, post_id )
values
(1, "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus temporibus dolores, eaque laudantium eius architecto quae autem rerum ratione, culpa incidunt sunt non eum animi atque corrupti vero tempore excepturi doloribus", 2, 1),
(2, "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus temporibus dolores, eaque laudantium eius architecto quae autem rerum ratione, culpa incidunt sunt non eum animi atque corrupti vero tempore excepturi doloribus", 3, 1),
(3, "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus temporibus dolores, eaque laudantium eius architecto quae autem rerum ratione, culpa incidunt sunt non eum animi atque corrupti vero tempore excepturi doloribus", 4, 1),
(4, "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus temporibus dolores, eaque laudantium eius architecto quae autem rerum ratione, culpa incidunt sunt non eum animi atque corrupti vero tempore excepturi doloribus", 1, 2),
(5, "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus temporibus dolores, eaque laudantium eius architecto quae autem rerum ratione, culpa incidunt sunt non eum animi atque corrupti vero tempore excepturi doloribus", 4, 2),
(6, "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus temporibus dolores, eaque laudantium eius architecto quae autem rerum ratione, culpa incidunt sunt non eum animi atque corrupti vero tempore excepturi doloribus", 2, 2),
(7, "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus temporibus dolores, eaque laudantium eius architecto quae autem rerum ratione, culpa incidunt sunt non eum animi atque corrupti vero tempore excepturi doloribus", 2, 3),
(8, "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus temporibus dolores, eaque laudantium eius architecto quae autem rerum ratione, culpa incidunt sunt non eum animi atque corrupti vero tempore excepturi doloribus", 4, 3),
(9, "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus temporibus dolores, eaque laudantium eius architecto quae autem rerum ratione, culpa incidunt sunt non eum animi atque corrupti vero tempore excepturi doloribus", 1, 3),
(10, "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus temporibus dolores, eaque laudantium eius architecto quae autem rerum ratione, culpa incidunt sunt non eum animi atque corrupti vero tempore excepturi doloribus", 3, 3);

insert into comment(id, content, user_id, event_id )
values
(11, "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus temporibus dolores, eaque laudantium eius architecto quae autem rerum ratione, culpa incidunt sunt non eum animi atque corrupti vero tempore excepturi doloribus", 2, 1),
(12, "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus temporibus dolores, eaque laudantium eius architecto quae autem rerum ratione, culpa incidunt sunt non eum animi atque corrupti vero tempore excepturi doloribus", 3, 1),
(13, "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus temporibus dolores, eaque laudantium eius architecto quae autem rerum ratione, culpa incidunt sunt non eum animi atque corrupti vero tempore excepturi doloribus", 4, 1),
(14, "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus temporibus dolores, eaque laudantium eius architecto quae autem rerum ratione, culpa incidunt sunt non eum animi atque corrupti vero tempore excepturi doloribus", 1, 2),
(15, "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus temporibus dolores, eaque laudantium eius architecto quae autem rerum ratione, culpa incidunt sunt non eum animi atque corrupti vero tempore excepturi doloribus", 4, 2),
(16, "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus temporibus dolores, eaque laudantium eius architecto quae autem rerum ratione, culpa incidunt sunt non eum animi atque corrupti vero tempore excepturi doloribus", 2, 2),
(17, "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus temporibus dolores, eaque laudantium eius architecto quae autem rerum ratione, culpa incidunt sunt non eum animi atque corrupti vero tempore excepturi doloribus", 2, 3),
(18, "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus temporibus dolores, eaque laudantium eius architecto quae autem rerum ratione, culpa incidunt sunt non eum animi atque corrupti vero tempore excepturi doloribus", 4, 3),
(19, "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus temporibus dolores, eaque laudantium eius architecto quae autem rerum ratione, culpa incidunt sunt non eum animi atque corrupti vero tempore excepturi doloribus", 1, 3),
(20, "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus temporibus dolores, eaque laudantium eius architecto quae autem rerum ratione, culpa incidunt sunt non eum animi atque corrupti vero tempore excepturi doloribus", 3, 3);

INSERT INTO post_like(id, user_id, post_id )
VALUES 
(1, 1 , 1),
(2, 2 , 1),
(3, 3 , 1),
(4, 1 , 2),
(5, 2 , 2),
(6, 3 , 2),
(7, 3 , 3);

INSERT INTO event_participation(id, user_id, event_id )
VALUES 
(1, 1 , 1),
(2, 2 , 2),
(3, 3 , 3),
(4, 4 , 1);
