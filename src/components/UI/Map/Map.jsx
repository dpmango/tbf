import React, { useState, useRef, useEffect, memo } from 'react';
import cns from 'classnames';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { createCustomEqual } from 'fast-equals';
import { isLatLngLiteral } from '@googlemaps/typescript-guards';

import { Spinner } from '@ui';
import { getEnv } from '@helpers';

import styles from './Map.module.scss';
import { googleMapSkin } from './gmap-skin';

const mapOptions = {
  panControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
  streetViewControl: false,
  // disableDefaultUI: true,
  scrollwheel: false,
  styles: googleMapSkin,
};

const render = (status) => {
  if (status === Status.FAILURE) return <p>Error loading map...</p>;
  return <Spinner />;
};

export const UiMap = memo(({ children, ...props }) => {
  return (
    <Wrapper apiKey={getEnv('GOOGLE_API')} render={render}>
      <Map {...props}>{children}</Map>
    </Wrapper>
  );
});

const Map = ({ className, children, onClick, onIdle, ...options }) => {
  const ref = useRef(null);
  const [map, setMap] = useState();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, { ...mapOptions }));
    }
  }, [ref, map, mapOptions]);

  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions({ ...options, ...mapOptions });
    }
  }, [map, options, mapOptions]);

  useEffect(() => {
    if (map) {
      ['click', 'idle'].forEach((eventName) => google.maps.event.clearListeners(map, eventName));

      if (onClick) {
        map.addListener('click', onClick);
      }

      if (onIdle) {
        map.addListener('idle', () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return (
    <>
      <div ref={ref} className={cns(styles.map, className)} />

      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

export const UiMapMarker = (options) => {
  const defaultMarkerOptions = {
    icon: '/img/mapIcon.svg',
  };
  const [marker, setMarker] = useState();

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    } else {
      const contentString = `
        <div class="map-popup">
          <div class="map-popup-title">Location</div>
          <p>Artemis House</p>
          <p>67 Fort Street<br/>
          Grand Cayman<br/>
          KY1-1007<br/>
          Cayman Islands
          </p>
        </div>
      `;

      const infowindow = new google.maps.InfoWindow({
        content: contentString,
        pixelOffset: new google.maps.Size(140, 200),
      });

      marker.addListener('click', () => {
        infowindow.open({
          anchor: marker,
        });
      });

      infowindow.open({
        anchor: marker,
      });
    }

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.setOptions({ ...options, ...defaultMarkerOptions });
    }
  }, [marker, options, defaultMarkerOptions]);

  return null;
};

const deepCompareEqualsForMaps = createCustomEqual((deepEqual) => (a, b) => {
  if (isLatLngLiteral(a) || a instanceof google.maps.LatLng || isLatLngLiteral(b) || b instanceof google.maps.LatLng) {
    return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
  }
  return deepEqual(a, b);
});

function useDeepCompareMemoize(value) {
  const ref = useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffectForMaps(callback, dependencies) {
  useEffect(callback, dependencies.map(useDeepCompareMemoize));
}
