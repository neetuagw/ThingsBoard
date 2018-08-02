## Limitations with ThingsBoard ##

* Alerts can't be displayed directly on the Dashboard. Customer can receive Alerts via email or they can access them within the Devices 
* Can't plot two different axis on same Chart in ThingsBoard
* Only a Data Collection and Visualisation Platform, doesn't provide Analytics Feature.
* To save a historical data, the Date has to be passed in Timestamp Epox Unix format with Data elements, see below:
```
#!csv

{
      "ts":1485795600000,
      "values":{
         "FFR":18,
         "capacity_market":12,
         "revenue":6009.75,
         "response_energy":13.5
      }
   }
```
* Thingsboard does support Date picker feature but not in true manner. We can't filter the data on Monthly or Yearly seletion. 

> ![TB_Date picker_Historical.png](https://bitbucket.org/repo/yp7q55b/images/3937669849-TB_Date%20picker_Historical.png)

* Date Picker will only works on the Widgets with Timeseries or Dynamic data features like Line or Bar Charts. We can't apply the Date picker on Pie Chart
* To make the customisation in the Logo or the Color Scheme, we have to first edit the Source files and rebuild the TB application
