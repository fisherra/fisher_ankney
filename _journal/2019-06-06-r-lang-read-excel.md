---
layout: post
title: "Excel Spreadsheets and R"
categories:
  - Blog Posts
top_tags: General
tags:
- Data Toolbox
---

<hr>

Excel files are just fancy .csv's right? Well, it's a bit more complicated than that..

```
    library('readxl')
```

<br>

## Reading Excel Files

Reading excel spreadsheets is painlessly done through RStudio's intuitive GUI. Simply click 'Import Dataset' in the environment pane, then click 'From Excel'. There you may navigate to your file, and preview how the import options will affect your data. 

I recommend copying the code provided in the 'Code Preview', located in the bottom right of the import navigation. Here's the important bit.

<br>

```
    my_excel_data <- read_excel('excel.xlsx') 
```

<br>

## Custom Import

When tick different boxes in the navigation to customize your import, `read_excel` function changes to suit your requests. Here are some common arguments for that function. 

```
read_xls('path/to/my_data.xls',          # path to data
            sheet = x,                   # which sheet to read
            range = y,                   # which values to read
            col_names = c(),             # custom names
            col_types = c(),             # define data types
            na = "",                     # define NA
            trim_ws = T,                 # trim whitespace T/F
            skip = 0,                    # skip X lines
            n_max = Inf,                 # how far to read
            guess_max = min(1000, n_max) # guess at length
            )
```

<br> 

## Excel vs .xls vs .xlsx

All of the different readxl functions do basically the same thing.

```
    read_excel()
    read_xls()
    read_xlsx()
```

<br>

## Reading Files Outside of the Working Directory

You don't have to read files that are in your immediate working directory, or on your local computer. 

```
    my_data <- read_xls('~/local/path/to/my/file/mydata.xls')
    my_data <- read_xls('https://online/path/to/data.xls')
```

<br> 

## Writing .xlsx Files

I'm not sure why you would want to write an excel file instead of a .csv, but this is how. 

```
library('xlsx')

write.xlsx(target_dataframe, '~/path/to/file.xlsx', sheetName = "Sheet1", 
  col.names = TRUE, row.names = TRUE, append = FALSE)

write.xlsx(second_dataframe, file = "~/path/to/file.xlsx", 
           sheetName="Sheet2", append=TRUE)
```

<br> 

That's all for now! Thanks for reading!

<br>

\- Fisher

<br> 
<br> 

