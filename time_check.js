function real_time(time){
  console.log(new Date(time * 1000).toLocaleTimeString("sv-SV"));
}

real_time(1631725200)