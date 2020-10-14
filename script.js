let data;
let lifeMax;
let lifeMin;
let incomeMax;
let incomeMin;

d3.csv('wealth-health-2014.csv', d3.autoType).then( data => {
    console.log('cities and data ', data)

    const svg = d3.select('.chart').append('svg')
        .attr('height', 500)
        .attr('width', 650)

    incomeMax = d3.max(data, d => d.Income)
    incomeMin = d3.min(data, d => d.Income)
    //console.log('income min = ', incomeMin, 'income max = ', incomeMax)

    lifeMax = d3.max(data, d => d.LifeExpectancy)
    lifeMin = d3.min(data, d => d.LifeExpectancy)

    incomeMax = d3.max(data, d => d.Income)
    incomeMin = d3.min(data, d => d.Income)


    const xScale = d3
        .scaleLinear()
        .domain([incomeMin, incomeMax])
        .range([0, 500])

    const yScale = d3
        .scaleLinear()
        .domain([lifeMin, lifeMax])
        .range([400,0])

    // scale so we can use population to determine size of circles
    const popScale = d3
        .scaleLinear()
        .domain(d3.extent(data, d => d.Population))
        .range([5, 20])


    let circles = svg.selectAll('.chart')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d=>xScale(d.Income))
        .attr('cy', d=>yScale(d.LifeExpectancy))
        .attr('r', d=>popScale(d.Population))
        .attr('fill', 'cadetblue')
        .attr('stroke', 'black')
        .attr('opacity', 0.80);



    const margin = ({top: 20, right: 20, bottom: 20, left: 20});
    const width = 650 - margin.left - margin.right;
    console.log('width ', width);
    const height = 500 - margin.top - margin.bottom;
    console.log('height ', height);

    const svg2 = d3.select(".chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
	.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const xAxis = d3.axisBottom()
        .scale(xScale);

    const yAxis = d3.axisLeft()
        .scale(yScale);

    svg2.append("g")
        .attr("class", "axis x-axis")
        .call(xAxis);

    }); 
