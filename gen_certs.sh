#!/bin/bash

# https://tecadmin.net/step-by-step-guide-to-creating-self-signed-ssl-certificates/
# Gen private key
mkdir -p certs
openssl genrsa -out certs/seriesoftubes.key 2048
# Create a Certificate Signing Request (CSR).
openssl req -new -key certs/seriesoftubes.key -out certs/seriesoftubes.csr -subj "/C=CA/ST=Ontario/L=Toronto/O=github/OU=seriesoftubes/CN=seriesoftubes.github.io"
# Generate the Self-Signed SSL Certificate
openssl x509 -req -days 3650 -in certs/seriesoftubes.csr -signkey certs/seriesoftubes.key -out certs/seriesoftubes.crt

# openssl genrsa -out certs/localtest.key 2048
# openssl req -new -key certs/localtest.key -out certs/localtest.csr -subj "/C=CA/ST=Ontario/L=Toronto/O=github/OU=seriesoftubes/CN=10.88.111.3"
# openssl x509 -req -days 3650 -in certs/localtest.csr -signkey certs/localtest.key -out certs/localtest.crt
