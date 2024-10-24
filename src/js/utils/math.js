import { EarthRadius, WrfProjections } from './constants';

export function nearestIntToZero(num) {
    return (num < 0) ? Math.ceil(num) : Math.floor(num);
}

export function degreesToMeters(d) {
    return d * EarthRadius * Math.PI * 2.0 / 360.0;
}

export function metersToDegrees(d) {
    return d * 360.0 / EarthRadius / Math.PI / 2.0;
}

export function distanceToMeters(map_proj, distance) {

    if (map_proj === undefined) {
        throw new Error("Invalid map_proj argument");
    }

    if (isNaN(distance)) {
        throw new Error("Invalid distance argument");
    }

    return map_proj === WrfProjections.latlon ? 
        degreesToMeters(distance) : 
        distance;
}
