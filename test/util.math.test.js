import { nearestIntToZero } from '../src/js/util/util.math';

test('Expect nearest int to zero', () => {

  expect(nearestIntToZero(0)).toEqual(0);

  expect(nearestIntToZero(-1)).toEqual(-1);
  expect(nearestIntToZero(1)).toEqual(1);

  expect(nearestIntToZero(-1.5)).toEqual(-1);
  expect(nearestIntToZero(1.5)).toEqual(1);

});