create table if not exists cities (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name TEXT, 
    citizens_amount INTEGER
);


create table if not exists users (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name TEXT, 
    city_id INTEGER,
    FOREIGN KEY(city_id) REFERENCES cities(id)
);

create table if not exists groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    type INTEGER, 
    name TEXT
);

create table if not exists users_groups(
    user_id INTEGER, 
    group_id INTEGER, 
    PRIMARY KEY(user_id, group_id)
);
