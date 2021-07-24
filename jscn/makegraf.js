function render_graphs () {
    let windmode = new bootstrap.Modal(
        document.getElementById(
            "windmode"
        ), {
            keyboard: true
        }
    )
    var graflist = [
        {
            "elements": orgndata,
            "curveness": 0.5,
            "name": "How we are organized",
            "location": "orgngraf"
        },
        {
            "elements": teamdata,
            "curveness": 0,
            "name": "Know the team",
            "location": "teamgraf"
        },
        {
            "elements": pjctdata,
            "curveness": -0.5,
            "name": "Projects we work on",
            "location": "pjctgraf"
        },
        {
            "elements": sitedata,
            "curveness": -0.5,
            "name": "Websites we work on",
            "location": "sitegraf"
        },
        {
            "elements": appsdata,
            "curveness": -0.5,
            "name": "Applications we work on",
            "location": "appsgraf"
        }
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
            animationEasingUpdate: 'quinticInOut',
            series: [
                {
                    name: graflist[indx]["name"],
                    type: 'graph',
                    layout: 'none',
                    data: elements.nodes,
                    links: elements.links,
                    categories: elements.categories,
                    roam: false,
                    label: {
                        position: 'bottom',
                        formatter: '{b}'
                    },
                    lineStyle: {
                        color: 'source',
                        curveness: graflist[indx]["curveness"],
                        width: 5
                    },
                    emphasis: {
                        focus: 'adjacency',
                        lineStyle: {
                            width: 20
                        }
                    }
                }
            ]
        };
        chartobj.on('click', function(param) {
            console.dir(param);
            document.getElementById("modename").innerText = param["data"]["name"];
            document.getElementById("modedesc").innerText = param["data"]["value"];
            document.getElementById("modextra").innerText = param["data"]["extra"];
            windmode.show();
        });
        chartobj.setOption(option);
        option && chartobj.setOption(option);
    }
}