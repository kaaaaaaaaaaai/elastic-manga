#!/bin/sh
pwd=$(pwd)
for file in `ls ./input/`; do
	HEIGHT=$(sips -g pixelHeight -g pixelWidth ./input/${file} | grep pixelHeight | awk '{print $2}')
	WIDTH=$(sips -g pixelHeight -g pixelWidth ./input/${file} | grep pixelWidth | awk '{print $2}')
	echo $HEIGHT;
	echo $WIDTH;
	DH=`expr 2 \* $HEIGHT`
	echo $DH
	if [ $DH -lt $WIDTH ] ; then
	    ffmpeg -y -i ./input/${file} -vf "pad='if(gt((iw/2)-ih, 0),300,(ih*2))':0:(ow-iw)/2:0:white" ./output3/${file}
	    continue
    fi

	ffmpeg -y -i ./input/${file} -vf "pad=(ih*2):0:(ow-iw)/2:0:white" ./output2/${file}
done