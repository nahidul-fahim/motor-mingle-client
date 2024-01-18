import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import useAllListings from "../../../../Hooks/useAllListings/useAllListings";
import useAllUsers from "../../../../Hooks/useAllUsers/useAllUsers";




const Statistics = () => {


    // hooks and custom hooks
    const { allListingsPending, allListings } = useAllListings();
    const { allUsersPending, allUsers } = useAllUsers();


    //line chart
    const [state, setState] = useState({
        series: [{
            name: "Desktops",
            data: [0]
        }],
        options: {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            title: {
                text: 'Product Trends by Month',
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            }
        },
    })


    // pie chart
    const [verifyState, setVerifyState] = useState({
        series: [44, 56],
        options: {
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: ['Verified', 'Not-verified', 'Pending'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },
    })




    useEffect(() => {
        if (!allListingsPending) {
            const availableDates = allListings.map(list => list.addingDate)

            // get the dates
            let uniqueDatesArray = availableDates.reduce(function (accumulator, date) {
                if (!accumulator.includes(date)) {
                    accumulator.push(date);
                }
                return accumulator;
            }, []);


            // get the data of dates
            const listingCounts = {};

            availableDates.forEach(date => {
                listingCounts[date] = (listingCounts[date] || 0) + 1;
            });

            const totalListingForEachDay = Object.values(listingCounts)
            // set line chart data
            setState({
                series: [{
                    name: "Desktops",
                    data: totalListingForEachDay,
                }],
                options: {
                    chart: {
                        height: 350,
                        type: 'line',
                        zoom: {
                            enabled: false
                        }
                    },
                    dataLabels: {
                        enabled: true
                    },
                    stroke: {
                        curve: 'straight'
                    },
                    title: {
                        text: 'Listing trends by date',
                        align: 'center'
                    },
                    grid: {
                        row: {
                            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                            opacity: 0.5
                        },
                    },
                    xaxis: {
                        categories: uniqueDatesArray,
                    }
                }
            })
        }

        // get verify status
        if (!allUsersPending) {

            const checkVerificationStatus = allUsers.map(singleUserData => singleUserData.verifyStatus)

            // get the data of verification
            const verificationCount = {};
            checkVerificationStatus.forEach(verificationStatus => {
                verificationCount[verificationStatus] = (verificationCount[verificationStatus] || 0) + 1;
            })

            // get the final results in an array
            const verificationResult = Object.values(verificationCount)

            console.log(verificationResult)

            // set the data to pie chart
            setVerifyState({
                series: verificationResult,
                options: {
                    chart: {
                        width: 380,
                        type: 'pie',
                    },
                    labels: ['Verified', 'Not-verified'],
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }]
                },
            })


        }

    }, [allListingsPending, allListings, allUsers, allUsersPending])



    return (
        <div className="font-heading w-full min-h-[100vh] flex flex-col justify-start items-start">
            <h2 className="text-5xl">Statistics page</h2>

            <div className="w-full min-h-[100vh] mt-10 flex flex-col justify-start">
                <ReactApexChart options={state.options} series={state.series} type="line" height={400} />
                <div className="w-full flex flex-col justify-center items-center mt-10">
                    <h3 className="text-2xl text-main font-bold mb-10 mt-[80px]">Member verification status</h3>
                    <ReactApexChart options={verifyState.options} series={verifyState.series} type="pie" width={400} />
                </div>
            </div>

        </div >
    );
};

export default Statistics;