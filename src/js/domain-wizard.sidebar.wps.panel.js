import { SidebarDomainsPanelGrid } from "./domain-wizard.sidebar.wps.panel.grid";
import { WRFDomain } from "./leaflet/leaflet.wrf-domain";
import { WRFDomainGrid } from "./leaflet/leaflet.wrf-grid";
import { errorMessageBox } from "./domain-wizard.dialog.message-box";
import { WrfProjections } from "./utils/constants";
import { degreesToMeters } from "./utils/math";

export class SidebarDomainsPanel {
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

        // default settings
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
        disableMapProjectionSelect();

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
            domain.pole_lat = parseFloat(inputPoleLat.val());
            domain.pole_lon = parseFloat(inputPoleLon.val());

            if (domain.map_proj === WrfProjections.latlon) {
                domain.dx = parseFloat(inputDX.val());
                domain.dy = parseFloat(inputDY.val());
            }
            else {
                domain.dx = parseInt(inputDX.val(), 10);
                domain.dy = parseInt(inputDY.val(), 10);
            }

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

        function inputToMeters(input) {
            input.attr('min', self.options.minGridDistanceMeters);
            input.attr('step', 1);
        }

        function inputToDegrees(input) {
            input.attr('min', 0);
            input.attr('step', 0.001);
        }

        function showInputGroup(input, enabled) {
            const inputParent = input.parent();
            inputParent.show();

            inputParent.find('input').each((i, element) => {
                if (enabled === true) {
                    element.required = true;
                    element.disabled = false;
                }
                else {
                    element.required = false;
                    element.disabled = true;
                }
            });
        }

        function hideInputGroup(input) {
            const inputParent = input.parent();
            inputParent.hide();
            inputParent.find('input').each((i, element) => {
                element.required = false;
            });
        }

        function showStandLon(enabled) {
            showInputGroup(inputStandLon, enabled);
            if (enabled === true) {
                buttonStanLonPlus.prop('disabled', false);
                buttonStanLonMinus.prop('disabled', false);
            }
            else {
                buttonStanLonPlus.prop('disabled', true);
                buttonStanLonMinus.prop('disabled', true);
            }
        }

        function showPoleLatLon(enabled) {
            showInputGroup(inputPoleLat);

            if (enabled === true) {
                inputPoleLat[0].disabled = false;
                inputPoleLon[0].disabled = false;
            }
            else {
                inputPoleLat[0].disabled = true;
                inputPoleLon[0].disabled = true;
            }
        }

        // function enables/disables and sets default values for fields
        // for selected projection
        function configFieldsForProjection() {

            showInputGroup(inputRefLat, true);
            hideInputGroup(inputTrueLat1);
            hideInputGroup(inputTrueLat2);
            hideInputGroup(inputStandLon);
            hideInputGroup(inputPoleLat);

            switch (selectMapProj.val()) {
                case 'lambert':
                    // true_lat1
                    showInputGroup(inputTrueLat1, true);
                    showInputGroup(inputTrueLat2, true);
                    showStandLon(true);
                    inputToMeters(inputDX);
                    inputToMeters(inputDY);
                    break;
                case 'mercator':
                    showInputGroup(inputTrueLat1, true);
                    showStandLon(false);
                    inputToMeters(inputDX);
                    inputToMeters(inputDY);
                    break;
                case 'polar':
                    showInputGroup(inputTrueLat1, true);
                    showStandLon(true);
                    inputToMeters(inputDX);
                    inputToMeters(inputDY);
                    break;
                case 'lat-lon':
                    showStandLon(true, formatFloat(domain.stand_lon));
                    showPoleLatLon(false);

                    // dx, dy in degrees
                    inputToDegrees(inputDX);
                    inputToDegrees(inputDY);
                    break;
            }
        }

        // updates the tooltip on the map projection field
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
            } else {
                initializeDxDyFields(selectMapProj.val());
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

        function setDxDyFieldValues(map_proj, dx, dy) {
            if (map_proj === WrfProjections.latlon) {
                inputDX.val(formatFloat(dx));
                inputDY.val(formatFloat(dy));
            }
            else {
                inputDX.val(Math.round(dx));
                inputDY.val(Math.round(dy));
            }
        }

        // handles multiplication/division of DX and DY via a button
        function modifyDxDy(op, factor) {

            const map_proj = selectMapProj.val();

            let minDistance,
                newDx, newDy,
                currentDx, currentDy;

            if (map_proj === WrfProjections.latlon) {
                currentDx = parseFloat(inputDX.val());
                currentDy = parseFloat(inputDY.val());
                minDistance = Math.min(degreesToMeters(currentDx), degreesToMeters(currentDy));
            } else {
                currentDx = parseInt(inputDX.val());
                currentDy = parseInt(inputDY.val());
                minDistance = Math.min(currentDx, currentDy);
            }

            if (isNaN(currentDx) || isNaN(currentDy)){
                return;
            }
            
            // DX or DY have reached allowed minimum
            if (op == MulDivOp.DIV && minDistance < 100) {
                return;
            }

            newDx = mulDiv(currentDx, op, factor);
            newDy = mulDiv(currentDy, op, factor);

            // when no domain is present on map, simply update DX/DY and exit
            if (domain == null) {
                setDxDyFieldValues(map_proj, newDx, newDy);
                return;
            }

            // reverse operation will be applied to e_we and e_sn to preserve the domain area
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

            var tmpDomain = createEmptyDomain();
            tmpDomain.createMainGrid();

            if (calculateGridValues(domain.grid, tmpDomain.grid)) {

                domain.dx = newDx;
                domain.dy = newDy;

                setDxDyFieldValues(map_proj, newDx, newDy);

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

        function formatFloat(value, decimals) {
            decimals = decimals || 3;
            return value.toFixed(decimals);
        }

        function setFloatFieldValue(input, value, decimals) {
            if (value != null) {
                input.val(formatFloat(value, decimals));
            } else {
                input.val(null);
            }
        }

        function setFieldValues() {
            selectMapProj.val(domain.map_proj);

            setFloatFieldValue(inputRefLat, domain.ref_lat);
            setFloatFieldValue(inputRefLon, domain.ref_lon);
            setFloatFieldValue(inputTrueLat1, domain.truelat1);
            setFloatFieldValue(inputTrueLat2, domain.truelat2);
            setFloatFieldValue(inputStandLon, domain.stand_lon);

            setDxDyFieldValues(domain.map_proj, domain.dx, domain.dy);

            setFloatFieldValue(inputPoleLat, domain.pole_lat);
            setFloatFieldValue(inputPoleLon, domain.pole_lon);
        }

        function setButtonRemoveMOADEnabled() {
            buttonRemoveMOAD.prop('disabled', domain.grid.nests.length != 1);
        }

        function initGridPanels() {
            domain.grid.gridPanel = new SidebarDomainsPanelGrid(
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

            disableMapProjectionSelect();
            setFieldValues();
            configFieldsForProjection();
            initializedForDomain = true;
        }

        function enableMapProjectionSelect() {
            selectMapProj.removeAttr('disabled');            
        }

        function disableMapProjectionSelect() {
            selectMapProj.attr('disabled', 'disabled');            
        }

        // configures DX/DY for selected projection and sets the default value
        function initializeDxDyFields(map_proj) {
            if (map_proj === WrfProjections.latlon) {
                inputToDegrees(inputDX);
                inputToDegrees(inputDY);
                inputDX.val(localStorage.getItem(localStorageKey + 'dx.lat-lon') || 0.1);
                inputDY.val(localStorage.getItem(localStorageKey + 'dy.lat-lon') || 0.1);
            }
            else {
                inputToMeters(inputDX);
                inputToMeters(inputDY);
                inputDX.val(localStorage.getItem(localStorageKey + 'dx') || 12000);
                inputDY.val(localStorage.getItem(localStorageKey + 'dy') || 12000);
            }
        }

        function createEmptyDomain() {
            const newDomain = new WRFDomain();
            newDomain.map_proj = selectMapProj.val();
            return newDomain;
        }

        // hide all fields 
        // called when a user clicks New domain button
        this.showNewDomain = function () {
            domain = null;
            initializedForDomain = false;
            buttonUpdate.parent().hide();

            // hide all projection fields
            hideInputGroup(inputRefLat);
            hideInputGroup(inputStandLon);
            hideInputGroup(inputTrueLat1);
            hideInputGroup(inputTrueLat2);
            hideInputGroup(inputPoleLat);

            headerGrids.hide();

            // enable map proj
            enableMapProjectionSelect();

            var map_proj = localStorage.getItem(localStorageKey + 'map_proj') || 'lambert';
            selectMapProj.val(map_proj);
            initializeDxDyFields(map_proj);

            container.show();
            setGridsContainerHeight();
        };

        this.validateNewDomain = function () {
            return selectMapProj[0].checkValidity() &&
                inputDX[0].checkValidity() &&
                inputDY[0].checkValidity();
        };

        this.createNewDomain = function () {

            disableMapProjectionSelect();

            domain = createEmptyDomain();

            localStorage.setItem(localStorageKey + 'map_proj', domain.map_proj);

            if (domain.map_proj === WrfProjections.latlon) {
                domain.dx = parseFloat(inputDX.val());
                domain.dy = parseFloat(inputDY.val());
                localStorage.setItem(localStorageKey + 'dx.lat-lon', domain.dx);
                localStorage.setItem(localStorageKey + 'dy.lat-lon', domain.dy);

                domain.pole_lat = 90;
                domain.pole_lon = 0;
            } else {
                domain.dx = parseInt(inputDX.val(), 10);
                domain.dy = parseInt(inputDY.val(), 10);
                localStorage.setItem(localStorageKey + 'dx', domain.dx);
                localStorage.setItem(localStorageKey + 'dy', domain.dy);
            }

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
            headerGrids.show();

            container.show();
            setGridsContainerHeight();
        };

        this.hide = function () {
            container.hide();
        };
    }
}