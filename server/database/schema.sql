create table user (
  id int unsigned primary key auto_increment not null,
  email varchar(255) not null unique,
  firstname varchar(255) not null,
  lastname varchar(255) not null,
  password varchar(255) not null,
  is_admin boolean not null default false
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
  picture varchar(255),
  created_at timestamp default current_timestamp not null,
  title varchar(255) not null,
  place varchar(255) not null,
  event_date date not null,
  user_id int unsigned not null,
  constraint fk_event_user foreign key (user_id) references user(id)
);

create table comment (
  id int unsigned primary key auto_increment not null,
  content text not null,
  created_at timestamp default current_timestamp not null,
  user_id int unsigned not null,
  post_id int unsigned,
  event_id int unsigned,
  constraint fk_comment_user foreign key (user_id) references user(id),
  constraint fk_comment_post foreign key (post_id) references post(id),
  constraint fk_comment_event foreign key (event_id) references event(id)
);

insert into user(id, email,firstname, lastname, password, is_admin)
values
  (1, "example@mail.com","Admin", "Istrateur", "123", true),
  (2, "sophie.lambert@mail.com", "Sophie", "Lambert", "111", false),
  (3, "adrien.morel@mail.com", "Adrien", "Morel", "222", false),
  (4, "clara.duval@mail.com", "Clara", "Duval", "333", false);

insert into post(id, content, picture, category, user_id)
values
  (1,"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus temporibus dolores, eaque laudantium eius architecto quae autem rerum ratione, culpa incidunt sunt non eum animi atque corrupti vero tempore excepturi doloribus deserunt amet modi error officia! Commodi, corporis tenetur aspernatur quisquam nostrum aliquid dignissimos quo molestiae, ipsum, odio alias ad delectus vitae expedita. Molestias itaque facere architecto modi beatae ut dignissimos officiis numquam cumque vero adipisci, necessitatibus sequi dolor voluptatum?", "./src/assets/images/demo/fog.jpg",  "Divers", 2),
  (2, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis blanditiis vero magnam quos eligendi esse neque sed quae quaerat distinctio cum reprehenderit nisi ipsum, ducimus nemo culpa! Corrupti, eaque voluptatem saepe facilis laborum molestias. Laudantium sit repellendus tenetur a dignissimos veniam laboriosam possimus esse repudiandae!", "",  "Emploi", 3),
  (3, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque quidem reiciendis tempore facere omnis aperiam sunt tempora libero. Iusto mollitia sunt aspernatur eos consequuntur maiores minima repellendus. Dicta, voluptatum ut?", "./src/assets/images/demo/landscape.jpg",  "Divers", 4);

