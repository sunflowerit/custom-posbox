import os
import sys
from setuptools import setup, find_packages

version = '0.1'

if sys.version_info < (2, 6):
    sys.stderr.write("This package requires Python 2.6 or newer. "
                     "Yours is " + sys.version + os.linesep)
    sys.exit(1)

# a sufficient version of pip is needed to parse Odoo requirement file
# version 1.4.1 is the one required by reportlab anyway
requires = ['anybox.recipe.odoo']

if sys.version_info < (2, 7):
    requires.append('ordereddict')
    requires.append('argparse')

setup(
    name="sunflower.scripts.odoo",
    version=version,
    author="Sunflower IT",
    author_email="info@sunflowerweb.nl",
    description="Buildout scripts for use with Odoo",
    license="AGPLv3+",
    url="https://github.com/sunflowerit/sunflower.scripts.odoo",
    packages=find_packages(),
    namespace_packages=['sunflower', 'sunflower.scripts'],
    zip_safe=False,
    include_package_data=True,
    install_requires=requires,
    tests_require=requires,
    classifiers=[
        'Development Status :: 5 - Production/Stable',
        'Framework :: Buildout :: Recipe',
        'Intended Audience :: Developers',
        'Intended Audience :: System Administrators',
        'License :: OSI Approved :: GNU Affero General Public License v3 or '
        'later (AGPLv3+)',
        'Topic :: Software Development :: Build Tools',
        'Topic :: Software Development :: Libraries :: Python Modules',
    ],
    entry_points={
        'console_scripts': [
             'upgrade_module = sunflower.scripts.odoo.main:upgrade_module'
        ]
    }
)
