import { useTheme } from '@emotion/react';
import { Card, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

export const DataBarChart = ({ selected, data }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (selected && selected.length > 0) {
            let studentNames = [];
            let studentMathScore = [];
            let studentEnglishScore = [];
            let studentPhysicsScore = [];

            data.filter((obj) => selected.includes(obj.id)).map((obj) => {
                studentNames.push(obj.name);
                studentMathScore.push(obj.math_score);
                studentEnglishScore.push(obj.english_score);
                studentPhysicsScore.push(obj.physics_score);

                return true;
            });

            const chartGenerate = [
                {
                    x: studentNames,
                    y: studentMathScore,
                    name: "Math Score",
                    type: "bar"
                },
                {
                    x: studentNames,
                    y: studentEnglishScore,
                    name: "English Score",
                    type: "bar"
                },
                {
                    x: studentNames,
                    y: studentPhysicsScore,
                    name: "Physics Score",
                    type: "bar"
                }
            ];

            setChartData(chartGenerate);
        } else {
            setChartData(null);
        }
    }, [selected, data])

    return (
        <Card sx={{ padding: "17px", borderRadius: 1, minHeight: "11rem" }}>
            <Grid container>
                <Grid item xs={6} sx={{ p: 2 }}>
                    <Typography variant='h6'>Student Data</Typography>
                </Grid>
                <Grid item xs={12} display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                    {
                        chartData && chartData.length > 0
                            ?
                            <Plot
                                data={chartData}
                                layout={{ height: 440, title: 'Students Scorechart' }}
                            />
                            :
                            <Typography variant='subtitle2'>Please select a row to generate chart.</Typography>
                    }

                </Grid>
            </Grid>
        </Card>
    )
}
