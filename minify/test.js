
var bounceOut=function(now,start,duration,factor){if(now<start){var time=0;}
else if(now>start&&now<start+duration){var time=(now-start)/duration;}
else{var time=1;}
if(time<(1/2.75)){return factor*(7.5625*time*time);}else if(time<(2/2.75)){return factor*(7.5625*(time-=(1.5/2.75))*time+.75);}else if(time<(2.5/2.75)){return factor*(7.5625*(time-=(2.25/2.75))*time+.9375);}else{return factor*(7.5625*(time-=(2.625/2.75))*time+.984375);}};