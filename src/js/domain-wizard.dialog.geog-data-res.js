export class GeogDataResDialog {

    constructor(options) {

        // default settings
        this.options = {
            jsonBaseUrl: 'json'
        };

        if (options) {
            this.options = Object.assign(this.options, options);
        }                

        var self = this,
            jsonUrl = `${this.options.jsonBaseUrl}/geog.json`,
            json,
            versionData,
            container,
            dialogHeader,
            dialogBody,
            dialogFooter,
            table,
            selectVersion,
            inputGeogDataRes,
            buttonSave,
            buttonReset;

        container = $('div.modal#geog-data-res-dialog');
        dialogHeader = $('div.modal-header', container);
        dialogBody = $('div.modal-body', container);
        dialogFooter = $('div.modal-footer', container);

        table = $('table', dialogBody);
        table.header = $('thead', table);
        table.body = $('tbody', table);

        selectVersion = $('select', dialogHeader);
        inputGeogDataRes = $('input', dialogBody);

        buttonSave = $('button#button-geog-save', dialogFooter);
        buttonReset = $('button#button-geog-reset', dialogFooter);

        function initGeogCategories() {

            var geogDataResDict = {}, i, j, tableRow, categoryData, selectCategoryOption, cellFilename, hasFilenameSet, categoryOptions, categoryIds, selected;

            self.geog_data_res.match(/(\w+)/g).forEach(function (match) {
                geogDataResDict[match] = match;
            });

            table.body.empty();

            for (i = 0; i < versionData['categories'].length; i++) {
                // create new row
                tableRow = $('<tr/>');

                //select category data
                categoryData = versionData['categories'][i];

                // append category name cell
                tableRow.append('<td>' + categoryData['name'] + '</td>');

                // create dropdown and add to row
                selectCategoryOption = $('<select class=""></select>');
                tableRow.append($('<td />').append(selectCategoryOption));

                // append category default value
                tableRow.append('<td>' + categoryData['default'] + '</td>');

                // append filename cell
                cellFilename = $('<td/>');
                tableRow.append(cellFilename);

                // append row to table
                table.body.append(tableRow);

                // create option elements for dropdowns
                categoryIds = [];
                categoryOptions = {};
                hasFilenameSet = false;
                for (j = 0; j < categoryData['options'].length; j++) {
                    // skip default option
                    if (categoryData['options'][j]['id'] !== 'default') {
                        categoryIds.push(categoryData['options'][j]['id']);
                    }
                    // check if id is selected
                    selected = (geogDataResDict[categoryData['options'][j]['id']] != undefined);
                    // add option element to dictionary
                    categoryOptions[categoryData['options'][j]['id']] = $(new Option(categoryData['options'][j]['id'], categoryData['options'][j]['id'], selected, selected))
                        .data('dirname', categoryData['options'][j]['dirname']);
                    // set filename cell text from selected category option
                    if (selected) {
                        cellFilename.text(categoryData['options'][j]['dirname']);
                        hasFilenameSet = true;
                    }
                }
                // if non selected use filename for default
                if (!hasFilenameSet) {
                    cellFilename.text(categoryOptions['default'].data('dirname'));
                }

                // sort and insert option elements to dropdowns
                selectCategoryOption.append(categoryOptions['default']);
                if (categoryIds.length > 0) {
                    categoryIds.sort().forEach(function (optionId) {
                        selectCategoryOption.append(categoryOptions[optionId]);
                    });
                }
                else {
                    selectCategoryOption.prop('disabled', true);
                }

                selectCategoryOption.on('change', { cellFilename: cellFilename, selectCategoryOption: selectCategoryOption }, function (e) {
                    var selectedOption = e.data.selectCategoryOption.val(), allSelectedOptions = [], allSelectedOptionsDict = {}, $select;

                    // set filename cell text
                    e.data.cellFilename.text($('option:selected', e.data.selectCategoryOption).data('dirname'));

                    // change all other dropdowns with the same option name
                    $('select option[value="' + selectedOption + '"]', table.body).parents().has('option[value="default"]:selected').each(function (index, element) {
                        $select = $(element);
                        $select.val(selectedOption);
                        $('td:last-child', $select.closest('tr')).text($('option:selected', $select).data('dirname'));
                    });

                    // update geog_data_res value
                    $('select', table.body).each(function (index, element) {
                        $select = $(element);
                        selectedOption = $select.val();
                        if (selectedOption != 'default' && allSelectedOptionsDict[selectedOption] === undefined) {
                            allSelectedOptionsDict[selectedOption] = selectedOption;
                            allSelectedOptions.push(selectedOption);
                        }
                    });

                    if (allSelectedOptions.length == 0) {
                        inputGeogDataRes.val('default');
                    } else {
                        inputGeogDataRes.val(allSelectedOptions.join('+'));
                    }
                });
            }
        }

        this.show = function(geog_data_res, saveHandler) {
            this.saveHandler = saveHandler;
            if (!geog_data_res) {
                geog_data_res = 'default';
            }
            this.geog_data_res = geog_data_res;
            inputGeogDataRes.val(geog_data_res);
            if (json === undefined) {
                init();
            }
            else {
                initGeogCategories();
            }
            container.modal();
        };        

        function init() {

            $.getJSON(jsonUrl, function (data) {
                var i, j;

                json = data;
                for (i = 0; i < json['geog'].length; i++) {
                    for (j = 0; j < json['geog'][i]['categories'].length; j++) {
                        if (json['geog'][i]['categories'][j]['name'] == 'HGT_M') {
                            json['geog'][i]['categories'][j]['options'].push({ "id": "srtm_30m", "dirname": "srtm_30m" });
                            json['geog'][i]['categories'][j]['options'].push({ "id": "srtm_90m", "dirname": "srtm_90m" });
                            break;
                        }
                    }
                }
                selectVersion.empty();

                for (i = 0; i < json['geog'].length; i++) {
                    selectVersion.append('<option value="' + json['geog'][i]['version'] + '">' + json['geog'][i]['version'] + '</option>');
                }

                selectVersion.on('change', function (e) {
                    for (i = 0; i < json['geog'].length; i++) {
                        if (selectVersion.val() == json['geog'][i]['version']) {
                            versionData = json['geog'][i];
                            initGeogCategories();
                            break;
                        }
                    }
                });

                //default selection
                versionData = json['geog'][0];
                selectVersion.val(versionData['version']);
                initGeogCategories();
            });
        }

        buttonReset.on('click', function () {
            inputGeogDataRes.val('default');
            $('select', table.body).each(function () {
                var select = $(this);
                select.val('default');
                $('td:last-child', select.closest('tr')).text(select.find(":selected").data('dirname'));
            });
        });

        buttonSave.on('click', function (e) {
            e.geog_data_res = inputGeogDataRes.val();
            if (typeof self.saveHandler === 'function') {
                self.saveHandler.call(this, e);
            }
        });
    }
}