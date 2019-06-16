const Applet = imports.ui.applet;
const Util = imports.misc.util;
const Mainloop = imports.mainloop;
const Lang = imports.lang;

function MyApplet(orientation, panel_height, instance_id) {
    this._init(orientation, panel_height, instance_id);
}

MyApplet.prototype = {
    __proto__: Applet.TextApplet.prototype,

    _init: function(orientation, panel_height, instance_id) {
        Applet.TextApplet.prototype._init.call(this, orientation, panel_height, instance_id);
        this.refresh();
    },

    refresh: function() {
        const hours = 24 - new Date().getHours() - 1;
        const minutes = 60 - new Date().getMinutes() - 1;
        const seconds = 60 - new Date().getSeconds() - 1;
        this.set_applet_label(`${hours <= 9 ? '0' : ''}${hours}:${minutes <= 9 ? '0' : ''}${minutes}:${seconds <= 9 ? '0' : ''}${seconds}`);

        Mainloop.timeout_add_seconds(1, Lang.bind(this, this.refresh));
    }
};

function main(metadata, orientation, panel_height, instance_id) {
    return new MyApplet(orientation, panel_height, instance_id);
}