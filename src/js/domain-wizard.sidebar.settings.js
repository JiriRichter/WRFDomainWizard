export var SidebarSettings = L.Class.extend({

    _map: null,
    _container: null,

    initialize: function (map, sidebar) {
        this._map = map;
        this._container = $('#settings', sidebar.getContainer());
    }

});

export function sidebarSettings(map, sidebar) {
    return new SidebarSettings(map, sidebar);
}