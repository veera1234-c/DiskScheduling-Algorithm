function ScanImplement()
{
    let inputNumbersString = document.getElementById('Queue_vals').value;
    inputNumbersString = inputNumbersString.trim();
    let inputNumbers = inputNumbersString.split(" ");
    let inputHeadPos = document.getElementById('pos_head').value;
    let inputPrevHeadPos = document.getElementById('prev_pos_head').value;
    var direction;

    for (let i = 0; i < inputNumbers.length; i++) {
        if (inputNumbers[i] == inputHeadPos) {
            inputNumbers.splice(i, 1);
        }
    }
    inputNumbers.unshift(inputHeadPos);

    inputNumbers = inputNumbers.filter(function(item, pos) {
        return inputNumbers.indexOf(item) == pos;
    });

    if(inputHeadPos > inputPrevHeadPos){
        direction = "right";
    }else{ 
        direction = "left";
    }

    let isValidInput = true; 

    if (inputHeadPos == "") {
        alert("Please enter current Head position");
        isValidInput = false;
    } else if (isNaN(inputHeadPos)) {
        alert("Only Numeric value allowed for current Head position !!!");
        isValidInput = false; 
    } else if (parseInt(inputHeadPos) < 0 || parseInt(inputHeadPos) > 200) {
        alert("Current Head position value must be in between 1-200");
        isValidInput = false;
    } else if (inputNumbersString == "") {
        alert("Numeric values required for Order Of Request Queue");
        isValidInput = false; 
    }
    else {
        var totalNumbers = inputNumbers.length;

        for (var i = 0; i < totalNumbers; i++) {

            if (isNaN(inputNumbers[i])) {
                alert("Order Of Request queue must only contain numbers");
                isValidInput = false;
            }

             else if (parseInt(inputNumbers[i]) < 0 || parseInt(inputNumbers[i]) > 200) {
                alert("Order of Request queue values must be in the range of 1-200");
                isValidInput = false;
            }
        }
    }

    if(isValidInput){
    if (direction === "right")
    {
        document.getElementById('dir').innerHTML = "The Direction of disk scheduler is in <b>Right Direction</b>";
        for (var a = 1; a < inputNumbers.length; a++)
        {
            document.getElementById('inputvalue').innerHTML +="Process Id of "+ a +" is : "+inputNumbers[a]+"<br/>";
        }

        var ctx = document.getElementById("AlgoGraph");
        var lineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: scanRight(inputNumbers, inputHeadPos),
                datasets: [
                    {
                        label: "Elevator SCAN or SCAN Algorithm",
                        data: seekAddressedRight,
                        lineTension: 0,
                        fill: false,
                        backgroundColor: "rgba(0,229,255, 0.8)",
                        borderColor: "rgba(0,229,255, 1)",
                        pointBackgroundColor: "rgba(0,229,255, 0.5)",
                        pointBorderColor: "#55bae7",
                        pointHoverBackgroundColor: "#55bae7",
                        pointHoverBorderColor: "#55bae7",
                        borderWidth: 3,
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Seek Sequence"
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Seek Count (upto Particular Point)",
                        }
                    }]
                }
            }
        });   
    }
    if(direction === "left")
    {
        document.getElementById('dir').innerHTML = "The Direction of disk scheduler is in <b>Left Direction</b>";
        for (var a = 1; a < inputNumbers.length; a++)
        {
            document.getElementById('inputvalue').innerHTML +="Process Id of "+ a +" is : "+inputNumbers[a]+"<br/>";
        }

        var ctx = document.getElementById("AlgoGraph");
        var lineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: scanLeft(inputNumbers, inputHeadPos),
                datasets: [
                    {
                        label: "Elevator SCAN or SCAN Algorithm",
                        data: seekAddressedLeft,
                        lineTension: 0,
                        fill: false,
                        backgroundColor: "rgba(0,229,255, 0.8)",
                        borderColor: "rgba(0,229,255, 1)",
                        pointBackgroundColor: "rgba(0,229,255, 0.5)",
                        pointBorderColor: "#55bae7",
                        pointHoverBackgroundColor: "#55bae7",
                        pointHoverBorderColor: "#55bae7",
                        borderWidth: 3,
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Seek Sequence"
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Seek Count (upto Particular Point)",
                        }
                    }]
                }
            }
        });   
    }
}
}
function showResult(count, seekSequence)
{
    var div1 = document.getElementById('SequenceOutput');
    var out = document.getElementById('detailOutput');
    var div2 = document.getElementById('SeekOutput');

    if (count == "") {
        div.innerHTML = "";
    }else{ 
        div1.innerHTML = "Seek Sequence: <b>[" + seekSequence + "]</b>";

        var total_seek = "Total Seek Time / (Total Seek Count)  = ";
        for(var i=1;i<seekSequence.length;i++){
            total_seek += "|" + seekSequence[i] + "-" + seekSequence[i-1]+ "|";
            if(i<seekSequence.length-1){
                total_seek = total_seek + "+";
            }
        }
        out.innerHTML = total_seek + " = " + count;

        div2.innerHTML = "Total Seek Count: <b>" + count + "<b><br><br>";
    }
}

var seekCountSequenceRight = [];
var seekAddressedRight = [];

function scanRight(Numbers, Head)
{
    var tempArray = [];
    var leftArray = [];
    var rightArray = [];
    var totalNumbers = Numbers.length;
    let head = document.getElementById('pos_head').value;

    rightArray.push(199);

    for (var i = 0; i < totalNumbers; i++)
    {
        Numbers[i] = parseInt(Numbers[i]);
    }

    for (var i = 0; i < totalNumbers; i++)
    {
        if (Numbers[i] < Head)
        {
            leftArray.push(Numbers[i]);
        }
        else
        {
            rightArray.push(Numbers[i]);
        }
    }
    leftArray.sort(function (a, b)
    {
        return a - b;
    })

    rightArray.sort(function (a, b)
    {
        return a - b;
    })

    var leftLength = leftArray.length;
    var rightLength = rightArray.length;
    var totalHeadMovements = 0;
    var distance = 0;
    
    for (var i = 0; i < rightLength; i++)
    {
        seekAddressedRight.push(rightArray[i]);
    }
    for (var i = leftLength - 1; i >= 0; i--)
    {
        seekAddressedRight.push(leftArray[i]);
    }

    var seekAddressedLength = seekAddressedRight.length;

    for (var i = 0; i < rightLength; i++)
    {
        var currentTrack = rightArray[i];
        distance = Math.abs(currentTrack - Head);
        totalHeadMovements += distance;
        seekCountSequenceRight.push(totalHeadMovements);
        Head = currentTrack;
    }
    for (var i = leftLength - 1; i >= 0; i--)
    {
        var currentTrack = leftArray[i];
        distance = Math.abs(currentTrack - Head);
        totalHeadMovements += distance;
        seekCountSequenceRight.push(totalHeadMovements);
        Head = currentTrack;
    }
    for (var i = 1; i < seekAddressedLength; i++)
    {
        if (seekAddressedRight[i] === 199)
        {
            continue;
        }
        tempArray.push(seekAddressedRight[i]);
    }
    tempArray.unshift(head);
    showResult(totalHeadMovements, tempArray);
    return seekCountSequenceRight;
}

var seekCountSequenceLeft = [];
var seekAddressedLeft = [];

function scanLeft(Numbers, Head)
{
    var tempArray = [];
    var leftArray = [];
    var rightArray = [];
    var totalNumbers = Numbers.length;
    let head = document.getElementById('pos_head').value;

    leftArray.push(0);

    for (var i = 0; i < totalNumbers; i++)
    {
        Numbers[i] = parseInt(Numbers[i]);
    }

    for (var i = 0; i < totalNumbers; i++)
    {
        if (Numbers[i] < Head)
        {
            leftArray.push(Numbers[i]);
        }
        if(Numbers[i] > Head)
        {
            rightArray.push(Numbers[i]);
        }
    }
    leftArray.sort(function (a, b)
    {
        return a - b;
    })

    rightArray.sort(function (a, b)
    {
        return a - b;
    })

    var leftLength = leftArray.length;
    var rightLength = rightArray.length;
    var totalHeadMovements = 0;
    var distance = 0;
    
    seekAddressedLeft.push(parseInt(Head));
    for (var i = leftLength - 1; i >= 0; i--)
    {
        seekAddressedLeft.push(leftArray[i]);
    }
    for (var i = 0; i < rightLength; i++)
    {
        seekAddressedLeft.push(rightArray[i]);
    }

    var seekAddressedLength = seekAddressedLeft.length;
    seekCountSequenceLeft.push(0);

    for (var i = leftLength - 1; i >= 0; i--)
    {
        var currentTrack = leftArray[i];
        distance = Math.abs(currentTrack - Head);
        totalHeadMovements += distance;
        seekCountSequenceLeft.push(totalHeadMovements);
        Head = currentTrack;
    }
    for (var i = 0; i < rightLength; i++)
    {
        var currentTrack = rightArray[i];
        distance = Math.abs(currentTrack - Head);
        totalHeadMovements += distance;
        seekCountSequenceLeft.push(totalHeadMovements);
        Head = currentTrack;
    }
    for (var i = 1; i < seekAddressedLength; i++)
    {
        if (seekAddressedLeft[i] === 0)
        {
            continue;
        }
        tempArray.push(seekAddressedLeft[i]);
    }
    tempArray.unshift(head);
    showResult(totalHeadMovements, tempArray);
    return seekCountSequenceLeft;
}