import Point from "ol/geom/Point";
import React from "react";
import { useQuery} from "react-query";

async function fetchPoles(){
    const response = await fetch('/pole');
    const {poles} = await response.json();
    return poles;
}

export default function QueryPoleLayer(){
    const {data: poles, error} = useQuery("poles", fetchPoles);

    if (error) return <span>Error loading data</span>;
    if (!poles) return <span>loading...</span>;

    return (
        <div>
             <Point>
                {poles.map((poles) => (
                <li key={poles.id}>
                    {poles.latitude},{poles.longitude}
                </li>
                ))}
            </Point>
        </div>
    )
}

// // const PoleVectorlayer = (props) => {
// //     async function poleData(){
// //         poleData = await fetch('/pole')
// //         .then(pole => pole.json())
// //         .then(json => poleData = json.map(Object => Object))
// //         .finally()
// //         console.log(poleData);
// //     }
// //     return poleData;

// //     // // const vectorLayer = new VectorLayer({
// //     // //     source: new VectorSource({
// //     // //         poleData,
// //     // //         format: new GeoJSON()
// //     // //     })
// //     // // })

// //     // // return (
// //     // //     <VectorLayer 
// //     // //         className="pole-data"
// //     // //         source={poleData}
// //     // //     >
// //     // //         {props}
// //     // //     </VectorLayer>
// //     // // )
// // }

// // export default PoleVectorlayer();
