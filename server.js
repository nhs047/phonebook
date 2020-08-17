const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const phonebook = require('./route/phonebook');
app.use('/api/phonebook', phonebook);

app.get('/', function (req, res) {
  let resString = '<div><h2>SpringRain Test API</h2></div>';
  resString+=`<p>Get: (/api/phonebook) <a href='/api/phonebook'>Get All</a></p>`;
  resString+=`<p>Get: (/api/phonebook/{id}) <a href='/api/phonebook/{id}'>Get by Id</a></p>`;
  resString+=`<p>Get (partial, like 0168 for 01685562954): (/api/phonebook/get/{phoneNo}) <a href='/api/phonebook/get/{phoneNo}'>Get by Phone Number</a></p>`;
    resString+=`<p>Post: (/api/phonebook) <a href='/api/phonebook'>Create new contact(name:' ', phoneNo:' ')</a></p>`;
    resString+=`<p>Put: (/api/phonebook/{id}) <a href='/api/phonebook/{id}'>Edit by Id</a></p>`;
    resString+=`<p>Put: (/api/phonebook/{phoneNo}) <a href='/api/phonebook/{phoneNo}'>Edit by Phone Number</a></p>`;
    resString+=`<p>Delete: (/api/phonebook/{id}) <a href='/api/phonebook/{id}'>Delete contact by Id</a></p>`;
    resString+=`<p>Delete: (/api/phonebook/delete/{phoneNo}) <a href='/api/post/delete/{phoneNo}'>Delete contact by Phone Number</a></p>`;
    res.send(resString);
  })
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
