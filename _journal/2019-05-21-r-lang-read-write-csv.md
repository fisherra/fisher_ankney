---
layout: post
title: "Comma-Separated Value Files and R"
categories:
  - Blog Posts
top_tags: General
tags:
- Data Toolbox
---

<hr> 

Perhaps the most conventional file type to store data, .csv files are ubiquitous. 
Reading and writing comma-separated value files can often be the first and/or last step
of an traditional data analysis project.

It is advantageous to use the readr package (a part of the tidyverse) over base R to
read and write your .csv files for several reasons. Readr functions use a more
consistent naming scheme, offer the user more intuitive parsing, and
are much faster than base R. Readr also automatically loads your data as
a useful tibble. On the other hand, if you're looking for more speed, it may be 
useful to check out the data.table package instead.

<br>

    library('readr')

<br>

## Reading .csv Files

In its most simple form, this may get the job done. It can be helpful to
use R Studio's Import Dataset GUI to quickly access the secondary
arguments of `read_csv`.

<br>

    my_data <- read_csv('mydata.csv')

<br>


## Custom Input Arguements

To read tab or semicolon delimited files, use these arguments with the
`read_delim` function. Again, it's probably best to use the R Studio GUI
if you have access to it. This can be useful when you're working with
tab separated files, or European data (semicolons).

I like to choose my import options with the GUI, then copy the code in the
bottom right hand corner of the interface into my R script. This increases
reproducability. 


<br>

    read_delim(
      "mydata.csv",               # file path and name always comes first
      delim = ",",                # single character field separator
      quote = "\"",               # single character to quote strings
      comment = "#",              # single character to signal comments
      col_names = c('a','b'),     # custom name columns on import
      na = ".",                   # string to signify missing values
      skip = 0,                   # number of lines to skip before read
      progress = show_progress()  # display a progress bar
      )

<br>

## Zipped Files

Compressed data files are treated just like uncompressed files. You don't have to do anything extra!


<br>

    my_data <- read_csv('mydata.csv.zip')

<br>


## Reading Files Outside of the Working Directory

It's good practice to keep all of your input files together in an input folder. 
You can simply reference the path to this folder in your `read_csv` function.

<br> 

    my_data <- read_csv('~/local/path/to/my/file/mydata.csv')
    my_data <- read_csv('https://github.com/tidyverse/readr/raw/master/inst/extdata/mtcars.csv')

<br>


## Writing .csv Files


Remember that you must type the name of the object in your R environment
before you give the argument to the path and file name you're saving.

<br>

    write_csv(
      data_name, 
      'path/to/filename.csv'
    )

<br>

## Saving Custom Delimiters

The function `write_delim` can also be used to write a .csv files if you
set the delim arguement to ','. In this case, the tibble will be saved as
a tab separated file.

<br>

    write_delim(
      data_name,                
      'path/to/filename.tsv'    
      delim = '\t'              
    )

<br>


## Appending .csv Files

Be careful not to append the column names as an observation!


<br>

    write_csv(
      your_object,
      'path/to/existing/filename.csv',
      append = T
    )

<br>

That's all for now! Thanks for reading!

\- Fisher

<br> 
<br>
