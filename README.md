# Buildout for POSbox

Odoo sells a POSbox, but it is an external device (Raspberry Pi) and also not very configurable - you have to recreate the Raspberry image any time you want to add a module or change a setting. It also does not support HTTPS out of the box, which is a problem because of Mixed Request errors when your main Odoo runs on HTTPS.

This buildout configures an Odoo that runs as a POSbox and is meant to run in a following type shop setup:

* POS stations are Linux (eg. Ubuntu) computers
* Printers etc are connected to the port(s) of these computers directly, and not a POSbox
* POSbox software should be running on local

In this case, the real Odoo can run on the cloud, each POS station is its own POSbox, and we are free to configure by modifying this buildout and running `bin/start_odoo` again.

## POSbox on HTTPS

To run on HTTPS, it is necessary to have domains (xxx.domain.tld, yyy.domain.tld) pointing at your POS station's internal IPs. To avoid using self-signed or paid certificates, you can use the following trick: use [acme.sh](https://github.com/Neilpang/acme.sh) in combination with a supported DNS provider to receive a verified SSL certificate on your local machine. You can then use the following config in Apache:

```
<VirtualHost *:80>
  ServerName xxx.domain.tld
  ServerAdmin me@example.com

  Redirect permanent / https://xxx.domain.tld/

  ErrorLog ${APACHE_LOG_DIR}/error.log
  CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>

<VirtualHost *:443>
  ServerName xxx.domain.tld
  ServerAdmin me@example.com

  SSLEngine on
  SSLCertificateFile /root/.acme.sh/xxx.domain.tld/xxx.domain.tld.cer
  SSLCertificateKeyFile /root/.acme.sh/xxx.domain.tld/xxx.domain.tld.key

  # Header set Access-Control-Allow-Origin "*" --> already added by Odoo
  Header add Access-Control-Allow-Headers "origin, x-requested-with, content-type"
  Header add Access-Control-Allow-Methods "PUT, GET, POST, DELETE, OPTIONS"

  ProxyPreserveHost On
  ProxyRequests Off
  ProxyPass / http://localhost:8069/
  ProxyPassReverse / http://localhost:8069/

  ErrorLog ${APACHE_LOG_DIR}/error.log
  CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```
