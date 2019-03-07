/**
 *bar.js
 *simple, elegant bart chart library 07.03.2017 - version 1.0 https://github.com/TheJsharper/bar-js
 *copyrigth 2019  Pedro Salomon
 *Released under the MIT Licence
 *https://github.com/TheJsharper/bar-js/blob/master/LICENCE.md
 */

"use-strict";

function BarChart(targetId, width, height, data) {

	//Base
	var chart = this;

	// Specify Configurations

	chart.configurationChart(targetId, width, height, data);

	//Pre Operations
	chart.performaceOperations();

	//Draw Chart
	chart.drawChart();

}

BarChart.prototype.configurationChart = function (targetId, width, height, data) {
	//Base
	var chart = this;
	// Chart Specifications
	chart.setCanvasParameters(targetId, width, height, data);

	chart.setChartParameters();

};

BarChart.prototype.setCanvasParameters = function (targetId, width, height, data) {
	//Base
	var chart = this;
	//Canvas Specifications come from outside
	chart.id = targetId;
	chart.width = width;
	chart.height = height;
	chart.data = data;

};

BarChart.prototype.setChartParameters = function () {
	//Base
	var chart = this;

	//Axe Configurations
	chart.axisRadio = 10;
	chart.verticalMargin = (chart.height * chart.axisRadio) / 100;
	chart.horizontalMargin = (chart.width * chart.axisRadio) / 100;
	chart.axisColor = "#b1b1b1";
	chart.axisWidth = 0.75;

	// Label Configurations
	chart.fontRadio = 3;
	chart.fontFamily = "times";
	chart.fontStyle = "normal";
	chart.fontWeight = "300";
	chart.fontColor = "#666";
	chart.verticalFontSize = (chart.height * chart.fontRadio) / 100;
	chart.horizontalFontSize = (chart.width * chart.fontRadio) / 100;

	// Guideline Configurations
	chart.guidelineColor = "#e5e5e5";
	chart.guidelineWidth = 0.5;
};

BarChart.prototype.performaceOperations = function () {
	//Base
	var chart = this;
	chart.createCanvas();

	// get data
	chart.handleData();

	// Prepare data

	chart.prepareData();

};

BarChart.prototype.createCanvas = function () {
	//Base
	var chart = this;
	var canvas = document.createElement('canvas');
	canvas.id = chart.id + "-" + Math.random();
	canvas.width = chart.width;
	canvas.height = chart.height;
	document.getElementById(chart.id).innerHTML = "";
	document.getElementById(chart.id).appendChild(canvas);
	chart.canvas = canvas;
	chart.context = canvas.getContext('2d');
};

BarChart.prototype.handleData = function () {
	//Base
	var chart = this;

	chart.labels = [];
	chart.values = [];

	// Handle Data

	chart.data.forEach(function (item) {
		chart.labels.push(item.label);
		chart.values.push(item.value);
	});

};

BarChart.prototype.prepareData = function () {
	//Base
	var chart = this;

	//Global Variables
	chart.itemsNum = chart.data.length;
	chart.maxValue = Math.max.apply(null, chart.values);
	chart.minValue = Math.min.apply(null, chart.values);

	//Axe Specifications

	chart.verticalAxisWidth = chart.height - 2 * chart.verticalMargin; // bottom and top margins
	chart.horizonatlAxisWidth = chart.width - 2 * chart.horizontalMargin; // left and right margins

	//Label Specifications

	chart.verticalUpperBound = Math.ceil(chart.maxValue / 10);
	chart.verticalLabelFreq = chart.verticalUpperBound / chart.itemsNum;
	chart.horizonatlLabelFreq = chart.horizonatlAxisWidth / chart.itemsNum;

};

BarChart.prototype.drawChart = function () {
	//Base
	var chart = this;

	//Vertical axis
	chart.drawVerticalAxis();

	//Vertical Label
	chart.drawVerticalLabel();

	//Horizontal axis
	chart.drawHorizontalAxis();

	//Horizontal Label
	chart.drawHorizontalLabel();

	//Horizontal Guidelines

	chart.drawHorizontalGuidelines();

	//Vertical Guideline

	chart.drawVerticalGuidelines();

	//Bars

	chart.drawBars();

};

BarChart.prototype.drawVerticalAxis = function () {
	//Base
	var chart = this;

	chart.context.beginPath();
	chart.context.strokeStyke = chart.axisColor;
	chart.context.lineWidth = chart.axisWidth;
	chart.context.moveTo(chart.horizontalMargin, chart.verticalMargin);
	chart.context.lineTo(chart.horizontalMargin, chart.height - chart.verticalMargin);
	chart.context.stroke();

};

BarChart.prototype.drawHorizontalAxis = function () {
	//Base
	var chart = this;

	chart.context.beginPath();
	chart.context.strokeStyke = chart.axisColor;
	chart.context.lineWidth = chart.axisWidth;
	chart.context.moveTo(chart.horizontalMargin, chart.height - chart.verticalMargin);
	chart.context.lineTo(chart.width - chart.horizontalMargin, chart.height - chart.verticalMargin);
	chart.context.stroke();
};

BarChart.prototype.drawVerticalLabel = function () {

	//Base
	var chart = this;

	// Text Specifications

	var labelFont = chart.fontStyle + ' ' + chart.fontWeight + ' ' + chart.verticalFontSize + 'px ' + chart.fontFamily;
	chart.context.font = labelFont;
	chart.context.textAlign = 'right';
	chart.context.fillStyle = chart.fontColor;

	//Scale Values

	var scaledVerticalLabelFreq = (chart.verticalAxisWidth / chart.verticalUpperBound) * chart.verticalLabelFreq;

	//Draw Labels

	for (var i = 0; i <= chart.itemsNum; i++) {
		var labelText = chart.verticalUpperBound - i * chart.verticalLabelFreq;
		var verticalLabelX = chart.horizontalMargin - chart.horizontalMargin / chart.axisRadio;
		var verticalLabelY = chart.verticalMargin + i * scaledVerticalLabelFreq;
		chart.context.fillText(labelText, verticalLabelX, verticalLabelY);
	}
};

BarChart.prototype.drawHorizontalLabel = function () {
	//Base
	var chart = this;

	var labelFont = chart.fontStyle + ' ' + chart.fontWeight + ' ' + chart.verticalFontSize + 'px ' + chart.fontFamily;
	chart.context.font = labelFont;
	chart.context.textAlign = 'center';
	chart.context.textBaseline = 'top';
	chart.context.fillStyle = chart.fontColor;

	//Draw Labels

	for (var i = 0; i < chart.itemsNum; i++) {
		var horizontalLabelX = chart.horizontalMargin + i * chart.horizonatlLabelFreq + chart.horizonatlLabelFreq / 2;
		var horizontalLabelY = chart.height - chart.verticalMargin + chart.verticalMargin / chart.axisRadio;
		chart.context.fillText(chart.labels[i], horizontalLabelX, horizontalLabelY);
		//chart.context.stroke();
	}

};

BarChart.prototype.drawHorizontalGuidelines = function () {

	//Base
	var chart = this;

	// Text Specifications

	chart.context.fillStyle = chart.guidelineColor;
	chart.context.lineWidth = chart.guidelineWidth;

	//Scale Values

	var scaledVerticalLabelFreq = (chart.verticalAxisWidth / chart.verticalUpperBound) * chart.verticalLabelFreq;

	//Draw Labels

	for (var i = 0; i < chart.itemsNum; i++) {

		var horizontalGuidelineStartX = chart.horizontalMargin;
		var horizontalGuidelineStartY = chart.verticalMargin + i * scaledVerticalLabelFreq;

		var horizontalGuidelineEndX = chart.horizontalMargin + chart.horizonatlAxisWidth;
		var horizontalGuidelineEndY = chart.verticalMargin + i * scaledVerticalLabelFreq;
		chart.context.beginPath();
		chart.context.moveTo(horizontalGuidelineStartX, horizontalGuidelineStartY);
		chart.context.lineTo(horizontalGuidelineEndX, horizontalGuidelineEndY);
		chart.context.stroke();
	}
};

BarChart.prototype.drawVerticalGuidelines = function () {

	//Base
	var chart = this;

	chart.context.strokeStyke = chart.guidelineColor;
	chart.context.lineWidth = chart.guidelineWidth;

	for (var i = 0; i <= chart.itemsNum; i++) {
		var verticalGuidelineStartX = chart.horizontalMargin + i * chart.horizonatlLabelFreq;
		var verticalGuidelineStartY = chart.height - chart.verticalMargin;

		var verticalGuidelineEndX = chart.horizontalMargin + i * chart.horizonatlLabelFreq;
		var verticalGuidelineEndY = chart.verticalMargin;

		chart.context.beginPath();
		chart.context.moveTo(verticalGuidelineStartX, verticalGuidelineStartY);
		chart.context.lineTo(verticalGuidelineEndX, verticalGuidelineEndY);
		chart.context.stroke();
	}

};

BarChart.prototype.drawBars = function () {
	//Base
	var chart = this;

	for (var i = 0; i < chart.itemsNum; i++) {
		var colors = chart.createRandomRGBColor();
		var filOpacity = "0.3";
		var fillColor = "rgba(" + colors.r + "," + colors.g + "," + colors.b + "," + filOpacity + ")";
		var borderColor = "rgba(" + colors.r + "," + colors.g + "," + colors.b + ")";
		chart.context.beginPath();
		chart.context.fillStyle = fillColor;
		chart.context.strokeStyke = borderColor;

		var barX = chart.horizontalMargin + i * chart.horizonatlLabelFreq + chart.horizonatlLabelFreq / chart.axisRadio;
		var barY = chart.height - chart.verticalMargin;

		var barWidth = chart.horizonatlLabelFreq - 2 * chart.horizonatlLabelFreq / chart.axisRadio;
		var barHeight = -1 * chart.verticalAxisWidth * chart.values[i] / chart.maxValue;

		chart.context.rect(barX, barY, barWidth, barHeight);
		chart.context.stroke();
		chart.context.fill();
	}

};

BarChart.prototype.createRandomRGBColor = function () {
	var red = getRandomInt(0, 257);
	var green = getRandomInt(0, 257);
	var blue = getRandomInt(0, 257);

	return {
		r: red,
		g: green,
		b: blue
	};
};

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
