// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads and is where you should call your functions.
$(document).ready(function(){
    const $display = $('#display');

    // TODO: Call your apply function(s) here
    applyFilterNoBackground(reddify);
    applyFilterNoBackground(increaseGreenByBlue);




    render($display, image);
});

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here
function applyFilter(filterFunction) {
    for (var i = 0; i < image.length; i++) {
        for (var j = 0; j < image[i].length; j++) {
            var rgbString = image[i][j];
            var rgbNumbers = rgbStringToArray(rgbString);
            filterFunction(rgbNumbers);
            rgbString = rgbArrayToString(rgbNumbers);
            image[i][j] = rgbString;
        }
    }
}

// TODO 6: Create the applyFilterNoBackground function
function applyFilterNoBackground(filterFunction) {
    for (var i = 0; i < image.length; i++) {
        for (var j = 0; j < image[i].length; j++) {
            var backgroundColor = image[0][0];
            var rgbString = image[i][j];
            var rgbNumbers = rgbStringToArray(rgbString);
            if (rgbString != backgroundColor) {
                filterFunction(rgbNumbers);
                rgbString = rgbArrayToString(rgbNumbers);
                image[i][j] = rgbString;
            }
        }
    }
}


// TODO 3 & 5: Create filter functions
function reddify(arr) {
    arr[RED] = 255;
}

function decreaseBlue(arr) {
    arr[BLUE] = keepInBounds(arr[BLUE] - 50);
}

function increaseGreenByBlue(arr) {
    arr[GREEN] = keepInBounds(arr[GREEN] + arr[BLUE]);
}

function keepInBounds(num) {
   return Math.min(255, Math.max(0, num));
}


// CHALLENGE code goes below here
