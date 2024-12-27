---
layout: post
title: "SQL - Subquery"
categories:
  - bookshelf
top_tags: General
tags:
- Data Toolbox
---

<hr>

## Commands Covered

<br>

- SELECT
- FROM
- WHERE
- EXISTS
- ANY
- ALL

<br> 


## What are Subqueries

Subqueries are a useful nesting strategy that combine 'typical' SQL queries in order to match more complex requirements. If you want to return rows from a specific column that have requirements in another column, subqueries can get the job done. This isn't limited to just one table either.


This is the generic syntax of a subquery:

```
SELECT column_name
    FROM table_1 
WHERE <operator> 
    (
    SELECT column_2
        FROM table_2 
    WHERE <condition>
        AND <condition>
    )
```

<br>

## Exists = Any = In = Or

These three operators do exactly the same thing. It is recommended to use exists for performance purposes. Putting `EXISTS` as your operator will return any of the rows that match your subquery conditions. Perhaps this is why `ANY` is more intuitive here. 

It can also be helpful to think of Exists as an OR condition, returning true whenever any of the rows meet your condition.

This query will return the names of stores that have security guards using a subquery. It also illustrates using two conditions to consider linked tables.

```
SELECT store_name
    FROM store_table
WHERE EXISTS 
    (
        SELECT emp_name
            FROM emp_table
        WHERE
            store_table.store_id = emp_table.store_id
        AND
            job_title = 'Security Guard'       
    )
```

<br>

## All = And

<br> 

Sometimes you don't want to return rows that match any condition, but you want them to match all of the conditions.

The following example returns employees that make more than every single employee under the age of 25.

```
SELECT * 
    FROM employees
WHERE salary > ALL 
    (
        SELECT
            salary
        FROM 
            employees
        WHERE
            age < 25
    )
```

<br>
 
 And that's it for subqueries! Really a pretty simple topic once you get the hang of it. 


 <br>
 <br>
 
Until next time, 

 \- Fisher

 <br>
