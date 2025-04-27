#!/bin/bash

# https://tecadmin.net/step-by-step-guide-to-creating-self-signed-ssl-certificates/
# Gen private key
mkdir -p certs
openssl genrsa -out certs/seriesoftubes.key 2048
# Create a Certificate Signing Request (CSR).
openssl req -new -key certs/seriesoftubes.key -out certs/seriesoftubes.csr -subj "/C=CA/ST=Ontario/L=Toronto/O=github/OU=seriesoftubes/CN=seriesoftubes.github.io"
# Generate the Self-Signed SSL Certificate
openssl x509 -req -days 3650 -in certs/seriesoftubes.csr -signkey certs/seriesoftubes.key -out certs/seriesoftubes.crt
