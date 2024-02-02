import { Geogrid } from '../src/js/utils/geogrid';
import { geogridOutput } from '../src/js/utils/geogrid.output';
import { WPSNamelist } from '../src/js/utils/namelist.wps';
import { roundFloat } from './test.utils';

import * as fs from 'fs';

const lat = 0, lon = 1;
const decimals = 2;

function readSampleNamelistWps(folder) {
  const path = `./samples/${folder}/namelist.wps`;
  console.log(`Reading namelist.wps: ${path}`)
  return fs.readFileSync(path, 'utf8');
}

function assertCorner(corners, geogridJson, location) {
  console.log(`${location} - ` +
  `calculated:[${corners[location][lat].toFixed(decimals)}, ${corners[location][lon].toFixed(decimals)}] == ` +
  `geogrid:[${geogridJson.corner_lats[geogridOutput.cornerIndex.unstaggered[location]].toFixed(3)}, ${geogridJson.corner_lons[geogridOutput.cornerIndex.unstaggered[location]].toFixed(3)}]`);

  expect(roundFloat(corners[location][lat], decimals))
    .toBe(roundFloat(geogridJson.corner_lats[geogridOutput.cornerIndex.unstaggered[location]], decimals));

  expect(roundFloat(corners[location][lon], decimals))
    .toBe(roundFloat(geogridJson.corner_lons[geogridOutput.cornerIndex.unstaggered[location]], decimals));
}

function testSample(folder, geogridJson) {
  const content = readSampleNamelistWps(folder);
  expect(content).not.toBe(null);

  const wpsNamelist = new WPSNamelist(content);
  expect(wpsNamelist).not.toBe(null);

  let geogrid = null;
  for(let i = 0; i < wpsNamelist.share.max_dom; i++) {
    geogrid = createGeogrid(wpsNamelist, i, geogrid);
    testGrid(geogrid, folder, i);
  }
}

function createGeogrid(wpsNamelist, grid, parent) {
  return new Geogrid(
    grid, 
    {
      map_proj: wpsNamelist.geogrid.map_proj,
      ref_lat: wpsNamelist.geogrid.ref_lat,
      ref_lon: wpsNamelist.geogrid.ref_lon,
      truelat1: wpsNamelist.geogrid.truelat1,
      truelat2: wpsNamelist.geogrid.truelat2,
      stand_lon: wpsNamelist.geogrid.stand_lon,
      dx: wpsNamelist.geogrid.dx,
      dy: wpsNamelist.geogrid.dy,
      e_we: wpsNamelist.geogrid.e_we[grid],
      e_sn: wpsNamelist.geogrid.e_sn[grid],
      parent_grid_ratio: wpsNamelist.geogrid.parent_grid_ratio[grid],
      i_parent_start: wpsNamelist.geogrid.i_parent_start[grid],
      j_parent_start: wpsNamelist.geogrid.j_parent_start[grid]
    },
    parent);
}

function testGrid(geogrid, folder, grid) {

  const dom = grid + 1;
  console.log(`Testing ${folder} grid d0${dom}`)

  expect(geogrid).not.toBe(null);

  const jsonPath = `./samples/${folder}/geo_em.d0${dom}.nc.json`;
  const geogridJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  assertCorner(geogrid.corners, geogridJson, 'sw');
  assertCorner(geogrid.corners, geogridJson, 'nw');
  assertCorner(geogrid.corners, geogridJson, 'ne');
  assertCorner(geogrid.corners, geogridJson, 'se');
}

test('ok', () => {
  testSample('lambert');
  testSample('mercator');
  testSample('polar');
  //testSample('lat-lon_global');
  testSample('lat-lon_region');
  //testSample('rotated lat-lon');
});