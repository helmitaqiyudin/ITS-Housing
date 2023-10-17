import Map, { FullscreenControl, NavigationControl, Source, Layer, type MapRef } from "react-map-gl";
import { useState, useRef, useEffect } from "react";
import { LoadingOverlay, Button } from "@mantine/core";

type MapComponentProps = {
    boundary: string;
};

type Coordinate = [number, number];
type Coordinates = Coordinate[];

export default function MapComponent({ boundary }: MapComponentProps) {
    const mapRef = useRef<MapRef>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [flown, setFlown] = useState(false);

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

    const parsedCoordinates = JSON.parse(boundary) as Coordinates;

    const center: [number, number] = [
        parsedCoordinates.reduce((acc, [lng]) => acc + lng, 0) / parsedCoordinates.length,
        parsedCoordinates.reduce((acc, [, lat]) => acc + lat, 0) / parsedCoordinates.length
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
                        parsedCoordinates,
                    ],
                },
            },
        ],
    };

    // if (!isLoaded && mapRef.current && center) {
    //     mapRef.current?.flyTo({center: center, duration: 2500, zoom: 17.5});
    // }

    useEffect(() => {
        if (isLoaded && mapRef.current && center && !flown) {
            const flyToOptions = {
                center: center, 
                zoom: 18,
                duration: 2500
            };
            mapRef.current.flyTo(flyToOptions);
            setFlown(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoaded]);

    const handleMapLoad = () => {
        setIsLoaded(true);
    };


    const [viewState, setViewState] = useState(initialViewport);
    return (
        <>
            <div className="flex justify-center shadow-md">
                <LoadingOverlay
                    visible={!isLoaded}
                    opacity={0.5}
                    color="gray"
                />
                <Map
                    {...viewState}
                    initialViewState={initialViewport}
                    mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                    onMove={(evt) => setViewState(evt.viewState)}
                    style={{
                        width: "100%",
                        height: "30vh",
                        borderRadius: "0.375rem",

                    }}
                    maxZoom={20}
                    minZoom={16}
                    dragRotate={false}
                    maxBounds={ITS_BOUNDS}
                    ref={mapRef}
                    onLoad={handleMapLoad}
                    onClick={(evt) => {
                        // log the latitude and longitude of the clicked point
                        console.log(evt.lngLat);
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
            <div className="flex justify-end mt-2">
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${center[1]},${center[0]}`} target="_blank" rel="noreferrer">
                    <Button variant="light" color="blue" fullWidth>
                        Get Direction
                    </Button>
                </a>
            </div>
        </>
    );
}