// --- LOGICA SEMPLIFICATA CON DATASET INTEGRATO ---

// Dataset integrato direttamente nel file
const dataset = [
  { "id": 1, "var1": 30, "var2": 90, "var3": 110, "var4": 240, "var5": 280, "var6": 350 },
  { "id": 2, "var1": 90, "var2": 15, "var3": 180, "var4": 150, "var5": 380, "var6": 210 },
  { "id": 3, "var1": 30, "var2": 50, "var3": 250, "var4": 200, "var5": 300, "var6": 300 },
  { "id": 4, "var1": 10, "var2": 95, "var3": 280, "var4": 80, "var5": 250, "var6": 400 },
  { "id": 5, "var1": 75, "var2": 30, "var3": 140, "var4": 290, "var5": 350, "var6": 220 },
  { "id": 6, "var1": 25, "var2": 70, "var3": 210, "var4": 110, "var5": 290, "var6": 380 },
  { "id": 7, "var1": 60, "var2": 90, "var3": 90, "var4": 260, "var5": 410, "var6": 250 },
  { "id": 8, "var1": 85, "var2": 40, "var3": 290, "var4": 130, "var5": 220, "var6": 390 },
  { "id": 9, "var1": 10, "var2": 15, "var3": 130, "var4": 270, "var5": 330, "var6": 280 },
  { "id": 10, "var1": 100, "var2": 20, "var3": 300, "var4": 70, "var5": 400, "var6": 330 }
];

// Inizializzazione delle variabili globali
let currentConfig = 0;
const configs = [
    { xVar: 'var1', yVar: 'var2', color: '#ff5252', name: 'Variabili 1 e 2', xLabel: 'V1', yLabel: 'V2' },
    { xVar: 'var3', yVar: 'var4', color: '#4dffb8', name: 'Variabili 3 e 4', xLabel: 'V3', yLabel: 'V4' },
    { xVar: 'var5', yVar: 'var6', color: '#ffcc00', name: 'Variabili 5 e 6', xLabel: 'V5', yLabel: 'V6' }
];

// Impostazioni del grafico e dell'SVG
const chartNode = d3.select('#chart').node();
let width = chartNode.clientWidth;
let height = chartNode.clientHeight;
const margin = { top: 50, right: 50, bottom: 80, left: 80 };
let innerWidth = width - margin.left - margin.right;
let innerHeight = height - margin.top - margin.bottom;

const svg = d3.select('#chart')
    .append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

const tooltip = d3.select(".tooltip");
const gridXG = svg.append("g").attr("class", "grid x-grid");
const gridYG = svg.append("g").attr("class", "grid y-grid");
const axisXG = svg.append("g").attr("class", "axis x-axis");
const axisYG = svg.append("g").attr("class", "axis y-axis");


// Scale D3
let xScale = d3.scaleLinear().range([0, innerWidth]);
let yScale = d3.scaleLinear().range([innerHeight, 0]);

// Funzione per aggiornare il dominio delle scale
function updateScales() {
    const config = configs[currentConfig];
    const xValues = dataset.map(d => d[config.xVar]);
    const yValues = dataset.map(d => d[config.yVar]);
    const xPadding = (d3.max(xValues) - d3.min(xValues)) * 0.15 || 10;
    const yPadding = (d3.max(yValues) - d3.min(yValues)) * 0.15 || 10;
    xScale.domain([d3.min(xValues) - xPadding, d3.max(xValues) + xPadding]).nice();
    yScale.domain([d3.min(yValues) - yPadding, d3.max(yValues) + yPadding]).nice();
}

// Funzione per disegnare assi e griglia con transizione
function updateAxesAndGrid(withTransition = true) {
    const config = configs[currentConfig];
    const t = withTransition ? svg.transition().duration(1500).ease(d3.easeCubicInOut) : null;

    const xAxis = d3.axisBottom(xScale).ticks(6);
    const yAxis = d3.axisLeft(yScale).ticks(6);
    const xGrid = d3.axisBottom(xScale).tickSize(-innerHeight).tickFormat("");
    const yGrid = d3.axisLeft(yScale).tickSize(-innerWidth).tickFormat("");

    axisXG.attr("transform", `translate(0, ${innerHeight})`);
    
    if (t) {
        axisXG.transition(t).call(xAxis);
        axisYG.transition(t).call(yAxis);
        gridXG.attr("transform", `translate(0, ${innerHeight})`).transition(t).call(xGrid);
        gridYG.transition(t).call(yGrid);
    } else {
        axisXG.call(xAxis);
        axisYG.call(yAxis);
        gridXG.attr("transform", `translate(0, ${innerHeight})`).call(xGrid);
        gridYG.call(yGrid);
    }
    
    svg.selectAll(".axis-label").remove();
    svg.append('text').attr('class', 'axis-label').attr('x', innerWidth / 2).attr('y', innerHeight + 50).attr('text-anchor', 'middle').text(config.xLabel);
    svg.append('text').attr('class', 'axis-label').attr('transform', 'rotate(-90)').attr('x', -innerHeight / 2).attr('y', -60).attr('text-anchor', 'middle').text(config.yLabel);
}

// Funzione per disegnare la silhouette di una mosca
function drawFly(g, color, id) {
    g.append('ellipse')
        .attr('rx', 12)
        .attr('ry', 8)
        .attr('fill', color)
        .attr('stroke', '#000');
    g.append('circle')
        .attr('cx', -15).attr('cy', 0).attr('r', 5)
        .attr('fill', color).attr('stroke', '#000');
    g.append('path')
        .attr('d', 'M0,-6 Q12,-18 18,-6 Q12,0 0,-6')
        .attr('fill', color).attr('fill-opacity', 0.7).attr('stroke', '#000');
    g.append('path')
        .attr('d', 'M0,6 Q12,18 18,6 Q12,0 0,6')
        .attr('fill', color).attr('fill-opacity', 0.7).attr('stroke', '#000');
    g.append('circle')
        .attr('cx', -17).attr('cy', -2).attr('r', 2).attr('fill', '#fff');
    g.append('circle')
        .attr('cx', -17).attr('cy', 2).attr('r', 2).attr('fill', '#fff');
    g.append('text')
        .attr('class', 'fly-id').attr('x', 15).attr('y', -10).text(id);
}

// Funzione principale per disegnare e animare le mosche
function drawFlies() {
    const config = configs[currentConfig];
    d3.select('.current-config').text(config.name);

    const flies = svg.selectAll('.fly').data(dataset, d => d.id);

    flies.exit().remove();

    const newFlies = flies.enter()
        .append('g')
        .attr('class', 'fly')
        .attr('transform', d => `translate(${xScale(d[config.xVar])}, ${yScale(d[config.yVar])})`)
        .each(function(d) {
            drawFly(d3.select(this), config.color, d.id);
        });

    const mergedFlies = newFlies.merge(flies);

    mergedFlies.transition("move")
        .duration(1500)
        .ease(d3.easeCubicInOut)
        .attr('transform', d => `translate(${xScale(d[config.xVar])}, ${yScale(d[config.yVar])})`);

    mergedFlies.selectAll('ellipse, path, circle:not([fill="#fff"])')
        .transition("color")
        .duration(1500)
        .ease(d3.easeCubicInOut)
        .attr('fill', config.color);

    mergedFlies.selectAll('.fly-id').text(d => d.id);

    mergedFlies
        .on('mouseover', function(event, d) {
            tooltip.transition().duration(200).style("opacity", 1);
            tooltip.html(`<strong>Mosca ID: ${d.id}</strong><br/>V1: ${d.var1}, V2: ${d.var2}<br/>V3: ${d.var3}, V4: ${d.var4}<br/>V5: ${d.var5}, V6: ${d.var6}`)
                .style("left", (event.pageX + 15) + "px").style("top", (event.pageY - 28) + "px");
        })
        .on('mouseout', function() {
            tooltip.transition().duration(500).style("opacity", 0);
        })
        .on('click', handleClick);
}

// Gestore per il click su una mosca
function handleClick() {
    currentConfig = (currentConfig + 1) % 3;
    updateScales();
    updateAxesAndGrid(true);
    drawFlies();
}

// Funzione per popolare la tabella con i dati
function populateDataTable() {
    const tbody = d3.select('#data-body');
    tbody.selectAll('tr').remove();
    dataset.forEach(d => {
        const row = tbody.append('tr');
        Object.values(d).forEach(val => {
            row.append('td').text(val);
        });
    });
}

// Funzione di inizializzazione e aggiornamento
function runVisualization() {
    width = chartNode.clientWidth;
    height = chartNode.clientHeight;
    innerWidth = width - margin.left - margin.right;
    innerHeight = height - margin.top - margin.bottom;
    d3.select(svg.node().parentNode).attr('viewBox', `0 0 ${width} ${height}`);
    xScale.range([0, innerWidth]);
    yScale.range([innerHeight, 0]);

    updateScales();
    updateAxesAndGrid(false);
    drawFlies();
    populateDataTable();
}

// --- AVVIO DELL'APPLICAZIONE ---
runVisualization(); 
window.addEventListener('resize', runVisualization);
