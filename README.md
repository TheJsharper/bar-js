# Bar-js
Lightweight, configurable and simple bar chart library in JavaScript
##Description
bar.js is a Canvas based simple JavaScript Bar Library to provide a configurable, lightweight and dependency-free experience.
![](https://img.shields.io/npm/dt/:packageName.svg)
![](https://github.com/TheJsharper/bar-js/blob/master/bar.PNG)

##Installation
Download the `bar.min.js` and include it in your project
```html
	<script src="dist/bar.min.js"> </script>
``` 
## Usage
To create the bar chart, you need a block level container like a div or p
```html
<div id="chart"> this will be our bar chart
		</div>
```
then you can create the barChart object in your JavaScript file

```js
var chart = new BarChart(targetId, canvasWidth, canvasHeight, data);
```
###Parameters
-`targetId - containerId(String)`
Defines the id of container like "chart"

-`canvasWidth - Integer`
Defines the width of the chart like 500

-`canvasHeight - Integer`
Defines the height of the chart like 400

-`Data - Object Array`
Defines the data objects The objects should have 2 key-value pairs:label and value. Example

```js
var data = [{
		label: "Jan",
		value: 56
	}, {
		label: "Feb",
		value: 11
	}, {
		label: "March",
		value:125
	}, {
		label: "April",
		value: 892
	}, {
		label: "May",
		value: 65
	},
];
```

##Licence
MIT Licence
https://github.com/TheJsharper/