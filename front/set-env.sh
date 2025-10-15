#!/bin/sh
cp -f /usr/share/nginx/html/index.html /tmp
if [ -n "$REACT_APP_BACKEND_IP" ]; then
   sed -i -e "s|PARAM_REACT_APP_BACKEND_IP|$REACT_APP_BACKEND_IP|g" /tmp/index.html
fi
if [ -n "$REACT_APP_BACKEND_PORT" ]; then
   sed -i -e "s|PARAM_REACT_APP_BACKEND_PORT|$REACT_APP_BACKEND_PORT|g" /tmp/index.html
fi
cp -f /usr/share/nginx/html/config.js /tmp
if [ -n "$REACT_APP_BACKEND_IP" ]; then
   sed -i -e "s|PARAM_REACT_APP_BACKEND_IP|$REACT_APP_BACKEND_IP|g" /tmp/config.js
fi
if [ -n "$REACT_APP_BACKEND_PORT" ]; then
   sed -i -e "s|PARAM_REACT_APP_BACKEND_PORT|$REACT_APP_BACKEND_PORT|g" /tmp/config.js
fi
cat /tmp/config.js > /usr/share/nginx/html/config.js
