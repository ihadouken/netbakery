"""Contains the application factory."""
import os

from flask import Flask, render_template, url_for, session

import netbakery.models as m
from netbakery.extensions import db
from netbakery.auth import require_login

def create_app(test_config=None):
    """Create and configure the app.
    Read mapping test_config if it is passed, otherwise use
    instance config.
    """
    app = Flask(__name__, instance_relative_config=True)

    # Set some defaults.
    app.config.from_mapping(
        SECRET_KEY='dev'
    )

    # Make sure the app instance directory exists.
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    if test_config is None:
        # app.config.from_prefixed_env()
        app.config.from_envvar('FLASK_CONFIG')
    else:
        app.config.from_mapping(test_config)

    # Initialize database
    db.init_app(app)
    # import netbakery.models as m

    # with app.app_context():
    #     db.create_all()

    import netbakery.database
    app.register_blueprint(netbakery.database.bp)

    import netbakery.product_cli
    app.register_blueprint(netbakery.product_cli.bp)

    @app.route('/')
    @app.route('/home')
    @require_login
    def home():
        """Render the homepage with JSON serializable product data."""
        products = []
        stmt = db.select(m.Product)
        product_data = db.session.scalars(stmt).all()

        # Convert product data to a list of dict for conversion to JS object.
        for record in product_data:
            img_link = url_for('static', filename=f'img/cupcake ({record.id}).png')
            product = {'id': record.id, 'image': img_link,
                       'price': f'Rs. {record.price}', 'name': record.name}
            products.append(product)


        dispatches = []
        stmt = db.select(m.Dispatch).where(m.Dispatch.user_id == session['user_id'])
        dispatch_data = db.session.scalars(stmt).all()

        for record in dispatch_data:
            cost = 0
            for order in record.orders:
                stmt = db.select(m.Product.price).where(m.Product.id == order.product_id)
                price = db.session.scalars(stmt).first()
                cost += price
            dispatch = {'id': record.id, 'item_count': len(record.orders),
                        'cost': cost, 'time': record.time.strftime('%D %I:%M %p')}
            dispatches.append(dispatch)
        return render_template('home.html', product_list=products,
                               dispatch_list=dispatches)

    import netbakery.auth
    app.register_blueprint(netbakery.auth.bp)

    return app

