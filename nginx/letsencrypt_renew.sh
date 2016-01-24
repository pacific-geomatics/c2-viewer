#!/bin/sh
service nginx stop
if ! letsencrypt certonly --keep -d addxy.com,www.addxy.com,c2viewer.addxy.com > /var/log/letsencrypt/renew.log 2>&1 ; then
    echo Automated renewal failed:
    cat /var/log/letsencrypt/renew.log
    exit 1
fi
service nginx start
