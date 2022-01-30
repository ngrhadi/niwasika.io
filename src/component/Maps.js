import React, { useEffect, useRef, useState } from 'react';
import PoleVectorlayer from './Vector/PoleVectorLayer';
import DemandVectorlayer from './Vector/DemandVectorLayer';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import { fromLonLat, transform } from 'ol/proj';
import { toStringXY } from 'ol/coordinate';
import VectorSource from 'ol/source/Vector';
import './Maps.css'
import VectorLayer from 'ol/layer/Vector';
import { useQuery } from 'react-query';
import Point from 'ol/geom/Point';
import Layer from 'ol/layer/Layer';
// import CanvasVectorLayerRenderer from 'ol/renderer/canvas/VectorLayer';
// import BaseVectorLayer from 'ol/layer/BaseVector';


async function fetchPolesRequest() {
    const response = await fetch("/pole");
    const data = await response.json();
    const { poles } = data;
    return poles;
}


export default function Maps(props) {
    const { data: poles } = useQuery("poles", fetchPolesRequest);
    const [dataPole, setDataPole] = useState([])
    const [dataDemand, setDataDemand] = useState([])
    const [showPoleLayer, setShowPoleLayer] = useState([true])
    const [showDemandLayer, setShowDemandLayer] = useState([false])
    // // const [tileLayerOption, setTileLayerOption] = useRef([])
    const [ map, setMap ] = useState()
    const [ selectedCoord , setSelectedCoord ] = useState()
    
    
    // pull refs
    const mapElement = useRef()

    const mapRef = useRef()
    mapRef.current = map

   

    const malaysia = [103, 2.6]
    const centerMapOption = fromLonLat(malaysia)
    
    useEffect(() => {
        const initialMap = new Map ({
            target: mapElement.current,
            view: new View({
                center: centerMapOption,
                zoom: 9,
            }),
            layers: [
                new TileLayer({
                    projection : 'ESPG : 4326',
                        source: new OSM(),
                    }),
                new VectorLayer({
                    source: new VectorSource([ 
                        poles,
                    ])
                })
                    
                        // dataPole,
                        // dataDemand,
                    // // new TileLayer({
                        // //     source: new XYZ({
                            // //         url: 'http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}',
                            // //     }),
                            // //     projection : 'ESPG : 4326',
                            // // }),
            ],
            controls: [],
            
        })
        
                    
        initialMap.on('click', handleMapClick)
        setDataPole(initialMap)
        setDataDemand(initialMap)

        setMap(initialMap)

        // setTileLayerOption((e) => {
        //     tileLayerOption.map(setTileLayerOption(!tileLayerOption ? tileOsm : googleMaps), buttonTile.current)
        // })
        
    }, []);


    const handleMapClick = event => {
        const clickedCoord = mapRef.current.getCoordinateFromPixel(event.pixel)
        const transormedCoord = transform(clickedCoord, 'EPSG:3857', 'EPSG:4326')
        setSelectedCoord( transormedCoord )
        window.addEventListener('click', handleMapClick)
        window.removeEventListener('click', handleMapClick)
    
    }
        

    console.log(dataPole);
    console.log(dataDemand);
  return (
  <div className="container-app">
      <>
      <Maps>
        <div 
            className="map-container"
            ref={mapElement} 
        >
            {Array.isArray(poles) &&
                    poles.map((poles) => (
                        <Layer>
                            <Point
                            key={poles.id}
                            position={{ lat: poles.geometry.coordinat[1], lng: poles.geometry.coordinat[0] }}
                            // onClick={() => setDataPole(poles)}
                            icon={{
                                url: `/circle.svg`,
                                origin: 'BOTTOM_LEFT',
                                anchor: (15, 15),
                                color: '#eaeaea',
                                scale: (30, 30),
                            }}
                            />
                        </Layer>
                    ))}
            {/* <div className="clicked-coord-label">
                <p className="item-coordinat-click">{(selectedCoord) ? toStringXY(selectedCoord, 5) : '' }</p>
                {console.log(selectedCoord)}
            </div>

            <div className="togle-pole">
                <button onClick={() => setDataPole(!poles)} >POLE VECTOR</button>
                
            </div> */}
            {/* <br/>
            <div className="togle-demand">
                <button onClick={() => setShowDemandLayer(!showDemandLayer)} >DEMAND VECTOR</button>
                {dataDemand.map && (
                    <DemandVectorlayer/>
                
                )}
            </div> */}
        </div>
    </Maps>

      </>
  </div>
  );
}
