---
layout: post
title: "SQL - Creating Data and Structure"
categories:
  - Blog Posts
top_tags: General
tags:
- Data Toolbox
---

<hr>

## Commands Covered

<br>

- CREATE
- USE 
- ALTER 
- ADD 
- INSERT

<br>

## Creating Databases

In MySQL there is no distinction between a database and a schema. To my knowledge, every other flavor of SQL, except 
for SQLite, does recognize a difference. Outside of MySQL, schema are recognized as collections of tables, and databases 
recognized as collections of schema. 

To create a new database, use either of the following examples:

``` 
CREATE DATABASE IF NOT EXISTS example_database;
CREATE SCHEMA IF NOT EXISTS example_schema;
```

<br> 

the `IF NOT EXISTS` clause is useful because it will not return an error if you re-run the SQL script. It may be useful to set a 
default database at this point, as you won't have to define it every time you write a query. 

```
USE example_database;
```

<br> 

## Creating Tables and Keys

Creating tables is a little bit more complex than creating databases because you have to list the variable (column) names
and types as you create the table. Here's an example table with four common variables. Notice the primary key is set upon 
creation of this table. 

```
CREATE TABLE example_table {
  purchase_num INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  date_of_purchase DATEL,
  price NUMERIC(10,2),
};
```

<br>

A primary key is a unique identifier for a table, each table you create must have a primary key and a foreign key to be linked
to another table. 

A second way to create a key is as follows:

```
CREATE TABLE example_table_2 { 
  item_code VARCHAR(10) NOT NULL,
  example_date DATE,
  example_string VARCHAR(255),
  PRIMARY KEY (item_code)
};
```

<br>

Finally, here's a third, post-hoc way to add keys to a table. 

```
CREATE TABLE example_table_3 { 
  customer_id VARCHAR(10) NOT NULL,
  name VARCHAR(255) NOT NULL,
  example_int INT,
  example_date DATE
};

ALTER TABLE example_table_3
  ADD CONSTRAINT customer_id_pk
  PRIMARY KEY (customer_id)

ALTER TABLE example_table_3
  ADD FOREIGN KEY (name) REFERENCES example_table (name);
```

<br>

## Variables Explained

When creating tables, you're expected to also create the columns of that table, and their respective data types. 
The syntax is already shown above, so here's a list of the most useful datatypes.


Strings - `CHAR(SIZE)` (short and fixed length), `VARCHAR(SIZE)` (long, variable length) <br> 
Integers - `tinyint`, `smallint`, `mediumint`, `int`, `bigint` <br>
Numerics - `FLOAT(5,3)` (accepts values like 10.523) <br> 
Boolean - N/A in MySQL, but `BOOLEAN` in PostgreSQL <br> 
Date-Times - `DATE` / `TIME` / `TIMESTAMP` <br>
Binary Large OBject (BLOB) - `varbinary(MAX)` (image), more type possible <br>


<br> 


## Inserting Data (adding rows)

You can populate tables one value at a time, or all at once. Also notice that `NULL` is the 
acceptable entry for data that is not available. 


Single entry with NULL:

```
INSERT INTO my_table VALUES (999, NULL, 'John', 'Wick');
```

<br>


Multiple entries:

```
INSERT INTO bookings (bookid, facid, memid, starttime, slots) VALUES
(0, 3, 1, '2012-07-03 11:00:00', 2),
(1, 4, 1, '2012-07-03 08:00:00', 2),
(2, 6, 0, '2012-07-03 18:00:00', 2),
(3, 7, 1, '2012-07-03 19:00:00', 2),
(4, 8, 1, '2012-07-03 10:00:00', 1),
(5, 8, 1, '2012-07-03 15:00:00', 1),
(6, 0, 0, '2012-07-04 09:00:00', 3),
(7, 0, 2, '2012-07-04 15:00:00', 3);
```

<br> 

## Adding and Changing Columns

If you forgot to create a variable for your table when you created it, you can add it after-the-fact. In this example I add
a new column named email, which is a variable length string. 

```
ALTER TABLE example_table
  ADD email VARCHAR(255);
```

<br> 

If want to change an existing column, use the alter function twice:

```
ALTER TABLE example_table
  ALTER COLUMN column_name NEW_DATA_TYPE;
```

<br> 

That's all for now!

<br> 
<br> 