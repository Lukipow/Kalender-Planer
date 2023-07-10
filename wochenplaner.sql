CREATE TABLE nutzer (
 "user" TEXT NOT NULL PRIMARY KEY,
 passwort TEXT  NOT NULL
);


CREATE TABLE planer (
  id INTEGER PRIMARY KEY,
  planer_name TEXT NOT NULL,
  "user" TEXT NOT NULL,
  oeffentlich TEXT NOT NULL,
  schluessel TEXT
);


CREATE TABLE eintraege (
 id INTEGER PRIMARY KEY,
 eintrag TEXT NOT NULL,
 datum DATE NOT NULL
);

CREATE TABLE Users (
    id INT PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    password VARCHAR(50)
);

INSERT INTO Users (username, password)
VALUES ('jeffrey@gmail.com', '123456789');