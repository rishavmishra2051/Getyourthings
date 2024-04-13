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
        trigger: 'MoreSteps1',       
    },       
    {       
      id: "Log In",       
      message:       
        "Thanks for letting your Log In issue, Our team will resolve your issue ASAP",       
        trigger: "MoreSteps1",       
    },
    {
      id: "MoreSteps1",
      message: "Is there anything else we can assist you with?",
      trigger: "MoreOptions1"
    },
    {
      id: "MoreOptions1",
      options: [
        {
          value: "Yes",
          label: "Yes",
          trigger: "NewIssue"
        },
        {
          value: "No",
          label: "No",
          trigger: "EndConversation"
        }
      ]
    },
    {
      id: "NewIssue",
      message: "Please select your new issue",
      trigger: "NewIssueOptions"
    },
    {
      id: "NewIssueOptions",
      options: [
        {
          value: "Password Reset",
          label: "Password Reset",
          trigger: "PasswordReset"
        },
        {
          value: "Account Deletion",
          label: "Account Deletion",
          trigger: "AccountDeletion"
        },
        {
          value: "Technical Support",
          label: "Technical Support",
          trigger: "TechnicalSupport"
        }
      ]
    },
    {
      id: "PasswordReset",
      message: "We've initiated the password reset process. Please check your email for further instructions.",
      end: true
    },
    {
      id: "AccountDeletion",
      message: "Your account deletion request has been received. We will process it shortly.",
      end: true
    },
    {
      id: "TechnicalSupport",
      message: "Our technical support team will contact you shortly to assist with your issue.",
      end: true
    },
    {
      id: "EndConversation",
      message: "Thank you for using GetYourThings. Have a great day!",
      end: true
    },     
  ];