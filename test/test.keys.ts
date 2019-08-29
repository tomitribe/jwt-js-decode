
/**
 *  HMAC test keys and tokens
 *
 **/

export const jwtStrNormal_HS256 =
    'eyJhbGciOiJIUzI1NiJ9' +
    '.' +
    'eyJzdWIiOiJhZG1pbiIsInRva2VuLXR5cGUiOiJhY2Nlc3MtdG9rZW4iLCJuYmYiOjE1MjUzNjE5NjQsImlzcyI6Ii9vYXV0aDIvdG9rZW4iLCJncm91cHMiOlsiYWRtaW4iXSwidGFnLWludGVybmFsIjp7ImdyYW50LXR5cGUiOiJwYXNzd29yZCIsInByb2ZpbGUiOiJtb3ZpZXMiLCJ2ZXJzaW9uIjoiMS4wIiwidXNlcm5hbWUiOiJhZG1pbiJ9LCJleHAiOjE1MjUzNjM3NjQsImlhdCI6MTUyNTM2MTk2NCwianRpIjoiOTZjYjM3OTFmODY1ZTIzMSIsInVzZXJuYW1lIjoiYWRtaW4ifQ' +
    '.' +
    'm7dddcexisZeAoUQJPN1htGP753gV-uJrFkhThWmWZM';

export const jwtStrNormal_HS512 = 
    'eyJhbGciOiJIUzUxMiJ9' +
    '.' +
    'eyJzdWIiOiJhZG1pbiIsInRva2VuLXR5cGUiOiJhY2Nlc3MtdG9rZW4iLCJuYmYiOjE1MjUzNjE5NjQsImlzcyI6Ii9vYXV0aDIvdG9rZW4iLCJncm91cHMiOlsiYWRtaW4iXSwidGFnLWludGVybmFsIjp7ImdyYW50LXR5cGUiOiJwYXNzd29yZCIsInByb2ZpbGUiOiJtb3ZpZXMiLCJ2ZXJzaW9uIjoiMS4wIiwidXNlcm5hbWUiOiJhZG1pbiJ9LCJleHAiOjE1MjUzNjM3NjQsImlhdCI6MTUyNTM2MTk2NCwianRpIjoiOTZjYjM3OTFmODY1ZTIzMSIsInVzZXJuYW1lIjoiYWRtaW4ifQ' +
    '.' +
    'MhmFHqgOf597AYMteXdOTBIwsO9wQeo3I7I-QwNkoKT75RLmbIu6HNjsofl-nWxHYeDMBbb7LpZPpqm-pdvOmg'
;


export const jwtStrGzip_HS256 = 
    'eyJhbGciOiJIUzI1NiIsInppcCI6IkdaSVAifQ' +
    '.' +
    'eJxtjk0OgjAQhe8yaxALAsJVjIsCA1ahbToFNcS7OxAxMXE53_uZNwONFZQgm0FpCMCbG-rQPy0usK6RKFwZa7pqoRRpnCaZKLJDAIqIXZGRo7_E0WbrnBktC6dP6ZlbZRcq7dFp2UM5s0Vqv32xkuhuXMNR60yr-gUOZlJIjCZ0pIxmJHZ7vkdaWgb8bn4FgA-7DUvydZj0v0uvXnGgyOoqyQvRHrMU40T8rXsDw0VUkw' +
    '.' +
    'zLDFd5VLMe-Op1Ny7ENbdcGug0OlYdnGJWQLxvPaPFY'
;


export const jwtStrGzip_HS512 = 
    'eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ' +
    '.' +
    'eJxtjk0OgjAQhe8yaxALAsJVjIsCA1ahbToFNcS7OxAxMXE53_uZNwONFZQgm0FpCMCbG-rQPy0usK6RKFwZa7pqoRRpnCaZKLJDAIqIXZGRo7_E0WbrnBktC6dP6ZlbZRcq7dFp2UM5s0Vqv32xkuhuXMNR60yr-gUOZlJIjCZ0pIxmJHZ7vkdaWgb8bn4FgA-7DUvydZj0v0uvXnGgyOoqyQvRHrMU40T8rXsDw0VUkw' +
    '.' +
    'ybEz2CZ4iNH_u0MaL3w_tGjkOsAPFbgB_mXhVF6N8Y50HxoKMM81Mhq_uctc5P7lE05Jv6ps3YYYb7vIDUn-jQ'
;

export const jwtSecret_HS = 'test';

/**
 * RSA test keys and tokens
 *
 **/

export const jwtStrNormal_RS256 = 
    'eyJhbGciOiJSUzI1NiJ9' +
    '.' +
    'eyJzdWIiOiJhZG1pbiIsInRva2VuLXR5cGUiOiJhY2Nlc3MtdG9rZW4iLCJuYmYiOjE1MjUzNjE5NjQsImlzcyI6Ii9vYXV0aDIvdG9rZW4iLCJncm91cHMiOlsiYWRtaW4iXSwidGFnLWludGVybmFsIjp7ImdyYW50LXR5cGUiOiJwYXNzd29yZCIsInByb2ZpbGUiOiJtb3ZpZXMiLCJ2ZXJzaW9uIjoiMS4wIiwidXNlcm5hbWUiOiJhZG1pbiJ9LCJleHAiOjE1MjUzNjM3NjQsImlhdCI6MTUyNTM2MTk2NCwianRpIjoiOTZjYjM3OTFmODY1ZTIzMSIsInVzZXJuYW1lIjoiYWRtaW4ifQ' +
    '.' +
    'bmzUFZDpHGgBE0BIcz_TeuiQT2l9HfTf9IbKS-TDZ0JiGsB651FSBythXwRexIYlrHZFe7T-xeKa6GnMQEsD4IBi0kg-S8OKhn4xavM-OgSwKxVWBl_axWe_TD6pa1K87ciz2J2wr9Vr8IvvPH4keZiS3eO3tyqyn8UOcJ1r-5I'
;

export const jwtStrNormal_RS512 = 
    'eyJhbGciOiJSUzUxMiJ9' +
    '.' +
    'eyJzdWIiOiJhZG1pbiIsInRva2VuLXR5cGUiOiJhY2Nlc3MtdG9rZW4iLCJuYmYiOjE1MjUzNjE5NjQsImlzcyI6Ii9vYXV0aDIvdG9rZW4iLCJncm91cHMiOlsiYWRtaW4iXSwidGFnLWludGVybmFsIjp7ImdyYW50LXR5cGUiOiJwYXNzd29yZCIsInByb2ZpbGUiOiJtb3ZpZXMiLCJ2ZXJzaW9uIjoiMS4wIiwidXNlcm5hbWUiOiJhZG1pbiJ9LCJleHAiOjE1MjUzNjM3NjQsImlhdCI6MTUyNTM2MTk2NCwianRpIjoiOTZjYjM3OTFmODY1ZTIzMSIsInVzZXJuYW1lIjoiYWRtaW4ifQ' +
    '.' +
    'XU1Cx_aEv5OlyOIS_2zYcEPYlny7PRYH7AEk0V8kSSH3urLeNfe_SsTaLtLSylgOxFt02VCKxdwqMptHIEleKx5h2f0ru19ihIV_DF1jqvN2L22XZWBVYv1Ixj8gwO_EK2zVNBzmiTdT5jyGxnZAg7SBrQiO0b1MTshvTh4D2Ts'
;

export const jwtStrGzip_RS256 = 
    'eyJhbGciOiJSUzI1NiIsInppcCI6IkdaSVAifQ' +
    '.' +
    'eJxtjk0OgjAQhe8yaxALAsJVjIsCA1ahbToFNcS7OxAxMXE53_uZNwONFZQgm0FpCMCbG-rQPy0usK6RKFwZa7pqoRRpnCaZKLJDAIqIXZGRo7_E0WbrnBktC6dP6ZlbZRcq7dFp2UM5s0Vqv32xkuhuXMNR60yr-gUOZlJIjCZ0pIxmJHZ7vkdaWgb8bn4FgA-7DUvydZj0v0uvXnGgyOoqyQvRHrMU40T8rXsDw0VUkw' +
    '.' +
    'Gi94p7001f0zwjYzCjqknlW8Fl5UFDn8aZJkaysa6nRGzWNRpOUfAiLEB3uoXhi5Q_3WYQAQVLi3amJu5Wi_5Wu-3X3uyOWnw21kLL4e0EHOZFPkzN3PXaNlRR3iMiXs4Bf2ouQNqPnTrNHfDkdTlCIm42_ht8syMCuBYx0sN0g'
;

export const jwtStrGzip_RS512 = 
    'eyJhbGciOiJSUzUxMiIsInppcCI6IkdaSVAifQ' +
    '.' +
    'eJxtjk0OgjAQhe8yaxALAsJVjIsCA1ahbToFNcS7OxAxMXE53_uZNwONFZQgm0FpCMCbG-rQPy0usK6RKFwZa7pqoRRpnCaZKLJDAIqIXZGRo7_E0WbrnBktC6dP6ZlbZRcq7dFp2UM5s0Vqv32xkuhuXMNR60yr-gUOZlJIjCZ0pIxmJHZ7vkdaWgb8bn4FgA-7DUvydZj0v0uvXnGgyOoqyQvRHrMU40T8rXsDw0VUkw' +
    '.' +
    'eqX26BHrw4BQQbh7huf1RqUijRMSA-ncBrtrU1GTXDGgjL09XRYFgVhAhejdR_KzLdsQz0Eb5Sj7xEl9vkIEV-8ubcTicjs69GWQYmYI47h9DC3NlIZZ8IVivjMUcjenHUSnn4HJsSdOaos45IKpshZfmK4lQYyeptzv1YNYOgE'
;

export const jwtPrivKey_RS =  '-----BEGIN RSA PRIVATE KEY-----\n' +
    'MIICWwIBAAKBgQCMZ9ce3HIOOIyWEXxYDgrmepxP62fjm+WtVebq9UIzv+D4Ru/O\n' +
    'rxsvCOrwbjeOnrnZsqZerKS9WMmgZH1Qx3MiH7Hn1Rq2vWh3gkvn5tv9NHUl69sQ\n' +
    'k/gQX9t2PzxVclJad7u05bYCS0y0t8vS6rkO4uEHsRN/VF/yqDAbk4o6yQIDAQAB\n' +
    'AoGACJUYWzSSbDgcr9elyCQjmm8IOwJiuVEAOxYzJU2UnGEwOTzsz694c+mRoty5\n' +
    '3KfrKFl5PfRDpadVu84ostVePjHtX+qFoY77LH8oGa1oDVH3feufPQOaUiIAp4Ad\n' +
    'jxS+NLqCooMzQAG73NTjOJX8sSRiwjUpTYnbXzLI3AyLeOECQQDvhMlOvM9Lh8UK\n' +
    'gpVMXTLKhA49G5+WJe53GTxNkRixCRa7ogvoam8G98QfUjcVzi8au53nnZMh1E0k\n' +
    'zfvhGIAFAkEAlhEjpNBqSAmhEJti3d4W14ykdMbQSGAk9Ljtl+E5SO+0anivIoCq\n' +
    'l8yIQY/hia8+SoRWPMZlq0QiXzW4mAS+9QJATCGZ1wQeo7RZBhkxmV86SLKmz/ea\n' +
    'xx/xZzvHNiR7g7IO3r8IJ+zEs6NHXGlGhxDNWiLucvNcE/GmP5+VgxvFfQJAKVJi\n' +
    '3Dk/asKsBSSkXq+O3p+tkTJFnAhNZM2fLtknqvvGVCMTJo8DanU5d8QkuIL2xhIW\n' +
    'pPmEeVpzlH/4anO0GQJAG68Ofd5S2P401g82S8MJSttkfLvDmtxCKDXwtc3Iy5nc\n' +
    'CYUtkARMToRkp9HDjPyzIwgT97pbj9AAoJoJFETT3A==\n' +
    '-----END RSA PRIVATE KEY-----'
;

export const jwtPubKey_RS =  '-----BEGIN PUBLIC KEY-----\n' +
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCMZ9ce3HIOOIyWEXxYDgrmepxP\n' +
    '62fjm+WtVebq9UIzv+D4Ru/OrxsvCOrwbjeOnrnZsqZerKS9WMmgZH1Qx3MiH7Hn\n' +
    '1Rq2vWh3gkvn5tv9NHUl69sQk/gQX9t2PzxVclJad7u05bYCS0y0t8vS6rkO4uEH\n' +
    'sRN/VF/yqDAbk4o6yQIDAQAB\n' +
    '-----END PUBLIC KEY-----'
;


export const jwtSecondPrivKey_RS =  '-----BEGIN RSA PRIVATE KEY-----\n' +
    'MIICXAIBAAKBgQCItVvSo0995wD3tnNuiXnVf6AqC0uG17W/MfGB4Jp6hfq1uPVZ\n' +
    'tj9fL0t9SkkEVHjF4xp9cRKyRwIIQYW0LOjNJYRPd4dVylPrP/wUBsPcLlcDWirX\n' +
    'sNNzkmbNziK1ybGqLDvtXl0HWVJVlkmdNY8JOmk77rSe+x/stgX/WsNc4QIDAQAB\n' +
    'AoGAeczLkLH8IvprvEgMNFG8AOICuzLxCaSqwzwmJkcMm1k/dCTkRBfCAnZK1cgX\n' +
    'ogn4yKZ8dYMG21u0jdKC43KXvskLHnPG8hRevdhdcGxWgi+McwiuXS3ZRbkf+dxY\n' +
    '4K4qsgWM4DsWhQigQLfGUELibk5esvKxHQJtpmMjd3Os67kCQQDrll0VMJjeMQW3\n' +
    'l2AZQ/K2JNZAAr2o8DjLSU6CvD7MhHIMTOT9vehwbPCE1CiaSKXtJpVNPB7xL4Pb\n' +
    '7kfGg1gTAkEAlI27HI+M70oXZ2QzF1/gvpZ12/jiHMOD7sSs7w38II+O/FREeA6L\n' +
    'Chaka+BYSZMbr1d/Na1/wGBPqjvwDYS9uwJAdG0G62Xs5kHL1YNV1qah2Co0R8YS\n' +
    '/N5a8vvzdOCbGG+L/VAzCsNDj+wGoV5IApdMiPq8ZkMD96XHwHTtu8lFSQJAB8QI\n' +
    '/gs7EN9Mrej9CsHGW/A9pQwztdE6umapq62Nep5GmUZGdgg8mIBqhAEsXFxGXDo0\n' +
    'ujehsArY30tW1z4TNQJBANUbMfLOj0W0NcJJxzUEHcw9Cfk60lzxrdOIOf+dgzmM\n' +
    'zJBYrA+1Eg5ohrOheZP1m+eABEKGKnV8Xu7hjz8VYf8=\n' +
    '-----END RSA PRIVATE KEY-----'
;

export const jwtSecondPubKey_RS =  '-----BEGIN PUBLIC KEY-----\n' +
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCItVvSo0995wD3tnNuiXnVf6Aq\n' +
    'C0uG17W/MfGB4Jp6hfq1uPVZtj9fL0t9SkkEVHjF4xp9cRKyRwIIQYW0LOjNJYRP\n' +
    'd4dVylPrP/wUBsPcLlcDWirXsNNzkmbNziK1ybGqLDvtXl0HWVJVlkmdNY8JOmk7\n' +
    '7rSe+x/stgX/WsNc4QIDAQAB\n' +
    '-----END PUBLIC KEY-----'
;
