odoo.define('pos_keyboard_shortcuts.keyboard_shortcut', function (require) {
"use strict";

var gui = require('point_of_sale.gui');
var screens = require('point_of_sale.screens');
var core = require('web.core');
var models = require('point_of_sale.models');

var QWeb = core.qweb;
var _t = core._t;

var _super_posmodel = models.PosModel.prototype;

models.PosModel = models.PosModel.extend({
    initialize: function (session, attributes) {
        var company_model = _.find(this.models, function(model){
            return model.model === 'res.company';
        });
        company_model.fields.push('pos_quantity');
        company_model.fields.push('pos_discount');
        company_model.fields.push('pos_price');
        company_model.fields.push('pos_search');

        return _super_posmodel.initialize.call(this, session, attributes);
    },
});

screens.OrderWidget.include({
	init: function(parent, options) {
        var self = this;
        this._super(parent,options);
        this._onKeydown = _.bind(this.posKeyboardShortcut1, this);
        $(document).on('keydown', this, this._onKeydown);
    },
    posKeyboardShortcut1: function(ev) {
    	ev.stopPropagation();
    	if (this.gui.get_current_screen() == 'products'){
	        if (ev.which === $.ui.keyCode.UP) {
//	        	-----------------------
	        	var $listItems = $('li');
        	    var key = ev.keyCode,
        	        $selected = $listItems.filter('.selected'),
        	        $current;
        	    $listItems.removeClass('selected');
    	        if ( ! $selected.length || $selected.is(':first-child') ) {
    	            $current = $listItems.last();
    	        }
    	        else {
    	            $current = $selected.prev();
    	            this.pos.get_order().select_orderline($current[0].orderline);
    	            this.numpad_state.reset();
    	        }
        	    $current.addClass('selected');
//	        	-----------------------
	        } else if (ev.which === $.ui.keyCode.DOWN) {
	        	var $listItems = $('li');
        	    var key = ev.keyCode,
        	        $selected = $listItems.filter('.selected'),
        	        $current;
        	    $listItems.removeClass('selected');
    	        if ( ! $selected.length || $selected.is(':last-child') ) {
    	            $current = $listItems.eq(0);
    	        }
    	        else {
    	            $current = $selected.next();
    	            this.pos.get_order().select_orderline($current[0].orderline);
    	            this.numpad_state.reset();
    	        }
        	    $current.addClass('selected');
	        }
    	}
    },
});

screens.NumpadWidget.include({
	start: function() {
		this._super();
        $(document).keypress(_.bind(this.posKeyboardShortcut, this));
        this._onKeydown = _.bind(this.posKeyboardShortcut1, this);
        $(document).on('keydown', this, this._onKeydown);
    },
    posKeyboardShortcut1: function(ev) {
    	ev.stopPropagation();
    	if (this.gui.get_current_screen() == 'products'){
	        if (ev.which === $.ui.keyCode.DELETE) {
	        	return this.state.deleteLastChar();
	        } else if (ev.which === $.ui.keyCode.ENTER) {
	        	this.gui.show_screen('payment');
//	        	var journal_id = null;
//	            for ( var i = 0; i < this.pos.cashregisters.length; i++ ) {
//                    journal_id = this.pos.cashregisters[i].journal_id[0];
//                    break;
//	            }
//	        	return this.gui.screen_instances.payment.click_paymentmethods(journal_id);
	        }else if (ev.key == this.pos.company.pos_search) {
	        	$('#mydiv').focus();
	        }else if (ev.keyCode == 67 && ev.altKey) {
	        	this.gui.show_screen('clientlist');
	        	$('#mydiv2').focus();
	        }else if (ev.which === $.ui.keyCode.DOWN) {
	        	return ;
	        }
    	}
    	if (this.gui.get_current_screen() == 'payment'){
	        if (ev.which === $.ui.keyCode.LEFT) {
	        	this.gui.back();
	        }
	        var self = this
	        var order = this.pos.get_order();
	        if (!order) {
                return;
            } else if (order.is_paid()) {
            	if (ev.which === $.ui.keyCode.ENTER) {
            		return this.gui.screen_instances.payment.validate_order();
            	}
            }
    	}
    	if (this.gui.get_current_screen() == 'receipt'){
	        if (ev.which === $.ui.keyCode.ENTER) {
	        	this.pos.get_order().finalize();
	        }
    	}
    	if (this.gui.get_current_screen() == 'clientlist'){
    		if (ev.which === $.ui.keyCode.LEFT) {
	        	this.gui.back();
	        }
    	}
    },
    posKeyboardShortcut: function(event) {
    	event.stopPropagation();
    	if (this.gui.get_current_screen() == 'products'){
    		if (event.charCode <= 57 && event.charCode >= 48){
        		var newChar;
        		var numx = event.charCode - 48
        		newChar = numx.toString()
        		return this.state.appendNewChar(newChar);
        	}
        	if (String.fromCharCode(event.keyCode) == this.pos.company.pos_quantity ){
        		var qty_mode = 'quantity'
        		return this.state.changeMode(qty_mode);
        	}
        	if (String.fromCharCode(event.keyCode) == this.pos.company.pos_discount){
        		var dis_mode = 'discount'
        		return this.state.changeMode(dis_mode);
        	}
        	if (String.fromCharCode(event.keyCode) == this.pos.company.pos_price){
        		var price_mode = 'price'
        		return this.state.changeMode(price_mode);
        	}
        	if (event.key == "."){
        		return this.state.appendNewChar('.');
        	}
        	if (event.key == "-" || event.key == "+"){
        		return this.state.switchSign();
        	}
    	}
    },
	
});

});
