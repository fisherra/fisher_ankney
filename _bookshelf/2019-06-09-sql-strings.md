---
layout: post
title: "SQL - Strings"
categories:
  - bookshelf
collection:
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
- LIKE
- WILDCARDS

<br> 

## Matching Strings

I'm not sure who really likes working with strings, but it's often a necessary evil. SQL uses the like operator to get things done!

```
SELECT column_name
  FROM table_name
  WHERE column_name LIKE pattern;
```

<br> 

At this point we have a few options. You can attempt to match a string exactly, in which case you would type in the word or phrase you're looking for, like so:

```
SELECT customer_name
  FROM customer_table
  WHERE customer LIKE 'David';
```

<br> 

This snippet will return all customers named David, but not Dave. Two of the most useful wildcards to help you match strings are `%` and `_`. The percent symbol represents zero or more characters, while the underscore only represents a single character. This snippet returns David, Dave, Davos, and anything else that starts with the letters 'Dav'. 


```
SELECT customer_name
  FROM customer_table
  WHERE customer LIKE 'Dav%'
```

<br> 

This snippet will only return Dave, or some oddly named person like Davo, Dava, or Davy. 

```
SELECT customer_name
  FROM customer_table
  WHERE customer LIKE 'Dav_'
```

<br>

## Regular Expressions

When the wildcards just don't cut it, regular expressions are to the rescue! Here are some symbols to include in your string matching that will make your life easier. 

- \* Represents zero or more characters
- \# Represents any single numeric
- ? Represents any single character
- \[ \] Represents any single character within the bracket
- [! ] Represents any character not in the bracket
- [ - ] Represents a range of characters

<br> 

That's all for now!

\- Fisher

<br>
<br>
