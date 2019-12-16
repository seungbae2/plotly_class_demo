
var selBox = d3.select("#selDataset");
var meta = d3.select("#sample-metadata");
var samples = [];
var metaData = [];
d3.json("samples.json").then(function(data){
    console.log(data);
    var names = data.names;
    names.forEach(name => selBox.append("option").attr("value",name).text(name));
    samples = data.samples;
    metaData = data.metadata;

    const firstSample = names[0];
    console.log(firstSample) 
    optionChanged(firstSample); 
});


function optionChanged(id){
    var selectData = samples.filter(data => data.id === id);
    var selectMeta = metaData.filter(function(data){
        return data.id === parseInt(id) ;
    });

    console.log(selectMeta);
    // meta.remove();
    meta.html("");
    meta.append("p").text(`id: ${selectMeta[0].id}`);
    meta.append("p").text(`ethnicity: ${selectMeta[0].ethnicity}`);
    meta.append("p").text(`gender: ${selectMeta[0].gender}`);
    meta.append("p").text(`age: ${selectMeta[0].age}`);
    meta.append("p").text(`location: ${selectMeta[0].location}`);
    meta.append("p").text(`bbtype: ${selectMeta[0].bbtype}`);
    meta.append("p").text(`wfreq: ${selectMeta[0].wfreq}`);
    
    var trace = {
        x: selectData[0].sample_values.slice(0,10).reverse(),
        y: selectData[0].otu_ids.slice(0,10).map(id => "OTU "+id).reverse(),
        type: "bar",
        orientation: 'h',
        text: selectData[0].otu_labels.slice(0,10).reverse()
    };

    var data = [trace];

    Plotly.newPlot('bar', data);

    var trace2 = {
        x: selectData[0].otu_ids,
        y: selectData[0].sample_values,
        marker: {
            size: selectData[0].sample_values
        },
        mode: "markers",
        xaxis: "OTU ID"
    };

    var layout2 ={
        xaxis :{
            title: "OUT ID"
        }
    };

    var data2 = [trace2];
    
    Plotly.newPlot('bubble', data2, layout2);


    var trace3 = {
        domain: {x: [0,9], y: [0,9]},
        value: selectMeta[0].wfreq,
        title: {text: "Belly Button Washing Frequency"},
        type:"indicator",
        mode: "gauge+number",
        gauge: {
            axis: { range: [null, 9] },
            steps: [
              { range: [0, 5], color: "lightgray" },
              { range: [6, 9], color: "gray" }
            ],
            threshold: {
              line: { color: "red", width: 4 },
              thickness: 0.75,
              value: selectMeta[0].wfreq
            }
        }
    };

    var data3 = [trace3];
    Plotly.newPlot('gauge',data3);

}