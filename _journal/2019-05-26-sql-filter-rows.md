---
layout: post
title: "SQL - Filtering Rows"
categories:
  - Blog Posts
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
- ALL / AND / ANY / etc



<br> 
## Where Operators

To select specific rows, you need to apply a bit of logic with the where statement. This is the general formatting of such a query. 

```
SELECT 
  * 
FROM 
  example_table
WHERE
  column OPERATOR threshold
```

<br> 

The following operators are valid in MySQL, along with the typical comparison operators (<, !=, etc). 


`ALL` - every value matches<br>
`AND` - multiple conditions must be true<br>
`ANY` - any of the conditions can be true<br>
`BETWEEN` - values within two bounds<br>
`EXISTS` - self explanatory<br>
`IN` - value is present within a list<br>
`LIKE` - used for similar values with wildcards<br>
`NOT` - combined with the other operators<br>
`OR` - either condition may be true<br>
`IS NULL` - doesn't have data entered<br>
`UNIQUE` - no duplicates<br>

<br> 

A few examples: 


Return rows that contain dates outside of a specified range:

```
SELECT 
  * 
FROM
  example
WHERE
  hire_date NOT BETWEEN '1990-01-01' AND '2000-01-01';
```

<br> 

Return row entries that only appear once:

```
SELECT UNIQUE
  gender
FROM 
  example;
```

<br> 

Return rows that meet several conditions at once:
```
SELECT
  *
FROM
  example
WHERE
  last_name = 'Denis'
  AND (gender = 'M' OR gender = 'F');
```

<br> 

For more information on using where statements on strings, dates, or null values, please view the related toolbox articles. 

That's all for now!

<br> 
<br> 




