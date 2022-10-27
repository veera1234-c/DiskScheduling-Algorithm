function SSTFImplement() {
    var inputNumbersString = document.getElementById('Queue_vals').value;
    inputNumbersString = inputNumbersString.trim();
    var inputNumbers = inputNumbersString.split(" ");
    var inputHeadPos = document.getElementById('pos_head').value;

    for (var i = 0; i < inputNumbers.length; i++)
    {
        if (inputNumbers[i] == inputHeadPos)
        {
            inputNumbers.splice(i, 1);
        }
    }
    inputNumbers.unshift(inputHeadPos);

    inputNumbers = inputNumbers.filter(function (item, pos)
    {
        return inputNumbers.indexOf(item) == pos;
    });

    var isValidInput = true; 
    
    if (inputHeadPos == "") {
        alert("Current Head position is required");
        isValidInput = false;
    }

    else if (isNaN(inputHeadPos)) {
        alert("Only Numeric value allowed for current Head position !!!");
        isValidInput = false;
    }

    else if (parseInt(inputHeadPos) < 0) {
        alert("Current Head position must be positive integer");
        isValidInput = false;
    }

    else if (inputNumbersString == "") {
        alert("Numeric values required for Order of Queue Reuest");
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
        for (var a = 1; a < inputNumbers.length; a++)
        {
            document.getElementById('inputvalue').innerHTML +="Process Id of "+ a +" is : "+inputNumbers[a]+"<br/>";
        }
    
        var ctx = document.getElementById("AlgoGraph");
        var lineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: sstf(inputNumbers, inputHeadPos),
                datasets: [
                    {
                        label: "Shortest Seek Time First (SSTF) Algorithm",
                        data: seekAddressed,
                        lineTension: 0,
                        fill: false,
                        backgroundColor: "rgba(0,255,230, 0.8)",
                        borderColor: "rgba(0,255,230, 1)",
                        pointBackgroundColor: "rgba(0,255,230, 0.5)",
                        pointBorderColor: "#55bae7",
                        pointHoverBackgroundColor: "#55bae7",
                        pointHoverBorderColor: "#55bae7",
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

var seekCountSequence = [];
var seekAddressed = [];

function sstf(Numbers, Head)
{
    var tempArray = [];
    var visited = [];
    var totalNumbers = Numbers.length;
    var totalHeadMovements = 0;
    var distance = 0;
    var temp;

    for (var i = 0; i < totalNumbers; i++)
    {
        Numbers[i] = parseInt(Numbers[i]);
    }
    
    for (var i = 0; i < totalNumbers; i++)
    {
        visited.push(0);
    }
    temp = parseInt(Head);

    for (var i = 0; i < totalNumbers; i++)
    {
        var minValue = 1000000;
        var index;
        for (var j = 0; j < totalNumbers; j++)
        {
            if (Math.abs(temp - Numbers[j]) < minValue && (visited[j] === 0))
            {
                index = j;
                minValue = Math.abs(temp - Numbers[j]);
            }
        }
        totalHeadMovements += Math.abs(temp - Numbers[index]);
        seekCountSequence.push(totalHeadMovements);
        visited[index] = 1;
        temp = Numbers[index];
        seekAddressed.push(Numbers[index]);
    }
    for (var i = 0; i < totalNumbers; i++)
    {
        tempArray.push(seekAddressed[i]);
    }
    showResult(totalHeadMovements, tempArray);
    return seekCountSequence;
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