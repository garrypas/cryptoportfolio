"use strict";

function getBlanks(data, blankIndex, interval) {
	var start = data[blankIndex];
	if(!start) throw 'getBlanks requires a valid first item';
	var end = data[blankIndex + 1];
	if(!end) throw 'getBlanks requires a valid second item';
	
	var time = start.__TDate + interval;

	var newBlank;
	var blanks = [];

	while(time < end.__TDate) {
		newBlank = {};
		Object.assign(newBlank, start);
		newBlank.__TDate = time;
		newBlank.V = 0;
	    newBlank.BV = 0;
		
		blanks.push(newBlank);
		
		time += interval;
	}

	return blanks;
}

/**
 * If there is missing data, the data is filled with the nearest previous item
 * @param {*} fileData the data to fill holes
 * @param {number} interval an interval in minutes 
 */
export default function (fileData, interval) {
    interval = interval * 60000;
	if(fileData instanceof Array !== true) {
		throw 'The first argument passed to FillHoles must be of type Array';
	}
    const _fileData = fileData.slice();
    for(let i = 0; i < _fileData.length; i++) {
        _fileData[i] = { ...fileData[i] };
        let dateStr = _fileData[i].T;
        if(_fileData[i].T.indexOf("Z") === -1) {
            dateStr = `${dateStr}Z`;
        }
        _fileData[i].__TDate = Date.parse(dateStr);
    }
	var lastTime = _fileData[0].__TDate;
	for(var x = 1; x < _fileData.length; x++) {
		var thisTime = _fileData[x].__TDate;
		if(thisTime - interval !== lastTime) {
			var blanks = getBlanks(_fileData, x - 1, interval);
			
			var args = [x, 0].concat(blanks);
			Array.prototype.splice.apply(_fileData, args);

			// No need to check the blanks
			x += blanks.length;
		}
        lastTime = thisTime;
	}

    for(let i = 0; i < _fileData.length; i++) {
        _fileData[i].T = new Date(_fileData[i].__TDate).toISOString().replace('.000Z', '');
        delete _fileData[i].__TDate;
    }

	return _fileData;
}
