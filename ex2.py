#!/usr/bin/python
from os import listdir
from os.path import isfile, join

mypath=r'C:\Users\eltonden\Downloads'
# onlyfiles = [ f for f in listdir(mypath) if isfile(join(mypath,f)) ]
zipfiles= [ f for f in listdir(mypath) if f.startswith('HISTDATA') and f.endswith('.zip') ]

print zipfiles



import zipfile

destfolder=mypath + r'\HISTDATA'
for fname in zipfiles:
  #  fname_noext=os.path.splitext(fname)[0]
  # fname_noext= fname[:-4];
  fname=join(mypath,fname)
  fh = open(fname, 'rb')
  z = zipfile.ZipFile(fh)
  for name in z.namelist():
     print name
     if name.endswith('.csv'):
       outpath = destfolder # join(destfolder, fname_noext)      
       z.extract(name, outpath)
       # ? why failed?  print 'extract ' + name + ' to ' + outpath + r'\'
       print 'extract ' + name + ' to ' + outpath + '\\'
  fh.close()