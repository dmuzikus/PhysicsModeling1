<script>
    import {Solver} from "../classes/Solution.js";
    import Chart from 'chart.js/auto';
    import {onMount} from "svelte";

    let ctx;
	let chartCanvas;
    let chart;

    let solver = new Solver();
    let result = solver.getDataForPotentialPitDraw()


    onMount(async () =>
    {
        ctx = chartCanvas.getContext('2d');
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: result.x,
                datasets: [
                    {
                        label: 'Func',
                        data: result.y,
                        pointRadius: 0,
                        cubicInterpolationMode: 'monotone',
                        borderColor: 'blue',
                        borderWidth: 2,
                    },
                    ]
            },
            options: {
                plugins: {
                  title: {
                    display: true,
                    text: 'Visualisation'
                  }
                },
            }
        });
    }
);
</script>
<div style="display: flex; justify-content: center; height: max-content;">
    <div style="width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; padding-left: 2em; padding-right: 2em">
            <div style="display: flex; flex-direction: column; width: 100%; justify-content: center">
                <div style="display: flex; justify-content: center; align-items: center">
                    <div style="width: 85%">
                        <canvas bind:this={chartCanvas} id="myChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
</div>

<style>
    :global(body) {
        margin: 0;
    }
</style>