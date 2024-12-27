---
layout: post
title: "Custom Functons in R"
categories:
  - Blog Posts
top_tags: General
tags:
- Data Toolbox
---

<hr>

Creating custom functions in R is a deep, deep rabbit hole. Here I'll just 
show you a boiler plate example of the process. 

This is a custom function that takes two main arguements and returns the 
arguements pasted together as a single string. If you do not enter a second arguement, 
the function defaults to 'default'. 

<br>

    my_function <- function(arguement_1, arguement_2 = 'default', ...) {
      results = paste(arguement_1, arguement_2)
      print(results)
    }


    my_function('yes', 'no')

    ## [1] "yes no"

    my_function('yes')

    ## [1] "yes default"


<br>

That's all for now!


\- Fisher

<br>
<br>
