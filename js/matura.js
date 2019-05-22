jQuery.ajaxSetup({ cache: false });
var database = {};
var selectedsubject = undefined;
loadData();

window.addEventListener('beforeunload', (event) => {
    event.preventDefault();
    event.returnValue = '';
});

$('#subjects').on('change', function() {
    var hash = this.value;
    if(hash!==undefined)
    {
        selectedsubject = hash;
        $("#subjectwrapper").html("<h2>Fach: "+database.subjects[hash]+"</h2>");
        $("#buttonwrapper").fadeIn();
    }
});

function ziehung()
{
    $("#ziehungbutton").fadeOut();
    var subj = selectedsubject;
    var topics = database[subj].topics;
    console.log(Object.keys(topics).length);
    var r1 = (Math.floor(Math.random()*Object.keys(topics).length)+1);
    var r2 = (Math.floor(Math.random()*Object.keys(topics).length)+1);
    var topic1 = topics[r1];
    var topic2 = topics[r2];
    console.log("Topic1 ("+r1+"): "+topic1);
    console.log("Topic2 ("+r2+"): "+topic2);
    while(r2==r1)
    {
        r2 = (Math.floor(Math.random()*Object.keys(topics).length)+1);
        topic2 = topics[r2];
        console.log("oops, topic2 == topic1. Reshuffling. Topic2: ("+r2+") "+topic2);
    }

    $("#output").html("<h2>Gezogene Themen:</h2> <h3><ol><li id='topic1'>Thema "+r1+": "+topic1+"</li><li id='topic2'>Thema "+r2+": "+topic2+"</li></ol></h3>")

    var el = document.getElementById("topic1");
    var text = new ShuffleText(el);
    text.duration = 800;
    text.start();

    var el = document.getElementById("topic2");
    var text = new ShuffleText(el);
    text.duration = 900;
    text.start();

}

function loadData()
{
    $.get("data/database.json",function(data){
        database = data;
        makeSelectBox(data.subjects);
    },"json");
}

function makeSelectBox(subjects)
{
    for (var key in subjects)
    {
        $('#subjects').append($('<option>', {value:key, text:subjects[key]}));
    }

}