{
    'name': 'Pos Product Pack with Product Stock 10.0',
    'category': 'point of sale',
    'author': 'OmInfoway, Sunflower IT',
    'version': '10.0',
    'description':
        """
Odoo-10.0 Point of Sale module.
========================
Module Contains : Combo product + Product availabal Quantity for version 10.0
Combo Pack : Facility to create Product pack with many products which shows as Combo Product in POS.
Product Stock : Shows availabal Quantity of product in POS screen.

        """,
    'depends': ['point_of_sale'],
    'data': [
        'security/ir.model.access.csv',
        'views/pos_product_pack_view.xml',
        'views/pos_pack_template_view.xml',
    ],
    'images': ['static/img/main.png'],
    'qweb': ['static/src/xml/pos_view.xml'],
    'auto_install': True,
    'installable': True,
    'price': 25,
    'currency': "EUR",
    'live_test_url': 'https://youtu.be/J0sALX5fb0A',
}
