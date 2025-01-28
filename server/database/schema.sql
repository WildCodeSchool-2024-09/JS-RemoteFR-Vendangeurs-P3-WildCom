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

create table post (
  id int unsigned primary key auto_increment not null,
  content text not null,
  picture varchar(255),
  created_at timestamp default current_timestamp not null,
  category varchar(255) not null,
  user_id int unsigned not null,
  constraint fk_post_user foreign key (user_id) references user(id)
);

create table event (
  id int unsigned primary key auto_increment not null,
  content text not null,
  category varchar(255) not null,
  picture varchar(255) null,
  created_at timestamp default current_timestamp not null,
  title varchar(255) not null,
  place varchar(255) not null,
  calendar date not null,
  user_id int unsigned not null,
  constraint fk_event_user foreign key (user_id) references user(id)
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

insert into user(id, email,firstname, lastname, password, avatar, linkedin, github, site, biography, role)
values
  (1, "example@mail.com","Admin", "Istrateur", "$argon2id$v=19$m=65536,t=3,p=4$MEZfaWwCSctWWpxE1hPm/g$EQxm4Q2ULXL+lL9F0pSBOuwR++rMzdk68Jh1yX+a6A8", "http://localhost:3000/src/assets/images/pictureprofil.webp", "https://linkedin.com/exemple", "https://github.com/exemple", "monsupersite.com", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, soluta. Corrupti consectetur quod dolore velit quis. Assumenda vitae, optio nemo sint iure totam maxime, aliquid et quod omnis officia, quia quos quasi natus? Molestias explicabo accusamus officia optio veritatis, alias deserunt necessitatibus modi, facere vero suscipit atque doloremque provident ut!", "admin"),
  (2, "sophie.lambert@mail.com", "Sophie", "Lambert", "$argon2id$v=19$m=65536,t=3,p=4$XEraD/BNcArp3WUwG3N/LQ$ZHbE7iOLtctLKNoaiFCGCprbj0MLJyNccQdTQr18NaA", "http://localhost:3000/src/assets/images/demo/woman1.jpg", "https://linkedin.com/exemple", "https://github.com/exemple", "monsupersite.com", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, soluta. Corrupti consectetur quod dolore velit quis. Assumenda vitae, optio nemo sint iure totam maxime, aliquid et quod omnis officia, quia quos quasi natus? Molestias explicabo accusamus officia optio veritatis, alias deserunt necessitatibus modi, facere vero suscipit atque doloremque provident ut!", "user"),
  (3, "adrien.morel@mail.com", "Adrien", "Morel", "$argon2id$v=19$m=65536,t=3,p=4$5F8ilwCFIjwEpUSKYJ7Zfw$LcUOU1ufJi3O2uYcAVrprMMJjVYJc8hkLRPakfK+FfI", "http://localhost:3000/src/assets/images/demo/man.jpg", "https://linkedin.com/exemple", "https://github.com/exemple", "monsupersite.com", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, soluta. Corrupti consectetur quod dolore velit quis. Assumenda vitae, optio nemo sint iure totam maxime, aliquid et quod omnis officia, quia quos quasi natus? Molestias explicabo accusamus officia optio veritatis, alias deserunt necessitatibus modi, facere vero suscipit atque doloremque provident ut!", "user"),
  (4, "clara.duval@mail.com", "Clara", "Duval", "$argon2id$v=19$m=65536,t=3,p=4$XYAZxeYMvxLBwMDRGcQWHw$A2rXfVNG6j9uwBBmETWtWuhFxXvy3sqDrSwoKz7gCsM", "http://localhost:3000/src/assets/images/demo/woman2.jpg", "https://linkedin.com/exemple", "https://github.com/exemple", "monsupersite.com", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, soluta. Corrupti consectetur quod dolore velit quis. Assumenda vitae, optio nemo sint iure totam maxime, aliquid et quod omnis officia, quia quos quasi natus? Molestias explicabo accusamus officia optio veritatis, alias deserunt necessitatibus modi, facere vero suscipit atque doloremque provident ut!", "user");

insert into post(id, content, picture, category, user_id)
values
  (1,"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus temporibus dolores, eaque laudantium eius architecto quae autem rerum ratione, culpa incidunt sunt non eum animi atque corrupti vero tempore excepturi doloribus deserunt amet modi error officia! Commodi, corporis tenetur aspernatur quisquam nostrum aliquid dignissimos quo molestiae, ipsum, odio alias ad delectus vitae expedita. Molestias itaque facere architecto modi beatae ut dignissimos officiis numquam cumque vero adipisci, necessitatibus sequi dolor voluptatum?", "http://localhost:3000/src/assets/images/demo/fog.jpg",  "Divers", 2),
  (2, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis blanditiis vero magnam quos eligendi esse neque sed quae quaerat distinctio cum reprehenderit nisi ipsum, ducimus nemo culpa! Corrupti, eaque voluptatem saepe facilis laborum molestias. Laudantium sit repellendus tenetur a dignissimos veniam laboriosam possimus esse repudiandae!", "",  "Emploi", 3),
  (3, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque quidem reiciendis tempore facere omnis aperiam sunt tempora libero. Iusto mollitia sunt aspernatur eos consequuntur maiores minima repellendus. Dicta, voluptatum ut?", "http://localhost:3000/src/assets/images/demo/landscape.jpg",  "Divers", 4);

insert into event(id, content, category,  picture, title, place, calendar, user_id)
values
  (1, "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus temporibus dolores, eaque laudantium eius architecto quae autem rerum ratione, culpa incidunt sunt non eum animi atque corrupti vero tempore excepturi doloribus", "Divers", "http://localhost:3000/src/assets/images/demo/fog.jpg", "Super event de ouf", "Nogent le retrou", "2024-04-01", 1),
  (2, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis blanditiis vero magnam quos eligendi esse neque sed quae quaerat distinctio cum reprehenderit nisi ipsum, ducimus nemo culpa! Corrupti, eaque voluptatem saepe facilis laborum molestias. Laudantium sit repellendus tenetur a dignissimos veniam laboriosam possimus esse repudiandae!", "Divers", "", "Boire un coup ou deux", "Bordeaux", "2026-06-15", 2),
  (3, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque quidem reiciendis tempore facere omnis aperiam sunt tempora libero. Iusto mollitia sunt aspernatur", "Divers", "http://localhost:3000/src/assets/images/demo/landscape.jpg", "Viens on est bien", "Nantes", "2042-07-30", 3);

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