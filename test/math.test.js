import { nearestIntToZero } from '../src/js/utils/math';
import { degreesToMeters, metersToDegrees } from '../src/js/utils/math';
import { roundFloat } from './test.utils';

test('Expect nearest int to zero', () => {

  expect(nearestIntToZero(0)).toEqual(0);

  expect(nearestIntToZero(-1)).toEqual(-1);
  expect(nearestIntToZero(1)).toEqual(1);

  expect(nearestIntToZero(-1.5)).toEqual(-1);
  expect(nearestIntToZero(1.5)).toEqual(1);

});

const degreeInMeters = 111177.4733520388;
const decimals = 2;


test('Expect nearest int to zero', () => {

  const meters = roundFloat(degreesToMeters(1), decimals);
  expect(meters)
  .toBe(roundFloat(degreeInMeters, decimals));

  expect(roundFloat(metersToDegrees(meters), decimals))
    .toBe(1);
});

