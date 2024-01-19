export class SidebarElevationData {
    constructor(map, sidebar) {

        var urls = [], sources = [], overlayCount = 0, container, containerOvelays;

        function addDownloadUrl(container, filename, url) {
            if (urls.includes(url)) {
                return;
            }
            urls.push(url);
            container.append('<div><a href="' + url + '" title="' + url + '" target="_blank">' + filename + '</a></div>');
            container.show();
        }

        this.addElevationDataOverlay = function (name, overlay) {
            var id = 'elevation-data-overlay-' + overlayCount, checkboxHtml, overlayContainer;

            sources.push({
                name: name,
                overlay: overlay
            });

            overlayCount++;

            checkboxHtml = '<div class="custom-control custom-checkbox">' +
                '<input type="checkbox" class="custom-control-input" id="' + id + '" data-overlay-name="' + name + '">' +
                '<label class="custom-control-label" for="' + id + '">' + name + '</label>' +
                '<div class="elevation-data-history" style="display:none;"></div>' +
                '</div>';

            overlayContainer = $(checkboxHtml);
            containerOvelays.append(overlayContainer);

            overlay.downloadHistory = $('div.elevation-data-history', overlayContainer);

            $('input#' + id, overlayContainer).on('click', { overlay: overlay, map: map }, function (e) {
                if (this.checked) {
                    e.data.overlay.addTo(e.data.map);
                }
                else {
                    e.data.overlay.remove();
                }
            });

            overlay.on('elevationDataDownload', function (e) {
                addDownloadUrl(e.source.downloadHistory, e.filename, e.downloadUrl);
            });
        },

            // initialize
        container = $('#elevation-data', sidebar.getContainer());
        containerOvelays = $('div.elevation-data-overlays', container);
        $('button', container).on('click', function (e) {
            $.each(sources, function () {
                this.overlay.clearDownloaded();
                this.overlay.downloadHistory.empty();
            });
        });
    }
}

export function sidebarElevationData(map, sidebar) {
    return new SidebarElevationData(map, sidebar);
}