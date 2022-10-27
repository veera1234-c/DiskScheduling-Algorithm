function FCFSAlgo1(values, Head)
{
    var temp = [];
    var CountSequence = [];
    var numbersLen = values.length;
    var head_move = 0;
    var distance = 0;

    for (var a = 0; a<numbersLen; a++)
    {
        values[a] = parseInt(values[a]);
    }

    for (var a = 0; a<numbersLen; a++)
    {
        var track = values[a];
        distance = Math.abs(track - Head);
        head_move += distance;
        CountSequence.push(head_move);
        Head = track;
    }
    for (var a = 0; a < numbersLen; a++)
    {
        temp.push(values[a]);
    }
    Result(head_move, temp);
    return CountSequence;
}

function fcfsImplement()
{
    
    var Queue_values = document.getElementById('Queue_vals').value;
    Queue_values = Queue_values.trim();
    var Queue_vals = Queue_values.split(" ");
    var Head_position = document.getElementById('pos_head').value;

    for (var a = 0; a < Queue_vals.length; a++)
        {
            if (Queue_vals[a] == Head_position)
            {
                Queue_vals.splice(a, 1);
            }
        }
    Queue_vals.unshift(Head_position);

    Queue_vals = Queue_vals.filter(function (item, pos)
    {
        return Queue_vals.indexOf(item) == pos;
    });

    var isValidInput = true; 

    if ( Head_position== "") {
        alert("Current Head position is required");
        isValidInput = false;
    }

    else if (isNaN(Head_position)) {
        alert("Only Numeric value allowed for current Head position !!!");
        isValidInput = false;
    }

    else if (parseInt(Head_position) < 0) {
        alert("Current Head position must be positive integer");
        isValidInput = false;
    }

    else if (Queue_values == "") {
        alert("Numeric values required for Order of Queue Reuest");
        isValidInput = false;
    }
    else {
        var totalNumbers = Queue_vals.length;

        for (var i = 0; i < totalNumbers; i++) {

            if (isNaN(Queue_vals[i])) {
                alert("Number queue must only contain numbers");
                isValidInput = false;
            }

             else if (parseInt(Queue_vals[i]) < 0 || parseInt(Queue_vals[i]) > 200) {
                alert("Number queue values must be in the range of 1-200");
                isValidInput = false;
            }
        }
    }

    if(isValidInput){
        for (var a = 1; a < Queue_vals.length; a++)
        {
            
            document.getElementById('inputvalue').innerHTML +="Process Id of "+ a +" is : "+Queue_vals[a]+"<br/>";
        }

        var grf = document.getElementById("AlgoGraph");
        var AlgoGraph = new Chart(grf, {
            type: 'line',
            data: {
                labels: FCFSAlgo1(Queue_vals, Head_position),
                datasets: [
                    {
                        backgroundColor: "rgba(1,1,1,0.8)",
                        borderColor: "rgba(0,0,0,0.3)",
                        data: Queue_vals,
                        lineTension: 0,
                        fill: false,
                        label: "FCFS Algorithm"
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display:true,
                            labelString: "Seek Sequence"
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display:true,
                            labelString: "Seek Count (upto Particular Point)",
                        }
                    }]
                }
            }
        });
    }
}

function Result(count, seekSequence)
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