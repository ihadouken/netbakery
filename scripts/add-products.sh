#!/usr/bin/env bash
die() {
    msg="{$1:-'Some error occured.'}"
    echo "$msg"
    exit 1
}

flask db clear || die "Error clearing the database."

declare -a cakes
cakes=( 'Cranberries' 'Blueberry' 'Strawberry' 'Mulberry'
        'Milk' 'Caramel' 'Vanilla' 'Lavender' 'Rasberry'
        'Valentine' 'Snowflake' 'Christmas' )
price=200

printf "%s\n" "${cakes[@]}" | while read cake; do
    flask product add "$cake Cake" --price $price
    price=$((price + 50))
done
