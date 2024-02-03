import { SidebarWPSPanelGrid } from "./domain-wizard.sidebar.wps.panel.grid";
import { WRFDomain } from "./leaflet/leaflet.wrf-domain";
import { WRFDomainGrid } from "./leaflet/leaflet.wrf-grid";
import { errorMessageBox } from "./domain-wizard.dialog.message-box";

export class SidebarWPSPanel {
    constructor(container, options) {

        // controls
        var self = this, 
            initializedForDomain = false,
            domain,
            form,
            containerGrids,
            headerGrids,
            buttonUpdate,
            buttonStanLonMinus,
            buttonStanLonPlus,
            buttonRatioDivide2,
            buttonRatioDivide3,
            buttonRatioMultiply2,
            buttonRatioMultiply3,
            buttonAddMOAD,
            buttonRemoveMOAD,
            selectMapProj,
            inputRefLat,
            inputRefLon,
            inputTrueLat1,
            inputTrueLat2,
            inputStandLon,
            inputDX,
            inputDY,
            inputPoleLat,
            inputPoleLon,
            localStorageKey = 'wrf_domain_wizard_wps_panel';

        // defaul settings
        this.options = {
            minGridDistanceMeters: 100,
            minGridDistanceDegrees: 0
        };

        if (options) {
            this.options = Object.assign(this.options, options);
        }            

        form = $('form', container);
        containerGrids = $('#grids', form);
        headerGrids = $('div#grids-header', form);

        buttonUpdate = $('#update-domain', container);
        buttonAddMOAD = $('button[data-action="add-moad"]', form);
        buttonRemoveMOAD = $('button[data-action="remove-moad"]', form);

        selectMapProj = $('select[name="map_proj"]', form);
        inputRefLat = $('input[name="ref_lat"]', form);
        inputRefLon = $('input[name="ref_lon"]', form);
        inputTrueLat1 = $('input[name="truelat1"]', form);
        inputTrueLat2 = $('input[name="truelat2"]', form);
        inputStandLon = $('input[name="stand_lon"]', form);
        inputDX = $('input[name="dx"]', form);
        inputDY = $('input[name="dy"]', form);
        inputPoleLat = $('input[name="pole_lat"]', form);
        inputPoleLon = $('input[name="pole_lon"]', form);

        buttonStanLonMinus = $('#stan-lon-minus', form);
        buttonStanLonPlus = $('#stan-lon-plus', form);

        buttonRatioDivide2 = $('#div-2', form);
        buttonRatioDivide3 = $('#div-3', form);
        buttonRatioMultiply2 = $('#mul-2', form);
        buttonRatioMultiply3 = $('#mul-3', form);

        buttonUpdate.off();
        selectMapProj.off();
        buttonStanLonMinus.off();
        buttonStanLonPlus.off();
        buttonRatioDivide2.off();
        buttonRatioDivide3.off();
        buttonRatioMultiply2.off();
        buttonRatioMultiply3.off();

        $('[title]', form).tooltip();

        // hide tooltip when button is clicked
        $('button[title]', form).on('click', function (e) {
            $(this).tooltip('hide');
        });

        function setGridsContainerHeight() {
            containerGrids.height(buttonUpdate.parent().offset().top - containerGrids.offset().top - 10);
        }

        $(window).on('resize', setGridsContainerHeight);

        function setGridValues() {
            domain.map_proj = selectMapProj.val();
            domain.ref_lat = parseFloat(inputRefLat.val());
            domain.ref_lon = parseFloat(inputRefLon.val());
            domain.truelat1 = parseFloat(inputTrueLat1.val());
            domain.truelat2 = parseFloat(inputTrueLat2.val());
            domain.stand_lon = parseFloat(inputStandLon.val());
            domain.dx = parseInt(inputDX.val(), 10);
            domain.dy = parseInt(inputDY.val(), 10);
            domain.pole_lat = parseFloat(inputPoleLat.val());
            domain.pole_lon = parseFloat(inputPoleLon.val());
            domain.grid.gridPanel.setGridValues();

            domain.update();
        }

        // make nest button click event handler
        buttonAddMOAD.on('click', function (e) {
            domain.addMainGrid();
            containerGrids.empty();
            initGridPanels();
        });

        // remove parent button click event handler
        // removes top most grid and makes it's nest the new top most grid
        buttonRemoveMOAD.on('click', function (e) {
            domain.removeMainGrid();
            containerGrids.empty();
            initGridPanels();
            domain.update();
        });

        // button Update click
        // validate domain and grid field values
        buttonUpdate.on('click', function (e) {

            var formValid, gridValid;

            // clear validation
            form.removeClass('was-validated');

            formValid = form[0].checkValidity();
            gridValid = domain.grid.gridPanel.validate();
            if (!formValid || !gridValid) {
                form.addClass('was-validated');
                return;
            }

            setGridValues();
        });

        // function enables, disables and sets default values for fields
        // for selected projection
        function configFieldsForProjection() {

            // hide pole_lat and pole_lon
            inputPoleLat.parent().hide();

            switch (selectMapProj.val()) {
                case 'lambert':
                    inputTrueLat2.val(domain.truelat2.toFixed(3));
                    inputTrueLat2.prop('disabled', false);
                    inputStandLon.val(domain.stand_lon.toFixed(3));
                    inputStandLon.prop('disabled', false);
                    buttonStanLonPlus.prop('disabled', false);
                    buttonStanLonMinus.prop('disabled', false);
                    inputDX.attr('min', self.options.minGridDistanceMeters);
                    inputDY.attr('min', self.options.minGridDistanceMeters);
                    break;
                case 'mercator':
                    inputTrueLat2.val('0');
                    inputTrueLat2.prop('disabled', true);
                    inputStandLon.val('0');
                    inputStandLon.prop('disabled', true);
                    buttonStanLonPlus.prop('disabled', true);
                    buttonStanLonMinus.prop('disabled', true);
                    inputDX.attr('min', self.options.minGridDistanceMeters);
                    inputDY.attr('min', self.options.minGridDistanceMeters);
                    break;
                case 'polar':
                    inputTrueLat2.val((domain.truelat1 < 0) ? '-90' : '90');
                    inputTrueLat2.prop('disabled', true);
                    inputDX.attr('min', self.options.minGridDistanceMeters);
                    inputDY.attr('min', self.options.minGridDistanceMeters);
                    break;
                case 'lat-lon':
                    inputTrueLat2.val(domain.ref_lat.toFixed(3));
                    inputTrueLat2.prop('disabled', false);
                    // hide pole_lat and pole_lon
                    inputPoleLat.parent().show();

                    // dx, dy in degrees so min should be 0
                    inputDX.attr('min', self.options.minGridDistanceDegrees);
                    inputDY.attr('min', self.options.minGridDistanceDegrees);

                    break;
            }
        }

        function updateSelectMapProjTitle() {
            const title = selectMapProj.find('option:selected').data('title');
            selectMapProj.attr('title', title);
            selectMapProj.tooltip('dispose');
            selectMapProj.tooltip();
        }

        // map projection dropdown change
        selectMapProj.on('change', function (e) {
            if (domain != null) {
                configFieldsForProjection();
                setGridValues();
            }
            updateSelectMapProjTitle();
        });

        // initialize map_proj select tooltip
        updateSelectMapProjTitle();

        // stan_lon buttons
        // rotate domain clockwise or counter-clockwise by 5 degrees
        function rotateDomain(clockwise) {
            var val = parseFloat(inputStandLon.val());
            var delta = (domain.ref_lat > 0) ? 5 : -5;

            if (!clockwise) {
                delta = -delta;
            }

            if ((val - delta) > -180) {
                domain.stand_lon = val - delta;
            }
            domain.update();
        }

        buttonStanLonMinus.on('click', function (e) {
            rotateDomain(true);
        });

        buttonStanLonPlus.on('click', function (e) {
            rotateDomain(false);
        });

        var MulDivOp = Object.freeze({ MUL: 0, DIV: 1 });

        function mulDiv(num, op, factor) {
            if (op == MulDivOp.DIV) {
                return num / factor;
            }
            else if (op == MulDivOp.MUL) {
                return num * factor;
            }
        };

        function modifyDxDy(op, factor) {

            if (op == MulDivOp.DIV && ((inputDX.val() < 100) || (inputDY.val() < 100))) {
                return;
            }

            if (domain == null) {
                inputDX.val(Math.round(mulDiv(parseInt(inputDX.val(), 10), op, factor)));
                inputDY.val(Math.round(mulDiv(parseInt(inputDY.val(), 10), op, factor)));
                return;
            }

            var reverseOp = (op == MulDivOp.DIV) ? MulDivOp.MUL : MulDivOp.DIV;

            // set new settings
            function calculateGridValues(grid, tmpGrid) {

                var update = true;

                if (grid.id == 1) {

                    tmpGrid.i_parent_start = 1;
                    tmpGrid.j_parent_start = 1;
                    tmpGrid.parent_grid_ratio = 1;
                    tmpGrid.e_we = Math.floor(mulDiv(grid.e_we, reverseOp, factor));
                    tmpGrid.e_sn = Math.floor(mulDiv(grid.e_sn, reverseOp, factor));

                    if (tmpGrid.e_we < WRFDomainGrid.minGridSize || tmpGrid.e_sn < WRFDomainGrid.minGridSize) {
                        return false;
                    }
                }
                else {
                    // new values with new dx/dy
                    tmpGrid.parent_grid_ratio = grid.parent_grid_ratio;
                    tmpGrid.i_parent_start = Math.max(Math.floor(mulDiv(grid.i_parent_start, reverseOp, factor)), WRFDomainGrid.minNestGridPoints);
                    tmpGrid.j_parent_start = Math.max(Math.floor(mulDiv(grid.j_parent_start, reverseOp, factor)), WRFDomainGrid.minNestGridPoints);
                    var new_i_delta_end = Math.max(Math.floor(mulDiv(grid.i_delta_end, reverseOp, factor)), WRFDomainGrid.minNestGridPoints);
                    var new_j_delta_end = Math.max(Math.floor(mulDiv(grid.j_delta_end, reverseOp, factor)), WRFDomainGrid.minNestGridPoints);

                    tmpGrid.e_we = Math.floor((tmpGrid.parent.e_we - new_i_delta_end - tmpGrid.i_parent_start) * grid.parent_grid_ratio + 1);
                    tmpGrid.e_sn = Math.floor((tmpGrid.parent.e_sn - new_j_delta_end - tmpGrid.j_parent_start) * grid.parent_grid_ratio + 1);
                    if (tmpGrid.e_we < WRFDomainGrid.minGridSize || tmpGrid.e_sn < WRFDomainGrid.minGridSize) {
                        return false;
                    }
                }

                for (var i = 0; i < grid.nests.length; i++) {
                    var tmpNestGrid = new WRFDomainGrid(tmpGrid.domain, tmpGrid, grid.nests[i].id);
                    tmpGrid.nests.push(tmpNestGrid);
                    update = update && calculateGridValues(grid.nests[i], tmpNestGrid);
                }

                return update;
            }

            var tmpDomain = new WRFDomain();
            tmpDomain.createMainGrid();

            if (calculateGridValues(domain.grid, tmpDomain.grid)) {
                domain.dx = Math.round(mulDiv(parseInt(inputDX.val(), 10), op, factor));
                domain.dy = Math.round(mulDiv(parseInt(inputDY.val(), 10), op, factor));
                inputDX.val(domain.dx.toString());
                inputDY.val(domain.dy.toString());

                function copyGridValues(grid, tmpGrid) {
                    grid.i_parent_start = tmpGrid.i_parent_start;
                    grid.j_parent_start = tmpGrid.j_parent_start;
                    grid.e_we = tmpGrid.e_we;
                    grid.e_sn = tmpGrid.e_sn;

                    for (var i = 0; i < grid.nests.length; i++) {
                        copyGridValues(grid.nests[i], tmpGrid.nests[i]);
                    }
                }
                copyGridValues(domain.grid, tmpDomain.grid);
                domain.update();
            }
        };

        // dx/dy buttons
        buttonRatioDivide2.on('click', function () {
            modifyDxDy(MulDivOp.DIV, 2);
        });

        buttonRatioDivide3.on('click', function () {
            modifyDxDy(MulDivOp.DIV, 3);
        });

        buttonRatioMultiply2.on('click', function () {
            modifyDxDy(MulDivOp.MUL, 2);
        });

        buttonRatioMultiply3.on('click', function () {
            modifyDxDy(MulDivOp.MUL, 3);
        });

        function setFieldValue(input, value, decimals) {

            decimals = decimals || 3;

            if (value) {
                input.val(value.toFixed(3));
            } else {
                input.val(null);
            }
        }

        function setFieldValues() {
            // place domains info to floating panel
            selectMapProj.val(domain.map_proj);

            inputRefLat.val(domain.ref_lat.toFixed(3));
            inputRefLon.val(domain.ref_lon.toFixed(3));
            inputTrueLat1.val(domain.truelat1.toFixed(3));
            inputTrueLat2.val(domain.truelat2.toFixed(3));
            inputStandLon.val(domain.stand_lon.toFixed(3));
            inputDX.val(Math.trunc(domain.dx).toString());
            inputDY.val(Math.trunc(domain.dy).toString());

            setFieldValue(inputPoleLat, domain.pole_lat);
            setFieldValue(inputPoleLon, domain.pole_lon);
        }

        function setButtonRemoveMOADEnabled() {
            buttonRemoveMOAD.prop('disabled', domain.grid.nests.length != 1);
        }

        function initGridPanels() {
            domain.grid.gridPanel = new SidebarWPSPanelGrid(
                containerGrids, 
                domain.grid,
                function (e) {
                    errorMessageBox('Error', e.error);
                },
                self.options);

            domain.grid.on('wps:addnest', setButtonRemoveMOADEnabled);
            domain.grid.on('wps:removenest', setButtonRemoveMOADEnabled);
            setButtonRemoveMOADEnabled();
        }

        function initDomain() {
            initGridPanels();
            domain.on('wps:change', setFieldValues);
            domain.on('remove', function () {
                self.hide();
            });
            domain.on('add', function () {
                initGridPanels();
            });

            setFieldValues();
            configFieldsForProjection();
            initializedForDomain = true;
        }

        this.showNewDomain = function () {
            domain = null;
            initializedForDomain = false;
            buttonUpdate.parent().hide();
            // hide ref_lat and ref_lon
            inputRefLat.parent().hide();
            inputStandLon.parent().hide();
            inputTrueLat1.parent().hide();
            inputTrueLat2.parent().hide();
            // hide pole_lat and pole_lon
            inputPoleLat.parent().hide();
            headerGrids.hide();

            selectMapProj.val(localStorage.getItem(localStorageKey + 'map_proj') || 'lambert');
            inputDX.val(localStorage.getItem(localStorageKey + 'dx') || 12000);
            inputDY.val(localStorage.getItem(localStorageKey + 'dy') || 12000);

            container.show();
            setGridsContainerHeight();
        };

        this.validateNewDomain = function () {
            return selectMapProj[0].checkValidity() &&
                inputDX[0].checkValidity() &&
                inputDY[0].checkValidity();
        };

        this.createNewDomain = function () {
            domain = new WRFDomain();
            domain.map_proj = selectMapProj.val();
            domain.dx = parseInt(inputDX.val(), 10);
            domain.dy = parseInt(inputDY.val(), 10);

            localStorage.setItem(localStorageKey + 'map_proj', domain.map_proj);
            localStorage.setItem(localStorageKey + 'dx', domain.dx);
            localStorage.setItem(localStorageKey + 'dy', domain.dy);

            domain.createMainGrid();
            return domain;
        };

        this.show = function (obj) {
            if (obj && obj != domain) {
                domain = obj;
                initializedForDomain = false;
            }

            if (!initializedForDomain) {
                initDomain();
            }

            buttonUpdate.parent().show();
            inputRefLat.parent().show();
            inputStandLon.parent().show();
            inputTrueLat1.parent().show();
            inputTrueLat2.parent().show();
            headerGrids.show();

            container.show();
            setGridsContainerHeight();
        };

        this.hide = function () {
            container.hide();
        };
    }
}