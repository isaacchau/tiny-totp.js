// List of TOTP keys
var _providers = [  
       {"name":"TOTP 1", "key":"YDQYL2T5CHC12345", "keylength": 10, "digits": 6, "otp":"", "hints": ""},
       {"name":"TOTP 2", "key":"YDQYL2T5CHC12345", "keylength": 16, "digits": 6, "otp":"", "hints": ""},  
    ]; 

// 
var _interval; 
window.addEventListener('load', async function() {   
  if ( _interval ) {       
    clearInterval( _interval );   
  }   
  const _loop = async function() {       
    var otplist = "";       
    for (var p of _providers) {           
      const totp = new TOTP(p.key, p.digits, p.keylength);           
      p.otp = await totp.gen();           
      if (!p.hints) { 
        p.hints = "";
      }           
      otplist += "<p>"                       
              + "<span title='" + p.hints + "'>" +  p.name + "</span>"                       
              + "<span>&nbsp;:&nbsp;</span>"                       
              + "<span>" + p.otp + "</span>"                       
              + "</p>";      
    }       
    var rs = 30 - Math.floor((Date.now() / 1000 )) % 30;       
    const totpout = document.getElementById("totpout");       
    const cntdown = document.getElementById("countdown");       
    cntdown.innerHTML = rs;       
    //otplist += "<p style='font: 10px Arial, sans-serif; color: gray'>" + rs + "</p>";       
    if ( rs == 0 || rs == 30 || totpout.innerHTML.length == 0 ) {           
      totpout.innerHTML = otplist;       
    }   
  };   
  await _loop();   
  _interval = setInterval(_loop, 1000); 
});  
