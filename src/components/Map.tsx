import Map, { FullscreenControl, NavigationControl, Source, Layer } from "react-map-gl";
import { useState } from "react";

export default function MapComponent() {
    const initialViewport = {
        latitude: -7.279425135000778,
        longitude: 112.79519334867132,
        zoom: 16.5,
    };

    const ITS_BOUNDS: [number, number, number, number] = [
        112.78808668736053,
        -7.291136781513192,
        112.80223952776151,
        -7.274229157652179,
    ];

    const GeoJson: GeoJSON.FeatureCollection = {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                properties: {
                    id: "its",
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [
                        [
                            [112.79698228317488, -7.279889109394844],
                            [112.79698057962457, -7.279264116853042],
                            [112.79763062290851, -7.279271643749553],
                            [112.797605934339, -7.27988632279974],
                        ],
                    ],
                },
            },
        ],
    };


    const [viewState, setViewState] = useState(initialViewport);
    return (
        <div className="flex justify-center">
            <Map
                {...viewState}
                initialViewState={initialViewport}
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                onMove={(evt) => setViewState(evt.viewState)}
                style={{
                    width: "100%",
                    height: "30vh",
                    zIndex: "1",
                    borderRadius: "0.375rem",
                }}
                maxZoom={20}
                minZoom={16}
                dragRotate={false}
                maxBounds={ITS_BOUNDS}
                onClick={(evt) => {
                    console.log(evt);
                }}
            >
                <Source id="its" type="geojson" data={GeoJson}>
                    <Layer
                        id="its"
                        type="fill"
                        paint={{
                            "fill-color": "red",
                            "fill-opacity": 0.3,
                        }}
                    />
                </Source>
                <FullscreenControl />
                <NavigationControl />
            </Map>
        </div>
    );
}