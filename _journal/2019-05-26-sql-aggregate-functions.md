---
layout: post
title: "SQL - Aggregating Results"
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
- WHERE
- GROUP BY
- HAVING
- ORDER BY
- COUNT / MIN / MAX / AVG / SUM

<br>

## Group By

Used to aggregate or 'squish' rows into summaries by similar grouping. 

```
SELECT 
  * 
FROM 
  example_table
WHERE
  condition
GROUP BY 
  column_name(s)

```

<br> 

## Having Condition

When you want to return aggregated results that match a condition, use a having statement. The having statement is very similar to where, but they must not be used in place of one another. A having statement will not work if placed after `FROM`, and `WHERE` will not work if placed after `GROUP BY`. 

```
SELECT 
  * 
FROM 
  example_table
WHERE
  condition
GROUP BY 
  column_name(s)
Having 
  condition
```

<br>

## Ordering Results

After you've described a selection from a table and a grouping, `ORDER BY` can be used in conjuncture with aggregate functions to sort your findings. 

This query returns the number of employees in each city from the employees table, grouping the results (or counts) by city. Then the SQL statement orders the results table from highest to lowest count. The result will be a list of cities with the number of employees in each city, highest first.

```
SELECT
  COUNT(employee_id), city
FROM 
  employees
GROUP BY 
  city
ORDER BY
  COUNT(employee_id) DESC
```
<br> 

## Aggregate Conditions

Here's a list of simple aggregate conditions. They are used as follows:

```
SELECT
  MAX(sale)
FROM 
  sales
```

<br> 

- `COUNT` <br> 
- `MIN` <br> 
- `MAX` <br>
- `AVG` <br> 
- `SUM` <br> 

<br> 

If you want to return a list of unique values, use `DISTINCT` within `COUNT`, like so: 

```
SELECT
  COUNT(DISTINCT target)
FROM 
  table
```

<br>

That's all for now!

<br> 