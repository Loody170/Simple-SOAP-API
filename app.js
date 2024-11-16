const express = require('express');
const soap = require('soap');
const fs = require('fs');
const app = express();
const port = 8000;

// Dummy users data
const users = [
  { name: 'Ahmed', email: 'Ahmed@123.com' },
  { name: 'Amal', email: 'Amal@456.com' },
];

// Define the service and operations
const service = {
  UserService: {
    UserServicePort: {
      getUsers: function(args) {
        // Return users as an array of objects, matching the WSDL
        return { users: users };
      },
      addUser: function(args) {
        users.push({ name: args.name, email: args.email });
        return { status: 'Success' };
      }
    }
  }
};

// Load the WSDL file
const wsdl = fs.readFileSync('UserService.wsdl', 'utf8');

// Create the SOAP server
soap.listen(app, '/soap', service, wsdl);

// Start the server
app.listen(port, () => {
  console.log(`SOAP service is running at http://localhost:${port}/soap`);
});
