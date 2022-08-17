ALTER TABLE RELEASE RENAME TO RELEASE_OLD;

CREATE TABLE RELEASE (
    id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    name varchar(256) DEFAULT(''),
    description varchar(512) DEFAULT(''),
    type varchar(64) DEFAULT(''),
    image varchar(512) DEFAULT(''),
    active boolean DEFAULT(TRUE),
    release_date varchar(30) DEFAULT('')
);

INSERT INTO RELEASE(id, name, description, image, active, release_date) SELECT id, name, description, image, active, release_date FROM RELEASE_OLD;

DROP TABLE RELEASE_OLD;