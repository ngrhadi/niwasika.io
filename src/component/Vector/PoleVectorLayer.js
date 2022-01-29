import { useEffect } from 'react';

const PoleVectorlayer = () => {
    async function poleData(){
        poleData = await fetch('/pole')
        .then(async poleData => poleData.json())
        .then(json => poleData = json.map(Object => Object))
        .finally()
        console.log(poleData);
    }
    return poleData();
}

export default PoleVectorlayer;
