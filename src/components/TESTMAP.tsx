import Map, { FullscreenControl, NavigationControl, Source } from "react-map-gl";
import { useState } from "react";


export default function MapComponent() {

    const initialViewport = {
        latitude: -7.2814900569554055,
        longitude: 112.79455545328369,
        zoom: 18,
    };

    const ITS_BOUNDS: [number, number, number, number] = [
        112.78808668736053, // batas kiri bawah
        -7.291136781513192, // batas kiri bawah
        112.80223952776151, // batas kanan atas
        -7.274229157652179, // batas kanan atas
    ];

    const [viewState, setViewState] = useState(initialViewport);

    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    if (ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, 200, 200);
    }

    return (
        <>
            <div className="flex justify-center shadow-md relative">
                <Map
                    {...viewState}
                    mapLib={import('mapbox-gl')}
                    initialViewState={initialViewport}
                    mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                    onMove={(evt) => setViewState(evt.viewState)}
                    style={{
                        width: "100%",
                        height: "50vh",
                        borderRadius: "0.375rem",
                        zIndex: 100,

                    }}
                    maxZoom={20}
                    minZoom={16}
                    dragRotate={false}
                    maxBounds={ITS_BOUNDS}
                    onClick={(evt) => {
                        console.log(evt.lngLat);
                    }}
                >
                    <Source id="layer" type="canvas" canvas={canvas} coordinates={[[112.78808668736053, -7.291136781513192], [112.80223952776151, -7.274229157652179]]} />
                    <FullscreenControl />
                    <NavigationControl />
                </Map>
            </div>
        </>
    );
}