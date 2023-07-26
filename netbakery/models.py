from datetime import datetime

from netbakery.extensions import db


class Product(db.Model):
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(128), unique=True, nullable=False)
    price = db.Column(db.Integer, nullable=False)


class Order(db.Model):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    dispatch_id = db.Column(db.Integer, db.ForeignKey('dispatches.id'))


class Dispatch(db.Model):
    __tablename__ = 'dispatches'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('accounts.id'))
    receipent = db.Column(db.String(128), nullable=False)
    address = db.Column(db.String(1024), nullable=False)
    pincode = db.Column(db.Integer, nullable=False)
    phone = db.Column(db.Integer, nullable=False)
    time = db.Column(db.DateTime, nullable=False, default=datetime.now)
    orders = db.relationship('Order', backref='dispatches', cascade='all, delete-orphan')


class Account(db.Model):
    __tablename__ = "accounts"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(64), unique=True, nullable=True)
    password = db.Column(db.String(64), nullable=True)
    dispatches = db.relationship('Dispatch', backref='accounts')

