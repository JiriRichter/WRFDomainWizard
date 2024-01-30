import { Geogrid } from '../src/js/util/geogrid';
import { WPSNamelist } from '../src/js/util/wps.namelist';

import * as fs from 'fs';

// corner indexes
// see: https://www2.mmm.ucar.edu/wrf/users/wrf_users_guide/build/html/wps.html#wps-output-fields
let i = 0;
const cornerIndex = {
  mass: {
    sw: i++,
    nw: i++,
    ne: i++,
    se: i++
  },
  u: {
    sw: i++,
    nw: i++,
    ne: i++,
    se: i++
  },
  v: {
    sw: i++,
    nw: i++,
    ne: i++,
    se: i++
  },
  unstaggered: {
    sw: i++,
    nw: i++,
    ne: i++,
    se: i++
  }
}

const lat = 0, lon = 1;

function readSampleNamelistWps(folder) {
  const path = `./samples/${folder}/namelist.wps`;
  console.log(`Reading namelist.wps: ${path}`)
  return fs.readFileSync(path, 'utf8');
}

function roundFloat(value, decimals) {
  return Number(value.toFixed(decimals));
}

function assertCorner(corners, geogridJson, location, decimals) {
  decimals = decimals || 3;

  console.log(`${location}: [${corners[location][lat].toFixed(decimals)}, ${corners[location][lon].toFixed(decimals)}] == [${geogridJson.corner_lats[cornerIndex.unstaggered[location]].toFixed(3)}, ${geogridJson.corner_lons[cornerIndex.unstaggered[location]].toFixed(3)}]`);

  expect(roundFloat(corners[location][lat], decimals))
    .toBe(roundFloat(geogridJson.corner_lats[cornerIndex.unstaggered[location]], decimals));

  expect(roundFloat(corners[location][lon], decimals))
    .toBe(roundFloat(geogridJson.corner_lons[cornerIndex.unstaggered[location]], decimals));
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
    break;
  }
}

function createGeogrid(wpsNamelist, grid, parent) {
  return new Geogrid({
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
  //testSample('lat-lon (global)');
  testSample('lat-lon (region)');
  //testSample('rotated lat-lon');
});