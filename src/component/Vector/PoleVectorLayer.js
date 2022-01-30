import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
// import {GeoJSON} from 'ol/geom/Geometry'
import { useState } from 'react';

// const [poleFetchData, setPoleFetchData] = useState([])


const PoleVectorlayer = (props) => {
    async function poleData(){
        poleData = await fetch('/pole')
        .then(pole => pole.json())
        .then(json => poleData = json.map(Object => Object))
        .finally()
        console.log(poleData);
    }
    return poleData;

    // // const vectorLayer = new VectorLayer({
    // //     source: new VectorSource({
    // //         poleData,
    // //         format: new GeoJSON()
    // //     })
    // // })

    // // return (
    // //     <VectorLayer 
    // //         className="pole-data"
    // //         source={poleData}
    // //     >
    // //         {props}
    // //     </VectorLayer>
    // // )
}

export default PoleVectorlayer();
