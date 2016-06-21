#!/usr/bin/python
from Crypto.Hash import SHA
from Crypto.PublicKey import RSA
from Crypto.Signature import PKCS1_v1_5
from base64 import b64decode

import sys
import os
import string

def file_read(file):
    rfile = file.read()
    return rfile

signature  = file_read(open(sys.argv[1], 'r'))
signedData  = file_read(open(sys.argv[2], 'r'))
publicKey  = file_read(open(sys.argv[3], 'r'))

def chunks(s, n):
    for start in range(0, len(s), n):
        yield s[start:start+n]

def pem_format(key):
    return '\n'.join([
        '-----BEGIN PUBLIC KEY-----',
        '\n'.join(chunks(key, 64)),
        '-----END PUBLIC KEY-----'
    ])

def validate_purchase(publicKey, signature, signedData):
    key = RSA.importKey(pem_format(publicKey))
    verifier = PKCS1_v1_5.new(key)
    data = SHA.new(signature)
    sig = b64decode(signedData)
    return verifier.verify(data, sig)

print validate_purchase(publicKey, signature, signedData)
