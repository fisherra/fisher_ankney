---
layout: post
title: "L.A. Parking Citations - EDA Part II"
categories:
  - Blog Posts
top_tags: Python
exc: "The second of a four-part series exploring the open source data on parking citations in the city of Los Angeles. The entire exploratory data analysis is done using python. This post covers exploring when citations are issued: by the hour, day, and month."
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

This is the second of a four-part exploratory data analysis project on an open source parking citation dataset. The project utilizes Python and several of its numerical packages (NumPy, SciPy, Matplotlib, Pandas, GeoPandas). The dataset I used for this EDA is available for free on [Kaggle](https://www.kaggle.com/) or at the Los Angeles open source data [website](https://data.lacity.org/). 


In this post, we're going to explore the date-time variables associated with this citation dataset. We'll look into when citations are given throughout the day, week, and year. We'll also examine revenue trends, and how many citations are issued on special days of the week or year. 

### Load Libraries


We'll be using numpy, scipy, pandas, and matplotlib in this portion of the EDA. 


```python
import numpy as np
from scipy import stats
import pandas as pd
import matplotlib.pyplot as plt
plt.style.use('ggplot')
```

<br> 

### Combine Datasets

If you read my previous post, L.A. Parking Citations - EDA Part I, you'll recall that we broke the dataset up into four parts in order to save easily store it in a repository. Now that we're looking to work with the dataset once again, we need to combine these pieces back together. 


```python
# load individual sets
la_ticket_2017_1 = pd.read_csv("~/Documents/data_science/py_la_tickets/input/la_ticket_2017_1.csv")
la_ticket_2017_2 = pd.read_csv("~/Documents/data_science/py_la_tickets/input/la_ticket_2017_2.csv")
la_ticket_2017_3 = pd.read_csv("~/Documents/data_science/py_la_tickets/input/la_ticket_2017_3.csv")
la_ticket_2017_4 = pd.read_csv("~/Documents/data_science/py_la_tickets/input/la_ticket_2017_4.csv")

# combine dataset
la_ticket_2017 = pd.concat([la_ticket_2017_1, la_ticket_2017_2, la_ticket_2017_3, la_ticket_2017_4])

# view dataset
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
      <th>Unnamed: 0</th>
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
      <th>0</th>
      <td>2777524</td>
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
      <th>1</th>
      <td>2777558</td>
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
      <th>2</th>
      <td>2827647</td>
      <td>115.0</td>
      <td>NaN</td>
      <td>CA</td>
      <td>HOND</td>
      <td>GY</td>
      <td>7502 WILLIS AVENUE</td>
      <td>22500E</td>
      <td>BLOCKING DRIVEWAY</td>
      <td>68.0</td>
      <td>6.424012e+06</td>
      <td>1.897916e+06</td>
      <td>1</td>
      <td>3</td>
      <td>3</td>
    </tr>
    <tr>
      <th>3</th>
      <td>2827648</td>
      <td>126.0</td>
      <td>NaN</td>
      <td>CA</td>
      <td>FORD</td>
      <td>WT</td>
      <td>14957 FRIAR STREET</td>
      <td>5204A-</td>
      <td>DISPLAY OF TABS</td>
      <td>25.0</td>
      <td>6.422948e+06</td>
      <td>1.890266e+06</td>
      <td>1</td>
      <td>3</td>
      <td>3</td>
    </tr>
    <tr>
      <th>4</th>
      <td>2827649</td>
      <td>132.0</td>
      <td>NaN</td>
      <td>CA</td>
      <td>HOND</td>
      <td>BK</td>
      <td>14634 SYLVAN ST</td>
      <td>22514</td>
      <td>FIRE HYDRANT</td>
      <td>68.0</td>
      <td>6.425072e+06</td>
      <td>1.889888e+06</td>
      <td>1</td>
      <td>3</td>
      <td>3</td>
    </tr>
  </tbody>
</table>
</div>


<br> 

### Citations by Day of the Year

Previously, we created the 'Day of Year' variable, visible in the above dataset. This variable will be useful in understanding trends in the number of citations issued throughout the year, and will allow us to easily transform the date-time data.

Let's have a look at this variable now. 


```python
la_ticket_2017.hist('Day of Year', bins=365, color = 'seagreen')
```


![png]({{ site.baseurl }}/images/parking_citations/output_9_0.png)


<br> 

I've binned the results such that each bar corresponds to each day of the year. Number of citations issued is described on the y-axis, and the sequential day of the year is described on the x-axis. 

This visualization makes a few things apparent. First, it's apparent that at least 500 parking citations are given each day. Citations issued max out at around 9000 in a single day. There are three distinct levels of citations being issued. Daily totals cluster at ~2500, ~4000, and ~7500 citations issued. 

Let's see if these clusters hold when we examine how much revenue is generated, each day, on average. To visualize revenue generated, we can sum the 'Fine amount' variable as grouped by the day of the year and then create a density plot from this data. 

<br>


```python
sum_fine_by_day = la_ticket_2017.groupby('Day of Year')['Fine amount'].sum()

sum_fine_by_day.plot.density(color = 'lightslategray')
```


![png]({{ site.baseurl }}/images/parking_citations/output_12_0.png)


<br>

The groupings hold after transforming the data in terms of revenue. We can see three peaks in average daily revenue. A local maximum appears at approximately \$175,000, and another at \$300,000. These peaks likely correspond to 2500 and 4000 citation groupings. A much larger global maximum arises at just under \$600,000$. This corresponds to most frequency grouping of daily citations issued, ~7500. 

It's interesting to see that a typical day will generate between $150000 and $600000 in revenue from parking citations. 

Now that we're sure that there is a discernable pattern in daily citations issued, let's explore what dictates that pattern. Parking regulations typically change in accordance to the day of the week. For example, many cities have no meter tolls on Sundays. It's possible that changes in regulation and enforcement throughout the week result in these groupings. 

To investigate this hypothesis, we'll transform and visualize the data in terms of 'day of the week'. 

<br> 


### Citations by Day of the Week

First, we'll create a dedicated Pandas Series that holds information on parking citations issued per day. That way we don't have to re-run groupby and count commands each time we want to access data organized in this fashion. 


```python
# create a ticket count for each day
tickets_by_day = la_ticket_2017.groupby('Day of Year').count()

# create a stand alone series
ticket_by_day = tickets_by_day.iloc[:,0]

# show created series
ticket_by_day.head()
```

    Day of Year
    1    1115
    2    1344
    3    8109
    4    7035
    5    7916
    Name: Unnamed: 0, dtype: int64


<br>

Next, we'll test out creating a Day of the Week variable on Sunday. The first day of 2017 was a Sunday, so that means that 'Day of Year' number 1, 8, 15, ... were all Sundays. We can loop through the Series collecting these Sundays and stuffing them into a new variable. 

<br> 


```python
i = 1 
sunday = []

# while counter is within dataset
while i <= len(ticket_by_day):
    # extract element and append to results array
    sunday.append(ticket_by_day[i])
    # proceed to next week
    i = i + 7

# format and display results
np.hstack(sunday)
```




    array([1115, 2348, 2112, 1224, 1952, 1822, 2251, 1865, 2304, 1931, 2142,
           2372, 2312, 2131, 2479, 2074, 2295, 2200, 2020, 1964, 2087, 2257,
           2285, 2110, 2196, 2553, 2099, 2271, 2499, 2386, 2257, 2243, 2316,
           2407, 1972, 1969, 2124, 2095, 2328, 2115, 2140, 2026, 2319, 1892,
           1920, 1740, 1821, 1803, 2147, 1965, 1642, 1255, 1604])



<br> 

Success!

Now to create a general function to apply this process to each day of the week.

<br> 


```python
# define the function name
def by_weekday(day):
    # set the counter equal to the argument
    i = day
    # create an empty array for results
    day = []
    
    # apply while loop to extract data
    while i <= 365:
        day.append(ticket_by_day[i])
        i = i + 7
    
    # format data
    np.hstack(day)
    day = pd.Series(day)
    
    # return results
    return(day)


# testing the function on Sunday
sunday = by_weekday(1)
sunday.head()
```




    0    1115
    1    2348
    2    2112
    3    1224
    4    1952
    dtype: int64



<br> 

Testing the function on Sunday produces the same results as above. Now we can proceed to apply this to each day of the week, creating seven new Pandas Series, then combining them into another DataFrame. 

<br>


```python
monday = by_weekday(2)
tuesday = by_weekday(3)
wednesday = by_weekday(4)
thursday = by_weekday(5)
friday = by_weekday(6)
saturday = by_weekday(7)

ticket_by_weekday = pd.concat([sunday, monday, tuesday, wednesday, thursday, friday, saturday], axis = 1)
ticket_by_weekday.columns = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
ticket_by_weekday.head()
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
      <th>Sunday</th>
      <th>Monday</th>
      <th>Tuesday</th>
      <th>Wednesday</th>
      <th>Thursday</th>
      <th>Friday</th>
      <th>Saturday</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1115</td>
      <td>1344.0</td>
      <td>8109.0</td>
      <td>7035.0</td>
      <td>7916.0</td>
      <td>7233.0</td>
      <td>4859.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2348</td>
      <td>6604.0</td>
      <td>8087.0</td>
      <td>7204.0</td>
      <td>6939.0</td>
      <td>6980.0</td>
      <td>5040.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2112</td>
      <td>1375.0</td>
      <td>8229.0</td>
      <td>7312.0</td>
      <td>8201.0</td>
      <td>6128.0</td>
      <td>4409.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1224</td>
      <td>7612.0</td>
      <td>8431.0</td>
      <td>8127.0</td>
      <td>8511.0</td>
      <td>7610.0</td>
      <td>4806.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1952</td>
      <td>8542.0</td>
      <td>8678.0</td>
      <td>8203.0</td>
      <td>8767.0</td>
      <td>8016.0</td>
      <td>5149.0</td>
    </tr>
  </tbody>
</table>
</div>



<br> 

Great, the dataset is now in terms of 'Day of the Week'. Let's visualize this transformation. 

<br> 


```python
ticket_by_weekday.plot()
```

![png]({{ site.baseurl }}/images/parking_citations/output_24_0.png)



<br> 

A beautiful visualization if I do say so myself! It looks like my hunch that the groupings were based on day of the week, was correct. Sunday regularly produces around 2000 citations. Saturday regularly produces 45000 citations. The weekdays average around 7000 to 8000 citations. This graph is a bit hard to follow, the data might be easier to understand if we visualize it as a series of boxplots. 

<br> 


```python
ticket_by_weekday.boxplot()
```

![png]({{ site.baseurl }}/images/parking_citations/output_26_0.png)



<br> 

This makes the mean citations issued much clearer. There is a very distinct difference between the number of citations issued on Sundays versus Mondays. But is there a difference between the weekdays? We can do a series of statistical tests to see if the means are significantly different. 

There are many procedures to test if two sample means are significantly different. One of the most straightforward is the t-test. Let's conduct a two-population t-test on the Sunday and Monday data to be sure that the difference observed in the visualization is statistically significant. 


<br> 


```python
# t-test Sunday and Monday
stats.ttest_ind(ticket_by_weekday['Sunday'], ticket_by_weekday['Monday'])
```




    Ttest_indResult(statistic=-14.114555018346483, pvalue=9.993642210838924e-26)



<br> 

The mean number of citations issued on Sundays is statistically different than the mean number of citations issued on Mondays. Instead of doing t-tests by hand for all the pairs, let's write a little loop that will do the leg work for us. 

<br> 


```python
# initial day to compare
for day in range(7):
    # second day for the comparison
    for day_2 in range(day+1, 7):
        # print the days being compared
        print(list(ticket_by_weekday)[day], list(ticket_by_weekday)[day_2])
        # conduct the t-test
        print(stats.ttest_ind(ticket_by_weekday.iloc[:,day], ticket_by_weekday.iloc[:,day_2]))
```

    Sunday Monday
    Ttest_indResult(statistic=-14.114555018346483, pvalue=9.993642210838924e-26)
    Sunday Tuesday
    Ttest_indResult(statistic=-39.200105865818514, pvalue=2.5709275857822333e-63)
    Sunday Wednesday
    Ttest_indResult(statistic=-70.26192329299684, pvalue=3.3199297166490703e-88)
    Sunday Thursday
    Ttest_indResult(statistic=-36.573858454513214, pvalue=1.9044297958758257e-60)
    Sunday Friday
    Ttest_indResult(statistic=-28.946699561781212, pvalue=5.397450684984687e-51)
    Sunday Saturday
    Ttest_indResult(statistic=-23.6204632589478, pvalue=3.772390749169104e-43)
    Monday Tuesday
    Ttest_indResult(statistic=-3.7245765466041916, pvalue=0.0003209744709376137)
    Monday Wednesday
    Ttest_indResult(statistic=-2.931192014701394, pvalue=0.004168140587481362)
    Monday Thursday
    Ttest_indResult(statistic=-3.4884588693442655, pvalue=0.0007185137137979519)
    Monday Friday
    Ttest_indResult(statistic=-0.8990678820480197, pvalue=0.37073406361282246)
    Monday Saturday
    Ttest_indResult(statistic=7.205958264020363, pvalue=1.0242512878117741e-10)
    Tuesday Wednesday
    Ttest_indResult(statistic=2.199934610785886, pvalue=0.03006852630328924)
    Tuesday Thursday
    Ttest_indResult(statistic=0.3307029989528652, pvalue=0.7415471929779237)
    Tuesday Friday
    Ttest_indResult(statistic=4.52141745074799, pvalue=1.661069033071054e-05)
    Tuesday Saturday
    Ttest_indResult(statistic=22.27992785117015, pvalue=5.604256381357363e-41)
    Wednesday Thursday
    Ttest_indResult(statistic=-1.6734243085378289, pvalue=0.09730802346354772)
    Wednesday Friday
    Ttest_indResult(statistic=3.6005602951584, pvalue=0.0004922318699883966)
    Wednesday Saturday
    Ttest_indResult(statistic=31.563121936548725, pvalue=1.9078872746154058e-54)
    Thursday Friday
    Ttest_indResult(statistic=4.086626355994712, pvalue=8.737245777165502e-05)
    Thursday Saturday
    Ttest_indResult(statistic=20.84950833547568, pvalue=1.457426897692227e-38)
    Friday Saturday
    Ttest_indResult(statistic=14.788541058567853, pvalue=4.029675334598723e-27)


<br> 

These results aren't pretty, but they do the job! Running through the results, we can see that Sunday is significantly different from each of the other days of the week. Monday and Friday are not significantly different; however, Monday and Wednesday are. There is no meaningful difference between Tuesday and Thursday. The average number of citations issued on Saturday is significantly different from each of the other days of the week as well. 

That explains our daily-citation groupings!

Let's mull over the date-time data from another perspective, and see if we can come up with any more interesting insights. 


<br>


### Citations by Month

Tickets issued by month. In the previous data-wrangling post, we created a stand-alone 'Month' variable for each citation. Let's visualize these now and see if there's anything interesting to look at. 


```python
la_ticket_2017.hist('Month', bins=12, color = 'indigo', edgecolor='black', linewidth=1)
```

![png]({{ site.baseurl }}/images/parking_citations/output_34_0.png)



<br> 

A uniform distribution throughout the year. the effect of a short February is evident in the total tickets issued. It seems that November is also a bit slower of a month. There doesn't seem to be any pattern to speak of here. How about a pattern within the month?

<br>


```python
la_ticket_2017.hist('Day', bins=31, color = 'firebrick', edgecolor = 'black')
```


![png]({{ site.baseurl }}/images/parking_citations/output_36_0.png)



<br>

We see a sharp decline in tickets issued on the 29th, 30th, and 31st days of the month. This can likely be attributed to Not all months having a 29th, 30th, and 31st day. Let's see what happens when we remove the effect of February. 
Nothing surprising here, last 29, 30, 31 drop off due to not being in every month. 

<br>


```python
la_ticket_2017[la_ticket_2017['Month'] != 2].hist('Day', bins = 31, color = 'firebrick', edgecolor = 'black')
```


![png]({{ site.baseurl }}/images/parking_citations/output_38_0.png)



<br> 

Removing February helps days’ number 29 and 30 close the previously visualized gap. Other than that, there isn't much of a difference. 

<br>

<br> 

### Citations by Hours

When visualizing the time a citation is issued, we can expect to see some big trends. Parking enforcement hours, typically sometime between 8am and 5pm, should see a huge surge in citations. The early morning hours should see barely any citations.

Let's see what kind of story the data tells us this time. 

<br>


```python
la_ticket_2017.hist('Issue time', range=(0, 2400), bins=200, color = 'forestgreen')
```


![png]({{ site.baseurl }}/images/parking_citations/output_41_0.png)



<br> 

This histogram has been binned into 200 columns. This means that each hour has a six, ten-minute columns, and there are several columns of space between the hours (there is no 10:70 AM). 

Like we predicted, there are very few citations issued at 5 AM. A massive spike of citations, from a total of 5000, to over 70,000 occurs early in the 8 o'clock hour. We'll have to take a closer look at this hour specifically. There's a lull of enforcement after that, and again a jump at 10 AM. 

It would appear that the parking officers get a bit lazy after lunch; citations issued drop by half, and steadily decline thereafter. 

<br>


```python
la_ticket_2017.hist('Issue time', range=(800, 859), bins=60, color = 'forestgreen')
```

![png]({{ site.baseurl }}/images/parking_citations/output_43_0.png)


<br> 

Nearly a 500% increase in citations issued between 8:04 AM and 8:05 AM. Perhaps that 4 minutes is the time it takes the official to track down their first victim after clocking in at 8:00 AM. Either way, it's handy information to have. 

It's also clear that citations group around the 5 minute interval, suggesting that officers have the ability to round the issue time, and sometimes utilize that liberty. I would have thought an electronic clock would time-stamp each citation, but apparently not. 

<br> 

<br> 

### Citations on Holidays

Finally, let's separate a number of specific days of the year, and see how many citations are issued on these days as compared to other, 'normal' days. I'm talking seeing if parking officers feel the holiday spirit, or do they play the part of the Grinch?


```python
# these are the holidays that came to my mind and their dates in 2017
holidays = pd.Series(['2017/01/01',
                      '2017/01/16',
                      '2017/02/14',
                      '2017/05/29',
                      '2017/07/04',
                      '2017/09/04',
                      '2017/10/31',
                      '2017/11/10',
                      '2017/11/23',
                      '2017/12/25'],
                     index = ['New Years Day',
                              'MLK Day',
                              'Valentines Day',
                              'Memorial Day',
                              'Independence Day',
                              'Labor Day',
                              'Halloween',
                              'Veterans Day',
                              'Thanksgiving',
                              'Christmas']
                    )

holidays
```


    New Year’s Day       2017/01/01
    MLK Day             2017/01/16
    Valentine’s Day      2017/02/14
    Memorial Day        2017/05/29
    Independence Day    2017/07/04
    Labor Day           2017/09/04
    Halloween           2017/10/31
    Veterans Day        2017/11/10
    Thanksgiving        2017/11/23
    Christmas           2017/12/25
    dtype: object




```python
# change the date format to day of the year for easy use
holidays_date = pd.to_datetime(holidays, format='%Y/%m/%d')
holidays_doy = holidays_date.dt.dayofyear
holidays_doy
```




    New Year’s Day        1
    MLK Day              16
    Valentine’s Day      45
    Memorial Day        149
    Independence Day    185
    Labor Day           247
    Halloween           304
    Veterans Day        314
    Thanksgiving        327
    Christmas           359
    dtype: int64



<br> 

After defining some holidays to consider, I'm going to count the number of tickets given on each of these days, and save the results to a new, 'holiday_tickets' Pandas DataFrame. 

<br>


```python
# create the empty dataframe, named after each holiday
holiday_tickets = pd.DataFrame(columns=['Number of Tickets'], index = holidays_doy.index)

# set a counter equal to zero
i = 0

# for each of the hoidays
while i <= len(holidays_doy) - 1:
    # sum the number of tickets given on that day and save the output to the new DataFrame
    holiday_tickets.iloc[i, ] = sum(la_ticket_2017['Day of Year'] == holidays_doy.iloc[i])
    # move to the next holiday
    i = i + 1
```

<br> 

If that worked correctly, this should give us a bar plot of how many tickets are given on each of the prescribed holidays. 

<br> 


```python
holiday_tickets.plot(kind = 'barh', color = 'slateblue').invert_yaxis()
```


![png]({{ site.baseurl }}/images/parking_citations/output_52_0.png)



<br>

Most holidays have far fewer tickets than the ~6000 citation daily average, That is with the exception of Halloween and Valentine’s day. I would assert that these are not federally recognized holidays, and therefore there is no change in enforcement. 

In fact, I don't believe that parking citation officers are feeling more lenient, they just get the day off! 

Here's the associated table. 

<br>


```python
holiday_tickets
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
      <th>Number of Tickets</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>New Years Day</th>
      <td>1115</td>
    </tr>
    <tr>
      <th>MLK Day</th>
      <td>1375</td>
    </tr>
    <tr>
      <th>Valentines Day</th>
      <td>7388</td>
    </tr>
    <tr>
      <th>Memorial Day</th>
      <td>1496</td>
    </tr>
    <tr>
      <th>Independence Day</th>
      <td>1445</td>
    </tr>
    <tr>
      <th>Labor Day</th>
      <td>1318</td>
    </tr>
    <tr>
      <th>Halloween</th>
      <td>7498</td>
    </tr>
    <tr>
      <th>Veterans Day</th>
      <td>1104</td>
    </tr>
    <tr>
      <th>Thanksgiving</th>
      <td>922</td>
    </tr>
    <tr>
      <th>Christmas</th>
      <td>893</td>
    </tr>
  </tbody>
</table>
</div>



<br> 

Christmas turns out to have less citations than any other holiday, is it the least cited day of the entire year?

<br> 


```python
ticket_by_day.min()
```




    893



<br> 

I guess even the parking Scrooges feel a little bit of Christmas spirit!

<br> 

### Conclusions

In conclusion, you should park in L.A. at 5 AM on Christmas Day, especially if it's a Sunday. If you park on a illegally on a Tuesday or Thursday at 8:20 AM or 12:10 PM, expect to pay! 

You should definitely double check the parking signs between 8 AM and 1 PM on the weekdays, and don't expect the citation officers to give you a break for Valentine’s Day!

There's so much information stored in date-time variables, I think that's what makes them so fun to work with. On the next segment of the L.A. Parking Citation Series, I'll be considering the spatial variables! Where are citations issued? Where are the most grievous parking meters located? 

Perhaps by combining the upcoming spatial analysis and this date-time information, you could piece together a devious plan to avoid those pesky parking citations!

Until next time, 

\- Fisher 

