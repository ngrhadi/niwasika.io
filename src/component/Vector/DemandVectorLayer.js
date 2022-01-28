import { useEffect } from 'react';

const DemandVectorlayer = () => {
    async function demandData(){
            demandData = await fetch('/demand')
            .then(demandData => demandData.json())
            .then(json => demandData = json.map(Object => Object))
            .finally()
            console.log(demandData);
    }
    
    return demandData();
}

export default DemandVectorlayer;