CREATE TABLE avatar (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    path VARCHAR(255) NOT NULL,
    filename VARCHAR(255) NOT NULL
);

CREATE TABLE user (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    github VARCHAR(255),
    linkedin VARCHAR(255),
    site VARCHAR(255),
    biography TEXT,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    avatar_id INT UNSIGNED UNIQUE DEFAULT NULL,
    CONSTRAINT fk_user_avatar FOREIGN KEY (avatar_id) REFERENCES avatar(id) ON DELETE SET NULL
);

CREATE TABLE category (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    type ENUM('post', 'event') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE post_picture (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    path VARCHAR(255) NOT NULL,
    filename VARCHAR(255) NOT NULL
);

CREATE TABLE post (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT UNSIGNED NOT NULL,
    category_id INT UNSIGNED NOT NULL,
    picture_id INT UNSIGNED DEFAULT NULL,
    CONSTRAINT fk_post_user FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    CONSTRAINT fk_post_category FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE RESTRICT,
    CONSTRAINT fk_post_picture FOREIGN KEY (picture_id) REFERENCES post_picture(id) ON DELETE SET NULL
);

CREATE TABLE post_like (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNSIGNED NOT NULL,
    post_id INT UNSIGNED NOT NULL,
    CONSTRAINT fk_post_like_user FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    CONSTRAINT fk_post_like_post FOREIGN KEY (post_id) REFERENCES post(id) ON DELETE CASCADE
);

CREATE TABLE event_picture (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    path VARCHAR(255) NOT NULL,
    filename VARCHAR(255) NOT NULL
);

CREATE TABLE event (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    content TEXT NOT NULL,
    title VARCHAR(255) NOT NULL,
    place VARCHAR(255) NOT NULL,
    calendar DATE NOT NULL,
    time TIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT UNSIGNED NOT NULL,
    category_id INT UNSIGNED NOT NULL,
    picture_id INT UNSIGNED DEFAULT NULL,
    CONSTRAINT fk_event_user FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    CONSTRAINT fk_event_category FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE RESTRICT,
    CONSTRAINT fk_event_picture FOREIGN KEY (picture_id) REFERENCES event_picture(id) ON DELETE SET NULL
);

CREATE TABLE event_participation (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNSIGNED NOT NULL,
    event_id INT UNSIGNED NOT NULL,
    CONSTRAINT fk_event_participation_user FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    CONSTRAINT fk_event_participation_event FOREIGN KEY (event_id) REFERENCES event(id) ON DELETE CASCADE
);

CREATE TABLE comment (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT UNSIGNED NOT NULL,
    post_id INT UNSIGNED DEFAULT NULL,
    event_id INT UNSIGNED DEFAULT NULL,
    CONSTRAINT fk_comment_user FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    CONSTRAINT fk_comment_post FOREIGN KEY (post_id) REFERENCES post(id) ON DELETE CASCADE,
    CONSTRAINT fk_comment_event FOREIGN KEY (event_id) REFERENCES event(id) ON DELETE CASCADE
);

INSERT INTO avatar
(id, filename, path)
VALUES 
    (1, "pictureprofil.webp", "assets/uploads/avatars/pictureprofil.webp"),
    (2, "woman1.jpg", "assets/uploads/avatars/woman1.jpg"),
    (3, "man.jpg", "assets/uploads/avatars/man.jpg"),
    (4, "woman2.jpg", "assets/uploads/avatars/woman2.jpg");

insert into user(id, firstname, lastname, email, password, github, linkedin, site, biography, role, avatar_id)
values
(
1,
"Christian",
"Morin",
"nimda.wildcom@gmail.com",
"$argon2id$v=19$m=65536,t=3,p=4$To1Iwi/SI/GPnSTkKAsY9g$vFWc/CisZrIK1yjrlL6Wz6ZQhxoj/CHqTzIsuyqeoLE",
"https://github.com/exemple",
"https://linkedin.com/exemple",
"monsupersite.com",
"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, soluta. Corrupti consectetur quod dolore velit quis. Assumenda vitae, optio nemo sint iure totam maxime, aliquid et quod omnis officia, quia quos quasi natus? Molestias explicabo accusamus officia optio veritatis, alias deserunt necessitatibus modi, facere vero suscipit atque doloremque provident ut!",
"admin",
1
),
(
2,
"Sophie",
"Lambert",
"sophie.lambert@mail.com",
"$argon2id$v=19$m=65536,t=3,p=4$oY4oe43j9ZBEBbwXqNHl8g$xty2LSIt1JJhcmZvEYvu7JXTvz5+krqLvgFSiKPGEak",
"https://github.com/exemple",
"https://linkedin.com/exemple",
"monsupersite.com",
"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, soluta. Corrupti consectetur quod dolore velit quis. Assumenda vitae, optio nemo sint iure totam maxime, aliquid et quod omnis officia, quia quos quasi natus? Molestias explicabo accusamus officia optio veritatis, alias deserunt necessitatibus modi, facere vero suscipit atque doloremque provident ut!",
"user",
2
),
(
3,
"Adrien",
"Morel",
"adrien.morel@mail.com",
"$argon2id$v=19$m=65536,t=3,p=4$MXErqR/8Cpjkr9KXADtYIQ$4k9Ud6WyvUqEuSuxRGIKm7BTLdT89o7yiyPhV86qBHk", 
"https://github.com/exemple",
"https://linkedin.com/exemple",
"monsupersite.com",
"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, soluta. Corrupti consectetur quod dolore velit quis. Assumenda vitae, optio nemo sint iure totam maxime, aliquid et quod omnis officia, quia quos quasi natus? Molestias explicabo accusamus officia optio veritatis, alias deserunt necessitatibus modi, facere vero suscipit atque doloremque provident ut!",
"user",
3
),
(
4,
"Clara",
"Duval",
"clara.duval@mail.com",
"$argon2id$v=19$m=65536,t=3,p=4$9TT5lTPX5Zn7AvyRRMxkhg$Z1d6Te4E1NNPPdB1XtsC5KhVMa9mXWfZKFxZLQ10wHI",
"https://github.com/exemple",
"https://linkedin.com/exemple",
"monsupersite.com",
"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, soluta. Corrupti consectetur quod dolore velit quis. Assumenda vitae, optio nemo sint iure totam maxime, aliquid et quod omnis officia, quia quos quasi natus? Molestias explicabo accusamus officia optio veritatis, alias deserunt necessitatibus modi, facere vero suscipit atque doloremque provident ut!",
"user",
4
);

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

INSERT INTO post_picture(id, path, filename)
VALUES
(1, "assets/uploads/pictures/fog.jpg", "fog.jpg"),
(2, "assets/uploads/pictures/landscape.jpg", "landscape.jpg");

INSERT INTO post(id, content, category_id, user_id, picture_id)
values
  (1,"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus temporibus dolores, eaque laudantium eius architecto quae autem rerum ratione, culpa incidunt sunt non eum animi atque corrupti vero tempore excepturi doloribus deserunt amet modi error officia! Commodi, corporis tenetur aspernatur quisquam nostrum aliquid dignissimos quo molestiae, ipsum, odio alias ad delectus vitae expedita. Molestias itaque facere architecto modi beatae ut dignissimos officiis numquam cumque vero adipisci, necessitatibus sequi dolor voluptatum?", 2, 2, 1),
  (2, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis blanditiis vero magnam quos eligendi esse neque sed quae quaerat distinctio cum reprehenderit nisi ipsum, ducimus nemo culpa! Corrupti, eaque voluptatem saepe facilis laborum molestias. Laudantium sit repellendus tenetur a dignissimos veniam laboriosam possimus esse repudiandae!", 4, 3, NULL),
  (3, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque quidem reiciendis tempore facere omnis aperiam sunt tempora libero. Iusto mollitia sunt aspernatur eos consequuntur maiores minima repellendus. Dicta, voluptatum ut?", 3, 4, 2);

INSERT INTO event_picture(id, path, filename)
VALUES
(1, "assets/uploads/pictures/fog.jpg", "fog.jpg"),
(2, "assets/uploads/pictures/landscape.jpg", "landscape.jpg");

INSERT INTO event(id, content, title, place, calendar, time, user_id, category_id, picture_id)
values
  (1, "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus temporibus dolores, eaque laudantium eius architecto quae autem rerum ratione, culpa incidunt sunt non eum animi atque corrupti vero tempore excepturi doloribus", "Super event de ouf", "Nogent le retrou", "2024-04-01", "18:20:00", 1, 5, 1),
  (2, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis blanditiis vero magnam quos eligendi esse neque sed quae quaerat distinctio cum reprehenderit nisi ipsum, ducimus nemo culpa! Corrupti, eaque voluptatem saepe facilis laborum molestias. Laudantium sit repellendus tenetur a dignissimos veniam laboriosam possimus esse repudiandae!", "Boire un coup ou deux", "Bordeaux", "2026-06-15", "18:20:00", 2, 7, NULL),
  (3, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque quidem reiciendis tempore facere omnis aperiam sunt tempora libero. Iusto mollitia sunt aspernatur", "Viens on est bien", "Nantes", "2042-07-30", "18:20:00", 3, 8, 2);

INSERT INTO comment(id, content, user_id, post_id )
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

INSERT INTO comment(id, content, user_id, event_id )
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
