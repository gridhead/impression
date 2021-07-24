function render_graphs () {
    var graflist = [
        {
            "elements": fporgdata,
            "name": "Fedora Org Chart",
            "location": "fporgraf"
        },

    ];
    for (let indx in graflist) {
        var chartobj = echarts.init(document.getElementById(graflist[indx]["location"]));
        let elements = graflist[indx]["elements"];
        elements.nodes.forEach(function (node) {
            node.label = {
                show: node.symbolSize >= 10
            };
        });
        var option = {
            tooltip: {},
            animationDuration: 1500,
            animationEasingUpdate: 'cubicInOut',
            series: [
                {
                    name: graflist[indx]["name"],
                    type: 'graph',
                    layout: 'none',
                    data: elements.nodes,
                    links: elements.links,
                    categories: elements.categories,
                    roam: true,
                    label: {
                        show: true,
                        position: 'inside',
                        offset: [0, 0],
                        formatter: '{b}',
                        
                    },
                    labelLayout: {
                        hideOverlap: false
                    },
                    lineStyle: {
                        color: 'source',
                        curveness: 0.1,
                        cap : 'round',
                    
                        
                    },
                    emphasis: {
                        focus: 'adjacency',
                        lineStyle: {
                            width: 11
                        }
                    }
                }
            ]
        };
        chartobj.on('click', function(param) {
            console.dir(param);
        });
        chartobj.setOption(option);
        option && chartobj.setOption(option);
    }
}