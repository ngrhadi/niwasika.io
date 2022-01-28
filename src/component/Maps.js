import React, { useEffect, useRef, useState } from 'react';
import PoleVectorlayer from './Vector/PoleVectorLayer';
import DemandVectorlayer from './Vector/DemandVectorLayer';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import { transform } from 'ol/proj';
import { toStringXY } from 'ol/coordinate';
import VectorSource from 'ol/source/Vector';
import './Maps.css'
import CanvasVectorLayerRenderer from 'ol/renderer/canvas/VectorLayer';
import BaseVectorLayer from 'ol/layer/BaseVector';

export default function Maps() {
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

    const buttonTile = useRef()

    const initalFeaturesLayer = new BaseVectorLayer({
        source: new VectorSource([])
    })

    useEffect(() => {
        const initialMap = new Map ({
            target: mapElement.current,
            view: new View({
                center: [-1, 110],
                zoom: 4,
            }),
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
                // googleMaps = new TileLayer({
                //     source: new XYZ({
                //       url: 'http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}',
                //     })
                // }),
            ],
            controls: [],

            dataPole,
            dataDemand,
        })

        initialMap.on('mousemove', handleMapClick)
        setDataPole(initalFeaturesLayer)
        setDataDemand(initalFeaturesLayer)

        setMap(initialMap)

        // setTileLayerOption((e) => {
        //     tileLayerOption.map(setTileLayerOption(!tileLayerOption ? tileOsm : googleMaps), buttonTile.current)
        // })
        
    }, []);



        const handleMapClick = e => {
            const clickedCoord = mapRef.current.getCoordinateFromPixel(e.pixel)
            const transormedCoord = transform(clickedCoord, 'EPSG:3857', 'EPSG:4326')
            setSelectedCoord( transormedCoord )
            window.addEventListener('mousemove', handleMapClick)
            console.log(handleMapClick);

            return() => {
                window.removeEventListener('mousemove', handleMapClick)
        }
        }
        

    console.log(dataPole);
    console.log(dataDemand);
  return (
  <div className="container-app">
        <div className="map-container" ref={mapElement}>
            <div className="clicked-coord-label">
                <p>{ (selectedCoord) ? toStringXY(selectedCoord, 5) : '' }</p>
            </div>
            {/* <div className="togle-pole">
                <button onClick={() => setShowPoleLayer(!showPoleLayer)} >POLE VECTOR</button>
                {dataPole && (
                    <PoleVectorlayer
                        longitude = {setDataPole.map && (el => el)}
                        latitude = {setDataPole.map && (el => el)}
                    >
                    </PoleVectorlayer>
                )}
            </div>
            <br/>
            <div className="togle-demand">
                <button onClick={() => setShowDemandLayer(!showDemandLayer)} >DEMAND VECTOR</button>
                {dataDemand && (
                    <DemandVectorlayer
                        longitude = {setDataDemand.map && (el => el)}
                        latitude = {setDataDemand.map && (el => el)}
                    >
                    </DemandVectorlayer>
                
                )}
            </div> */}
        </div>
  </div>
  );
}
