---
layout: post
title: "If-Then Statements in R"
categories:
  - Blog Posts
top_tags: General
tags:
- Data Toolbox
---

<hr>

R can follow if-then statements just like any other computer programming language. However, it's advised to use vectorized calculations whenever possible, because of increased performance. The syntax is a bit strange, but you'll get used to it!

<br>

## If-Then

Using an if-then to take action if a condition is met: 

<br>

    x <- 5

    if (x > 0) {
      print('X is positive')
    }

    ## [1] "X is positive"

<br>

## If-Else

If-Else can be used if you want to take two deferent actions that are 
dependent upon a condition being met, or not being met. 

<br>

    if (x < 0) {
      print('X is negative')
    } else {
      print('X is not negative')
    }

    ## [1] "X is not negative"

<br>

## If-Else-If

The grand finale, If-Else-If allows you to describe an unlimited number of outcomes based on an unlimited number of conditions:

<br>

    if (x < 0) {
      print('X is negative')
    } else if (x == 0) {
      print('X is zero')
    } else {
      print('X is positive')
    }

    ## [1] "X is positive"

<br>

That's all for now!

\- Fisher

<br>
<br>

