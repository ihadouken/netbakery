from functools import wraps

from flask import Blueprint, request, session, flash, redirect, url_for, render_template

from netbakery.extensions import db
import netbakery.models as m

bp = Blueprint('auth', __name__)


def get_user(username) -> m.Account|None:
    """Return user matching given username else None."""
    stmt = db.select(m.Account).where(m.Account.username == username)
    user = db.session.scalars(stmt).first()
    return user


def add_user(username, password) -> None:
    """Add a new user with given credentials."""
    account = m.Account(username=username, password=password)
    db.session.add(account)
    db.session.commit()


def require_login(func: object) -> object:
    """Protect the decorated view function from unauthorized access."""
    @wraps(func)
    def wrapper(*args, **kwargs) -> 'function | Redirect':
        """Check if a user is 'logged_in'."""
        # Invoke decorated function 'func' only if the user is logged in.
        if 'logged_in' in session:
            return func(*args, **kwargs)
        # Redirect to login page if not logged_in.
        flash('Please login before accessing this page.')
        return redirect(url_for('auth.login'))
    return wrapper


@bp.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        conf_password = request.form['confirm-password']

        error=None
        if get_user(username):
            error = 'Given username is taken !'
        elif username == password:
            error = 'Password cannot be same as username !'
        elif password != conf_password:
            error = 'Passwords donot match !'

        if not error:
            flash('Login with new account')
            add_user(username, password)
            return redirect(url_for('auth.login'))

        flash(error)
    return render_template('signup.html')


@bp.route('/login', methods=['GET', 'POST'])
def login():
    """Login the user if correct credentials are provided."""
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = get_user(username)

        if user and user.password == password:
            session['logged_in'] = True
            session['user_id'] = user.id
            flash(f'Welcome, {user.username}.')
            return redirect(url_for('home'))
        flash('Incorrect username or password !')
    return render_template('login.html')


@bp.route('/logout')
def logout():
    """Logout the user by modifying session."""
    if 'logged_in' in session:
        session.pop('logged_in')
        flash('Logged out.')
    return redirect(url_for('auth.login'))

