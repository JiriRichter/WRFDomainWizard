# WRF Domain Wizard 

The WRF Domain Wizard is implemented as a client-side SPA (Single-page application) and can be used to define model domains for the (WRF Preprocessing System (WPS))[https://www2.mmm.ucar.edu/wrf/users/wrf_users_guide/build/html/wps.html]. WPS is a set of three programs whose collective role is to prepare input to the real program for real-data simulations. Each program reads parameters from a common namelist file - namelist.wps.

[Official](https://wrfdomainwizard.net/)
[Preview](https://jiririchter.github.io/WRFDomainWizard/)

## Limitation
- The current version of the tool only helps with the definition of parameters for the (geogrid)[https://www2.mmm.ucar.edu/wrf/users/wrf_users_guide/build/html/wps.html#step1-define-model-domains-with-geogrid] section.
- Support for NMM and the associated rotated lat-lon projection are not implemented
- Support for ARW global lat-lon is not implemented

## Test

A sample namelist.wps file has been created for each major projection and the test the geographic transformation code. The test expects the corners of all domains to align with the corners from the geogrid program output. The geogrid corner locations are obtained from the unstaggered corner_lats and corner_lons attributes of the geobrid output file and are displayed as small round markers.

- [Lambert](https://wrfdomainwizard.net/#lambert)
- [Mercator](https://wrfdomainwizard.net/#mercator)
- [Polar](https://wrfdomainwizard.net/#polar)
- [Lat-Lon](https://wrfdomainwizard.net/#lat-lon_region)

## Resources

- [wrf-python](https://github.com/NCAR/wrf-python)
    - [Projections](https://github.com/NCAR/wrf-python/blob/develop/src/wrf/projection.py)

- [PROJ4JS](https://github.com/proj4js/proj4js)

- [Weather Research and Forecasting Model](https://www2.mmm.ucar.edu/wrf/users/)
    - [User Guide](https://www2.mmm.ucar.edu/wrf/users/wrf_users_guide/build/html/index.html)
    - [WRF Preprocessing System (WPS)](https://www2.mmm.ucar.edu/wrf/users/wrf_users_guide/build/html/wps.html)
    - [wrf-model/WRF](https://github.com/wrf-model/WRF)
    - [wrf-model/WPS](https://github.com/wrf-model/WPS)

## Issue and Suggestions

Please, report any issues or feaure requests using the project (Issues)[https://github.com/JiriRichter/WRFDomainWizard/issues].

