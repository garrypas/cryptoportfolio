"use strict";

const _ = require('lodash');
/**
 * dataSets is an array of mapped data. Returned is a single object that is the aggregated
 * data for the data sets given
 */
module.exports = {

	aggregate: dataSets => {
		const xAxis = _.maxBy(dataSets, dataSet => dataSet.historyData.length);
		const historyDataLength = xAxis.historyData.length// dataSets[0] && dataSets[0].historyData.length || 0;
		let historyData = [];
		for(let i = 0; i < historyDataLength; i++) {
			let yVals = [];
			for(let j = 0; j < dataSets.length; j++) {
				let offset = historyDataLength - dataSets[j].historyData.length;
				if(i - offset < 0) continue;
				yVals.push(dataSets[j].historyData[i - offset].y)
			}

			historyData.push({
				x: xAxis.historyData[i].x,
				y: _.mean(yVals),
			});
		}

		return {
			high: _.mean(dataSets.map(item => item.high)),
			low: _.mean(dataSets.map(item => item.low)),
			volume: _.mean(dataSets.map(item => item.volume)),
			historyData,
		};
	}
};