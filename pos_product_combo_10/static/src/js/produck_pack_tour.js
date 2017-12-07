odoo.define('pos_product_combo_10.product_pack_tour', function(require) {
"use strict";

var core = require('web.core');
var tour = require('web_tour.tour');

var _t = core._t;

tour.register('pos_product_combo_product_pack_tour', {
    url: "/web",
}, [{
    trigger: ".o_form_sheet button.fa-arrows-v",
    content: _t("<p>Click to start the point of sale interface. It <b>runs on tablets</b>, laptops, or industrial hardware.</p><p>Once the session launched, the system continues to run without an internet connection.</p>"),
    position: "bottom"
}]);

});