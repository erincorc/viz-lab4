let data;
let lifeMax;
let lifeMin;
let incomeMax;
let incomeMin;

const margin = ({top: 20, right: 20, bottom: 20, left: 20});
const width = 650 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

d3.csv('wealth-health-2014.csv', d3.autoType).then( data => {
    console.log('cities and data ', data)

    const svg = d3.select(".chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
	    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    

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
        .range([0, width])

    const yScale = d3
        .scaleLinear()
        .domain([lifeMin, lifeMax])
        .range([height,0])

    // scale so we can use population to determine size of circles
    const popScale = d3
        .scaleLinear()
        .domain(d3.extent(data, d => d.Population))
        .range([5, 20])


    const colors =  d3.scaleOrdinal(d3.schemeTableau10)

    let circles = svg.selectAll('.chart')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d=>xScale(d.Income))
        .attr('cy', d=>yScale(d.LifeExpectancy))
        .attr('r', d=>popScale(d.Population))
        .attr('fill', d => colors(d.Region))
        .attr('stroke', 'black')
        .attr('opacity', 0.80)

  
   

    const xAxis = d3.axisBottom()
        .scale(xScale)
        .ticks(5, "s")
    
    const yAxis = d3.axisLeft()
        .scale(yScale)
        .ticks(10, "s")

    svg.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis)
    
    svg.append("g")
        .attr("class", "axis y-axis")
        .call(yAxis)

    // x axis label
    svg.append('text')
        .attr('x', 550)
        .attr('y', 455)
        .text("Income")
    
    svg.append('text')
        .attr("class", "y-axis-label")
        .attr('x', 15)
        .attr('y', 0)
        .text("Life Expectancy")

    /*
    let regions = new Set()
    regions.add(data.Regions)
    console.log(regions)

    
    const colorScale = d3  
        .scaleOrdinal()
        .domain(['Sub-Saharan Africa', 'East Asia & Pacific', 'Middle East & North Africa', 'America', 'Europe & Central Asia', 'South Asia'])
        .range(d3.schemeTableau10)
    */
    
    let tip = d3.selectAll('circle')
        .on("mouseenter", (event, d) => {
            // show tooltip
            let country = d;
            const pos = d3.pointer(event, window); 
            console.log(pos)
            console.log(d)
            let form1 = d3.format(',.4r') // format population
            let form2 = d3.format("$,.3r") // format income
            let form3 = d3.format('.0f') // format life expectancy
            d3.select('.tooltip')
                .style('display', 'inline-block')
                .style('position', 'Fixed')
                .style('left', pos[0]+10+'px')
                .style('top', pos[1]+10+'px')
                .html('Country: ' + d.Country + '<br>Region: ' + d.Region + '<br>Population: '+ form1(d.Population) + '<br>Income: '+ form2(d.Income) + '<br>Life Expectancy: ' + form3(d.LifeExpectancy) + ' years');
                })
        .on("mouseleave", (event, d) => {
            // hide tooltip
            d3.select('.tooltip')
                .style('display', 'none');
        })
    
    }); 
