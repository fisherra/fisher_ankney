---
layout: post
title: "L.A. Parking Citations - EDA Part I"
categories:
  - Blog Posts
top_tags: Python
exc: "The first of a four-part series exploring the open source data on parking citations in the city of Los Angeles. The entire exploratory data analysis is done using python. This post covers downloading, wrangling, understanding, and wrangling the data."
tags:
- Python
- EDA
- NumPy
- SciPy
- Pandas
- Open Source
- Data Wrangling
---

<br> 

### Introduction

This is the first of a four-part exploratory data analysis project on an open source parking citation dataset. The project utilizes Python and several of its data science oriented packages (NumPy, SciPy, Matplotlib, Pandas, GeoPandas). This is my first time using Python in a data-science oriented project, so python people, be prepared to be offended by a bunch of non-pythonic code!

The dataset I used for this EDA is available for free on [Kaggle](https://www.kaggle.com/) or at the Los Angeles open source data [website](https://data.lacity.org/). 

The analysis is initially done in [Jupyter Lab](http://jupyter.org/), which can be exported to a markdown file with its associated images. I add [YAML](http://yaml.org/) (a simple file configuration language) to the markdown file, then copy and paste finished product and it's images to my website's [jekyll](https://jekyllrb.com/) folder. Once everything is properly updated and running on my local server, I push the changes to [Github](https://github.com/), which automatically updates my hosted site on [Github Pages](https://pages.github.com/).

In this post, I wish to explore the dataset's variables and observations, trim and transform 'useless' variables to become more useful, reduce the file size, and store the results for future exploration. 

Let's get to it!

<br>

### Load Libraries

In the first part of this EDA we'll only need to load the [NumPy](http://www.numpy.org/) and [Pandas](https://pandas.pydata.org/) packages. Importing os allows you to interface with the underlying operating system that python is running on, in my case MacOS. This is necessary to calculate file sizes. Warnings allows you to suppress warning messages.



```python
import numpy as np
import pandas as pd
import os
import warnings

warnings.filterwarnings('ignore')
```

<br> 

### Verify Dataset

I've downloaded the full parking citation dataset from the City of Los Angeles open data website. It's updated daily and stretches as far back as 2015. That makes for a lot of parking citations. Let's check out just how large the dataset is, in terms of memory size and number of elements.

```python
# return file size in GB
os.path.getsize('input/parking_citation.csv') / (1*10**9)

# read full data csv from input folder (no output)
la_ticket_full = pd.read_csv("~/Documents/data_science/py_la_tickets/input/parking_citation.csv")

# return shape of newly created dataframe
la_ticket_full.shape
```

    1.021944555

    (7201006, 19)


<br> 

With 19 variables and over 7 million rows, it looks like we have a whole lot of data to work with! Here's a a look at the dataframe itself.

<br>


```python
# view dataframe
la_ticket_full.head()
```


<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Ticket number</th>
      <th>Issue Date</th>
      <th>Issue time</th>
      <th>Meter Id</th>
      <th>Marked Time</th>
      <th>RP State Plate</th>
      <th>Plate Expiry Date</th>
      <th>VIN</th>
      <th>Make</th>
      <th>Body Style</th>
      <th>Color</th>
      <th>Location</th>
      <th>Route</th>
      <th>Agency</th>
      <th>Violation code</th>
      <th>Violation Description</th>
      <th>Fine amount</th>
      <th>Latitude</th>
      <th>Longitude</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>4272349605</td>
      <td>2015/12/30 12:00:00 AM</td>
      <td>2201.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>CA</td>
      <td>201605.0</td>
      <td>NaN</td>
      <td>OLDS</td>
      <td>PA</td>
      <td>GN</td>
      <td>3069 SAN MARINO ST</td>
      <td>00403</td>
      <td>54.0</td>
      <td>80.56E4+</td>
      <td>RED ZONE</td>
      <td>93.0</td>
      <td>6471840.7</td>
      <td>1842349.7</td>
    </tr>
    <tr>
      <th>1</th>
      <td>4272349616</td>
      <td>2015/12/30 12:00:00 AM</td>
      <td>2205.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>CA</td>
      <td>201508.0</td>
      <td>NaN</td>
      <td>HOND</td>
      <td>PA</td>
      <td>WT</td>
      <td>2936 8TH ST W</td>
      <td>00403</td>
      <td>54.0</td>
      <td>80.56E1</td>
      <td>WHITE ZONE</td>
      <td>58.0</td>
      <td>6473823.2</td>
      <td>1843512.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>4272821512</td>
      <td>2015/12/30 12:00:00 AM</td>
      <td>1725.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>CA</td>
      <td>10.0</td>
      <td>NaN</td>
      <td>TOYT</td>
      <td>PA</td>
      <td>SL</td>
      <td>301 LAUREL AV N</td>
      <td>00401</td>
      <td>54.0</td>
      <td>5204A-</td>
      <td>DISPLAY OF TABS</td>
      <td>25.0</td>
      <td>6451207.5</td>
      <td>1850273.2</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4272821523</td>
      <td>2015/12/30 12:00:00 AM</td>
      <td>1738.0</td>
      <td>WF74</td>
      <td>NaN</td>
      <td>CA</td>
      <td>2.0</td>
      <td>NaN</td>
      <td>RROV</td>
      <td>PA</td>
      <td>BK</td>
      <td>8321 3RD ST W</td>
      <td>00401</td>
      <td>54.0</td>
      <td>88.13B+</td>
      <td>METER EXP.</td>
      <td>63.0</td>
      <td>6449387.2</td>
      <td>1849063.5</td>
    </tr>
    <tr>
      <th>4</th>
      <td>4272821534</td>
      <td>2015/12/30 12:00:00 AM</td>
      <td>1807.0</td>
      <td>13</td>
      <td>NaN</td>
      <td>CA</td>
      <td>1.0</td>
      <td>NaN</td>
      <td>FORD</td>
      <td>PA</td>
      <td>GN</td>
      <td>121 CROFT AVE</td>
      <td>00401</td>
      <td>54.0</td>
      <td>80.58L</td>
      <td>PREFERENTIAL PARKING</td>
      <td>68.0</td>
      <td>6448347.2</td>
      <td>1849662.2</td>
    </tr>
  </tbody>
</table>
</div>

<br> 

While 1 GB of data isn't necessarily huge, I'm going to take a smaller slice of it to conduct my data analysis. Github only allows for file submissions that are < 100 mb in size without utilizing [Git Large File Storage (LFS)](https://git-lfs.github.com/) so that's something to take into account. 

I'm going to conduct the analysis on the entire year of 2017 to shorten up the dataset a bit. I'll also drop some of these variables that seem rather boring, such as 'Ticket Number' or 'Plate Expiry Date'. 


<br> 

### 2017 Data

Reducing the dataset to include tickets issued in 2017 isn't much of an issue. I'll employ string matching and indexing to accomplish the task. 


```python
# pull Issue Date variable from the main Dataframe to create a Pandas Series of just date-times
la_ticket_issue = la_ticket_full['Issue Date']
la_ticket_issue.head()

# how many of the issue date variables contain '2017'
sum(la_ticket_issue.str.contains('2017') == True)
```
    0    2015/12/30 12:00:00 AM
    1    2015/12/30 12:00:00 AM
    2    2015/12/30 12:00:00 AM
    3    2015/12/30 12:00:00 AM
    4    2015/12/30 12:00:00 AM
    Name: Issue Date, dtype: object

    2254329


<br> 

There are 2.2 million entries containing the string '2017'. Let's index these variables, and then pull the corresponding elements out of the main dataframe. 

<br> 

```python
# create a True / False list for indexing the data
la_ticket_2017_index = la_ticket_issue.str.contains('2017')
la_ticket_2017_index.head()

# apply the index to the full dataframe to create a new '2017' Dataframe
la_ticket_2017 = la_ticket_full[la_ticket_2017_index]

# make sure length of dataset matches previously determined 'sum' of 2017 strings
len(la_ticket_2017)
```
    0    False
    1    False
    2    False
    3    False
    4    False
    Name: Issue Date, dtype: bool

    2254329


<br> 

The lengths match up, but let's have another look at the dataframe just to make sure everything is as we expect. 

<br>

```python
# ensure variables remain untouched
la_ticket_2017.head()
```


<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Ticket number</th>
      <th>Issue Date</th>
      <th>Issue time</th>
      <th>Meter Id</th>
      <th>Marked Time</th>
      <th>RP State Plate</th>
      <th>Plate Expiry Date</th>
      <th>VIN</th>
      <th>Make</th>
      <th>Body Style</th>
      <th>Color</th>
      <th>Location</th>
      <th>Route</th>
      <th>Agency</th>
      <th>Violation code</th>
      <th>Violation Description</th>
      <th>Fine amount</th>
      <th>Latitude</th>
      <th>Longitude</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2735704</th>
      <td>1115377911</td>
      <td>2017/12/18 12:00:00 AM</td>
      <td>2205.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>CA</td>
      <td>201712.0</td>
      <td>NaN</td>
      <td>HOND</td>
      <td>PA</td>
      <td>BK</td>
      <td>1323 S FLOWER ST</td>
      <td>00192</td>
      <td>1.0</td>
      <td>4000A1</td>
      <td>NO EVIDENCE OF REG</td>
      <td>50.0</td>
      <td>6.480729e+06</td>
      <td>1.836883e+06</td>
    </tr>
    <tr>
      <th>2771883</th>
      <td>1114752936</td>
      <td>2017/05/11 12:00:00 AM</td>
      <td>800.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>CA</td>
      <td>201712.0</td>
      <td>NaN</td>
      <td>FRHT</td>
      <td>TR</td>
      <td>WH</td>
      <td>INDIANA/NOAKES</td>
      <td>CM99</td>
      <td>1.0</td>
      <td>4000A1</td>
      <td>NO EVIDENCE OF REG</td>
      <td>50.0</td>
      <td>9.999900e+04</td>
      <td>9.999900e+04</td>
    </tr>
    <tr>
      <th>2777524</th>
      <td>4302749861</td>
      <td>2017/03/01 12:00:00 AM</td>
      <td>104.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>OR</td>
      <td>3.0</td>
      <td>NaN</td>
      <td>TOYT</td>
      <td>PA</td>
      <td>BL</td>
      <td>1822 WINONA BLVD</td>
      <td>00402</td>
      <td>54.0</td>
      <td>80.56E4+</td>
      <td>RED ZONE</td>
      <td>93.0</td>
      <td>6.470239e+06</td>
      <td>1.860397e+06</td>
    </tr>
    <tr>
      <th>2777558</th>
      <td>1120840291</td>
      <td>2017/03/28 12:00:00 AM</td>
      <td>1050.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>CA</td>
      <td>201708.0</td>
      <td>NaN</td>
      <td>HOND</td>
      <td>PA</td>
      <td>BK</td>
      <td>710 EL CENTRO AV</td>
      <td>00001</td>
      <td>1.0</td>
      <td>4000A1</td>
      <td>NO EVIDENCE OF REG</td>
      <td>50.0</td>
      <td>9.999900e+04</td>
      <td>9.999900e+04</td>
    </tr>
    <tr>
      <th>2777651</th>
      <td>4308029526</td>
      <td>2017/05/15 12:00:00 AM</td>
      <td>134.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>CA</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>LEXS</td>
      <td>PA</td>
      <td>BL</td>
      <td>1701 VINE ST</td>
      <td>00402</td>
      <td>54.0</td>
      <td>80.69B</td>
      <td>NO PARKING</td>
      <td>73.0</td>
      <td>6.462770e+06</td>
      <td>1.859525e+06</td>
    </tr>
  </tbody>
</table>
</div>

<br> 


Everything looks good! The dataset still contains some 2.2 million observations, which should be more than enough to work with! One last check to make sure we encompass only 2017. 

<br>

```python
# first issue date in the new 2017 dataset
min(la_ticket_2017['Issue Date'])

# last issue date in the new 2017 dataset
max(la_ticket_2017['Issue Date'])
```

    '2017/01/01 12:00:00 AM'

    '2017/12/31 12:00:00 AM'


<br> 

The first ticket in the new dataset was given in the first minute of January 1st, and the last ticket was given in the last minute of December 31st. Perfect.

The next step in my data-wrangling workflow is to alter and drop initial variables that aren't pleasing to work with. Starting with the date-time variable. 

<br> 

### Create Day of the Year Variable

We've been working with the variable 'Issue Date'. A useful variable, but in a rather unsightly form. Issue time is already reported separately from Issue Date in the dataset, thus all Issue Dates report a time of midnight. 

I want to drop the time from issue date, coerce the structure from a string to an actual date-time, and create a corresponding day of the year variable. A day of the year variable will allow me to easily visualize ticket trends throughout the year as a whole. 


```python
# create a new Series to work with outside of the main Dataframe
date_time = la_ticket_2017['Issue Date']

# check what data type 'Issue Date' is stored as
type(date_time.iloc[0,])

# split string into date and time based on the space between them
date_time_split = date_time.str.split(' ', n=1, expand = True)
date_time_split.head()
```
    str


<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>0</th>
      <th>1</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2735704</th>
      <td>2017/12/18</td>
      <td>12:00:00 AM</td>
    </tr>
    <tr>
      <th>2771883</th>
      <td>2017/05/11</td>
      <td>12:00:00 AM</td>
    </tr>
    <tr>
      <th>2777524</th>
      <td>2017/03/01</td>
      <td>12:00:00 AM</td>
    </tr>
    <tr>
      <th>2777558</th>
      <td>2017/03/28</td>
      <td>12:00:00 AM</td>
    </tr>
    <tr>
      <th>2777651</th>
      <td>2017/05/15</td>
      <td>12:00:00 AM</td>
    </tr>
  </tbody>
</table>
</div>

<br> 

Date-time has been split into two variables in a new dataframe, date and time. We need to drop the time variable and reformat the date to be more useful.

<br> 

```python
# use only date, as we have accurate issue times in another dataset variable
date = date_time_split.iloc[:,0]
date.head()

# convert datatype to date-time using pandas function
date = pd.to_datetime(date, format='%Y/%m/%d')
date.head()
```


    2735704    2017/12/18
    2771883    2017/05/11
    2777524    2017/03/01
    2777558    2017/03/28
    2777651    2017/05/15
    Name: 0, dtype: object



    2735704   2017-12-18
    2771883   2017-05-11
    2777524   2017-03-01
    2777558   2017-03-28
    2777651   2017-05-15
    Name: 0, dtype: datetime64[ns]


<br> 

Now we're only working with the date variable, and it has been changed to a datetime64 object. Time to split up the date into the day of the year (1 - 365), month (1 - 12) and day of the month (1 - 31). These variables will be easier to visualize later on. 

<br>

```python
# use built-in datetime functionality 'dt' to create 3 new variables
day_of_year = date.dt.dayofyear
month = date.dt.month
day = date.dt.day

# create a new_date dataframe, consisting of the date, month, day, and day of the year
new_date = pd.concat([date, month, day, day_of_year], axis = 1)
new_date.columns = ['Date', 'Month', 'Day', 'Day of Year']
new_date.head()
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Date</th>
      <th>Month</th>
      <th>Day</th>
      <th>Day of Year</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2735704</th>
      <td>2017-12-18</td>
      <td>12</td>
      <td>18</td>
      <td>352</td>
    </tr>
    <tr>
      <th>2771883</th>
      <td>2017-05-11</td>
      <td>5</td>
      <td>11</td>
      <td>131</td>
    </tr>
    <tr>
      <th>2777524</th>
      <td>2017-03-01</td>
      <td>3</td>
      <td>1</td>
      <td>60</td>
    </tr>
    <tr>
      <th>2777558</th>
      <td>2017-03-28</td>
      <td>3</td>
      <td>28</td>
      <td>87</td>
    </tr>
    <tr>
      <th>2777651</th>
      <td>2017-05-15</td>
      <td>5</td>
      <td>15</td>
      <td>135</td>
    </tr>
  </tbody>
</table>
</div>


<br> 

The job's almost done, now to add the new variables back in with the main dataset. 

<br>

```python
# Copy the new_date variables into the original dataframe, la_ticket_2017
la_ticket_2017['Month'] = new_date['Month']
la_ticket_2017['Day'] = new_date['Day']
la_ticket_2017['Day of Year'] = new_date['Day of Year']

# view la_ticket_2017 dataframe
la_ticket_2017.head()
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Ticket number</th>
      <th>Issue Date</th>
      <th>Issue time</th>
      <th>Meter Id</th>
      <th>Marked Time</th>
      <th>RP State Plate</th>
      <th>Plate Expiry Date</th>
      <th>VIN</th>
      <th>Make</th>
      <th>Body Style</th>
      <th>...</th>
      <th>Route</th>
      <th>Agency</th>
      <th>Violation code</th>
      <th>Violation Description</th>
      <th>Fine amount</th>
      <th>Latitude</th>
      <th>Longitude</th>
      <th>Month</th>
      <th>Day</th>
      <th>Day of Year</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2735704</th>
      <td>1115377911</td>
      <td>2017/12/18 12:00:00 AM</td>
      <td>2205.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>CA</td>
      <td>201712.0</td>
      <td>NaN</td>
      <td>HOND</td>
      <td>PA</td>
      <td>...</td>
      <td>00192</td>
      <td>1.0</td>
      <td>4000A1</td>
      <td>NO EVIDENCE OF REG</td>
      <td>50.0</td>
      <td>6.480729e+06</td>
      <td>1.836883e+06</td>
      <td>12</td>
      <td>18</td>
      <td>352</td>
    </tr>
    <tr>
      <th>2771883</th>
      <td>1114752936</td>
      <td>2017/05/11 12:00:00 AM</td>
      <td>800.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>CA</td>
      <td>201712.0</td>
      <td>NaN</td>
      <td>FRHT</td>
      <td>TR</td>
      <td>...</td>
      <td>CM99</td>
      <td>1.0</td>
      <td>4000A1</td>
      <td>NO EVIDENCE OF REG</td>
      <td>50.0</td>
      <td>9.999900e+04</td>
      <td>9.999900e+04</td>
      <td>5</td>
      <td>11</td>
      <td>131</td>
    </tr>
    <tr>
      <th>2777524</th>
      <td>4302749861</td>
      <td>2017/03/01 12:00:00 AM</td>
      <td>104.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>OR</td>
      <td>3.0</td>
      <td>NaN</td>
      <td>TOYT</td>
      <td>PA</td>
      <td>...</td>
      <td>00402</td>
      <td>54.0</td>
      <td>80.56E4+</td>
      <td>RED ZONE</td>
      <td>93.0</td>
      <td>6.470239e+06</td>
      <td>1.860397e+06</td>
      <td>3</td>
      <td>1</td>
      <td>60</td>
    </tr>
    <tr>
      <th>2777558</th>
      <td>1120840291</td>
      <td>2017/03/28 12:00:00 AM</td>
      <td>1050.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>CA</td>
      <td>201708.0</td>
      <td>NaN</td>
      <td>HOND</td>
      <td>PA</td>
      <td>...</td>
      <td>00001</td>
      <td>1.0</td>
      <td>4000A1</td>
      <td>NO EVIDENCE OF REG</td>
      <td>50.0</td>
      <td>9.999900e+04</td>
      <td>9.999900e+04</td>
      <td>3</td>
      <td>28</td>
      <td>87</td>
    </tr>
    <tr>
      <th>2777651</th>
      <td>4308029526</td>
      <td>2017/05/15 12:00:00 AM</td>
      <td>134.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>CA</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>LEXS</td>
      <td>PA</td>
      <td>...</td>
      <td>00402</td>
      <td>54.0</td>
      <td>80.69B</td>
      <td>NO PARKING</td>
      <td>73.0</td>
      <td>6.462770e+06</td>
      <td>1.859525e+06</td>
      <td>5</td>
      <td>15</td>
      <td>135</td>
    </tr>
  </tbody>
</table>
<p>5 rows × 22 columns</p>
</div>

<br>

### Remove 'Useless' Variables

Using the drop operator, we can make quick work of variables that are redundant or uninteresting.

```python
# drop variables, create reduced dataframe
la_ticket_2017_reduced = la_ticket_2017.drop(['Ticket number', 'Issue Date', 'Marked Time',
                                              'Plate Expiry Date', 'VIN', 'Body Style',
                                              'Route', 'Agency'],
                                             axis=1)

# view reduced dataframe
la_ticket_2017_reduced.head()
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Issue time</th>
      <th>Meter Id</th>
      <th>RP State Plate</th>
      <th>Make</th>
      <th>Color</th>
      <th>Location</th>
      <th>Violation code</th>
      <th>Violation Description</th>
      <th>Fine amount</th>
      <th>Latitude</th>
      <th>Longitude</th>
      <th>Month</th>
      <th>Day</th>
      <th>Day of Year</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2735704</th>
      <td>2205.0</td>
      <td>NaN</td>
      <td>CA</td>
      <td>HOND</td>
      <td>BK</td>
      <td>1323 S FLOWER ST</td>
      <td>4000A1</td>
      <td>NO EVIDENCE OF REG</td>
      <td>50.0</td>
      <td>6.480729e+06</td>
      <td>1.836883e+06</td>
      <td>12</td>
      <td>18</td>
      <td>352</td>
    </tr>
    <tr>
      <th>2771883</th>
      <td>800.0</td>
      <td>NaN</td>
      <td>CA</td>
      <td>FRHT</td>
      <td>WH</td>
      <td>INDIANA/NOAKES</td>
      <td>4000A1</td>
      <td>NO EVIDENCE OF REG</td>
      <td>50.0</td>
      <td>9.999900e+04</td>
      <td>9.999900e+04</td>
      <td>5</td>
      <td>11</td>
      <td>131</td>
    </tr>
    <tr>
      <th>2777524</th>
      <td>104.0</td>
      <td>NaN</td>
      <td>OR</td>
      <td>TOYT</td>
      <td>BL</td>
      <td>1822 WINONA BLVD</td>
      <td>80.56E4+</td>
      <td>RED ZONE</td>
      <td>93.0</td>
      <td>6.470239e+06</td>
      <td>1.860397e+06</td>
      <td>3</td>
      <td>1</td>
      <td>60</td>
    </tr>
    <tr>
      <th>2777558</th>
      <td>1050.0</td>
      <td>NaN</td>
      <td>CA</td>
      <td>HOND</td>
      <td>BK</td>
      <td>710 EL CENTRO AV</td>
      <td>4000A1</td>
      <td>NO EVIDENCE OF REG</td>
      <td>50.0</td>
      <td>9.999900e+04</td>
      <td>9.999900e+04</td>
      <td>3</td>
      <td>28</td>
      <td>87</td>
    </tr>
    <tr>
      <th>2777651</th>
      <td>134.0</td>
      <td>NaN</td>
      <td>CA</td>
      <td>LEXS</td>
      <td>BL</td>
      <td>1701 VINE ST</td>
      <td>80.69B</td>
      <td>NO PARKING</td>
      <td>73.0</td>
      <td>6.462770e+06</td>
      <td>1.859525e+06</td>
      <td>5</td>
      <td>15</td>
      <td>135</td>
    </tr>
  </tbody>
</table>
</div>


<br> 

### Explore Variables

We've trimmed the scale and scope of the data, accomplishing exactly what we set out to do in the beginning of this post. Now let's have a peak at the variables, so we can start to think of the challenges to come!


```python
# unique plates
pd.unique(la_ticket_2017_reduced['RP State Plate'])

# see if we have 50 entries for the 50 states
len(pd.unique(la_ticket_2017_reduced['RP State Plate']))
```


    array(['CA', 'OR', 'CO', 'TX', 'WA', 'ID', 'TN', 'FL', 'NV', 'MD', 'AZ',
           'SD', 'CT', 'VA', 'US', 'GA', 'IL', 'UT', 'MA', 'MO', 'WI', 'MI',
           'NE', 'PA', 'ND', 'OH', 'NM', 'NY', 'IN', 'LA', 'SC', 'NC', 'NJ',
           'MN', 'AL', 'AB', 'KS', 'OK', 'KY', 'QU', 'AR', 'MT', 'IA', 'HI',
           'CN', 'DC', 'VI', 'MS', 'WV', 'NH', 'XX', 'WY', 'AK', 'MX', 'RI',
           'ON', 'BC', 'VT', 'DE', 'ME', 'SA', 'FN', 'NW', 'NF', 'CZ', 'NB',
           'MB', 'AS', 'NS', 'PE', 'TT', 'GU', 'PR', 'ML'], dtype=object)


    74


<br> 

There are 74 unique license plates recorded! It appears that we have the predicted state license plates, like 'CA' and 'CO', but there are also less predictable plates like 'BC' (British Columbia) and 'ON' (Ontario). Let's use the same method to look into how many different car manufacturers are represented, and how many colors are recorded in the citation data. 

<br> 

```python
# how many different makers?
len(pd.unique(la_ticket_2017_reduced['Make']))
```

    1121


<br> 


1121 different car manufacturers is a bit obsurd. To work with this variable in a meaningful way, we'll have to work it down to the top 50 or so manufacturers.

<br>


```python
# unique car colors
pd.unique(la_ticket_2017_reduced['Color'])
```




    array(['BK', 'WH', 'BL', 'GY', 'BR', 'TA', nan, 'WT', 'RD', 'GO', 'MR',
           'SL', 'BN', 'GN', 'PR', 'TN', 'YE', 'OT', 'OR', 'BG', 'RE', 'SI',
           'GR', 'BU', 'MA', 'PU', 'CR', 'MY', 'TU', 'BE', 'TE', 'GD', 'MU',
           'CH', 'YL', 'RU', 'CO', 'PK', 'UN', 'WI', 'BZ', 'PI', 'WE', 'OL',
           'AQ', 'AU', 'WR', 'WA', 'AM', 'GL', 'PE', 'RA', 'BI', 'BA', 'ES',
           'SU', 'PP', 'BW', 'GE', 'VA', 'PL', 'LE', 'CA', 'W', 'ME', 'SV',
           'BH', 'SA', 'AP', 'VO', 'VU', 'TL'], dtype=object)


<br> 

There appears to be a lot of different ways to declare a car's color. For example, White is recorded as 'WH', 'WI', 'WT', 'WE', and W'. This could pose a problem. 


How many unique violation codes are present, and do they correspond 1:1 with the Violation Description variable?

<br>


```python
len(pd.unique(la_ticket_2017_reduced['Violation code']))

len(pd.unique(la_ticket_2017_reduced['Violation Description']))
```

    231


    400


<br> 

What portion of the citation data includes an expired meter?

<br>

```python
sum(la_ticket_2017_reduced['Meter Id'].str.contains('N') == False) / len(la_ticket_2017_reduced)
```

    0.22996510269796466


<br> 

### Write Reduced 2017 Dataset

Now that we've had a look at the variables, let's finish up this part of the project by splitting the data into smaller, easily saved pieces. Remember that files need to be less than 100 mb to be saved on Github without issue. 


```python
# write full reduced dataframe
la_ticket_2017_reduced.to_csv('input/la_ticket_2017.csv')

# check size again
os.path.getsize('input/la_ticket_2017.csv') / (1*10**9)
```

    0.25989506


<br>

0.26 GB is still too large, we'll have to break up the dataset parts. 

<br>


```python
# create 4 sequences of 3 months for indexing the reduced dataset
seq_1 = ['01','02','03']
seq_2 = ['04','05','06']
seq_3 = ['07','08','09']
seq_4 = ['10','11','12']

# create the index
index_1 = la_ticket_2017_reduced['Month'].isin(seq_1)
index_2 = la_ticket_2017_reduced['Month'].isin(seq_2)
index_3 = la_ticket_2017_reduced['Month'].isin(seq_3)
index_4 = la_ticket_2017_reduced['Month'].isin(seq_4)

# apply index to separate dataset into 4 pieces
la_ticket_2017_1 = la_ticket_2017_reduced[index_1]
la_ticket_2017_2 = la_ticket_2017_reduced[index_2]
la_ticket_2017_3 = la_ticket_2017_reduced[index_3]
la_ticket_2017_4 = la_ticket_2017_reduced[index_4]

# save the four pieces
la_ticket_2017_1.to_csv('la_ticket_2017_1.csv')
la_ticket_2017_2.to_csv('la_ticket_2017_2.csv')
la_ticket_2017_3.to_csv('la_ticket_2017_3.csv')
la_ticket_2017_4.to_csv('la_ticket_2017_4.csv')
```

<br> 

Breaking the 0.26 GB dataset into 4 pieces should give us small enough files to commit, but let's check to make sure. 

<br>


```python
# check size of the jan-mar piece
os.path.getsize('la_ticket_2017_1.csv') / (1*10**9)

# check size of the second piece
os.path.getsize('la_ticket_2017_2.csv') / (1*10**9)

# check size of the third piece
os.path.getsize('la_ticket_2017_3.csv') / (1*10**9)

# check size of the final piece
os.path.getsize('la_ticket_2017_4.csv') / (1*10**9)
```

    0.063464771

    0.066494809

    0.063882298

    0.060089451


<br> 

And that's it!

To summarize, we've loaded a dataset, reduced its range, altered its variables, and explored the remaining variables. We finished by dividing the dataset into 4 parts of roughly equal size, in order to easily download and upload them. 

In part two of this EDA, we'll work with the newly time variables, visualizing how many citations are given and when. Later we'll do geospatial work, and categorical analysis. It should be fun!

<br> 

Until next time, <br> 

\- Fisher
