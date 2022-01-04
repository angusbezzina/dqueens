import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

import { googleApiKey, dqueensLocation } from "lib/data/constants";

const GoogleMap = () => {
  const googlemap = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: googleApiKey,
      version: "weekly",
      libraries: ["places"],
    });

    let map: any;

    loader.load().then(() => {
      const google = window.google;
      if (googlemap.current) {
        map = new google.maps.Map(googlemap.current, {
          center: dqueensLocation,
          zoom: 16,
          fullscreenControl: false, // remove the top-right button
          mapTypeControl: false, // remove the top-left buttons
          streetViewControl: false, // remove the pegman
          zoomControl: false, // remove the bottom-right buttons
        });
      }

      new google.maps.Marker({
        position: dqueensLocation,
        map,
        title: "D'Queens Salon de Belleza",
      });
    });
  });
  return <div id="map" className="h-three-fifths w-full md:absolute md:top-0 md:right-0" ref={googlemap} />;
};

export default GoogleMap;
