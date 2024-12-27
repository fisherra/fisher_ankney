---
layout: post
title: "User Input in R"
categories:
  - Blog Posts
top_tags: General
tags:
- Data Toolbox
---

<hr>

<br>

## Readline

sometimes you want your function / script to take user input, use
readline() function

    readline(prompt="Enter something to print: ")

In the console -

    Enter something to print: this is my input, print it
    [1] "this is my input, print it"

<br>

## Readline Application

Here's an example of how to use the `readline()` function in a custom
function. In this example, we're prompting the user to enter a second
arguement in order to use paste. 

<br>

    paste_function <- function(arg_1) {
      arg_2 <- readline(prompt= "Enter what you want pasted: ")
      return <- paste(arg_1, arg_2)
      print(return)
    }

    paste_function('hello')

<br> 

In the console -

    Enter what you want pasted: , how are you?
    [1] "hello, how are you?"

<br>

## Interactive File Choice

In my opinion, `file.choose()` is an awesome function that is very
under-utilized.

`file.choose()` brings up your finder to browse through and select, often data, to as
input. great to use in a script you want to make easily accessable for
others. be aware that as you create more complex scripts based on this
data, often your restricting the input formatting, describe this in the
script.

This script would return the first 5 rows of a dataset of your choice if
ran.

<br>

    data <- file.choose()
    ?head
    head(data, n = 5)

<br>

## Source

You can run an R script without even opening it! To do this, use the `source()` 
function. This is an R function, not a bash function, so you must type it into
R, not your terminal. 

<br>
    source('path/to/my/script.R')

<br>

The script is ran, and the results are in the console:

<br>

    [1] output of your script here

<br>

Objects from this script are saved into your environment. Very helpful!

That's all for now, 

\- Fisher 

<br>
<br>
