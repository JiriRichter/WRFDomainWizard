from netCDF4 import Dataset
import json
import numpy

def netcdf_to_json(path):
    json_path = path + ".json"

    json_object = {
        "variables": {}
    }

    nc = Dataset(path, "r", format="NETCDF4")

    def get_value(attr):
        if isinstance(attr, numpy.ndarray):
            values = []
            for item in attr:
                values.append(get_value(item))
            return values

        if attr.dtype == 'int32':
            return int(attr)
        elif attr.dtype == 'float32':
            return float(attr)
        
    def copy_attr(name):
        attr = nc.getncattr(name)
        json_object[name] = get_value(attr)    

    copy_attr("WEST-EAST_GRID_DIMENSION")
    copy_attr("SOUTH-NORTH_GRID_DIMENSION")
    copy_attr("DX")
    copy_attr("DY")
    copy_attr("CEN_LAT")
    copy_attr("CEN_LON")
    copy_attr("TRUELAT1")
    copy_attr("TRUELAT2")
    copy_attr("MOAD_CEN_LAT")
    copy_attr("STAND_LON")
    copy_attr("POLE_LAT")
    copy_attr("POLE_LON")
    copy_attr("corner_lats")
    copy_attr("corner_lons")
    copy_attr("MAP_PROJ")
    copy_attr("grid_id")
    copy_attr("parent_id")
    copy_attr("i_parent_start")
    copy_attr("j_parent_start")
    copy_attr("i_parent_end")
    copy_attr("j_parent_end")
    copy_attr("parent_grid_ratio")

    nc.close()
    
    with open(json_path, "w") as outfile:
        outfile.write(json.dumps(json_object, indent=4))