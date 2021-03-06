var pie;

function resize() {
    var width = $(window).width();
    var height = $(window).height();
    if (pie) {
        var chart = $("#pie").dxPieChart("instance");
        var size = {
            size: {
                height: height - 50,
                width: width
            }
        }
        chart.option(size);
        console.log('resize');
    }

}

function render(blockSelector) {

    prepareData().then(function () {

        console.log(settings);
        $(blockSelector).dxPieChart({
            onInitialized: function(e) {
                pie = e.component;
            },
            size: {
                width: settings.width,
            },
            palette: settings.palette,
            dataSource: filteredData,
            series: [
                {
                    argumentField: settings.customDimension,
                    valueField: settings.series[0],
                    label: {
                        visible: settings.labelVisible,
                        format: settings.labelFormat,
                        font: {
                            size: settings.labelFontSize,
                            family: settings.labelFontFamily,
                            style: settings.labelFontStyle,
                            weight: settings.labelFontWeight,
                            color: settings.labelFontColor
                        },
                        connector: {
                            visible: settings.labelConnectorVisible,
                            width: settings.labelConnectorWidth
                        }
                    }
                }
            ],
            legend: {
                visible: settings.legendVisible,
                orientation: settings.legendOrientation,
                verticalAlignment: settings.legendVerticalAlignment,
                horizontalAlignment: settings.legendHorizontalAlignment,
                itemTextPosition: settings.legendItemTextPosition,
                rowCount: settings.legendRowCount,
                font: {
                    size: settings.legendFontSize,
                    family: settings.legendFontFamily,
                    style: settings.legendFontStyle,
                    weight: settings.legendFontWeight,
                    color: settings.legendFontColor
                },
            },
            title: {
                text: settings.title,
                font: {
                    size: settings.titleFontSize,
                    family: settings.titleFontFamily,
                    style: settings.titleFontStyle,
                    weight: settings.titleFontWeight,
                    color: settings.titleFontColor
                }
            },

            tooltip: {
                enabled: settings.tooltipEnabled,
                format: settings.tooltipFormat,
                customizeTooltip: function (params) {
                    function getRussianName(key, dataArray) {
                        dataArray.forEach(function (value, index) {
                            if (value.key === key) {
                                result = value.titleRus
                            }
                        })
                        return result
                    }


                    var customTooltip = '';
                    settings.tooltipDimensions.forEach(function (value, index) {
                        var russianName = getRussianName(value, resultAnalytData.tableColumns)
                        customTooltip += '<br>&nbsp;&nbsp;&nbsp;&nbsp;' + russianName + ':' + params.point.data[value];
                        console.log(resultAnalytData);
                        console.log(russianName);

                    })

                    return {text: this.argumentText + ": " + this.valueText + customTooltip};
                }
            },


            "export": {
                enabled: settings.exportEnabled
            },
            onPointClick: function (e) {
                var point = e.target;

                toggleVisibility(point);
            },
            onLegendClick: function (e) {
                var arg = e.target;

                toggleVisibility(this.getAllSeries()[0].getPointsByArg(arg)[0]);
            }
        });

        function toggleVisibility(item) {
            if (item.isVisible()) {
                item.hide();
            } else {
                item.show();
            }
        }
    });
}

