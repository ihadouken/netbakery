import json

import click
from flask import Blueprint, request, session, jsonify, url_for

import netbakery.models as m
from netbakery.extensions import db
from netbakery.auth import require_login

bp = Blueprint('db', __name__, url_prefix='/db')

@bp.route('/add-dispatch', methods=['POST'])
@require_login
def add_dispatch():
    orders = []
    for product_id in json.loads(request.form['products']):
        orders.append(m.Order(product_id=product_id))
    # print(orders)

    dispatch = m.Dispatch(
        receipent=request.form['name'],
        user_id=session['user_id'],
        pincode=request.form['pincode'],
        address=request.form['address'],
        phone=request.form['phone'],
        orders=orders
    )

    db.session.add(dispatch)
    db.session.commit()

    return f'Added order with id {dispatch.id}'

@bp.route('/remove-dispatch', methods=['POST'])
@require_login
def remove_dispatch():
    dispatch_id = request.form['dispatch_id']
    stmt = db.select(m.Dispatch).where(m.Dispatch.id == dispatch_id)
    dispatch = db.session.scalars(stmt).first()

    db.session.delete(dispatch)
    db.session.commit()

    return f'Removed {dispatch}'

@bp.route('/get-dispatch')
@require_login
def get_dispatch():
    dispatch_id = request.args['dispatch_id']

    stmt = db.select(m.Order.product_id).where(m.Order.dispatch_id == dispatch_id)
    product_ids = db.session.scalars(stmt).all()

    dispatch = []
    for product_id in product_ids:
        product = {}
        stmt = db.select(m.Product).where(m.Product.id == product_id)
        record = db.session.scalars(stmt).first()

        product['id'] = record.id
        product['image_url'] = url_for('static',
                                       filename=f'img/cupcake ({record.id}).png')
        product['price'] = record.price
        product['name'] = record.name

        dispatch.append(product)
    # print(dispatch)
    return jsonify(dispatch)

@bp.route('/update-dispatch', methods=['POST'])
@require_login
def update_dispatch():
    dispatch_id = request.form['dispatch_id']

    stmt = db.select(m.Dispatch).where(m.Dispatch.id == dispatch_id)
    dispatch = db.session.scalars(stmt).first()

    # TODO: Make more efficient
    for product_id in json.loads(request.form['deleted_products']):
        stmt = db.select(m.Order).where(m.Order.dispatch_id == dispatch_id and m.Order.product_id == product_id)
        product = db.session.scalars(stmt).first()
        dispatch.orders.remove(product)

    db.session.commit()
    return f'Updated dispatch with ID {dispatch_id}'

@bp.cli.command('create')
def create_tables() -> None:
    """Create all tables as defined in models.py,"""
    db.create_all()
    click.echo('Database tables created.')

@bp.cli.command('remove')
def remove_tables() -> None:
    """Remove all tables from the database."""
    db.drop_all()
    click.echo('Database tables deleted.')

@bp.cli.command('clear')
def clear_db_data() -> None:
    """Clear all data stored inside the database."""
    db.drop_all()
    db.create_all()
    click.echo('Database data cleared.')

