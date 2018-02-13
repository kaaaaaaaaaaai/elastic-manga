#!/bin/sh
pwd=$(pwd)
for file in `ls ./input/`; do
	HEIGHT=$(sips -g pixelHeight -g pixelWidth ./input/${file} | grep pixelHeight | awk '{print $2}')
	WIDTH=$(sips -g pixelHeight -g pixelWidth ./input/${file} | grep pixelWidth | awk '{print $2}')
	echo $HEIGHT;
	echo $WIDTH;

done
