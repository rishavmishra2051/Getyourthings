export const steps = [
    {
      id: "Greet",        
      message: "Welcome to GetYourThings!",        
      trigger: "Done",        
    },        
    {       
      id: "Done",        
      message: "Please enter your name!",        
      trigger: "waiting1",        
    },      
    {      
      id: "waiting1",      
      user: true,      
      trigger: "Name",      
    },      
    {       
      id: "Name",     
      message: "Hi {previousValue}, Please select your issue",     
      trigger: "issues",     
    },      
    {      
      id: "issues",   
      options: [   
        {    
          value: "Registration",   
          label: "Registration",        
          trigger: "Registration",       
        },       
        { value: "Log In", label: "Log In", trigger: "Log In" },       
      ],       
    },       
    {       
      id: "Registration",       
      message:        
        "Thanks for letting your Registration issue, Our team will resolve your issue ASAP",        
      end: true,       
    },       
    {       
      id: "Log In",       
      message:       
        "Thanks for letting your Log In issue, Our team will resolve your issue ASAP",       
      end: true,       
    },       
  ];