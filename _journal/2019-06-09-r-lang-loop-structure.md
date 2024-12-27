---
layout: post
title: "Loop Structures in R"
categories:
  - Blog Posts
top_tags: General
tags:
- Data Toolbox
---

<hr>

Here I'll cover for loops and while loops. While a simple concept, they are foundational 
to getting things done while programming. 


<br>

## Simple For Loop

First set a counter, or iterator, then execute a simple for loop!

<br>

    i <- 1 

    for (i in 1:10) {
      print(i)
    }

    ## [1] 1
    ## [1] 2
    ## [1] 3
    ## [1] 4
    ## [1] 5
    ## [1] 6
    ## [1] 7
    ## [1] 8
    ## [1] 9
    ## [1] 10

<br>

## For Loop Assignment

While the above example was pretty useless, for loops can assign the results of a calculation into a calculation vector. A trick I've used many times. 


<br>

    i <- 1
    ex <- vector('double', length = 10)

    for (i in seq_along(ex)) {
      ex[i] = i
      i = i + 1
    }

    ex

    ##  [1]  1  2  3  4  5  6  7  8  9 10

<br>

Let's get a bit more complex, hopefully you can start to see applications for this technique. Now, you have a counter, a data vector, and an ‘save’ vector. for every element in the data vector, perform some function and save that output
to your save vector. report results of save vector.

<br>

    i <- 1
    data <- 1:10
    save <- vector('double', length = 10)

    for (i in seq_along(data)) {
      save[i] = data[i] + mean(data)
      i = i + 1
    }

    save

    ##  [1]  6.5  7.5  8.5  9.5 10.5 11.5 12.5 13.5 14.5 15.5

<br>

Check out the purrr post for more efficient ways to do this, in some
cases. Also be aware this is not vectorized, and thus not ideal in R.

<br>

## Basic While Loops

Really just a special version of a for loop, sometimes while loops are easier to understand. 

<br>

    i <- 1 

    while (i <= 10) {
      print(i)
      i = i + 1
    }

    ## [1] 1
    ## [1] 2
    ## [1] 3
    ## [1] 4
    ## [1] 5
    ## [1] 6
    ## [1] 7
    ## [1] 8
    ## [1] 9
    ## [1] 10

<br>

## While Loop for Assignment

Utilizes the same fundamental idea as a for loop for assignment:

    i <- 1
    ex <- vector('double', length = 10)

    while (i <= length(ex)) {
      ex[i] = i
      i = i + 1
    }

    ex

    ##  [1]  1  2  3  4  5  6  7  8  9 10

<br>

That's all for now!

\- Fisher

<br>
<br>




