import JSZip from "jszip";
import { KmlFileGroup } from "./leaflet.layer.kml-file-group";
import { getFileExtension } from "../utils/file";

// based on https://github.com/Raruto/leaflet-kmz/tree/master

export var KmzFileGroup = KmlFileGroup.extend({

    initialize: function (options) {
        KmlFileGroup.prototype.initialize.call(this, options);
    },

    loadDataAsync: async function(data) {

        const kml = {};
        const images = {};

        const zip = await JSZip.loadAsync(data);
        for (const filename in zip.files) {

            const ext = getFileExtension(filename);
            const file = zip.files[filename];

            switch(ext) {
                case 'kml':
                    kml[filename] = await file.async("arraybuffer");
                    break;

                case 'jpg':
                case 'jpeg':
                    const base64 = await file.async("base64");
                    images[filename] = `data:image/${ext};base64,${base64}`;
                    break;
            }
        }

        for (const filename in kml) {
            const xml = this.toXml(kml[filename]);
            this.addKmlData(xml);

            let groundOverlays = xml.getElementsByTagName('GroundOverlay');
		    for (let i = 0; i < groundOverlays.length; i++) {

                const overlayNode = groundOverlays[i];

                const imageBounds = L.latLngBounds([
                    overlayNode.getElementsByTagName('south')[0].childNodes[0].nodeValue,
                    overlayNode.getElementsByTagName('west')[0].childNodes[0].nodeValue
                ], [
                    overlayNode.getElementsByTagName('north')[0].childNodes[0].nodeValue,
                    overlayNode.getElementsByTagName('east')[0].childNodes[0].nodeValue
                ]);

                let rotation = overlayNode.getElementsByTagName('rotation')[0];
                if (rotation !== undefined) {
                    rotation = parseFloat(rotation.childNodes[0].nodeValue);
                }
                
                let href = overlayNode.getElementsByTagName('href')[0];
                let icon = overlayNode.getElementsByTagName('Icon')[0];
                if (!href && icon) {
                    href = icon.getElementsByTagName('href')[0];
                }
                href = href.childNodes[0].nodeValue;
                if (!href in images) {
                    continue;
                }

                let options = {};

                let color = overlayNode.getElementsByTagName('color')[0];
                if (color) {
                    color = color.childNodes[0].nodeValue;
                    options.opacity = parseInt(color.substring(0, 2), 16) / 255.0;
                    options.color = '#' + color.substring(6, 8) + color.substring(4, 6) + color.substring(2, 4);
                }

                if (rotation) {
                    options.rotation = rotation;
                }

                const layer = new KmzImageOverlay(images[href], imageBounds, { opacity: options.opacity, rotation: options.rotation });
                this.addLayer(layer);
		    }
        }
    }
});

var KmzImageOverlay = L.ImageOverlay.extend({
	options: {
		rotation: 0
	},

	_reset: function() {
		L.ImageOverlay.prototype._reset.call(this);
		this._rotate();
	},

	_animateZoom: function(e) {
		L.ImageOverlay.prototype._animateZoom.call(this, e);
		this._rotate();
	},

	_rotate: function() {
        this._image.style[L.DomUtil.TRANSFORM] += ' rotate(' + this.options.rotation + 'deg)';
	},

	getBounds: function() {
		return this._bounds;
	}
});