#!/bin/sh
pwd=$(pwd)
for file in `ls ./input/`; do
	HEIGHT=$(sips -g pixelHeight -g pixelWidth ./input/${file} | grep pixelHeight | awk '{print $2}')
	WIDTH=$(sips -g pixelHeight -g pixelWidth ./input/${file} | grep pixelWidth | awk '{print $2}')
	echo $HEIGHT;
	echo $WIDTH;
	if [ $HEIGHT -gt $WIDTH ]; then
	    echo "縦長"
        ffmpeg -y -i ./input/${file} -vf "pad=${HEIGHT}:0:(ow-iw)/2:0:white" ./output/${file}
    else
        echo "横長"
        ffmpeg -y -i ./input/${file} -vf "pad=0:${WIDTH}:0:(oh-ih)/2:white" ./output/${file}
    fi
done
