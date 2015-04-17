#!/usr/bin/python

from os import listdir
from os.path import isfile, join


mypath='C:\Users\eltonden\Downloads'
# onlyfiles = [ f for f in listdir(mypath) if isfile(join(mypath,f)) ]
zipfiles= [ f for f in listdir(mypath) if f.startswith('HISTDATA') and f.endswith('.zip') ]

print zipfiles

zipfiles += ['test1.zip']

import os.path
for fname in zipfiles :
  f1=os.path.splitext(fname)[0]
  print f1
  f2= fname[:-4]
  print f2