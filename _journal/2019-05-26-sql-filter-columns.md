---
layout: post
title: "SQL - Filter Columns"
categories:
  - Blog Posts
top_tags: General
tags:
- Data Toolbox
---

<br> 

## Commands Covered

<br> 

- SELECT
- FROM
- AS
- CONCAT_WS

<hr>


## Retrieving All Columns

Use the `SELECT` function with the wildcard to return all columns in a table. 

```
SELECT
  * 
FROM 
  table_name
```
<br>

## Retrieving Specific Columns

Often you don't want to access all of the columns in a table, you can simply select them by their names. If you're trying to access all of the columns except for one or two, and your table is very large, you're apparently out of luck. This task is easily accomplished in R or Python. 

```
SELECT
  col_1, col_2
FROM 
  table_name
```


<br> 

## Aliasing

I don't really care for aliasing, I think that this level of manipulation is better done in something like R. If you must have an alias in your SQL code, use the `AS` statement. Here's an example that combines it with concat whitespace to return a new column that coombines and renames two old columns. 

```
SELECT
  CONCAT_WS(', ' last_name, firstname) AS 'full name'
FROM
  example_table
```

<br> 

That's all for now!

<br> 
<br> 



