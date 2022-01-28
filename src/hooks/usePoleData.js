import { useEffect, useState } from "react"


export const usePoleData = (url) => {

    let poleData = []
    useEffect(async () => {
        poleData = await fetch(url)
        .then(poleData => poleData.json())
        .then(el => {poleData(el)})
    }, [url]);


    return (poleData);
}
