import click
from flask import Blueprint

from netbakery.extensions import db
import netbakery.models as m

bp = Blueprint('prod_cli', __name__, cli_group='product')

@bp.cli.command('add')
@click.argument('name')
@click.option('--price', default=200)
def add_product(name: str, price: int) -> None:
    """Add a product given its name and optional price."""
    prod = m.Product(name=name, price=price)
    db.session.add(prod)
    db.session.commit()
    click.echo(f"Added product '{prod.name}' (id {prod.id}).")

@bp.cli.command('remove')
@click.argument('pid')
def remove_product(pid: int) -> None:
    """Remove a product with given product id."""
    stmt = db.select(m.Product).where(m.Product.id==pid)
    prod = db.session.scalars(stmt).one()
    db.session.delete(prod)
    db.session.commit()
    click.echo(f"Product '{prod.name}' (id {prod.id}) removed.")

@bp.cli.command('list')
def list_products() -> None:
    """Print a list of all products."""
    stmt = db.select(m.Product)
    products = db.session.scalars(stmt).all()

    if not products:
        click.echo('No products to show.')
        return

    click.echo('ID, NAME, PRICE')
    for product in products:
        click.echo(f'{product.id}, {product.name}, {product.price}')

