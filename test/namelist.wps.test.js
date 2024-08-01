import { NamelistError, Namelist } from '../src/js/utils/namelist';
import { WPSNamelistError, WPSNamelist } from '../src/js/utils/namelist.wps';

import * as fs from 'fs';

function readNamelistWps(filename) {
  const path = `./test/namelist.wps/${filename}`;
  console.log(`Reading test file ${filename}`);
  return fs.readFileSync(path, 'utf8');
}

describe('test namelist variable outside a group', () => {
  it('should throw a NamelistError type of error.', () => {
      expect.assertions(2);

      try {
        const content= readNamelistWps('invalid.1.wps');
        const ns = new Namelist(content);
      } catch (error) {
          expect(error).toBeInstanceOf(NamelistError);
          expect(error).toHaveProperty('message', "Namelist variable 'opt_ignore_dom_center' is not inside a group section. All properties are expected to be inside a group section starting with '&[GROUPNAME]' and ending with '/'.");
      }
  });
});

['invalid.2.wps', 'invalid.3.wps' ].forEach((filename) => {
  describe('test missing required namelist WPS variable', () => {
    it('should throw a WPSNamelistError type of error.', () => {
        expect.assertions(2);
  
        try {
          const content= readNamelistWps(filename);
          const ns = new WPSNamelist(content);
        } catch (error) {
            expect(error).toBeInstanceOf(WPSNamelistError);
            expect(error).toHaveProperty('message', "WPS namelist is missing required variable 'parent_grid_ratio' under group 'geogrid'");
        }
    });
  });
});
