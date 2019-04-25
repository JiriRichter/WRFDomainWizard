if (WRFDomainWizard.Sidebar === undefined) {
    WRFDomainWizard.Sidebar = {};
    WRFDomainWizard.sidebar = {};
}

WRFDomainWizard.Sidebar.Settings = L.Class.extend({

    _map: null,
    _container: null,

    initialize: function (map, sidebar) {
        this._map = map;
        this._container = $('#settings', sidebar.getContainer());
    }

});

WRFDomainWizard.sidebar.settings = function (map, sidebar) {
    return new WRFDomainWizard.Sidebar.Settings(map, sidebar);
}