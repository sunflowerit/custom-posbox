from argparse import ArgumentParser

def upgrade_module(session):
    # command-line arguments handling is up to the script
    parser = ArgumentParser()
    parser.add_argument('-d', '--database',
                        help="Database to work on", required=True)
    arguments = parser.parse_args()

    # loading the DB
    session.open(arguments.database)

    # using the models
    users = session.registry('res.users').search(
        session.cr, session.uid, [])

    print("There are %d users in database %r" % (
        len(users), arguments.database))

    # Transaction control is up to the script
    session.rollback()  # we didn't write anything, but one never knows
