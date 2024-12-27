---
layout: post
title: "Working Directories and R"
categories:
  - Blog Posts
top_tags: General
tags:
- Data Toolbox
---

<hr>

In general working directories are easy to understand, but when you're using R Markdown files, 
things can get a bit more complicated. 

<br>

## R Files and Interface


First, it’s essential to understand how directories work. Here’s how you view
your directory directly from R (similar to pwd in the terminal).

<br>
```
    getwd()
```
<br>

And here’s how you set your working directory from R.

<br> 
```
    setwd('your/directory/here')
```
<br>


## R Markdown Files


Here's where it gets tricky. The knitr package switches your working directory back
after each .Rmd chunk is ran, unless you set the root.dir using knitr
options. Here’s proof that just using `setwd()` doesn’t work. This is
ran from inside an .rmd file.


The first chunk:

<br>
```
getwd()
setwd('/Users/fisher/Documents/')
getwd()
```

```
## [1] "/Users/fisher/Documents/data_science/r_workflow/import_export"
## [2] "/Users/fisher/Documents"
```

<br>

The second chunk:

```
getwd()
```

```   
## [1] "/Users/fisher/Documents/data_science/r_workflow/import_export"
```

<br>
<br>

Instead we must use this knitr option:

<br> 

```
knitr::opts_knit$set(root.dir = normalizePath("/Users/fisher/")) 
knitr::opts_knit$get("root.dir")  
```

```
## [1] "/Users/fisher"
```

<br> 

The second chunk:

```
getwd()
```

```
## [1] "/Users/fisher"
```

<br>
<br>


That’s all for now! Thanks for reading!

\- Fisher

<br>
<br>
